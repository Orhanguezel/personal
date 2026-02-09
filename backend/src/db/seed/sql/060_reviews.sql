-- =============================================================
-- FILE: 060_reviews.sql  (FINAL / CLEAN / NO DROP)
-- Çok dilli review modülü (generic + custom_pages uyumlu)
-- ✅ NO DROP
-- ✅ IF NOT EXISTS
-- ✅ MariaDB + MySQL uyumlu
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- =============================================================
-- PARENT TABLO: reviews
-- =============================================================
CREATE TABLE IF NOT EXISTS `reviews` (
  `id`               CHAR(36)      NOT NULL,

  `target_type`      VARCHAR(50)   NOT NULL,          -- 'custom_page', 'product', 'service' vs.
  `target_id`        CHAR(36)      NOT NULL,          -- custom_pages.id, products.id, ...

  `name`             VARCHAR(255)  NOT NULL,
  `email`            VARCHAR(255)  NOT NULL,

  `rating`           TINYINT       NOT NULL,          -- 1..5
  `role`             VARCHAR(255)  DEFAULT NULL,
  `company`          VARCHAR(255)  DEFAULT NULL,
  `avatar_url`       VARCHAR(500)  DEFAULT NULL,
  `logo_url`         VARCHAR(500)  DEFAULT NULL,
  `profile_href`     VARCHAR(500)  DEFAULT NULL,
  `is_active`        TINYINT(1)    NOT NULL DEFAULT 1,
  `is_approved`      TINYINT(1)    NOT NULL DEFAULT 0,
  `display_order`    INT           NOT NULL DEFAULT 0,

  `likes_count`      INT           NOT NULL DEFAULT 0,
  `dislikes_count`   INT           NOT NULL DEFAULT 0,
  `helpful_count`    INT           NOT NULL DEFAULT 0,

  `submitted_locale` VARCHAR(10)   NOT NULL DEFAULT 'tr',

  `created_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                          ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `reviews_target_idx`        (`target_type`, `target_id`),
  KEY `reviews_rating_idx`        (`rating`),
  KEY `reviews_active_idx`        (`is_active`),
  KEY `reviews_approved_idx`      (`is_approved`),
  KEY `reviews_display_order_idx` (`display_order`),
  KEY `reviews_created_idx`       (`created_at`),
  KEY `reviews_updated_idx`       (`updated_at`),
  KEY `reviews_helpful_idx`       (`helpful_count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- I18N TABLO: review_i18n
-- =============================================================
CREATE TABLE IF NOT EXISTS `review_i18n` (
  `id`          CHAR(36)      NOT NULL,
  `review_id`   CHAR(36)      NOT NULL,
  `locale`      VARCHAR(10)   NOT NULL,

  `title`       VARCHAR(255)  DEFAULT NULL,
  `comment`     LONGTEXT      NOT NULL,
  `admin_reply` LONGTEXT      DEFAULT NULL,

  `created_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                                     ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `ux_review_i18n_review_locale` (`review_id`, `locale`),
  KEY `review_i18n_review_idx` (`review_id`),
  KEY `review_i18n_locale_idx` (`locale`),

  CONSTRAINT `fk_review_i18n_review`
    FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- SEED: Testimonials (target_type = 'testimonial')
-- =============================================================

-- Fixed bucket id to match ui_testimonials.bucket
SET @TESTIMONIAL_BUCKET := '11111111-1111-1111-1111-111111111111';

SET @REV1 := '11111111-1111-1111-1111-111111111112';
SET @REV2 := '11111111-1111-1111-1111-111111111113';
SET @REV3 := '11111111-1111-1111-1111-111111111114';

INSERT INTO `reviews` (
  `id`, `target_type`, `target_id`, `name`, `email`, `rating`,
  `role`, `company`, `avatar_url`, `logo_url`, `profile_href`,
  `is_active`, `is_approved`, `display_order`,
  `likes_count`, `dislikes_count`, `helpful_count`,
  `submitted_locale`, `created_at`, `updated_at`
)
VALUES
(
  @REV1, 'testimonial', @TESTIMONIAL_BUCKET, 'John Doe', 'john@example.com', 4,
  'Head of Legal and Compliance', 'Tech Innovators',
  '/assets/imgs/testimonials/testimonials-1/avatar-1.png',
  '/assets/imgs/testimonials/testimonials-1/logo-1.png',
  '#',
  1, 1, 1, 0, 0, 0, 'en', NOW(3), NOW(3)
),
(
  @REV2, 'testimonial', @TESTIMONIAL_BUCKET, 'Sarah Miller', 'sarah@example.com', 5,
  'Product Manager', 'Creative Labs',
  '/assets/imgs/testimonials/testimonials-1/avatar-2.png',
  '/assets/imgs/testimonials/testimonials-1/logo-2.png',
  '#',
  1, 1, 2, 0, 0, 0, 'en', NOW(3), NOW(3)
),
(
  @REV3, 'testimonial', @TESTIMONIAL_BUCKET, 'Ali Kaya', 'ali@example.com', 5,
  'Founder', 'GWD',
  '/assets/imgs/testimonials/testimonials-1/avatar-1.png',
  '/assets/imgs/testimonials/testimonials-1/logo-1.png',
  '#',
  1, 1, 3, 0, 0, 0, 'tr', NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `target_type` = VALUES(`target_type`),
  `target_id` = VALUES(`target_id`),
  `name` = VALUES(`name`),
  `email` = VALUES(`email`),
  `rating` = VALUES(`rating`),
  `role` = VALUES(`role`),
  `company` = VALUES(`company`),
  `avatar_url` = VALUES(`avatar_url`),
  `logo_url` = VALUES(`logo_url`),
  `profile_href` = VALUES(`profile_href`),
  `is_active` = VALUES(`is_active`),
  `is_approved` = VALUES(`is_approved`),
  `display_order` = VALUES(`display_order`),
  `updated_at` = VALUES(`updated_at`);

INSERT INTO `review_i18n`
  (`id`, `review_id`, `locale`, `title`, `comment`, `admin_reply`, `created_at`, `updated_at`)
VALUES
  (UUID(), @REV1, 'en', 'Head of Legal and Compliance, Tech Innovators',
   'Working with Orhan was a pleasure. Clear communication and a fast, high-quality delivery.',
   NULL, NOW(3), NOW(3)),
  (UUID(), @REV1, 'de', 'Leitung Recht & Compliance, Tech Innovators',
   'Die Zusammenarbeit mit Orhan war hervorragend. Klare Kommunikation und schnelle Lieferung.',
   NULL, NOW(3), NOW(3)),
  (UUID(), @REV1, 'tr', 'Hukuk ve Uyum Başkanı, Tech Innovators',
   'Orhan ile çalışmak harikaydı. Net iletişim ve hızlı, kaliteli teslim.',
   NULL, NOW(3), NOW(3)),

  (UUID(), @REV2, 'en', 'Product Manager, Creative Labs',
   'Our product usability improved significantly thanks to Orhan’s detail-oriented approach.',
   NULL, NOW(3), NOW(3)),
  (UUID(), @REV2, 'de', 'Produktmanagerin, Creative Labs',
   'Die Benutzerfreundlichkeit unseres Produkts hat sich dank Orhans Ansatz deutlich verbessert.',
   NULL, NOW(3), NOW(3)),
  (UUID(), @REV2, 'tr', 'Ürün Yöneticisi, Creative Labs',
   'Orhan’ın detay odaklı yaklaşımı sayesinde ürün kullanılabilirliği ciddi şekilde arttı.',
   NULL, NOW(3), NOW(3)),

  (UUID(), @REV3, 'en', 'Founder, GWD',
   'Reliable, creative, and proactive. Great partner for long-term collaboration.',
   NULL, NOW(3), NOW(3)),
  (UUID(), @REV3, 'de', 'Gründer, GWD',
   'Zuverlässig, kreativ und proaktiv. Ein großartiger Partner für langfristige Zusammenarbeit.',
   NULL, NOW(3), NOW(3)),
  (UUID(), @REV3, 'tr', 'Kurucu, GWD',
   'Güvenilir, yaratıcı ve proaktif. Uzun vadeli iş birliği için harika bir partner.',
   NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `comment` = VALUES(`comment`),
  `updated_at` = VALUES(`updated_at`);
