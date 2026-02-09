// =============================================================
// FILE: src/integrations/types/customPages.ts
// FINAL — FE-friendly CustomPageView (blog template needs summary/excerpt/content_html/content_text)
// - Backend henüz bu alanları dönmese bile FE kırılmaz
// - Also exports admin payload types + api body mappers (toCustomPageApiBody/Patch)
// =============================================================

import type { BoolLike } from '@/integrations/shared';

// ✅ IMPORTANT: circular import olmaması için helper’ları barrel’den değil,
// aynı types paketinin "common" dosyasından çekiyoruz.
// Eğer common.ts path’in farklıysa bunu kendi yapına göre düzelt.
import { asBoolLike, nullify, trimStr, toStrArrayOrNull, toTrimStr } from '@/integrations/shared';

// ----------------------------- Backend Row (public) -----------------------------

export type CustomPageRow = {
  id: string;

  module_key: string;
  title: string;
  slug: string;
  category: string | null;

  // backend stores JSON string: {"html":"..."} but may return string/object
  content: unknown;

  // author (optional)
  author_id?: string | null;

  // featured cover
  featured_image?: string | null;
  featured_image_asset_id?: string | null;

  // legacy cover
  image_url?: unknown; // LONGTEXT legacy: url OR json-string OR object
  storage_asset_id?: string | null;

  alt?: string | null;

  // gallery
  images?: unknown; // LONGTEXT JSON array or array
  storage_image_ids?: unknown;

  // tags
  tags?: unknown;

  // seo
  meta_title?: string | null;
  meta_description?: string | null;

  // ✅ optional FE fields (backend may add later)
  summary?: string | null;
  excerpt?: string | null;
  content_html?: string | null;
  content_text?: string | null;

  is_published?: BoolLike;

  created_at?: string | null;
  updated_at?: string | null;

  // effective urls (repository/view)
  featured_image_effective_url?: string | null;
  image_effective_url?: string | null;
  images_effective_urls?: unknown;

  // featured asset (optional nested)
  featured_image_asset?: { id: string; url: string | null } | null;

  // author view
  author?: {
    id: string;
    full_name: string | null;
    email: string | null;
    profile_image: string | null;
    profile_image_asset_id: string | null;
  } | null;
};

export type CustomPagesListParams = {
  is_published?: boolean | 0 | 1;
  limit?: number;
  offset?: number;

  q?: string;
  slug?: string;
  module_key?: string;

  author_id?: string;

  // tags filters
  tag?: string;
  tags?: string; // "a,b" or json string; backend parses

  // ✅ FE typing convenience
  locale?: string; // backend ignore edebilir
  sort?: string;
  orderDir?: 'asc' | 'desc';
};

export type CustomPageBySlugParams = {
  slug: string;
  locale?: string;
};

export type CustomPageByModuleSlugParams = {
  module_key: string;
  slug: string;
  locale?: string; // ✅ BlogDetailsClient hatasını çözer
};

// ----------------------------- Normalized View (UI) -----------------------------

export type CustomPageAuthorView = {
  id: string;
  full_name: string | null;
  email: string | null;
  profile_image: string | null;
  profile_image_asset_id: string | null;
};

export type CustomPageView = {
  id: string;

  module_key: string;
  title: string;
  slug: string;

  // ✅ legacy "content" (kept)
  content: string;

  // ✅ blog template friendly aliases
  content_html: string;
  content_text: string;
  summary: string | null;
  excerpt: string | null;
  category: string | null;

  // author
  author_id: string | null;
  author: CustomPageAuthorView | null;

  // featured cover
  featured_image: string | null;
  featured_image_asset_id: string | null;
  featured_image_effective_url: string | null;

  // legacy cover
  image_url: string | null;
  storage_asset_id: string | null;
  image_effective_url: string | null;

  alt: string | null;

  // gallery
  images: string[];
  storage_image_ids: string[];
  images_effective_urls: string[];

  // tags
  tags: string[];

  // seo
  meta_title: string | null;
  meta_description: string | null;

  is_published: boolean;

  created_at?: string;
  updated_at?: string;
};

// ----------------------------- Admin Payload Types (MISSING BEFORE) -----------------------------

/**
 * Admin create payload (Upsert)
 * - endpoint: POST /admin/custom_pages
 * - backend: author_id destekli
 */
export type UpsertCustomPageBody = {
  module_key: string;
  title: string;
  slug: string;

  /**
   * FE genelde HTML string taşır.
   * Backend "content" alanında JSON-string {"html": "..."} da kabul ediyorsa,
   * bu mapper otomatik {"html": "..."} formatına çevirebilir.
   */
  content_html?: string | null;
  content_text?: string | null;

  // FE optional blog-friendly fields
  summary?: string | null;
  excerpt?: string | null;
  category?: string | null;

  // author
  author_id?: string | null;

  // featured cover
  featured_image?: string | null;
  featured_image_asset_id?: string | null;

  // legacy cover (opsiyonel)
  image_url?: string | null;
  storage_asset_id?: string | null;

  alt?: string | null;

  // gallery
  images?: string[] | null;
  storage_image_ids?: string[] | null;

  // tags
  tags?: string[] | null;

  // seo
  meta_title?: string | null;
  meta_description?: string | null;

  is_published?: BoolLike;
};

