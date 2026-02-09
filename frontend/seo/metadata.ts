// =============================================================
// FILE: src/seo/metadata.ts
// FINAL — Next.js Metadata builder (STRICT + clean)
// - Helpers in src/seo/utils.ts
// - NO hard fallbacks
// - robots: page.noindex overrides, else parses seo.defaults.robots
// - themeColor REMOVED (App Router should use generateViewport)
// =============================================================

import type { Metadata } from 'next';
import type { SeoAll, SeoPage } from '@/integrations/shared';

import {
  joinUrl,
  applyTemplate,
  asKeywords,
  toAbsUrl,
  buildRobots,
  buildIconsFromSeo,
  safeText,
} from '@/integrations/shared';

export function buildMetadata(args: {
  seo: SeoAll;
  page?: SeoPage | null;

  titleVars?: Record<string, string>;
  descVars?: Record<string, string>;
  keywordsVars?: Record<string, string>;

  canonicalPath?: string;
  ogType?: 'website' | 'article';
}): Metadata {
  const { seo, page, titleVars, descVars, keywordsVars, canonicalPath, ogType } = args;

  const d = seo.defaults;

  const siteName = safeText(d.siteName).trim();
  const canonicalBase = safeText(d.canonicalBase).trim();

  if (!siteName) throw new Error('[SEO] Missing required: seo.defaults.siteName');
  if (!canonicalBase) throw new Error('[SEO] Missing required: seo.defaults.canonicalBase');

  const varsTitle = { ...(titleVars || {}), siteName };
  const varsDesc = { ...(descVars || {}), siteName };
  const varsKw = { ...(keywordsVars || {}), siteName };

  const pageTitle =
    page?.title ?? (page?.titleTemplate ? applyTemplate(page.titleTemplate, varsTitle) : siteName);

  const pageDesc =
    page?.description ??
    (page?.descriptionTemplate ? applyTemplate(page.descriptionTemplate, varsDesc) : undefined);

  const pageKeywords =
    asKeywords(page?.keywords) ??
    (page?.keywordsTemplate ? applyTemplate(page.keywordsTemplate, varsKw) : undefined);

  const canonical =
    page?.canonicalPath && safeText(page.canonicalPath).trim()
      ? joinUrl(canonicalBase, page.canonicalPath)
      : canonicalPath && safeText(canonicalPath).trim()
        ? joinUrl(canonicalBase, canonicalPath)
        : canonicalBase;

  const robots = buildRobots(Boolean(page?.noindex), d.robots);

  const ogImage = toAbsUrl(canonicalBase, page?.ogImage ?? null);
  const finalOgType: 'website' | 'article' = ogType || page?.ogType || 'website';

  const icons = buildIconsFromSeo(seo.icons);

  return {
    title: pageTitle,
    ...(pageDesc ? { description: pageDesc } : {}),
    ...(pageKeywords ? { keywords: pageKeywords } : {}),

    metadataBase: new URL(canonicalBase),
    alternates: { canonical },

    ...(robots ? { robots } : {}),
    ...(d.author ? { authors: [{ name: d.author }] } : {}),

    openGraph: {
      type: finalOgType,
      ...(d.ogLocale ? { locale: d.ogLocale } : {}),
      siteName,
      title: pageTitle,
      ...(pageDesc ? { description: pageDesc } : {}),
      url: canonical,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },

    twitter: {
      ...(d.twitterCard ? { card: d.twitterCard } : {}),
      title: pageTitle,
      ...(pageDesc ? { description: pageDesc } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },

    ...(icons ? { icons } : {}),
  };
}
