-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler/Orhanguezel
-- Generated at 2026-03-11T20:44:39.075Z
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

START TRANSACTION;

SET @r1 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r1,'experience',1,10,'2025-01-01',NULL,1,'Grevenbroich, Germany','Orhan Guzel',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r1,'en','Full-Stack Developer','Current focus','Next.js · Laravel · Fastify · Flutter — from API to mobile',CAST('["Laravel","Next.js","Flutter","Multi-project delivery"]' AS CHAR),'full-stack-developer-current-focus',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r1,'tr','Full-Stack Developer','Current focus','Next.js · Laravel · Fastify · Flutter — from API to mobile',CAST('["Laravel","Next.js","Flutter","Multi-project delivery"]' AS CHAR),'full-stack-developer-current-focus',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r1,'de','Full-Stack Developer','Current focus','Next.js · Laravel · Fastify · Flutter — from API to mobile',CAST('["Laravel","Next.js","Flutter","Multi-project delivery"]' AS CHAR),'full-stack-developer-current-focus',NOW(3),NOW(3));

SET @r2 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r2,'experience',1,20,'2025-01-01',NULL,1,'Remote / Germany','QuickEcommerce',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r2,'en','QuickEcommerce','Enterprise E-Commerce Platform','Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',CAST('["Laravel","PHP","Next.js","React","TypeScript"]' AS CHAR),'quickecommerce-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r2,'tr','QuickEcommerce','Enterprise E-Commerce Platform','Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',CAST('["Laravel","PHP","Next.js","React","TypeScript"]' AS CHAR),'quickecommerce-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r2,'de','QuickEcommerce','Enterprise E-Commerce Platform','Enterprise e-commerce platform with Laravel backend, Next.js web apps, Flutter mobile app and multi-store marketplace workflows.',CAST('["Laravel","PHP","Next.js","React","TypeScript"]' AS CHAR),'quickecommerce-experience',NOW(3),NOW(3));

SET @r3 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r3,'experience',1,30,'2025-01-01',NULL,1,'Remote / Germany','Ensotek',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r3,'en','Ensotek','B2B Cooling Tower Platform','B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.',CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'ensotek-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r3,'tr','Ensotek','B2B Cooling Tower Platform','B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.',CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'ensotek-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r3,'de','Ensotek','B2B Cooling Tower Platform','B2B platform for cooling tower solutions with multilingual frontend variants, catalog management, customer document flows and Fastify backend.',CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'ensotek-experience',NOW(3),NOW(3));

SET @r4 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r4,'experience',1,40,'2025-01-01',NULL,1,'Remote / Germany','Konig Massage',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'en','Konig Massage','Booking Platform','Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.',CAST('["Next.js","React","TypeScript","Tailwind CSS","Fastify"]' AS CHAR),'konig-massage-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'tr','Konig Massage','Booking Platform','Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.',CAST('["Next.js","React","TypeScript","Tailwind CSS","Fastify"]' AS CHAR),'konig-massage-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'de','Konig Massage','Booking Platform','Multi-language massage and wellness booking platform with customer site, admin panel and Fastify backend.',CAST('["Next.js","React","TypeScript","Tailwind CSS","Fastify"]' AS CHAR),'konig-massage-experience',NOW(3),NOW(3));

SET @r5 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r5,'experience',1,50,'2026-01-01',NULL,1,'Remote / Germany','Paspas ERP',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r5,'en','Paspas ERP','Production Planning ERP','Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'paspas-erp-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r5,'tr','Paspas ERP','Production Planning ERP','Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'paspas-erp-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r5,'de','Paspas ERP','Production Planning ERP','Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'paspas-erp-experience',NOW(3),NOW(3));

SET @r6 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r6,'experience',1,60,'2025-01-01',NULL,1,'Remote / Germany','Tarifin Tarifi',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'en','Tarifin Tarifi','AI-Powered Recipe Platform','AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.',CAST('["Next.js","TypeScript","Redux Toolkit","Styled Components","next-intl"]' AS CHAR),'tarifin-tarifi-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'tr','Tarifin Tarifi','AI-Powered Recipe Platform','AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.',CAST('["Next.js","TypeScript","Redux Toolkit","Styled Components","next-intl"]' AS CHAR),'tarifin-tarifi-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'de','Tarifin Tarifi','AI-Powered Recipe Platform','AI-powered multi-language recipe discovery and sharing platform with Groq LLM integration, reCAPTCHA spam protection and Express/MongoDB backend.',CAST('["Next.js","TypeScript","Redux Toolkit","Styled Components","next-intl"]' AS CHAR),'tarifin-tarifi-experience',NOW(3),NOW(3));

SET @r7 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r7,'experience',1,70,'2025-01-01',NULL,1,'Remote / Germany','Kaman Social',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'en','Kaman Social','Social Media Management System','Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.',CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun"]' AS CHAR),'kaman-social-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'tr','Kaman Social','Social Media Management System','Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.',CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun"]' AS CHAR),'kaman-social-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'de','Kaman Social','Social Media Management System','Social media management system with monorepo architecture, Fastify backend, Next.js dashboard and scheduled job processing.',CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun"]' AS CHAR),'kaman-social-experience',NOW(3),NOW(3));

SET @r8 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r8,'education',1,100,'2024-01-01','2024-12-31',0,'Germany','FbW',5,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r8,'en','Web Development Certification','FbW Weiterbildung','Career materials repository includes current certificates and portfolio-aligned training artifacts.',CAST('["Web development training","Career documentation","Portfolio-aligned learning path"]' AS CHAR),'web-development-certification',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r8,'tr','Web Development Certification','FbW Weiterbildung','Career materials repository includes current certificates and portfolio-aligned training artifacts.',CAST('["Web development training","Career documentation","Portfolio-aligned learning path"]' AS CHAR),'web-development-certification',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r8,'de','Web Development Certification','FbW Weiterbildung','Career materials repository includes current certificates and portfolio-aligned training artifacts.',CAST('["Web development training","Career documentation","Portfolio-aligned learning path"]' AS CHAR),'web-development-certification',NOW(3),NOW(3));

COMMIT;
