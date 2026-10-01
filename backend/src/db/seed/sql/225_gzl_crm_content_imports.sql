CREATE TABLE IF NOT EXISTS `gzl_crm_content_imports` (
  `id` CHAR(36) NOT NULL,
  `source_external_id` VARCHAR(128) NOT NULL,
  `project_id` CHAR(36) NOT NULL,
  `contract_version` VARCHAR(16) NOT NULL,
  `payload_hash` CHAR(64) NOT NULL,
  `image_sha256` CHAR(64) NOT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `gzl_crm_content_imports_external_uq` (`source_external_id`),
  UNIQUE KEY `gzl_crm_content_imports_project_uq` (`project_id`),
  CONSTRAINT `fk_gzl_crm_content_imports_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
