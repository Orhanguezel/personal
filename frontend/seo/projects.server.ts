// =============================================================
// FILE: src/seo/projects.server.ts
// FINAL — Server helpers for Projects (SEO use)
// - cache: no-store
// - getProjectSeoBySlug(slug)
// =============================================================

import type { SeoPage, ProjectSeoPick } from '@/integrations/shared';
import { BASE_URL } from '@/integrations/apiBase';
import {
  asText,
  fetchJsonNoStore,
  joinApi,
  pickSeoImages,
  buildSeoPageFromMeta,
} from '@/integrations/shared';

function pickSeo(j: Record<string, unknown>): ProjectSeoPick {
  const { image_effective_url, image_url } = pickSeoImages(j);

  return {
    title: asText(j.title) || asText(j.name) || null,
    slug: asText(j.slug),

    meta_title: asText(j.meta_title),
    meta_description: asText(j.meta_description),

    image_effective_url,
    image_url,
  };
}

export function toSeoPageFromProject(pick: ProjectSeoPick | null): SeoPage | null {
  if (!pick) return null;
  return buildSeoPageFromMeta({
    title: pick.title,
    meta_title: pick.meta_title,
    meta_description: pick.meta_description,
    og_image: pick.image_effective_url || pick.image_url,
  });
}

/** Route: GET /projects/by-slug/:slug */
export async function getProjectSeoBySlug(slug: string): Promise<ProjectSeoPick | null> {
  const sl = String(slug ?? '').trim();
  if (!sl) return null;

  const url = joinApi(BASE_URL, `/projects/by-slug/${encodeURIComponent(sl)}`);

  const j = await fetchJsonNoStore(url);
  return j ? pickSeo(j) : null;
}

/** ✅ SEO page builder for project by slug */
export async function getProjectSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const raw = await getProjectSeoBySlug(slug);
  return toSeoPageFromProject(raw);
}
