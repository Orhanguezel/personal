// =============================================================
// FILE: src/i18n/server.ts
// FINAL — server helpers for App Router layouts (NO middleware)
// - Uses settingsApi.server (env OR request-origin fallback)
// - Returns {activeLocales, defaultLocale} computed from DB settings
// =============================================================

import { FALLBACK_LOCALE } from '@/i18n/config';
import { normLocaleTag, normalizeLocales, resolveDefaultLocale } from '@/i18n/localeUtils';
import { unwrapData } from '@/i18n/settingsApi.shared';
import { fetchAppLocalesRawServer, fetchDefaultLocaleRawServer } from '@/i18n/settingsApi.server';

export async function getRuntimeLocalesServer(): Promise<{
  activeLocales: string[];
  defaultLocale: string;
}> {
  const [appLocalesRaw, defaultLocaleRaw] = await Promise.all([
    fetchAppLocalesRawServer(),
    fetchDefaultLocaleRawServer(),
  ]);

  const appLocalesValue = unwrapData(appLocalesRaw);
  const defaultLocaleValue = unwrapData(defaultLocaleRaw);

  const activeLocales = normalizeLocales(appLocalesValue);
  const fallback = normLocaleTag(FALLBACK_LOCALE) || 'de';

  const defaultLocale =
    resolveDefaultLocale(defaultLocaleValue, appLocalesValue) ||
    normLocaleTag(activeLocales[0]) ||
    fallback;

  return {
    activeLocales: activeLocales.length ? activeLocales : [fallback],
    defaultLocale: defaultLocale || fallback,
  };
}

export async function resolveLocaleFromParamServer(paramLocale: unknown): Promise<{
  locale: string;
  activeLocales: string[];
  defaultLocale: string;
}> {
  const { activeLocales, defaultLocale } = await getRuntimeLocalesServer();

  const cand = normLocaleTag(paramLocale);
  const set = new Set(activeLocales.map(normLocaleTag));

  const locale = cand && set.has(cand) ? cand : defaultLocale;

  return { locale, activeLocales, defaultLocale };
}
