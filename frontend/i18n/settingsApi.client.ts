// =============================================================
// FILE: src/i18n/settingsApi.client.ts
// FINAL — client settings fetchers (CORS-safe)
// - Prefers same-origin "/api" if env is not set
// - If NEXT_PUBLIC_API_* points to domain, appends /api if missing
// =============================================================

'use client';

import { SETTINGS_ENDPOINTS, fetchJson, stripTrailingSlash } from './settingsApi.shared';

function withApiSuffix(base: string) {
  const b = stripTrailingSlash(base);
  if (!b) return '';
  return /\/api$/i.test(b) ? b : `${b}/api`;
}

/**
 * Client base:
 * - If NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_URL is set: use it
 * - Else: same-origin "/api" (best for local dev + avoids CORS)
 */
export function getApiBaseClient(): string {
  const raw =
    (process.env.NEXT_PUBLIC_API_BASE_URL || '').trim() ||
    (process.env.NEXT_PUBLIC_API_URL || '').trim();

  if (!raw) return '/api'; // same origin
  return withApiSuffix(raw);
}

export async function fetchAppLocalesRawClient(): Promise<any> {
  const base = getApiBaseClient();
  return fetchJson<any>(`${base}${SETTINGS_ENDPOINTS.appLocales}`);
}

export async function fetchDefaultLocaleRawClient(): Promise<any> {
  const base = getApiBaseClient();
  return fetchJson<any>(`${base}${SETTINGS_ENDPOINTS.defaultLocale}`);
}
