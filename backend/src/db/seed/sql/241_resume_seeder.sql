-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler/vps-guezel/Orhanguezel
-- Generated at 2026-04-06T18:12:50.928Z
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

START TRANSACTION;

SET @r1 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r1,'experience',1,10,'2025-01-01',NULL,1,'Grevenbroich','Orhan Guzel',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r1,'en','Full-Stack Developer','Current focus','Building Turkey''s most comprehensive Agricultural Digital Ecosystem — from seed catalog to AI',CAST('["Laravel","Next.js","Flutter","Multi-project delivery"]' AS CHAR),'full-stack-developer-current-focus',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r1,'tr','Full-Stack Developer','Current focus','Building Turkey''s most comprehensive Agricultural Digital Ecosystem — from seed catalog to AI',CAST('["Laravel","Next.js","Flutter","Multi-project delivery"]' AS CHAR),'full-stack-developer-current-focus',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r1,'de','Full-Stack Developer','Current focus','Building Turkey''s most comprehensive Agricultural Digital Ecosystem — from seed catalog to AI',CAST('["Laravel","Next.js","Flutter","Multi-project delivery"]' AS CHAR),'full-stack-developer-current-focus',NOW(3),NOW(3));

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
(@r4,'experience',1,40,'2025-06-01',NULL,1,'Remote / Germany','Karbonkompozit',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'en','Karbonkompozit','CORPORATE WEBSITE','MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'karbonkompozit-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'tr','Karbonkompozit','CORPORATE WEBSITE','MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'karbonkompozit-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'de','Karbonkompozit','CORPORATE WEBSITE','MOE Kompozit markasi icin gelistirilen Next.js tabanli kurumsal tanitim ve teklif toplama platformu. TR/EN cok dilli yapi, teknik SEO altyapisi, urun katalogu, galeri, blog ve iletisim/teklif formu.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'karbonkompozit-experience',NOW(3),NOW(3));

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
(@r6,'experience',1,60,'2025-01-01',NULL,1,'Remote / Germany','Vista İnşaat',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'en','Vista Insaat','CORPORATE WEBSITE','İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'vista-insaat-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'tr','Vista Insaat','CORPORATE WEBSITE','İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'vista-insaat-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'de','Vista Insaat','CORPORATE WEBSITE','İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'vista-insaat-experience',NOW(3),NOW(3));

SET @r7 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r7,'experience',1,70,'2026-03-01','2026-03-12',0,'Remote / Germany','PaketJet',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'en','PaketJet','Logistics & Delivery Platform','P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',CAST('["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8"]' AS CHAR),'paketjet-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'tr','PaketJet','Logistics & Delivery Platform','P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',CAST('["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8"]' AS CHAR),'paketjet-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'de','PaketJet','Logistics & Delivery Platform','P2P cargo freight marketplace — carriers post route & capacity listings, customers book cargo space. BlaBlaCar model applied to freight logistics.',CAST('["TypeScript","Next.js 15","React 19","Fastify v5","MySQL 8"]' AS CHAR),'paketjet-experience',NOW(3),NOW(3));

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
