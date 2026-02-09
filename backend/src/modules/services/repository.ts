// src/modules/services/repository.ts
// =============================================================
// FINAL — Services repository (storageAssets schema uyumlu + TS fix)
// - FIX: NewServiceImageI18nRow yanlış tipe resolve oluyordu (image_id yok hatası)
//   -> Tipleri import etmek yerine tablolar üzerinden infer ediyoruz.
// - i18n: COALESCE(req > default)
// - cover: image_url/featured_image + storage asset -> cover_url
// - locales: DB-backed (site_settings) for replicate/apply_all_locales
// =============================================================

import { randomUUID } from 'crypto';
import { db } from '@/db/client';
import { and, asc, desc, eq, sql, type SQL } from 'drizzle-orm';
import { alias } from 'drizzle-orm/mysql-core';

import { services, servicesI18n, serviceImages, serviceImagesI18n } from './schema';

import { storageAssets } from '@/modules/storage/schema';
import { publicUrlOf } from '@/modules/storage/_util';
import { getAppLocales } from '@/modules/siteSettings/service';
import type { LocaleCode, Sortable, BoolLike,ServiceMerged, ServiceImageMerged  } from '@/modules/_shared';
import { to01, parseOrder} from '@/modules/_shared';

// ✅ Drizzle infer (tek doğru kaynak: tablo tanımı)
type NewServiceRow = typeof services.$inferInsert;
type NewServiceI18nRow = typeof servicesI18n.$inferInsert;

type NewServiceImageRow = typeof serviceImages.$inferInsert;
type NewServiceImageI18nRow = typeof serviceImagesI18n.$inferInsert;



function baseSelect(iReq: any, iDef: any, saCover: any) {
  return {
    id: services.id,
    type: services.type,

    featured: services.featured,
    is_active: services.is_active,
    display_order: services.display_order,

    featured_image: services.featured_image,
    image_url: services.image_url,
    image_asset_id: services.image_asset_id,

    // storage_assets join fields
    cover_bucket: saCover.bucket,
    cover_path: saCover.path,
    cover_cdn_url: saCover.url, // text

    created_at: services.created_at,
    updated_at: services.updated_at,

    slug: sql<string>`COALESCE(${iReq.slug}, ${iDef.slug})`.as('slug'),
    name: sql<string>`COALESCE(${iReq.name}, ${iDef.name})`.as('name'),
    summary: sql<string>`COALESCE(${iReq.summary}, ${iDef.summary})`.as('summary'),
    content: sql<string>`COALESCE(${iReq.content}, ${iDef.content})`.as('content'),
    image_alt: sql<string>`COALESCE(${iReq.image_alt}, ${iDef.image_alt})`.as('image_alt'),

    meta_title: sql<string>`COALESCE(${iReq.meta_title}, ${iDef.meta_title})`.as('meta_title'),
    meta_description: sql<string>`COALESCE(${iReq.meta_description}, ${iDef.meta_description})`.as(
      'meta_description',
    ),
    meta_keywords: sql<string>`COALESCE(${iReq.meta_keywords}, ${iDef.meta_keywords})`.as(
      'meta_keywords',
    ),

    locale_resolved: sql<string>`
      CASE WHEN ${iReq.id} IS NOT NULL THEN ${iReq.locale} ELSE ${iDef.locale} END
    `.as('locale_resolved'),
  };
}

function imgSelect(iReq: any, iDef: any, sa: any) {
  return {
    id: serviceImages.id,
    service_id: serviceImages.service_id,
    image_asset_id: serviceImages.image_asset_id,
    image_url: serviceImages.image_url,
    is_active: serviceImages.is_active,
    display_order: serviceImages.display_order,
    created_at: serviceImages.created_at,
    updated_at: serviceImages.updated_at,

    title: sql<string>`COALESCE(${iReq.title}, ${iDef.title})`.as('title'),
    alt: sql<string>`COALESCE(${iReq.alt}, ${iDef.alt})`.as('alt'),
    caption: sql<string>`COALESCE(${iReq.caption}, ${iDef.caption})`.as('caption'),
    locale_resolved: sql<string>`
      CASE WHEN ${iReq.id} IS NOT NULL THEN ${iReq.locale} ELSE ${iDef.locale} END
    `.as('locale_resolved'),

    img_bucket: sa.bucket,
    img_path: sa.path,
    img_url: sa.url,
  };
}

