-- =============================================================
-- 004 — site_settings schema + sablon marka varsayilanlari
-- Tema katalogu: 013_theme_presets_seed.sql
-- Marka metni: GZL Teknoloji tokeni — scripts/apply-brand.py ile proje adina cevrilir
-- =============================================================

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `site_settings`;

CREATE TABLE `site_settings` (
  `id` VARCHAR(64) NOT NULL,
  `key` VARCHAR(100) NOT NULL,
  `locale` VARCHAR(8) NOT NULL DEFAULT '*',
  `value` MEDIUMTEXT NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_locale_uq` (`key`, `locale`),
  KEY `site_settings_key_idx` (`key`),
  KEY `site_settings_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-brand-name',        'brand_name',        '*', '"GZL Teknoloji"'),
('ss-brand-subtitle',    'brand_subtitle',    '*', '"Yazilim, danismanlik ve teknoloji"'),
('ss-brand-short-name',  'brand_short_name',  '*', '"GZL Teknoloji"'),
('ss-topbar-slogan',     'topbar_slogan',     '*', '"Guvenilir icerik ve hizmet"'),
('ss-app-name',          'app_name',          '*', '"GZL Teknoloji"'),
('ss-app-version',       'app_version',       '*', '"0.1.0"'),
('ss-default-locale',    'default_locale',    '*', '"tr"'),
('ss-available-locales', 'available_locales', '*', '["tr","en"]'),
('ss-footer-copyright',  'footer_copyright',  '*', '"© 2026 GZL Teknoloji. Tum haklari saklidir."'),
('ss-footer-keywords',   'footer_keywords',   '*', '["web","icerik","yonetim","GZL Teknoloji"]'),
('ss-developer-branding','developer_branding','*', '{"name":"GWD","full_name":"Guzel Web Design","url":"https://guezelwebdesign.com"}'),
('ss-storage-driver',    'storage_driver',    '*', '"local"'),
('ss-app-locales',       'app_locales',       '*', '[{"code":"tr","label":"TR","is_default":true,"is_active":true},{"code":"en","label":"EN","is_default":false,"is_active":true}]'),
('ss-facebook-pixel-id', 'facebook_pixel_id', '*', '"38701926646073227"'),
('ss-ga4-measurement-id', 'ga4_measurement_id', '*', '""'),
('ss-google-site-verification', 'google_site_verification', '*', '""'),
('ss-gtm-container-id', 'gtm_container_id', '*', '""'),
('ss-site-logo',         'site_logo',         '*', '{"url":"/uploads/site-media/logo_transparent.png","asset_id":"18000000-0000-4000-8000-000000000001","width":1410,"height":261}'),
('ss-site-logo-dark',    'site_logo_dark',    '*', '{"url":"/uploads/site-media/logo_dark.png","asset_id":"18000000-0000-4000-8000-000000000006","width":1410,"height":261}'),
('ss-site-logo-light',   'site_logo_light',   '*', '{"url":"/uploads/site-media/emblem.png","asset_id":"18000000-0000-4000-8000-000000000007","width":512,"height":512}'),
('ss-site-favicon',      'site_favicon',      '*', '{"url":"/uploads/site-media/favicon.png","asset_id":"18000000-0000-4000-8000-000000000002","width":256,"height":256}'),
('ss-site-apple-touch',  'site_apple_touch_icon','*','{"url":"/uploads/site-media/apple-touch-icon.png","asset_id":"18000000-0000-4000-8000-000000000003","width":180,"height":180}'),
('ss-site-app-icon-192', 'site_app_icon_192', '*', '{"url":"/uploads/site-media/icon-192.png","asset_id":"18000000-0000-4000-8000-000000000004","width":192,"height":192}'),
('ss-site-app-icon-512', 'site_app_icon_512', '*', '{"url":"/uploads/site-media/icon-512.png","asset_id":"18000000-0000-4000-8000-000000000005","width":512,"height":512}'),
('ss-contact-info',      'contact_info',      '*', '{"email":"info@gzlteknoloji.com","phone":"","address":{"streetAddress":"Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14","addressLocality":"Gemlik","addressRegion":"Bursa","addressCountry":"TR"}}'),
('ss-socials',           'socials',           '*', '{}'),
('ss-company-brand',     'company_brand',     '*', '{"name":"GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi","short_name":"GZL Teknoloji","website":"https://gzlteknoloji.com","phone":"","email":"info@gzlteknoloji.com","descriptions":{"tr":"Gemlik ve Bursa merkezli yazılım, dijital çözüm ve teknoloji şirketi.","en":"A software, digital solutions and technology company based in Gemlik and Bursa."},"socials":{},"legal":{"vergi_dairesi":"Gemlik","vergi_no":"4542302453","mersis":"0454230245300001","ticaret_sicil":"7069 (Gemlik)","adres":"Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa"}}'),
('ss-ui-same-as',        'ui_same_as',        '*', '["https://github.com/Orhanguezel","https://bionluk.com/orhanguzell","https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a"]'),
('ss-ui-founder',        'ui_founder',        '*', '{"name":"Orhan Güzel","job_title":{"tr":"Kurucu ve Yazilim Gelistirici","en":"Founder and Software Developer"},"knows_about":["Next.js","Fastify","TypeScript","MySQL","SEO","GEO","SaaS","DevOps"],"same_as":["https://github.com/Orhanguezel","https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a"]}'),
('ss-cookie-consent',    'cookie_consent',    '*', '{"consent_version":1,"ui":{"enabled":true,"position":"bottom","show_reject_all":true},"defaults":{"necessary":true,"analytics":false,"marketing":false},"texts":{"title":"Cerezler","description":"Deneyimi gelistirmek icin cerezler kullaniyoruz."}}'),
('ss-chat-widget-enabled', 'chat_widget_enabled', '*', 'false'),
('ss-chat-ai-welcome-message-loc-tr', 'chat_ai_welcome_message', 'tr', '""'),
('ss-chat-ai-welcome-message-loc-all', 'chat_ai_welcome_message', '*', '""'),
('ss-ui-support-ai-image', 'ui_support_ai_image', '*', '""'),
('ss-ui-admin-config', 'ui_admin_config', '*', '{"branding":{"app_name":"GZL Teknoloji Admin","app_copyright":"GZL Teknoloji","html_lang":"tr","theme_color":"#15803d","favicon_16":"/favicon/favicon-16.svg","favicon_32":"/favicon/favicon-32.svg","favicon_url":"/favicon.ico","logo_url":"","apple_touch_icon":"/favicon/apple-touch-icon.svg","admin_login_quote":"Site ayarlarini ve icerigi buradan yonetin.","admin_login_heading":"","admin_login_background_url":"/img/admin_login_bg.png","meta":{"title":"GZL Teknoloji Admin","description":"Yonetim paneli.","og_url":"http://localhost:3096","og_title":"GZL Teknoloji Admin","og_description":"Yonetim paneli.","og_image":"/favicon.svg","twitter_card":"summary_large_image"}}}');
