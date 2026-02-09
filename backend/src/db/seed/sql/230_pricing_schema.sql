-- =============================================================
-- FILE: 230_pricing_schema.sql
-- FINAL — Pricing schema (plans + i18n) — MySQL/MariaDB
-- Tables:
--   - pricing_plans
--   - pricing_plans_i18n
-- Notes:
--   - features is JSON-string array in LONGTEXT, default '[]'
--   - FK cascade delete: deleting a plan deletes i18n rows
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

-- -----------------------------
-- DROP (safe re-run)
-- -----------------------------
DROP TABLE IF EXISTS `pricing_plans_i18n`;
DROP TABLE IF EXISTS `pricing_plans`;

-- -----------------------------
-- TABLE: pricing_plans
-- -----------------------------
CREATE TABLE `pricing_plans` (
  `id`            CHAR(36)        NOT NULL,
  `code`          VARCHAR(64)     NOT NULL,

  `price_amount`  DECIMAL(10,2)   NOT NULL DEFAULT '0.00',
  `price_unit`    VARCHAR(32)     NOT NULL DEFAULT 'hour',
  `currency`      VARCHAR(10)     NOT NULL DEFAULT 'USD',

  `is_active`     TINYINT(1)      NOT NULL DEFAULT 1,
  `is_featured`   TINYINT(1)      NOT NULL DEFAULT 0,
  `display_order` INT             NOT NULL DEFAULT 0,

  `cta_href`      VARCHAR(500)             DEFAULT NULL,

  `created_at`    DATETIME(3)     NOT NULL,
  `updated_at`    DATETIME(3)     NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_pricing_plans_code` (`code`),

  KEY `idx_pricing_plans_active_order` (`is_active`, `display_order`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- -----------------------------
-- TABLE: pricing_plans_i18n
-- -----------------------------
CREATE TABLE `pricing_plans_i18n` (
  `id`            CHAR(36)       NOT NULL,
  `plan_id`       CHAR(36)       NOT NULL,
  `locale`        VARCHAR(10)    NOT NULL,

  `badge`         VARCHAR(64)    NOT NULL,

  `title`         VARCHAR(255)            DEFAULT NULL,
  `description`   VARCHAR(1000)           DEFAULT NULL,

  `features`      LONGTEXT       NOT NULL DEFAULT '[]',

  `cta_label`     VARCHAR(100)            DEFAULT NULL,
  `cta_href`      VARCHAR(500)            DEFAULT NULL,

  `created_at`    DATETIME(3)    NOT NULL,
  `updated_at`    DATETIME(3)    NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_pricing_plans_i18n_plan_locale` (`plan_id`, `locale`),

  KEY `idx_pricing_plans_i18n_locale_badge` (`locale`, `badge`),
  KEY `idx_pricing_plans_i18n_plan` (`plan_id`),

  CONSTRAINT `fk_pricing_plans_i18n_plan_id`
    FOREIGN KEY (`plan_id`) REFERENCES `pricing_plans` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
