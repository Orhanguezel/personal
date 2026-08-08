-- =============================================================
-- 026 — custom pages + social schema
-- Shared backend: modules/customPages/schema.ts, modules/social/schema.ts
-- SEO module has no table schema.
-- =============================================================

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `social_posts`;
DROP TABLE IF EXISTS `custom_pages_i18n`;
DROP TABLE IF EXISTS `custom_pages`;

CREATE TABLE `custom_pages` (
  `id` CHAR(36) NOT NULL,
  `module_key` VARCHAR(100) NOT NULL DEFAULT 'kurumsal',
  `is_published` TINYINT NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `featured_image` VARCHAR(500) DEFAULT NULL,
  `storage_asset_id` CHAR(36) DEFAULT NULL,
  `images` JSON DEFAULT (JSON_ARRAY()),
  `storage_image_ids` JSON DEFAULT (JSON_ARRAY()),
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `custom_pages_module_idx` (`module_key`),
  KEY `custom_pages_published_idx` (`is_published`),
  KEY `custom_pages_order_idx` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `custom_pages_i18n` (
  `page_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(10) NOT NULL DEFAULT 'tr',
  `title` VARCHAR(500) NOT NULL,
  `slug` VARCHAR(500) NOT NULL,
  `content` LONGTEXT DEFAULT NULL,
  `summary` LONGTEXT DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  UNIQUE KEY `ux_cp_i18n_locale_slug` (`locale`, `slug`),
  KEY `custom_pages_i18n_page_idx` (`page_id`),
  CONSTRAINT `fk_cp_i18n_page`
    FOREIGN KEY (`page_id`) REFERENCES `custom_pages` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `social_posts` (
  `id` CHAR(36) NOT NULL,
  `platform` ENUM('linkedin','facebook','instagram','youtube') NOT NULL DEFAULT 'linkedin',
  `source_type` VARCHAR(40) DEFAULT 'project',
  `source_id` CHAR(36) DEFAULT NULL,
  `content` TEXT DEFAULT NULL,
  `media_path` VARCHAR(500) DEFAULT NULL,
  `link` VARCHAR(500) DEFAULT NULL,
  `status` ENUM('draft','queued','posting','posted','failed','canceled') NOT NULL DEFAULT 'draft',
  `scheduled_at` DATETIME DEFAULT NULL,
  `posted_at` DATETIME DEFAULT NULL,
  `external_id` VARCHAR(190) DEFAULT NULL,
  `retry_count` INT NOT NULL DEFAULT 0,
  `error_message` TEXT DEFAULT NULL,
  `locked_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_platform_status_sched` (`platform`, `status`, `scheduled_at`),
  KEY `idx_source` (`source_type`, `source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
