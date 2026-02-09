// =============================================================
// FILE: src/i18n/settingsApi.shared.ts
// FINAL — shared constants + helpers
// =============================================================

export const SETTINGS_ENDPOINTS = {
  appLocales: '/site_settings/app-locales',
  defaultLocale: '/site_settings/default-locale',
} as const;

export type SettingsEndpoints = typeof SETTINGS_ENDPOINTS;

export function stripTrailingSlash(x: string) {
  return String(x || '').replace(/\/+$/, '');
}

/** tolerant unwrap: returns raw or raw.data if exists */
export function unwrapData(v: any): any {
  if (v && typeof v === 'object' && 'data' in v) return (v as any).data;
  return v;
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      credentials: 'omit',
      ...init,
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
