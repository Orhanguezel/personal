// =============================================================
// FILE: src/seo/customPages.server.ts
// FINAL — Server helpers for Custom Pages (SEO use)
// - Server-only fetch (generateMetadata için)
// - cache: no-store
// - ✅ getCustomPageSeoByModuleSlug(module_key, slug)
// - Legacy: getCustomPageSeoBySlug(slug) kept
// - ✅ API base centralized via BASE_URL
// =============================================================

import { BASE_URL } from '@/integrations/apiBase';
import type { SeoPage } from '../integrations/shared/seo.types';
import {
  asText,
  fetchJsonNoStore,
  joinApi,
  pickSeoImages,
  buildSeoPageFromMeta,
} from '@/integrations/shared';

export type CustomPageSeoPick = {
  id?: string | null;
  title?: string | null;

  meta_title?: string | null;
  meta_description?: string | null;

  image_effective_url?: string | null;
  image_url?: string | null;
  alt?: string | null;

  module_key?: string | null;
  slug?: string | null;
};

function pickSeo(j: Record<string, unknown>): CustomPageSeoPick {
  const { image_effective_url, image_url } = pickSeoImages(j);

  return {
    id: asText(j.id),
    module_key: asText(j.module_key),
    slug: asText(j.slug),

    title: asText(j.title),
    meta_title: asText(j.meta_title),
    meta_description: asText(j.meta_description),

    image_effective_url,
    image_url,
    alt: asText(j.alt),
  };
}

const PUBLIC_LOCALES = ['tr', 'en', 'de'] as const;

/** Resolve locale-specific slugs through the shared DB row id. */
export async function getCustomPageLocalizedSlugsByModuleSlug(
  moduleKey: string,
  slug: string,
  locale: string,
): Promise<Partial<Record<(typeof PUBLIC_LOCALES)[number], string>>> {
  const current = await getCustomPageSeoByModuleSlug(moduleKey, slug, locale);
  const id = asText(current?.id);
  if (!id) return {};

  const entries = await Promise.all(
    PUBLIC_LOCALES.map(async (targetLocale) => {
      const url = new URL(joinApi(BASE_URL, '/custom_pages'));
      url.searchParams.set('module_key', moduleKey);
      url.searchParams.set('locale', targetLocale);
      url.searchParams.set('default_locale', targetLocale);
      url.searchParams.set('limit', '100');

      const res = await fetch(url.toString(), {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const rows = (await res.json()) as unknown;
      if (!Array.isArray(rows)) return null;
      const sibling = rows.find((row) => row && typeof row === 'object' && asText((row as any).id) === id);
      const siblingSlug = sibling && typeof sibling === 'object' ? asText((sibling as any).slug) : '';
      return siblingSlug ? ([targetLocale, siblingSlug] as const) : null;
    }),
  );

  return Object.fromEntries(entries.filter((entry): entry is NonNullable<typeof entry> => Boolean(entry)));
}

export function toSeoPageFromCustomPage(pick: CustomPageSeoPick | null): SeoPage | null {
  if (!pick) return null;
  return buildSeoPageFromMeta({
    title: pick.title,
    meta_title: pick.meta_title,
    meta_description: pick.meta_description,
    og_image: pick.image_effective_url || pick.image_url,
  });
}

/** ✅ Recommended: module+slug (collision-safe) */
export async function getCustomPageSeoByModuleSlug(
  module_key: string,
  slug: string,
  locale?: string,
): Promise<CustomPageSeoPick | null> {
  const mk = String(module_key ?? '').trim();
  const sl = String(slug ?? '').trim();
  if (!mk || !sl) return null;

  const base = joinApi(BASE_URL, `/custom-pages/by-module/${encodeURIComponent(mk)}/${encodeURIComponent(sl)}`);
  const url = locale ? `${base}?locale=${encodeURIComponent(locale)}` : base;

  const j = await fetchJsonNoStore(url);
  return j ? pickSeo(j) : null;
}

/** ✅ SEO page builder (module+slug) */
export async function getCustomPageSeoPageByModuleSlug(
  module_key: string,
  slug: string,
  locale?: string,
): Promise<SeoPage | null> {
  const raw = await getCustomPageSeoByModuleSlug(module_key, slug, locale);
  return toSeoPageFromCustomPage(raw);
}

/** Legacy: only slug (may collide between modules) */
export async function getCustomPageSeoBySlug(slug: string): Promise<CustomPageSeoPick | null> {
  const sl = String(slug ?? '').trim();
  if (!sl) return null;

  const url = joinApi(BASE_URL, `/custom-pages/by-slug/${encodeURIComponent(sl)}`);

  const j = await fetchJsonNoStore(url);
  return j ? pickSeo(j) : null;
}

/** Legacy SEO page builder (slug only) */
export async function getCustomPageSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const raw = await getCustomPageSeoBySlug(slug);
  return toSeoPageFromCustomPage(raw);
}
