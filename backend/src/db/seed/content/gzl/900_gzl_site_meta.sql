-- =============================================================
-- FILE: content/gzl/900_gzl_site_meta.sql
-- ELLE YAZILDI. Migration script'i bu dosyaya DOKUNMAZ: temizlik yalnizca
-- basliginda makine isareti tasiyan uretilmis dosyalari siler.
--
-- NEDEN VAR:
--   Frontend'in SEO katmani (frontend/seo/seo.keys.ts + seo.types.ts) su
--   anahtarlari ZORUNLU tutar: default_locale, seo_defaults, seo_app_icons.
--   `seo_defaults`, `public_base_url` (global) + `site_title` (locale) uzerinden
--   turetiliyor. Emekli gzlteknoloji seed'lerinde bu iki anahtar YOKTU; bu
--   yuzden ilk ayaga kaldirmada her sayfa
--     "[SEO] Missing REQUIRED site_settings keys for locale='tr': seo_defaults"
--   ile 500 dondu. Bu dosya o bosluklari GZL kimligiyle doldurur.
--
-- MARKA KIMLIGI (gzlteknoloji.com — Guzel Web Design'dan AYRI):
--   Unvan  : GZL Danismanlik Hizmetleri ve Teknoloji Limited Sirketi
--   Adres  : Cumhuriyet Mah. Hastane Cad. Sahinler Sit. C Blok No:12-C, Gemlik/Bursa
--   Logo   : /uploads/site-media/logo_transparent.png (018 seed'inden gelir)
--   Varsayilan dil: tr
--
-- DIL BASINA AYRI ICERIK: tr / en / de icin baslik ve aciklama FARKLI yazildi.
-- =============================================================

SET NAMES utf8mb4;

-- ── Kanonik alan adi (global) ────────────────────────────────────────────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000001', 'public_base_url', '*', '"https://gzlteknoloji.com"')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- ── Uc dil aktif; varsayilan tr ──────────────────────────────────────────────
-- gzlteknoloji.com TR odakli, ancak EN ve DE de sunulur ve icerikleri AYRIDIR.
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000002', 'app_locales', '*',
   '[{"code":"tr","label":"Türkçe","is_default":true,"is_active":true},{"code":"en","label":"English","is_default":false,"is_active":true},{"code":"de","label":"Deutsch","is_default":false,"is_active":true}]')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- ── site_title — HER DILDE FARKLI ────────────────────────────────────────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000011', 'site_title', 'tr',
   '"GZL Teknoloji — Yazılım, SaaS ve Dijital Çözümler"'),
  ('90000000-0000-4000-8000-000000000012', 'site_title', 'en',
   '"GZL Technology — Software, SaaS and Digital Solutions"'),
  ('90000000-0000-4000-8000-000000000013', 'site_title', 'de',
   '"GZL Technologie — Software, SaaS und digitale Lösungen"')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- ── seo_defaults — HER DILDE FARKLI ──────────────────────────────────────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000021', 'seo_defaults', 'tr',
   '{"canonicalBase":"https://gzlteknoloji.com","siteName":"GZL Teknoloji","titleTemplate":"%s | GZL Teknoloji","defaultTitle":"GZL Teknoloji — Yazılım, SaaS ve Dijital Çözümler","defaultDescription":"Kurumsal web yazılımı, SaaS ürünleri, e-ticaret, otomasyon ve yapay zekâ destekli dijital çözümler geliştiriyoruz.","locale":"tr_TR","twitterCard":"summary_large_image"}'),
  ('90000000-0000-4000-8000-000000000022', 'seo_defaults', 'en',
   '{"canonicalBase":"https://gzlteknoloji.com","siteName":"GZL Technology","titleTemplate":"%s | GZL Technology","defaultTitle":"GZL Technology — Software, SaaS and Digital Solutions","defaultDescription":"Custom web software, SaaS products, e-commerce, automation and AI-assisted digital solutions.","locale":"en_US","twitterCard":"summary_large_image"}'),
  ('90000000-0000-4000-8000-000000000023', 'seo_defaults', 'de',
   '{"canonicalBase":"https://gzlteknoloji.com","siteName":"GZL Technologie","titleTemplate":"%s | GZL Technologie","defaultTitle":"GZL Technologie — Software, SaaS und digitale Lösungen","defaultDescription":"Individuelle Websoftware, SaaS-Produkte, E-Commerce, Automatisierung und KI-gestützte digitale Lösungen.","locale":"de_DE","twitterCard":"summary_large_image"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- ── seo_app_icons — global (favicon/apple icon 018 seed'inden gelir) ─────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000031', 'seo_app_icons', '*',
   '{"favicon16":"https://gzlteknoloji.com/uploads/site-media/favicon.png","favicon32":"https://gzlteknoloji.com/uploads/site-media/favicon.png","appleTouchIcon":"https://gzlteknoloji.com/uploads/site-media/apple-touch-icon.png"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- ── Yerel isletme (adres = GZL, Gemlik/Bursa) ────────────────────────────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000041', 'seo_local_business', '*',
   '{"@type":"Organization","name":"GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi","alternateName":"GZL Teknoloji","url":"https://gzlteknoloji.com","logo":"https://gzlteknoloji.com/uploads/site-media/logo_transparent.png","email":"info@gzlteknoloji.com","address":{"@type":"PostalAddress","streetAddress":"Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14","addressLocality":"Gemlik","addressRegion":"Bursa","addressCountry":"TR"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- ── Sosyal paylasim gorseli ─────────────────────────────────────────────────
-- Ayar yoksa bilesen sablonun GWD gorseline (guezel-showcase/...) dusuyordu.
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('90000000-0000-4000-8000-000000000051', 'site_og_default_image', '*',
   '{"url":"https://gzlteknoloji.com/uploads/site-media/logo.png","alt":"GZL Teknoloji","width":1200,"height":630}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);
