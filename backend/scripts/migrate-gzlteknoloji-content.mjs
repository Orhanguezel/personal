#!/usr/bin/env node
// =============================================================
// migrate-gzlteknoloji-content.mjs — Migrasyon Faz 1
// -------------------------------------------------------------
// Emekliye ayrilan gzlteknoloji reposunun seed SQL'lerini okur ve
// guezelwebdesign semasina uygun `content/gzl/*.sql` seed'lerini URETIR.
//
//   bun run migrate:gzl            # uret
//   bun run migrate:gzl -- --dry   # sadece rapor, dosya yazma
//
// TEKRAR CALISTIRILABILIR: cikti dizini her calistirmada bastan uretilir.
// Ciktilar ELLE DUZENLENMEZ — kural degisikligi bu dosyaya yazilir.
//
// Kaynak (salt-okunur):  _migration/gzlteknoloji/content-seeds/sql/
// Hedef:                 backend/src/db/seed/content/gzl/
//
// NASIL CALISIR
//   1. Hedef semadaki tablolar backend/src/db/seed/sql/*.sql'den okunur.
//   2. FILE_PLAN'a gore kaynak dosyalar secilir (her atlama GEREKCELI).
//   3. Deyim duzeyi filtre: hedef semada OLMAYAN bir tabloya yazan her deyim
//      dusurulur ve raporlanir (orn. home_sections, service_packages,
//      testimonials — bunlar GWD modeline elle eslenecek, plan madde 3/6/12).
//   4. Satir duzeyi kuratorluk: EN stub cevirileri, sahte bionluk projeleri,
//      bozuk basliklar temizlenir.
//   5. Cikti dosyalari kaynak sirasi korunarak yazilir (polish UPDATE'leri
//      taban INSERT'lerden sonra calismali).
// =============================================================

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, '../..');
const SRC_DIR = path.join(REPO, '_migration/gzlteknoloji/content-seeds/sql');
const TARGET_SCHEMA_DIR = path.join(REPO, 'backend/src/db/seed/sql');
const OUT_DIR = path.join(REPO, 'backend/src/db/seed/content/gzl');

const DRY = process.argv.includes('--dry');

/**
 * Uretilen dosyalarin basligindaki MAKINE isareti — temizlik bunlari hedefler.
 * Bilerek "dogal dilde yazilmasi olanaksiz" bir dizge: insan tarafindan yazilan
 * bir seed'in aciklamasinda bu ifadeyi ANMASI, dosyanin silinmesine yol acmasin.
 */
const GENERATED_MARKER = '@generated migrate-gzlteknoloji-content';

// ─────────────────────────────────────────────────────────────
// DOSYA PLANI — her kaynak dosya icin karar + gerekce.
// Plan referansi: MIGRASYON_PLANI_gzlteknoloji_2026-08-08.md
// ─────────────────────────────────────────────────────────────
const COPY = 'copy';
const SKIP = 'skip';

