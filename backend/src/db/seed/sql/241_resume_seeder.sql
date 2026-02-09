-- =============================================================
--  241_resume_seeder.sql
-- Resume seed — Education + Experience (TR + EN + DE)
-- - Requires 150_resume.sql already applied
-- - Uses UUID() for ids (NOT stable)
-- - No DROP/CREATE
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- Helpers: create parent + capture UUID into @var
-- =============================================================

-- -------------------------
-- EDUCATION #1 (2018-2019)
-- -------------------------
SET @e1 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@e1,'education',1,10,'2018-01-01','2019-12-31',0,NULL,'University of Stanford',4.9,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@e1,'en',
 'Certification in UX Design',
 'University of Stanford',
 'A focused program covering user research, information architecture, interaction design, and usability testing.',
 '["User research & personas","Wireframes & prototyping","Usability testing"]',
 'certification-in-ux-design',
 NOW(3),NOW(3)),
(UUID(),@e1,'de',
 'Zertifikat in UX Design',
 'University of Stanford',
 'Ein fokussiertes Programm zu User Research, Informationsarchitektur, Interaction Design und Usability-Tests.',
 '["User Research & Personas","Wireframes & Prototyping","Usability-Tests"]',
 'zertifikat-ux-design',
 NOW(3),NOW(3)),
(UUID(),@e1,'tr',
 'UX Tasarım Sertifikası',
 'Stanford Üniversitesi',
 'Kullanıcı araştırması, bilgi mimarisi, etkileşim tasarımı ve kullanılabilirlik testlerini kapsayan odaklı bir program.',
 '["Kullanıcı araştırması & persona","Wireframe & prototip","Kullanılabilirlik testi"]',
 'ux-tasarim-sertifikasi',
 NOW(3),NOW(3));

-- -------------------------
-- EDUCATION #2 (2017-2018)
-- -------------------------
SET @e2 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@e2,'education',1,20,'2017-01-01','2018-12-31',0,NULL,'University of Stanford',5.0,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@e2,'en',
 'Certification in Web Development',
 'University of Stanford',
 'Core web development fundamentals with hands-on projects across modern front-end tooling.',
 '["HTML/CSS fundamentals","JavaScript basics","Responsive UI"]',
 'certification-in-web-development',
 NOW(3),NOW(3)),
(UUID(),@e2,'de',
 'Zertifikat in Webentwicklung',
 'University of Stanford',
 'Grundlagen der Webentwicklung mit praxisnahen Projekten und modernem Frontend-Tooling.',
 '["HTML/CSS Grundlagen","JavaScript Basics","Responsive UI"]',
 'zertifikat-webentwicklung',
 NOW(3),NOW(3)),
(UUID(),@e2,'tr',
 'Web Geliştirme Sertifikası',
 'Stanford Üniversitesi',
 'Modern frontend araçlarıyla uygulamalı projeler üzerinden web geliştirme temelleri.',
 '["HTML/CSS temelleri","JavaScript temelleri","Responsive arayüz"]',
 'web-gelistirme-sertifikasi',
 NOW(3),NOW(3));

-- -------------------------
-- EDUCATION #3 (2014-2016)
-- -------------------------
SET @e3 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@e3,'education',1,30,'2014-01-01','2016-12-31',0,NULL,'Design Academy',4.9,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@e3,'en',
 'Advanced UX/UI Bootcamp',
 'Design Academy',
 'An intensive bootcamp focused on design systems, UI patterns, and real-world product design workflows.',
 '["Design systems","UI patterns","Product design workflow"]',
 'advanced-ux-ui-bootcamp',
 NOW(3),NOW(3)),
(UUID(),@e3,'de',
 'Advanced UX/UI Bootcamp',
 'Design Academy',
 'Intensives Bootcamp mit Fokus auf Designsysteme, UI-Patterns und produktnahe Workflows.',
 '["Designsysteme","UI-Patterns","Produkt-Workflows"]',
 'advanced-ux-ui-bootcamp',
 NOW(3),NOW(3)),
