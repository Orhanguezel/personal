-- =============================================================
-- 250_skill.sql  (schema)
-- Skills module — counters + logos + i18n (storage FK)
-- - skill_counters + skill_counters_i18n
-- - skill_logos    + skill_logos_i18n
-- - image_asset_id -> storage_assets(id)  ON DELETE SET NULL
-- - Drizzle schema.ts ile bire bir
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `skill_logos_i18n`;
DROP TABLE IF EXISTS `skill_logos`;
DROP TABLE IF EXISTS `skill_counters_i18n`;
DROP TABLE IF EXISTS `skill_counters`;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- PARENT: skill_counters
-- =============================================================
CREATE TABLE `skill_counters` (
  `id`             CHAR(36)    NOT NULL,

  `percent`        SMALLINT    NOT NULL DEFAULT 0,

  `image_url`      VARCHAR(500)         DEFAULT NULL,
  `image_asset_id` CHAR(36)             DEFAULT NULL,

  `is_active`      TINYINT(1)  NOT NULL DEFAULT 1,
  `display_order`  INT         NOT NULL DEFAULT 0,

  `created_at`     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                               ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `skill_counters_active_idx`  (`is_active`),
  KEY `skill_counters_order_idx`   (`display_order`),
  KEY `skill_counters_created_idx` (`created_at`),
  KEY `skill_counters_updated_idx` (`updated_at`),
  KEY `skill_counters_asset_idx`   (`image_asset_id`),

  CONSTRAINT `fk_skill_counters_asset`
    FOREIGN KEY (`image_asset_id`) REFERENCES `storage_assets`(`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N: skill_counters_i18n
-- =============================================================
CREATE TABLE `skill_counters_i18n` (
  `id`          CHAR(36)     NOT NULL,
  `counter_id`  CHAR(36)     NOT NULL,
  `locale`      VARCHAR(10)  NOT NULL,

  `title`       VARCHAR(300) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL,

  `created_at`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                              ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_skill_counter_i18n_parent_locale` (`counter_id`, `locale`),
  UNIQUE KEY `ux_skill_counter_i18n_locale_slug`   (`locale`, `slug`),

  KEY `skill_counter_i18n_locale_idx` (`locale`),
  KEY `skill_counter_i18n_slug_idx`   (`slug`),

  CONSTRAINT `fk_skill_counter_i18n_counter`
    FOREIGN KEY (`counter_id`) REFERENCES `skill_counters`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- PARENT: skill_logos
-- =============================================================
CREATE TABLE `skill_logos` (
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

  KEY `skill_logos_track_idx`   (`track`),
  KEY `skill_logos_active_idx`  (`is_active`),
  KEY `skill_logos_order_idx`   (`display_order`),
  KEY `skill_logos_created_idx` (`created_at`),
  KEY `skill_logos_updated_idx` (`updated_at`),
  KEY `skill_logos_asset_idx`   (`image_asset_id`),

  CONSTRAINT `fk_skill_logos_asset`
    FOREIGN KEY (`image_asset_id`) REFERENCES `storage_assets`(`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N: skill_logos_i18n
-- =============================================================
CREATE TABLE `skill_logos_i18n` (
  `id`         CHAR(36)     NOT NULL,
  `logo_id`    CHAR(36)     NOT NULL,
  `locale`     VARCHAR(10)  NOT NULL,

  `label`      VARCHAR(300) NOT NULL,

  `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                             ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_skill_logo_i18n_parent_locale` (`logo_id`, `locale`),

  KEY `skill_logo_i18n_locale_idx` (`locale`),

  CONSTRAINT `fk_skill_logo_i18n_logo`
    FOREIGN KEY (`logo_id`) REFERENCES `skill_logos`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