const FILE_PLAN = {
  // — Sema dosyalari: hedef semada zaten var, ALINMAZ —
  '001_auth_schema.sql': [SKIP, 'Auth semasi + admin — hedefte 001/002/003 olarak var (core)'],
  '012_home_sections_schema.sql': [SKIP, 'home_sections tablosu GWD modelinde yok (plan madde 12: elle eslenecek)'],
  '014_menu_items_schema.sql': [COPY, 'Menu semasi hedefte var; icindeki TR menu kayitlari gerekli'],
  '015_notifications_schema.sql': [SKIP, 'Hedefte 090 olarak var (core)'],
  '016_audit_schema.sql': [SKIP, 'Hedefte 030 olarak var (schema)'],
  '018_storage_assets.sql': [COPY, 'GZL medya kayitlari'],
  '019_twitter_schema.sql': [COPY, 'site_settings sosyal medya anahtarlari'],
  '020_services_schema.sql': [SKIP, 'Hedefte 070 olarak var, kolonlar birebir ayni'],
  '021_pricing_schema.sql': [SKIP, 'Hedefte 230 olarak var'],
  '022_products_schema.sql': [SKIP, 'Hedefte 012+013 olarak var (categories bu migrasyonda eklendi)'],
  '023_projects_references_schema.sql': [SKIP, 'Hedefte 220 olarak var'],
  '024_faqs_schema.sql': [SKIP, 'Hedefte 140 olarak var'],
  '025_contact_newsletter_schema.sql': [SKIP, 'Hedefte 080/095/180 olarak var'],
  '026_custom_pages_seo_social_schema.sql': [SKIP, 'Hedefte 050 olarak var'],

  // — Icerik: TASINIR —
  '004_site_settings_schema.sql': [COPY, 'GZL marka degerleri, iletisim, SEO (plan madde 10)'],
  '027_bionluk_services_seed.sql': [COPY, 'TR hizmetler (plan madde 1). EN stub cevirileri elenir.'],
  '028_pricing_packages_seed.sql': [COPY, 'Fiyatlandirma planlari (plan madde 3)'],
  '029_saas_products_seed.sql': [COPY, 'SaaS urunler + kategoriler — EN YUKSEK DEGER (plan madde 2)'],
  '030_portfolio_projects_seed.sql': [COPY, 'Portfolyo (plan madde 4). Sahte bionluk projeleri elenir.'],
  '031_extra_services_faqs_seed.sql': [COPY, 'Ek hizmetler + SSS (plan madde 1, 7)'],
  '035_footer_sections_schema_seed.sql': [COPY, 'Footer + menu icerigi'],
  '038_monorepo_portfolio_seed.sql': [COPY, 'Monorepo portfolyo projeleri (plan madde 4)'],
  '039_blog_media_seed.sql': [COPY, 'Blog yazilari medya/icerik guncellemesi (plan madde 5)'],
  '040_kurumsal_icerik_seed.sql': [COPY, 'Kurumsal/hakkimizda icerigi (plan madde 9)'],
  '040_service_content_polish_seed.sql': [COPY, 'Hizmet metni cilalama (service_packages deyimleri dusurulur)'],
  '041_pricing_media_seed.sql': [COPY, 'Fiyatlandirma gorselleri'],
  '042_pricing_detail_cta_seed.sql': [COPY, 'Fiyatlandirma detay/CTA metinleri'],
  '043_product_media_content_seed.sql': [COPY, 'Urun gorselleri'],
  '044_portfolio_content_polish_seed.sql': [COPY, 'Portfolyo metni cilalama'],
  '045_about_content_polish_seed.sql': [COPY, 'Hakkimizda cilalama'],
  '046_portfolio_page_content_seed.sql': [COPY, 'Portfolyo sayfasi site_settings metinleri'],
  '047_legal_policy_content_seed.sql': [COPY, 'KVKK/gizlilik/cerez/mesafeli satis vb. (plan madde 8)'],
  '048_osgb_service_seed.sql': [COPY, 'OSGB hizmeti + SSS (plan madde 1)'],

  // — ATILACAKLAR (plan bolum 3 sonu) —
  '013_theme_presets_seed.sql': [SKIP, 'ATILACAK: theme_presets — GWD kendi tema modelini kullanir'],
  '032_service_packages_schema_seed.sql': [SKIP, 'service_packages tablosu GWD modelinde yok (plan madde 3: pricing modeline elle eslenecek)'],
  '033_home_sections_v2_seed.sql': [SKIP, 'home_sections GWD modelinde yok (plan madde 12: GWD home modeline elle eslenecek)'],
  '034_testimonials_schema_seed.sql': [SKIP, 'testimonials tablosu yok; plan madde 6 -> reviews(060) tablosuna elle eslenecek'],
  '036_bionluk_tracker_schema.sql': [SKIP, 'ATILACAK: bionluk tracker'],
  // DIKKAT — bu dosya once yanlislikla ATILMISTI. Plan bolum 3'te "placeholder
  // marketing (037)" diye geciyor, ama dosyanin ICINDE plan madde 5'in istedigi
  // 8 GERCEK BLOG YAZISI var (module_key='blog'; ai-overviews,
  // chatgpt-neden-onermiyor, bayi-takibi-excel-crm ...) ve sayfa bazli
  // seo_pages ayarlari. Atlandigi icin gzlteknoloji.com/tr/blog BOS geliyordu.
  '037_marketing_content_seed.sql': [COPY, 'Blog yazilari + sayfa SEO ayarlari (plan madde 5)'],
};

// ─────────────────────────────────────────────────────────────
// KURATORLUK KURALLARI
// ─────────────────────────────────────────────────────────────

/**
 * EN stub cevirileri: 027 jeneratoru ve 030/038 portfolyo seed'i, EN satirlarini
 * TR basligi kopyalayip "Portfolio project ..." gibi otomatik ozetle uretmisti.
 * gzlteknoloji.com TR-only yayinlanacagi icin bu satirlar hem gereksiz hem hatali.
 * (029 urunlerin EN cevirileri GERCEK, onlar korunur.)
 */
const DROP_EN_LOCALE_FILES = new Set([
  '027_bionluk_services_seed.sql',
  '030_portfolio_projects_seed.sql',
  '038_monorepo_portfolio_seed.sql',
]);

/**
 * Sahte "bionluk kategorisi" projeleri: gercek referans degil, Bionluk ilan
 * basliklarindan uretilmis genel hizmet tanimlari. Portfolyoda proje gibi
 * gorunmeleri yaniltici. Slug bazli elenir (i18n satirlari da dusler).
 */
