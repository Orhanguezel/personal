// ===================================================================
// FILE: src/modules/brand/repository.ts
// FINAL — Brand repository
// - NO default locale fallback (per request)
// ===================================================================

import { db } from '@/db/client';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';

import { brandLogos, brandLogosI18n } from './schema';
import type { BrandLogoMerged, BrandTrack } from '../_shared';
import { SQL_NOW_3, boolLikeTo01 } from '../_shared';

// -----------------------------------------------------
// i18n maps (ONLY requested locale)
// -----------------------------------------------------
async function fetchLogoI18nMap(logoIds: string[], locale: string) {
  if (!logoIds.length) return new Map<string, any>();

  const rows = await db
    .select()
    .from(brandLogosI18n)
    .where(and(inArray(brandLogosI18n.logo_id, logoIds), eq(brandLogosI18n.locale, locale)));

  const map = new Map<string, any>();
  for (const r of rows) map.set(r.logo_id, r);
  return map;
}

// -----------------------------------------------------
// merge helpers (NO default fallback)
// -----------------------------------------------------
function mergeLogoRow(parent: any, loc: any | null, selectedLocale: string): BrandLogoMerged {
  return {
    id: parent.id,
    is_active: !!parent.is_active,
    display_order: parent.display_order ?? 0,

    track: String(parent.track || 'right') as BrandTrack,

    image_url: parent.image_url ?? null,
    image_asset_id: parent.image_asset_id ?? null,

    locale: loc?.locale || selectedLocale,
    label: loc?.label || '',

    created_at: parent.created_at ? String(parent.created_at) : undefined,
    updated_at: parent.updated_at ? String(parent.updated_at) : undefined,
  };
}

// ===================================================================
// WRITE: Logos CRUD
// ===================================================================
export async function createBrandLogoParent(row: {
  id: string;
  track: BrandTrack;
  image_url?: string | null;
  image_asset_id?: string | null;
  is_active: 0 | 1;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}) {
  await db.insert(brandLogos).values({
    id: row.id,
    track: row.track,
    image_url: row.image_url ?? null,
    image_asset_id: row.image_asset_id ?? null,
    is_active: row.is_active,
    display_order: row.display_order ?? 0,
    created_at: row.created_at as any,
    updated_at: row.updated_at as any,
  });
}

export async function updateBrandLogoParent(id: string, patch: Record<string, any>) {
  const res = await db.update(brandLogos).set(patch).where(eq(brandLogos.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function deleteBrandLogoParent(id: string) {
  const res = await db.delete(brandLogos).where(eq(brandLogos.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function getBrandLogoI18nRow(logoId: string, locale: string) {
  const rows = await db
    .select()
    .from(brandLogosI18n)
    .where(and(eq(brandLogosI18n.logo_id, logoId), eq(brandLogosI18n.locale, locale)))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertBrandLogoI18nSafe(args: {
  id: string;
  logo_id: string;
  locale: string;
  label: string;
}) {
  await db
    .insert(brandLogosI18n)
    .values({
      id: args.id,
      logo_id: args.logo_id,
      locale: args.locale,
      label: args.label,
    })
    .onDuplicateKeyUpdate({
      set: {
        label: args.label,
        updated_at: SQL_NOW_3 as any,
      },
    });
}

// ===================================================================
// READ: Public lists (NO default locale fallback)
// ===================================================================
export async function listBrandLogosMerged(args: {
  locale: string;
  is_active?: any;
  track?: BrandTrack;
  limit?: number;
  offset?: number;
}): Promise<{ items: BrandLogoMerged[]; total: number }> {
  const whereParts: any[] = [];

  if (typeof args.is_active !== 'undefined') {
    const v01 = boolLikeTo01(args.is_active);
    if (v01 !== null) whereParts.push(eq(brandLogos.is_active, v01));
  }

  if (args.track) {
    whereParts.push(eq(brandLogos.track, args.track));
  }

  const where = whereParts.length ? and(...whereParts) : undefined;

  const totalRows = await db
    .select({ cnt: sql<number>`count(*)` })
    .from(brandLogos)
    .where(where as any);

  const total = Number(totalRows?.[0]?.cnt ?? 0);

  const rows = await db
    .select()
    .from(brandLogos)
    .where(where as any)
    .orderBy(asc(brandLogos.display_order), asc(brandLogos.id))
    .limit(Number.isFinite(args.limit as any) ? (args.limit as number) : 200)
    .offset(Number.isFinite(args.offset as any) ? (args.offset as number) : 0);

  const ids = rows.map((r) => r.id as string);
  const i18nMap = await fetchLogoI18nMap(ids, args.locale);

  const items = rows.map((r) => mergeLogoRow(r, i18nMap.get(r.id) ?? null, args.locale));
  return { items, total };
}
