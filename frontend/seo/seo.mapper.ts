// =============================================================
// FILE: src/seo/seo.mapper.ts
// FINAL — SEO map builder (SiteSettings -> SeoAll)
// - Single source for parsing/normalization
// =============================================================

import type {
  SeoAll,
  SeoDefaults,
  SeoAppIcons,
  SeoPage,
  LocalBusinessJsonLd,
} from '@/integrations/shared';
import { SEO_KEYS } from './seo.keys';

import {
  trimSlash,
  isAbsUrl,
  joinUrl,
  toAbsUrl,
  asText,
  requireText,
  safeObj,
  safeArr,
  tryParse,
} from '@/integrations/shared';

function mapPageKey(k: string): string {
  return k.replace(SEO_KEYS.pagesPrefix, '');
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

/**
 * Unwrap only structural wrappers:
 * - { key, value }
 * - { value }
 * - { data: { value } }
 */
function unwrapSettingValue(v: unknown): unknown {
  if (!isRecord(v)) return v;

  if ('value' in v) return (v as any).value;

  const data = (v as any).data;
  if (isRecord(data) && 'value' in data) return (data as any).value;

  return v;
}

/** Strict JSON object reader (no content fallback) */
function requireJsonObject<T extends Record<string, unknown>>(raw: unknown, keyLabel: string): T {
  const unwrapped = unwrapSettingValue(raw);

  const obj = safeObj<T>(unwrapped) ?? safeObj<T>(tryParse(unwrapped));

  if (!obj) {
    const rawType = raw === null ? 'null' : Array.isArray(raw) ? 'array' : typeof raw;
    const unwrappedType =
      unwrapped === null ? 'null' : Array.isArray(unwrapped) ? 'array' : typeof unwrapped;

    throw new Error(
      `[SEO] Missing or invalid JSON: ${keyLabel} (raw:${rawType}, unwrapped:${unwrappedType}). ` +
        `DB'de site_settings.key='${keyLabel}' kaydı var mı? Global ise locale='*' olmalı.`,
    );
  }
  return obj;
}

function readJsonArray<T>(raw: unknown): T[] | null {
  const unwrapped = unwrapSettingValue(raw);
  return safeArr<T>(unwrapped) ?? safeArr<T>(tryParse(unwrapped)) ?? null;
}

function readText(raw: unknown): string | null {
  return asText(unwrapSettingValue(raw));
}

export function buildSeoAllFromSettings(dict: Record<string, unknown>): SeoAll {
  // REQUIRED: seo_defaults
  const defaultsObj = requireJsonObject<SeoDefaults & Record<string, unknown>>(
    dict[SEO_KEYS.defaults],
    SEO_KEYS.defaults,
  );

  const canonicalBase = trimSlash(
    requireText((defaultsObj as any).canonicalBase, 'seo_defaults.canonicalBase'),
  );
  const siteName = requireText((defaultsObj as any).siteName, 'seo_defaults.siteName');

  const defaults: SeoDefaults = {
    ...(defaultsObj as any),
    canonicalBase,
    siteName,
  };

  // OPTIONAL: default_locale -> htmlLang
  const defaultLocale = readText(dict[SEO_KEYS.defaultLocale]);
  if (defaultLocale) defaults.htmlLang = defaultLocale.toLowerCase();

  // OPTIONAL
  const sameAs = readJsonArray<string>(dict[SEO_KEYS.sameAs]) ?? undefined;

  const localBusiness =
    safeObj<LocalBusinessJsonLd>(unwrapSettingValue(dict[SEO_KEYS.localBusiness])) ??
    safeObj<LocalBusinessJsonLd>(tryParse(unwrapSettingValue(dict[SEO_KEYS.localBusiness]))) ??
    undefined;

  // seo_pages_* (values may be wrapper or json-string)
  const pages: Record<string, SeoPage> = {};
  for (const [k, v] of Object.entries(dict)) {
    if (!k.startsWith(SEO_KEYS.pagesPrefix)) continue;

    const pageKey = mapPageKey(k);
    const unwrapped = unwrapSettingValue(v);

    const obj = safeObj<SeoPage>(unwrapped) ?? safeObj<SeoPage>(tryParse(unwrapped));
    if (obj) pages[pageKey] = obj;
  }

  // alias mapping (not a content fallback)
  if (!pages.services && pages.properties) pages.services = pages.properties;

  // normalize ogImage absolute ONLY if present
  for (const p of Object.values(pages)) {
    const raw = String(p?.ogImage ?? '').trim();
    if (!raw) continue;
    if (!isAbsUrl(raw)) p.ogImage = joinUrl(canonicalBase, raw);
  }

  // REQUIRED: seo_app_icons
  const iconsFromSeo = requireJsonObject<SeoAppIcons & Record<string, unknown>>(
    dict[SEO_KEYS.appIcons],
    SEO_KEYS.appIcons,
  );

  // NOTE: Favicon'lar için relative path kullan (Next.js public folder'dan servis edilir)
  // Absolute URL'e çevirmeye gerek yok, Next.js otomatik handle eder
  const icons: SeoAppIcons = {
    ...(iconsFromSeo.appleTouchIcon
      ? { appleTouchIcon: String(iconsFromSeo.appleTouchIcon).trim() }
      : {}),
    ...(iconsFromSeo.favicon32
      ? { favicon32: String(iconsFromSeo.favicon32).trim() }
      : {}),
    ...(iconsFromSeo.favicon16
      ? { favicon16: String(iconsFromSeo.favicon16).trim() }
      : {}),
  };

  const hasAnyIcon = Boolean(icons.appleTouchIcon || icons.favicon32 || icons.favicon16);
  if (!hasAnyIcon) throw new Error('[SEO] seo_app_icons present but empty (no icon urls)');

  return { defaults, icons, sameAs, pages, localBusiness };
}
