// =============================================================
// FILE: src/i18n/config.ts
// FINAL — i18n runtime config
// =============================================================

export const FALLBACK_LOCALE = 'de';

/** All locales the site supports — order matters for hreflang generation. */
export const SUPPORTED_LOCALES = ['de', 'en', 'tr'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/** x-default locale for hreflang (primary market). */
export const DEFAULT_HREFLANG_LOCALE: SupportedLocale = 'de';

// RTL setin (istersen genişlet)
export const KNOWN_RTL = new Set(['ar', 'fa', 'he', 'ur', 'ckb', 'ps', 'sd', 'ug', 'yi', 'dv']);


/**
 * Ceviri eksik oldugunda geri duselecek SITE varsayilan dili.
 *
 * API i18n'i alan bazinda COALESCE(istenen, varsayilan) ile cozer. Cagrilarda
 * `default_locale` olarak istenen dilin KENDISI gonderilirse bu fallback
 * etkisiz kalir ve cevirisi olmayan kayitlar adi bos / slug'i NULL doner
 * (gzlteknoloji.com EN sayfasinda 21 hizmetin 16'si basliksiz cikiyordu).
 */
export function siteDefaultLocale(): string {
  const env = String(process.env.NEXT_PUBLIC_DEFAULT_LOCALE || '').trim().toLowerCase();
  return env.split('-')[0] || FALLBACK_LOCALE;
}
