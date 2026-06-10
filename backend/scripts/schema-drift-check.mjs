#!/usr/bin/env node
import 'dotenv/config';

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

const __dirname = dirname(fileURLToPath(import.meta.url));
const backendRoot = resolve(__dirname, '..');
const repoRoot = resolve(backendRoot, '..');
const sharedModulesRoot = resolve(repoRoot, '..', 'packages', 'shared-backend', 'modules');
const shouldPrintFixSql = process.argv.includes('--fix');

const DRIZZLE_TO_SQL = {
  char: 'char',
  varchar: 'varchar',
  int: 'int',
  tinyint: 'tinyint',
  bigint: 'bigint',
  decimal: 'decimal',
  datetime: 'datetime',
  json: 'json',
  text: 'text',
  longtext: 'longtext',
  mysqlEnum: 'enum',
};

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name === 'schema.ts' || name.endsWith('.schema.ts')) out.push(full);
  }
  return out;
}

function findMatchingBlock(source, openIndex, openChar, closeChar) {
  let depth = 0;
  let quote = '';
  let escaped = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const ch = source[i];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === quote) {
        quote = '';
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      continue;
    }

    if (ch === openChar) depth += 1;
    if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function parseLength(configSource) {
  const m = String(configSource || '').match(/length\s*:\s*(\d+)/);
  return m ? Number(m[1]) : null;
}

function parsePrecisionScale(configSource) {
  const precision = String(configSource || '').match(/precision\s*:\s*(\d+)/);
  const scale = String(configSource || '').match(/scale\s*:\s*(\d+)/);
  return {
    precision: precision ? Number(precision[1]) : null,
    scale: scale ? Number(scale[1]) : null,
  };
}

