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
