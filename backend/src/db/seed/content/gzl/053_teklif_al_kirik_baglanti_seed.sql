-- =============================================================
-- 053 — Kirik "teklif al" baglantilari
-- -------------------------------------------------------------
-- NEDEN (2026-08-29): /tr/paketler sayfasindaki sekiz paketin "teklif al"
-- dugmesi `/teklif-al?paket=<kod>` adresine gidiyordu. BOYLE BIR ROTA HIC
-- OLMADI — `app/[locale]/` altinda karsiligi yok, `i18n/route-slugs.json`
-- icinde de yok. Sekiz dugmenin hepsi 404 veriyordu; ayni adres sekiz blog
-- yazisinin metninde de gecmektedir.
--
-- Dogru hedef zaten veri icinde vardi: amozon paketleri `/tr/iletisim?paket=...`
-- kullaniyordu. Bu dosya tum ic CTA'lari DILDEN BAGIMSIZ `/contact?paket=...`
-- bicimine cevirir; PricingClient bunu calisma aninda dile cevirir
-- (/tr/iletisim, /de/kontakt, /en/contact). Boylece Almanca ve Ingilizce
-- ziyaretci de kendi dilindeki iletisim sayfasina duser — eski sabit `/tr/`
-- onegi onlari Turkce sayfaya atiyordu.
--
-- `?paket=` parametresi Contact1 tarafindan okunur ve Konu alanina yazilir;
-- aksi halde gelen mesajdan hangi paketin soruldugu anlasilmaz.
--
-- 028 ve 037 OTOMATIK URETILMISTIR, elle duzenlenmez; duzeltme burada.
-- =============================================================

SET NAMES utf8mb4;

-- ── Paket CTA'lari ──────────────────────────────────────────────────────────
UPDATE `pricing_plans`
SET `cta_href` = CONCAT('/contact?paket=', `code`)
WHERE `cta_href` LIKE '/teklif-al?paket=%';

-- Onceden elle `/tr/iletisim?paket=...` yazilmis olanlar da ayni bicime gelsin;
-- boylece dil onegini tek yerde (bilesende) uretiyoruz.
UPDATE `pricing_plans`
SET `cta_href` = CONCAT('/contact?paket=', `code`)
WHERE `cta_href` LIKE '/tr/iletisim?paket=%';

-- ── ASIL KAYNAK: dile ozel CTA ──────────────────────────────────────────────
-- DIKKAT: API `pricing_plans_i18n.cta_href` degerini dondurur; plan
-- tablosundaki deger yalnizca yedektir. Ilk duzeltmede burasi atlandigi icin
-- baglantilar kirik kalmisti. TR satirlari `/teklif-al?paket=` (rota yok),
-- EN satirlari `/en/quote?package=` (o rota da yok) gosteriyordu.
UPDATE `pricing_plans_i18n` i
JOIN `pricing_plans` p ON p.id = i.plan_id
SET i.`cta_href` = CONCAT('/contact?paket=', p.`code`)
WHERE i.`cta_href` LIKE '/teklif-al?paket=%'
   OR i.`cta_href` LIKE '/en/quote?package=%'
   OR i.`cta_href` LIKE '/tr/iletisim?paket=%';

-- ── Blog ve pazarlama metinlerindeki baglantilar ────────────────────────────
-- Icerik dile ozeldir; her satir kendi dilinin iletisim sayfasina baglanir.
UPDATE `custom_pages_i18n`
SET `content` = REPLACE(`content`, '/teklif-al', '/tr/iletisim')
WHERE `locale` = 'tr' AND `content` LIKE '%/teklif-al%';

UPDATE `custom_pages_i18n`
SET `content` = REPLACE(`content`, '/teklif-al', '/en/contact')
WHERE `locale` = 'en' AND `content` LIKE '%/teklif-al%';

UPDATE `custom_pages_i18n`
SET `content` = REPLACE(`content`, '/teklif-al', '/de/kontakt')
WHERE `locale` = 'de' AND `content` LIKE '%/teklif-al%';

-- Site ayarlarinda kalmis olabilecek metinler icin ayni duzeltme.
UPDATE `site_settings`
SET `value` = REPLACE(`value`, '/teklif-al', '/tr/iletisim')
WHERE `value` LIKE '%/teklif-al%';

-- ── Guvenlik agi ────────────────────────────────────────────────────────────
-- Bu sorgularin tamami 0 donmelidir:
--   SELECT COUNT(*) FROM pricing_plans      WHERE cta_href LIKE '%teklif-al%';
--   SELECT COUNT(*) FROM pricing_plans_i18n WHERE cta_href LIKE '%teklif-al%' OR cta_href LIKE '%/quote%';
--   SELECT COUNT(*) FROM custom_pages_i18n  WHERE content  LIKE '%teklif-al%';
--   SELECT COUNT(*) FROM site_settings      WHERE value    LIKE '%teklif-al%';
