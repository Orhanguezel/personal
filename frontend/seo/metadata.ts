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

const SITE_LOCALES = ['de', 'en', 'tr'] as const;
const DEFAULT_SITE_LOCALE = 'de';

const OG_LOCALE_BY_ROUTE: Record<string, string> = {
  de: 'de_DE',
  en: 'en_US',
  tr: 'tr_TR',
};

function normalizeCanonicalPathForAlternates(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const t = safeText(path).trim();
  if (!t) return undefined;
  return t.startsWith('/') ? t : `/${t}`;
}

function inferRouteLocaleFromPath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const first = path.split('/').filter(Boolean)[0];
  return first && (SITE_LOCALES as readonly string[]).includes(first) ? first : undefined;
}

/** DE/EN/TR + x-default alternate URLs for hreflang. */
function buildHreflangLanguages(
  canonicalBase: string,
  pathWithLocale: string | undefined,
): Record<string, string> | undefined {
  const p = normalizeCanonicalPathForAlternates(pathWithLocale);
  if (!p) return undefined;
  const segments = p.split('/').filter(Boolean);
  if (segments.length < 1) return undefined;
  if (!(SITE_LOCALES as readonly string[]).includes(segments[0])) return undefined;
  const suffix = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '';
  const languages: Record<string, string> = {};
  for (const loc of SITE_LOCALES) {
    languages[loc] = joinUrl(canonicalBase, `/${loc}${suffix}`);
  }
  languages['x-default'] = joinUrl(canonicalBase, `/${DEFAULT_SITE_LOCALE}${suffix}`);
  return languages;
}

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

  const pathForAlternates = normalizeCanonicalPathForAlternates(
    page?.canonicalPath && safeText(page.canonicalPath).trim()
      ? safeText(page.canonicalPath).trim()
      : canonicalPath && safeText(canonicalPath).trim()
        ? safeText(canonicalPath).trim()
        : undefined,
  );

  const hreflangLanguages = buildHreflangLanguages(canonicalBase, pathForAlternates);
  const routeLocale = inferRouteLocaleFromPath(pathForAlternates);
  const primaryOgLocale = routeLocale
    ? OG_LOCALE_BY_ROUTE[routeLocale]
    : d.ogLocale
      ? d.ogLocale
      : undefined;
  const allOgLocales = ['de_DE', 'en_US', 'tr_TR'];
  const alternateOgLocales = primaryOgLocale
    ? allOgLocales.filter((l) => l !== primaryOgLocale)
    : allOgLocales;

  const robots = buildRobots(Boolean(page?.noindex), d.robots);

  const ogImage = toAbsUrl(canonicalBase, page?.ogImage ?? null);
  const finalOgType: 'website' | 'article' = ogType || page?.ogType || 'website';

  const icons = buildIconsFromSeo(seo.icons);

  return {
    title: pageTitle,
    ...(pageDesc ? { description: pageDesc } : {}),
    ...(pageKeywords ? { keywords: pageKeywords } : {}),

    metadataBase: new URL(canonicalBase),
    alternates: {
      canonical,
      ...(hreflangLanguages ? { languages: hreflangLanguages } : {}),
    },

    ...(robots ? { robots } : {}),
    ...(d.author ? { authors: [{ name: d.author }] } : {}),

    openGraph: {
      type: finalOgType,
      ...(primaryOgLocale ? { locale: primaryOgLocale } : {}),
      ...(alternateOgLocales.length ? { alternateLocale: alternateOgLocales } : {}),
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