const resolveAssetUrl = (
  bucket?: string | null,
  path?: string | null,
  providerUrl?: string | null,
) => (bucket && path ? publicUrlOf(bucket, path, providerUrl ?? null) : null);

/* ----------------------- list / get ----------------------- */

export async function listServices(params: {
  locale: LocaleCode;
  defaultLocale: LocaleCode;
  orderParam?: string;
  sort?: Sortable;
  order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
  q?: string;
  type?: string;
  featured?: BoolLike;
  is_active?: BoolLike;
}) {
  const iReq = alias(servicesI18n, 'si_req');
  const iDef = alias(servicesI18n, 'si_def');
  const saCover = alias(storageAssets, 'sa_cover');

  const filters: SQL[] = [];

  const featured = to01(params.featured);
  const active = to01(params.is_active);

  if (featured !== undefined) filters.push(eq(services.featured, featured));
  if (active !== undefined) filters.push(eq(services.is_active, active));
  if (params.type) filters.push(eq(services.type, params.type));

  if (params.q && params.q.trim()) {
    const s = `%${params.q.trim()}%`;
    filters.push(sql`
      (
        COALESCE(${iReq.name}, ${iDef.name}) LIKE ${s}
        OR COALESCE(${iReq.slug}, ${iDef.slug}) LIKE ${s}
        OR COALESCE(${iReq.summary}, ${iDef.summary}) LIKE ${s}
        OR COALESCE(${iReq.content}, ${iDef.content}) LIKE ${s}
      )
    `);
  }

  const whereExpr: SQL = filters.length > 0 ? (and(...filters) as SQL) : sql`1=1`;

  const ord = parseOrder(params.orderParam, params.sort, params.order);
  const orderBy = ord
    ? ord.dir === 'asc'
      ? asc(services[ord.col])
      : desc(services[ord.col])
    : asc(services.display_order);

  const take = params.limit && params.limit > 0 ? params.limit : 50;
  const skip = params.offset && params.offset >= 0 ? params.offset : 0;

  const rows = await db
    .select(baseSelect(iReq, iDef, saCover))
    .from(services)
    .leftJoin(iReq, and(eq(iReq.service_id, services.id), eq(iReq.locale, params.locale)))
    .leftJoin(iDef, and(eq(iDef.service_id, services.id), eq(iDef.locale, params.defaultLocale)))
    .leftJoin(saCover, eq(saCover.id, services.image_asset_id))
    .where(whereExpr)
    .orderBy(orderBy)
    .limit(take)
    .offset(skip);

  const cnt = await db
    .select({ c: sql<number>`COUNT(1)` })
    .from(services)
    .leftJoin(iReq, and(eq(iReq.service_id, services.id), eq(iReq.locale, params.locale)))
    .leftJoin(iDef, and(eq(iDef.service_id, services.id), eq(iDef.locale, params.defaultLocale)))
    .where(whereExpr);

  const total = cnt[0]?.c ?? 0;

  const items = (rows as any[]).map((r) => {
    const coverFromAsset = resolveAssetUrl(r.cover_bucket, r.cover_path, r.cover_cdn_url);
    const cover_url = (r.image_url || r.featured_image || coverFromAsset || null) as string | null;

    const out: ServiceMerged = {
      id: r.id,
      type: r.type,

      featured: r.featured,
      is_active: r.is_active,
      display_order: r.display_order,

      featured_image: r.featured_image ?? null,
      image_url: r.image_url ?? null,
      image_asset_id: r.image_asset_id ?? null,

      cover_url,

      created_at: r.created_at,
      updated_at: r.updated_at,

      slug: r.slug ?? null,
      name: r.name ?? null,
      summary: r.summary ?? null,
      content: r.content ?? null,
      image_alt: r.image_alt ?? null,

      meta_title: r.meta_title ?? null,
      meta_description: r.meta_description ?? null,
      meta_keywords: r.meta_keywords ?? null,

      locale_resolved: r.locale_resolved ?? null,
    };

    return out;
  });

  return { items, total };
}

