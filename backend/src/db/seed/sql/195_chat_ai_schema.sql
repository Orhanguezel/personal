-- =============================================================
-- 195_chat_ai_schema.sql
-- Chat + AI chat schema
-- Notes:
--  - Non-destructive: does not drop existing conversations.
--  - Mirrors shared-backend Drizzle schemas.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `chat_threads` (
  `id`                 VARCHAR(36) NOT NULL,
  `context_type`       VARCHAR(20) NOT NULL,
  `context_id`         VARCHAR(36) NOT NULL,
  `created_by_user_id` VARCHAR(36) DEFAULT NULL,
  `created_at`         DATETIME NOT NULL,
  `updated_at`         DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_chat_threads_ctx` (`context_type`, `context_id`),
  KEY `ix_chat_threads_ctx` (`context_type`, `context_id`),
  KEY `ix_chat_threads_updated` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `chat_participants` (
  `id`           VARCHAR(36) NOT NULL,
  `thread_id`    VARCHAR(36) NOT NULL,
  `user_id`      VARCHAR(36) NOT NULL,
  `role`         VARCHAR(20) NOT NULL,
  `joined_at`    DATETIME NOT NULL,
  `last_read_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_chat_participants_thread_user` (`thread_id`, `user_id`),
  KEY `ix_chat_participants_thread` (`thread_id`),
  KEY `ix_chat_participants_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id`             VARCHAR(36) NOT NULL,
  `thread_id`      VARCHAR(36) NOT NULL,
  `sender_user_id` VARCHAR(36) NOT NULL,
  `client_id`      VARCHAR(64) DEFAULT NULL,
  `text`           TEXT NOT NULL,
  `created_at`     DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ix_chat_messages_thread_time` (`thread_id`, `created_at`),
  KEY `ix_chat_messages_sender_time` (`sender_user_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ai_sessions` (
  `id`             CHAR(36) NOT NULL,
  `user_id`        CHAR(36) DEFAULT NULL,
  `created_at`     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `last_active_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ai_sess_user_idx` (`user_id`),
  KEY `ai_sess_active_idx` (`last_active_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `ai_messages` (
  `id`         CHAR(36) NOT NULL,
  `session_id` CHAR(36) NOT NULL,
  `role`       VARCHAR(16) NOT NULL DEFAULT 'user',
  `content`    TEXT NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `ai_msg_session_idx` (`session_id`),
  KEY `ai_msg_created_idx` (`session_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
