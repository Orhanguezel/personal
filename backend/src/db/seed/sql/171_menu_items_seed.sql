-- =============================================================
-- 171_menu_items_seed.sql
-- Seed: Header + Footer Menu Items (3 locales: tr/en/de)
-- Tables: menu_items, menu_items_i18n
-- Notes:
--  - url values are LOCALE-LESS paths ("/services").
--    Frontend should prefix with "/{locale}" when rendering.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- -------------------------------------------------------------
-- Optional cleanup (only if you want to replace existing header)
-- -------------------------------------------------------------
-- DELETE mi18n
DELETE mi18n
FROM menu_items_i18n mi18n
JOIN menu_items mi ON mi.id = mi18n.menu_item_id
WHERE mi.location = 'header';

-- DELETE parent
DELETE FROM menu_items
WHERE location = 'header';

-- -------------------------------------------------------------
-- Optional cleanup (footer)
-- -------------------------------------------------------------
DELETE mi18n
FROM menu_items_i18n mi18n
JOIN menu_items mi ON mi.id = mi18n.menu_item_id
WHERE mi.location = 'footer';

DELETE FROM menu_items
WHERE location = 'footer';

-- -------------------------------------------------------------
-- Insert menu items (parent table)
-- -------------------------------------------------------------

SET @m_home     := UUID();
SET @m_services := UUID();
SET @m_work     := UUID();
SET @m_pricing  := UUID();
SET @m_blog     := UUID();
SET @m_contact  := UUID();

INSERT INTO menu_items
  (id, parent_id, type, page_id, location, section_id, icon, order_num, is_active, created_at, updated_at)
VALUES
  (@m_home,     NULL, 'custom', NULL, 'header', NULL, NULL, 10, 1, NOW(3), NOW(3)),
  (@m_services, NULL, 'custom', NULL, 'header', NULL, NULL, 20, 1, NOW(3), NOW(3)),
  (@m_work,     NULL, 'custom', NULL, 'header', NULL, NULL, 30, 1, NOW(3), NOW(3)),
  (@m_pricing,  NULL, 'custom', NULL, 'header', NULL, NULL, 40, 1, NOW(3), NOW(3)),
  (@m_blog,     NULL, 'custom', NULL, 'header', NULL, NULL, 50, 1, NOW(3), NOW(3)),
  (@m_contact,  NULL, 'custom', NULL, 'header', NULL, NULL, 60, 1, NOW(3), NOW(3));

-- -------------------------------------------------------------
-- Insert i18n rows
-- -------------------------------------------------------------
INSERT INTO menu_items_i18n
  (id, menu_item_id, locale, title, url, created_at, updated_at)
VALUES
  -- HOME
  (UUID(), @m_home, 'en', 'Home',      '/',         NOW(3), NOW(3)),
  (UUID(), @m_home, 'de', 'Startseite','/',         NOW(3), NOW(3)),
  (UUID(), @m_home, 'tr', 'Anasayfa',  '/',         NOW(3), NOW(3)),

  -- SERVICES
  (UUID(), @m_services, 'en', 'Services',   '/services', NOW(3), NOW(3)),
  (UUID(), @m_services, 'de', 'Leistungen', '/services', NOW(3), NOW(3)),
  (UUID(), @m_services, 'tr', 'Hizmetler',  '/services', NOW(3), NOW(3)),

  -- WORK / PORTFOLIO
  (UUID(), @m_work, 'en', 'Portfolio',  '/work', NOW(3), NOW(3)),
  (UUID(), @m_work, 'de', 'Portfolio',  '/work', NOW(3), NOW(3)),
  (UUID(), @m_work, 'tr', 'Referanslar','/work', NOW(3), NOW(3)),

  -- PRICING
  (UUID(), @m_pricing, 'en', 'Pricing',  '/pricing', NOW(3), NOW(3)),
  (UUID(), @m_pricing, 'de', 'Preise',   '/pricing', NOW(3), NOW(3)),
  (UUID(), @m_pricing, 'tr', 'Fiyatlar', '/pricing', NOW(3), NOW(3)),

  -- BLOG
  (UUID(), @m_blog, 'en', 'Blog', '/blog', NOW(3), NOW(3)),
  (UUID(), @m_blog, 'de', 'Blog', '/blog', NOW(3), NOW(3)),
  (UUID(), @m_blog, 'tr', 'Blog', '/blog', NOW(3), NOW(3)),

  -- CONTACT (hash)
  (UUID(), @m_contact, 'en', 'Contact', '/#contact', NOW(3), NOW(3)),
  (UUID(), @m_contact, 'de', 'Kontakt', '/#contact', NOW(3), NOW(3)),
  (UUID(), @m_contact, 'tr', 'İletişim','/#contact', NOW(3), NOW(3));

