-- =============================================================
-- FILE: 012_categories_schema.sql
-- categories / sub_categories (+ i18n) SEMASI — tum deployment'larda calisir.
--
-- NEDEN EKLENDI (2026-08-08):
--   013_products_schema.sql, `products` uzerinde
--     fk_products_category    -> categories(id)
--     fk_products_subcategory -> sub_categories(id)
--   foreign key'lerini tanimliyor, ama bu tablolar seed setinde HIC YOKTU.
--   Dosya `SET FOREIGN_KEY_CHECKS = 0` ile sarili oldugu icin CREATE sessizce
--   geciyor ve FK'ler bosluga referans veren "dangling" hale geliyordu; bu
--   haliyle products tablosuna satir eklenemezdi.
--
--   Sema, emekliye ayrilan gzlteknoloji reposundan birebir alindi (kolonlar
--   ayni sablon soyundan geliyor). GZL Teknoloji SaaS katalogu bu tablolari
--   kullanir; GWD tarafinda bos kalir, zarar vermez.
--
--   ALTER YOK — kok CLAUDE.md kurali: sema degisikligi CREATE TABLE'a yazilir,
--   DB `db:seed` ile sifirdan kurulur.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `categories` (
  `id` CHAR(36) NOT NULL,
  `module_key` VARCHAR(64) NOT NULL DEFAULT 'general',
  `image_url` LONGTEXT DEFAULT NULL,
  `storage_asset_id` CHAR(36) DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `icon` VARCHAR(255) DEFAULT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `is_featured` TINYINT NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `categories_active_idx` (`is_active`),
  KEY `categories_order_idx` (`display_order`),
  KEY `categories_module_idx` (`module_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `category_i18n` (
  `category_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(8) NOT NULL DEFAULT 'tr',
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `meta_title` VARCHAR(255) DEFAULT NULL,
  `meta_description` VARCHAR(500) DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY `category_i18n_slug_locale_uq` (`slug`, `locale`),
  KEY `category_i18n_locale_idx` (`locale`),
  KEY `category_i18n_category_idx` (`category_id`),
  CONSTRAINT `fk_category_i18n_category`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` CHAR(36) NOT NULL,
  `category_id` CHAR(36) NOT NULL,
  `image_url` LONGTEXT DEFAULT NULL,
  `storage_asset_id` CHAR(36) DEFAULT NULL,
  `alt` VARCHAR(255) DEFAULT NULL,
  `icon` VARCHAR(255) DEFAULT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `is_featured` TINYINT NOT NULL DEFAULT 0,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `sub_categories_category_id_idx` (`category_id`),
  KEY `sub_categories_active_idx` (`is_active`),
  CONSTRAINT `fk_sub_categories_category_id`
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `sub_category_i18n` (
  `sub_category_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(8) NOT NULL DEFAULT 'tr',
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  UNIQUE KEY `sub_category_i18n_slug_locale_uq` (`slug`, `locale`),
  KEY `sub_category_i18n_locale_idx` (`locale`),
  KEY `sub_category_i18n_sub_category_idx` (`sub_category_id`),
  CONSTRAINT `fk_sub_category_i18n_sub_category_id`
    FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
