import { digest } from '../../src/modules/shared-content/repository';
import { createContentViews } from './views';
import mysql from 'mysql2/promise';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import {
  definitions,
  sharedTables,
  supportTables,
  mediaTables,
  tablesFor,
  schemaName,
} from '../../src/modules/shared-content/definitions';
const hash = (v: any) => createHash('sha256').update(JSON.stringify(v)).digest('hex');
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=') || true];
  }),
);
const fixture = JSON.parse(
  await readFile(String(args.fixture || '/tmp/gwd-shared-fixture.json'), 'utf8'),
);
const workspace = schemaName(String(args.workspace || 'gzl_shared_content')),
  published = schemaName(String(args.published || 'gzl_shared_public'));
const target = {
  ...(process.env.MIGRATION_DB_SOCKET ? { socketPath: process.env.MIGRATION_DB_SOCKET } : {}),
  host: process.env.MIGRATION_DB_HOST || '127.0.0.1',
  port: Number(process.env.MIGRATION_DB_PORT || 18346),
  user: process.env.MIGRATION_DB_USER || 'root',
  password: process.env.MIGRATION_DB_PASSWORD || '',
  multipleStatements: true,
  dateStrings: true,
};
const fixtureHash = digest(fixture.sites);
const sources = fixture.sites,
  chosen: Record<string, any[]> = {},
  manifest: any = {
    sourceCapturedAt: fixture.capturedAt,
    createdAt: new Date().toISOString(),
    workspace,
    published,
    decisions: [],
    counts: {},
    conflicts: [],
    offers: [],
  };
const allTables = [...new Set([...sharedTables, ...mediaTables])];
const translationFk = new Map<string, string>();
for (const d of definitions) {
  if (d.translations) translationFk.set(d.translations.table, d.translations.fk);
  for (const c of d.children) if (c.nested) translationFk.set(c.nested.table, c.nested.fk);
}
translationFk.set('storage_assets_i18n', 'asset_id');
translationFk.set('category_i18n', 'category_id');
translationFk.set('sub_category_i18n', 'sub_category_id');
for (const table of allTables) {
  const a = sources.gwd.tables[table] || [],
    b = sources.gzl.tables[table] || [];
  const fk = translationFk.get(table);
  const map = new Map<string, { row: any; source: string }>();
  for (const [site, rows] of [
    ['gwd', a],
    ['gzl', b],
  ] as const)
    for (const raw of rows) {
      const row = structuredClone(raw);
      if (table === 'custom_pages' && row.module_key !== 'blog') continue;
      if (
        table === 'custom_pages_i18n' &&
        !['gwd', 'gzl'].some((s) =>
          (sources[s].tables.custom_pages || []).some(
            (p: any) => p.id === row.page_id && p.module_key === 'blog',
          ),
        )
      )
        continue;
      const key = fk ? String(row[fk]) + ':' + row.locale : String(row.id);
      const prev = map.get(key);
      const preferred = fk ? (row.locale === 'tr' ? 'gzl' : 'gwd') : 'gwd';
      if (prev && hash(prev.row) !== hash(row)) {
        const useCurrent = site === preferred;
        manifest.decisions.push({
          table,
          key,
          selected: useCurrent ? site : prev.source,
          reason: fk ? 'language_source' : 'stable_shared_id',
          alternateSource: useCurrent ? prev.source : site,
          selectedHash: hash(useCurrent ? row : prev.row),
          alternateHash: hash(useCurrent ? prev.row : row),
        });
      }
      if (!prev || site === preferred) map.set(key, { row, source: site });
    }
  chosen[table] = [...map.values()].map(({ row }) => {
    if (table === 'storage_assets') row.user_id = null;
    if ('meta_title' in row && typeof row.meta_title === 'string')
      row.meta_title = row.meta_title.replace(
        /\s*[|–—]\s*(Guezel Web Design|GZL Teknoloji|GZL Technology)\s*$/i,
        '',
      );
    return row;
  });
  // Slug conflicts need a real identity decision, never a silent overwrite.
  if (fk) {
    const slugs = new Map();
    for (const r of chosen[table])
      if (r.slug) {
        const k = r.locale + ':' + r.slug;
        if (slugs.has(k) && slugs.get(k) !== r[fk])
          manifest.conflicts.push({
            table,
            locale: r.locale,
            slug: r.slug,
            ids: [slugs.get(k), r[fk]],
          });
        slugs.set(k, r[fk]);
      }
  }
  manifest.counts[table] = chosen[table].length;
}
for (const d of definitions) {
  const fields = d.commercial || [];
  if (!fields.length) continue;
  for (const site of ['gwd', 'gzl'])
    for (const row of sources[site].tables[d.table] || []) {
      manifest.offers.push({
        site,
        kind: d.kind,
        entityId: row.id,
        offer: Object.fromEntries(fields.filter((k) => k in row).map((k) => [k, row[k]])),
      });
    }
}
// Shared publication uses the most restrictive existing state, including the unpublished CLAN record.
for (const d of definitions)
  for (const row of chosen[d.table] || []) {
    const versions = ['gwd', 'gzl'].flatMap((s) =>
      (sources[s].tables[d.table] || []).filter((r: any) => r.id === row.id),
    );
    if (versions.some((r: any) => !Number(r[d.publishedField]))) {
      if (versions.some((r: any) => Number(r[d.publishedField])))
        manifest.decisions.push({
          table: d.table,
          key: row.id,
          reason: 'restrictive_publication_state',
          selected: 'unpublished',
          sourceStates: versions.map((r: any) => r[d.publishedField]),
        });
      row[d.publishedField] = 0;
    }
  }