-- -------------------------------------------------------------
-- Footer menu items (sectioned)
-- -------------------------------------------------------------

SET @sec_quick    := '59583ef1-0ba1-4c7c-b806-84fd204b52b9';
SET @sec_services := 'a0e2b2a9-7f0d-4f30-9a64-3ed7bd1d3c10';
SET @sec_legal    := 'f942a930-6743-4ecc-b4b3-1fd6b77f9d77';

SET @f_home     := UUID();
SET @f_services := UUID();
SET @f_work     := UUID();
SET @f_pricing  := UUID();
SET @f_blog     := UUID();
SET @f_contact  := UUID();

SET @f_svc_uiux   := UUID();
SET @f_svc_mobile := UUID();
SET @f_svc_web    := UUID();

SET @f_legal_privacy := UUID();
SET @f_legal_kvkk    := UUID();
SET @f_legal_terms   := UUID();

INSERT INTO menu_items
  (id, parent_id, type, page_id, location, section_id, icon, order_num, is_active, created_at, updated_at)
VALUES
  -- Quick Access
  (@f_home,     NULL, 'custom', NULL, 'footer', @sec_quick, NULL, 10, 1, NOW(3), NOW(3)),
  (@f_services, NULL, 'custom', NULL, 'footer', @sec_quick, NULL, 20, 1, NOW(3), NOW(3)),
  (@f_work,     NULL, 'custom', NULL, 'footer', @sec_quick, NULL, 30, 1, NOW(3), NOW(3)),
  (@f_pricing,  NULL, 'custom', NULL, 'footer', @sec_quick, NULL, 40, 1, NOW(3), NOW(3)),
  (@f_blog,     NULL, 'custom', NULL, 'footer', @sec_quick, NULL, 50, 1, NOW(3), NOW(3)),
  (@f_contact,  NULL, 'custom', NULL, 'footer', @sec_quick, NULL, 60, 1, NOW(3), NOW(3)),

  -- Services
  (@f_svc_uiux,   NULL, 'custom', NULL, 'footer', @sec_services, NULL, 10, 1, NOW(3), NOW(3)),
  (@f_svc_mobile, NULL, 'custom', NULL, 'footer', @sec_services, NULL, 20, 1, NOW(3), NOW(3)),
  (@f_svc_web,    NULL, 'custom', NULL, 'footer', @sec_services, NULL, 30, 1, NOW(3), NOW(3)),

  -- Legal
  (@f_legal_privacy, NULL, 'custom', NULL, 'footer', @sec_legal, NULL, 10, 1, NOW(3), NOW(3)),
  (@f_legal_kvkk,    NULL, 'custom', NULL, 'footer', @sec_legal, NULL, 20, 1, NOW(3), NOW(3)),
  (@f_legal_terms,   NULL, 'custom', NULL, 'footer', @sec_legal, NULL, 30, 1, NOW(3), NOW(3));

INSERT INTO menu_items_i18n
  (id, menu_item_id, locale, title, url, created_at, updated_at)
