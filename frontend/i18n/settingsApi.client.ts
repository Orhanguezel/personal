// =============================================================
// FILE: src/i18n/settingsApi.client.ts
// FINAL — client settings fetchers (CORS-safe)
// - Uses the central API base resolver
// =============================================================

'use client';

import { resolveBaseUrl } from '@/integrations/apiBase';
import { SETTINGS_ENDPOINTS, fetchJson } from './settingsApi.shared';

/**
 * Client base:
 * - If NEXT_PUBLIC_API_BASE_URL or NEXT_PUBLIC_API_URL is set: use it
 * - Else: central resolver fallback
 */
export function getApiBaseClient(): string {
  return resolveBaseUrl();
}

export async function fetchAppLocalesRawClient(): Promise<any> {
  const base = getApiBaseClient();
  return fetchJson<any>(`${base}${SETTINGS_ENDPOINTS.appLocales}`);
}

export async function fetchDefaultLocaleRawClient(): Promise<any> {
  const base = getApiBaseClient();
  return fetchJson<any>(`${base}${SETTINGS_ENDPOINTS.defaultLocale}`);
}
