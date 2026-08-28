-- =============================================================
-- 051 — Urun kart gorselleri + Ihracat Radari icerik ayrimi
-- -------------------------------------------------------------
-- NEDEN (2026-08-29): /tr/urunler kartlarinin gorselleri elle konmus yer
-- tutuculardi (ikisi duz degrade + yazi, biri kirpilmis logo). Ayni
-- projelerin PROJECT_PORTFOLIO_STANDARD.md'ye uygun 3200x2000 kapaklari
-- zaten uretilmisti; kartlar artik o kanonik kapaklardan besleniyor:
--
--   node backend/scripts/sync-product-covers.mjs --write
--
-- Betik manifestteki `media[role=cover]` kaydini okur ve `displayPermission`
-- + `rightsConfirmed` ikisi de true degilse gorseli YAYINLAMAZ.
--
-- 029_saas_products_seed.sql OTOMATIK URETILMISTIR ve elle duzenlenmez;
-- duzeltmeler bu dosyada, ondan SONRA uygulanir.
--
-- IHRACAT RADARI AYRIMI (Orhan karari, 2026-08-29): kart yalnizca Ihracat
-- Radari olarak kalir. Onceki hali MarketPulse'in gorselini, aciklamasini,
-- kodunu ve SSS'sini tasiyordu — kartta YANLIS MARKA gorunuyordu. Canli
-- veritabaninda yalnizca TR baslik/slug degistirilmisti; EN/DE tarafi ve
-- tum yardimci kayitlar MarketPulse'ta kalmisti. Burada tamamlaniyor.
-- =============================================================

SET NAMES utf8mb4;

-- ── Kart gorselleri ─────────────────────────────────────────────────────────
-- Dosyalar backend/uploads/products/ altinda; kaynak kapaklar
-- <proje>/docs/portfolio/assets/00-cover.png (1600x1000 webp'e indirgenir).
UPDATE `products` SET
  `image_url` = '/uploads/products/ihracat-radari.webp',
  `images`    = JSON_ARRAY('/uploads/products/ihracat-radari.webp'),
  `demo_url`  = 'https://ihracatradari.com.tr',
  `product_code` = 'IHRACAT-RADARI'
WHERE `id` = '30000000-0000-4000-8000-000000000206';

-- ── Ihracat Radari metinleri (MarketPulse metni cikarildi) ──────────────────
UPDATE `product_i18n` SET
  `title` = 'İhracat Radarı',
  `slug` = 'ihracat-radari',
  `description` = 'Gümrük sevkiyat kayıtları ve firma dizinlerinden GTİP bazlı alıcı adayı çıkaran, karar vericiye ulaşmayı ve ihracat evrakı üretimini tek panelde birleştiren dış ticaret istihbarat platformu.',
  `alt` = 'İhracat Radarı dış ticaret istihbarat paneli',
  `tags` = JSON_ARRAY('Dış Ticaret','Alıcı Bulma','GTİP','Outreach','İhracat Evrakı'),
  `meta_title` = 'İhracat Radarı | GZL Teknoloji',
  `meta_description` = 'Gümrük verisinden alıcı bulma, karar vericiye temas ve ihracat evrakı üretimi. GTİP bazlı dış ticaret istihbarat platformu.'
WHERE `product_id` = '30000000-0000-4000-8000-000000000206' AND `locale` = 'tr';

UPDATE `product_i18n` SET
  `title` = 'İhracat Radarı',
  `slug` = 'ihracat-radari',
  `description` = 'An export intelligence platform that finds buyer candidates from customs shipment records and company directories by HS code, reaches decision makers, and produces export documents in a single panel.',
  `alt` = 'İhracat Radarı export intelligence panel',
  `tags` = JSON_ARRAY('Export','Buyer Discovery','HS Code','Outreach','Export Documents'),
  `meta_title` = 'İhracat Radarı | GZL Technology',
  `meta_description` = 'Find real buyers from customs data, reach decision makers and produce export documents. HS-code based export intelligence platform.'
WHERE `product_id` = '30000000-0000-4000-8000-000000000206' AND `locale` = 'en';

UPDATE `product_i18n` SET
  `title` = 'İhracat Radarı',
  `slug` = 'ihracat-radari',
  `description` = 'Eine Exportintelligenz-Plattform: findet Kaeuferkandidaten aus Zoll-Versanddaten und Firmenverzeichnissen nach HS-Code, erreicht Entscheider und erstellt Exportdokumente in einem Panel.',
  `alt` = 'İhracat Radarı Exportintelligenz-Panel',
  `tags` = JSON_ARRAY('Export','Kaeufersuche','HS-Code','Outreach','Exportdokumente'),
  `meta_title` = 'İhracat Radarı | GZL Technologie',
  `meta_description` = 'Echte Kaeufer aus Zolldaten finden, Entscheider erreichen und Exportdokumente erstellen. HS-Code basierte Exportintelligenz.'
WHERE `product_id` = '30000000-0000-4000-8000-000000000206' AND `locale` = 'de';

-- ── Yardimci kayitlar ───────────────────────────────────────────────────────
UPDATE `product_specs` SET
  `value` = 'https://ihracatradari.com.tr'
WHERE `product_id` = '30000000-0000-4000-8000-000000000206' AND `name` = 'Demo URL';

UPDATE `product_faqs` SET
  `question` = 'İhracat Radarı kimler için?',
  `answer` = 'İhracat yapan veya yapmak isteyen KOBİ ve sanayi firmaları için. Dış ticaret ekibi, gümrük verisinden alıcı adayı çıkarmayı, karar vericiye temas etmeyi ve ihracat evrakını tek panelden yönetir.'
WHERE `id` = '30000000-0000-4000-8000-000000002204';

UPDATE `product_faqs` SET
  `question` = 'Who is İhracat Radarı for?',
  `answer` = 'For SMEs and manufacturers that export or plan to. The export team finds buyer candidates from customs data, contacts decision makers and manages export documents in one panel.'
WHERE `id` = '30000000-0000-4000-8000-000000002205';

-- ── Ek duzeltmeler (CRM dogrulamasi, 2026-08-29) ────────────────────────────
-- Ihracat Radari canli: manifest project.status="live" ve ihracatradari.com.tr
-- HTTP 200 donuyor. Kolon: ENUM('live','beta','coming_soon').
UPDATE `products` SET `status` = 'live'
WHERE `id` = '30000000-0000-4000-8000-000000000206';

-- KatalogAI adres sapmasi: katalogai.gzltek.tech OLU (yanit yok), manifestteki
-- links.website = https://thecatalogia.com ayakta (HTTP 200). Kartta kirik
-- baglanti duruyordu.
UPDATE `products` SET `demo_url` = 'https://thecatalogia.com'
WHERE `id` = '30000000-0000-4000-8000-000000000203';

UPDATE `product_specs` SET `value` = 'https://thecatalogia.com'
WHERE `id` = '30000000-0000-4000-8000-000000001203';

UPDATE `product_i18n` SET
  `specifications` = JSON_SET(COALESCE(`specifications`, JSON_OBJECT()), '$.demo_url', 'https://thecatalogia.com')
WHERE `product_id` = '30000000-0000-4000-8000-000000000203';
