#!/usr/bin/env node
// =============================================================
// generate-gzl-ui-sections.mjs
// -------------------------------------------------------------
// content/gzl/904_gzl_ui_sections.sql uretir.
//
//   node backend/scripts/generate-gzl-ui-sections.mjs
//
// NEDEN VAR:
//   GZL veritabaninda hizmetler/portfolyo/blog/markalar/yorumlar bolumlerinin
//   ARAYUZ METINLERI yoktu (ui_services, ui_project, ui_blog, ui_brands,
//   ui_testimonials, ui_coporation...). Bu bolumler bosluk/etiketsiz
//   goruntuleniyordu.
//
// YAKLASIM:
//   Bu anahtarlarin icerigi iki tur alan barindirir:
//     1) ARAYUZ ETIKETLERI — "Yukleniyor...", "Tumunu Gor", "3 dk okuma",
//        "Istemci", "Galeri" ... Bunlar markaya degil SABLONA aittir; iki
//        deployment icin de aynidir ve GWD surumunden devralinir.
//     2) MARKA/PAZARLAMA metinleri — basliklar, tanitim paragraflari, ornek
//        kartlar, yazar biyografisi. Bunlar GZL icin YENIDEN YAZILIR.
//
//   Asagidaki OVERRIDES tablosu tam olarak (2) numarali alanlari listeler.
//   Uretim sonunda cikti GWD izlerine karsi TARANIR (Grevenbroich, Guezel,
//   guezelwebdesign, Orhan, guezel-showcase, +168...) ve bir tanesi bile
//   kalirsa script HATA verip durur — sessiz marka sizintisi olmasin.
//
// KAYNAK: frontend/public/ui/<locale>.json (GWD surumu — sablon etiketleri)
// =============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '../..');
const UI_DIR = path.join(REPO, 'frontend/public/ui');
const OUT = path.join(REPO, 'backend/src/db/seed/content/gzl/904_gzl_ui_sections.sql');

const LOCALES = ['tr', 'en', 'de'];
const KEYS = ['ui_services', 'ui_project', 'ui_blog', 'ui_brands', 'ui_testimonials', 'ui_coporation', 'ui_skills', 'ui_resume'];

const LOGO = '/uploads/site-media/logo_transparent.png';