/**
 * Admin patch payload
 * - endpoint: PATCH /admin/custom_pages/:id
 */
export type PatchCustomPageBody = Partial<UpsertCustomPageBody> & {
  // (opsiyonel) slug/module_key güncellenebilir mi backend’e bağlı; FE tarafı serbest bıraktık
};

/**
 * Cover update payload
 * - endpoint: PATCH /admin/custom_pages/:id/image
 * - Senin endpoint bu body’yi raw gönderiyor; backend’e uygun minimal set:
 */
export type SetCustomPageCoverBody = {
  // featured cover
  featured_image?: string | null;
  featured_image_asset_id?: string | null;

  // legacy cover (bazı backend’lerde kullanılıyor)
  image_url?: string | null;
  storage_asset_id?: string | null;

  alt?: string | null;
};

// ----------------------------- Normalizers -----------------------------

const safeStr = (v: unknown) => (v === null || v === undefined ? '' : String(v).trim());

const asNullableString = (v: unknown): string | null => {
  const s = safeStr(v);
  return s ? s : null;
};

const toBool = (x: unknown): boolean => x === true || x === 1 || x === '1' || x === 'true';

const tryParseJson = (v: unknown): unknown => {
  if (typeof v !== 'string') return v;
  const s = v.trim();
  if (!s) return v;

  const looksJson =
    (s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'));
  if (!looksJson) return v;

  try {
    return JSON.parse(s);
  } catch {
    return v;
  }
};

const extractHtmlFromContent = (raw: unknown): string => {
  const parsed = tryParseJson(raw);

  // {"html":"..."}
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const html = (parsed as any)?.html;
    if (typeof html === 'string') return html;
  }

  // plain html string
  if (typeof raw === 'string') return raw;

  return '';
};

const stripHtml = (html: string): string => {
  const s = safeStr(html);
  if (!s) return '';
  return s
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const extractLegacyUrl = (raw: unknown): string | null => {
  if (raw === null || raw === undefined) return null;

  if (typeof raw === 'string') {
    const s = raw.trim();
    if (!s) return null;
    if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;

    const parsed = tryParseJson(s);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const u = safeStr((parsed as any)?.url);
      return u ? u : null;
    }
    return null;
  }

  if (typeof raw === 'object' && !Array.isArray(raw)) {
    const u = safeStr((raw as any)?.url);
    return u ? u : null;
  }

  return null;
};

const extractStringArray = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw.map((x) => safeStr(x)).filter(Boolean);

  const parsed = tryParseJson(raw);
  if (Array.isArray(parsed)) return parsed.map((x) => safeStr(x)).filter(Boolean);

  return [];
};

const normalizeAuthor = (raw: unknown): CustomPageAuthorView | null => {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const a = raw as any;
  const id = safeStr(a.id);
  if (!id) return null;

  return {
    id,
    full_name: asNullableString(a.full_name),
    email: asNullableString(a.email),
    profile_image: asNullableString(a.profile_image),
    profile_image_asset_id: asNullableString(a.profile_image_asset_id),
  };
};

export const normalizeCustomPage = (row: unknown): CustomPageView => {
  const r = (row ?? {}) as Record<string, unknown>;

  const contentHtml = safeStr(r.content_html) || extractHtmlFromContent(r.content);
  const contentText = safeStr(r.content_text) || stripHtml(contentHtml);

  const metaDesc = asNullableString(r.meta_description);
  const summary =
    asNullableString(r.summary) || metaDesc || (contentText ? contentText.slice(0, 160) : null);

  const excerpt = asNullableString(r.excerpt) || (contentText ? contentText.slice(0, 160) : null);

  return {
    id: safeStr(r.id),
    module_key: safeStr(r.module_key),

    title: safeStr(r.title),
    slug: safeStr(r.slug),

    // legacy
    content: contentHtml,

    // blog-friendly aliases
    content_html: contentHtml,
    content_text: contentText,
    summary,
    excerpt,
    category: asNullableString(r.category),

    author_id: asNullableString(r.author_id),
    author: normalizeAuthor(r.author),

    featured_image: asNullableString(r.featured_image),
    featured_image_asset_id: asNullableString(r.featured_image_asset_id),
    featured_image_effective_url: asNullableString(r.featured_image_effective_url),

    image_url: extractLegacyUrl(r.image_url),
    storage_asset_id: asNullableString(r.storage_asset_id),
    image_effective_url: asNullableString(r.image_effective_url),

    alt: asNullableString(r.alt),

    images: extractStringArray(r.images),
    storage_image_ids: extractStringArray(r.storage_image_ids),
    images_effective_urls: extractStringArray(r.images_effective_urls),

    tags: extractStringArray(r.tags),

    meta_title: asNullableString(r.meta_title),
    meta_description: metaDesc,

    is_published: toBool(r.is_published),

    created_at: typeof r.created_at === 'string' ? (r.created_at as string) : undefined,
    updated_at: typeof r.updated_at === 'string' ? (r.updated_at as string) : undefined,
  };
};