const FAKE_PROJECT_SLUGS = new Set([
  'b2b-teklif-katalog-yonetimli-site',
  'x-emlak-ilan-portfoy-yonetimli-web-yazilimi',
  'ubuntu-vps-kurulumu-canliya-alma-web-projesi',
  'node-js-express-backend-mongodb-nginx-pm2-kurulum',
]);

/**
 * Kaynakta bozuk kalmis basliklar + KONUM IFADELERI.
 *
 * Konum: kullanici karari (2026-08-09) — "biz her yere hizmet veriyoruz";
 * hero/pazarlama metinlerinde sehir/bolge belirtilmiyor. Adres yalnizca ADRES
 * ve YASAL alanlarda kalir (Gemlik VD, MERSIS, Ticaret Sicil, PostalAddress),
 * bu yuzden yalnizca "... merkezli" pazarlama kaliplari hedefleniyor.
 */
const TEXT_FIXES = [
  [/Gemlik\/Bursa merkezli /g, ''],
  [/Gemlik ve Bursa merkezli /g, ''],
  [/Platformu`'/g, "Platformu'"],
  [/İzleme Platformu`/g, 'İzleme Platformu'],
];

/**
 * ROTA ESLEMESI — emekli gzlteknoloji frontend'i Turkce rota slug'lari
 * kullaniyordu (/hizmetler, /urunler, /portfolyo...). BU kod tabani Ingilizce
 * rotalar kullanir. Menu kayitlari oldugu gibi tasininca TUM basliklar 404
 * veriyordu (canlida dogrulandi).
 *
 * Not: hakkimizda/about ayri bir custom_page olarak yayinlanir, bu yuzden
 * custompages rotasina esleniyor (bkz. content/gzl/903_gzl_about_page.sql).
 */
const URL_MAP = {
  '/hizmetler': '/services',
  '/paketler': '/pricing',
  '/urunler': '/products',
  '/portfolyo': '/work',
  '/portfolio': '/work',
  '/iletisim': '/contact',
  '/hakkimizda': '/custompages/about/hakkimizda',
  '/about': '/custompages/about/about-us',
};

/**
 * DILE GORE URL — menu baglantilari her locale'de kendi slug'ini kullanir
 * (/tr/hizmetler, /de/leistungen, /en/services). Harita TEK KAYNAK:
 * frontend/i18n/route-slugs.json (next.config rewrites/redirects ve sitemap
 * de ayni dosyadan besleniyor).
 *
 * Once URL_MAP ile emekli frontend'in Turkce rotalari GERCEK rota adina
 * cevrilir (/hizmetler -> /services), sonra satirin locale'ine gore yeniden
 * yerellestirilir. Boylece EN satiri /services, TR satiri /hizmetler alir.
 */
const ROUTE_SLUGS = JSON.parse(
  fs.readFileSync(path.join(REPO, 'frontend/i18n/route-slugs.json'), 'utf8'),
);

const ABOUT_URL = {
  tr: '/custompages/about/hakkimizda',
  en: '/custompages/about/about-us',
  de: '/custompages/about/about-us',
};

/** menu_items_i18n VALUES satirini locale'ine gore yerellestirir */
function localizeMenuRow(tuple) {
  const locMatch = tuple.match(/'(tr|en|de)'/);
  if (!locMatch) return tuple;
  const loc = locMatch[1];

  let out = tuple;
  for (const [route, byLocale] of Object.entries(ROUTE_SLUGS)) {
    const slug = byLocale[loc] || route;
    out = out.split(`'/${route}'`).join(`'/${slug}'`);
  }
  for (const v of Object.values(ABOUT_URL)) {
    out = out.split(`'${v}'`).join(`'${ABOUT_URL[loc]}'`);
  }
  return out;
}

/**
 * Kaynakta olup hedef semada OLMAYAN kolonlar.
 * Deger kaybi olmasin diye: dusurulen her degerin NULL oldugu DOGRULANIR,
 * NULL degilse script hata verip durur (sessiz veri kaybi yok).
 */
const COLUMN_DROPS = {
  menu_items: {
    site_id: 'Emekli repodaki multi-tenant kalintisi; GWD semasinda yok, tum degerler NULL',
  },
};

/**
 * Hedef semada `id` ZORUNLU (CHAR(36) NOT NULL, default yok) ama kaynak
 * INSERT'inde bu kolon YOK — kaynak tabloda birlesik anahtar kullanilmis.
 * Ornek: custom_pages_i18n kaynakta (page_id, locale) ile anahtarlaniyordu.
 *
 * Cozum: id, listelenen kolonlarin degerlerinden DETERMINISTIK uretilir
 * (sha1 -> UUID bicimi). Boylece script tekrar calistirildiginda ayni satir
 * ayni id'yi alir; seed idempotent kalir, tekrar tekrar cakisan kayit olusmaz.
 */