// ─────────────────────────────────────────────────────────────
// MARKA ALANLARI — yol -> locale bazli GZL metni
// ─────────────────────────────────────────────────────────────
const OVERRIDES = {
  ui_services: {
    'page.badge': { tr: 'Hizmetlerimiz', en: 'Our Services', de: 'Unsere Leistungen' },
    'page.title_html': {
      tr: 'İşinizi <span class="text-300">yazılımla</span> ölçülebilir biçimde ileri taşıyoruz',
      en: 'We move your business forward with <span class="text-300">software</span> that is measurable',
      de: 'Wir bringen Ihr Unternehmen mit <span class="text-300">Software</span> messbar voran',
    },
    'page.intro_html': {
      tr: 'Kurumsal web ve e-ticaretten ERP, CRM ve otomasyon panellerine kadar üretime hazır sistemler geliştiriyoruz. Her teklif; kapsamı, teslim süresini ve revizyon hakkını yazılı olarak içerir.',
      en: 'From corporate web and e-commerce to ERP, CRM and automation panels, we build production-ready systems. Every proposal states scope, delivery time and revision rights in writing.',
      de: 'Von Unternehmenswebsites und E-Commerce bis zu ERP-, CRM- und Automatisierungspanels bauen wir produktionsreife Systeme. Jedes Angebot nennt Umfang, Lieferzeit und Revisionsrechte schriftlich.',
    },
    'section1.heading': { tr: 'Hizmetlerimiz', en: 'Our Services', de: 'Unsere Leistungen' },
    'section1.intro_html': {
      tr: 'Özel yazılım, kurumsal web ve e-ticaret, otomasyon, yapay zekâ entegrasyonu ve GEO/SEO danışmanlığı.',
      en: 'Custom software, corporate web and e-commerce, automation, AI integration and GEO/SEO consulting.',
      de: 'Individuelle Software, Unternehmenswebsites und E-Commerce, Automatisierung, KI-Integration und GEO/SEO-Beratung.',
    },
    'section2.badge': { tr: 'Hizmetler', en: 'Services', de: 'Leistungen' },
    'section2.title_html': {
      tr: 'Ne <span class="text-300">yapıyoruz</span>',
      en: 'What we <span class="text-300">do</span>',
      de: 'Was wir <span class="text-300">tun</span>',
    },
    'section2.footer_text_html': {
      tr: 'Aradığınız hizmeti göremediniz mi?',
      en: 'Cannot find the service you need?',
      de: 'Die gesuchte Leistung nicht gefunden?',
    },
  },

  ui_project: {
    'projects1.heading': { tr: 'Son Projelerimiz', en: 'Our Latest Work', de: 'Unsere neuesten Projekte' },
    'projects1.intro_html': {
      tr: 'Tasarımdan canlıya almaya kadar aynı ekibin yürüttüğü, üretimde çalışan işler.',
      en: 'Work running in production, delivered end to end by the same team.',
      de: 'Projekte im Produktivbetrieb, vom Entwurf bis zum Livegang aus einer Hand.',
    },
    'projects2.badge': { tr: 'Projeler', en: 'Projects', de: 'Projekte' },
    'projects2.heading': { tr: 'Son Projelerimiz', en: 'Our Latest Work', de: 'Unsere neuesten Projekte' },
    'projects2.slide_title_html': {
      tr: 'Üretimde çalışan <span class="text-300">işler</span>',
      en: 'Work running in <span class="text-300">production</span>',
      de: 'Projekte im <span class="text-300">Produktivbetrieb</span>',
    },
    'projects2.slide_description': {
      tr: 'Kurumsal siteler, e-ticaret platformları ve SaaS panelleri.',
      en: 'Corporate sites, e-commerce platforms and SaaS panels.',
      de: 'Unternehmenswebsites, E-Commerce-Plattformen und SaaS-Panels.',
    },
    'projects2.sample_client': { tr: 'Ensotek', en: 'Ensotek', de: 'Ensotek' },
    'projects2.sample_completion': { tr: '2026', en: '2026', de: '2026' },
    'projects2.sample_technologies': {
      tr: 'Next.js, Fastify, MySQL',
      en: 'Next.js, Fastify, MySQL',
      de: 'Next.js, Fastify, MySQL',
    },
    'work.badge': { tr: 'Portfolyo', en: 'Portfolio', de: 'Portfolio' },
    'work.title_html': {
      tr: 'Kanıtlanabilir <span class="text-300">işler</span>',
      en: 'Verifiable <span class="text-300">work</span>',
      de: 'Nachweisbare <span class="text-300">Projekte</span>',
    },
    'work.intro_html': {
      tr: 'Portfolyomuzda 21 tamamlanmış proje yer alıyor; bir bölümü hâlâ canlıda çalışıyor.',
      en: 'Our portfolio holds 21 completed projects, several of them still live.',
      de: 'Unser Portfolio umfasst 21 abgeschlossene Projekte, mehrere davon weiterhin live.',
    },
  },

  ui_blog: {
    'blog1.heading': { tr: 'Blog', en: 'Blog', de: 'Blog' },
    'blog1.intro': {
      tr: 'Yazılım, otomasyon ve yapay zekâ aramaları üzerine notlarımız',
      en: 'Our notes on software, automation and AI search',
      de: 'Unsere Notizen zu Software, Automatisierung und KI-Suche',
    },
    'list.badge': { tr: 'Blog', en: 'Blog', de: 'Blog' },
    'list.title_html': {
      tr: 'Yazılım ve <span class="text-300">dijital dönüşüm</span> notları',
      en: 'Notes on software and <span class="text-300">digital transformation</span>',
      de: 'Notizen zu Software und <span class="text-300">digitaler Transformation</span>',
    },
    'list.intro_html': {
      tr: 'GEO/SEO, e-ticaret maliyetleri, iş otomasyonu ve yapay zekâ üzerine yazılar.',
      en: 'Articles on GEO/SEO, e-commerce costs, business automation and AI.',
      de: 'Artikel zu GEO/SEO, E-Commerce-Kosten, Prozessautomatisierung und KI.',
    },
    'blog2.badge': { tr: 'Son Yazılar', en: 'Latest Posts', de: 'Neueste Beiträge' },
    'blog2.heading': { tr: 'Blog', en: 'Blog', de: 'Blog' },
    'blog2.card1_category': { tr: 'GEO', en: 'GEO', de: 'GEO' },
    'blog2.card1_title': {
      tr: 'GEO nedir, neden önemli?',
      en: 'What is GEO and why does it matter?',
      de: 'Was ist GEO und warum ist es wichtig?',
    },
    'blog2.card1_description': {
      tr: 'Yapay zekâ aramalarında görünürlük.',
      en: 'Visibility in AI-powered search.',
      de: 'Sichtbarkeit in KI-gestützter Suche.',
    },
    'blog2.card2_category': { tr: 'E-ticaret', en: 'E-commerce', de: 'E-Commerce' },
    'blog2.card2_title': {
      tr: 'E-ticaret sitesi maliyeti',
      en: 'What an e-commerce site costs',
      de: 'Was eine E-Commerce-Website kostet',
    },
    'blog2.card2_description': {
      tr: 'Kalemler ve gerçekçi bütçe.',
      en: 'Line items and a realistic budget.',
      de: 'Posten und ein realistisches Budget.',
    },
    'blog2.card3_category': { tr: 'Otomasyon', en: 'Automation', de: 'Automatisierung' },
    'blog2.card3_title': {
      tr: 'Elle yapılan 5 iş',
      en: 'Five tasks still done by hand',
      de: 'Fünf Aufgaben, die noch manuell laufen',
    },
    'blog2.card3_description': {
      tr: 'Otomasyona uygun süreçler.',
      en: 'Processes ready for automation.',
      de: 'Prozesse, die sich automatisieren lassen.',
    },
    'detail.author_section_title': { tr: 'Yazar', en: 'Author', de: 'Autor' },
    'detail.author_bio_html': {
      tr: '<p>GZL Teknoloji — yazılım ve dijital danışmanlık şirketi.</p>',
      en: '<p>GZL Technology — software and digital consulting company.</p>',
      de: '<p>GZL Technologie — Software- und Digitalberatung.</p>',
    },
  },

  ui_brands: {
    heading: {
      tr: 'Çalıştığımız teknolojiler',
      en: 'Technologies we work with',
      de: 'Technologien, mit denen wir arbeiten',
    },
    intro_html: {
      tr: 'Projelerimizde kullandığımız üretim araçları ve platformlar.',
      en: 'The production tools and platforms we use across our projects.',
      de: 'Die Produktionswerkzeuge und Plattformen, die wir in unseren Projekten einsetzen.',
    },
  },

  ui_testimonials: {
    headline: { tr: 'Müşteri Yorumları', en: 'Client Reviews', de: 'Kundenbewertungen' },
    intro_line_1: {
      tr: 'Bionluk üzerindeki hizmet geçmişimizde',
      en: 'Our service record on Bionluk shows',
      de: 'Unsere Servicebilanz auf Bionluk zeigt',
    },
    intro_line_2: {
      tr: '16 tamamlanmış sipariş ve 4,50/5 değerlendirme puanı bulunuyor.',
      en: '16 completed orders and a 4.50/5 rating.',
      de: '16 abgeschlossene Bestellungen und eine Bewertung von 4,50/5.',
    },
    man_img: { tr: LOGO, en: LOGO, de: LOGO },
    decorate_img: { tr: '', en: '', de: '' },
  },


  // ui_skills / ui_resume — sablonda BIREYSEL dille yazilmis ("Yeteneklerim",
  // "Full-Stack Developer olarak ... gelistiriyorum"). GZL bir SIRKET; ayni
  // bolumler kurumsal dile cevrildi. (Bu anahtarlar GZL DB'sinde yoktu ve
  // panel/istemci 404 aliyordu.)
  ui_skills: {
    'skills1.heading': { tr: 'Uzmanlıklarımız', en: 'Our Expertise', de: 'Unsere Kompetenzen' },
    'skills1.intro_html': {
      tr: 'Kullandığımız teknolojiler ve üretim araçları.',
      en: 'The technologies and production tools we use.',
      de: 'Die Technologien und Werkzeuge, die wir einsetzen.',
    },
    'skills1.extra_intro': {
      tr: 'Ayrıca şu alanlarda çalışıyoruz:',
      en: 'We also work with:',
      de: 'Wir arbeiten ausserdem mit:',
    },
    'skills2.badge': { tr: 'Uzmanlıklar', en: 'Expertise', de: 'Kompetenzen' },
    'skills2.heading': { tr: 'Uzmanlıklarımız', en: 'Our Expertise', de: 'Unsere Kompetenzen' },
  },

  ui_resume: {
    'resume1.heading': { tr: 'Deneyimimiz', en: 'Our Experience', de: 'Unsere Erfahrung' },
    'resume1.intro_html': {
      tr: 'Kurumsal web ve e-ticaret, ERP/CRM panelleri, otomasyon ve yapay zekâ entegrasyonu alanlarında üretime alınmış işler.',
      en: 'Work delivered to production across corporate web and e-commerce, ERP/CRM panels, automation and AI integration.',
      de: 'In den Produktivbetrieb gebrachte Projekte in Unternehmenswebsites und E-Commerce, ERP/CRM-Panels, Automatisierung und KI-Integration.',
    },
    'resume1.cta_label': { tr: 'İletişime geçin', en: 'Get in touch', de: 'Kontakt aufnehmen' },
    'resume1.marquee_text': {
      tr: 'Next.js . Fastify . MySQL . Drizzle',
      en: 'Next.js . Fastify . MySQL . Drizzle',
      de: 'Next.js . Fastify . MySQL . Drizzle',
    },
  },
  ui_coporation: {
    badge: { tr: 'İş Birliği', en: 'Collaboration', de: 'Zusammenarbeit' },
    heading_html: {
      tr: '<span class="text-300">21 tamamlanmış proje</span><br /> teslim edildi_',
      en: '<span class="text-300">21 completed projects</span><br /> delivered_',
      de: '<span class="text-300">21 abgeschlossene Projekte</span><br /> geliefert_',
    },
    'contact.avatar': { tr: LOGO, en: LOGO, de: LOGO },
    'contact.avatar_alt': { tr: 'GZL Teknoloji', en: 'GZL Technology', de: 'GZL Technologie' },
    'contact.email_value': {
      tr: 'info@gzlteknoloji.com',
      en: 'info@gzlteknoloji.com',
      de: 'info@gzlteknoloji.com',
    },
    'contact.email_href': {
      tr: 'mailto:info@gzlteknoloji.com',
      en: 'mailto:info@gzlteknoloji.com',
      de: 'mailto:info@gzlteknoloji.com',
    },
    // GZL'nin yayina acik telefon numarasi yok; sablondaki Alman yer tutucusu
    // (tel:+49...) temizleniyor. Numara belirlenince buradan doldurulur.
    'contact.phone_value': { tr: '', en: '', de: '' },
    'contact.phone_href': { tr: '', en: '', de: '' },
    'contact.skype_value': { tr: '', en: '', de: '' },
    'contact.skype_href': { tr: '', en: '', de: '' },
  },
};