// ----------------------------- API Body Mappers (MISSING BEFORE) -----------------------------

/**
 * FE Upsert -> API body
 * Backend çoğunlukla content alanını {"html": "..."} olarak istiyor.
 * Bu mapper:
 * - content_html varsa content:{html:...}
 * - tags/images/storage_image_ids: array normalize
 * - boş stringleri nullify yapar
 * - BoolLike -> BoolLike (asBoolLike) güvenli hale getirir
 */
export function toCustomPageApiBody(body: UpsertCustomPageBody): Record<string, unknown> {
  const tags = toStrArrayOrNull(body.tags) ?? null;
  const images = toStrArrayOrNull(body.images) ?? null;
  const storageIds = toStrArrayOrNull(body.storage_image_ids) ?? null;

  const contentHtml = trimStr(body.content_html);
  const contentText = trimStr(body.content_text);

  return {
    module_key: trimStr(body.module_key),
    title: trimStr(body.title),
    slug: trimStr(body.slug),

    // backend aligned content payload
    content: contentHtml ? { html: contentHtml } : { html: '' },

    // optional aliases (backend kabul ediyorsa)
    content_html: contentHtml || undefined,
    content_text: contentText || undefined,

    summary: nullify(body.summary),
    excerpt: nullify(body.excerpt),
    category: nullify(body.category),

    author_id: nullify(body.author_id),

    featured_image: nullify(body.featured_image),
    featured_image_asset_id: nullify(body.featured_image_asset_id),

    image_url: nullify(body.image_url),
    storage_asset_id: nullify(body.storage_asset_id),

    alt: nullify(body.alt),

    tags: tags ?? undefined,
    images: images ?? undefined,
    storage_image_ids: storageIds ?? undefined,

    meta_title: nullify(body.meta_title),
    meta_description: nullify(body.meta_description),

    is_published: asBoolLike(body.is_published),
  };
}

/**
 * FE Patch -> API PATCH body
 * - sadece gelen alanları gönderir (undefined olanları drop)
 * - content_html varsa content:{html:...} basar
 */
export function toCustomPageApiPatchBody(patch: PatchCustomPageBody): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  const set = (k: string, v: unknown) => {
    if (typeof v === 'undefined') return;
    out[k] = v;
  };

  set(
    'module_key',
    typeof patch.module_key === 'undefined' ? undefined : trimStr(patch.module_key),
  );
  set('title', typeof patch.title === 'undefined' ? undefined : trimStr(patch.title));
  set('slug', typeof patch.slug === 'undefined' ? undefined : trimStr(patch.slug));

  // content_html patch => content:{html}
  if (typeof patch.content_html !== 'undefined') {
    set('content', { html: toTrimStr(patch.content_html) });
    set('content_html', toTrimStr(patch.content_html));
  }

  if (typeof patch.content_text !== 'undefined') set('content_text', toTrimStr(patch.content_text));

  if (typeof patch.summary !== 'undefined') set('summary', nullify(patch.summary));
  if (typeof patch.excerpt !== 'undefined') set('excerpt', nullify(patch.excerpt));
  if (typeof patch.category !== 'undefined') set('category', nullify(patch.category));

  if (typeof patch.author_id !== 'undefined') set('author_id', nullify(patch.author_id));

  if (typeof patch.featured_image !== 'undefined')
    set('featured_image', nullify(patch.featured_image));
  if (typeof patch.featured_image_asset_id !== 'undefined')
    set('featured_image_asset_id', nullify(patch.featured_image_asset_id));

  if (typeof patch.image_url !== 'undefined') set('image_url', nullify(patch.image_url));
  if (typeof patch.storage_asset_id !== 'undefined')
    set('storage_asset_id', nullify(patch.storage_asset_id));

  if (typeof patch.alt !== 'undefined') set('alt', nullify(patch.alt));

  if (typeof patch.tags !== 'undefined') set('tags', toStrArrayOrNull(patch.tags) ?? null);
  if (typeof patch.images !== 'undefined') set('images', toStrArrayOrNull(patch.images) ?? null);
  if (typeof patch.storage_image_ids !== 'undefined')
    set('storage_image_ids', toStrArrayOrNull(patch.storage_image_ids) ?? null);

  if (typeof patch.meta_title !== 'undefined') set('meta_title', nullify(patch.meta_title));
  if (typeof patch.meta_description !== 'undefined')
    set('meta_description', nullify(patch.meta_description));

  if (typeof patch.is_published !== 'undefined')
    set('is_published', asBoolLike(patch.is_published));

  return out;
}