manifest.pricingDecision = {
  mode: 'preserve-distinct-source-identities',
  gwd: sources.gwd.tables.pricing_plans.length,
  gzl: sources.gzl.tables.pricing_plans.length,
  common: chosen.pricing_plans.length,
  automaticCurrencyConversion: false,
  missingCountryOffer: 'quote-only',
};
manifest.decisionFingerprint = digest({
  source: fixture.sites,
  counts: manifest.counts,
  decisions: manifest.decisions,
  pricingDecision: manifest.pricingDecision,
  offers: manifest.offers,
});
await writeFile(
  String(args.manifest || '/tmp/gwd-shared-merge-manifest.json'),
  JSON.stringify(manifest, null, 2),
);
if (manifest.conflicts.length)
  throw Error('Unresolved slug conflicts: ' + manifest.conflicts.length);
if (!args.write) {
  console.log(
    JSON.stringify({
      dryRun: true,
      decisionFingerprint: manifest.decisionFingerprint,
      counts: manifest.counts,
      decisions: manifest.decisions.length,
      conflicts: 0,
    }),
  );
  process.exit(0);
}
const c = await mysql.createConnection(target);
const ident = (v: string) => '`' + v + '`';
try {
  const [rows]: any = await c.query(
    'SELECT COUNT(*) AS n FROM `' + workspace + '`.content_entries',
  );
  if (rows[0].n && !args['views-only']) {
    const [applied]: any = await c.query(
      'SELECT fingerprint FROM `' +
        workspace +
        "`.content_migrations WHERE name='initial-unification'",
    );
    if (applied[0]?.fingerprint === fixtureHash) {
      await c.end();
      console.log(JSON.stringify({ alreadyApplied: true, fingerprint: fixtureHash }));
      process.exit(0);
    }
    throw Error('Shared workspace already initialized; refusing to overwrite editorial revisions');
  }
} catch (e: any) {
  if (!['ER_BAD_DB_ERROR', 'ER_NO_SUCH_TABLE'].includes(e.code)) throw e;
}
if (args['views-only']) {
  await createContentViews(c, workspace, published, sources);
  await c.end();
  process.exit(0);
}
if (args['accept-manifest'] !== manifest.decisionFingerprint) {
  await c.end();
  throw Error(
    'Migration requires --accept-manifest=' +
      manifest.decisionFingerprint +
      ' after review of the complete language, publication and country-price decisions',
  );
}
for (const schema of [workspace, published]) {
  await c.query(
    'CREATE DATABASE IF NOT EXISTS ' +
      ident(schema) +
      ' CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
  );
  for (const table of allTables) {
    const ddl = sources.gwd.ddl[table] || sources.gzl.ddl[table];
    if (!ddl) continue;
    let clean = ddl
      .replace(
        /^CREATE TABLE `[^`]+`/,
        'CREATE TABLE IF NOT EXISTS ' + ident(schema) + '.' + ident(table),
      )
      .split('\n')
      .filter((l: string) => !/^\s*CONSTRAINT .*FOREIGN KEY/.test(l))
      .join('\n')
      .replace(/,\n\)/g, '\n)');
    await c.query(clean);
  }
}
await c.query('USE ' + ident(workspace));
await c.query(
  await readFile(
    args.schema
      ? String(args.schema)
      : new URL('../../src/modules/shared-content/schema.sql', import.meta.url),
    'utf8',
  ),
);
async function put(schema: string, table: string, rows: any[]) {
  for (const r of rows) {
    const keys = Object.keys(r),
      cols = keys.map(ident).join(',');
    await c.query(
      'INSERT INTO ' +
        ident(schema) +
        '.' +
        ident(table) +
        ' (' +
        cols +
        ') VALUES (' +
        keys.map(() => '?').join(',') +
        ') ON DUPLICATE KEY UPDATE ' +
        keys
          .filter((k) => k !== 'id')
          .map((k) => ident(k) + '=VALUES(' + ident(k) + ')')
          .join(','),
      keys.map((k) => (typeof r[k] === 'object' && r[k] !== null ? JSON.stringify(r[k]) : r[k])),
    );
  }
}
await c.query('USE ' + ident(workspace));
await c.query(
  (
    await readFile(
      args['crm-schema']
        ? String(args['crm-schema'])
        : new URL('../../src/db/seed/sql/225_gzl_crm_content_imports.sql', import.meta.url),
      'utf8',
    )
  ).replace(/,\s*CONSTRAINT[\s\S]*?ON DELETE CASCADE ON UPDATE CASCADE/, ''),
);
await c.beginTransaction();
try {
  for (const table of allTables) {
    await put(workspace, table, chosen[table]);
    await put(published, table, chosen[table]);
  }
  for (const offer of manifest.offers)
    await c.query(
      'INSERT INTO content_offers (site_id,kind,entity_id,offer) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE offer=VALUES(offer)',
      [offer.site, offer.kind, offer.entityId, JSON.stringify(offer.offer)],
    );
  for (const site of ['gwd', 'gzl']) {
    const settings = sources[site].tables.site_settings;
    const profile = {
      site_id: site,
      origin: site === 'gwd' ? 'https://www.guezelwebdesign.com' : 'https://gzlteknoloji.com',
      brand: site === 'gwd' ? 'Guezel Web Design' : 'GZL Teknoloji',
      defaultLocale: site === 'gwd' ? 'de' : 'tr',
      publicLocales: site === 'gwd' ? ['de', 'en'] : ['tr'],
      settings,
    };
    await c.query(
      'INSERT INTO content_site_profiles (site_id,profile) VALUES (?,?) ON DUPLICATE KEY UPDATE profile=VALUES(profile)',
      [site, JSON.stringify(profile)],
    );
  }
  for (const d of definitions)
    for (const parent of chosen[d.table] || []) {
      const tables: any = { [d.table]: [parent] };
      if (d.translations)
        tables[d.translations.table] = (chosen[d.translations.table] || []).filter(
          (r) => r[d.translations!.fk] === parent.id,
        );
      for (const ch of d.children) {
        const rows = (chosen[ch.table] || []).filter((r) => r[ch.fk] === parent.id);
        tables[ch.table] = rows;
        if (ch.nested)
          tables[ch.nested.table] = (chosen[ch.nested.table] || []).filter((r) =>
            rows.some((p) => p.id === r[ch.nested!.fk]),
          );
      }
      const payload = { tables, deleted: false };
      const fingerprint = digest(payload);
      const state = Number(parent[d.publishedField]) ? 'published' : 'withdrawn';
      await c.query(
        'INSERT IGNORE INTO content_entries (kind,entity_id,revision,published_revision,state,hash) VALUES (?,?,1,?,?,?)',
        [d.kind, parent.id, state === 'published' ? 1 : null, state, fingerprint],
      );
      await c.query(
        'INSERT IGNORE INTO content_revisions (kind,entity_id,revision,payload,hash) VALUES (?,?,1,?,?)',
        [d.kind, parent.id, JSON.stringify(payload), fingerprint],
      );
      if (d.translations)
        for (const row of tables[d.translations.table])
          await c.query(
            "INSERT IGNORE INTO content_translation_states (kind,entity_id,locale,source_revision,status) VALUES (?,?,?,1,'approved')",
            [d.kind, parent.id, row.locale],
          );
      for (const site of ['gwd', 'gzl']) {
        const legacy = (sources[site].tables[d.table] || []).find((p: any) => p.id === parent.id);
        if (legacy)
          await c.query(
            'INSERT IGNORE INTO content_legacy_map (source_site,kind,source_id,entity_id,source_hash,decision) VALUES (?,?,?,?,?,?)',
            [
              site,
              d.kind,
              parent.id,
              parent.id,
              hash(legacy),
              JSON.stringify({ source: site, merged: true }),
            ],
          );
        if (d.translations)
          for (const row of sources[site].tables[d.translations.table] || [])
            if (row[d.translations.fk] === parent.id && row.slug)
              await c.query(
                'INSERT IGNORE INTO content_url_aliases (site_id,kind,locale,slug,entity_id) VALUES (?,?,?,?,?)',
                [site, d.kind, row.locale, row.slug, parent.id],
              );
      }
    }
  await c.query("INSERT INTO content_audit (action,details) VALUES ('initial-migration',?)", [
    JSON.stringify({
      sourceCapturedAt: fixture.capturedAt,
      counts: manifest.counts,
      decisions: manifest.decisions.length,
    }),
  ]);
  await c.query('INSERT INTO content_migrations (name,fingerprint) VALUES (?,?)', [
    'initial-unification',
    fixtureHash,
  ]);
  await c.commit();
} catch (e) {
  await c.rollback();
  throw e;
}
// Local test databases are restored only when explicitly requested; production source databases are never bulk-written.
if (
  args['restore-sources'] &&
  (!['127.0.0.1', 'localhost'].includes(target.host) || target.port === 3306)
)
  throw Error('Fixture restore is restricted to the isolated local test server');
if (args['restore-sources']) await c.query('SET FOREIGN_KEY_CHECKS=0');
if (args['restore-sources'])
  for (const site of ['gwd', 'gzl']) {
    const schema = schemaName(sources[site].database);
    for (const [table, rows] of Object.entries(sources[site].tables))
      await put(schema, table, rows as any[]);
  }
await createContentViews(c, workspace, published, sources);
await c.end();
console.log(
  JSON.stringify({
    written: true,
    counts: manifest.counts,
    decisions: manifest.decisions.length,
    conflicts: 0,
  }),
);
