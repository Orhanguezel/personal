// =============================================================
// FILE: src/i18n/settingsApi.server.ts
// FINAL — server settings fetchers (App Router safe)
// - Uses the central API base resolver
// =============================================================

import { resolveBaseUrl } from '@/integrations/apiBase';
import { SETTINGS_ENDPOINTS, fetchJson } from './settingsApi.shared';

/**
 * Server base:
 * - Prefer API_BASE_URL / NEXT_PUBLIC_API_* if set
 * - Else: central resolver fallback
 */
export async function getApiBaseServer(): Promise<string> {
  return resolveBaseUrl();
}

export async function fetchAppLocalesRawServer(): Promise<any> {
  const base = await getApiBaseServer();
  if (!base) return null;
  return fetchJson<any>(`${base}${SETTINGS_ENDPOINTS.appLocales}`);
}

export async function fetchDefaultLocaleRawServer(): Promise<any> {
  const base = await getApiBaseServer();
  if (!base) return null;
  return fetchJson<any>(`${base}${SETTINGS_ENDPOINTS.defaultLocale}`);
}
