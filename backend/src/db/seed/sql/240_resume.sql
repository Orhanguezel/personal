-- =============================================================
-- 240_resume.sql
-- =============================================================
-- Resume entries (education/experience) + i18n
-- - parent: resume_entries (locale-independent)
-- - i18n  : resume_entries_i18n (title/subtitle/description/highlights_json/slug per locale)
-- - NO category/sub_category
-- - Drizzle schema.ts ile bire bir uyumlu
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;

-- önce child sonra parent
DROP TABLE IF EXISTS `resume_entries_i18n`;
DROP TABLE IF EXISTS `resume_entries`;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- PARENT: resume_entries
-- =============================================================
CREATE TABLE `resume_entries` (
  `id`            CHAR(36)    NOT NULL,

  -- education | experience
  `type`          VARCHAR(20) NOT NULL,

  `is_active`     TINYINT(1)  NOT NULL DEFAULT 1,
  `display_order` INT         NOT NULL DEFAULT 0,

  `start_date`    DATE        NOT NULL,
  `end_date`      DATE                 DEFAULT NULL,
  `is_current`    TINYINT(1)  NOT NULL DEFAULT 0,

  `location`      VARCHAR(200)         DEFAULT NULL,
  `organization`  VARCHAR(200)         DEFAULT NULL,

  -- score like 4.9/5
  `score_value`   DECIMAL(3,1)         DEFAULT NULL,
  `score_scale`   INT         NOT NULL DEFAULT 5,

  `created_at`    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                               ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `resume_entries_type_idx`    (`type`),
  KEY `resume_entries_active_idx`  (`is_active`),
  KEY `resume_entries_order_idx`   (`display_order`),
  KEY `resume_entries_start_idx`   (`start_date`),
  KEY `resume_entries_end_idx`     (`end_date`),
  KEY `resume_entries_created_idx` (`created_at`),
  KEY `resume_entries_updated_idx` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N: resume_entries_i18n
-- =============================================================
CREATE TABLE `resume_entries_i18n` (
  `id`             CHAR(36)     NOT NULL,
  `entry_id`       CHAR(36)     NOT NULL,
  `locale`         VARCHAR(10)  NOT NULL,

  `title`          VARCHAR(300) NOT NULL,
  `subtitle`       VARCHAR(300) NOT NULL,

  `description`     LONGTEXT            DEFAULT NULL,
  `highlights_json` LONGTEXT            DEFAULT NULL,

  `slug`           VARCHAR(255) NOT NULL,

  `created_at`     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                 ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_resume_i18n_parent_locale` (`entry_id`, `locale`),
  UNIQUE KEY `ux_resume_i18n_locale_slug`   (`locale`, `slug`),

  KEY `resume_i18n_locale_idx` (`locale`),
  KEY `resume_i18n_slug_idx`   (`slug`),

  CONSTRAINT `fk_resume_i18n_entry`
    FOREIGN KEY (`entry_id`) REFERENCES `resume_entries`(`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
