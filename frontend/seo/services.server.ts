// =============================================================
// FILE: src/seo/services.server.ts
// FINAL — Server helpers for Services (SEO use)
// - Server-only fetch (generateMetadata için)
// - cache: no-store
// - getServiceSeoBySlug(slug)
// - ✅ API base centralized via BASE_URL
// =============================================================

import { BASE_URL } from '@/integrations/apiBase';
import type { SeoPage, ServiceSeoPick } from '@/integrations/shared';
import {
  asText,
  fetchJsonNoStore,
  joinApi,
  pickSeoImages,
  buildSeoPageFromMeta,
} from '@/integrations/shared';

function pickSeo(j: Record<string, unknown>): ServiceSeoPick {
  const { image_effective_url, image_url } = pickSeoImages(j);

  return {
    name: asText(j.name) || asText(j.title) || null,
    slug: asText(j.slug),

    meta_title: asText(j.meta_title),
    meta_description: asText(j.meta_description),

    image_effective_url,
    image_url,
  };
}

export function toSeoPageFromService(pick: ServiceSeoPick | null): SeoPage | null {
  if (!pick) return null;
  return buildSeoPageFromMeta({
    title: pick.name,
    meta_title: pick.meta_title,
    meta_description: pick.meta_description,
    og_image: pick.image_effective_url || pick.image_url,
  });
}

/** Route: GET /services/by-slug/:slug */
export async function getServiceSeoBySlug(slug: string): Promise<ServiceSeoPick | null> {
  const sl = String(slug ?? '').trim();
  if (!sl) return null;

  const url = joinApi(BASE_URL, `/services/by-slug/${encodeURIComponent(sl)}`);

  const j = await fetchJsonNoStore(url);
  return j ? pickSeo(j) : null;
}

/** ✅ SEO page builder for service by slug */
export async function getServiceSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const raw = await getServiceSeoBySlug(slug);
  return toSeoPageFromService(raw);
}
