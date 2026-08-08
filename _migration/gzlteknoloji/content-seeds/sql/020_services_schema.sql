-- =============================================================
-- 020 — services schema
-- Shared backend: modules/services/schema.ts
-- =============================================================
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `service_images_i18n`;
DROP TABLE IF EXISTS `service_images`;
DROP TABLE IF EXISTS `services_i18n`;
DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` CHAR(36) NOT NULL,
  `type` VARCHAR(32) NOT NULL DEFAULT 'other',
  `featured` TINYINT NOT NULL DEFAULT 0,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `display_order` INT NOT NULL DEFAULT 0,
  `price_onetime` DECIMAL(12,2) DEFAULT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'EUR',
  `is_purchasable` TINYINT NOT NULL DEFAULT 0,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `image_asset_id` CHAR(36) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `services_active_idx` (`is_active`),
  KEY `services_featured_idx` (`featured`),
  KEY `services_order_idx` (`display_order`),
  KEY `services_type_idx` (`type`),
  KEY `services_asset_idx` (`image_asset_id`),
  KEY `services_created_idx` (`created_at`),
  KEY `services_updated_idx` (`updated_at`),
  CONSTRAINT `fk_services_cover_asset`
    FOREIGN KEY (`image_asset_id`) REFERENCES `storage_assets` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `services_i18n` (
  `id` CHAR(36) NOT NULL,
  `service_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(10) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `summary` TEXT DEFAULT NULL,
  `content` TEXT NOT NULL,
  `image_alt` VARCHAR(255) DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `meta_keywords` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_services_i18n_unique` (`service_id`, `locale`),
  UNIQUE KEY `ux_services_locale_slug` (`locale`, `slug`),
  KEY `services_i18n_slug_idx` (`slug`),
  KEY `services_i18n_name_idx` (`name`),
  KEY `services_i18n_created_idx` (`created_at`),
  KEY `services_i18n_updated_idx` (`updated_at`),
  CONSTRAINT `services_i18n_service_fk`
    FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `service_images` (
  `id` CHAR(36) NOT NULL,
  `service_id` CHAR(36) NOT NULL,
  `image_asset_id` CHAR(36) DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `service_images_service_idx` (`service_id`),
  KEY `service_images_active_idx` (`is_active`),
  KEY `service_images_order_idx` (`display_order`),
  KEY `service_images_asset_idx` (`image_asset_id`),
  CONSTRAINT `service_images_service_fk`
    FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `service_images_asset_fk`
    FOREIGN KEY (`image_asset_id`) REFERENCES `storage_assets` (`id`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `service_images_i18n` (
  `id` CHAR(36) NOT NULL,
  `image_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(10) NOT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `caption` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_service_images_i18n_unique` (`image_id`, `locale`),
  KEY `service_images_i18n_locale_idx` (`locale`),
  CONSTRAINT `service_images_i18n_image_fk`
    FOREIGN KEY (`image_id`) REFERENCES `service_images` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