const SYNTHESIZE_ID = {
  custom_pages_i18n: ['page_id', 'locale'],
};

// ─────────────────────────────────────────────────────────────

function targetTables() {
  const tables = new Set();
  for (const f of fs.readdirSync(TARGET_SCHEMA_DIR)) {
    if (!f.endsWith('.sql')) continue;
    const sql = fs.readFileSync(path.join(TARGET_SCHEMA_DIR, f), 'utf8');
    for (const m of sql.matchAll(/CREATE TABLE(?: IF NOT EXISTS)? +`?([a-z0-9_]+)`?/gi)) {
      tables.add(m[1].toLowerCase());
    }
  }
  return tables;
}

/** Bastaki yorum satirlarini at — siniflandirma deyimin kendisine bakmali */
function stripLeadingComments(stmt) {
  return stmt.replace(/^(?:\s*--[^\n]*\n?)+/, '').trim();
}

/**
 * Deyimi siniflandir: { kind, table }
 *   kind: 'ddl'  -> CREATE/ALTER/DROP (sema; kaynaktan ALINMAZ, hedef repodan gelir)
 *         'dml'  -> INSERT/REPLACE/UPDATE/DELETE (icerik)
 *         'other'-> SET NAMES vb.
 *
 * DIKKAT: kaliplar deyim BASINA sabitlenmis olmali. Aksi halde CREATE TABLE
 * icindeki "ON UPDATE CURRENT_TIMESTAMP(3)" ifadesi UPDATE sanilip sema deyimi
 * "current_timestamp tablosuna yazan DML" olarak yanlis siniflanir (bu hata
 * bir kez yapildi, geri donmesin diye burada yaziyor).
 */
function classifyStatement(stmt) {
  const s = stripLeadingComments(stmt);

  let m = s.match(/^CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+`?([a-z0-9_]+)`?/i);
  if (m) return { kind: 'ddl', table: m[1].toLowerCase() };
  if (/^(?:CREATE|ALTER|DROP|TRUNCATE)\s/i.test(s)) return { kind: 'ddl', table: null };

  m = s.match(/^(?:INSERT|REPLACE)\s+(?:IGNORE\s+)?INTO\s+`?([a-z0-9_]+)`?/i);
  if (m) return { kind: 'dml', table: m[1].toLowerCase() };

  m = s.match(/^UPDATE\s+`?([a-z0-9_]+)`?/i);
  if (m) return { kind: 'dml', table: m[1].toLowerCase() };

  m = s.match(/^DELETE\s+FROM\s+`?([a-z0-9_]+)`?/i);
  if (m) return { kind: 'dml', table: m[1].toLowerCase() };

  return { kind: 'other', table: null };
}

/** Geriye donuk kolaylik: sadece icerik yazan deyimin tablosu */
function statementTable(stmt) {
  const c = classifyStatement(stmt);
  return c.kind === 'dml' ? c.table : null;
}

/**
 * Kaynak dosyayi deyimlere ayirir — TIRNAK DUYARLI.
 * src/db/seed/utils.ts icindeki scanSql ile ayni semantik (yorumlar korunur).
 *
 * Duz regex ile bolmek YETMEZ: 047_legal_policy_content_seed.sql icindeki bir
 * metin degerinin ortasinda `;` + satirsonu var ve naive split deyimi ikiye
 * bolup ER_PARSE_ERROR uretiyordu.
 */
function splitStatements(sql) {
  const statements = [];
  let current = '';

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    const next = sql[i + 1];

    if ((ch === '-' && next === '-') || ch === '#') {
      const end = sql.indexOf('\n', i);
      const stop = end === -1 ? sql.length : end;
      current += sql.slice(i, stop);
      i = stop - 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      const end = sql.indexOf('*/', i + 2);
      const stop = end === -1 ? sql.length : end + 2;
      current += sql.slice(i, stop);
      i = stop - 1;
      continue;
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      current += ch;
      i++;
      for (; i < sql.length; i++) {
        const c = sql[i];
        if (c === '\\' && quote !== '`') {
          current += c;
          if (i + 1 < sql.length) current += sql[++i];
          continue;
        }
        if (c === quote) {
          if (sql[i + 1] === quote) { current += c + sql[++i]; continue; }
          current += c;
          break;
        }
        current += c;
      }
      continue;
    }

    if (ch === ';') {
      current += ch;
      const t = current.trim();
      if (t && t !== ';') statements.push(t);
      current = '';
      continue;
    }

    current += ch;
  }

  const tail = current.trim();
  if (tail && tail !== ';') statements.push(tail.endsWith(';') ? tail : tail + ';');
  return statements;
}

