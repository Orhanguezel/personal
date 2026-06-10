-- =============================================================
-- FILE: 231_pricing_schema_seeder.sql
-- FINAL — Pricing seed (3 active plans + 3 draft maintenance plans) — module: pricing_plans (+ i18n TR/EN/DE)
-- Plans:
--   - basic
--   - professional
--   - business
--   - maintenance-basic (draft)
--   - maintenance-standard (draft)
--   - maintenance-premium (draft)
-- Notes:
--   - features: LONGTEXT JSON-string array
--   - created_at/updated_at: NOW(3)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- -------------------------------------------------------------
-- Helpers
-- -------------------------------------------------------------
SET @T := NOW(3);

-- -------------------------------------------------------------
-- PLAN #1: BASIC
-- -------------------------------------------------------------
SET @P1 := UUID();

INSERT INTO `pricing_plans`
(`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
(@P1,'basic','49.00','hour','USD',1,0,10,'/contact',@T,@T);

INSERT INTO `pricing_plans_i18n`
(`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
(UUID(),@P1,'en','Basic','Starter plan for small tasks',
 'Best for quick UI tweaks, landing pages, and small fixes.',
 '["Wireframe required (provided by you)","Design in Figma / Framer","Development: Webflow / React / WordPress / Laravel","Remote collaboration","Business days (no weekends)","6 months support"]',
 'Order Now','/contact',@T,@T),
(UUID(),@P1,'tr','Temel','Küçük işler için başlangıç paketi',
 'Hızlı UI düzenlemeleri, landing page ve küçük geliştirmeler için ideal.',
 '["Wireframe gerekli (siz sağlarsınız)","Figma / Framer ile tasarım","Geliştirme: Webflow / React / WordPress / Laravel","Uzaktan çalışma","Hafta içi müsaitlik (hafta sonu yok)","6 ay destek"]',
 'Teklif Al','/contact',@T,@T),
(UUID(),@P1,'de','Basis','Starter-Paket für kleine Aufgaben',
 'Ideal für schnelle UI-Anpassungen, Landingpages und kleine Fixes.',
 '["Wireframe erforderlich (von Ihnen bereitgestellt)","Design in Figma / Framer","Development: Webflow / React / WordPress / Laravel","Remote-Zusammenarbeit","Werktags verfügbar (keine Wochenenden)","6 Monate Support"]',
 'Anfragen','/contact',@T,@T);

-- -------------------------------------------------------------
-- PLAN #2: PROFESSIONAL
-- -------------------------------------------------------------
SET @P2 := UUID();

INSERT INTO `pricing_plans`
(`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
(@P2,'professional','79.00','hour','USD',1,0,20,'/contact',@T,@T);

INSERT INTO `pricing_plans_i18n`
(`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
(UUID(),@P2,'en','Professional','For growing products & feature work',
 'Great for end-to-end feature delivery with clean architecture and performance focus.',
 '["Wireframe optional (we can define flows together)","Design in Figma / Framer","Implementation: Next.js / React / Laravel / Node","API integration + basic SEO","Weekly progress updates","Priority support (response within 24h)","9 months support"]',
 'Order Now','/contact',@T,@T),
(UUID(),@P2,'tr','Profesyonel','Büyüyen ürünler ve feature geliştirme',
 'Temiz mimari ve performans odağıyla uçtan uca feature teslimi için ideal.',
 '["Wireframe opsiyonel (akışları birlikte çıkarabiliriz)","Figma / Framer ile tasarım","Geliştirme: Next.js / React / Laravel / Node","API entegrasyonu + temel SEO","Haftalık ilerleme raporu","Öncelikli destek (24 saat içinde dönüş)","9 ay destek"]',
 'Teklif Al','/contact',@T,@T),
(UUID(),@P2,'de','Professionell','Für wachsende Produkte & Features',
 'Ideal für End-to-End Feature-Delivery mit sauberer Architektur und Performance-Fokus.',
 '["Wireframe optional (Flows gemeinsam definieren)","Design in Figma / Framer","Umsetzung: Next.js / React / Laravel / Node","API-Integration + Basis-SEO","Wöchentliche Status-Updates","Priorisierter Support (Antwort innerhalb 24h)","9 Monate Support"]',
 'Anfragen','/contact',@T,@T);

-- -------------------------------------------------------------
-- PLAN #3: BUSINESS
-- -------------------------------------------------------------
SET @P3 := UUID();

INSERT INTO `pricing_plans`
(`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
(@P3,'business','99.00','hour','USD',1,0,30,'/contact',@T,@T);

INSERT INTO `pricing_plans_i18n`
(`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
(UUID(),@P3,'en','Business','Priority delivery for business-critical work',
 'Best for production systems, multi-module work, and ongoing improvements.',
 '["No wireframe needed (we handle discovery)","Design in Figma / Framer","Development: Next.js / React / Laravel / Node","Performance + security hardening checklist","Code reviews + release support","Your project is a priority","Customer care extras included","12 months support"]',
 'Order Now','/contact',@T,@T),
(UUID(),@P3,'tr','Ticari','İş kritik projeler için öncelikli teslim',
 'Prod sistemler, çok modüllü işler ve sürekli iyileştirmeler için en iyi seçenek.',
 '["Wireframe gerekmez (keşfi biz yönetiriz)","Figma / Framer ile tasarım","Geliştirme: Next.js / React / Laravel / Node","Performans + güvenlik hardening checklist","Code review + release desteği","Projeniz her zaman önceliklidir","Müşteri bakım hediyeleri dahil","12 ay destek"]',
 'Teklif Al','/contact',@T,@T),
(UUID(),@P3,'de','Business','Priorität für geschäftskritische Projekte',
 'Ideal für produktive Systeme, mehrere Module und kontinuierliche Optimierung.',
 '["Kein Wireframe nötig (Discovery inklusive)","Design in Figma / Framer","Development: Next.js / React / Laravel / Node","Performance + Security Hardening Checkliste","Code Reviews + Release-Support","Ihr Projekt hat Priorität","Customer-Care Extras inklusive","12 Monate Support"]',
 'Anfragen','/contact',@T,@T);

-- -------------------------------------------------------------
-- DRAFT MAINTENANCE PLANS
-- -------------------------------------------------------------
SET @P4 := UUID();

INSERT INTO `pricing_plans`
(`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
(@P4,'maintenance-basic','0.00','month','EUR',0,0,110,'/contact',@T,@T);

INSERT INTO `pricing_plans_i18n`
(`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
(UUID(),@P4,'en','Maintenance','Basic maintenance contract',
 'Monthly care for small websites that need updates, monitoring and a reliable technical contact.',
 '["Core updates and dependency checks","Basic uptime monitoring","Monthly backup check","Small content fixes by request","Email support during business days"]',
 'Request maintenance','/contact',@T,@T),
(UUID(),@P4,'tr','Bakım','Temel bakım sözleşmesi',
 'Güncelleme, izleme ve güvenilir teknik destek ihtiyacı olan küçük siteler için aylık bakım.',
 '["Çekirdek güncellemeler ve bağımlılık kontrolleri","Temel uptime takibi","Aylık yedek kontrolü","Talebe göre küçük içerik düzeltmeleri","Hafta içi e-posta desteği"]',
 'Bakım teklifi al','/contact',@T,@T),
(UUID(),@P4,'de','Wartung','Basis-Wartungsvertrag',
 'Monatliche Betreuung für kleinere Websites mit Updates, Monitoring und einem verlässlichen technischen Ansprechpartner.',
 '["Core-Updates und Dependency-Checks","Basis-Uptime-Monitoring","Monatlicher Backup-Check","Kleine Inhaltskorrekturen nach Anfrage","E-Mail-Support an Werktagen"]',
 'Wartung anfragen','/contact',@T,@T);

SET @P5 := UUID();

INSERT INTO `pricing_plans`
(`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
(@P5,'maintenance-standard','0.00','month','EUR',0,1,120,'/contact',@T,@T);

INSERT INTO `pricing_plans_i18n`
(`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
(UUID(),@P5,'en','Maintenance','Standard maintenance contract',
 'Ongoing technical support for active business websites, shops and internal tools.',
 '["Everything in Basic","Performance and security review","Priority bug fixes","Monthly analytics and health summary","Small feature adjustments by agreement"]',
 'Request maintenance','/contact',@T,@T),
(UUID(),@P5,'tr','Bakım','Standart bakım sözleşmesi',
 'Aktif iş siteleri, e-ticaret altyapıları ve iç araçlar için sürekli teknik destek.',
 '["Temel paketteki her şey","Performans ve güvenlik kontrolü","Öncelikli hata düzeltmeleri","Aylık analiz ve sağlık özeti","Anlaşmaya göre küçük özellik düzenlemeleri"]',
 'Bakım teklifi al','/contact',@T,@T),
(UUID(),@P5,'de','Wartung','Standard-Wartungsvertrag',
 'Laufende technische Betreuung für aktive Unternehmenswebsites, Shops und interne Tools.',
 '["Alles aus Basis","Performance- und Security-Review","Priorisierte Bugfixes","Monatliche Analytics- und Health-Zusammenfassung","Kleine Feature-Anpassungen nach Vereinbarung"]',
 'Wartung anfragen','/contact',@T,@T);

SET @P6 := UUID();

INSERT INTO `pricing_plans`
(`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
(@P6,'maintenance-premium','0.00','month','EUR',0,0,130,'/contact',@T,@T);

INSERT INTO `pricing_plans_i18n`
(`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
(UUID(),@P6,'en','Maintenance','Premium maintenance contract',
 'Care plan for production platforms where uptime, release support and fast response matter.',
 '["Everything in Standard","Release planning and deployment support","Proactive technical roadmap","Security hardening follow-ups","Dedicated response window by agreement"]',
 'Request maintenance','/contact',@T,@T),
(UUID(),@P6,'tr','Bakım','Premium bakım sözleşmesi',
 'Uptime, release desteği ve hızlı dönüşün önemli olduğu production platformları için bakım planı.',
 '["Standart paketteki her şey","Release planlama ve deployment desteği","Proaktif teknik yol haritası","Güvenlik hardening takipleri","Anlaşmaya göre özel dönüş süresi"]',
 'Bakım teklifi al','/contact',@T,@T),
(UUID(),@P6,'de','Wartung','Premium-Wartungsvertrag',
 'Betreuung für produktive Plattformen, bei denen Uptime, Release-Support und schnelle Reaktion wichtig sind.',
 '["Alles aus Standard","Release-Planung und Deployment-Support","Proaktive technische Roadmap","Security-Hardening Follow-ups","Dediziertes Antwortfenster nach Vereinbarung"]',
 'Wartung anfragen','/contact',@T,@T);

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
