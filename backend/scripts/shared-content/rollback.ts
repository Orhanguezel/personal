import { readdir, mkdir, copyFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
/** Materialize only the last public projection before returning to a legacy application.
 * The shared workspace, every draft revision, tombstone and audit record remain intact.
 */
import mysql from 'mysql2/promise';
import {
  definitions,
  supportTables,
  mediaTables,
} from '../../src/modules/shared-content/definitions';
import { workspaceSchema, publishedSchema } from '../../src/modules/shared-content/config';
import {
  readAggregate,
  applyAggregate,
  upsertRows,
  digest,
} from '../../src/modules/shared-content/repository';
const apply = process.argv.includes('--apply');
const c = await mysql.createConnection({
  host: process.env.MIGRATION_DB_HOST || '127.0.0.1',
  port: Number(process.env.MIGRATION_DB_PORT || 18346),
  user: process.env.MIGRATION_DB_USER || 'root',
  password: process.env.MIGRATION_DB_PASSWORD || '',
  ...(process.env.MIGRATION_DB_SOCKET ? { socketPath: process.env.MIGRATION_DB_SOCKET } : {}),
  dateStrings: true,
});
const [entries]: any = await c.query(
  'SELECT * FROM `' + workspaceSchema + '`.content_entries ORDER BY kind,entity_id',
);
if (!entries.length) throw Error('Shared workspace must exist before rollback');
const legacyMedia = (v: any): any => {
  if (Array.isArray(v)) return v.map(legacyMedia);
  if (v && typeof v === 'object')
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, legacyMedia(x)]));
  return typeof v === 'string' ? v.replaceAll('/media/shared/', '/uploads/shared-editorial/') : v;
};
const mediaRoot =
  process.env.MIGRATION_MEDIA_ROOT ||
  process.env.CONTENT_MEDIA_ROOT ||
  '/var/www/vps-guezel/shared-editorial/uploads';
