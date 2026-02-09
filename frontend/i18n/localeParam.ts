// =============================================================
// FILE: src/i18n/localeParam.ts
// FINAL — server-safe locale param resolver (Next 16 params Promise)
// - No hardcoded locale list here
// - Simple normalization with fallback
// =============================================================

import { FALLBACK_LOCALE } from '@/i18n/config';

export const DEFAULT_LOCALE_FALLBACK = FALLBACK_LOCALE;

export function normalizeLocaleParam(raw: unknown, fallback = DEFAULT_LOCALE_FALLBACK): string {
  const v = String(raw ?? fallback)
    .trim()
    .toLowerCase();
  return v || fallback;
}

export async function unwrapRouteParams<T extends object>(params: T | Promise<T>): Promise<T> {
  return await Promise.resolve(params);
}
