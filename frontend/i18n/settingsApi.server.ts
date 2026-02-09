// =============================================================
// FILE: src/i18n/settingsApi.server.ts
// FINAL — server settings fetchers (App Router safe)
// - Uses env if available
// - Else falls back to request origin via next/headers
// =============================================================

import { headers } from 'next/headers';
import { SETTINGS_ENDPOINTS, fetchJson, stripTrailingSlash } from './settingsApi.shared';

function withApiSuffix(base: string) {
  const b = stripTrailingSlash(base);
  if (!b) return '';
  return /\/api$/i.test(b) ? b : `${b}/api`;
}

async function getRequestOrigin(): Promise<string> {
  // Works behind proxies too (host header)
  const h = await headers();

  const xfProto = h.get('x-forwarded-proto');
  const proto = (xfProto || 'https').split(',')[0]!.trim();

  const xfHost = h.get('x-forwarded-host');
  const host = (xfHost || h.get('host') || '').split(',')[0]!.trim();

  if (!host) return '';
  return `${proto}://${host}`;
}

/**
 * Server base:
 * - Prefer API_BASE_URL / NEXT_PUBLIC_API_* if set
 * - Else fall back to request origin + "/api"
 */
export async function getApiBaseServer(): Promise<string> {
  const raw =
    (process.env.API_BASE_URL || '').trim() ||
    (process.env.NEXT_PUBLIC_API_BASE_URL || '').trim() ||
    (process.env.NEXT_PUBLIC_API_URL || '').trim();

  if (raw) return withApiSuffix(raw);

  const origin = await getRequestOrigin();
  if (!origin) return '';
  return withApiSuffix(origin);
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
