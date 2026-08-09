// =============================================================
// FILE: backend/scripts/gzl-taxonomy.mjs
//
// KATEGORI VE ILISKI DUZENI — tek kaynak
//
// KAVRAMLAR (karismasin diye acikca yaziliyor):
//
//   HIZMET  : satisa sunulan is. "Ne yapiyoruz."           -> services
//   PROJE   : o isi kimin icin yaptigimiz, referans/vaka.  -> projects
//   KATEGORI: ikisini birbirine baglayan ORTAK sinif.      -> tek liste
//
//   Bir hizmetin kategorisi geneldir ("Web ve E-Ticaret"); o kategoride
//   TAMAMLANMIS isler ise ayri kayitlardir (projeler). Hizmet sayfasinda
//   "bu kategoride yaptigimiz projeler" bolumu bu iliskiden uretilir.
//
//   `projects.services` alani BU ILISKI DEGILDIR: orada projede teslim edilen
//   is kalemleri yazar ("Frontend Gelistirme", "Admin Panel"). Kavram karismasin
//   diye arayuzde adi "Kapsam" olarak gecer.
//
// NE URETIR:
//   content/gzl/909_gzl_taxonomy.sql
//     1) site_settings.content_categories  (tr/en/de etiketleri — tek kanal)
//     2) services.type      -> kategori slug
//     3) projects.category  -> ayni slug kumesi
//     4) YINELENEN proje kayitlarinin temizligi (asagida gerekcesiyle)
//
// CALISTIRMA: bun scripts/gzl-taxonomy.mjs
// =============================================================

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../src/db/seed/content/gzl/909_gzl_taxonomy.sql');

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

/** Hem hizmetleri hem projeleri siniflandiran TEK liste. */
export const CATEGORIES = [
  {
    slug: 'web-ecommerce',
    order: 1,
    tr: { label: 'Web ve E-Ticaret', desc: 'Kurumsal siteler, e-ticaret, randevu ve sipariş sistemleri.' },
    en: { label: 'Web & E-Commerce', desc: 'Corporate sites, e-commerce, booking and ordering systems.' },
    de: { label: 'Web & E-Commerce', desc: 'Unternehmensseiten, E-Commerce, Buchungs- und Bestellsysteme.' },
  },
  {
    slug: 'custom-software',
    order: 2,
    tr: { label: 'Özel Yazılım ve ERP', desc: 'İş süreçlerine özgü web uygulamaları, ERP ve yönetim panelleri.' },
    en: { label: 'Custom Software & ERP', desc: 'Process-specific web applications, ERP and management panels.' },
    de: { label: 'Individualsoftware & ERP', desc: 'Prozessspezifische Webanwendungen, ERP und Verwaltungspanels.' },
  },
  {
    slug: 'data-automation',
    order: 3,
    tr: { label: 'Veri, Otomasyon ve Yapay Zekâ', desc: 'Veri toplama, tahmin modelleri ve otomasyon panelleri.' },
    en: { label: 'Data, Automation & AI', desc: 'Data collection, prediction models and automation panels.' },
    de: { label: 'Daten, Automatisierung & KI', desc: 'Datenerfassung, Prognosemodelle und Automatisierungspanels.' },
  },
  {
    slug: 'seo-geo',
    order: 4,
    tr: { label: 'SEO, GEO ve Ölçümleme', desc: 'Arama motoru ve yapay zekâ görünürlüğü, analitik kurulumu.' },
    en: { label: 'SEO, GEO & Analytics', desc: 'Search and AI visibility, analytics and conversion tracking.' },
    de: { label: 'SEO, GEO & Analytics', desc: 'Sichtbarkeit in Suche und KI, Analytics und Conversion-Tracking.' },
  },
  {
    slug: 'infra-support',
    order: 5,
    tr: { label: 'Altyapı ve Bakım', desc: 'Sunucu kurulumu, yayına alma, izleme ve sürekli bakım.' },
    en: { label: 'Infrastructure & Support', desc: 'Server setup, deployment, monitoring and ongoing maintenance.' },
    de: { label: 'Infrastruktur & Wartung', desc: 'Servereinrichtung, Deployment, Monitoring und laufende Wartung.' },
  },
];