export async function getServiceMergedById(
  locale: LocaleCode,
  defaultLocale: LocaleCode,
  id: string,
) {
  const iReq = alias(servicesI18n, 'si_req');
  const iDef = alias(servicesI18n, 'si_def');
  const saCover = alias(storageAssets, 'sa_cover');

  const rows = await db
    .select(baseSelect(iReq, iDef, saCover))
    .from(services)
    .leftJoin(iReq, and(eq(iReq.service_id, services.id), eq(iReq.locale, locale)))
    .leftJoin(iDef, and(eq(iDef.service_id, services.id), eq(iDef.locale, defaultLocale)))
    .leftJoin(saCover, eq(saCover.id, services.image_asset_id))
    .where(eq(services.id, id))
    .limit(1);

  const r = rows[0] as any;
  if (!r) return null;

  const coverFromAsset = resolveAssetUrl(r.cover_bucket, r.cover_path, r.cover_cdn_url);
  const cover_url = (r.image_url || r.featured_image || coverFromAsset || null) as string | null;

  const out: ServiceMerged = {
    id: r.id,
    type: r.type,

    featured: r.featured,
    is_active: r.is_active,
    display_order: r.display_order,

    featured_image: r.featured_image ?? null,
    image_url: r.image_url ?? null,
    image_asset_id: r.image_asset_id ?? null,

    cover_url,

    created_at: r.created_at,
    updated_at: r.updated_at,

    slug: r.slug ?? null,
    name: r.name ?? null,
    summary: r.summary ?? null,
    content: r.content ?? null,
    image_alt: r.image_alt ?? null,

    meta_title: r.meta_title ?? null,
    meta_description: r.meta_description ?? null,
    meta_keywords: r.meta_keywords ?? null,

    locale_resolved: r.locale_resolved ?? null,
  };

  return out;
}

export async function getServiceMergedBySlug(
  locale: LocaleCode,
  defaultLocale: LocaleCode,
  slug: string,
) {
  const iReq = alias(servicesI18n, 'si_req');
  const iDef = alias(servicesI18n, 'si_def');
  const saCover = alias(storageAssets, 'sa_cover');

  const rows = await db
    .select(baseSelect(iReq, iDef, saCover))
    .from(services)
    .leftJoin(iReq, and(eq(iReq.service_id, services.id), eq(iReq.locale, locale)))
    .leftJoin(iDef, and(eq(iDef.service_id, services.id), eq(iDef.locale, defaultLocale)))
    .leftJoin(saCover, eq(saCover.id, services.image_asset_id))
    .where(
      sql`( ${iReq.id} IS NOT NULL AND ${iReq.slug} = ${slug} )
          OR ( ${iReq.id} IS NULL AND ${iDef.slug} = ${slug} )`,
    )
    .limit(1);

  const r = rows[0] as any;
  if (!r) return null;

  const coverFromAsset = resolveAssetUrl(r.cover_bucket, r.cover_path, r.cover_cdn_url);
  const cover_url = (r.image_url || r.featured_image || coverFromAsset || null) as string | null;

  const out: ServiceMerged = {
    id: r.id,
    type: r.type,

    featured: r.featured,
    is_active: r.is_active,
    display_order: r.display_order,

    featured_image: r.featured_image ?? null,
    image_url: r.image_url ?? null,
    image_asset_id: r.image_asset_id ?? null,

    cover_url,

    created_at: r.created_at,
    updated_at: r.updated_at,

    slug: r.slug ?? null,
    name: r.name ?? null,
    summary: r.summary ?? null,
    content: r.content ?? null,
    image_alt: r.image_alt ?? null,

    meta_title: r.meta_title ?? null,
    meta_description: r.meta_description ?? null,
    meta_keywords: r.meta_keywords ?? null,

    locale_resolved: r.locale_resolved ?? null,
  };

  return out;
}

