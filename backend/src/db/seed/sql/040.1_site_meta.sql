-- =============================================================
-- 040.1_site_meta.sql  (GUEZELWEBDESIGN)
-- Global Meta + Page SEO (tr/en/de)
-- Compatible with fetchSiteSettingsStrict (seo_defaults virtual)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- -------------------------------------------------------------
-- TABLE GUARD
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id`         CHAR(36)      NOT NULL,
  `key`        VARCHAR(100)  NOT NULL,
  `locale`     VARCHAR(8)    NOT NULL,
  `value`      TEXT          NOT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_locale_uq` (`key`, `locale`),
  KEY `site_settings_key_idx` (`key`),
  KEY `site_settings_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- Helpers
-- -------------------------------------------------------------
-- OG DEFAULT:
-- 1) First try site_og_default_image (locale='*') JSON -> $.url
-- 2) If not JSON, use value as plain URL
-- 3) If missing/empty, fallback to GWD hero image
-- -------------------------------------------------------------
SET @OG_DEFAULT := COALESCE(
  (
    SELECT COALESCE(
      CASE
        WHEN JSON_VALID(`value`) THEN JSON_UNQUOTE(JSON_EXTRACT(`value`, '$.url'))
        ELSE NULL
      END,
      NULLIF(`value`, '')
    )
    FROM `site_settings`
    WHERE `key` = 'site_og_default_image'
      AND `locale` = '*'
    ORDER BY `updated_at` DESC
    LIMIT 1
  ),
  'https://www.guezelwebdesign.com/assets/imgs/home-page-3/hero/img-1.png'
);

-- -------------------------------------------------------------
-- Brand + defaults (ASCII-safe)
-- -------------------------------------------------------------
SET @BRAND_TR := 'Guezel Web Design';
SET @BRAND_EN := 'Guezel Web Design';
SET @BRAND_DE := 'Guezel Webdesign';

SET @SITE_NAME_GLOBAL := 'Guezel Web Design';
SET @TITLE_GLOBAL := 'Orhan Guzel - Full-Stack Developer Portfolio';

SET @DESC_TR := 'Next.js, Fastify, Laravel ve Flutter ile gelistirilen uretime hazir is platformlari, e-ticaret sistemleri ve operasyonel web uygulamalari.';
SET @DESC_EN := 'Production-ready business platforms, e-commerce systems and operational web applications built with Next.js, Fastify, Laravel and Flutter.';
SET @DESC_DE := 'Produktionsreife Business-Plattformen, E-Commerce-Systeme und operative Webanwendungen mit Next.js, Fastify, Laravel und Flutter.';

SET @DESC_GLOBAL := 'Production-ready business platforms, e-commerce systems and operational web applications.';

SET @KW_TR := 'orhan guzel, full-stack developer, next.js, fastify, laravel, e-commerce, is platformlari';
SET @KW_EN := 'orhan guzel, full-stack developer, next.js, fastify, laravel, e-commerce, business platform';
SET @KW_DE := 'orhan guzel, full-stack developer, next.js, fastify, laravel, e-commerce, business plattform';
SET @KW_GLOBAL := 'orhan guzel, full-stack developer, next.js, fastify, laravel, e-commerce';

-- -------------------------------------------------------------
-- Build JSON payloads (seo / site_seo + site_meta_default)
-- -------------------------------------------------------------

SET @SEO_GLOBAL := CAST(
  JSON_OBJECT(
    'site_name',      @SITE_NAME_GLOBAL,
    'title_default',  @TITLE_GLOBAL,
    'title_template', '%s - Guezel Web Design',
    'description',    @DESC_GLOBAL,
    'open_graph', JSON_OBJECT(
      'type',   'website',
      'images', JSON_ARRAY(@OG_DEFAULT)
    ),
    'twitter', JSON_OBJECT(
      'card',    'summary_large_image',
      'site',    '',
      'creator', ''
    ),
    'robots', JSON_OBJECT(
      'noindex', false,
      'index',   true,
      'follow',  true
    )
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @SEO_TR := CAST(
  JSON_OBJECT(
    'site_name',      @BRAND_TR,
    'title_default',  @BRAND_TR,
    'title_template', '%s - Guezel Web Design',
    'description',    @DESC_TR,
    'open_graph', JSON_OBJECT(
      'type',   'website',
      'images', JSON_ARRAY(@OG_DEFAULT)
    ),
    'twitter', JSON_OBJECT(
      'card',    'summary_large_image',
      'site',    '',
      'creator', ''
    ),
    'robots', JSON_OBJECT(
      'noindex', false,
      'index',   true,
      'follow',  true
    )
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @SEO_EN := CAST(
  JSON_OBJECT(
    'site_name',      @BRAND_EN,
    'title_default',  @BRAND_EN,
    'title_template', '%s - Guezel Web Design',
    'description',    @DESC_EN,
    'open_graph', JSON_OBJECT(
      'type',   'website',
      'images', JSON_ARRAY(@OG_DEFAULT)
    ),
    'twitter', JSON_OBJECT(
      'card',    'summary_large_image',
      'site',    '',
      'creator', ''
    ),
    'robots', JSON_OBJECT(
      'noindex', false,
      'index',   true,
      'follow',  true
    )
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @SEO_DE := CAST(
  JSON_OBJECT(
    'site_name',      @BRAND_DE,
    'title_default',  @BRAND_DE,
    'title_template', '%s - Guezel Webdesign',
    'description',    @DESC_DE,
    'open_graph', JSON_OBJECT(
      'type',   'website',
      'images', JSON_ARRAY(@OG_DEFAULT)
    ),
    'twitter', JSON_OBJECT(
      'card',    'summary_large_image',
      'site',    '',
      'creator', ''
    ),
    'robots', JSON_OBJECT(
      'noindex', false,
      'index',   true,
      'follow',  true
    )
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @META_GLOBAL := CAST(
  JSON_OBJECT(
    'title',       @TITLE_GLOBAL,
    'description', @DESC_GLOBAL,
    'keywords',    @KW_GLOBAL
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @META_TR := CAST(
  JSON_OBJECT(
    'title',       @BRAND_TR,
    'description', @DESC_TR,
    'keywords',    @KW_TR
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @META_EN := CAST(
  JSON_OBJECT(
    'title',       @BRAND_EN,
    'description', @DESC_EN,
    'keywords',    @KW_EN
  ) AS CHAR CHARACTER SET utf8mb4
);

SET @META_DE := CAST(
  JSON_OBJECT(
    'title',       @BRAND_DE,
    'description', @DESC_DE,
    'keywords',    @KW_DE
  ) AS CHAR CHARACTER SET utf8mb4
);

-- =============================================================
-- GLOBAL SEO DEFAULTS (locale='*')
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'seo',
  '*',
  @SEO_GLOBAL,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'site_seo',
  '*',
  @SEO_GLOBAL,
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED SEO OVERRIDES (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'seo', 'tr', @SEO_TR, NOW(3), NOW(3)),
(UUID(), 'seo', 'en', @SEO_EN, NOW(3), NOW(3)),
(UUID(), 'seo', 'de', @SEO_DE, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'site_seo', 'tr', @SEO_TR, NOW(3), NOW(3)),
(UUID(), 'site_seo', 'en', @SEO_EN, NOW(3), NOW(3)),
(UUID(), 'site_seo', 'de', @SEO_DE, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- site_meta_default (global + tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'site_meta_default', '*',  @META_GLOBAL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'site_meta_default', 'tr', @META_TR, NOW(3), NOW(3)),
(UUID(), 'site_meta_default', 'en', @META_EN, NOW(3), NOW(3)),
(UUID(), 'site_meta_default', 'de', @META_DE, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- PAGE SEO (seo_pages_*)
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
-- Home
(UUID(), 'seo_pages_home', 'tr', CAST(JSON_OBJECT(
  'title','Orhan Guzel — Full-Stack Gelistirici | Next.js, Fastify, Laravel',
  'description','Next.js, Fastify, Laravel ve Flutter ile gelistirilmis uretime hazir is platformlari, e-ticaret sistemleri ve operasyonel web uygulamalari. Almanya merkezli, Avrupa genelinde hizmet.',
  'keywords','orhan guzel, full-stack gelistirici, web gelistirici almanya, next.js, fastify, laravel, e-ticaret, is platformlari',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home', 'en', CAST(JSON_OBJECT(
  'title','Orhan Guzel — Full-Stack Developer | Next.js, Fastify, Laravel',
  'description','Production-ready business platforms, e-commerce systems and operational web applications built with Next.js, Fastify, Laravel and Flutter. Based in Germany, serving clients across Europe.',
  'keywords','orhan guzel, full-stack developer, web developer germany, next.js developer, fastify, laravel, e-commerce, business platform',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home', 'de', CAST(JSON_OBJECT(
  'title','Orhan Guzel — Full-Stack Webentwickler | Next.js, Fastify, Laravel',
  'description','Produktionsreife Business-Plattformen, E-Commerce-Systeme und operative Webanwendungen mit Next.js, Fastify, Laravel und Flutter. Webentwickler aus Grevenbroich, Deutschland.',
  'keywords','orhan guzel, full-stack webentwickler, webentwickler deutschland, next.js entwickler, fastify, laravel, e-commerce, business plattform',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Home 2
(UUID(), 'seo_pages_home_2', 'tr', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 2',
  'description','Full-stack portfolyo ve proje vitrini icin alternatif anasayfa yerlesimi.',
  'keywords','orhan guzel, full-stack portfolyo, next.js, fastify',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_2', 'en', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 2',
  'description','Alternative home layout for the full-stack portfolio and project showcase.',
  'keywords','orhan guzel, full-stack portfolio, next.js, fastify',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_2', 'de', CAST(JSON_OBJECT(
  'title','Guezel Webdesign - Portfolio Home 2',
  'description','Alternative Startseite für das Full-Stack-Portfolio und die Projektauswahl.',
  'keywords','orhan guzel, full-stack portfolio, next.js, fastify',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Home 3
(UUID(), 'seo_pages_home_3', 'tr', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 3',
  'description','Full-stack portfolyo ve proje vitrini icin alternatif anasayfa yerlesimi.',
  'keywords','orhan guzel, full-stack portfolyo, next.js, fastify',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_3', 'en', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 3',
  'description','Alternative home layout for the full-stack portfolio and project showcase.',
  'keywords','orhan guzel, full-stack portfolio, next.js, fastify',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_3', 'de', CAST(JSON_OBJECT(
  'title','Guezel Webdesign - Portfolio Home 3',
  'description','Alternative Startseite für das Full-Stack-Portfolio und die Projektauswahl.',
  'keywords','orhan guzel, full-stack portfolio, next.js, fastify',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Services
(UUID(), 'seo_pages_services', 'tr', CAST(JSON_OBJECT(
  'title','Hizmetler - Full-Stack Web, API ve Platform Gelistirme',
  'description','Web uygulamalari, admin panelleri, API katmani, e-ticaret ve operasyon sistemleri icin full-stack teslimat.',
  'keywords','full-stack gelistirme, next.js, fastify, laravel, api gelistirme, admin panel',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_services', 'en', CAST(JSON_OBJECT(
  'title','Services - Full-Stack Web, API and Platform Development',
  'description','Full-stack delivery for web applications, admin panels, APIs, e-commerce and operational systems.',
  'keywords','full-stack development, next.js, fastify, laravel, api development, admin panel',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_services', 'de', CAST(JSON_OBJECT(
  'title','Leistungen - Full-Stack Web-, API- und Plattformentwicklung',
  'description','Full-Stack Umsetzung für Webanwendungen, Admin Panels, APIs, E-Commerce und operative Systeme.',
  'keywords','full-stack entwicklung, next.js, fastify, laravel, api entwicklung, admin panel',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Pricing
(UUID(), 'seo_pages_pricing', 'tr', CAST(JSON_OBJECT(
  'title','Fiyatlandirma - Proje Paketleri',
  'description','Projeniz icin net kapsam ve fiyat paketleri. Kesif, tasarim ve gelistirme.',
  'keywords','fiyatlandirma, web tasarim paketi, ui ux',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_pricing', 'en', CAST(JSON_OBJECT(
  'title','Pricing - Project Packages',
  'description','Clear packages for discovery, design and development.',
  'keywords','pricing, project delivery, full-stack development',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_pricing', 'de', CAST(JSON_OBJECT(
  'title','Preise - Projektpakete',
  'description','Klare Pakete fuer Discovery, Design und Entwicklung.',
  'keywords','preise, webdesign pakete, ui ux',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Blog
(UUID(), 'seo_pages_blog', 'tr', CAST(JSON_OBJECT(
  'title','Blog - Tasarim ve Urun Notlari',
  'description','Yazilim teslimati, mimari, urun uygulamasi ve proje deneyimi uzerine notlar.',
  'keywords','blog, yazilim teslimati, full-stack gelistirme, mimari',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog', 'en', CAST(JSON_OBJECT(
  'title','Blog - Software Delivery Notes',
  'description','Articles on software delivery, architecture, implementation and project experience.',
  'keywords','blog, software delivery, architecture, implementation',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog', 'de', CAST(JSON_OBJECT(
  'title','Blog - Software Delivery Notizen',
  'description','Artikel zu Software Delivery, Architektur, Umsetzung und Projekterfahrung.',
  'keywords','blog, software delivery, architektur, umsetzung',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Work
(UUID(), 'seo_pages_work', 'tr', CAST(JSON_OBJECT(
  'title','Calismalar - Secilmis Yazilim Projeleri',
  'description','E-ticaret, B2B, ERP, booking, lojistik ve service operasyonlari icin gelistirilmis secilmis projeler.',
  'keywords','portfolyo, yazilim projeleri, e-commerce, b2b, erp',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work', 'en', CAST(JSON_OBJECT(
  'title','Work - Selected Software Projects',
  'description','Case studies and selected projects across e-commerce, B2B, ERP, booking, logistics and service operations.',
  'keywords','portfolio, software projects, e-commerce, b2b platform, erp',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work', 'de', CAST(JSON_OBJECT(
  'title','Arbeiten - Ausgewaehlte Softwareprojekte',
  'description','Case Studies und ausgewaehlte Projekte aus E-Commerce, B2B, ERP, Booking, Logistik und Service-Operations.',
  'keywords','portfolio, softwareprojekte, e-commerce, b2b plattform, erp',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Blog Detail
(UUID(), 'seo_pages_blog_detail', 'tr', CAST(JSON_OBJECT(
  'title','Blog Yazisi',
  'description','Yazilim teslimati, mimari ve proje deneyimi odakli icerikler.',
  'keywords','blog, yazilim teslimati, mimari, proje deneyimi',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog_detail', 'en', CAST(JSON_OBJECT(
  'title','Blog Post',
  'description','Notes on software delivery, architecture, product implementation and project experience.',
  'keywords','blog, software delivery, full-stack development, architecture',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog_detail', 'de', CAST(JSON_OBJECT(
  'title','Blogbeitrag',
  'description','Artikel zu Software Delivery, Architektur, Produktumsetzung und Projekterfahrung.',
  'keywords','blog, software delivery, full-stack entwicklung, architektur',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Service Detail
(UUID(), 'seo_pages_service_detail', 'tr', CAST(JSON_OBJECT(
  'title','Hizmet Detayi',
  'description','Hizmet kapsam, surec ve ciktilar.',
  'keywords','hizmet, ui ux, web tasarim',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_service_detail', 'en', CAST(JSON_OBJECT(
  'title','Service Details',
  'description','Scope, process and deliverables.',
  'keywords','service, full-stack development, api, platform delivery',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_service_detail', 'de', CAST(JSON_OBJECT(
  'title','Leistungsdetails',
  'description','Leistungsumfang, Prozess und Ergebnisse.',
  'keywords','leistung, ui ux, webdesign',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Work Detail
(UUID(), 'seo_pages_work_detail', 'tr', CAST(JSON_OBJECT(
  'title','Proje Detayi',
  'description','Proje kapsam ve sonuclarinin detaylari.',
  'keywords','proje, portfolyo, web tasarim',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work_detail', 'en', CAST(JSON_OBJECT(
  'title','Project Details',
  'description','Project scope, implementation details and delivery outcomes.',
  'keywords','project, software portfolio, implementation, delivery',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work_detail', 'de', CAST(JSON_OBJECT(
  'title','Projektdetails',
  'description','Projektumfang, Umsetzungsdetails und Delivery-Ergebnisse.',
  'keywords','projekt, software portfolio, umsetzung, delivery',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Testimonials / reviews
(UUID(), 'seo_pages_testimonials', 'tr', CAST(JSON_OBJECT(
  'title','Musteri Yorumlari',
  'description','Is birligi, teslim kalitesi ve iletisim hakkinda secilmis geri bildirimler.',
  'keywords','yorum, referans, musteri, full-stack',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_testimonials', 'en', CAST(JSON_OBJECT(
  'title','Client Reviews',
  'description','Selected feedback on collaboration, delivery quality, and communication.',
  'keywords','reviews, testimonials, clients, full-stack developer',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_testimonials', 'de', CAST(JSON_OBJECT(
  'title','Kundenstimmen',
  'description','Ausgewaehlte Rueckmeldungen zu Zusammenarbeit, Lieferqualitaet und Kommunikation.',
  'keywords','bewertung, referenzen, kunden, full-stack',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Custom Page Detail
(UUID(), 'seo_pages_custompage_detail', 'tr', CAST(JSON_OBJECT(
  'title','Sayfa Detayi',
  'description','Detayli icerik sayfasi.',
  'keywords','icerik, sayfa, web',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_custompage_detail', 'en', CAST(JSON_OBJECT(
  'title','Page Details',
  'description','Detailed content page.',
  'keywords','content, page, web',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_custompage_detail', 'de', CAST(JSON_OBJECT(
  'title','Seitendetails',
  'description','Detaillierte Inhaltsseite.',
  'keywords','inhalt, seite, web',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3))

ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
