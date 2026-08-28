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
  // Kategori listesi: hizmet ve portfolyo suzgecleri bunu okur. Statik dosyada
  // olmazsa suzgec SSR ciktisinda yer almaz ve sayfa yuklenince sonradan belirir.
  'content_categories',
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

function str(v) {
  return typeof v === 'string' ? v.trim() : '';
}

// company_brand -> gorunur KUNYE verisi.
// Meta/Facebook isletme dogrulamasi, TTK 39 ve 5651 s.K. resmi unvanin
// SITEDE GORUNUR olmasini ister; JSON-LD yeterli degildir. Deger yine
// DB'den gelir — kodda marka yazmaz (bkz. CLAUDE.md "MARKA KURALI").
function buildLegalEntity(raw) {
  const o = typeof raw === 'string' ? safeParse(raw) : raw;
  if (!o || typeof o !== 'object') return null;
  const legal = o.legal && typeof o.legal === 'object' ? o.legal : {};

  const entity = {
    name: str(o.name),
    shortName: str(o.short_name) || str(o.shortName),
    email: str(o.email),
    phone: str(o.phone),
    website: str(o.website),
    address: str(legal.adres) || str(legal.address),
    taxOffice: str(legal.vergi_dairesi) || str(legal.tax_office),
    taxNumber: str(legal.vergi_no) || str(legal.tax_number),
    mersis: str(legal.mersis),
    tradeRegistry: str(legal.ticaret_sicil) || str(legal.trade_registry),
    registerCourt: str(legal.register_court) || str(legal.handelsregister),
    vatId: str(legal.vat_id) || str(legal.ust_id),
    director: str(legal.mudur) || str(legal.director) || str(legal.sirket_muduru),
  };

  return Object.values(entity).some(Boolean) ? entity : null;
}

// Footer'daki yasal baglantilar: her deployment KENDI yayinlanmis sayfalarindan
// uretilir. Onceden slug'lar kodda sabitti (guezelwebdesign'in `policy` modulu)
// ve gzlteknoloji.com'da footer "Gizlilik Politikasi" bagi 404 veriyordu.
const LEGAL_MODULES = ['legal', 'policy'];
const CLEAN_ROUTE_SLUGS = new Set(['impressum']);

async function fetchLegalLinks(locale) {
  const out = [];
  for (const moduleKey of LEGAL_MODULES) {
    const url = `${API_BASE}/custom-pages?module_key=${moduleKey}&locale=${locale}&limit=50`;
    let rows;
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) continue;
      rows = await res.json();
    } catch {
      continue;
    }
    if (!Array.isArray(rows)) continue;

    for (const row of rows) {
      if (!row || row.is_published === 0 || row.is_published === false) continue;
      const slug = str(row.slug);
      const title = str(row.title);
      if (!slug || !title) continue;
      const href = CLEAN_ROUTE_SLUGS.has(slug)
        ? `/${locale}/${slug}`
        : `/${locale}/custompages/${moduleKey}/${slug}`;
      if (out.some((x) => x.href === href)) continue;
      out.push({ title, href, order: Number(row.display_order ?? 0) });
    }
  }
  out.sort((a, b) => a.order - b.order);
  return out.map(({ title, href }) => ({ title, href }));
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

  const legalEntity = buildLegalEntity(brandRows.company_brand);

  const legalLinks = {};
  for (const locale of locales) {
    const links = await fetchLegalLinks(locale);
    if (links.length) legalLinks[locale] = links;
  }

  const brand = {
    brandName: firstText(brandRows.brand_short_name, brandRows.brand_name, brandRows.company_brand, brandRows.site_title),
    logo: firstUrl(base.site_logo),
    favicon: firstUrl(base.site_favicon),
    appleTouchIcon: firstUrl(base.site_apple_touch_icon),
    ogDefault: firstUrl(base.site_og_default_image),
    home: home && typeof home === 'object' ? home : null,
    legalEntity,
    legalLinks,
  };

  fs.mkdirSync(path.dirname(BRAND_FILE), { recursive: true });
  fs.writeFileSync(BRAND_FILE, JSON.stringify(brand, null, 2) + '\n');
  const legalLinkCount = Object.values(legalLinks).reduce((n, arr) => n + arr.length, 0);
  console.log(
    `\n  config/brand.generated.json  marka: ${brand.brandName || '(bos)'} · logo: ${brand.logo || '(bos)'}` +
      ` · hero: ${brand.home ? 'var' : '(yok)'}` +
      ` · kunye: ${legalEntity?.name || '(yok)'}` +
      ` · yasal bag: ${legalLinkCount}`
  );
  if (!legalEntity || !(legalEntity.address || legalEntity.taxNumber || legalEntity.mersis || legalEntity.tradeRegistry || legalEntity.vatId)) {
    console.warn(
      '  UYARI: site_settings.company_brand icinde `legal` blogu yok — footer kunyesi BASILMAYACAK.\n' +
        '         Resmi unvanin sitede gorunur olmasi Meta isletme dogrulamasi ve TTK 39 icin gereklidir.'
    );
  }
} catch (err) {
  failed = true;
  console.error(`  marka varsayilanlari uretilemedi: ${err.message}`);
}

if (failed) {
  console.error('\nEn az bir locale uretilemedi. Build oncesi backend ayakta mi kontrol edin.');
  process.exit(1);
}
console.log('\nTamam.');
