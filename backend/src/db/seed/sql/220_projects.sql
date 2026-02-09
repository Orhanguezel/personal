-- 220_projects.sql
-- Multilingual Projects + Gallery (projects + projects_i18n + project_images + project_images_i18n)
-- Drizzle schema ile uyumlu:
--  - projects: dil bağımsız parent alanlar + portfolio fields + techs/services JSON-string (LONGTEXT)
--  - projects_i18n: (project_id, locale) unique + (locale, slug) unique
--  - project_images: project gallery parent (project_id)
--  - project_images_i18n: (image_id, locale) unique
--
-- Notlar:
--  - Drizzle tarafında updated_at .$onUpdateFn(() => new Date()) var.
--    SQL tarafında aynı davranış için ON UPDATE CURRENT_TIMESTAMP(3) kullanıyoruz.
--  - LONGTEXT alanlar JSON-string saklıyor (services, techs, summary, content, caption).
--
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

SET FOREIGN_KEY_CHECKS = 0;

-- Eski yapıyı temizle (önce child, sonra parent)
DROP TABLE IF EXISTS `project_images_i18n`;
DROP TABLE IF EXISTS `project_images`;
DROP TABLE IF EXISTS `projects_i18n`;
DROP TABLE IF EXISTS `projects`;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- PARENT TABLO: projects (dil bağımsız)
-- =============================================================
CREATE TABLE IF NOT EXISTS `projects` (
  `id`                      CHAR(36)     NOT NULL,

  `is_published`            TINYINT(1)    NOT NULL DEFAULT 0,
  `is_featured`             TINYINT(1)    NOT NULL DEFAULT 0,
  `display_order`           INT           NOT NULL DEFAULT 0,

  -- main visual
  `featured_image`          VARCHAR(500)  DEFAULT NULL,
  `featured_image_asset_id` CHAR(36)      DEFAULT NULL,

  -- links
  `demo_url`                VARCHAR(500)  DEFAULT NULL,
  `repo_url`                VARCHAR(500)  DEFAULT NULL,

  -- portfolio fields (parent)
  `category`                VARCHAR(100)  DEFAULT NULL,
  `client_name`             VARCHAR(255)  DEFAULT NULL,
  `start_date`              DATE          DEFAULT NULL,
  `complete_date`           DATE          DEFAULT NULL,
  `completion_time_label`   VARCHAR(100)  DEFAULT NULL,
  `services`                LONGTEXT      DEFAULT NULL, -- JSON-string string[]
  `website_url`             VARCHAR(500)  DEFAULT NULL,

  -- tools/tech stack
  `techs`                   LONGTEXT      DEFAULT NULL, -- JSON-string string[]

  `created_at`              DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`              DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                          ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `projects_created_idx`        (`created_at`),
  KEY `projects_updated_idx`        (`updated_at`),
  KEY `projects_published_idx`      (`is_published`),
  KEY `projects_featured_idx`       (`is_featured`),
  KEY `projects_display_order_idx`  (`display_order`),
  KEY `projects_featured_asset_idx` (`featured_image_asset_id`),

  KEY `projects_category_idx`       (`category`),
  KEY `projects_client_idx`         (`client_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N TABLO: projects_i18n
-- =============================================================
CREATE TABLE IF NOT EXISTS `projects_i18n` (
  `id`                 CHAR(36)     NOT NULL,
  `project_id`         CHAR(36)     NOT NULL,
  `locale`             VARCHAR(8)   NOT NULL,

  `title`              VARCHAR(255) NOT NULL,
  `slug`               VARCHAR(255) NOT NULL,

  `summary`             LONGTEXT     DEFAULT NULL,
  `content`             LONGTEXT     NOT NULL, -- JSON-string (packContent sonucu)

  `featured_image_alt` VARCHAR(255) DEFAULT NULL,
  `meta_title`         VARCHAR(255) DEFAULT NULL,
  `meta_description`   VARCHAR(500) DEFAULT NULL,

  `created_at`         DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`         DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                    ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `projects_i18n_project_locale_uq` (`project_id`, `locale`),
  UNIQUE KEY `projects_i18n_locale_slug_uq`    (`locale`, `slug`),

  KEY `projects_i18n_project_idx` (`project_id`),
  KEY `projects_i18n_locale_idx`  (`locale`),
  KEY `projects_i18n_slug_idx`    (`slug`),

  CONSTRAINT `fk_projects_i18n_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- PARENT TABLO: project_images (gallery)
-- =============================================================
CREATE TABLE IF NOT EXISTS `project_images` (
  `id`            CHAR(36)     NOT NULL,
  `project_id`    CHAR(36)     NOT NULL,

  `asset_id`      CHAR(36)     NOT NULL,
  `image_url`     VARCHAR(500) DEFAULT NULL,

  `display_order` INT          NOT NULL DEFAULT 0,
  `is_active`     TINYINT(1)   NOT NULL DEFAULT 1,

  `created_at`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `project_images_project_idx` (`project_id`),
  KEY `project_images_asset_idx`   (`asset_id`),
  KEY `project_images_active_idx`  (`is_active`),
  KEY `project_images_order_idx`   (`display_order`),

  CONSTRAINT `fk_project_images_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N TABLO: project_images_i18n
-- =============================================================
CREATE TABLE IF NOT EXISTS `project_images_i18n` (
  `id`         CHAR(36)     NOT NULL,
  `image_id`   CHAR(36)     NOT NULL,
  `locale`     VARCHAR(8)   NOT NULL,

  `alt`        VARCHAR(255) DEFAULT NULL,
  `caption`    LONGTEXT     DEFAULT NULL,

  `created_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                              ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `project_images_i18n_image_locale_uq` (`image_id`, `locale`),

  KEY `project_images_i18n_image_idx`  (`image_id`),
  KEY `project_images_i18n_locale_idx` (`locale`),

  CONSTRAINT `fk_project_images_i18n_image`
    FOREIGN KEY (`image_id`) REFERENCES `project_images`(`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
