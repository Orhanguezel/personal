// =============================================================
// FILE: src/i18n/localeParam.ts
// FINAL — server-safe locale param resolver (Next 16 params Promise)
// - No hardcoded locale list here
// - Simple normalization with fallback
// =============================================================

import { FALLBACK_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config';

export const DEFAULT_LOCALE_FALLBACK = FALLBACK_LOCALE;

const LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);

/**
 * Route `[locale]` segmentini çözer. Bilinmeyen segment (ör. /destek → locale=destek)
 * API ve ui/*.json ile uyumsuzluk yaratmasın diye fallback döner.
 */
export function normalizeLocaleParam(raw: unknown, fallback = DEFAULT_LOCALE_FALLBACK): string {
  const v =
    String(raw ?? fallback)
      .trim()
      .toLowerCase()
      .split('-')[0] || fallback;
  return LOCALE_SET.has(v) ? v : fallback;
}

export async function unwrapRouteParams<T extends object>(params: T | Promise<T>): Promise<T> {
  return await Promise.resolve(params);
}
