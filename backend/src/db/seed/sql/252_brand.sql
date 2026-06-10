-- =============================================================
-- 252_brand.sql  (schema)
-- Brand logos module — logos + i18n (storage FK)
-- - brand_logos + brand_logos_i18n
-- - image_asset_id -> storage_assets(id)  ON DELETE SET NULL
-- - Drizzle schema.ts ile bire bir
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `brand_logos_i18n`;
DROP TABLE IF EXISTS `brand_logos`;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- PARENT: brand_logos
-- =============================================================
CREATE TABLE `brand_logos` (
  `id`             CHAR(36)     NOT NULL,

  `track`          VARCHAR(16)  NOT NULL DEFAULT 'right',

  `image_url`      VARCHAR(500)          DEFAULT NULL,
  `image_asset_id` CHAR(36)              DEFAULT NULL,

  `is_active`      TINYINT(1)   NOT NULL DEFAULT 1,
  `display_order`  INT          NOT NULL DEFAULT 0,

  `created_at`     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `brand_logos_track_idx`   (`track`),
  KEY `brand_logos_active_idx`  (`is_active`),
  KEY `brand_logos_order_idx`   (`display_order`),
  KEY `brand_logos_created_idx` (`created_at`),
  KEY `brand_logos_updated_idx` (`updated_at`),
  KEY `brand_logos_asset_idx`   (`image_asset_id`),

  CONSTRAINT `fk_brand_logos_asset`
    FOREIGN KEY (`image_asset_id`) REFERENCES `storage_assets`(`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N: brand_logos_i18n
-- =============================================================
CREATE TABLE `brand_logos_i18n` (
  `id`         CHAR(36)     NOT NULL,
  `logo_id`    CHAR(36)     NOT NULL,
  `locale`     VARCHAR(10)  NOT NULL,

  `label`      VARCHAR(300) NOT NULL,

  `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                             ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_brand_logo_i18n_parent_locale` (`logo_id`, `locale`),

  KEY `brand_logo_i18n_locale_idx` (`locale`),

  CONSTRAINT `fk_brand_logo_i18n_logo`
    FOREIGN KEY (`logo_id`) REFERENCES `brand_logos`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