function parseColumn(line) {
  const m = line.match(
    /^\s*([A-Za-z_$][\w$]*)\s*:\s*(char|varchar|int|tinyint|bigint|decimal|datetime|json|text|longtext|mysqlEnum)\s*\(\s*['"`]([^'"`]+)['"`]\s*(?:,\s*\{([^)]*)\})?/,
  );
  if (!m) return null;

  const [, propertyName, drizzleType, columnName, configSource] = m;
  const sqlType = DRIZZLE_TO_SQL[drizzleType];
  const precisionScale = parsePrecisionScale(configSource);

  return {
    propertyName,
    columnName,
    sqlType,
    length: parseLength(configSource),
    precision: precisionScale.precision,
    scale: precisionScale.scale,
    nullable: !line.includes('.notNull()'),
  };
}

function parseSchemaFile(file) {
  const source = readFileSync(file, 'utf8');
  const tables = [];
  const re = /mysqlTable\s*\(\s*['"`]([^'"`]+)['"`]\s*,/g;
  let match;

  while ((match = re.exec(source))) {
    const tableName = match[1];
    const open = source.indexOf('{', match.index);
    if (open < 0) continue;
    const close = findMatchingBlock(source, open, '{', '}');
    if (close < 0) continue;

    const tableBlock = source.slice(open + 1, close);
    const columns = new Map();
    for (const line of tableBlock.split(/\r?\n/)) {
      const col = parseColumn(line);
      if (col) columns.set(col.columnName, col);
    }

    if (columns.size > 0) {
      tables.push({ tableName, file, columns });
    }
  }

  return tables;
}

function normalizeDbType(row) {
  const type = String(row.DATA_TYPE || '').toLowerCase();
  const length = row.CHARACTER_MAXIMUM_LENGTH == null ? null : Number(row.CHARACTER_MAXIMUM_LENGTH);
  const precision = row.NUMERIC_PRECISION == null ? null : Number(row.NUMERIC_PRECISION);
  const scale = row.NUMERIC_SCALE == null ? null : Number(row.NUMERIC_SCALE);
  return { type, length, precision, scale };
}

function sameType(expected, actual) {
  if (expected.sqlType !== actual.type) return false;
  if ((expected.sqlType === 'char' || expected.sqlType === 'varchar') && expected.length) {
    return expected.length === actual.length;
  }
  if (expected.sqlType === 'decimal' && expected.precision) {
    return expected.precision === actual.precision && (expected.scale ?? 0) === (actual.scale ?? 0);
  }
  return true;
}

function sqlTypeForColumn(col) {
  if (col.sqlType === 'char' || col.sqlType === 'varchar') return `${col.sqlType.toUpperCase()}(${col.length ?? 255})`;
  if (col.sqlType === 'decimal') return `DECIMAL(${col.precision ?? 10},${col.scale ?? 2})`;
  if (col.sqlType === 'tinyint') return 'TINYINT';
  if (col.sqlType === 'int') return 'INT';
  if (col.sqlType === 'bigint') return 'BIGINT';
  if (col.sqlType === 'datetime') return 'DATETIME(3)';
  if (col.sqlType === 'json') return 'JSON';
  if (col.sqlType === 'longtext') return 'LONGTEXT';
  if (col.sqlType === 'text') return 'TEXT';
  if (col.sqlType === 'enum') return 'VARCHAR(64)';
  return col.sqlType.toUpperCase();
}

function backtick(name) {
  return `\`${String(name).replace(/`/g, '``')}\``;
}

async function main() {
  const database = process.env.DB_NAME;
  if (!database) {
    console.error('[schema-drift] DB_NAME is required');
    process.exit(2);
  }

  const schemaTables = walk(sharedModulesRoot).flatMap(parseSchemaFile);
  const wantedTableNames = [...new Set(schemaTables.map((t) => t.tableName))];

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database,
  });

  try {
    const [rows] = await conn.query(
      `SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE, IS_NULLABLE
         FROM information_schema.columns
        WHERE table_schema = ?
        ORDER BY TABLE_NAME, ORDINAL_POSITION`,
      [database],
    );

    const db = new Map();
    for (const row of rows) {
      const table = String(row.TABLE_NAME);
      const column = String(row.COLUMN_NAME);
      if (!db.has(table)) db.set(table, new Map());
      db.get(table).set(column, normalizeDbType(row));
    }

    const issues = [];
    const fixSql = [];

    for (const table of schemaTables) {
      const dbCols = db.get(table.tableName);
      if (!dbCols) {
        issues.push({
          type: 'missing_table',
          table: table.tableName,
          file: table.file,
          message: `Missing table ${table.tableName}`,
        });
        continue;
      }

      for (const col of table.columns.values()) {
        const actual = dbCols.get(col.columnName);
        if (!actual) {
          issues.push({
            type: 'missing_column',
            table: table.tableName,
            column: col.columnName,
            expected: sqlTypeForColumn(col),
            file: table.file,
          });
          fixSql.push(
            `ALTER TABLE ${backtick(table.tableName)} ADD COLUMN ${backtick(col.columnName)} ${sqlTypeForColumn(col)} ${col.nullable ? 'NULL' : 'NOT NULL'};`,
          );
          continue;
        }

        if (!sameType(col, actual)) {
          issues.push({
            type: 'type_mismatch',
            table: table.tableName,
            column: col.columnName,
            expected: sqlTypeForColumn(col),
            actual: `${actual.type}${actual.length ? `(${actual.length})` : ''}`,
            file: table.file,
          });
          fixSql.push(
            `ALTER TABLE ${backtick(table.tableName)} MODIFY COLUMN ${backtick(col.columnName)} ${sqlTypeForColumn(col)} ${col.nullable ? 'NULL' : 'NOT NULL'};`,
          );
        }
      }
    }

    const scopedIssues = issues.filter(
      (i) => ['users', 'products', 'social_posts'].includes(i.table) || wantedTableNames.includes(i.table),
    );

    if (scopedIssues.length === 0) {
      console.log('[schema-drift] OK: no drift detected');
      return;
    }

    console.log(`[schema-drift] Found ${scopedIssues.length} issue(s):`);
    for (const issue of scopedIssues) {
      if (issue.type === 'missing_table') {
        console.log(`- missing_table ${issue.table} (${issue.file})`);
      } else if (issue.type === 'missing_column') {
        console.log(`- missing_column ${issue.table}.${issue.column}: expected ${issue.expected}`);
      } else {
        console.log(`- type_mismatch ${issue.table}.${issue.column}: expected ${issue.expected}, actual ${issue.actual}`);
      }
    }

    if (shouldPrintFixSql) {
      console.log('\n-- Suggested SQL (review before applying)');
      for (const sql of fixSql) console.log(sql);
    }

    process.exitCode = 1;
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error('[schema-drift] failed', err);
  process.exit(2);
});
