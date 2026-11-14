import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
import { definitions } from '../../src/modules/shared-content/definitions';
import { workspaceSchema, publishedSchema } from '../../src/modules/shared-content/config';
import { digest } from '../../src/modules/shared-content/repository';
const fixture = JSON.parse(
  await readFile(
    process.argv.find((a) => a.startsWith('--fixture='))?.slice(10) ||
      '/tmp/gwd-shared-fixture.json',
    'utf8',
  ),
);
const c = await mysql.createConnection({
  host: process.env.MIGRATION_DB_HOST || '127.0.0.1',
  port: Number(process.env.MIGRATION_DB_PORT || 18346),
  user: process.env.MIGRATION_DB_USER || 'root',
  password: process.env.MIGRATION_DB_PASSWORD || '',
  ...(process.env.MIGRATION_DB_SOCKET ? { socketPath: process.env.MIGRATION_DB_SOCKET } : {}),
  dateStrings: true,
});
const failures: string[] = [],
  counts: any = {};
const q = (s: string, t: string) => '`' + s + '`.`' + t + '`';
for (const d of definitions) {
  const expected = new Set<string>();
  for (const site of ['gwd', 'gzl'])
    for (const r of fixture.sites[site].tables[d.table] || [])
      if (d.kind !== 'blog' || r.module_key === 'blog') expected.add(r.id);
  const [rows]: any = await c.query('SELECT id FROM ' + q(workspaceSchema, d.table));
  const actual = new Set(rows.map((r: any) => r.id));
  if (expected.size !== actual.size || [...expected].some((id) => !actual.has(id)))
    failures.push(d.kind + ': identity union mismatch');
  counts[d.kind] = rows.length;
  const [pub]: any = await c.query('SELECT id FROM ' + q(publishedSchema, d.table));
  if (pub.length !== expected.size) failures.push(d.kind + ': projection count mismatch');
  const refs = [
    ...(d.translations
      ? [{ table: d.translations.table, fk: d.translations.fk, parent: d.table }]
      : []),
    ...d.children.map((ch) => ({ ...ch, parent: d.table })),
    ...d.children.flatMap((ch) => (ch.nested ? [{ ...ch.nested, parent: ch.table }] : [])),
  ];
  for (const ref of refs) {
    const [[row]]: any = await c.query(
      'SELECT COUNT(*) AS n FROM ' +
        q(workspaceSchema, ref.table) +
        ' ch LEFT JOIN ' +
        q(workspaceSchema, ref.parent) +
        ' p ON ch.`' +
        ref.fk +
        '`=p.id WHERE p.id IS NULL',
    );
    if (Number(row.n)) failures.push(ref.table + ': orphan references');
  }
  const [closed]: any = await c.query(
    'SELECT id FROM ' + q(workspaceSchema, d.table) + ' WHERE `' + d.publishedField + '`=0',
  );
  for (const r of closed) {
    const [live]: any = await c.query(
      'SELECT id FROM ' + q(publishedSchema, 'live_' + d.table) + ' WHERE id=?',
      [r.id],
    );
    if (live.length) failures.push(d.kind + ': closed record is public');
  }
}
for (const site of ['gwd', 'gzl']) {
  const source = fixture.sites[site];
  const keys = source.tables.site_settings.map((s: any) => s.key);
  const [settings]: any = await c.query(
    'SELECT * FROM ' + q(source.database, 'site_settings') + ' WHERE `key` IN (?)',
    [keys],
  );
  const sorted = (rows: any[]) =>
    [...rows].sort((a, b) => (a.key + ':' + a.locale).localeCompare(b.key + ':' + b.locale));
  if (digest(sorted(settings)) !== digest(sorted(source.tables.site_settings)))
    failures.push(site + ': local settings changed');
}
await c.end();
if (failures.length) {
  console.error(JSON.stringify({ verified: false, failures }));
  process.exit(1);
}
console.log(
  JSON.stringify({ verified: true, counts, orphanReferences: 0, localSettingsPreserved: true }),
);
