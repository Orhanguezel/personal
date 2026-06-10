-- 80_contact_messages.sql
SET NAMES utf8mb4;
SET time_zone = '+00:00';

DROP TABLE IF EXISTS `contact_messages`;

CREATE TABLE `contact_messages` (
  `id`           CHAR(36)      NOT NULL,
  `name`         VARCHAR(255)  NOT NULL,
  `email`        VARCHAR(255)  NOT NULL,
  `phone`        VARCHAR(64)   NOT NULL,
  `subject`      VARCHAR(255)  NOT NULL,
  `message`      LONGTEXT      NOT NULL,

  `status`       VARCHAR(32)   NOT NULL DEFAULT 'new', -- 'new' | 'in_progress' | 'closed'
  `is_resolved`  TINYINT(1)    NOT NULL DEFAULT 0,

  `admin_note`   VARCHAR(2000) DEFAULT NULL,

  `ip`           VARCHAR(64)   DEFAULT NULL,
  `user_agent`   VARCHAR(512)  DEFAULT NULL,
  `website`      VARCHAR(255)  DEFAULT NULL,

  `created_at`   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`   DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                               ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  -- Drizzle'daki index isimleriyle uyumlu
  KEY `idx_contact_created_at` (`created_at`),
  KEY `idx_contact_status`     (`status`),
  KEY `idx_contact_resolved`   (`is_resolved`),

  -- Ek performans indexleri (opsiyonel ama faydalı)
  KEY `idx_contact_updated_at` (`updated_at`),
  KEY `idx_contact_status_resolved_created`
      (`status`, `is_resolved`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek iletişim mesajı yok; canlı mesajlar formdan gelir.
