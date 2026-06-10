-- =============================================================
-- 300_site_packages_schema.sql
-- Site Packages (sellable website templates) + i18n
-- =============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS site_packages (
  id               CHAR(36)       NOT NULL,
  product_type     ENUM('digital','service') NOT NULL DEFAULT 'service',
  category         VARCHAR(100)   NOT NULL DEFAULT 'landing',

  price_onetime    DECIMAL(12,2)  DEFAULT NULL,
  price_monthly    DECIMAL(12,2)  DEFAULT NULL,
  currency         VARCHAR(10)    NOT NULL DEFAULT 'EUR',

  status           ENUM('draft','active','archived') NOT NULL DEFAULT 'draft',
  is_featured      TINYINT(1)     NOT NULL DEFAULT 0,
  display_order    INT            NOT NULL DEFAULT 0,

  cover_image_url  VARCHAR(500)   DEFAULT NULL,
  gallery          JSON           DEFAULT NULL,

  demo_url         VARCHAR(500)   DEFAULT NULL,
  download_url     VARCHAR(500)   DEFAULT NULL,

  tags             JSON           DEFAULT NULL,
  tech_stack       JSON           DEFAULT NULL,

  paypal_plan_id   VARCHAR(128)   DEFAULT NULL,

  created_at       DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at       DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                   ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  KEY sp_status_idx    (status),
  KEY sp_type_idx      (product_type),
  KEY sp_category_idx  (category),
  KEY sp_featured_idx  (is_featured),
  KEY sp_order_idx     (display_order),
  KEY sp_created_idx   (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS site_packages_i18n (
  id               CHAR(36)       NOT NULL,
  product_id       CHAR(36)       NOT NULL,
  locale           VARCHAR(10)    NOT NULL,

  title            VARCHAR(255)   NOT NULL,
  slug             VARCHAR(255)   NOT NULL,
  subtitle         VARCHAR(500)   DEFAULT NULL,
  description      TEXT           DEFAULT NULL,
  features         JSON           DEFAULT NULL,

  seo_title        VARCHAR(255)   DEFAULT NULL,
  seo_description  VARCHAR(500)   DEFAULT NULL,

  created_at       DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at       DATETIME(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                   ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  UNIQUE KEY ux_sp_i18n_unique   (product_id, locale),
  UNIQUE KEY ux_sp_locale_slug   (locale, slug),
  KEY sp_i18n_slug_idx           (slug),
  KEY sp_i18n_title_idx          (title),

  CONSTRAINT fk_sp_i18n_package
    FOREIGN KEY (product_id) REFERENCES site_packages(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