/**
 * INSERT deyimini VALUES demetlerine ayirir — TIRNAK DUYARLI.
 *
 * Satir bazli yaklasim YETMEZ: custom_pages icerigi gibi uzun metin degerleri
 * SATIR SONU icerir, dolayisiyla bir demet birden fazla satira yayilir ve
 * "satir '(' ile baslar" varsayimi tutmaz (bu hata bir kez yapildi).
 *
 * Doner: { head, tuples: string[](ic kisim), tail } | null
 */
function parseInsertValues(stmt) {
  // VALUES anahtar kelimesini tirnak disinda bul
  let i = 0;
  let valuesAt = -1;
  while (i < stmt.length) {
    const ch = stmt[i];
    if (ch === "'" || ch === '"' || ch === '`') {
      const q = ch;
      i++;
      for (; i < stmt.length; i++) {
        if (stmt[i] === '\\' && q !== '`') { i++; continue; }
        if (stmt[i] === q) {
          if (stmt[i + 1] === q) { i++; continue; }
          break;
        }
      }
      i++;
      continue;
    }
    if (/[\s)]/.test(ch) && /^values\b/i.test(stmt.slice(i + 1).trimStart())) {
      const rest = stmt.slice(i + 1);
      valuesAt = i + 1 + (rest.length - rest.trimStart().length) + 6;
      break;
    }
    i++;
  }
  if (valuesAt < 0) return null;

  const head = stmt.slice(0, valuesAt);
  const tuples = [];
  let p = valuesAt;

  while (p < stmt.length) {
    while (p < stmt.length && /[\s,]/.test(stmt[p])) p++;
    if (stmt[p] !== '(') break;
    const start = p;
    let depth = 0;
    for (; p < stmt.length; p++) {
      const ch = stmt[p];
      if (ch === "'" || ch === '"' || ch === '`') {
        const q = ch;
        p++;
        for (; p < stmt.length; p++) {
          if (stmt[p] === '\\' && q !== '`') { p++; continue; }
          if (stmt[p] === q) {
            if (stmt[p + 1] === q) { p++; continue; }
            break;
          }
        }
        continue;
      }
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0) { p++; break; }
      }
    }
    tuples.push(stmt.slice(start + 1, p - 1));
  }

  return { head, tuples, tail: stmt.slice(p) };
}

/** Demetleri geri yazip deyimi yeniden kurar */
function rebuildInsert(head, tuples, tail) {
  return `${head}\n  ` + tuples.map((t) => `(${t})`).join(',\n  ') + (tail.startsWith('\n') ? tail : '\n' + tail);
}

/** VALUES demetlerinden, predicate'i saglayanlari eler */
function dropValueRows(stmt, predicate) {
  const parsed = parseInsertValues(stmt);
  if (!parsed || !parsed.tuples.length) return { sql: stmt, dropped: 0 };
  const kept = parsed.tuples.filter((t) => !predicate(t));
  const dropped = parsed.tuples.length - kept.length;
  if (!dropped) return { sql: stmt, dropped: 0 };
  if (!kept.length) return { sql: '', dropped };
  return { sql: rebuildInsert(parsed.head, kept, parsed.tail), dropped };
}

/**
 * Bir VALUES demetinin ic kismini degerlere ayirir.
 * Tirnak icindeki virgulleri, '' kacislarini ve JSON_ARRAY(...) gibi ic ice
 * parantezleri dogru ele alir — naive split(',') bu veride bozulur.
 */
