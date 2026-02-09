// ===================================================================
// FILE: src/modules/resume/repository.ts
// FINAL — Resume repository (fallback: requested -> default locale)
// - no category/sub_category
// - locale: requested only (no fallback merge)
// - FIX: orderBy columns must come from SAME schema instance (./schema)
// - Admin/public: is_active undefined => ALL, public controller usually passes 1
// ===================================================================

import { db } from '@/db/client';
import { resumeEntries, resumeEntriesI18n } from './schema';
import { and, desc, eq, inArray, like, or, sql } from 'drizzle-orm';
import type { ResumeMerged, ResumeType } from '@/modules/_shared';
import { parseHighlights } from '@/modules/_shared';

// -----------------------------------------------------
// local order parser (IMPORTANT: uses resumeEntries from THIS schema)
// Accepts: "display_order.asc" | "start_date.desc" | ...
// -----------------------------------------------------
function parseOrderParamLocal(orderParam?: string): { col: any; dir: 'asc' | 'desc' } | null {
  if (!orderParam) return null;
  const s = String(orderParam).trim();
  if (!s.includes('.')) return null;

  const [field, dirRaw] = s.split('.', 2);
  const dir = (dirRaw || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';

  const col =
    field === 'created_at'
      ? resumeEntries.created_at
      : field === 'updated_at'
        ? resumeEntries.updated_at
        : field === 'start_date'
          ? resumeEntries.start_date
          : field === 'display_order'
            ? resumeEntries.display_order
            : null;

  if (!col) return null;
  return { col, dir };
}

// -----------------------------------------------------
// i18n helpers
// -----------------------------------------------------
async function fetchI18nMaps(
  entryIds: string[],
  locale: string,
  defaultLocale?: string,
): Promise<{ req: Map<string, any>; def: Map<string, any> }> {
  const req = new Map<string, any>();
  const def = new Map<string, any>();

  if (!entryIds.length) return { req, def };

  const locales =
    defaultLocale && defaultLocale !== locale ? [locale, defaultLocale] : [locale];

  const rows = await db
    .select()
    .from(resumeEntriesI18n)
    .where(
      and(
        inArray(resumeEntriesI18n.entry_id, entryIds),
        inArray(resumeEntriesI18n.locale, locales),
      ),
    );

  for (const r of rows) {
    if (r.locale === locale) req.set(r.entry_id, r);
    else if (defaultLocale && r.locale === defaultLocale) def.set(r.entry_id, r);
  }

  return { req, def };
}

function mergeRow(
  parent: any,
  i18nReq: any | null,
  i18nDef: any | null,
  selectedLocale: string,
  defaultLocale?: string,
): ResumeMerged {
  const i18n = i18nReq ?? i18nDef;
  // normalize dates (mysql DATE sometimes comes as Date/string)
  const start = parent.start_date ? String(parent.start_date).slice(0, 10) : '';
  const end = parent.end_date ? String(parent.end_date).slice(0, 10) : null;

  return {
    id: parent.id,
    type: parent.type,
    is_active: !!parent.is_active,
    display_order: parent.display_order ?? 0,

    start_date: start,
    end_date: end,
    is_current: !!parent.is_current,

    location: parent.location ?? null,
    organization: parent.organization ?? null,

    score_value: parent.score_value != null ? String(parent.score_value) : null,
    score_scale: parent.score_scale ?? 5,

    // i18n (fallback: requested -> default)
    locale: i18nReq?.locale || i18nDef?.locale || selectedLocale || defaultLocale || '',
    title: i18n?.title || '',
    subtitle: i18n?.subtitle || '',
    description: i18n?.description ?? null,
    highlights: parseHighlights(i18n?.highlights_json),
    slug: i18n?.slug || '',

    created_at: parent.created_at ? String(parent.created_at) : undefined,
    updated_at: parent.updated_at ? String(parent.updated_at) : undefined,
  };
}

// ===================================================================
// WRITE: Parent CRUD
// ===================================================================
export async function createResumeParent(row: {
  id: string;
  type: ResumeType;
  is_active: 0 | 1;
  display_order: number;
  start_date: string;
  end_date: string | null;
  is_current: 0 | 1;
  location?: string | null;
  organization?: string | null;
  score_value?: number | null;
  score_scale?: number;
  created_at: Date;
  updated_at: Date;
}) {
  await db.insert(resumeEntries).values({
    id: row.id,
    type: row.type,
    is_active: row.is_active,
    display_order: row.display_order ?? 0,
    start_date: row.start_date as any,
    end_date: row.end_date as any,
    is_current: row.is_current,
    location: row.location ?? null,
    organization: row.organization ?? null,
    score_value: row.score_value != null ? (row.score_value as any) : null,
    score_scale: row.score_scale ?? 5,
    created_at: row.created_at as any,
    updated_at: row.updated_at as any,
  });
}

export async function updateResumeParent(id: string, patch: Record<string, any>) {
  const res = await db.update(resumeEntries).set(patch).where(eq(resumeEntries.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

export async function deleteResumeParent(id: string) {
  const res = await db.delete(resumeEntries).where(eq(resumeEntries.id, id));
  return (res as any)?.rowsAffected ? Number((res as any).rowsAffected) : 1;
}

// ===================================================================
// WRITE/READ: i18n
// ===================================================================
export async function getResumeI18nRow(entryId: string, locale: string) {
  const rows = await db
    .select()
    .from(resumeEntriesI18n)
    .where(and(eq(resumeEntriesI18n.entry_id, entryId), eq(resumeEntriesI18n.locale, locale)))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertResumeI18nSafe(args: {
  id: string;
  entry_id: string;
  locale: string;
  title: string;
  subtitle: string;
  description?: string | null;
  highlights_json?: string | null;
  slug: string;
}) {
  await db
    .insert(resumeEntriesI18n)
    .values({
      id: args.id,
      entry_id: args.entry_id,
      locale: args.locale,
      title: args.title,
      subtitle: args.subtitle,
      description: args.description ?? null,
      highlights_json: args.highlights_json ?? null,
      slug: args.slug,
    })
    .onDuplicateKeyUpdate({
      set: {
        title: args.title,
        subtitle: args.subtitle,
        description: args.description ?? null,
        highlights_json: args.highlights_json ?? null,
        slug: args.slug,
        updated_at: sql`CURRENT_TIMESTAMP(3)` as any,
      },
    });
}

// ===================================================================
// READ: single (NO fallback)
// ===================================================================
export async function getResumeMergedById(
  locale: string,
  defaultLocale: string | undefined,
  id: string,
) {
  const parents = await db.select().from(resumeEntries).where(eq(resumeEntries.id, id)).limit(1);
  if (!parents.length) return null;

  const parent = parents[0];

  const [loc, def] = await Promise.all([
    db
      .select()
      .from(resumeEntriesI18n)
      .where(and(eq(resumeEntriesI18n.entry_id, id), eq(resumeEntriesI18n.locale, locale)))
      .limit(1)
      .then((rows) => rows[0] ?? null),
    defaultLocale && defaultLocale !== locale
      ? db
          .select()
          .from(resumeEntriesI18n)
          .where(
            and(eq(resumeEntriesI18n.entry_id, id), eq(resumeEntriesI18n.locale, defaultLocale)),
          )
          .limit(1)
          .then((rows) => rows[0] ?? null)
      : Promise.resolve(null),
  ]);

  return mergeRow(parent, loc ?? null, def ?? null, locale, defaultLocale);
}

export async function getResumeMergedBySlug(
  locale: string,
  defaultLocale: string | undefined,
  slug: string,
) {
  const slugTrimmed = slug.trim();

  const [hit] = await db
    .select()
    .from(resumeEntriesI18n)
    .where(and(eq(resumeEntriesI18n.locale, locale), eq(resumeEntriesI18n.slug, slugTrimmed)))
    .limit(1);

  if (hit) return getResumeMergedById(locale, defaultLocale, hit.entry_id);

  if (defaultLocale && defaultLocale !== locale) {
    const [fallback] = await db
      .select()
      .from(resumeEntriesI18n)
      .where(
        and(eq(resumeEntriesI18n.locale, defaultLocale), eq(resumeEntriesI18n.slug, slugTrimmed)),
      )
      .limit(1);
    if (fallback) return getResumeMergedById(locale, defaultLocale, fallback.entry_id);
  }

  return null;
}

// ===================================================================
// LIST (NO fallback)
// ===================================================================
export async function listResumeEntries(args: {
  type?: ResumeType;
  is_active?: any; // undefined => ALL, 1/true => active, 0/false => inactive
  q?: string;
  slug?: string;

  orderParam?: string; // "display_order.asc"
  sort?: 'created_at' | 'updated_at' | 'display_order' | 'start_date';
  order?: 'asc' | 'desc';

  limit?: number;
  offset?: number;

  locale: string;
  defaultLocale?: string;
}): Promise<{ items: ResumeMerged[]; total: number }> {
  const locale = args.locale;
  const defaultLocale = args.defaultLocale && args.defaultLocale !== locale ? args.defaultLocale : undefined;

  // -----------------------------------------------------
  // Optional filter ids by slug/q (i18n) — ONLY locale
  // -----------------------------------------------------
  let filteredEntryIds: string[] | null = null;

  if (args.slug) {
    const s = String(args.slug).trim();
    const rows = await db
      .select({ entry_id: resumeEntriesI18n.entry_id })
      .from(resumeEntriesI18n)
      .where(
        and(
          inArray(resumeEntriesI18n.locale, defaultLocale ? [locale, defaultLocale] : [locale]),
          eq(resumeEntriesI18n.slug, s),
        ),
      );

    filteredEntryIds = rows.map((r) => r.entry_id);
  }

  if (args.q) {
    const qLike = `%${String(args.q).trim()}%`;
    const rows = await db
      .select({ entry_id: resumeEntriesI18n.entry_id })
      .from(resumeEntriesI18n)
      .where(
        and(
          inArray(resumeEntriesI18n.locale, defaultLocale ? [locale, defaultLocale] : [locale]),
          or(
            like(resumeEntriesI18n.title, qLike),
            like(resumeEntriesI18n.subtitle, qLike),
            like(resumeEntriesI18n.description, qLike),
          ),
        ),
      );

    const ids = Array.from(new Set(rows.map((r) => r.entry_id)));
    filteredEntryIds = filteredEntryIds ? filteredEntryIds.filter((x) => ids.includes(x)) : ids;
  }

  // -----------------------------------------------------
  // Parent WHERE
  // -----------------------------------------------------
  const whereParts: any[] = [];

  if (args.type) whereParts.push(eq(resumeEntries.type, args.type));

  if (typeof args.is_active !== 'undefined') {
    const v = args.is_active === true || args.is_active === 1 || args.is_active === '1';
    whereParts.push(eq(resumeEntries.is_active, v ? 1 : 0));
  }

  if (filteredEntryIds) {
    if (!filteredEntryIds.length) return { items: [], total: 0 };
    whereParts.push(inArray(resumeEntries.id, filteredEntryIds));
  }

  const where = whereParts.length ? and(...whereParts) : undefined;

  // -----------------------------------------------------
  // Total
  // -----------------------------------------------------
  const totalRows = await db
    .select({ cnt: sql<number>`count(*)` })
    .from(resumeEntries)
    .where(where as any);

  const total = Number(totalRows?.[0]?.cnt ?? 0);

  // -----------------------------------------------------
  // Ordering
  // -----------------------------------------------------
  const parsed = parseOrderParamLocal(args.orderParam);

  const sortCol =
    args.sort === 'created_at'
      ? resumeEntries.created_at
      : args.sort === 'updated_at'
        ? resumeEntries.updated_at
        : args.sort === 'start_date'
          ? resumeEntries.start_date
          : resumeEntries.display_order;

  const fallbackDir = (args.order || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';

  const orderExpr = parsed
    ? parsed.dir === 'desc'
      ? desc(parsed.col)
      : (parsed.col as any)
    : fallbackDir === 'desc'
      ? desc(sortCol)
      : (sortCol as any);

  // -----------------------------------------------------
  // Rows
  // -----------------------------------------------------
  const limit = Number.isFinite(args.limit as any) ? (args.limit as number) : 50;
  const offset = Number.isFinite(args.offset as any) ? (args.offset as number) : 0;

  const rows = await db
    .select()
    .from(resumeEntries)
    .where(where as any)
    .orderBy(orderExpr, resumeEntries.id) // stable
    .limit(limit)
    .offset(offset);

  const ids = rows.map((r) => r.id);

  const locMaps = await fetchI18nMaps(ids, locale, defaultLocale);

  const items = rows.map((p) =>
    mergeRow(p, locMaps.req.get(p.id) ?? null, locMaps.def.get(p.id) ?? null, locale, defaultLocale),
  );

  return { items, total };
}
