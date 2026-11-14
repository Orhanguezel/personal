import {commonEnabled,commonAlternates} from './sharedContent.server';
import {localizePath} from '@/i18n/routes';
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
import { localizeAnyPath } from '@/i18n/routes';

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

const SHOWCASE_OG_IMAGE = '/assets/imgs/guezel-showcase/og-default.jpg';
const DEPRECATED_OG_IMAGE_SUFFIXES = [
  '/assets/imgs/home-page-3/hero/img-1.png',
  '/assets/imgs/home-page-3/hero/img-1.webp',
];

function normalizeCanonicalPathForAlternates(path: string | undefined): string | undefined {
  if (!path) return undefined;
  const t = safeText(path).trim();
  if (!t) return undefined;
  return t.startsWith('/') ? t : `/${t}`;
}

/** Convert an internal App Router path to the single public localized URL. */
function localizeCanonicalPath(path: string | undefined): string | undefined {
  const normalized = normalizeCanonicalPathForAlternates(path);
  if (!normalized) return undefined;

  const segments = normalized.split('/').filter(Boolean);
  const locale = segments[0];
  if (!(SITE_LOCALES as readonly string[]).includes(locale)) return normalized;

  const internalSuffix = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '/';
  const localizedSuffix = localizeAnyPath(locale, internalSuffix);
  return localizedSuffix === '/' ? `/${locale}` : `/${locale}${localizedSuffix}`;
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
  localizedPaths?: Partial<Record<(typeof SITE_LOCALES)[number], string>>,
): Record<string, string> | undefined {
  const p = normalizeCanonicalPathForAlternates(pathWithLocale);
  if (!p) return undefined;
  const segments = p.split('/').filter(Boolean);
  if (segments.length < 1) return undefined;
  if (!(SITE_LOCALES as readonly string[]).includes(segments[0])) return undefined;
  const suffix = segments.length > 1 ? `/${segments.slice(1).join('/')}` : '';
  const languages: Record<string, string> = {};
  for (const loc of SITE_LOCALES) {
    const explicitPath = localizeCanonicalPath(localizedPaths?.[loc]);
    if (explicitPath) {
      languages[loc] = joinUrl(canonicalBase, explicitPath);
      continue;
    }
    const localizedSuffix = suffix ? localizeAnyPath(loc, suffix) : '';
    languages[loc] = joinUrl(canonicalBase, `/${loc}${localizedSuffix}`);
  }
  languages['x-default'] = languages[DEFAULT_SITE_LOCALE];
  return languages;
}

function normalizeOgImagePath(image: unknown): string | null {
  const raw = safeText(image).trim();
  if (!raw) return null;
  return DEPRECATED_OG_IMAGE_SUFFIXES.some((suffix) => raw.endsWith(suffix))
    ? SHOWCASE_OG_IMAGE
    : raw;
}

function buildLegacyMetadata(args: {
  seo: SeoAll;
  page?: SeoPage | null;

  titleVars?: Record<string, string>;
  descVars?: Record<string, string>;
  keywordsVars?: Record<string, string>;

  canonicalPath?: string;
  localizedPaths?: Partial<Record<(typeof SITE_LOCALES)[number], string>>;
  ogType?: 'website' | 'article';
}): Metadata {
  const {
    seo,
    page,
    titleVars,
    descVars,
    keywordsVars,
    canonicalPath,
    localizedPaths,
    ogType,
  } = args;

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

  const rawCanonicalPath =
    page?.canonicalPath && safeText(page.canonicalPath).trim()
      ? safeText(page.canonicalPath).trim()
      : canonicalPath && safeText(canonicalPath).trim()
        ? safeText(canonicalPath).trim()
        : undefined;
  const pathForAlternates = localizeCanonicalPath(rawCanonicalPath);
  const canonical = pathForAlternates
    ? joinUrl(canonicalBase, pathForAlternates)
    : canonicalBase;

  const hreflangLanguages = buildHreflangLanguages(
    canonicalBase,
    pathForAlternates,
    localizedPaths,
  );
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

  const ogImage = toAbsUrl(canonicalBase, normalizeOgImagePath(page?.ogImage));
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

export async function buildMetadata(args:Parameters<typeof buildLegacyMetadata>[0]):Promise<Metadata>{
 const p=args.canonicalPath?.split('/').filter(Boolean);if(p?.length){args={...args,canonicalPath:'/'+p[0]+localizePath(p[0],'/'+p.slice(1).join('/'))};}
 const result=buildLegacyMetadata(args);
 if(commonEnabled&&args.canonicalPath){const alternates=await commonAlternates(args.canonicalPath);if(alternates){result.alternates=alternates;if(result.openGraph)result.openGraph={...result.openGraph,url:alternates.canonical};}}
 return result;
}