function splitTuple(inner) {
  const out = [];
  let cur = '';
  let depth = 0;
  let inStr = false;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (inStr) {
      cur += ch;
      if (ch === '\\') {
        cur += inner[++i] ?? '';
      } else if (ch === "'") {
        if (inner[i + 1] === "'") cur += inner[++i]; // '' kacisi
        else inStr = false;
      }
      continue;
    }
    if (ch === "'") { inStr = true; cur += ch; continue; }
    if (ch === '(') { depth++; cur += ch; continue; }
    if (ch === ')') { depth--; cur += ch; continue; }
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/**
 * INSERT deyiminden, hedef semada olmayan kolonlari (ve karsilik gelen
 * degerleri) cikarir. Dusurulen deger NULL degilse HATA verir.
 */
function dropColumns(stmt, table) {
  const drops = COLUMN_DROPS[table];
  if (!drops) return { sql: stmt, dropped: 0 };

  const head = stmt.match(/(INSERT\s+(?:IGNORE\s+)?INTO\s+`?[a-z0-9_]+`?\s*\()([^)]*)(\))/i);
  if (!head) return { sql: stmt, dropped: 0 };

  const cols = head[2].split(',').map((c) => c.trim().replace(/`/g, ''));
  const dropIdx = cols.map((c, i) => (drops[c] ? i : -1)).filter((i) => i >= 0);
  if (!dropIdx.length) return { sql: stmt, dropped: 0 };

  const keptCols = cols.filter((_, i) => !dropIdx.includes(i));
  const withCols = stmt.replace(
    head[0],
    head[1] + keptCols.map((c) => `\`${c}\``).join(',') + head[3]
  );

  const parsed = parseInsertValues(withCols);
  if (!parsed) return { sql: stmt, dropped: 0 };

  let dropped = 0;
  const tuples = parsed.tuples.map((t) => {
    const vals = splitTuple(t);
    if (vals.length !== cols.length) return t;
    for (const idx of dropIdx) {
      if (vals[idx].trim().toUpperCase() !== 'NULL') {
        throw new Error(
          `VERI KAYBI ONLENDI: ${table}.${cols[idx]} dusurulecekti ama degeri NULL degil: ${vals[idx]}\n` +
            `COLUMN_DROPS kuralini gozden gecirin veya hedef semaya kolonu ekleyin.`
        );
      }
    }
    dropped++;
    return vals.filter((_, j) => !dropIdx.includes(j)).join(',');
  });

  return { sql: rebuildInsert(parsed.head, tuples, parsed.tail), dropped };
}

/** Deterministik UUID: ayni girdi -> ayni id (seed idempotent kalsin) */
function deterministicUuid(seed) {
  const h = crypto.createHash('sha1').update(seed).digest('hex');
  return [
    h.slice(0, 8),
    h.slice(8, 12),
    '4' + h.slice(13, 16),
    ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16) + h.slice(17, 20),
    h.slice(20, 32),
  ].join('-');
}

/**
 * Kaynak INSERT'inde olmayan zorunlu `id` kolonunu, konfigurasyondaki
 * anahtar kolonlardan deterministik uretip basa ekler.
 */
function synthesizeId(stmt, table) {
  const keyCols = SYNTHESIZE_ID[table];
  if (!keyCols) return { sql: stmt, added: 0 };

  const head = stmt.match(/(INSERT\s+(?:IGNORE\s+)?INTO\s+`?[a-z0-9_]+`?\s*\()([^)]*)(\))/i);
  if (!head) return { sql: stmt, added: 0 };

  const cols = head[2].split(',').map((c) => c.trim().replace(/`/g, ''));
  if (cols.includes('id')) return { sql: stmt, added: 0 };

  const keyIdx = keyCols.map((c) => cols.indexOf(c));
  if (keyIdx.some((i) => i < 0)) {
    throw new Error(
      `${table}: id uretmek icin gereken kolon(lar) INSERT'te yok (${keyCols.join(', ')}). ` +
        `SYNTHESIZE_ID kuralini gozden gecirin.`
    );
  }

  const withCols = stmt.replace(
    head[0],
    head[1] + ['id', ...cols].map((c) => `\`${c}\``).join(',') + head[3]
  );

  const parsed = parseInsertValues(withCols);
  if (!parsed) return { sql: stmt, added: 0 };

  let added = 0;
  const tuples = parsed.tuples.map((t) => {
    const vals = splitTuple(t);
    if (vals.length !== cols.length) return t;
    const seed = `${table}|` + keyIdx.map((k) => vals[k]).join('|');
    added++;
    return `'${deterministicUuid(seed)}',${vals.join(',')}`;
  });

  return { sql: rebuildInsert(parsed.head, tuples, parsed.tail), added };
}

/** Satir bir i18n EN satiri mi? (locale kolonu 'en') */
function isEnRow(tuple) {
  return /(^|,)\s*'en'\s*(,|$)/.test(tuple);
}

/** Satir sahte proje mi? (slug listesinde) */
function isFakeProjectRow(tuple) {
  for (const slug of FAKE_PROJECT_SLUGS) {
    if (tuple.includes(`'${slug}'`)) return true;
  }
  return false;
}

function applyTextFixes(sql) {
  let out = sql;
  let n = 0;
  for (const [re, rep] of TEXT_FIXES) {
    const before = out;
    out = out.replace(re, rep);
    if (out !== before) n++;
  }
  // Rota eslemesi: yalnizca TAM eslesen tirnak icindeki degerler degistirilir
  // ('/hizmetler' -> '/services'). Metin icinde gecen benzer ifadelere
  // dokunulmaz.
  for (const [from, to] of Object.entries(URL_MAP)) {
    const before = out;
    out = out.split(`'${from}'`).join(`'${to}'`);
    if (out !== before) n++;
  }
  return { sql: out, fixes: n };
}

