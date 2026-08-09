#!/usr/bin/env node
// =============================================================
// generate-ui-settings.mjs
// -------------------------------------------------------------
// `public/ui/<locale>.json` dosyalarini DEPLOYMENT'IN KENDI veritabanindan
// (API uzerinden) uretir.
//
//   bun run ui:generate            # NEXT_PUBLIC_API_URL'i kullanir
//   API_BASE=... bun run ui:generate
//
// NEDEN VAR (2026-08-08):
//   Bu dosyalar repoya ELLE eklenmis 39 KB'lik anlik goruntulerdi (10 Haziran)
//   ve Guezel Web Design'in marka verisini tasiyordu: logo, favicon, Alman
//   telefon numarasi, "Grevenbroich merkezli" metinler. Ayni kod tabani artik
//   gzlteknoloji.com'u da sundugu icin bu dosyalar TR sitede yanlis markayi
//   gosteriyordu (logo GWD logosu, hero "ben Orhan Guzel ... Grevenbroich").
//
//   Istemci tarafi bilesenler (SiteLogo, OffCanvas, Contact...) bu JSON'u
//   `/ui/<locale>.json` adresinden okur. Dolayisiyla her deployment kendi
//   JSON'unu URETMELIDIR.
//
// KURAL — SIZINTI YOK:
//   DB'de olmayan anahtar cikti dosyasina YAZILMAZ. Eksik anahtari baska bir
//   markanin degeriyle doldurmak, tam da duzeltmeye calistigimiz hatadir.
//   Anahtar eksikse bilesenler kendi notr varsayilanina duser ve script bunu
//   RAPORLAR — boylece hangi icerigin yazilmasi gerektigi gorunur olur.
// =============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../public/ui');

/** Istemci bilesenlerinin `/ui/<locale>.json` icinden okudugu anahtarlar */
const KEYS = [
  'contact_info',
  'contact_section',
  'offer_pdf_labels',
  'site_app_icon_512',
  'site_apple_touch_icon',
  'site_favicon',
  'site_logo',
  'site_logo_dark',
  'site_logo_light',
  'site_og_default_image',
  'ui_admin',
  'ui_blog',
  'ui_brands',
  'ui_coporation',
  'ui_home',
  'ui_home3',
  'ui_project',
  'ui_resume',
  'ui_services',
  'ui_skills',
  'ui_static',
  'ui_testimonials',
];

const API_BASE = (
  process.env.API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  ''
).replace(/\/+$/, '');

if (!API_BASE) {
  console.error(
    'HATA: API adresi yok. NEXT_PUBLIC_API_URL veya API_BASE tanimlayin.\n' +
      "  ornek: API_BASE=https://gzlteknoloji.com/api/v1 bun run ui:generate"
  );
  process.exit(1);
}

async function fetchLocale(locale) {
  const url = `${API_BASE}/site_settings?keys=${KEYS.join(',')}&locale=${locale}&limit=200`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${locale}: site_settings ${res.status}`);
  const rows = await res.json();
  if (!Array.isArray(rows)) throw new Error(`${locale}: beklenmeyen yanit sekli`);

  // Locale'e ozel satir global ('*') satiri EZER.
  const out = {};
  for (const row of rows) {
    if (!row || typeof row.key !== 'string') continue;
    if (!KEYS.includes(row.key)) continue;
    const isGlobal = row.locale === '*';
    if (isGlobal && out[row.key] !== undefined) continue;
    if (!isGlobal || out[row.key] === undefined) out[row.key] = row.value;
  }
  return out;
}

const locales = (process.env.UI_LOCALES || 'tr,en,de')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

fs.mkdirSync(OUT_DIR, { recursive: true });

let failed = false;
console.log(`UI ayarlari uretiliyor — kaynak: ${API_BASE}\n`);

for (const locale of locales) {
  try {
    const data = await fetchLocale(locale);
    const present = Object.keys(data).sort();
    const missing = KEYS.filter((k) => !(k in data));

    const file = path.join(OUT_DIR, `${locale}.json`);
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');

    console.log(`  ${locale}.json  ${present.length}/${KEYS.length} anahtar yazildi`);
    if (missing.length) {
      console.log(`      DB'de YOK (bilesenler varsayilana duser): ${missing.join(', ')}`);
    }
  } catch (err) {
    failed = true;
    console.error(`  ${locale}: HATA — ${err.message}`);
  }
}

