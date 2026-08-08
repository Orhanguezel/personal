-- storage_assets.sql — Medya/dosya kayitlari (shared storage modulu)
-- provider=local|cloudinary; bucket=default/public/avatars...
-- path = LOCAL_STORAGE_ROOT altindaki goreli yol
-- url  = LOCAL_STORAGE_BASE_URL + '/' + path  (yerelde goreli; publicApiBase ile mutlaklasir)
-- Marka medyalari backend/uploads/site-media altinda tutulur. Bu kayitlar sayesinde
-- ilk kurulumdan itibaren Admin > Storage ekraninda gorunur ve storage CRUD ile yonetilir.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `storage_assets` (
  `id`         CHAR(36)        NOT NULL,
  `user_id`    CHAR(36)        DEFAULT NULL,
  `name`       VARCHAR(255)    NOT NULL,
  `bucket`     VARCHAR(64)     NOT NULL,
  `path`       VARCHAR(512)    NOT NULL,
  `folder`     VARCHAR(255)    DEFAULT NULL,
  `mime`       VARCHAR(127)    NOT NULL,
  `size`       BIGINT UNSIGNED NOT NULL,
  `width`      INT UNSIGNED    DEFAULT NULL,
  `height`     INT UNSIGNED    DEFAULT NULL,
  `url`        TEXT            DEFAULT NULL,
  `hash`       VARCHAR(64)     DEFAULT NULL,
  `provider`               VARCHAR(16)  NOT NULL DEFAULT 'local',
  `provider_public_id`     VARCHAR(255) DEFAULT NULL,
  `provider_resource_type` VARCHAR(16)  DEFAULT NULL,
  `provider_format`        VARCHAR(32)  DEFAULT NULL,
  `provider_version`       INT UNSIGNED DEFAULT NULL,
  `etag`                   VARCHAR(64)  DEFAULT NULL,
  `metadata`   JSON            DEFAULT NULL,
  `created_at` DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_bucket_path` (`bucket`, `path`),
  KEY `idx_storage_bucket`  (`bucket`),
  KEY `idx_storage_folder`  (`folder`),
  KEY `idx_storage_created` (`created_at`),
  KEY `idx_provider_pubid`  (`provider_public_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `storage_assets`
  (`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`,
   `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`)
VALUES
  ('18000000-0000-4000-8000-000000000001', NULL, 'logo.png', 'public', 'site-media/logo.png', 'site-media',
   'image/png', 23176, 640, 144, '/uploads/site-media/logo.png', NULL,
   'local', 'site-media/logo.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_logo','role','brand-logo')),
  ('18000000-0000-4000-8000-000000000002', NULL, 'favicon.png', 'public', 'site-media/favicon.png', 'site-media',
   'image/png', 3694, 32, 32, '/uploads/site-media/favicon.png', NULL,
   'local', 'site-media/favicon.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_favicon','role','favicon')),
  ('18000000-0000-4000-8000-000000000003', NULL, 'apple-touch-icon.png', 'public', 'site-media/apple-touch-icon.png', 'site-media',
   'image/png', 8358, 180, 180, '/uploads/site-media/apple-touch-icon.png', NULL,
   'local', 'site-media/apple-touch-icon.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_apple_touch_icon','role','apple-touch-icon')),
  ('18000000-0000-4000-8000-000000000004', NULL, 'icon-192.png', 'public', 'site-media/icon-192.png', 'site-media',
   'image/png', 46218, 192, 192, '/uploads/site-media/icon-192.png', NULL,
   'local', 'site-media/icon-192.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_app_icon_192','role','pwa-icon')),
  ('18000000-0000-4000-8000-000000000005', NULL, 'icon-512.png', 'public', 'site-media/icon-512.png', 'site-media',
   'image/png', 287207, 512, 512, '/uploads/site-media/icon-512.png', NULL,
   'local', 'site-media/icon-512.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_app_icon_512','role','pwa-icon')),
  ('18000000-0000-4000-8000-000000000006', NULL, 'logo_dark.png', 'public', 'site-media/logo_dark.png', 'site-media',
   'image/png', 299973, 751, 783, '/uploads/site-media/logo_dark.png', NULL,
   'local', 'site-media/logo_dark.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_logo_dark','role','brand-logo')),
  ('18000000-0000-4000-8000-000000000007', NULL, 'emblem.png', 'public', 'site-media/emblem.png', 'site-media',
   'image/png', 210860, 512, 512, '/uploads/site-media/emblem.png', NULL,
   'local', 'site-media/emblem.png', 'image', 'png', NULL, NULL,
   JSON_OBJECT('scope','site_settings','key','site_logo_light','role','brand-logo'))
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `path` = VALUES(`path`),
  `mime` = VALUES(`mime`),
  `size` = VALUES(`size`),
  `width` = VALUES(`width`),
  `height` = VALUES(`height`),
  `url` = VALUES(`url`),
  `provider_public_id` = VALUES(`provider_public_id`),
  `metadata` = VALUES(`metadata`);