const sitesRoot = process.env.MIGRATION_SITE_ROOT || '/var/www/vps-guezel';
async function copyMedia(source: string, target: string) {
  for (const item of await readdir(source, { withFileTypes: true })) {
    if (item.isSymbolicLink()) continue;
    const from = path.join(source, item.name),
      to = path.join(target, item.name);
    if (item.isDirectory()) {
      await mkdir(to, { recursive: true });
      await copyMedia(from, to);
    } else if (item.isFile()) {
      try {
        const before = await readFile(to),
          after = await readFile(from);
        if (!before.equals(after)) throw Error('Rollback media conflict: ' + item.name);
      } catch (e: any) {
        if (e.code !== 'ENOENT') throw e;
        await mkdir(path.dirname(to), { recursive: true });
        await copyFile(from, to);
      }
    }
  }
}
const result: any = {
  applied: apply,
  workspacePreserved: true,
  revisionFingerprint: digest(entries),
  sites: [],
};
for (const [site, schema] of [
  ['gwd', 'guezelwebdesign'],
  ['gzl', 'gzlteknoloji_v2'],
]) {
  const changes: any[] = [];
  if (apply)
    await copyMedia(
      mediaRoot,
      path.join(
        sitesRoot,
        site === 'gwd' ? 'guezelwebdesign' : 'gzlteknoloji-site',
        'backend/uploads/shared-editorial',
      ),
    );
  if (apply) await c.beginTransaction();
  try {
    if (apply) {
      for (const table of [...supportTables, ...mediaTables]) {
        const [rows]: any = await c.query(
          'SELECT * FROM `' + publishedSchema + '`.`' + table + '`',
        );
        if (table === 'storage_assets')
          for (const row of rows) {
            row.user_id = null;
            const sharedPath = String(row.url || '').split('/media/shared/')[1];
            if (sharedPath) {
              row.path = 'shared-editorial/' + sharedPath;
              row.provider_public_id = row.provider === 'local' ? row.path : row.provider_public_id;
            }
          }
        await upsertRows(c, schema, table, legacyMedia(rows));
      }
    }
    for (const d of definitions)
      for (const entry of entries.filter((e: any) => e.kind === d.kind)) {
        const a = await readAggregate(c, d, entry.entity_id, publishedSchema);
        if (a.deleted) {
          const [local]: any = await c.query(
            'SELECT * FROM `' + schema + '`.`' + d.table + '` WHERE id=?',
            [entry.entity_id],
          );
          if (local[0] && apply)
            await c.query(
              'UPDATE `' +
                schema +
                '`.`' +
                d.table +
                '` SET `' +
                d.publishedField +
                '`=0 WHERE id=?',
              [entry.entity_id],
            );
          continue;
        }
        const parent = a.tables[d.table][0];
        if (d.kind === 'products') {
          const [stock]: any = await c.query(
            'SELECT stock_quantity FROM `' + schema + '`.products WHERE id=?',
            [entry.entity_id],
          );
          parent.stock_quantity = stock[0]?.stock_quantity || 0;
        }
        parent[d.publishedField] =
          entry.published_revision && !['withdrawn', 'deleted'].includes(entry.state) ? 1 : 0;
        if (d.commercial?.length) {
          const [offers]: any = await c.query(
            'SELECT offer FROM `' +
              workspaceSchema +
              '`.content_offers WHERE site_id=? AND kind=? AND entity_id=?',
            [site, d.kind, entry.entity_id],
          );
          const offer =
            typeof offers[0]?.offer === 'string' ? JSON.parse(offers[0].offer) : offers[0]?.offer;
          for (const field of d.commercial) {
            if (!(field in parent) || field === 'stock_quantity') continue;
            if (offer && field in offer) parent[field] = offer[field];
            else if (field === 'is_purchasable') parent[field] = 0;
            else if (/price|amount/.test(field) && field !== 'price_unit')
              parent[field] = field === 'price_onetime' ? null : 0;
          }
          // No offer remains non-purchasable after rollback, regardless of legacy null handling.
          if (!offer && 'is_purchasable' in parent) parent.is_purchasable = 0;
          if (!offer && ['pricing', 'products'].includes(d.kind)) parent[d.publishedField] = 0;
        }
        changes.push({
          kind: d.kind,
          id: entry.entity_id,
          live: !!parent[d.publishedField],
          hash: digest(a),
        });
        if (apply && d.kind === 'projects')
          for (const image of a.tables.project_images || [])
            if (!image.asset_id) {
              const [original]: any = await c.query(
                'SELECT asset_id FROM `' + schema + '`.project_images WHERE id=?',
                [image.id],
              );
              if (original[0]?.asset_id) image.asset_id = original[0].asset_id;
              else {
                const [decisions]: any = await c.query(
                  'SELECT details FROM `' +
                    workspaceSchema +
                    '`.content_audit WHERE action=? AND entity_id=?',
                  ['migration-decision', image.id],
                );
                for (const raw of decisions) {
                  const decision =
                    typeof raw.details === 'string' ? JSON.parse(raw.details) : raw.details;
                  if (
                    decision.reason === 'existing_missing_asset_reference_removed' &&
                    decision.field === 'asset_id'
                  )
                    image.asset_id = decision.sourceAssetId;
                }
                if (!image.asset_id)
                  throw Error('Legacy gallery requires the preserved source asset identity');
              }
            }
        if (apply) await applyAggregate(c, d, entry.entity_id, legacyMedia(a), schema);
      }
    if (apply) {
      await c.query(
        'INSERT INTO `' + workspaceSchema + '`.content_audit (action,details) VALUES (?,?)',
        [
          'legacy-rollback-materialization',
          JSON.stringify({
            site,
            records: changes.length,
            revisionFingerprint: result.revisionFingerprint,
          }),
        ],
      );
      await c.commit();
    }
  } catch (e) {
    if (apply) await c.rollback();
    throw e;
  }
  result.sites.push({ site, records: changes.length, fingerprint: digest(changes) });
}
await c.end();
console.log(JSON.stringify(result));
