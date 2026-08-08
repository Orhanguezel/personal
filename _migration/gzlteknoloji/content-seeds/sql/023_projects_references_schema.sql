-- =============================================================
-- 023 — projects + references schema
-- Shared backend: modules/projects/schema.ts, modules/references/schema.ts
-- =============================================================

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `reference_images_i18n`;
DROP TABLE IF EXISTS `reference_images`;
DROP TABLE IF EXISTS `references_i18n`;
DROP TABLE IF EXISTS `references`;
DROP TABLE IF EXISTS `project_images_i18n`;
DROP TABLE IF EXISTS `project_images`;
DROP TABLE IF EXISTS `projects_i18n`;
DROP TABLE IF EXISTS `projects`;

CREATE TABLE `projects` (
  `id` CHAR(36) NOT NULL,
  `is_published` TINYINT NOT NULL DEFAULT 0,
  `is_featured` TINYINT NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `price_onetime` DECIMAL(12,2) DEFAULT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'EUR',
  `is_purchasable` TINYINT NOT NULL DEFAULT 0,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `featured_image_asset_id` CHAR(36) DEFAULT NULL,
  `demo_url` VARCHAR(500) DEFAULT NULL,
  `repo_url` VARCHAR(500) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `client_name` VARCHAR(255) DEFAULT NULL,
  `start_date` DATE DEFAULT NULL,
  `complete_date` DATE DEFAULT NULL,
  `completion_time_label` VARCHAR(100) DEFAULT NULL,
  `services` LONGTEXT DEFAULT NULL,
  `website_url` VARCHAR(500) DEFAULT NULL,
  `techs` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `projects_created_idx` (`created_at`),
  KEY `projects_updated_idx` (`updated_at`),
  KEY `projects_published_idx` (`is_published`),
  KEY `projects_featured_idx` (`is_featured`),
  KEY `projects_display_order_idx` (`display_order`),
  KEY `projects_featured_asset_idx` (`featured_image_asset_id`),
  KEY `projects_category_idx` (`category`),
  KEY `projects_client_idx` (`client_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `projects_i18n` (
  `id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(8) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `summary` LONGTEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `featured_image_alt` VARCHAR(255) DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `projects_i18n_project_locale_uq` (`project_id`, `locale`),
  UNIQUE KEY `projects_i18n_locale_slug_uq` (`locale`, `slug`),
  KEY `projects_i18n_project_idx` (`project_id`),
  KEY `projects_i18n_locale_idx` (`locale`),
  KEY `projects_i18n_slug_idx` (`slug`),
  CONSTRAINT `projects_i18n_project_fk`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `project_images` (
  `id` CHAR(36) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  `asset_id` CHAR(36) NOT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `project_images_project_idx` (`project_id`),
  KEY `project_images_asset_idx` (`asset_id`),
  KEY `project_images_active_idx` (`is_active`),
  KEY `project_images_order_idx` (`display_order`),
  CONSTRAINT `project_images_project_fk`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `project_images_i18n` (
  `id` CHAR(36) NOT NULL,
  `image_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(8) NOT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `caption` LONGTEXT DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_images_i18n_image_locale_uq` (`image_id`, `locale`),
  KEY `project_images_i18n_image_idx` (`image_id`),
  KEY `project_images_i18n_locale_idx` (`locale`),
  CONSTRAINT `project_images_i18n_image_fk`
    FOREIGN KEY (`image_id`) REFERENCES `project_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `references` (
  `id` CHAR(36) NOT NULL,
  `is_published` TINYINT NOT NULL DEFAULT 0,
  `is_featured` TINYINT NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `featured_image_asset_id` CHAR(36) DEFAULT NULL,
  `website_url` VARCHAR(500) DEFAULT NULL,
  `category_id` CHAR(36) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `references_created_idx` (`created_at`),
  KEY `references_updated_idx` (`updated_at`),
  KEY `references_published_idx` (`is_published`),
  KEY `references_featured_idx` (`is_featured`),
  KEY `references_display_order_idx` (`display_order`),
  KEY `references_featured_asset_idx` (`featured_image_asset_id`),
  KEY `references_category_id_idx` (`category_id`),
  CONSTRAINT `fk_references_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `references_i18n` (
  `id` CHAR(36) NOT NULL,
  `reference_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(10) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `summary` LONGTEXT DEFAULT NULL,
  `content` LONGTEXT NOT NULL,
  `featured_image_alt` VARCHAR(255) DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_references_i18n_parent_locale` (`reference_id`, `locale`),
  UNIQUE KEY `ux_references_i18n_locale_slug` (`locale`, `slug`),
  KEY `references_i18n_locale_idx` (`locale`),
  KEY `references_i18n_slug_idx` (`slug`),
  CONSTRAINT `references_i18n_reference_fk`
    FOREIGN KEY (`reference_id`) REFERENCES `references` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reference_images` (
  `id` CHAR(36) NOT NULL,
  `reference_id` CHAR(36) NOT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `storage_asset_id` CHAR(36) DEFAULT NULL,
  `is_featured` TINYINT NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `is_published` TINYINT NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `reference_images_reference_idx` (`reference_id`),
  KEY `reference_images_asset_idx` (`storage_asset_id`),
  KEY `reference_images_published_idx` (`is_published`),
  KEY `reference_images_order_idx` (`display_order`),
  CONSTRAINT `reference_images_reference_fk`
    FOREIGN KEY (`reference_id`) REFERENCES `references` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `reference_images_i18n` (
  `id` CHAR(36) NOT NULL,
  `image_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(10) NOT NULL,
  `title` VARCHAR(200) DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_reference_images_i18n_parent_locale` (`image_id`, `locale`),
  KEY `reference_images_i18n_locale_idx` (`locale`),
  CONSTRAINT `reference_images_i18n_image_fk`
    FOREIGN KEY (`image_id`) REFERENCES `reference_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