// ─────────────────────────────────────────────────────────────
// ANA AKIS
// ─────────────────────────────────────────────────────────────

if (!fs.existsSync(SRC_DIR)) {
  console.error(`HATA: kaynak dizin yok: ${SRC_DIR}`);
  console.error('gzlteknoloji seed"leri _migration/ altinda korunuyor olmali.');
  process.exit(1);
}

const TABLES = targetTables();
const srcFiles = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith('.sql')).sort();

// Plan kapsami kontrolu — yeni bir kaynak dosya siniflandirilmadan gecmesin
const unplanned = srcFiles.filter((f) => !FILE_PLAN[f]);
if (unplanned.length) {
  console.error('HATA: FILE_PLAN"da karari olmayan kaynak dosya(lar):');
  for (const f of unplanned) console.error(`  - ${f}`);
  console.error('Bu script"teki FILE_PLAN"a [COPY|SKIP, "gerekce"] olarak ekleyin.');
  process.exit(1);
}

const report = {
  copied: [],
  skipped: [],
  droppedStatements: [],
  droppedDdl: [],
  droppedRows: { en: 0, fakeProject: 0 },
  droppedColumnCells: 0,
  synthesizedIds: 0,
  textFixes: 0,
};

const outputs = [];

for (const file of srcFiles) {
  const [action, reason] = FILE_PLAN[file];
  if (action === SKIP) {
    report.skipped.push({ file, reason });
    continue;
  }

  const raw = fs.readFileSync(path.join(SRC_DIR, file), 'utf8');
  const statements = splitStatements(raw);

  // ONCE TARA: sahte projelerin ID'lerini topla.
  // Slug yalnizca projects_i18n satirlarinda bulunur; taban `projects` satiri
  // slug icermez. Ilk surumde sadece i18n satirlari eleniyordu ve taban
  // kayitlar OKSUZ kaliyordu (27 proje / 23 ceviri) — cevirisiz proje
  // listelerde bozuk gorunur.
  const fakeProjectIds = new Set();
  const fakeImageIds = new Set();
  for (const stmt of statements) {
    const c = classifyStatement(stmt);
    if (c.kind !== 'dml' || c.table !== 'projects_i18n') continue;
    const parsed = parseInsertValues(stmt);
    if (!parsed) continue;
    for (const tuple of parsed.tuples) {
      if (!isFakeProjectRow(tuple)) continue;
      const vals = splitTuple(tuple);
      // projects_i18n: (id, project_id, locale, ...) -> 2. deger project_id
      const pid = (vals[1] || '').trim();
      if (pid.startsWith("'")) fakeProjectIds.add(pid);
    }
  }

  const keptStatements = [];
  for (let stmt of statements) {
    const { kind, table } = classifyStatement(stmt);

    // Sema deyimleri kaynaktan ALINMAZ — sema hedef repoda (sql/) yasar.
    if (kind === 'ddl') {
      report.droppedDdl.push({ file, table });
      continue;
    }

    // Hedef semada olmayan tabloya yazan icerik deyimlerini dusur
    if (kind === 'dml' && !TABLES.has(table)) {
      report.droppedStatements.push({ file, table });
      continue;
    }

    // Sadece SET/yorum gibi deyimleri oldugu gibi birak
    if (kind === 'dml') {
      const dc = dropColumns(stmt, table);
      stmt = dc.sql;
      report.droppedColumnCells += dc.dropped;

      const si = synthesizeId(stmt, table);
      stmt = si.sql;
      report.synthesizedIds += si.added;

      if (DROP_EN_LOCALE_FILES.has(file)) {
        const r = dropValueRows(stmt, isEnRow);
        stmt = r.sql;
        report.droppedRows.en += r.dropped;
      }
      if (table.startsWith('project')) {
        // Sahte projeyi elerken TUM bagli satirlar birlikte gitmeli; aksi halde
        // temiz bir seed foreign key hatasiyla patliyor (project_images ->
        // olmayan projects satiri). Zincir: projects -> project_images ->
        // project_images_i18n.
        let pred;
        if (table === 'projects') {
          pred = (tuple) => fakeProjectIds.has((splitTuple(tuple)[0] || '').trim());
        } else if (table === 'project_images') {
          pred = (tuple) => {
            const vals = splitTuple(tuple);
            // (id, project_id, ...)
            const isFake = fakeProjectIds.has((vals[1] || '').trim());
            if (isFake) fakeImageIds.add((vals[0] || '').trim());
            return isFake;
          };
        } else if (table === 'project_images_i18n') {
          // (id, image_id, ...)
          pred = (tuple) => fakeImageIds.has((splitTuple(tuple)[1] || '').trim());
        } else {
          pred = isFakeProjectRow;
        }
        const r = dropValueRows(stmt, pred);
        stmt = r.sql;
        report.droppedRows.fakeProject += r.dropped;
      }
    }

    if (!stmt.trim()) continue;

    const fixed = applyTextFixes(stmt);
    report.textFixes += fixed.fixes;
    let finalSql = fixed.sql;

    // DIKKAT: menu yerellestirmesi applyTextFixes'ten SONRA calismali.
    // URL_MAP once emekli frontend'in Turkce rotalarini gercek rota adina
    // ceviriyor (/hizmetler -> /services); onceden calistirilirsa yaptigimiz
    // yerellestirme hemen geri aliniyordu.
    if (table === 'menu_items_i18n') {
      const parsed = parseInsertValues(finalSql);
      if (parsed && parsed.tuples.length) {
        finalSql = rebuildInsert(parsed.head, parsed.tuples.map(localizeMenuRow), parsed.tail);
      }
    }

    keptStatements.push(finalSql);
  }

  // Icerigi kalmayan dosyayi yazma
  const meaningful = keptStatements.filter((s) => statementTable(s));
  if (!meaningful.length) {
    report.skipped.push({ file, reason: 'Filtreden sonra icerik kalmadi' });
    continue;
  }

  const header = [
    '-- =============================================================',
    `-- ${GENERATED_MARKER}`,
    `-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.`,
    `-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs`,
    `-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/${file}`,
    `-- Gerekce : ${reason}`,
    '--',
    '-- Yeniden uretmek icin: bun run migrate:gzl',
    '-- =============================================================',
    '',
    'SET NAMES utf8mb4;',
    '',
  ].join('\n');

  outputs.push({ name: file, body: header + keptStatements.join('\n\n') + '\n' });
  report.copied.push({ file, statements: meaningful.length, reason });
}