// GWD izleri — cikti bunlardan birini icerirse script durur
const LEAK_PATTERNS = [
  /Grevenbroich/i,
  /Guezel/i,
  /guezelwebdesign/i,
  /Orhan/i,
  /guezel-showcase/i,
  /guezel_web_design/i,
  /\+49/,
  /orhanguzell/i,
  /168/,
];

function setPath(obj, dotted, value) {
  const parts = dotted.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== 'object' || cur[parts[i]] === null) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = value;
}

function scan(value, trail, leaks) {
  if (typeof value === 'string') {
    for (const re of LEAK_PATTERNS) {
      if (re.test(value)) leaks.push(`${trail}: ${value.slice(0, 90)}`);
    }
    return;
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) scan(v, `${trail}.${k}`, leaks);
  }
}

function sqlStr(v) {
  const raw = typeof v === 'string' ? v : JSON.stringify(v);
  // MySQL: once ters bolu, sonra tek tirnak (bkz. diger seed uretecileri)
  return "'" + raw.replace(/\\/g, '\\\\').replace(/'/g, "''") + "'";
}

const detId = (key, locale) =>
  (() => {
    const h = crypto.createHash('sha1').update(`gzl-ui-section:${key}:${locale}`).digest('hex');
    return [h.slice(0, 8), h.slice(8, 12), '4' + h.slice(13, 16), '8' + h.slice(17, 20), h.slice(20, 32)].join('-');
  })();

const rows = [];
const leaks = [];

for (const locale of LOCALES) {
  const file = path.join(UI_DIR, `${locale}.json`);
  if (!fs.existsSync(file)) {
    console.error(`HATA: ${file} yok — sablon etiketleri buradan aliniyor.`);
    process.exit(1);
  }
  const src = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const key of KEYS) {
    if (!src[key]) {
      console.warn(`  uyari: ${locale}.json icinde ${key} yok, atlandi`);
      continue;
    }
    const value = JSON.parse(JSON.stringify(src[key]));
    const over = OVERRIDES[key] ?? {};
    for (const [dotted, byLocale] of Object.entries(over)) {
      if (byLocale[locale] === undefined) continue;
      setPath(value, dotted, byLocale[locale]);
    }
    scan(value, `${locale}/${key}`, leaks);
    rows.push({ key, locale, value });
  }
}

