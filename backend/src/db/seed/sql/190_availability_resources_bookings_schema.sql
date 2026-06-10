-- =============================================================
-- 190_availability_resources_bookings_schema.sql
-- Public booking flow schema + default resource seed
-- Notes:
--  - Non-destructive: does not drop existing booking/resource data.
--  - Keeps SQL columns aligned with shared-backend Drizzle schemas.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE IF NOT EXISTS `resources` (
  `id`              CHAR(36)     NOT NULL,
  `type`            VARCHAR(32)  NOT NULL DEFAULT 'other',
  `title`           VARCHAR(255) NOT NULL,
  `capacity`        INT          NOT NULL DEFAULT 1,
  `external_ref_id` CHAR(36)     DEFAULT NULL,
  `is_active`       TINYINT(1)   NOT NULL DEFAULT 1,
  `created_at`      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`      DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                    ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `resources_type_idx` (`type`),
  KEY `resources_active_idx` (`is_active`),
  KEY `resources_title_idx` (`title`),
  KEY `resources_extref_idx` (`external_ref_id`),
  KEY `resources_created_idx` (`created_at`),
  KEY `resources_updated_idx` (`updated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `resource_working_hours` (
  `id`            CHAR(36)    NOT NULL,
  `resource_id`   CHAR(36)    NOT NULL,
  `dow`           TINYINT UNSIGNED NOT NULL,
  `start_time`    TIME        NOT NULL,
  `end_time`      TIME        NOT NULL,
  `slot_minutes`  INT         NOT NULL DEFAULT 60,
  `break_minutes` INT         NOT NULL DEFAULT 0,
  `capacity`      INT         NOT NULL DEFAULT 1,
  `is_active`     TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at`    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`    DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                  ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_rwh_unique` (`resource_id`, `dow`, `start_time`, `end_time`),
  KEY `rwh_resource_idx` (`resource_id`),
  KEY `rwh_dow_idx` (`dow`),
  KEY `rwh_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `resource_slots` (
  `id`          CHAR(36)    NOT NULL,
  `resource_id` CHAR(36)    NOT NULL,
  `slot_date`   DATE        NOT NULL,
  `slot_time`   TIME        NOT NULL,
  `capacity`    INT         NOT NULL DEFAULT 1,
  `is_active`   TINYINT UNSIGNED NOT NULL DEFAULT 1,
  `created_at`  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_resource_slots_unique` (`resource_id`, `slot_date`, `slot_time`),
  KEY `rs_resource_idx` (`resource_id`),
  KEY `rs_date_idx` (`slot_date`),
  KEY `rs_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `slot_reservations` (
  `id`             CHAR(36)    NOT NULL,
  `slot_id`        CHAR(36)    NOT NULL,
  `reserved_count` INT         NOT NULL DEFAULT 0,
  `created_at`     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`     DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                   ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_slot_res_unique` (`slot_id`),
  KEY `slot_res_slot_idx` (`slot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `bookings` (
  `id`                       CHAR(36)     NOT NULL,
  `name`                     VARCHAR(120) NOT NULL,
  `email`                    VARCHAR(190) NOT NULL,
  `phone`                    VARCHAR(32)  NOT NULL,
  `locale`                   VARCHAR(10)  NOT NULL,
  `customer_message`         TEXT         DEFAULT NULL,
  `service_id`               CHAR(36)     DEFAULT NULL,
  `resource_id`              CHAR(36)     NOT NULL,
  `slot_id`                  CHAR(36)     DEFAULT NULL,
  `appointment_date`         VARCHAR(10)  NOT NULL,
  `appointment_time`         VARCHAR(5)   DEFAULT NULL,
  `status`                   VARCHAR(24)  NOT NULL DEFAULT 'new',
  `is_read`                  TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `admin_note`               TEXT         DEFAULT NULL,
  `decided_at`               DATETIME(3)  DEFAULT NULL,
  `decided_by`               VARCHAR(120) DEFAULT NULL,
  `decision_note`            TEXT         DEFAULT NULL,
  `email_last_sent_at`       DATETIME(3)  DEFAULT NULL,
  `email_last_template_key`  VARCHAR(120) DEFAULT NULL,
  `email_last_to`            VARCHAR(190) DEFAULT NULL,
  `email_last_subject`       VARCHAR(255) DEFAULT NULL,
  `email_last_error`         TEXT         DEFAULT NULL,
  `created_at`               DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at`               DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                             ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `bookings_created_idx` (`created_at`),
  KEY `bookings_status_idx` (`status`),
  KEY `bookings_email_idx` (`email`),
  KEY `bookings_service_idx` (`service_id`),
  KEY `bookings_resource_idx` (`resource_id`),
  KEY `bookings_resource_date_time_idx` (`resource_id`, `appointment_date`, `appointment_time`),
  KEY `bookings_slot_idx` (`slot_id`),
  KEY `bookings_date_idx` (`appointment_date`),
  KEY `bookings_date_time_idx` (`appointment_date`, `appointment_time`),
  KEY `bookings_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET @booking_resource_id := '11111111-1111-4111-8111-111111111111';

INSERT INTO `resources`
  (`id`, `type`, `title`, `capacity`, `external_ref_id`, `is_active`, `created_at`, `updated_at`)
VALUES
  (@booking_resource_id, 'staff', 'Guezel Web Design Beratung', 1, NULL, 1, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `type` = VALUES(`type`),
  `title` = VALUES(`title`),
  `capacity` = VALUES(`capacity`),
  `is_active` = VALUES(`is_active`),
  `updated_at` = NOW(3);

INSERT INTO `resource_working_hours`
  (`id`, `resource_id`, `dow`, `start_time`, `end_time`, `slot_minutes`, `break_minutes`, `capacity`, `is_active`, `created_at`, `updated_at`)
VALUES
  ('11111111-1111-4111-8111-111111111121', @booking_resource_id, 1, '09:00:00', '17:00:00', 60, 0, 1, 1, NOW(3), NOW(3)),
  ('11111111-1111-4111-8111-111111111122', @booking_resource_id, 2, '09:00:00', '17:00:00', 60, 0, 1, 1, NOW(3), NOW(3)),
  ('11111111-1111-4111-8111-111111111123', @booking_resource_id, 3, '09:00:00', '17:00:00', 60, 0, 1, 1, NOW(3), NOW(3)),
  ('11111111-1111-4111-8111-111111111124', @booking_resource_id, 4, '09:00:00', '17:00:00', 60, 0, 1, 1, NOW(3), NOW(3)),
  ('11111111-1111-4111-8111-111111111125', @booking_resource_id, 5, '09:00:00', '17:00:00', 60, 0, 1, 1, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  `slot_minutes` = VALUES(`slot_minutes`),
  `break_minutes` = VALUES(`break_minutes`),
  `capacity` = VALUES(`capacity`),
  `is_active` = VALUES(`is_active`),
  `updated_at` = NOW(3);