/* ----------------------- create/update/delete ----------------------- */

export async function createServiceParent(values: NewServiceRow) {
  await db.insert(services).values(values);
  return values.id;
}

export async function upsertServiceI18n(
  serviceId: string,
  locale: LocaleCode,
  data: Partial<
    Omit<NewServiceI18nRow, 'id' | 'service_id' | 'locale' | 'created_at' | 'updated_at'>
  > & { id?: string },
) {
  const insertVals: NewServiceI18nRow = {
    id: data.id ?? randomUUID(),
    service_id: serviceId,
    locale,

    slug: typeof data.slug === 'string' ? data.slug : '',
    name: typeof data.name === 'string' ? data.name : '',

    summary: typeof data.summary === 'string' ? data.summary : null,
    content: typeof data.content === 'string' ? data.content : '',

    image_alt: typeof data.image_alt === 'string' ? data.image_alt : null,

    meta_title: typeof data.meta_title === 'string' ? data.meta_title : null,
    meta_description: typeof data.meta_description === 'string' ? data.meta_description : null,
    meta_keywords: typeof data.meta_keywords === 'string' ? data.meta_keywords : null,

    created_at: new Date() as any,
    updated_at: new Date() as any,
  };

  const setObj: Record<string, any> = {};
  for (const k of [
    'slug',
    'name',
    'summary',
    'content',
    'image_alt',
    'meta_title',
    'meta_description',
    'meta_keywords',
  ] as const) {
    if (typeof (data as any)[k] !== 'undefined') (setObj as any)[k] = (data as any)[k];
  }
  setObj.updated_at = new Date();

  if (Object.keys(setObj).length === 1) return;

  await db.insert(servicesI18n).values(insertVals).onDuplicateKeyUpdate({ set: setObj });
}

export async function upsertServiceI18nAllLocales(
  serviceId: string,
  data: Partial<
    Omit<NewServiceI18nRow, 'id' | 'service_id' | 'locale' | 'created_at' | 'updated_at'>
  >,
) {
  const locales = await getAppLocales(null);
  for (const L of locales) {
    await upsertServiceI18n(serviceId, L, data);
  }
}

export async function updateServiceParent(id: string, patch: Partial<NewServiceRow>) {
  await db
    .update(services)
    .set({ ...patch, updated_at: new Date() as any })
    .where(eq(services.id, id));
}

export async function deleteServiceParent(id: string) {
  const res = await db.delete(services).where(eq(services.id, id)).execute();
  const affected =
    typeof (res as any)?.affectedRows === 'number' ? Number((res as any).affectedRows) : 0;
  return affected;
}

/* ----------------------- images ----------------------- */