if (leaks.length) {
  console.error(`\nMARKA SIZINTISI — ${leaks.length} alan hala GWD verisi tasiyor:\n`);
  for (const l of leaks.slice(0, 40)) console.error('  ' + l);
  console.error('\nOVERRIDES tablosuna bu alanlari ekleyin. Dosya YAZILMADI.');
  process.exit(1);
}

const header = `-- =============================================================
-- FILE: content/gzl/904_gzl_ui_sections.sql
-- OTOMATIK URETILDI — backend/scripts/generate-gzl-ui-sections.mjs
--
-- Hizmetler / portfolyo / blog / markalar / yorumlar / is birligi
-- bolumlerinin ARAYUZ METINLERI (tr, en, de).
--
-- Sablon etiketleri ("Yukleniyor...", "Tumunu Gor", "3 dk okuma") GWD
-- surumunden devralindi — bunlar markaya degil sablona ait.
-- Baslik/tanitim/ornek kart gibi MARKA metinleri GZL icin yeniden yazildi.
-- Uretim sonunda cikti GWD izlerine karsi taranir; sizinti varsa script
-- dosyayi YAZMAZ.
--
-- Yeniden uretmek icin:
--   node backend/scripts/generate-gzl-ui-sections.mjs
-- =============================================================

SET NAMES utf8mb4;
`;

const body = rows
  .map(
    (r) =>
      'INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES\n' +
      `  ('${detId(r.key, r.locale)}', '${r.key}', '${r.locale}', ${sqlStr(r.value)})\n` +
      'ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);\n',
  )
  .join('\n');

fs.writeFileSync(OUT, header + '\n' + body);
console.log(`yazildi: ${path.relative(REPO, OUT)}`);
console.log(`  ${rows.length} satir (${KEYS.length} anahtar x ${LOCALES.length} locale)`);
console.log('  GWD izi taramasi: temiz');