// ── Yazma ────────────────────────────────────────────────────
if (!DRY) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Onceki URETIMI temizle — ama YALNIZCA bu script'in urettiklerini.
  // Elle yazilmis seed'ler (orn. 900_gzl_site_meta.sql) korunur; bunlar
  // kaynakta karsiligi olmayan, bu deployment icin yazilmis icerigi tasir.
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (!f.endsWith('.sql')) continue;
    const p = path.join(OUT_DIR, f);
    if (fs.readFileSync(p, 'utf8').includes(GENERATED_MARKER)) fs.unlinkSync(p);
  }
  for (const out of outputs) {
    fs.writeFileSync(path.join(OUT_DIR, out.name), out.body);
  }
}

// ── Rapor ────────────────────────────────────────────────────
console.log(`\ngzlteknoloji -> content/gzl icerik tasima${DRY ? '  (DRY RUN — dosya yazilmadi)' : ''}\n`);
console.log(`Kaynak : ${path.relative(REPO, SRC_DIR)}  (${srcFiles.length} dosya)`);
console.log(`Hedef  : ${path.relative(REPO, OUT_DIR)}  (${outputs.length} dosya uretildi)\n`);

console.log(`TASINAN (${report.copied.length}):`);
for (const c of report.copied) {
  console.log(`  ${c.file.padEnd(40)} ${String(c.statements).padStart(3)} deyim  — ${c.reason}`);
}

console.log(`\nATLANAN (${report.skipped.length}):`);
for (const s of report.skipped) {
  console.log(`  ${s.file.padEnd(40)} — ${s.reason}`);
}

if (report.droppedDdl.length) {
  console.log(
    `\nATLANAN SEMA DEYIMLERI: ${report.droppedDdl.length} CREATE/ALTER ` +
      `(sema kaynaktan alinmaz — hedef repo backend/src/db/seed/sql/ icinde yasar)`
  );
}

if (report.droppedStatements.length) {
  const byTable = {};
  for (const d of report.droppedStatements) {
    byTable[d.table] = (byTable[d.table] || 0) + 1;
  }
  console.log('\nDUSURULEN DEYIMLER (hedef semada tablo yok — ELLE ESLENECEK):');
  for (const [t, n] of Object.entries(byTable)) {
    console.log(`  ${t.padEnd(28)} ${n} deyim`);
  }
}

console.log('\nKURATORLUK:');
console.log(`  EN stub satiri elendi      : ${report.droppedRows.en}`);
console.log(`  Sahte proje satiri elendi  : ${report.droppedRows.fakeProject}`);
console.log(`  Metin duzeltmesi           : ${report.textFixes}`);
console.log(`  Hedefte olmayan kolon      : ${report.droppedColumnCells} satirda temizlendi`);
console.log(`  Deterministik id uretildi  : ${report.synthesizedIds} satir`);
console.log();