export async function listServiceImages(params: {
  serviceId: string;
  locale: LocaleCode;
  defaultLocale: LocaleCode;
  onlyActive?: boolean;
}) {
  const iReq = alias(serviceImagesI18n, 'simg_req');
  const iDef = alias(serviceImagesI18n, 'simg_def');
  const saImg = alias(storageAssets, 'sa_img');

  const where =
    params.onlyActive === true
      ? and(eq(serviceImages.service_id, params.serviceId), eq(serviceImages.is_active, 1))
      : and(eq(serviceImages.service_id, params.serviceId), sql`1=1`);

  const rows = await db
    .select(imgSelect(iReq, iDef, saImg))
    .from(serviceImages)
    .leftJoin(iReq, and(eq(iReq.image_id, serviceImages.id), eq(iReq.locale, params.locale)))
    .leftJoin(iDef, and(eq(iDef.image_id, serviceImages.id), eq(iDef.locale, params.defaultLocale)))
    .leftJoin(saImg, eq(saImg.id, serviceImages.image_asset_id))
    .where(where)
    .orderBy(asc(serviceImages.display_order), asc(serviceImages.created_at));

  return (rows as any[]).map(
    (r): ServiceImageMerged => ({
      id: r.id,
      service_id: r.service_id,
      image_asset_id: r.image_asset_id ?? null,
      image_url:
        r.image_url ||
        resolveAssetUrl(
          r.img_bucket as string | null,
          r.img_path as string | null,
          r.img_url as string | null,
        ),
      is_active: r.is_active,
      display_order: r.display_order,
      created_at: r.created_at,
      updated_at: r.updated_at,
      title: r.title ?? null,
      alt: r.alt ?? null,
      caption: r.caption ?? null,
      locale_resolved: r.locale_resolved ?? null,
    }),
  );
}

export async function createServiceImage(values: NewServiceImageRow) {
  await db.insert(serviceImages).values(values);
  return values.id;
}

export async function upsertServiceImageI18n(
  imageId: string,
  locale: LocaleCode,
  data: Partial<
    Omit<NewServiceImageI18nRow, 'id' | 'image_id' | 'locale' | 'created_at' | 'updated_at'>
  > & { id?: string },
) {
  // ✅ burada artık image_id type hatası olmaz; çünkü type tablo üzerinden geliyor
  const insertVals: NewServiceImageI18nRow = {
    id: data.id ?? randomUUID(),
    image_id: imageId,
    locale,

    title: typeof data.title === 'string' ? data.title : (null as any),
    alt: typeof data.alt === 'string' ? data.alt : (null as any),
    caption: typeof data.caption === 'string' ? data.caption : (null as any),

    created_at: new Date() as any,
    updated_at: new Date() as any,
  };

  const setObj: Record<string, any> = {};
  for (const k of ['title', 'alt', 'caption'] as const) {
    if (typeof (data as any)[k] !== 'undefined') (setObj as any)[k] = (data as any)[k];
  }
  setObj.updated_at = new Date();

  if (Object.keys(setObj).length === 1) return;

  await db.insert(serviceImagesI18n).values(insertVals).onDuplicateKeyUpdate({ set: setObj });
}

export async function upsertServiceImageI18nAllLocales(
  imageId: string,
  data: Partial<
    Omit<NewServiceImageI18nRow, 'id' | 'image_id' | 'locale' | 'created_at' | 'updated_at'>
  >,
) {
  const locales = await getAppLocales(null);
  for (const L of locales) {
    await upsertServiceImageI18n(imageId, L, data);
  }
}

export async function updateServiceImage(id: string, patch: Partial<NewServiceImageRow>) {
  await db
    .update(serviceImages)
    .set({ ...patch, updated_at: new Date() as any })
    .where(eq(serviceImages.id, id));
}

export async function deleteServiceImage(id: string) {
  const res = await db.delete(serviceImages).where(eq(serviceImages.id, id)).execute();
  const affected =
    typeof (res as any)?.affectedRows === 'number' ? Number((res as any).affectedRows) : 0;
  return affected;
}

export async function reorderServices(items: { id: string; display_order: number }[]) {
  if (!items || !items.length) return;

  const now = new Date() as any;

  await db.transaction(async (tx) => {
    for (const it of items) {
      if (!it.id || typeof it.display_order !== 'number') continue;
      await tx
        .update(services)
        .set({ display_order: it.display_order, updated_at: now })
        .where(eq(services.id, it.id));
    }
  });
}
