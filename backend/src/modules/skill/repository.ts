// ===================================================================
// FILE: src/modules/skill/repository.ts
// FINAL — Skill repository
// - NO default locale fallback (per request)
// - FIX: boolLike parsing supports "true"/"false"
// - storage relation via image_asset_id
// ===================================================================

import { db } from '@/db/client';
import { and, asc, eq, inArray, sql } from 'drizzle-orm';

import { skillCounters, skillCountersI18n, skillLogos, skillLogosI18n } from './schema';
import type { SkillCounterMerged, SkillLogoMerged, SkillTrack } from '../_shared';
import { SQL_NOW_3, boolLikeTo01 } from '../_shared';

// -----------------------------------------------------
// boolLike normalizer (CRITICAL FIX)
// Accepts: true/false, 1/0, "1"/"0", "true"/"false", "yes"/"no", "on"/"off"
// -----------------------------------------------------


// -----------------------------------------------------
// i18n maps (ONLY requested locale)
// -----------------------------------------------------
async function fetchCounterI18nMap(counterIds: string[], locale: string) {
  if (!counterIds.length) return new Map<string, any>();

  const rows = await db
    .select()
    .from(skillCountersI18n)
    .where(
      and(inArray(skillCountersI18n.counter_id, counterIds), eq(skillCountersI18n.locale, locale)),
    );

  const map = new Map<string, any>();
  for (const r of rows) map.set(r.counter_id, r);
  return map;
}

async function fetchLogoI18nMap(logoIds: string[], locale: string) {
  if (!logoIds.length) return new Map<string, any>();

  const rows = await db
    .select()
    .from(skillLogosI18n)
    .where(and(inArray(skillLogosI18n.logo_id, logoIds), eq(skillLogosI18n.locale, locale)));

  const map = new Map<string, any>();
  for (const r of rows) map.set(r.logo_id, r);
  return map;
}

// -----------------------------------------------------
// merge helpers (NO default fallback)
// -----------------------------------------------------
function mergeCounterRow(parent: any, loc: any | null, selectedLocale: string): SkillCounterMerged {
  return {
    id: parent.id,
    is_active: !!parent.is_active,
    display_order: parent.display_order ?? 0,

    percent: Number(parent.percent ?? 0),

    image_url: parent.image_url ?? null,
    image_asset_id: parent.image_asset_id ?? null,

    locale: loc?.locale || selectedLocale,
    title: loc?.title || '',
    slug: loc?.slug || '',

    created_at: parent.created_at ? String(parent.created_at) : undefined,
    updated_at: parent.updated_at ? String(parent.updated_at) : undefined,
  };
}

function mergeLogoRow(parent: any, loc: any | null, selectedLocale: string): SkillLogoMerged {
  return {
    id: parent.id,
    is_active: !!parent.is_active,
    display_order: parent.display_order ?? 0,

    track: String(parent.track || 'right') as SkillTrack,

    image_url: parent.image_url ?? null,
    image_asset_id: parent.image_asset_id ?? null,

    locale: loc?.locale || selectedLocale,
    label: loc?.label || '',

    created_at: parent.created_at ? String(parent.created_at) : undefined,
    updated_at: parent.updated_at ? String(parent.updated_at) : undefined,
  };
}

// ===================================================================
// WRITE: Counters CRUD (unchanged)
// ===================================================================
export async function createSkillCounterParent(row: {
  id: string;
  percent: number;
  image_url?: string | null;
  image_asset_id?: string | null;
  is_active: 0 | 1;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}) {
  await db.insert(skillCounters).values({
    id: row.id,
    percent: row.percent as any,
    image_url: row.image_url ?? null,
    image_asset_id: row.image_asset_id ?? null,
    is_active: row.is_active,
    display_order: row.display_order ?? 0,
    created_at: row.created_at as any,
    updated_at: row.updated_at as any,
  });
}

