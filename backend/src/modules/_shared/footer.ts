

import { normalizeLocale } from '@/core/i18n';
import {
  getDefaultLocale as getDefaultLocaleFromSiteSettings,
  getEffectiveDefaultLocale,
} from '@/modules/siteSettings/service';

/** de-DE -> de, TR -> tr */
export function normalizeLooseLocale(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim();
  if (!s) return null;

  // normalizeLocale senin core/i18n fonksiyonun; yoksa lower fallback
  const norm = normalizeLocale(s) || s.toLowerCase();

  // normalizeLocale "de-de" döndürürse prefix al
  const out = norm.includes("-") ? norm.split("-")[0] : norm;
  return out || null;
}

/** default_locale DB’den */
export async function getDbDefaultLocale(): Promise<string> {
  const raw = await getDefaultLocaleFromSiteSettings(null);
  const norm = normalizeLooseLocale(raw);
  if (norm) return norm;
  return await getEffectiveDefaultLocale();
}

/**
 * Admin request için locale çöz:
 * - explicit (query/body) > req.locale > db default_locale
 */
export async function resolveLocales(req: any): Promise<{ locale: string; defaultLocale: string }> {
  const defaultLocale = await getDbDefaultLocale();

  const qLocale = normalizeLooseLocale(req?.query?.locale);
  const bLocale = normalizeLooseLocale(req?.body?.locale);
  const reqLocale = normalizeLooseLocale(req?.locale);

  const locale = bLocale || qLocale || reqLocale || defaultLocale;

  return { locale, defaultLocale };
}
