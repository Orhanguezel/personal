-- =============================================================
-- 024 — faqs schema
-- Shared backend: modules/faqs/schema.ts
-- =============================================================

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `faqs_i18n`;
DROP TABLE IF EXISTS `faqs`;

CREATE TABLE `faqs` (
  `id` CHAR(36) NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 1,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `faqs_active_idx` (`is_active`),
  KEY `faqs_order_idx` (`display_order`),
  KEY `faqs_created_idx` (`created_at`),
  KEY `faqs_updated_idx` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `faqs_i18n` (
  `id` CHAR(36) NOT NULL,
  `faq_id` CHAR(36) NOT NULL,
  `locale` VARCHAR(10) NOT NULL,
  `question` VARCHAR(500) NOT NULL,
  `answer` LONGTEXT NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_faqs_i18n_parent_locale` (`faq_id`, `locale`),
  UNIQUE KEY `ux_faqs_i18n_locale_slug` (`locale`, `slug`),
  KEY `faqs_i18n_locale_idx` (`locale`),
  KEY `faqs_i18n_slug_idx` (`slug`),
  CONSTRAINT `faqs_i18n_faq_fk`
    FOREIGN KEY (`faq_id`) REFERENCES `faqs` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
