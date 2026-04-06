-- 95_contact_messages.sql
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id`           CHAR(36)     NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  `email`        VARCHAR(255) NOT NULL,
  `phone`        VARCHAR(64)  NOT NULL,
  `subject`      VARCHAR(255) NOT NULL,
  `message`      LONGTEXT     NOT NULL,

  `status`       VARCHAR(32)  NOT NULL DEFAULT 'new', -- 'new' | 'in_progress' | 'closed'
  `is_resolved`  TINYINT(1)   NOT NULL DEFAULT 0,

  `admin_note`   VARCHAR(2000) DEFAULT NULL,

  `ip`           VARCHAR(64)   DEFAULT NULL,
  `user_agent`   VARCHAR(512)  DEFAULT NULL,
  `website`      VARCHAR(255)  DEFAULT NULL,

  `created_at`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),
  KEY `contact_created_idx` (`created_at`),
  KEY `contact_updated_idx` (`updated_at`),
  KEY `contact_status_idx` (`status`),
  KEY `contact_resolved_idx` (`is_resolved`),
  KEY `contact_status_resolved_created_idx` (`status`, `is_resolved`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Örnek iletişim mesajı yok; canlı mesajlar formdan gelir.