// ── SSR icin marka varsayilanlari ────────────────────────────────────────────
// `/ui/<locale>.json` istemci tarafinda fetch edilir; dolayisiyla SUNUCUDA
// uretilen HTML'de logo/marka adi HENUZ bilinmez ve bilesenler koddaki sabit
// fallback'i basar. Iki markali kurulumda bu, TR sitenin SSR ciktisinda
// "Guezel Web Design" ve GWD logosu gorunmesi demekti (SEO ve ilk boyama icin
// yanlis). Bu yuzden marka varsayilanlarini BUILD ZAMANINDA bir modul olarak
// da yaziyoruz; siteAssets.ts bunu import eder.
const BRAND_FILE = path.resolve(__dirname, '../config/brand.generated.json');

function firstUrl(...vals) {
  for (const v of vals) {
    if (!v) continue;
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (typeof v === 'object' && typeof v.url === 'string' && v.url.trim()) return v.url.trim();
  }
  return '';
}

function safeParse(v) {
  try { return JSON.parse(v); } catch { return null; }
}

function firstText(...vals) {
  for (const v of vals) {
    if (typeof v === 'string' && v.trim()) return v.trim();
    if (v && typeof v === 'object') {
      for (const k of ['short_name', 'shortName', 'name']) {
        if (typeof v[k] === 'string' && v[k].trim()) return v[k].trim();
      }
    }
  }
  return '';
}

try {
  const base = await fetchLocale(locales[0]);
  const brandRows = await (async () => {
    const keys = ['brand_name', 'brand_short_name', 'company_brand', 'site_title'];
    const url = `${API_BASE}/site_settings?keys=${keys.join(',')}&limit=50`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return {};
    const rows = await res.json();
    const out = {};
    if (Array.isArray(rows)) for (const r of rows) if (r?.key && out[r.key] === undefined) out[r.key] = r.value;
    return out;
  })();

  // ui_home da buraya yazilir: hero metni istemci tarafinda doldurulduğu icin
  // SSR ciktisinda koddaki sabit varsayilanlar gorunuyordu — bunlar Guezel Web
  // Design'a ait Ingilizce metinlerdi ("Founder of Guezel Web Design ...") ve
  // gzlteknoloji.com'un ilk boyamasinda/kaynak kodunda cikiyordu.
  const homeRaw = base.ui_home;
  const home = typeof homeRaw === 'string' ? safeParse(homeRaw) : homeRaw;

  const brand = {
    brandName: firstText(brandRows.brand_short_name, brandRows.brand_name, brandRows.company_brand, brandRows.site_title),
    logo: firstUrl(base.site_logo),
    favicon: firstUrl(base.site_favicon),
    appleTouchIcon: firstUrl(base.site_apple_touch_icon),
    ogDefault: firstUrl(base.site_og_default_image),
    home: home && typeof home === 'object' ? home : null,
  };

  fs.mkdirSync(path.dirname(BRAND_FILE), { recursive: true });
  fs.writeFileSync(BRAND_FILE, JSON.stringify(brand, null, 2) + '\n');
  console.log(
    `\n  config/brand.generated.json  marka: ${brand.brandName || '(bos)'} · logo: ${brand.logo || '(bos)'}` +
      ` · hero: ${brand.home ? 'var' : '(yok)'}`
  );
} catch (err) {
  failed = true;
  console.error(`  marka varsayilanlari uretilemedi: ${err.message}`);
}

if (failed) {
  console.error('\nEn az bir locale uretilemedi. Build oncesi backend ayakta mi kontrol edin.');
  process.exit(1);
}
console.log('\nTamam.');
