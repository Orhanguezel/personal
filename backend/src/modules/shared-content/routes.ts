import { createPreview, readPreview } from './preview';
import type { FastifyInstance } from 'fastify';
import { enabled, isWriter, site, workspaceSchema, publishedSchema, editorOrigin } from './config';
import { getContentPool } from './routing';
import { byKind, definitions, type ContentKind } from './definitions';
import {
  metadata,
  transaction,
  publish,
  withdraw,
  readAggregate,
  applyAggregate,
  saveRevision,
} from './repository';
const q = (t: string) => '`' + workspaceSchema + '`.`' + t + '`';
const actor = (req: any) => String(req.user?.sub || req.user?.id || 'admin');
export const origins = { gwd: 'https://www.guezelwebdesign.com', gzl: 'https://gzlteknoloji.com' };
export const paths: Record<string, Record<string, string>> = {
  projects: { tr: '/portfolyo', de: '/projekte', en: '/work' },
  services: { tr: '/hizmetler', de: '/leistungen', en: '/services' },
  products: { tr: '/urunler', de: '/produkte', en: '/products' },
  blog: { tr: '/blog', de: '/blog', en: '/blog' },
  faqs: { tr: '/sss', de: '/faq', en: '/faq' },
};
function definition(req: any) {
  const d = byKind.get(req.params.kind as ContentKind);
  if (!d) throw Object.assign(Error('invalid_content_kind'), { statusCode: 400 });
  return d;
}
function expect(req: any) {
  const n = Number(req.body?.expected_revision);
  if (!Number.isSafeInteger(n) || n < 1)
    throw Object.assign(Error('content_revision_required'), { statusCode: 428 });
  return n;
}
async function lock(c: any, req: any, d: any) {
  const [rows] = await c.query(
    'SELECT revision FROM ' + q('content_entries') + ' WHERE kind=? AND entity_id=? FOR UPDATE',
    [d.kind, req.params.id],
  );
  if (!rows[0]) throw Object.assign(Error('content_not_found'), { statusCode: 404 });
  if (Number(rows[0].revision) !== expect(req))
    throw Object.assign(Error('revision_conflict'), { statusCode: 409 });
  return Number(rows[0].revision);
}
export async function verify(d: any, id: string, revision: number, state: string) {
  const results = await Promise.all(
    (['gwd', 'gzl'] as const).map(async (target) => {
      let status = 0,
        good = false;
      const started = Date.now();
      try {
        const r = await fetch(origins[target] + '/api/v1/content/state/' + d.kind + '/' + id, {
          headers: { 'Cache-Control': 'no-cache' },
          signal: AbortSignal.timeout(4000),
        });
        status = r.status;
        const entry = r.ok ? await r.json() : null;
        good = state === 'withdraw' ? status === 404 : r.ok && Number(entry?.revision) === revision;
        if (good && paths[d.kind] && d.translations) {
          const locale = target === 'gwd' ? 'de' : 'tr';
          const [translations]: any = await getContentPool().query(
            'SELECT slug FROM `' +
              publishedSchema +
              '`.`' +
              d.translations.table +
              '` WHERE `' +
              d.translations.fk +
              '`=? AND locale=?',
            [id, locale],
          );
          const slug = translations[0]?.slug;
          if (slug) {
            const page = await fetch(
              origins[target] +
                '/' +
                locale +
                paths[d.kind][locale] +
                '/' +
                encodeURIComponent(slug),
              {
                redirect: 'manual',
                headers: { 'Cache-Control': 'no-cache' },
                signal: AbortSignal.timeout(4000),
              },
            );
            good =
              state === 'withdraw'
                ? page.status === 404
                : page.ok && Number(page.headers.get('x-content-revision')) === revision;
          }
        }
      } catch {}
      await getContentPool().query(
        'INSERT INTO ' +
          q('content_delivery_receipts') +
          ' (site_id,kind,entity_id,revision,state,http_status,verified_at) VALUES (?,?,?,?,?,?,NOW(3)) ON DUPLICATE KEY UPDATE revision=VALUES(revision),state=VALUES(state),http_status=VALUES(http_status),verified_at=VALUES(verified_at)',
        [target, d.kind, id, revision, good ? 'verified' : 'pending', status || null],
      );
      return {
        site: target,
        state: good ? 'verified' : 'pending',
        http_status: status,
        elapsed_ms: Date.now() - started,
      };
    }),
  );
  return results;
}
export async function registerSharedContentAdmin(app: FastifyInstance) {
  app.get('/shared-content/status', async () => ({
    enabled,
    site,
    writer: isWriter,
    editor_origin: editorOrigin,
    source: enabled ? 'shared' : 'legacy',
    required_locales: ['tr', 'de', 'en'],
  }));
  app.addHook('preHandler', async (req, reply) => {
    if (!req.url.includes('/shared-content/')) return;
    if (!enabled && !req.url.endsWith('/status'))
      throw Object.assign(Error('shared_content_disabled'), { statusCode: 503 });
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && !isWriter)
      throw Object.assign(Error('shared_content_read_only'), { statusCode: 423 });
  });
  app.post('/shared-content/entries/:kind/:id/preview', async (req: any) => {
    const d = definition(req),
      target = req.body?.site,
      locale = req.body?.locale;
    if (
      !paths[d.kind] ||
      !['gwd', 'gzl'].includes(target) ||
      !['tr', 'de', 'en'].includes(locale) ||
      (target === 'gzl' && locale !== 'tr') ||
      (target === 'gwd' && locale === 'tr')
    )
      throw Object.assign(Error('invalid_preview_target'), { statusCode: 400 });
    const m = await metadata(d.kind, req.params.id);
    if (!m) throw Object.assign(Error('content_not_found'), { statusCode: 404 });
    return {
      token: await createPreview(d.kind, req.params.id, target, locale, actor(req)),
      action: origins[target] + '/content-preview',
    };
  });
  app.get('/shared-content/overview', async () => {
    const [modules] = await getContentPool().query(
      "SELECT kind,COUNT(*) AS total,SUM(published_revision IS NOT NULL AND state NOT IN ('withdrawn','deleted')) AS live,SUM(revision<>COALESCE(published_revision,0)) AS pending FROM " +
        q('content_entries') +
        ' GROUP BY kind',
    );
    const [[pending]]: any = await getContentPool().query(
      'SELECT COUNT(*) AS total FROM ' + q('content_outbox') + ' WHERE delivered_at IS NULL',
    );
    return { modules, pending_deliveries: Number(pending.total) };
  });
  app.get('/shared-content/identify', async (req: any) => {
    const d = byKind.get(req.query.kind as ContentKind),
      key = String(req.query.key || '');
    if (!d || !key || key.length > 255)
      throw Object.assign(Error('invalid_content_key'), { statusCode: 400 });
    const [direct]: any = await getContentPool().query(
      'SELECT entity_id AS id FROM ' + q('content_entries') + ' WHERE kind=? AND entity_id=?',
      [d.kind, key],
    );
    if (direct[0]) return direct[0];
    const [aliases]: any = await getContentPool().query(
      'SELECT entity_id AS id FROM ' +
        q('content_url_aliases') +
        " WHERE kind=? AND slug=? ORDER BY locale='tr' DESC,site_id LIMIT 1",
      [d.kind, key],
    );
    if (!aliases[0]) throw Object.assign(Error('content_not_found'), { statusCode: 404 });
    return aliases[0];
  });
  app.get('/shared-content/entries', async (req: any) => {
    const d = byKind.get(req.query.kind as ContentKind);
    if (!d) throw Object.assign(Error('invalid_content_kind'), { statusCode: 400 });
    const [rows]: any = await getContentPool().query(
      'SELECT p.*,e.entity_id AS id,e.revision,e.published_revision,e.state' +
        (d.translations
          ? ',t.`' +
            (['categories', 'subcategories', 'services'].includes(d.kind)
              ? 'name'
              : d.kind === 'faqs'
                ? 'question'
                : ['brands', 'skill-logos'].includes(d.kind)
                  ? 'label'
                  : 'title') +
            '` AS editor_title'
          : '') +
        ' FROM ' +
        q('content_entries') +
        ' e LEFT JOIN `' +
        workspaceSchema +
        '`.`' +
        d.table +
        '` p ON BINARY p.id=BINARY e.entity_id' +
        (d.translations
          ? ' LEFT JOIN `' +
            workspaceSchema +
            '`.`' +
            d.translations.table +
            '` t ON BINARY t.`' +
            d.translations.fk +
            "`=BINARY p.id AND t.locale='tr'"
          : '') +
        ' WHERE e.kind=? ORDER BY e.updated_at DESC,e.entity_id LIMIT 500',
      [d.kind],
    );
    for(const row of rows)if(row.state==='deleted'){const [history]:any=await getContentPool().query('SELECT payload FROM '+q('content_revisions')+' WHERE kind=? AND entity_id=? AND JSON_EXTRACT(payload,\'$.deleted\')=false ORDER BY revision DESC LIMIT 1',[d.kind,row.id]);if(history[0]&&d.translations){const payload=typeof history[0].payload==='string'?JSON.parse(history[0].payload):history[0].payload;const translated=(payload.tables[d.translations.table]||[]).find((t:any)=>t.locale==='tr')||payload.tables[d.translations.table]?.[0];row.editor_title=translated?.title||translated?.name||translated?.question||translated?.label||row.id;}}
    return rows;
  });
  app.get('/shared-content/entries/:kind/:id', async (req, reply) => {
    const d = definition(req);
    const m = await metadata(d.kind, (req.params as any).id);
    if (!m) return reply.code(404).send({ error: { message: 'content_not_found' } });
    return m;
  });
  app.get('/shared-content/entries/:kind/:id/revisions', async (req) => {
    const d = definition(req);
    const [rows] = await getContentPool().query(
      'SELECT revision,hash,actor_id,created_at,JSON_EXTRACT(payload,\'$.deleted\') AS is_deleted FROM ' +
        q('content_revisions') +
        ' WHERE kind=? AND entity_id=? ORDER BY revision DESC LIMIT 100',
      [d.kind, (req.params as any).id],
    );
    return (rows as any[]).map(row=>({...row,is_deleted:row.is_deleted===true||row.is_deleted===1||row.is_deleted==='true'}));
  });
  app.post('/shared-content/entries/:kind/:id/approve', async (req: any) => {
    const d = definition(req),
      locale = String(req.body?.locale || '');
    if (!['tr', 'en', 'de'].includes(locale))
      throw Object.assign(Error('invalid_locale'), { statusCode: 400 });
    await transaction(async (c) => {
      const rev = await lock(c, req, d);
      if (d.translations) {
        const [rows]: any = await c.query(
          'SELECT * FROM `' +
            workspaceSchema +
            '`.`' +
            d.translations.table +
            '` WHERE `' +
            d.translations.fk +
            '`=? AND locale=?',
          [req.params.id, locale],
        );
        if (!rows[0]) throw Object.assign(Error('translation_missing'), { statusCode: 422 });
      }
      await c.query(
        'INSERT INTO ' +
          q('content_translation_states') +
          " (kind,entity_id,locale,source_revision,status) VALUES (?,?,?,?,'approved') ON DUPLICATE KEY UPDATE status=VALUES(status),source_revision=VALUES(source_revision)",
        [d.kind, req.params.id, locale, rev],
      );
      await c.query(
        'INSERT INTO ' +
          q('content_audit') +
          " (kind,entity_id,revision,action,actor_id,details) VALUES (?,?,?,'approve-translation',?,?)",
        [d.kind, req.params.id, rev, actor(req), JSON.stringify({ locale })],
      );
    });
    return metadata(d.kind, req.params.id);
  });
  app.post('/shared-content/entries/:kind/:id/publish', async (req: any, reply) => {
    const d = definition(req),
      rev = expect(req);
    await transaction((c) => publish(c, d, req.params.id, rev, actor(req), String(req.id)));
    const delivery =
      process.env.CONTENT_VERIFY_ORIGINS === '0'
        ? []
        : await verify(d, req.params.id, rev, 'publish');
    return reply
      .code(delivery.every((x) => x.state === 'verified') ? 200 : 202)
      .send({ ...(await metadata(d.kind, req.params.id)), delivery });
  });
  app.post('/shared-content/entries/:kind/:id/withdraw', async (req: any, reply) => {
    const d = definition(req);
    let rev = 0;
    await transaction(async (c) => {
      await lock(c, req, d);
      const before = await readAggregate(c, d, req.params.id);
      await c.query(
        'UPDATE `' +
          workspaceSchema +
          '`.`' +
          d.table +
          '` SET `' +
          d.publishedField +
          '`=0 WHERE id=?',
        [req.params.id],
      );
      rev = await saveRevision(c, d, req.params.id, actor(req), String(req.id), before);
    });
    const delivery =
      process.env.CONTENT_VERIFY_ORIGINS === '0'
        ? []
        : await verify(d, req.params.id, rev, 'withdraw');
    return reply
      .code(delivery.every((x) => x.state === 'verified') ? 200 : 202)
      .send({ ...(await metadata(d.kind, req.params.id)), delivery });
  });
  app.post('/shared-content/entries/:kind/:id/restore', async (req: any) => {
    const d = definition(req);
    await transaction(async (c) => {
      await lock(c, req, d);
      const before = await readAggregate(c, d, req.params.id);
      const [rows]: any = await c.query(
        'SELECT payload FROM ' +
          q('content_revisions') +
          ' WHERE kind=? AND entity_id=? AND revision=?',
        [d.kind, req.params.id, Number(req.body?.target_revision)],
      );
      if (!rows[0]) throw Object.assign(Error('revision_not_found'), { statusCode: 404 });
      const a = typeof rows[0].payload === 'string' ? JSON.parse(rows[0].payload) : rows[0].payload;
      if (a.deleted) throw Object.assign(Error('cannot_restore_tombstone'), { statusCode: 422 });
      a.tables[d.table][0][d.publishedField] = before.tables[d.table]?.[0]?.[d.publishedField] || 0;
      await applyAggregate(c, d, req.params.id, a, workspaceSchema);
      await saveRevision(c, d, req.params.id, actor(req), String(req.id), before);
    });
    return metadata(d.kind, req.params.id);
  });
  app.put('/shared-content/entries/:kind/:id/offers/:site', async (req: any) => {
    const d = definition(req);
    if (!d.commercial?.length || !['gwd', 'gzl'].includes(req.params.site))
      throw Object.assign(Error('invalid_offer'), { statusCode: 400 });
    const offer = req.body?.offer;
    if (!offer || typeof offer !== 'object' || Array.isArray(offer))
      throw Object.assign(Error('invalid_offer'), { statusCode: 400 });
    for (const [k, v] of Object.entries(offer)) {
      if (!d.commercial.includes(k))
        throw Object.assign(Error('invalid_offer_field'), { statusCode: 400 });
      if (k === 'currency' && !/^[A-Z]{3}$/.test(String(v)))
        throw Object.assign(Error('invalid_currency'), { statusCode: 400 });
      if (
        /price|amount|quantity/.test(k) &&
        v !== null &&
        (!/^\d+(\.\d{1,2})?$/.test(String(v)) || Number(v) < 0)
      )
        throw Object.assign(Error('invalid_amount'), { statusCode: 400 });
    }
    await transaction(async (c) => {
      const rev = await lock(c, req, d);
      const expected = Number(req.body?.expected_offer_revision);
      if (!Number.isSafeInteger(expected) || expected < 0)
        throw Object.assign(Error('offer_revision_required'), { statusCode: 428 });
      const [before]: any = await c.query(
        'SELECT offer,revision FROM ' +
          q('content_offers') +
          ' WHERE site_id=? AND kind=? AND entity_id=? FOR UPDATE',
        [req.params.site, d.kind, req.params.id],
      );
      if (Number(before[0]?.revision || 0) !== expected)
        throw Object.assign(Error('offer_revision_conflict'), { statusCode: 409 });
      await c.query(
        'INSERT INTO ' +
          q('content_offers') +
          ' (site_id,kind,entity_id,offer) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE offer=VALUES(offer),revision=revision+1,updated_at=NOW(3)',
        [req.params.site, d.kind, req.params.id, JSON.stringify(offer)],
      );
      await c.query(
        'INSERT INTO ' +
          q('content_audit') +
          ' (kind,entity_id,revision,action,actor_id,details) VALUES (?,?,?,?,?,?)',
        [
          d.kind,
          req.params.id,
          rev,
          'save-country-offer',
          actor(req),
          JSON.stringify({
            site: req.params.site,
            offer_revision: expected + 1,
            before: before[0]?.offer || null,
            after: offer,
          }),
        ],
      );
    });
    return metadata(d.kind, req.params.id);
  });
  app.get('/shared-content/site-profiles', async () => {
    const [rows]: any = await getContentPool().query(
      'SELECT site_id,profile,updated_at FROM ' + q('content_site_profiles'),
    );
    return rows.map((r: any) => ({
      ...r,
      profile: typeof r.profile === 'string' ? JSON.parse(r.profile) : r.profile,
    }));
  });
}
export async function registerSharedContentPublic(app: FastifyInstance) {
  app.get('/content/health', async () => {
    if (!enabled) throw Object.assign(Error('shared_content_disabled'), { statusCode: 503 });
    await getContentPool().query(
      'SELECT 1 FROM `' + workspaceSchema + '`.content_migrations LIMIT 1',
    );
    return { enabled: true, site, source: 'shared-publication' };
  });
  app.get('/content/preview', async (req: any, reply) => {
    const data = await readPreview(String(req.headers['x-content-preview'] || ''));
    reply.header('cache-control', 'private, no-store');
    reply.header('x-robots-tag', 'noindex, nofollow');
    return data;
  });
  app.get('/content/state/:kind/:id', async (req: any, reply) => {
    if (!enabled) throw Object.assign(Error('shared_content_disabled'), { statusCode: 503 });
    const d = definition(req);
    const [rows]: any = await getContentPool().query(
      'SELECT id FROM `' + publishedSchema + '`.`live_' + d.table + '` WHERE id=?',
      [req.params.id],
    );
    if (!rows[0]) return reply.code(404).send({ error: { message: 'not_found' } });
    const m = await metadata(d.kind, req.params.id);
    reply.header('cache-control', 'no-store');
    return { id: req.params.id, kind: d.kind, revision: m?.published_revision, site };
  });
  app.get('/content/resolve', async (req: any, reply) => {
    if (!enabled) return reply.code(503).send({ error: { message: 'shared_content_disabled' } });
    const kind = String(req.query.kind),
      locale = String(req.query.locale),
      slug = String(req.query.slug || '');
    const d = byKind.get(kind as ContentKind);
    if (!d?.translations || !paths[kind] || !['de', 'en', 'tr'].includes(locale))
      return reply.code(400).send({ error: { message: 'invalid_query' } });
    const t = d.translations;
    const [rows]: any = await getContentPool().query(
      'SELECT p.id,t.slug FROM `' +
        publishedSchema +
        '`.`' +
        d.table +
        '` p JOIN `' +
        publishedSchema +
        '`.`' +
        t.table +
        '` t ON BINARY t.`' +
        t.fk +
        '`=p.id AND t.locale=? WHERE p.`' +
        d.publishedField +
        '`=1 AND (t.slug=? OR p.id IN (SELECT entity_id FROM ' +
        q('content_url_aliases') +
        ' WHERE kind=? AND locale=? AND slug=?)) LIMIT 1',
      [locale, slug, kind, locale, slug],
    );
    if (!rows[0]) return reply.code(404).send({ error: { message: 'not_found' } });
    const id = rows[0].id;
    const [translations]: any = await getContentPool().query(
      'SELECT locale,slug FROM `' + publishedSchema + '`.`' + t.table + '` WHERE `' + t.fk + '`=?',
      [id],
    );
    const urls: any = {};
    for (const tr of translations) {
      const target = tr.locale === 'tr' ? 'gzl' : 'gwd';
      urls[tr.locale] =
        origins[target] +
        '/' +
        tr.locale +
        paths[kind][tr.locale] +
        '/' +
        encodeURIComponent(tr.slug);
    }
    const m = await metadata(kind, id);
    reply.header('cache-control', 'no-store');
    return {
      id,
      kind,
      locale,
      slug: rows[0].slug,
      canonical: urls[locale],
      alternates: urls,
      x_default: urls.en || urls.de || urls.tr,
      revision: m?.published_revision,
    };
  });
}