VALUES
  -- Quick Access
  (UUID(), @f_home, 'en', 'Home',      '/',         NOW(3), NOW(3)),
  (UUID(), @f_home, 'de', 'Startseite','/',         NOW(3), NOW(3)),
  (UUID(), @f_home, 'tr', 'Anasayfa',  '/',         NOW(3), NOW(3)),

  (UUID(), @f_services, 'en', 'Services',   '/services', NOW(3), NOW(3)),
  (UUID(), @f_services, 'de', 'Leistungen', '/services', NOW(3), NOW(3)),
  (UUID(), @f_services, 'tr', 'Hizmetler',  '/services', NOW(3), NOW(3)),

  (UUID(), @f_work, 'en', 'Portfolio',   '/work', NOW(3), NOW(3)),
  (UUID(), @f_work, 'de', 'Portfolio',   '/work', NOW(3), NOW(3)),
  (UUID(), @f_work, 'tr', 'Referanslar', '/work', NOW(3), NOW(3)),

  (UUID(), @f_pricing, 'en', 'Pricing',  '/pricing', NOW(3), NOW(3)),
  (UUID(), @f_pricing, 'de', 'Preise',   '/pricing', NOW(3), NOW(3)),
  (UUID(), @f_pricing, 'tr', 'Fiyatlar', '/pricing', NOW(3), NOW(3)),

  (UUID(), @f_blog, 'en', 'Blog', '/blog', NOW(3), NOW(3)),
  (UUID(), @f_blog, 'de', 'Blog', '/blog', NOW(3), NOW(3)),
  (UUID(), @f_blog, 'tr', 'Blog', '/blog', NOW(3), NOW(3)),

  (UUID(), @f_contact, 'en', 'Contact', '/#contact', NOW(3), NOW(3)),
  (UUID(), @f_contact, 'de', 'Kontakt', '/#contact', NOW(3), NOW(3)),
  (UUID(), @f_contact, 'tr', 'İletişim','/#contact', NOW(3), NOW(3)),

  -- Services
  (UUID(), @f_svc_uiux, 'en', 'UI/UX Design', '/services/ui-ux-design', NOW(3), NOW(3)),
  (UUID(), @f_svc_uiux, 'de', 'UI/UX Design', '/services/ui-ux-design', NOW(3), NOW(3)),
  (UUID(), @f_svc_uiux, 'tr', 'UI/UX Tasarım', '/services/ui-ux-tasarim', NOW(3), NOW(3)),

  (UUID(), @f_svc_mobile, 'en', 'Mobile App Design', '/services/mobile-app-design', NOW(3), NOW(3)),
  (UUID(), @f_svc_mobile, 'de', 'Mobile App Design', '/services/mobile-app-design', NOW(3), NOW(3)),
  (UUID(), @f_svc_mobile, 'tr', 'Mobil Uygulama Tasarım', '/services/mobil-uygulama-tasarim', NOW(3), NOW(3)),

  (UUID(), @f_svc_web, 'en', 'Web Development', '/services/web-development', NOW(3), NOW(3)),
  (UUID(), @f_svc_web, 'de', 'Web Development', '/services/web-development', NOW(3), NOW(3)),
  (UUID(), @f_svc_web, 'tr', 'Web Geliştirme', '/services/web-gelistirme', NOW(3), NOW(3)),

  -- Legal / Policy
  (UUID(), @f_legal_privacy, 'en', 'Privacy Policy', '/custompages/policy/privacy-policy', NOW(3), NOW(3)),
  (UUID(), @f_legal_privacy, 'de', 'Datenschutzrichtlinie', '/custompages/policy/datenschutz', NOW(3), NOW(3)),
  (UUID(), @f_legal_privacy, 'tr', 'Gizlilik Politikası', '/custompages/policy/gizlilik-politikasi', NOW(3), NOW(3)),

  (UUID(), @f_legal_kvkk, 'en', 'KVKK / Data Protection', '/custompages/policy/kvkk', NOW(3), NOW(3)),
  (UUID(), @f_legal_kvkk, 'de', 'KVKK / Datenschutz', '/custompages/policy/kvkk', NOW(3), NOW(3)),
  (UUID(), @f_legal_kvkk, 'tr', 'KVKK Aydınlatma', '/custompages/policy/kvkk', NOW(3), NOW(3)),

  (UUID(), @f_legal_terms, 'en', 'Terms & Conditions', '/custompages/policy/terms-and-conditions', NOW(3), NOW(3)),
  (UUID(), @f_legal_terms, 'de', 'Nutzungsbedingungen', '/custompages/policy/nutzungsbedingungen', NOW(3), NOW(3)),
  (UUID(), @f_legal_terms, 'tr', 'Kullanım Şartları', '/custompages/policy/kullanim-sartlari', NOW(3), NOW(3));

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
