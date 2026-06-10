-- AUTO-GENERATED FILE. Source: /home/orhan/Documents/Projeler/vps-guezel/Orhanguezel
-- Generated at 2026-06-09T23:37:13.765Z
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
(UUID(),@r3,'en','Ensotek','B2B Cooling Tower Platform','B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.',CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'ensotek-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r3,'tr','Ensotek','B2B Cooling Tower Platform','B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.',CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'ensotek-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r3,'de','Ensotek','B2B Cooling Tower Platform','B2B cooling tower platform family — a poly-repo workspace of multiple site projects (ensotek.de, ensotek.com.tr, karbonkompozit.com.tr, kuhlturm.com) sharing common backend/UI packages, each with its own repository and database.',CAST('["Next.js","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'ensotek-experience',NOW(3),NOW(3));

SET @r4 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r4,'experience',1,40,'2026-01-01',NULL,1,'Remote / Germany','Paspas ERP',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'en','Paspas ERP','Production Planning ERP','Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'paspas-erp-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'tr','Paspas ERP','Production Planning ERP','Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'paspas-erp-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r4,'de','Paspas ERP','Production Planning ERP','Production planning and operations ERP workspace with Bun backend and Next.js admin panel.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'paspas-erp-experience',NOW(3),NOW(3));

SET @r5 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r5,'experience',1,50,'2025-01-01',NULL,1,'Remote / Germany','Vista İnşaat',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r5,'en','Vista Insaat','CORPORATE WEBSITE','İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'vista-insaat-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r5,'tr','Vista Insaat','CORPORATE WEBSITE','İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'vista-insaat-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r5,'de','Vista Insaat','CORPORATE WEBSITE','İnşaat ve proje geliştirme sektöründe faaliyet gösteren Vista İnşaat firması için geliştirilen Next.js tabanlı kurumsal tanıtım ve müşteri kazanım platformu. TR/EN çok dilli yapı, proje galerisi, blog, iletişim/teklif formu ve teknik SEO altyapısı içermektedir.',CAST('["Next.js","TypeScript","Tailwind CSS","next-intl","React Query"]' AS CHAR),'vista-insaat-experience',NOW(3),NOW(3));

SET @r6 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r6,'experience',1,60,'2026-05-22',NULL,1,'Remote / Germany','SUNPLEX Üretim Yönetim Sistemi',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'en','SUNPLEX Üretim Yönetim Sistemi','Stoğa Üretim ERP','Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'sunplex-uretim-yonetim-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'tr','SUNPLEX Üretim Yönetim Sistemi','Stoğa Üretim ERP','Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'sunplex-uretim-yonetim-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r6,'de','SUNPLEX Üretim Yönetim Sistemi','Stoğa Üretim ERP','Stoğa üretim yapan plastik enjeksiyon fabrikası için üretim yönetim sistemi; Logo Wings ERP ve makine veri entegrasyonları ile.',CAST('["Bun","TypeScript","Fastify","Drizzle ORM","MySQL"]' AS CHAR),'sunplex-uretim-yonetim-experience',NOW(3),NOW(3));

SET @r7 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@r7,'experience',1,70,'2025-01-01',NULL,1,'Remote / Germany','Ekosistem Sosyal Medya',NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'en','Ekosistem Sosyal Medya','Tarım Ekosistemi Sosyal Medya Yönetim Platformu','Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.',CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun"]' AS CHAR),'ekosistem-sosyal-medya-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'tr','Ekosistem Sosyal Medya','Tarım Ekosistemi Sosyal Medya Yönetim Platformu','Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.',CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun"]' AS CHAR),'ekosistem-sosyal-medya-experience',NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@r7,'de','Ekosistem Sosyal Medya','Tarım Ekosistemi Sosyal Medya Yönetim Platformu','Tarım Dijital Ekosistemi''nin tüm markaları için merkezi sosyal medya yönetim platformu. Facebook, Instagram, LinkedIn, X ve Telegram kanallarına zamanlanmış içerik yayını, AI destekli içerik üretimi, analitik takip ve çoklu proje (bereketfide, vistaseed, tarimansiklopedisi vb.) hesap yönetimi.',CAST('["TypeScript","Fastify","Drizzle ORM","MySQL","Bun"]' AS CHAR),'ekosistem-sosyal-medya-experience',NOW(3),NOW(3));

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