export async function updateSkillCounterParent(id: string, patch: Record<string, any>) {
  const res = await db.update(skillCounters).set(patch).where(eq(skillCounters.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function deleteSkillCounterParent(id: string) {
  const res = await db.delete(skillCounters).where(eq(skillCounters.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function getSkillCounterI18nRow(counterId: string, locale: string) {
  const rows = await db
    .select()
    .from(skillCountersI18n)
    .where(and(eq(skillCountersI18n.counter_id, counterId), eq(skillCountersI18n.locale, locale)))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertSkillCounterI18nSafe(args: {
  id: string;
  counter_id: string;
  locale: string;
  title: string;
  slug: string;
}) {
  await db
    .insert(skillCountersI18n)
    .values({
      id: args.id,
      counter_id: args.counter_id,
      locale: args.locale,
      title: args.title,
      slug: args.slug,
    })
    .onDuplicateKeyUpdate({
      set: {
        title: args.title,
        slug: args.slug,
        updated_at: SQL_NOW_3 as any,
      },
    });
}

// ===================================================================
// WRITE: Logos CRUD (unchanged)
// ===================================================================
export async function createSkillLogoParent(row: {
  id: string;
  track: SkillTrack;
  image_url?: string | null;
  image_asset_id?: string | null;
  is_active: 0 | 1;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}) {
  await db.insert(skillLogos).values({
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

export async function updateSkillLogoParent(id: string, patch: Record<string, any>) {
  const res = await db.update(skillLogos).set(patch).where(eq(skillLogos.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function deleteSkillLogoParent(id: string) {
  const res = await db.delete(skillLogos).where(eq(skillLogos.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function getSkillLogoI18nRow(logoId: string, locale: string) {
  const rows = await db
    .select()
    .from(skillLogosI18n)
    .where(and(eq(skillLogosI18n.logo_id, logoId), eq(skillLogosI18n.locale, locale)))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertSkillLogoI18nSafe(args: {
  id: string;
  logo_id: string;
  locale: string;
  label: string;
}) {
  await db
    .insert(skillLogosI18n)
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
export async function listSkillCountersMerged(args: {
  locale: string;
  is_active?: any;
  limit?: number;
  offset?: number;
}): Promise<{ items: SkillCounterMerged[]; total: number }> {
  const whereParts: any[] = [];

  if (typeof args.is_active !== 'undefined') {
    const v01 = boolLikeTo01(args.is_active);
    if (v01 !== null) whereParts.push(eq(skillCounters.is_active, v01));
  }

  const where = whereParts.length ? and(...whereParts) : undefined;

  const totalRows = await db
    .select({ cnt: sql<number>`count(*)` })
    .from(skillCounters)
    .where(where as any);

  const total = Number(totalRows?.[0]?.cnt ?? 0);

  const rows = await db
    .select()
    .from(skillCounters)
    .where(where as any)
    .orderBy(asc(skillCounters.display_order), asc(skillCounters.id))
    .limit(Number.isFinite(args.limit as any) ? (args.limit as number) : 200)
    .offset(Number.isFinite(args.offset as any) ? (args.offset as number) : 0);

  const ids = rows.map((r) => r.id);

  const locMap = await fetchCounterI18nMap(ids, args.locale);

  const items = rows.map((p) => mergeCounterRow(p, locMap.get(p.id) ?? null, args.locale));

  return { items, total };
}

export async function listSkillLogosMerged(args: {
  locale: string;
  is_active?: any;
  track?: SkillTrack;
  limit?: number;
  offset?: number;
}): Promise<{ items: SkillLogoMerged[]; total: number }> {
  const whereParts: any[] = [];

  if (typeof args.is_active !== 'undefined') {
    const v01 = boolLikeTo01(args.is_active);
    if (v01 !== null) whereParts.push(eq(skillLogos.is_active, v01));
  }

  if (args.track) whereParts.push(eq(skillLogos.track, args.track));

  const where = whereParts.length ? and(...whereParts) : undefined;

  const totalRows = await db
    .select({ cnt: sql<number>`count(*)` })
    .from(skillLogos)
    .where(where as any);

  const total = Number(totalRows?.[0]?.cnt ?? 0);

  const rows = await db
    .select()
    .from(skillLogos)
    .where(where as any)
    .orderBy(asc(skillLogos.display_order), asc(skillLogos.id))
    .limit(Number.isFinite(args.limit as any) ? (args.limit as number) : 200)
    .offset(Number.isFinite(args.offset as any) ? (args.offset as number) : 0);

  const ids = rows.map((r) => r.id);

  const locMap = await fetchLogoI18nMap(ids, args.locale);

  const items = rows.map((p) => mergeLogoRow(p, locMap.get(p.id) ?? null, args.locale));

  return { items, total };
}
