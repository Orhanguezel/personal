// =============================================================
// FILE: src/i18n/routes.ts
// DILE GORE URL — tek kaynak.
//
// Uygulamanin dosya sistemi rotalari INGILIZCE'dir (app/[locale]/services,
// /pricing, /work ...). Ziyaretcinin gordugu adres ise dile gore degisir:
//   /tr/hizmetler   -> app/[locale]/services
//   /de/leistungen  -> app/[locale]/services
//
// Mekanizma (next.config.mjs):
//   - REWRITE : yerellestirilmis yol  -> gercek (Ingilizce) rota. Kullanici
//               adresi gorur, Next dogru sayfayi render eder.
//   - REDIRECT: Ingilizce yol -> yerellestirilmis yol (308). Boylece tek
//               kanonik adres kalir, ayni icerik iki URL'den servis edilmez.
//
// Yeni bir rota yerellestirilecekse YALNIZCA bu tablo guncellenir; rewrite,
// redirect, sitemap ve menu ureticileri buradan besleniyor.
// =============================================================

// TEK KAYNAK: route-slugs.json — next.config.mjs de ayni dosyayi okur
// (config bir .ts dosyasini import edemedigi icin harita JSON'da tutuluyor).
import routeSlugs from './route-slugs.json';

export const ROUTE_SLUGS: Record<string, Record<string, string>> = routeSlugs;

/** Yerellestirilen rotalarin listesi (dosya sistemi adlari) */
export const LOCALIZED_ROUTES = Object.keys(ROUTE_SLUGS);

/** locale + gercek rota -> gorunen segment (eslesme yoksa rotanin kendisi) */
export function localizedSegment(locale: string, route: string): string {
  return ROUTE_SLUGS[route]?.[locale] ?? route;
}

/** locale + gorunen segment -> gercek rota (eslesme yoksa null) */
export function routeFromSegment(locale: string, segment: string): string | null {
  for (const [route, byLocale] of Object.entries(ROUTE_SLUGS)) {
    if (byLocale[locale] === segment) return route;
  }
  return null;
}

/** Herhangi bir dildeki gorunen segmenti dosya sistemi rotasina cevirir. */
export function routeFromAnySegment(segment: string): string | null {
  for (const [route, byLocale] of Object.entries(ROUTE_SLUGS)) {
    if (route === segment || Object.values(byLocale).includes(segment)) return route;
  }
  return null;
}

/**
 * DB'den eski veya fallback dilde gelen bir yolu hedef dile kanoniklestirir.
 * Ornek: localizeAnyPath('de', '/hizmetler/foo') -> '/leistungen/foo'
 */
export function localizeAnyPath(locale: string, path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (!clean) return '/';
  const [first, ...rest] = clean.split('/');
  const route = routeFromAnySegment(first) ?? first;
  return '/' + [localizedSegment(locale, route), ...rest].join('/');
}

/**
 * `/services/foo` gibi bir yolu locale'e gore yerellestirir:
 *   localizePath('tr', '/services/foo') -> '/hizmetler/foo'
 * Bilinmeyen rotalar oldugu gibi doner.
 */
export function localizePath(locale: string, path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  if (!clean) return '/';
  const [first, ...rest] = clean.split('/');
  const seg = localizedSegment(locale, first);
  return '/' + [seg, ...rest].join('/');
}