(UUID(),@e3,'tr',
 'İleri Seviye UX/UI Bootcamp',
 'Design Academy',
 'Design system, UI pattern ve gerçek ürün iş akışlarına odaklanan yoğun bootcamp programı.',
 '["Design system","UI pattern","Ürün iş akışı"]',
 'ileri-ux-ui-bootcamp',
 NOW(3),NOW(3));

-- -------------------------
-- EDUCATION #4 (2012-2013)
-- -------------------------
SET @e4 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@e4,'education',1,40,'2012-01-01','2013-12-31',0,NULL,'Coursera',4.8,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@e4,'en',
 'Certification in Graphic Design',
 'Coursera',
 'Foundational graphic design course covering composition, typography, and visual hierarchy.',
 '["Typography","Composition","Visual hierarchy"]',
 'certification-in-graphic-design',
 NOW(3),NOW(3)),
(UUID(),@e4,'de',
 'Zertifikat in Grafikdesign',
 'Coursera',
 'Grundkurs in Grafikdesign mit Fokus auf Komposition, Typografie und visueller Hierarchie.',
 '["Typografie","Komposition","Visuelle Hierarchie"]',
 'zertifikat-grafikdesign',
 NOW(3),NOW(3)),
(UUID(),@e4,'tr',
 'Grafik Tasarım Sertifikası',
 'Coursera',
 'Kompozisyon, tipografi ve görsel hiyerarşi odaklı temel grafik tasarım eğitimi.',
 '["Tipografi","Kompozisyon","Görsel hiyerarşi"]',
 'grafik-tasarim-sertifikasi',
 NOW(3),NOW(3));

-- =============================================================
-- EXPERIENCE (4 items)
-- =============================================================

-- -------------------------
-- EXPERIENCE #1 (2019-Present)
-- -------------------------
SET @x1 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@x1,'experience',1,10,'2019-01-01',NULL,1,NULL,NULL,NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@x1,'en',
 'Senior UI/UX Designer',
 'Leader in Creative team',
 'Leading UI/UX initiatives, defining design systems, and collaborating with engineering to ship high-quality interfaces.',
 '["Design system ownership","Cross-functional leadership","UX audits & improvements"]',
 'senior-ui-ux-designer',
 NOW(3),NOW(3)),
(UUID(),@x1,'de',
 'Senior UI/UX Designer',
 'Leitung im Kreativteam',
 'Leitung von UI/UX-Initiativen, Aufbau von Designsystemen und enge Zusammenarbeit mit Engineering für hochwertige Interfaces.',
 '["Designsystem-Verantwortung","Cross-funktionale Führung","UX-Audits & Optimierung"]',
 'senior-ui-ux-designer',
 NOW(3),NOW(3)),
(UUID(),@x1,'tr',
 'Kıdemli UI/UX Tasarımcı',
 'Yaratıcı ekip liderliği',
 'UI/UX süreçlerini yönettim, design system kurdum ve geliştirme ekibiyle birlikte yüksek kaliteli arayüzler yayınladım.',
 '["Design system sahipliği","Ekipler arası liderlik","UX iyileştirmeleri"]',
 'kidemli-ui-ux-tasarimci',
 NOW(3),NOW(3));

-- -------------------------
-- EXPERIENCE #2 (2016-2019)
-- -------------------------
SET @x2 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@x2,'experience',1,20,'2016-01-01','2019-12-31',0,NULL,NULL,NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@x2,'en',
 'UI/UX Designer at BOS Agency',
 'Tech Startup',
 'Designed product interfaces and improved user flows for a startup environment with rapid iteration cycles.',
 '["User flow redesigns","High-fidelity UI","Component libraries"]',
 'ui-ux-designer-bos-agency',
 NOW(3),NOW(3)),