/** Hizmet slug -> kategori */
export const SERVICE_CATEGORY = {
  'kurumsal-web-sitesi': 'web-ecommerce',
  'randevu-sistemli-kurumsal-site': 'web-ecommerce',
  'e-ticaret-sitesi': 'web-ecommerce',
  'modern-e-ticaret-sitesi': 'web-ecommerce',
  'online-siparis-sistemi': 'web-ecommerce',
  'emlak-ilan-sitesi': 'web-ecommerce',

  'firmaya-ozel-erp-yazilimi': 'custom-software',
  'osgb-isletme-yonetim-sistemi': 'custom-software',
  'ozel-yazilim-nextjs-fastify': 'custom-software',
  'teklif-raporlama-web-sayfasi': 'custom-software',

  'lead-bulma-rakip-takip-paneli': 'data-automation',
  'sosyal-medya-otomasyon-paneli': 'data-automation',
  'ai-ml-veri-tahmin-platformu': 'data-automation',
  'amazon-fiyat-scraping-sistemi': 'data-automation',
  'google-maps-veri-cekme-botu': 'data-automation',

  'geo-seo-lighthouse-analizi': 'seo-geo',
  'yapay-zeka-arama-optimizasyonu-geo': 'seo-geo',
  'seo-hizmeti': 'seo-geo',
  'ga4-gtm-donusum-izleme': 'seo-geo',

  'ubuntu-vps-kurulum-yayinlama': 'infra-support',
  'bakim-destek': 'infra-support',
};

/** Proje slug -> kategori (yinelenenler ayiklandiktan sonraki liste) */
export const PROJECT_CATEGORY = {
  'antalya-doner-qr-menu-online-siparis-next-js': 'web-ecommerce',
  'bereket-fide-kurumsal-web-sitesi-urun-katalogu': 'web-ecommerce',
  'gzlteknoloji': 'web-ecommerce',
  kamanilan: 'web-ecommerce',
  'konig-energetik-randevulu-masaj-wellness-sitesi': 'web-ecommerce',
  'miss-et-balik': 'web-ecommerce',
  'sportoonline-spor-outdoor-e-ticaret-platformu': 'web-ecommerce',
  'vista-insaat-kurumsal-web-sitesi-admin-paneli': 'web-ecommerce',

  'ensotek-multi-tenant-b2b-saas-metahub': 'custom-software',
  'gzl-temizlik': 'custom-software',
  'paspas-erp-uretim-ve-operasyon-yonetim-sistemi': 'custom-software',

  'amozon-amazon-ticari-radar-ai-karar-motoru': 'data-automation',
  'genomai-genomik-tahmin-ai-bitki-islahi-platformu': 'data-automation',
  'marketpulse-bayi-rakip-pazar-izleme-saas-platformu': 'data-automation',
  'socialpulse-sosyal-medya-yonetim-otomasyon-platformu': 'data-automation',

  'cok-dilli-b2b-sitesi-geo-seo-lighthouse-analizi': 'seo-geo',
  'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu': 'seo-geo',
  'trackpulse-web-analitik-donusum-izleme-platformu': 'seo-geo',
  'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu': 'seo-geo',
};

/**
 * YINELENEN PROJE KAYITLARI
 *
 * Portfolyo iki ayri kaynaktan birlestirildigi icin (eski seed + Bionluk
 * ilanlari) ayni is birden fazla kayit olmus. Ayni isi anlatan iki sayfa
 * arama motorlarinda birbirini yiyor (icerik yamyamligi) ve ziyaretciye de
 * ayni referansi iki kez gosteriyor.
 *
 * `keep` kalan kayit, `drop` silinecek olan(lar). Silinen kaydin varsa
 * `website_url` degeri kalan kayda tasinir; slug'i icin 308 yonlendirme
 * frontend/next.config.mjs icine eklenir (adres olu kalmasin).
 */
