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

/**
 * TEK bir site_settings anahtarini sunucu tarafinda okur — TOLERANSLI.
 *
 * `fetchSiteSettingsStrict` eksik anahtarda HATA firlatir; marka icerigi icin
 * bu yanlis davranistir: bir deployment'ta olmayan icerik, o bolumun hic
 * gorunmemesi demektir, sayfanin 500 vermesi degil.
 *
 * Deger bulunamazsa `null` doner. Locale'e ozel satir yoksa global ('*')
 * satirina duser.
 */
export async function getSiteSettingServer<T = unknown>(
  key: string,
  locale?: string,
): Promise<T | null> {
  const base = await getApiBaseServer();
  if (!base) return null;

  // DIKKAT: bu uc nokta `keys` ve `limit` parametrelerini guvenilir sekilde
  // uygulamiyor (kucuk limit verildiginde de tum satir kumesini donebiliyor,
  // buyuk limit istenmedikce aranan anahtar listeye girmeyebiliyor).
  // Bu yuzden genis bir limit isteyip filtrelemeyi burada yapiyoruz.
  const qs = new URLSearchParams({ keys: key, limit: '500' });
  if (locale) qs.set('locale', locale);

  try {
    const rows = await fetchJson<any>(`${base}/site_settings?${qs.toString()}`);
    if (!Array.isArray(rows)) return null;

    const match =
      rows.find((r) => r?.key === key && r?.locale === locale) ??
      rows.find((r) => r?.key === key && r?.locale === '*') ??
      rows.find((r) => r?.key === key);

    return (match?.value ?? null) as T | null;
  } catch {
    return null;
  }
}