(UUID(),@x2,'de',
 'UI/UX Designer bei BOS Agency',
 'Tech-Startup',
 'Gestaltung von Produktinterfaces und Optimierung von User Flows in einem Startup mit schnellen Iterationen.',
 '["User-Flow-Redesigns","High-Fidelity UI","Component Libraries"]',
 'ui-ux-designer-bos-agency',
 NOW(3),NOW(3)),
(UUID(),@x2,'tr',
 'BOS Agency’de UI/UX Tasarımcı',
 'Tech Startup',
 'Hızlı iterasyon döngülerine sahip startup ortamında arayüz tasarımı ve kullanıcı akışı iyileştirmeleri yaptım.',
 '["Kullanıcı akışı iyileştirme","High-fidelity UI","Bileşen kütüphanesi"]',
 'bos-agency-ui-ux-tasarimci',
 NOW(3),NOW(3));

-- -------------------------
-- EXPERIENCE #3 (2014-2016)
-- -------------------------
SET @x3 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@x3,'experience',1,30,'2014-01-01','2016-12-31',0,NULL,NULL,NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@x3,'en',
 'Freelance UI/UX Designer',
 'Self-Employed',
 'Delivered end-to-end UI/UX for multiple clients: discovery, design, prototyping, and handoff.',
 '["Client discovery","Prototyping","Handoff documentation"]',
 'freelance-ui-ux-designer',
 NOW(3),NOW(3)),
(UUID(),@x3,'de',
 'Freelance UI/UX Designer',
 'Selbstständig',
 'End-to-end UI/UX für verschiedene Kunden: Discovery, Design, Prototyping und Übergabe.',
 '["Kunden-Discovery","Prototyping","Handoff-Dokumentation"]',
 'freelance-ui-ux-designer',
 NOW(3),NOW(3)),
(UUID(),@x3,'tr',
 'Freelance UI/UX Tasarımcı',
 'Serbest',
 'Birden fazla müşteri için uçtan uca UI/UX süreçleri: keşif, tasarım, prototip ve teslim dokümantasyonu.',
 '["Müşteri keşfi","Prototipleme","Teslim dokümantasyonu"]',
 'freelance-ui-ux-tasarimci',
 NOW(3),NOW(3));

-- -------------------------
-- EXPERIENCE #4 (2012-2014)
-- -------------------------
SET @x4 := UUID();
INSERT INTO `resume_entries`
(`id`,`type`,`is_active`,`display_order`,`start_date`,`end_date`,`is_current`,`location`,`organization`,`score_value`,`score_scale`,`created_at`,`updated_at`)
VALUES
(@x4,'experience',1,40,'2012-01-01','2014-12-31',0,NULL,NULL,NULL,5,NOW(3),NOW(3));

INSERT INTO `resume_entries_i18n`
(`id`,`entry_id`,`locale`,`title`,`subtitle`,`description`,`highlights_json`,`slug`,`created_at`,`updated_at`)
VALUES
(UUID(),@x4,'en',
 'Junior UI Designer',
 'Web Solutions team',
 'Supported the design team with UI screens, icons, and layout improvements for web projects.',
 '["UI screens","Iconography","Layout improvements"]',
 'junior-ui-designer',
 NOW(3),NOW(3)),
(UUID(),@x4,'de',
 'Junior UI Designer',
 'Web-Solutions-Team',
 'Unterstützung des Designteams mit UI-Screens, Icons und Layout-Optimierungen für Webprojekte.',
 '["UI-Screens","Icon-Design","Layout-Optimierung"]',
 'junior-ui-designer',
 NOW(3),NOW(3)),
(UUID(),@x4,'tr',
 'Junior UI Tasarımcı',
 'Web Solutions ekibi',
 'Web projeleri için UI ekranları, ikonlar ve layout iyileştirmelerinde tasarım ekibini destekledim.',
 '["UI ekranları","İkon tasarımı","Layout iyileştirme"]',
 'junior-ui-tasarimci',
 NOW(3),NOW(3));

COMMIT;
