-- =============================================================
-- 253_brand_seeder.sql  (seed)
-- Brand logos seed — TR + EN + DE
-- - Uses UUID() for ids (not stable)
-- - image_url filled with existing static asset paths
-- - image_asset_id left NULL by default (storage optional)
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

START TRANSACTION;

-- LOGO #1
SET @b1 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b1,'right','/assets/imgs/brands/brands-1/logo-1.png',NULL,1,10,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b1,'en','Brand 1',NOW(3),NOW(3)),
(UUID(),@b1,'de','Marke 1',NOW(3),NOW(3)),
(UUID(),@b1,'tr','Marka 1',NOW(3),NOW(3));

-- LOGO #2
SET @b2 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b2,'right','/assets/imgs/brands/brands-1/logo-2.png',NULL,1,20,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b2,'en','Brand 2',NOW(3),NOW(3)),
(UUID(),@b2,'de','Marke 2',NOW(3),NOW(3)),
(UUID(),@b2,'tr','Marka 2',NOW(3),NOW(3));

-- LOGO #3
SET @b3 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b3,'right','/assets/imgs/brands/brands-1/logo-3.png',NULL,1,30,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b3,'en','Brand 3',NOW(3),NOW(3)),
(UUID(),@b3,'de','Marke 3',NOW(3),NOW(3)),
(UUID(),@b3,'tr','Marka 3',NOW(3),NOW(3));

-- LOGO #4
SET @b4 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b4,'right','/assets/imgs/brands/brands-1/logo-4.png',NULL,1,40,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b4,'en','Brand 4',NOW(3),NOW(3)),
(UUID(),@b4,'de','Marke 4',NOW(3),NOW(3)),
(UUID(),@b4,'tr','Marka 4',NOW(3),NOW(3));

-- LOGO #5
SET @b5 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b5,'right','/assets/imgs/brands/brands-1/logo-5.png',NULL,1,50,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b5,'en','Brand 5',NOW(3),NOW(3)),
(UUID(),@b5,'de','Marke 5',NOW(3),NOW(3)),
(UUID(),@b5,'tr','Marka 5',NOW(3),NOW(3));

-- LOGO #6
SET @b6 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b6,'right','/assets/imgs/brands/brands-1/logo-6.png',NULL,1,60,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b6,'en','Brand 6',NOW(3),NOW(3)),
(UUID(),@b6,'de','Marke 6',NOW(3),NOW(3)),
(UUID(),@b6,'tr','Marka 6',NOW(3),NOW(3));

-- LOGO #7
SET @b7 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b7,'right','/assets/imgs/brands/brands-1/logo-7.png',NULL,1,70,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b7,'en','Brand 7',NOW(3),NOW(3)),
(UUID(),@b7,'de','Marke 7',NOW(3),NOW(3)),
(UUID(),@b7,'tr','Marka 7',NOW(3),NOW(3));

-- LOGO #8
SET @b8 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b8,'right','/assets/imgs/brands/brands-1/logo-8.png',NULL,1,80,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b8,'en','Brand 8',NOW(3),NOW(3)),
(UUID(),@b8,'de','Marke 8',NOW(3),NOW(3)),
(UUID(),@b8,'tr','Marka 8',NOW(3),NOW(3));

-- LOGO #9
SET @b9 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b9,'right','/assets/imgs/brands/brands-1/logo-9.png',NULL,1,90,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b9,'en','Brand 9',NOW(3),NOW(3)),
(UUID(),@b9,'de','Marke 9',NOW(3),NOW(3)),
(UUID(),@b9,'tr','Marka 9',NOW(3),NOW(3));

-- LOGO #10
SET @b10 := UUID();
INSERT INTO `brand_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@b10,'right','/assets/imgs/brands/brands-1/logo-10.png',NULL,1,100,NOW(3),NOW(3));
INSERT INTO `brand_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@b10,'en','Brand 10',NOW(3),NOW(3)),
(UUID(),@b10,'de','Marke 10',NOW(3),NOW(3)),
(UUID(),@b10,'tr','Marka 10',NOW(3),NOW(3));

COMMIT;
