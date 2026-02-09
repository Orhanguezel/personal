-- =============================================================
-- 261_skill_seeder.sql  (seed)
-- Skills seed — counters + logos (TR + EN + DE)
-- - Uses UUID() for ids (not stable)
-- - No DROP/CREATE
-- - image_url filled with existing static asset paths (you can switch to storage later)
-- - image_asset_id left NULL by default (storage optional)
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- SKILL COUNTERS (Skills1) — percent + icon (Figma, Adobe XD, ...)
-- Using the same icons you already have on frontend:
-- /assets/imgs/skills/skills-1/icon-1.png ...
-- =============================================================

-- COUNTER #1: Figma (98)
SET @c1 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c1,98,'/assets/imgs/skills/skills-1/icon-1.png',NULL,1,10,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c1,'en','Figma','figma',NOW(3),NOW(3)),
(UUID(),@c1,'de','Figma','figma',NOW(3),NOW(3)),
(UUID(),@c1,'tr','Figma','figma',NOW(3),NOW(3));

-- COUNTER #2: Adobe XD (82)
SET @c2 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c2,82,'/assets/imgs/skills/skills-1/icon-2.png',NULL,1,20,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c2,'en','Adobe XD','adobe-xd',NOW(3),NOW(3)),
(UUID(),@c2,'de','Adobe XD','adobe-xd',NOW(3),NOW(3)),
(UUID(),@c2,'tr','Adobe XD','adobe-xd',NOW(3),NOW(3));

-- COUNTER #3: Illustrator (76)
SET @c3 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c3,76,'/assets/imgs/skills/skills-1/icon-3.png',NULL,1,30,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c3,'en','Illustrator','illustrator',NOW(3),NOW(3)),
(UUID(),@c3,'de','Illustrator','illustrator',NOW(3),NOW(3)),
(UUID(),@c3,'tr','Illustrator','illustrator',NOW(3),NOW(3));

-- COUNTER #4: Sketch (58)
SET @c4 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c4,58,'/assets/imgs/skills/skills-1/icon-4.png',NULL,1,40,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c4,'en','Sketch','sketch',NOW(3),NOW(3)),
(UUID(),@c4,'de','Sketch','sketch',NOW(3),NOW(3)),
(UUID(),@c4,'tr','Sketch','sketch',NOW(3),NOW(3));

-- COUNTER #5: Photoshop (60)
SET @c5 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c5,60,'/assets/imgs/skills/skills-1/icon-5.png',NULL,1,50,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c5,'en','Photoshop','photoshop',NOW(3),NOW(3)),
(UUID(),@c5,'de','Photoshop','photoshop',NOW(3),NOW(3)),
(UUID(),@c5,'tr','Photoshop','photoshop',NOW(3),NOW(3));

-- COUNTER #6: Webflow (72)
SET @c6 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c6,72,'/assets/imgs/skills/skills-1/icon-6.png',NULL,1,60,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c6,'en','Webflow','webflow',NOW(3),NOW(3)),
(UUID(),@c6,'de','Webflow','webflow',NOW(3),NOW(3)),
(UUID(),@c6,'tr','Webflow','webflow',NOW(3),NOW(3));

-- COUNTER #7: Framer (93)
SET @c7 := UUID();
INSERT INTO `skill_counters`
(`id`,`percent`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@c7,93,'/assets/imgs/skills/skills-1/icon-7.png',NULL,1,70,NOW(3),NOW(3));

INSERT INTO `skill_counters_i18n`
(`id`,`counter_id`,`locale`,`title`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@c7,'en','Framer','framer',NOW(3),NOW(3)),
(UUID(),@c7,'de','Framer','framer',NOW(3),NOW(3)),
(UUID(),@c7,'tr','Framer','framer',NOW(3),NOW(3));

-- =============================================================
-- SKILL LOGOS (Skills2 Marquee) — track left/right + tooltip label
-- Using your existing svg icons:
-- assets/imgs/home-page-2/hero-1/icon-*.svg
-- =============================================================

-- RIGHT TRACK: NodeJS, NextJS, Firebase, MongoDB, React
SET @r1 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@r1,'right','assets/imgs/home-page-2/hero-1/icon-4.svg',NULL,1,10,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@r1,'en','NodeJS',NOW(3),NOW(3)),
(UUID(),@r1,'de','NodeJS',NOW(3),NOW(3)),
(UUID(),@r1,'tr','NodeJS',NOW(3),NOW(3));

SET @r2 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@r2,'right','assets/imgs/home-page-2/hero-1/icon-1.svg',NULL,1,20,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@r2,'en','NextJS',NOW(3),NOW(3)),
(UUID(),@r2,'de','NextJS',NOW(3),NOW(3)),
(UUID(),@r2,'tr','NextJS',NOW(3),NOW(3));

SET @r3 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@r3,'right','assets/imgs/home-page-2/hero-1/icon-2.svg',NULL,1,30,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@r3,'en','Firebase',NOW(3),NOW(3)),
(UUID(),@r3,'de','Firebase',NOW(3),NOW(3)),
(UUID(),@r3,'tr','Firebase',NOW(3),NOW(3));

SET @r4 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@r4,'right','assets/imgs/home-page-2/hero-1/icon-3.svg',NULL,1,40,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@r4,'en','MongoDB',NOW(3),NOW(3)),
(UUID(),@r4,'de','MongoDB',NOW(3),NOW(3)),
(UUID(),@r4,'tr','MongoDB',NOW(3),NOW(3));

SET @r5 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@r5,'right','assets/imgs/home-page-2/hero-1/icon-6.svg',NULL,1,50,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@r5,'en','React',NOW(3),NOW(3)),
(UUID(),@r5,'de','React',NOW(3),NOW(3)),
(UUID(),@r5,'tr','React',NOW(3),NOW(3));

-- LEFT TRACK: VueJS, Angular, Laravel, Tailwind
SET @l1 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@l1,'left','assets/imgs/home-page-2/hero-1/icon-7.svg',NULL,1,10,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@l1,'en','VueJS',NOW(3),NOW(3)),
(UUID(),@l1,'de','VueJS',NOW(3),NOW(3)),
(UUID(),@l1,'tr','VueJS',NOW(3),NOW(3));

SET @l2 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@l2,'left','assets/imgs/home-page-2/hero-1/icon-8.svg',NULL,1,20,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@l2,'en','Angular',NOW(3),NOW(3)),
(UUID(),@l2,'de','Angular',NOW(3),NOW(3)),
(UUID(),@l2,'tr','Angular',NOW(3),NOW(3));

SET @l3 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@l3,'left','assets/imgs/home-page-2/hero-1/icon-9.svg',NULL,1,30,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@l3,'en','Laravel',NOW(3),NOW(3)),
(UUID(),@l3,'de','Laravel',NOW(3),NOW(3)),
(UUID(),@l3,'tr','Laravel',NOW(3),NOW(3));

SET @l4 := UUID();
INSERT INTO `skill_logos`
(`id`,`track`,`image_url`,`image_asset_id`,`is_active`,`display_order`,`created_at`,`updated_at`)
VALUES
(@l4,'left','assets/imgs/home-page-2/hero-1/icon-5.svg',NULL,1,40,NOW(3),NOW(3));
INSERT INTO `skill_logos_i18n` (`id`,`logo_id`,`locale`,`label`,`created_at`,`updated_at`) VALUES
(UUID(),@l4,'en','Tailwind',NOW(3),NOW(3)),
(UUID(),@l4,'de','Tailwind',NOW(3),NOW(3)),
(UUID(),@l4,'tr','Tailwind',NOW(3),NOW(3));

COMMIT;
