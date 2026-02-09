-- =============================================================
-- 040.12_site_settings_media.sql
-- Guezel Web Design – global media (logo + favicon + OG)
-- Values are GLOBAL (locale='*') and safe for SEO usage
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'site_logo',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/landing-page/logo.svg',
    'alt','Guezel Web Design',
    'width',66,
    'height',65
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'site_logo_dark',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/landing-page/logo.svg',
    'alt','Guezel Web Design',
    'width',66,
    'height',65
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'site_logo_light',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/landing-page/logo.svg',
    'alt','Guezel Web Design',
    'width',66,
    'height',65
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'site_favicon',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/template/favicon.svg',
    'alt','Guezel Web Design'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'site_apple_touch_icon',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/template/favicon.svg',
    'alt','Guezel Web Design'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'site_app_icon_512',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/template/favicon.svg',
    'alt','Guezel Web Design'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'site_og_default_image',
  '*',
  CAST(JSON_OBJECT(
    'url','/assets/imgs/home-page-3/hero/img-1.png',
    'alt','Guezel Web Design'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value`      = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
