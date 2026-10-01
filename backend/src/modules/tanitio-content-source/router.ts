import { timingSafeEqual } from 'node:crypto';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { RowDataPacket } from 'mysql2';
import { z } from 'zod';
import { env } from '@/core/env';
import { pool } from '@/db/client';

// Adres kurulumdan gelir (marka kurali): ayni kod guezelwebdesign.com'da da kosar.
const WEBSITE = String(env.FRONTEND_URL || '').replace(/\/+$/, '');
const LOCALES = ['tr', 'en', 'de'] as const;
const ROUTES = {
  services: { tr: 'hizmetler', en: 'services', de: 'leistungen' },
  work: { tr: 'portfolyo', en: 'work', de: 'projekte' },
} as const;

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(24),
  offset: z.coerce.number().int().min(0).default(0),
  q: z.string().trim().max(160).optional(),
  locale: z.enum(LOCALES).default('tr'),
  updated_since: z.string().datetime().optional(),
  sort: z.enum(['newest', 'popular']).default('newest'),
});

type Query = z.infer<typeof querySchema>;
type DbRow = RowDataPacket & Record<string, unknown>;

function authorized(req: FastifyRequest) {
  const expected = env.TANITIO_CONTENT_API_KEY;
  const bearer = String(req.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
  const supplied = bearer || String(req.headers['x-api-key'] ?? '');
  if (!expected || !supplied) return false;
  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  return left.length === right.length && timingSafeEqual(left, right);
}

function dateOrNull(value: unknown) {
  if (!value) return null;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function imageUrl(value: unknown) {
  const path = String(value ?? '').trim();
  if (!path) return null;
  try { return new URL(path, WEBSITE).toString(); } catch { return null; }
}

function parseQuery(raw: unknown): Query {
  return querySchema.parse(raw);
}

function filters(q: Query, fields: string[]) {
  const where: string[] = [];
  const args: unknown[] = [];
  if (q.q) {
    where.push(`(${fields.map((field) => `${field} LIKE ?`).join(' OR ')})`);
    for (let i = 0; i < fields.length; i += 1) args.push(`%${q.q}%`);
  }
  if (q.updated_since) {
    where.push('source.updated_at >= ?');
    args.push(new Date(q.updated_since));
  }
  return { where, args };
}

function page(total: number, q: Query, items: unknown[]) {
  return { items, total, hasMore: q.offset + items.length < total };
}

export async function registerTanitioContentSource(app: FastifyInstance) {
  app.addHook('onRequest', async (req, reply) => {
    if (!authorized(req)) {
      return reply.status(401).send({
        error: { code: 'INVALID_API_KEY', message: 'Geçerli Tanitio içerik API anahtarı gerekli.' },
      });
    }
  });

  app.setErrorHandler((error, _req, reply) => {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: { code: 'INVALID_QUERY', message: 'Sorgu parametreleri geçersiz.', details: error.flatten() } });
    }
    app.log.error(error);
    return reply.status(500).send({ error: { code: 'CONTENT_SOURCE_ERROR', message: 'İçerik kaynağı okunamadı.' } });
  });

  app.get('/contract', async () => ({
    contract: 'gzlteknoloji-tanitio-web-connection',
    version: '1.0',
    tenant: 'gzlteknoloji',
    locale: 'tr-TR',
    locales: LOCALES,
    timezone: 'Europe/Istanbul',
    capabilities: { read: ['articles', 'products', 'projects', 'context'], write: [], publish: false },
    endpoints: { articles: '/articles', products: '/products', projects: '/projects', context: '/context' },
    auth: { type: 'bearer', header: 'Authorization' },
  }));

  app.get('/articles', async (req) => {
    const q = parseQuery(req.query);
    const extra = filters(q, ['i.title', 'i.summary', 'i.excerpt', 'i.content']);
    const where = ["source.module_key = 'blog'", 'source.is_published = 1', 'i.locale = ?', ...extra.where];
    const args = [q.locale, ...extra.args];
    const clause = where.join(' AND ');
    const [countResult, rowsResult] = await Promise.all([
      pool.query<DbRow[]>(`SELECT COUNT(*) total FROM custom_pages source JOIN custom_pages_i18n i ON i.page_id=source.id WHERE ${clause}`, args),
      pool.query<DbRow[]>(`SELECT source.id,i.slug,i.title,COALESCE(i.summary,i.excerpt) excerpt,COALESCE(source.featured_image,source.image_url) image,i.tags,source.created_at,source.updated_at FROM custom_pages source JOIN custom_pages_i18n i ON i.page_id=source.id WHERE ${clause} ORDER BY source.updated_at DESC LIMIT ? OFFSET ?`, [...args, q.limit, q.offset]),
    ]);
    const total = Number(countResult[0][0]?.total ?? 0);
    const items = rowsResult[0].map((row) => ({
      id: String(row.id), kind: 'article', content_type: 'blog', slug: row.slug, title: row.title,
      excerpt: row.excerpt, url: `${WEBSITE}/${q.locale}/blog/${row.slug}`, image_url: imageUrl(row.image),
      tags: row.tags, published_at: dateOrNull(row.created_at), updated_at: dateOrNull(row.updated_at),
    }));
    return page(total, q, items);
  });

  app.get('/products', async (req) => {
    const q = parseQuery(req.query);
    const extra = filters(q, ['i.name', 'i.summary', 'i.content']);
    const where = ['source.is_active = 1', 'i.locale = ?', ...extra.where];
    const args = [q.locale, ...extra.args];
    const clause = where.join(' AND ');
    const order = q.sort === 'popular' ? 'source.featured DESC, source.display_order ASC' : 'source.updated_at DESC';
    const [countResult, rowsResult] = await Promise.all([
      pool.query<DbRow[]>(`SELECT COUNT(*) total FROM services source JOIN services_i18n i ON i.service_id=source.id WHERE ${clause}`, args),
      pool.query<DbRow[]>(`SELECT source.id,source.type,source.featured,source.price_onetime,source.currency,source.is_purchasable,source.featured_image,source.image_url,i.slug,i.name,i.summary,source.created_at,source.updated_at FROM services source JOIN services_i18n i ON i.service_id=source.id WHERE ${clause} ORDER BY ${order} LIMIT ? OFFSET ?`, [...args, q.limit, q.offset]),
    ]);
    const total = Number(countResult[0][0]?.total ?? 0);
    const items = rowsResult[0].map((row) => ({
      id: String(row.id), kind: 'product', content_type: 'service', slug: row.slug, title: row.name,
      excerpt: row.summary, url: `${WEBSITE}/${q.locale}/${ROUTES.services[q.locale]}/${row.slug}`,
      image_url: imageUrl(row.featured_image ?? row.image_url), category: row.type,
      price: row.price_onetime == null ? null : Number(row.price_onetime), currency: row.currency,
      in_stock: Boolean(row.is_purchasable), popularity: row.featured ? 1 : 0,
      published_at: dateOrNull(row.created_at), updated_at: dateOrNull(row.updated_at),
    }));
    return page(total, q, items);
  });

  app.get('/projects', async (req) => {
    const q = parseQuery(req.query);
    const extra = filters(q, ['i.title', 'i.summary', 'i.content']);
    const where = ['source.is_published = 1', 'i.locale = ?', ...extra.where];
    const args = [q.locale, ...extra.args];
    const clause = where.join(' AND ');
    const order = q.sort === 'popular' ? 'source.is_featured DESC, source.display_order ASC' : 'source.updated_at DESC';
    const [countResult, rowsResult] = await Promise.all([
      pool.query<DbRow[]>(`SELECT COUNT(*) total FROM projects source JOIN projects_i18n i ON i.project_id=source.id WHERE ${clause}`, args),
      pool.query<DbRow[]>(`SELECT source.id,source.category,source.is_featured,source.featured_image,source.website_url,i.slug,i.title,i.summary,source.created_at,source.updated_at FROM projects source JOIN projects_i18n i ON i.project_id=source.id WHERE ${clause} ORDER BY ${order} LIMIT ? OFFSET ?`, [...args, q.limit, q.offset]),
    ]);
    const total = Number(countResult[0][0]?.total ?? 0);
    const items = rowsResult[0].map((row) => ({
      id: String(row.id), kind: 'project', content_type: 'case-study', slug: row.slug, title: row.title,
      excerpt: row.summary, url: `${WEBSITE}/${q.locale}/${ROUTES.work[q.locale]}/${row.slug}`, image_url: imageUrl(row.featured_image),
      website_url: row.website_url, category: row.category, popularity: row.is_featured ? 1 : 0,
      published_at: dateOrNull(row.created_at), updated_at: dateOrNull(row.updated_at),
    }));
    return page(total, q, items);
  });

  app.get('/context', async () => {
    const [[articles], [products], [projects]] = await Promise.all([
      pool.query<DbRow[]>("SELECT COUNT(*) total,MAX(updated_at) lastUpdated FROM custom_pages WHERE module_key='blog' AND is_published=1"),
      pool.query<DbRow[]>('SELECT COUNT(*) total,MAX(updated_at) lastUpdated FROM services WHERE is_active=1'),
      pool.query<DbRow[]>('SELECT COUNT(*) total,MAX(updated_at) lastUpdated FROM projects WHERE is_published=1'),
    ]);
    return {
      tenant: 'gzlteknoloji', brand: 'GZL Teknoloji', website: WEBSITE,
      sector: 'kurumsal web, e-ticaret, özel yazılım ve dijital otomasyon',
      audience: ['KOBİler', 'girişimciler', 'dijital dönüşüm hedefleyen işletmeler'],
      contentPillars: ['özel yazılım', 'web ve e-ticaret', 'iş otomasyonu', 'GEO ve SEO', 'vaka çalışmaları'],
      defaultHashtags: ['#gzlteknoloji', '#yazilim', '#webtasarim', '#eticaret', '#dijitaldonusum'],
      inventory: {
        articles: { total: Number(articles[0]?.total ?? 0), lastUpdated: dateOrNull(articles[0]?.lastUpdated) },
        products: { total: Number(products[0]?.total ?? 0), lastUpdated: dateOrNull(products[0]?.lastUpdated) },
        projects: { total: Number(projects[0]?.total ?? 0), lastUpdated: dateOrNull(projects[0]?.lastUpdated) },
      },
    };
  });
}
