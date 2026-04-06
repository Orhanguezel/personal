-- =============================================================
-- 310_checkout_schema.sql
-- Orders, order_items, payments, subscriptions (guest checkout)
-- =============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ========================= ORDERS =========================
CREATE TABLE IF NOT EXISTS orders (
  id                      CHAR(36)      NOT NULL,
  order_number            VARCHAR(50)   NOT NULL,

  customer_email          VARCHAR(255)  NOT NULL,
  customer_name           VARCHAR(255)  NOT NULL,
  customer_phone          VARCHAR(50)   DEFAULT NULL,
  customer_locale         VARCHAR(10)   NOT NULL DEFAULT 'de',

  status                  ENUM('pending','paid','processing','delivered','cancelled','refunded')
                          NOT NULL DEFAULT 'pending',

  payment_type            ENUM('onetime','subscription') NOT NULL DEFAULT 'onetime',
  total_amount            DECIMAL(12,2) NOT NULL,
  currency                VARCHAR(10)   NOT NULL DEFAULT 'EUR',

  paypal_order_id         VARCHAR(128)  DEFAULT NULL,
  paypal_subscription_id  VARCHAR(128)  DEFAULT NULL,
  paypal_capture_id       VARCHAR(128)  DEFAULT NULL,
  payment_status          ENUM('unpaid','paid','failed','refunded')
                          NOT NULL DEFAULT 'unpaid',

  delivery_type           ENUM('digital','service') NOT NULL DEFAULT 'service',
  delivery_url            VARCHAR(500)  DEFAULT NULL,
  delivery_note           TEXT          DEFAULT NULL,
  delivered_at            DATETIME(3)   DEFAULT NULL,

  admin_note              TEXT          DEFAULT NULL,
  ip_address              VARCHAR(45)   DEFAULT NULL,
  user_agent              TEXT          DEFAULT NULL,

  created_at              DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at              DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                          ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  UNIQUE KEY orders_number_unique       (order_number),
  KEY orders_email_idx                  (customer_email),
  KEY orders_status_idx                 (status),
  KEY orders_payment_status_idx         (payment_status),
  KEY orders_created_idx                (created_at),
  KEY orders_paypal_order_idx           (paypal_order_id),
  KEY orders_paypal_sub_idx             (paypal_subscription_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================= ORDER ITEMS =========================
CREATE TABLE IF NOT EXISTS order_items (
  id           CHAR(36)      NOT NULL,
  order_id     CHAR(36)      NOT NULL,
  product_id   CHAR(36)      DEFAULT NULL,
  service_id   CHAR(36)      DEFAULT NULL,
  project_id   CHAR(36)      DEFAULT NULL,

  title        VARCHAR(255)  NOT NULL,
  price        DECIMAL(12,2) NOT NULL,
  currency     VARCHAR(10)   NOT NULL DEFAULT 'EUR',
  quantity     INT           NOT NULL DEFAULT 1,
  item_type    ENUM('digital','service','project') NOT NULL DEFAULT 'service',
  options      JSON          DEFAULT NULL,

  created_at   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  KEY order_items_order_idx   (order_id),
  KEY order_items_product_idx (product_id),
  KEY order_items_service_idx (service_id),
  KEY order_items_project_idx (project_id),

  CONSTRAINT fk_oi_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_oi_package
    FOREIGN KEY (product_id) REFERENCES site_packages(id)
    ON DELETE SET NULL ON UPDATE CASCADE,

  CONSTRAINT fk_oi_service
    FOREIGN KEY (service_id) REFERENCES services(id)
    ON DELETE SET NULL ON UPDATE CASCADE,

  CONSTRAINT fk_oi_project
    FOREIGN KEY (project_id) REFERENCES projects(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================= PAYMENTS =========================
CREATE TABLE IF NOT EXISTS payments (
  id              CHAR(36)      NOT NULL,
  order_id        CHAR(36)      NOT NULL,

  provider        ENUM('paypal') NOT NULL DEFAULT 'paypal',
  transaction_id  VARCHAR(255)  DEFAULT NULL,
  amount          DECIMAL(12,2) NOT NULL,
  currency        VARCHAR(10)   NOT NULL DEFAULT 'EUR',
  status          ENUM('pending','completed','failed','refunded')
                  NOT NULL DEFAULT 'pending',
  raw_response    JSON          DEFAULT NULL,

  created_at      DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  KEY payments_order_idx  (order_id),
  KEY payments_status_idx (status),

  CONSTRAINT fk_payments_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================= SUBSCRIPTIONS =========================
CREATE TABLE IF NOT EXISTS subscriptions (
  id                       CHAR(36)      NOT NULL,
  order_id                 CHAR(36)      DEFAULT NULL,
  product_id               CHAR(36)      DEFAULT NULL,

  customer_email           VARCHAR(255)  NOT NULL,

  paypal_subscription_id   VARCHAR(128)  DEFAULT NULL,
  paypal_plan_id           VARCHAR(128)  DEFAULT NULL,

  status                   ENUM('active','suspended','cancelled','expired')
                           NOT NULL DEFAULT 'active',

  current_period_start     DATETIME(3)   DEFAULT NULL,
  current_period_end       DATETIME(3)   DEFAULT NULL,
  cancelled_at             DATETIME(3)   DEFAULT NULL,

  created_at               DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at               DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                           ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  UNIQUE KEY subscriptions_paypal_sub_unique (paypal_subscription_id),
  KEY subscriptions_order_idx               (order_id),
  KEY subscriptions_product_idx             (product_id),
  KEY subscriptions_email_idx               (customer_email),
  KEY subscriptions_status_idx              (status),

  CONSTRAINT fk_subs_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE SET NULL ON UPDATE CASCADE,

  CONSTRAINT fk_subs_package
    FOREIGN KEY (product_id) REFERENCES site_packages(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