export const PROJECT_MERGES = [
  {
    keep: 'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu',
    drop: ['geoserra'],
    why: 'Ikisi de GeoSerra platformu; kisa kayit 415 karakterlik eski seed metni.',
    website: 'https://geoserra.com',
  },
  {
    keep: 'konig-energetik-randevulu-masaj-wellness-sitesi',
    drop: ['konig-massage', 'konigs-massage-multi-tenant-randevu-platformu-metahub'],
    why: 'Uc kayit da ayni musterinin (Königs Massage) ayni randevu platformu.',
    website: 'https://energetische-massage-bonn.de',
  },
  {
    keep: 'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu',
    drop: ['wiribu-de-lighthouse-100-100-geo-optimizasyonu'],
    why: 'Ayni calismanin iki kez yazilmis hali; metinler neredeyse ayni.',
    website: 'https://wiribu.de',
  },
];

function categoriesSettingValue(locale) {
  return JSON.stringify({
    items: CATEGORIES.map((c) => ({
      slug: c.slug,
      label: c[locale].label,
      description: c[locale].desc,
      order: c.order,
    })),
  });
}

function main() {
  const out = [];

  out.push(`-- =============================================================
-- FILE: content/gzl/909_gzl_taxonomy.sql
-- URETILDI: scripts/gzl-taxonomy.mjs  (@generated gzl-taxonomy)
--
-- ELLE DUZENLEME. Degisiklik gerekiyorsa script guncellenip yeniden calistirilir.
--
-- Hizmet ve projeler AYNI kategori listesini kullanir; hizmet sayfasindaki
-- "bu kategoride yaptigimiz projeler" bolumu bu eslesmeden uretilir.
-- =============================================================

SET NAMES utf8mb4;

-- 1) Kategori listesi — etiketlerin TEK kaynagi (panelden duzenlenebilir)`);

  for (const [i, locale] of ['tr', 'en', 'de'].entries()) {
    out.push(`
INSERT INTO \`site_settings\` (\`id\`, \`key\`, \`locale\`, \`value\`)
VALUES ('19000000-0000-4000-8000-00000000090${i + 1}', 'content_categories', '${locale}', ${q(categoriesSettingValue(locale))})
ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`), \`updated_at\` = CURRENT_TIMESTAMP(3);`);
  }

  out.push(`
-- 2) Yinelenen proje kayitlari: once website_url tasinir, sonra silinir.`);
  for (const m of PROJECT_MERGES) {
    out.push(`
-- ${m.why}`);
    if (m.website) {
      out.push(`UPDATE \`projects\` p
  JOIN \`projects_i18n\` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.\`website_url\` = ${q(m.website)}, p.\`updated_at\` = CURRENT_TIMESTAMP(3)
  WHERE i.slug = ${q(m.keep)};`);
    }
    for (const slug of m.drop) {
      out.push(`DELETE p FROM \`projects\` p
  JOIN \`projects_i18n\` i ON i.project_id = p.id
  WHERE i.slug = ${q(slug)};`);
    }
  }

  out.push(`
-- 3) Hizmet kategorileri`);
  const byCategory = new Map();
  for (const [slug, cat] of Object.entries(SERVICE_CATEGORY)) {
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(slug);
  }
  for (const [cat, slugs] of byCategory) {
    out.push(`UPDATE \`services\` s
  JOIN \`services_i18n\` i ON i.service_id = s.id AND i.locale = 'tr'
  SET s.\`type\` = ${q(cat)}, s.\`updated_at\` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN (${slugs.map(q).join(', ')});`);
  }

  out.push(`
-- 4) Proje kategorileri`);
  const projByCategory = new Map();
  for (const [slug, cat] of Object.entries(PROJECT_CATEGORY)) {
    if (!projByCategory.has(cat)) projByCategory.set(cat, []);
    projByCategory.get(cat).push(slug);
  }
  for (const [cat, slugs] of projByCategory) {
    out.push(`UPDATE \`projects\` p
  JOIN \`projects_i18n\` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.\`category\` = ${q(cat)}, p.\`updated_at\` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN (${slugs.map(q).join(', ')});`);
  }

  writeFileSync(OUT, out.join('\n') + '\n', 'utf8');

  const dropped = PROJECT_MERGES.flatMap((m) => m.drop);
  console.log(`Yazildi: ${OUT}`);
  console.log(`Kategori: ${CATEGORIES.length}`);
  console.log(`Hizmet: ${Object.keys(SERVICE_CATEGORY).length}`);
  console.log(`Proje: ${Object.keys(PROJECT_CATEGORY).length} (silinen ${dropped.length}: ${dropped.join(', ')})`);
}

if (import.meta.main) main();
