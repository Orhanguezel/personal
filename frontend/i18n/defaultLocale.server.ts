// =============================================================
// FILE: src/i18n/defaultLocale.server.ts
// FINAL — server-side default locale resolver (DB-backed, tolerant)
// - Uses settingsApi.server base (env or request-origin fallback)
// - Hits META endpoint: GET /site_settings/default-locale
// =============================================================

import { normLocaleTag } from '@/i18n/localeUtils';
import { FALLBACK_LOCALE } from '@/i18n/config';
import { unwrapData } from '@/i18n/settingsApi.shared';
import { getApiBaseServer } from '@/i18n/settingsApi.server';

const DEFAULT_LOCALE_FALLBACK = normLocaleTag(FALLBACK_LOCALE) || 'de';

async function fetchDefaultLocaleMeta(): Promise<any | null> {
  const base = await getApiBaseServer();
  if (!base) return null;

  try {
    const res = await fetch(`${base}/site_settings/default-locale`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    // DİKKAT: bu uç nokta `text/plain` döner (gövde: `tr`), JSON değil.
    // Eskiden burada doğrudan res.json() çağrılıyordu; düz metinde bu hata
    // fırlatıyor, catch yutuyor ve fonksiyon SESSİZCE sabit FALLBACK_LOCALE'e
    // düşüyordu. guezelwebdesign'da fark edilmedi çünkü fallback ('de') zaten
    // onun varsayılanı; gzlteknoloji.com (varsayılan 'tr') ilk açılışta kökten
    // /de'ye yönlendirdi. Artık her iki biçim de kabul ediliyor.
    const text = (await res.text()).trim();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}

export async function getDefaultLocaleServer(): Promise<string> {
  const raw = await fetchDefaultLocaleMeta();
  const v = unwrapData(raw);

  // tolerate: "de" OR {key,value:"de"} OR {data:{value:"de"}} etc.
  const cand =
    typeof v === 'string'
      ? v
      : v && typeof v === 'object' && typeof (v as any).value === 'string'
        ? (v as any).value
        : '';

  return normLocaleTag(cand) || DEFAULT_LOCALE_FALLBACK;
}
