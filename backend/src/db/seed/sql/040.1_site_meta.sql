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
SET @TITLE_GLOBAL := 'Guezel Web Design - UI/UX and Web Design Studio';

SET @DESC_TR := 'Markalar icin UI/UX tasarim, modern web siteleri ve dijital urun deneyimleri. Strateji, tasarim ve gelistirme.';
SET @DESC_EN := 'UI/UX design, modern websites and digital product experiences for brands. Strategy, design and development.';
SET @DESC_DE := 'UI/UX Design, moderne Websites und digitale Produkterlebnisse fuer Marken. Strategie, Design und Entwicklung.';

SET @DESC_GLOBAL := 'UI/UX design, web design and digital product experiences for brands.';

SET @KW_TR := 'guezel web design, web tasarim, ui ux, dijital urun tasarimi, marka tasarimi, frontend';
SET @KW_EN := 'guezel web design, web design, ui ux, digital product design, branding, frontend';
SET @KW_DE := 'guezel webdesign, webdesign, ui ux, digitale produktgestaltung, branding, frontend';
SET @KW_GLOBAL := 'guezel web design, ui ux, web design, digital product';

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
  'title','Guezel Web Design - Portfolyo ve Dijital Urunler',
  'description','UI/UX, web tasarim ve dijital urunler. Secilmis isler, hizmetler ve yaklasim.',
  'keywords','guezel web design, portfolyo, ui ux, web tasarim, dijital urun',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home', 'en', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio and Digital Products',
  'description','UI/UX, web design and digital products. Selected work, services and approach.',
  'keywords','guezel web design, portfolio, ui ux, web design, digital product',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home', 'de', CAST(JSON_OBJECT(
  'title','Guezel Webdesign - Portfolio und Digitale Produkte',
  'description','UI/UX, Webdesign und digitale Produkte. Ausgewaehlte Arbeiten, Services und Ansatz.',
  'keywords','guezel webdesign, portfolio, ui ux, webdesign, digitale produkte',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Home 2
(UUID(), 'seo_pages_home_2', 'tr', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 2',
  'description','Alternatif anasayfa tasarimi ve portfolyo sunumu.',
  'keywords','guezel web design, portfolyo, ui ux, web tasarim',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_2', 'en', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 2',
  'description','Alternative home layout and portfolio presentation.',
  'keywords','guezel web design, portfolio, ui ux, web design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_2', 'de', CAST(JSON_OBJECT(
  'title','Guezel Webdesign - Portfolio Home 2',
  'description','Alternative Startseite und Portfolio Darstellung.',
  'keywords','guezel webdesign, portfolio, ui ux, webdesign',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Home 3
(UUID(), 'seo_pages_home_3', 'tr', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 3',
  'description','Alternatif anasayfa tasarimi ve portfolyo sunumu.',
  'keywords','guezel web design, portfolyo, ui ux, web tasarim',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_3', 'en', CAST(JSON_OBJECT(
  'title','Guezel Web Design - Portfolio Home 3',
  'description','Alternative home layout and portfolio presentation.',
  'keywords','guezel web design, portfolio, ui ux, web design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_home_3', 'de', CAST(JSON_OBJECT(
  'title','Guezel Webdesign - Portfolio Home 3',
  'description','Alternative Startseite und Portfolio Darstellung.',
  'keywords','guezel webdesign, portfolio, ui ux, webdesign',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Services
(UUID(), 'seo_pages_services', 'tr', CAST(JSON_OBJECT(
  'title','Hizmetler - UI/UX, Web Tasarim ve Gelistirme',
  'description','Urun stratejisi, UI/UX tasarim, web gelistirme ve marka sistemleri.',
  'keywords','ui ux, web tasarim, web gelistirme, urun tasarimi',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_services', 'en', CAST(JSON_OBJECT(
  'title','Services - UI/UX, Web Design and Development',
  'description','Product strategy, UI/UX design, web development and brand systems.',
  'keywords','ui ux, web design, web development, product design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_services', 'de', CAST(JSON_OBJECT(
  'title','Leistungen - UI/UX, Webdesign und Entwicklung',
  'description','Produktstrategie, UI/UX Design, Webentwicklung und Brand Systeme.',
  'keywords','ui ux, webdesign, webentwicklung, produktdesign',
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
  'keywords','pricing, web design packages, ui ux',
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
  'description','UI/UX, urun ve teknoloji uzerine yazilar.',
  'keywords','blog, ui ux, urun tasarimi',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog', 'en', CAST(JSON_OBJECT(
  'title','Blog - Design and Product Notes',
  'description','Articles on UI/UX, product and technology.',
  'keywords','blog, ui ux, product design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog', 'de', CAST(JSON_OBJECT(
  'title','Blog - Design und Produkt Notizen',
  'description','Artikel zu UI/UX, Produkt und Technologie.',
  'keywords','blog, ui ux, produktdesign',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Work
(UUID(), 'seo_pages_work', 'tr', CAST(JSON_OBJECT(
  'title','Calismalar - Secilmis Projeler',
  'description','Web ve dijital urun tasarimi projelerinden secmeler.',
  'keywords','portfolyo, proje, web tasarim',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work', 'en', CAST(JSON_OBJECT(
  'title','Work - Selected Projects',
  'description','Case studies and selected projects in web and product design.',
  'keywords','portfolio, projects, web design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work', 'de', CAST(JSON_OBJECT(
  'title','Arbeiten - Ausgewaehlte Projekte',
  'description','Case Studies und ausgewaehlte Projekte im Web und Produktdesign.',
  'keywords','portfolio, projekte, webdesign',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),

-- Blog Detail
(UUID(), 'seo_pages_blog_detail', 'tr', CAST(JSON_OBJECT(
  'title','Blog Yazisi',
  'description','Tasarim ve urun odakli icerikler.',
  'keywords','blog, ui ux, urun tasarimi',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog_detail', 'en', CAST(JSON_OBJECT(
  'title','Blog Post',
  'description','Design and product focused articles.',
  'keywords','blog, ui ux, product design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_blog_detail', 'de', CAST(JSON_OBJECT(
  'title','Blogbeitrag',
  'description','Artikel zu Design und Produkt.',
  'keywords','blog, ui ux, produktdesign',
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
  'keywords','service, ui ux, web design',
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
  'description','Case study details and outcomes.',
  'keywords','project, portfolio, web design',
  'ogImage', @OG_DEFAULT
) AS CHAR CHARACTER SET utf8mb4), NOW(3), NOW(3)),
(UUID(), 'seo_pages_work_detail', 'de', CAST(JSON_OBJECT(
  'title','Projektdetails',
  'description','Details und Ergebnisse der Case Study.',
  'keywords','projekt, portfolio, webdesign',
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
