-- =============================================================
-- 040_site_settings_guezelwebdesign.sql
-- FINAL — creates table if missing + seeds guezelwebdesign portfolio content
-- - NO ALTER
-- - Safe rerun via UNIQUE(key, locale) + ON DUPLICATE KEY
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- =============================================================
-- TABLE (create if missing)
-- =============================================================
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

-- =============================================================
-- GLOBAL: app_locales (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'app_locales',
  '*',
  CAST(
    JSON_ARRAY(
      JSON_OBJECT('code','tr','label','Türkçe','is_default', FALSE, 'is_active', TRUE),
      JSON_OBJECT('code','en','label','English','is_default', FALSE, 'is_active', TRUE),
      JSON_OBJECT('code','de','label','Deutsch','is_default', TRUE,  'is_active', TRUE)
    ) AS CHAR CHARACTER SET utf8mb4
  ),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: default_locale (locale='*')
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'default_locale', '*', 'de', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: site_title (tr/en/de)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'site_title', 'tr', 'Güzel Web Design', NOW(3), NOW(3)),
(UUID(), 'site_title', 'en', 'Guezel Web Design', NOW(3), NOW(3)),
(UUID(), 'site_title', 'de', 'Güzel Webdesign', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: contact_info (portfolio)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'contact_info',
  'tr',
  CAST(JSON_OBJECT(
    'companyName','Güzel Web Design',
    'phone','+49 000 000 00 00',
    'email','contact@guezelwebdesign.com',
    'skype','GuezelWebDesign',
    'address','Berlin, Germany',
    'website','https://www.guezelwebdesign.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'contact_info',
  'en',
  CAST(JSON_OBJECT(
    'companyName','Guezel Web Design',
    'phone','+49 000 000 00 00',
    'email','contact@guezelwebdesign.com',
    'skype','GuezelWebDesign',
    'address','Berlin, Germany',
    'website','https://www.guezelwebdesign.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'contact_info',
  'de',
  CAST(JSON_OBJECT(
    'companyName','Güzel Webdesign',
    'phone','+49 000 000 00 00',
    'email','contact@guezelwebdesign.com',
    'skype','GuezelWebDesign',
    'address','Berlin, Deutschland',
    'website','https://www.guezelwebdesign.com'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: socials (absolute URLs)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'socials',
  'tr',
  CAST(JSON_OBJECT(
    'facebook','https://facebook.com/guezelwebdesign',
    'instagram','https://instagram.com/guezelwebdesign',
    'linkedin','https://linkedin.com/company/guezelwebdesign',
    'github','https://github.com/guezelwebdesign',
    'x','https://x.com/guezelwebdesign'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'socials',
  'en',
  CAST(JSON_OBJECT(
    'facebook','https://facebook.com/guezelwebdesign',
    'instagram','https://instagram.com/guezelwebdesign',
    'linkedin','https://linkedin.com/company/guezelwebdesign',
    'github','https://github.com/guezelwebdesign',
    'x','https://x.com/guezelwebdesign'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'socials',
  'de',
  CAST(JSON_OBJECT(
    'facebook','https://facebook.com/guezelwebdesign',
    'instagram','https://instagram.com/guezelwebdesign',
    'linkedin','https://linkedin.com/company/guezelwebdesign',
    'github','https://github.com/guezelwebdesign',
    'x','https://x.com/guezelwebdesign'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: offcanvas_panel (NEW)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'offcanvas_panel',
  'tr',
  CAST(JSON_OBJECT(
    'headline','İletişime Geç',
    'intro','Yeni web projeleri ve markalarla çalışmak için her zaman heyecanlıyım. Kısa bir mesaj bırakman yeterli.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'offcanvas_panel',
  'en',
  CAST(JSON_OBJECT(
    'headline','Get in touch',
    'intro','I’m always excited to take on new projects and collaborate with ambitious brands. Drop a quick message.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'offcanvas_panel',
  'de',
  CAST(JSON_OBJECT(
    'headline','Kontakt',
    'intro','Ich freue mich immer auf neue Projekte und die Zusammenarbeit mit ambitionierten Marken. Schreib mir kurz.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- GLOBAL: Site Media Assets (logo, favicon, apple-touch-icon, og-image)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(UUID(), 'public_base_url', '*', 'https://www.guezelwebdesign.com', NOW(3), NOW(3)),
(UUID(), 'site_logo', '*', '/assets/imgs/logo/logo-dark.svg', NOW(3), NOW(3)),
(UUID(), 'site_logo_dark', '*', '/assets/imgs/logo/logo-dark.svg', NOW(3), NOW(3)),
(UUID(), 'site_logo_light', '*', '/assets/imgs/logo/logo-white.svg', NOW(3), NOW(3)),
(UUID(), 'site_favicon', '*', '/assets/imgs/favicon.png', NOW(3), NOW(3)),
(UUID(), 'site_apple_touch_icon', '*', '/assets/imgs/apple-touch-icon.png', NOW(3), NOW(3)),
(UUID(), 'site_og_default_image', '*', 'https://www.guezelwebdesign.com/assets/imgs/home-page-3/hero/img-1.png', NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- OPTIONAL: company_brand (SEO / JSON-LD)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'company_brand',
  'tr',
  CAST(JSON_OBJECT(
    'name','Güzel Web Design',
    'shortName','GWD',
    'website','https://www.guezelwebdesign.com',
    'logo',JSON_OBJECT(
      'url','https://www.guezelwebdesign.com/uploads/site/logo.png',
      'width',160,
      'height',60
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'company_brand',
  'en',
  CAST(JSON_OBJECT(
    'name','Guezel Web Design',
    'shortName','GWD',
    'website','https://www.guezelwebdesign.com',
    'logo',JSON_OBJECT(
      'url','https://www.guezelwebdesign.com/uploads/site/logo.png',
      'width',160,
      'height',60
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'company_brand',
  'de',
  CAST(JSON_OBJECT(
    'name','Güzel Webdesign',
    'shortName','GWD',
    'website','https://www.guezelwebdesign.com',
    'logo',JSON_OBJECT(
      'url','https://www.guezelwebdesign.com/uploads/site/logo.png',
      'width',160,
      'height',60
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: page_services (tr/en/de)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'page_services',
  'tr',
  CAST(JSON_OBJECT(
    'badge','Hizmetlerim',
    'title_html','Fikirleri <span class="text-300">sezgisel tasarımlarla</span> etkileyici kullanıcı <span class="text-300">deneyimlerine</span> dönüştürüyorum',
    'intro_html','Mobil uygulama ve web tasarımındaki uzmanlığımla fikirleri görsel açıdan etkileyici <br /> ve kullanıcı dostu arayüzlere dönüştürüyorum. <br /> Çalışmalarımı keşfedin ve tasarımı aksiyonda görün.',
    'cta_label','Teklif Al',
    'loading','Yükleniyor...',
    'error','Hizmetler yüklenemedi.',
    'empty','Hizmet bulunamadı.',
    'highlight_label','Öne Çıkan',
    'details_label','Detaylar'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_services',
  'en',
  CAST(JSON_OBJECT(
    'badge','My Services',
    'title_html','Transforming Ideas <span class="text-300">into Intuitive Designs for</span> Engaging User <span class="text-300">Experiences</span>',
    'intro_html','With expertise in mobile app and web design, I transform ideas into visually <br /> stunning and user-friendly interfaces that captivate and retain users. <br /> Explore my work and see design in action.',
    'cta_label','Get a Quote',
    'loading','Loading...',
    'error','Failed to load services.',
    'empty','No services found.',
    'highlight_label','Highlight',
    'details_label','Details'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_services',
  'de',
  CAST(JSON_OBJECT(
    'badge','Meine Leistungen',
    'title_html','Ich verwandle Ideen <span class="text-300">in intuitive Designs</span> für fesselnde <span class="text-300">Nutzererlebnisse</span>',
    'intro_html','Mit Erfahrung in Mobile- und Webdesign verwandle ich Ideen in visuell <br /> ansprechende und benutzerfreundliche Interfaces, die begeistern. <br /> Entdecken Sie meine Arbeiten und sehen Sie Design in Aktion.',
    'cta_label','Angebot anfordern',
    'loading','Wird geladen...',
    'error','Services konnten nicht geladen werden.',
    'empty','Keine Services gefunden.',
    'highlight_label','Highlight',
    'details_label','Details'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: page_work (tr/en/de)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'page_work',
  'tr',
  CAST(JSON_OBJECT(
    'badge','Son Çalışmalar',
    'title_html','Son çalışmalarımı <span class="text-300">keşfedin ve</span> her tasarımın <span class="text-300">ardındaki ustalığı</span> görün',
    'intro_html','En yeni çalışmalarımı keşfedin ve her tasarımın arkasındaki ustalığı görün: <br /> yenilik ve yaratıcılığı nasıl hayata geçirdiğime yakından bakın',
    'loading_title','Yükleniyor...',
    'label_client','Müşteri',
    'label_completion_time','Tamamlanma Süresi',
    'label_tools','Araçlar',
    'updating','Güncelleniyor...',
    'empty_title','Proje bulunamadı',
    'empty_text','Lütfen yönetim panelinden proje ekleyin.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_work',
  'en',
  CAST(JSON_OBJECT(
    'badge','Recent Work',
    'title_html','Explore <span class="text-300">My Latest Work and Discover the</span> Craftsmanship Behind <span class="text-300">Each Design</span>',
    'intro_html','Explore my latest work and discover the craftsmanship behind each design: <br />a detailed look into how I bring innovation and creativity to life',
    'loading_title','Loading...',
    'label_client','Client',
    'label_completion_time','Completion Time',
    'label_tools','Tools',
    'updating','Updating...',
    'empty_title','No projects found',
    'empty_text','Please add projects from admin panel.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_work',
  'de',
  CAST(JSON_OBJECT(
    'badge','Aktuelle Arbeiten',
    'title_html','Entdecken Sie <span class="text-300">meine neuesten Arbeiten und</span> die Handwerkskunst hinter <span class="text-300">jedem Design</span>',
    'intro_html','Entdecken Sie meine neuesten Arbeiten und die Handwerkskunst hinter jedem Design: <br /> ein genauer Blick darauf, wie ich Innovation und Kreativität zum Leben erwecke',
    'loading_title','Wird geladen...',
    'label_client','Kunde',
    'label_completion_time','Fertigstellungszeit',
    'label_tools','Tools',
    'updating','Aktualisiere...',
    'empty_title','Keine Projekte gefunden',
    'empty_text','Bitte fügen Sie Projekte im Admin-Panel hinzu.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: page_pricing (tr/en/de)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'page_pricing',
  'tr',
  CAST(JSON_OBJECT(
    'badge','Fiyatlandırma',
    'title_html','Her bütçeye uygun <span class="text-300">çözümler</span>',
    'intro_html','İhtiyaçlarınıza göre şekillenen esnek planlar, yüksek kaliteyi <br /> bütçenizi zorlamadan sunar',
    'loading','Yükleniyor...',
    'error','Fiyat/SSS verileri yüklenemedi.',
    'empty','Fiyat planı bulunamadı.',
    'cta_default_label','Hemen Sipariş Ver',
    'faq_title','Sık Sorulan Sorular',
    'faq_empty','SSS bulunamadı.',
    'faq_error','SSS yüklenemedi.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_pricing',
  'en',
  CAST(JSON_OBJECT(
    'badge','My Pricing',
    'title_html','Affordable <span class="text-300">Solutions for Every</span> Budget',
    'intro_html','Flexible Plans Tailored to Meet Your Unique Needs, Ensuring High-Quality Services <br /> Without Breaking the Bank',
    'loading','Loading...',
    'error','Failed to load pricing/faq data.',
    'empty','No pricing plans found.',
    'cta_default_label','Order Now',
    'faq_title','Common Questions',
    'faq_empty','No FAQs found.',
    'faq_error','Failed to load FAQs.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_pricing',
  'de',
  CAST(JSON_OBJECT(
    'badge','Preise',
    'title_html','Erschwingliche <span class="text-300">Lösungen für jedes</span> Budget',
    'intro_html','Flexible Pläne, die auf Ihre Bedürfnisse zugeschnitten sind, mit hoher Qualität <br /> ohne das Budget zu sprengen',
    'loading','Wird geladen...',
    'error','Preise/FAQ konnten nicht geladen werden.',
    'empty','Keine Preispläne gefunden.',
    'cta_default_label','Jetzt bestellen',
    'faq_title','Häufige Fragen',
    'faq_empty','Keine FAQs gefunden.',
    'faq_error','FAQs konnten nicht geladen werden.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

-- =============================================================
-- LOCALIZED: page_blog (tr/en/de)
-- =============================================================
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'page_blog',
  'tr',
  CAST(JSON_OBJECT(
    'badge','Son Yazılar',
    'title_html','Sektörümüzü şekillendiren <span class="text-dark">içgörüleri ve trendleri</span> keşfedin',
    'intro_html','Tasarımın geleceğini şekillendiren önemli içgörüleri ve yükselen trendleri keşfedin: <br /> bu yeniliklerin sektörümüzü nasıl yeniden şekillendirdiğine yakından bakın',
    'loading','Yükleniyor...',
    'error','Yazılar yüklenemedi.',
    'read_time','3 dk okuma',
    'default_category','Blog'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_blog',
  'en',
  CAST(JSON_OBJECT(
    'badge','Recent blog',
    'title_html','Explore the <span class="text-dark">insights and trends shaping</span> our industry',
    'intro_html','Discover key insights and emerging trends shaping the future of design: a detailed <br /> examination of how these innovations are reshaping our industry',
    'loading','Loading...',
    'error','Failed to load posts.',
    'read_time','3 min read',
    'default_category','Blog'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'page_blog',
  'de',
  CAST(JSON_OBJECT(
    'badge','Aktuelle Beiträge',
    'title_html','Entdecken Sie die <span class="text-dark">Insights und Trends, die</span> unsere Branche prägen',
    'intro_html','Entdecken Sie wichtige Insights und neue Trends, die die Zukunft des Designs prägen: <br /> ein detaillierter Blick darauf, wie diese Innovationen unsere Branche verändern',
    'loading','Wird geladen...',
    'error','Beiträge konnten nicht geladen werden.',
    'read_time','3 Min. Lesezeit',
    'default_category','Blog'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
