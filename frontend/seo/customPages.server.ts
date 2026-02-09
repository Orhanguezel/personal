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
): Promise<CustomPageSeoPick | null> {
  const mk = String(module_key ?? '').trim();
  const sl = String(slug ?? '').trim();
  if (!mk || !sl) return null;

  const url = joinApi(
    BASE_URL,
    `/custom_pages/by-module/${encodeURIComponent(mk)}/${encodeURIComponent(sl)}`,
  );

  const j = await fetchJsonNoStore(url);
  return j ? pickSeo(j) : null;
}

/** ✅ SEO page builder (module+slug) */
export async function getCustomPageSeoPageByModuleSlug(
  module_key: string,
  slug: string,
): Promise<SeoPage | null> {
  const raw = await getCustomPageSeoByModuleSlug(module_key, slug);
  return toSeoPageFromCustomPage(raw);
}

/** Legacy: only slug (may collide between modules) */
export async function getCustomPageSeoBySlug(slug: string): Promise<CustomPageSeoPick | null> {
  const sl = String(slug ?? '').trim();
  if (!sl) return null;

  const url = joinApi(BASE_URL, `/custom_pages/by-slug/${encodeURIComponent(sl)}`);

  const j = await fetchJsonNoStore(url);
  return j ? pickSeo(j) : null;
}

/** Legacy SEO page builder (slug only) */
export async function getCustomPageSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const raw = await getCustomPageSeoBySlug(slug);
  return toSeoPageFromCustomPage(raw);
}
