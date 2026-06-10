DROP TABLE IF EXISTS `social_posts`;
CREATE TABLE `social_posts` (
  `id` CHAR(36) NOT NULL,
  `platform` ENUM('linkedin','facebook','instagram','youtube') NOT NULL DEFAULT 'linkedin',
  `source_type` VARCHAR(40) DEFAULT 'project',
  `source_id` CHAR(36) DEFAULT NULL,
  `content` TEXT,
  `media_path` VARCHAR(500) DEFAULT NULL,
  `link` VARCHAR(500) DEFAULT NULL,
  `status` ENUM('draft','queued','posting','posted','failed','canceled') NOT NULL DEFAULT 'draft',
  `scheduled_at` DATETIME DEFAULT NULL,
  `posted_at` DATETIME DEFAULT NULL,
  `external_id` VARCHAR(190) DEFAULT NULL,
  `retry_count` INT NOT NULL DEFAULT 0,
  `error_message` TEXT DEFAULT NULL,
  `locked_at` DATETIME DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_platform_status_sched` (`platform`,`status`,`scheduled_at`),
  KEY `idx_source` (`source_type`,`source_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
