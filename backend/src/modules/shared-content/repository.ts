import { createHash } from 'node:crypto';
import type { PoolConnection } from 'mysql2/promise';
import { workspaceSchema, publishedSchema, site } from './config';
import { getContentPool } from './routing';
import { byKind, tablesFor, type ContentDefinition } from './definitions';
export type Aggregate = { tables: Record<string, Record<string, any>[]>; deleted?: boolean };
export const canonical = (value: any): any => {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'string') {
    try {
      return canonical(JSON.parse(value));
    } catch {
      return value;
    }
  }
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .filter((k) => !['updated_at', 'created_at'].includes(k))
        .map((k) => [k, canonical(value[k])]),
    );
  return value;
};
export const digest = (value: any) =>
  createHash('sha256')
    .update(JSON.stringify(canonical(value)))
    .digest('hex');
const q = (schema: string, table: string) => '`' + schema + '`.`' + table + '`';
export async function readAggregate(
  c: any,
  d: ContentDefinition,
  id: string,
  schema = workspaceSchema,
): Promise<Aggregate> {
  const tables: Aggregate['tables'] = {};
  const [parents] = await c.query('SELECT * FROM ' + q(schema, d.table) + ' WHERE id=?', [id]);
  tables[d.table] = parents;
  if (d.translations) {
    const t = d.translations;
    const [rows] = await c.query(
      'SELECT * FROM ' + q(schema, t.table) + ' WHERE `' + t.fk + '`=? ORDER BY locale',
      [id],
    );
    tables[t.table] = rows;
  }
  for (const ch of d.children) {
    const [rows] = await c.query(
      'SELECT * FROM ' + q(schema, ch.table) + ' WHERE `' + ch.fk + '`=? ORDER BY id',
      [id],
    );
    tables[ch.table] = rows;
    if (ch.nested) {
      const t = ch.nested;
      const ids = rows.map((r: any) => r.id);
      tables[t.table] = ids.length
        ? (
            await c.query(
              'SELECT * FROM ' + q(schema, t.table) + ' WHERE `' + t.fk + '` IN (?) ORDER BY id',
              [ids],
            )
          )[0]
        : [];
    }
  }
  return { tables, deleted: !parents.length };
}
export async function upsertRows(
  c: any,
  schema: string,
  table: string,
  rows: Record<string, any>[],
) {
  for (const row of rows) {
    const keys = Object.keys(row);
    if (!keys.length) continue;
    const values = keys.map((k) =>
      row[k] !== null && typeof row[k] === 'object' ? JSON.stringify(row[k]) : row[k],
    );
    const cols = keys.map((k) => '`' + k + '`').join(',');
    await c.query(
      'INSERT INTO ' +
        q(schema, table) +
        ' (' +
        cols +
        ') VALUES (' +
        keys.map(() => '?').join(',') +
        ') ON DUPLICATE KEY UPDATE ' +
        keys
          .filter((k) => k !== 'id')
          .map((k) => '`' + k + '`=VALUES(`' + k + '`)')
          .join(','),
      values,
    );
  }
}
export async function applyAggregate(
  c: any,
  d: ContentDefinition,
  id: string,
  a: Aggregate,
  schema = publishedSchema,
) {
  // Explicit child order keeps the operation independent of legacy cascading FK behavior.
  for (const ch of [...d.children].reverse()) {
    if (ch.nested) {
      const [r] = await c.query(
        'SELECT id FROM ' + q(schema, ch.table) + ' WHERE `' + ch.fk + '`=?',
        [id],
      );
      if (r.length)
        await c.query(
          'DELETE FROM ' + q(schema, ch.nested.table) + ' WHERE `' + ch.nested.fk + '` IN (?)',
          [r.map((x: any) => x.id)],
        );
    }
    await c.query('DELETE FROM ' + q(schema, ch.table) + ' WHERE `' + ch.fk + '`=?', [id]);
  }
  if (d.translations)
    await c.query(
      'DELETE FROM ' + q(schema, d.translations.table) + ' WHERE `' + d.translations.fk + '`=?',
      [id],
    );
  if (a.deleted) {
    await c.query('DELETE FROM ' + q(schema, d.table) + ' WHERE id=?', [id]);
    return;
  }
  for (const table of tablesFor(d)) await upsertRows(c, schema, table, a.tables[table] || []);
}
export async function metadata(kind: string, id: string, c: any = getContentPool()) {
  const [entries] = await c.query(
    'SELECT * FROM ' + q(workspaceSchema, 'content_entries') + ' WHERE kind=? AND entity_id=?',
    [kind, id],
  );
  if (!entries[0]) return null;
  const [translations] = await c.query(
    'SELECT locale,source_revision,status FROM ' +
      q(workspaceSchema, 'content_translation_states') +
      ' WHERE kind=? AND entity_id=? ORDER BY locale',
    [kind, id],
  );
  const [delivery] = await c.query(
    'SELECT site_id,revision,state,http_status,verified_at FROM ' +
      q(workspaceSchema, 'content_delivery_receipts') +
      ' WHERE kind=? AND entity_id=?',
    [kind, id],
  );
  const [offers] = await c.query(
    'SELECT site_id,offer,revision,updated_at FROM ' +
      q(workspaceSchema, 'content_offers') +
      ' WHERE kind=? AND entity_id=?',
    [kind, id],
  );
  const e = entries[0];
  return {
    ...e,
    revision: Number(e.revision),
    published_revision: e.published_revision === null ? null : Number(e.published_revision),
    translations,
    delivery,
    offers: offers.map((o: any) => ({
      ...o,
      offer: typeof o.offer === 'string' ? JSON.parse(o.offer) : o.offer,
    })),
    editor_origin: 'https://panel.guezelwebdesign.com',
    live: e.published_revision !== null && !['withdrawn', 'deleted'].includes(e.state),
  };
}
export async function saveRevision(
  c: any,
  d: ContentDefinition,
  id: string,
  actor: string | undefined,
  requestId: string,
  before?: Aggregate,
) {
  let a = await readAggregate(c, d, id);
  if (a.deleted) {
    await applyAggregate(c, d, id, { tables: {}, deleted: true }, workspaceSchema);
    a = await readAggregate(c, d, id);
  }
  const hash = digest(a);
  const [entries] = await c.query(
    'SELECT * FROM ' +
      q(workspaceSchema, 'content_entries') +
      ' WHERE kind=? AND entity_id=? FOR UPDATE',
    [d.kind, id],
  );
  const old = entries[0];
  if (old && old.hash === hash) return Number(old.revision);
  const revision = Number(old?.revision || 0) + 1;
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_entries') +
      ' (kind,entity_id,revision,state,hash) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE revision=VALUES(revision),state=VALUES(state),hash=VALUES(hash),updated_at=NOW(3)',
    [d.kind, id, revision, a.deleted ? 'deleted' : 'draft', hash],
  );
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_revisions') +
      ' (kind,entity_id,revision,payload,hash,actor_id) VALUES (?,?,?,?,?,?)',
    [d.kind, id, revision, JSON.stringify(a), hash, actor || null],
  );
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_audit') +
      ' (kind,entity_id,revision,action,actor_id,request_id) VALUES (?,?,?,?,?,?)',
    [d.kind, id, revision, a.deleted ? 'delete' : 'save-draft', actor || null, requestId],
  );
  if (d.translations) {
    const t = d.translations;
    const previous = before?.tables[t.table] || [];
    const changed = (a.tables[t.table] || []).filter(
      (row) => digest(row) !== digest(previous.find((p) => p.locale === row.locale) || {}),
    );
    const sourceChanged = changed.some((r) => r.locale === 'tr');
    if (sourceChanged)
      await c.query(
        'UPDATE ' +
          q(workspaceSchema, 'content_translation_states') +
          " SET status='review_required' WHERE kind=? AND entity_id=? AND locale<>'tr'",
        [d.kind, id],
      );
    for (const row of changed)
      await c.query(
        'INSERT INTO ' +
          q(workspaceSchema, 'content_translation_states') +
          " (kind,entity_id,locale,source_revision,status) VALUES (?,?,?,?,'draft') ON DUPLICATE KEY UPDATE source_revision=VALUES(source_revision),status=VALUES(status)",
        [d.kind, id, row.locale, revision],
      );
  }
  if (d.translations) {
    for (const row of a.tables[d.translations.table] || [])
      if (row.slug)
        for (const target of ['gwd', 'gzl']) {
          const [aliases]: any = await c.query(
            'SELECT entity_id FROM ' +
              q(workspaceSchema, 'content_url_aliases') +
              ' WHERE site_id=? AND kind=? AND locale=? AND slug=?',
            [target, d.kind, row.locale, row.slug],
          );
          if (aliases[0] && aliases[0].entity_id !== id)
            throw Object.assign(Error('slug_reserved_by_another_entry'), { statusCode: 409 });
          await c.query(
            'INSERT IGNORE INTO ' +
              q(workspaceSchema, 'content_url_aliases') +
              ' (site_id,kind,locale,slug,entity_id) VALUES (?,?,?,?,?)',
            [target, d.kind, row.locale, row.slug, id],
          );
        }
  }
  const wasPublished = old?.published_revision !== null && old?.published_revision !== undefined;
  const parent = a.tables[d.table]?.[0];
  if (a.deleted || (wasPublished && parent && Number(parent[d.publishedField]) === 0))
    await withdraw(c, d, id, revision, actor, requestId, a.deleted ? 'deleted' : 'withdrawn');
  return revision;
}
export async function withdraw(
  c: any,
  d: ContentDefinition,
  id: string,
  revision: number,
  actor: string | undefined,
  requestId: string,
  state = 'withdrawn',
) {
  await c.query(
    'UPDATE ' + q(publishedSchema, d.table) + ' SET `' + d.publishedField + '`=0 WHERE id=?',
    [id],
  );
  await c.query(
    'UPDATE ' +
      q(workspaceSchema, 'content_entries') +
      ' SET state=?,updated_at=NOW(3) WHERE kind=? AND entity_id=?',
    [state, d.kind, id],
  );
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_outbox') +
      " (kind,entity_id,revision,action) VALUES (?,?,?,'withdraw')",
    [d.kind, id, revision],
  );
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_audit') +
      " (kind,entity_id,revision,action,actor_id,request_id) VALUES (?,?,?,'withdraw',?,?)",
    [d.kind, id, revision, actor || null, requestId],
  );
}
export async function publish(
  c: any,
  d: ContentDefinition,
  id: string,
  expected: number,
  actor: string | undefined,
  requestId: string,
) {
  const [rows] = await c.query(
    'SELECT * FROM ' +
      q(workspaceSchema, 'content_entries') +
      ' WHERE kind=? AND entity_id=? FOR UPDATE',
    [d.kind, id],
  );
  const e = rows[0];
  if (!e) throw Object.assign(Error('content_not_found'), { statusCode: 404 });
  if (Number(e.revision) !== expected)
    throw Object.assign(Error('revision_conflict'), { statusCode: 409 });
  if (e.state === 'published' && Number(e.published_revision) === expected) return;
  const a = await readAggregate(c, d, id);
  if (a.deleted) throw Object.assign(Error('content_deleted'), { statusCode: 409 });
  const [states] = await c.query(
    'SELECT locale,status FROM ' +
      q(workspaceSchema, 'content_translation_states') +
      ' WHERE kind=? AND entity_id=?',
    [d.kind, id],
  );
  const required = ['tr', 'de', 'en'];
  if (d.translations) {
    const t = d.translations;
    const missing = required.filter(
      (l) =>
        !states.some((s: any) => s.locale === l && s.status === 'approved') ||
        !(a.tables[t.table] || []).some(
          (r) => r.locale === l && String(r.title || r.name || r.question || r.label || '').trim(),
        ),
    );
    if (missing.length)
      throw Object.assign(Error('translation_approval_required'), {
        statusCode: 422,
        details: { locales: missing },
      });
  }
  a.tables[d.table][0][d.publishedField] = 1;
  // Copy only referenced editorial asset metadata, never private uploads.
  const ids = new Set<string>();
  for (const rows of Object.values(a.tables))
    for (const row of rows)
      for (const [key, value] of Object.entries(row))
        if ((key === 'asset_id' || key.endsWith('_asset_id')) && typeof value === 'string')
          ids.add(value);
  if (ids.size) {
    for (const table of ['storage_assets', 'storage_assets_i18n']) {
      const fk = table === 'storage_assets' ? 'id' : 'asset_id';
      const [assets] = await c.query(
        'SELECT * FROM ' + q(workspaceSchema, table) + ' WHERE `' + fk + '` IN (?)',
        [[...ids]],
      );
      await upsertRows(c, publishedSchema, table, assets);
    }
  }
  await applyAggregate(c, d, id, a);
  await c.query(
    'UPDATE ' + q(workspaceSchema, d.table) + ' SET `' + d.publishedField + '`=1 WHERE id=?',
    [id],
  );
  await c.query(
    'UPDATE ' +
      q(workspaceSchema, 'content_entries') +
      " SET state='published',published_revision=revision,updated_at=NOW(3) WHERE kind=? AND entity_id=?",
    [d.kind, id],
  );
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_outbox') +
      " (kind,entity_id,revision,action) VALUES (?,?,?,'publish')",
    [d.kind, id, expected],
  );
  await c.query(
    'INSERT INTO ' +
      q(workspaceSchema, 'content_audit') +
      " (kind,entity_id,revision,action,actor_id,request_id) VALUES (?,?,?,'publish',?,?)",
    [d.kind, id, expected, actor || null, requestId],
  );
}
export async function transaction<T>(fn: (c: PoolConnection) => Promise<T>): Promise<T> {
  const c = await getContentPool().getConnection();
  try {
    await c.beginTransaction();
    const v = await fn(c);
    await c.commit();
    return v;
  } catch (e) {
    await c.rollback();
    throw e;
  } finally {
    c.release();
  }
}
