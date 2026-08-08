-- =============================================================
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/014_menu_items_schema.sql
-- Gerekce : Menu semasi hedefte var; icindeki TR menu kayitlari gerekli
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- =============================================================
-- 014 — menu_items + menu_items_i18n (shared-backend / public API)
-- =============================================================

SET NAMES utf8mb4;

SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;

SET FOREIGN_KEY_CHECKS = 1;

-- ─── Header menu (2026-07-10: canli yayin sonrasi eksik bulundu — nav bos render oluyordu) ───
INSERT INTO `menu_items` (`id`,`parent_id`,`type`,`page_id`,`location`,`section_id`,`icon`,`order_num`,`is_active`) VALUES
  ('90000200-0000-4000-8000-000000000001',NULL,'custom',NULL,'header',NULL,NULL,10,1),
  ('90000200-0000-4000-8000-000000000002',NULL,'custom',NULL,'header',NULL,NULL,20,1),
  ('90000200-0000-4000-8000-000000000003',NULL,'custom',NULL,'header',NULL,NULL,30,1),
  ('90000200-0000-4000-8000-000000000004',NULL,'custom',NULL,'header',NULL,NULL,40,1),
  ('90000200-0000-4000-8000-000000000005',NULL,'custom',NULL,'header',NULL,NULL,50,1),
  ('90000200-0000-4000-8000-000000000006',NULL,'custom',NULL,'header',NULL,NULL,60,1)
ON DUPLICATE KEY UPDATE `location`=VALUES(`location`),`order_num`=VALUES(`order_num`),`is_active`=VALUES(`is_active`);

INSERT INTO `menu_items_i18n` (`id`,`menu_item_id`,`locale`,`title`,`url`) VALUES
('90000210-0000-4000-8000-000000000001','90000200-0000-4000-8000-000000000001','tr','Hizmetler','/hizmetler'),
('90000210-0000-4000-8000-000000000002','90000200-0000-4000-8000-000000000002','tr','Paketler','/paketler'),
('90000210-0000-4000-8000-000000000003','90000200-0000-4000-8000-000000000003','tr','Ürünler','/urunler'),
('90000210-0000-4000-8000-000000000004','90000200-0000-4000-8000-000000000004','tr','Portfolyo','/portfolyo'),
('90000210-0000-4000-8000-000000000005','90000200-0000-4000-8000-000000000005','tr','Blog','/blog'),
('90000210-0000-4000-8000-000000000006','90000200-0000-4000-8000-000000000006','tr','Hakkımızda','/hakkimizda'),
('90000220-0000-4000-8000-000000000001','90000200-0000-4000-8000-000000000001','en','Services','/services'),
('90000220-0000-4000-8000-000000000002','90000200-0000-4000-8000-000000000002','en','Pricing','/pricing'),
('90000220-0000-4000-8000-000000000003','90000200-0000-4000-8000-000000000003','en','Products','/products'),
('90000220-0000-4000-8000-000000000004','90000200-0000-4000-8000-000000000004','en','Portfolio','/portfolio'),
('90000220-0000-4000-8000-000000000005','90000200-0000-4000-8000-000000000005','en','Blog','/blog'),
('90000220-0000-4000-8000-000000000006','90000200-0000-4000-8000-000000000006','en','About','/about')
ON DUPLICATE KEY UPDATE `title`=VALUES(`title`),`url`=VALUES(`url`);
