-- 036 — Bionluk buyer request tracker + business ledger
-- Secrets are environment-only; this schema stores requests, runs, events and non-secret scoring config.

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `bionluk_events`;
DROP TABLE IF EXISTS `bionluk_sync_runs`;
DROP TABLE IF EXISTS `bionluk_requests`;

CREATE TABLE `bionluk_requests` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `description` TEXT NULL,
  `budget` VARCHAR(255) NULL,
  `duration` VARCHAR(255) NULL,
  `buyer_username` VARCHAR(255) NULL,
  `source_created_at` DATETIME(3) NULL,
  `fit_score` INT UNSIGNED NOT NULL DEFAULT 0,
  `fit_label` ENUM('strong','medium','weak') NOT NULL DEFAULT 'weak',
  `matched_categories` JSON NULL,
  `penalties` JSON NULL,
  `past_offer` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `status` ENUM('new','reviewing','proposal_sent','won','rejected','archived') NOT NULL DEFAULT 'new',
  `raw_payload` JSON NULL,
  `first_seen_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `last_seen_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `bionluk_requests_status_idx` (`status`),
  KEY `bionluk_requests_score_idx` (`fit_score`),
  KEY `bionluk_requests_seen_idx` (`last_seen_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bionluk_sync_runs` (
  `id` CHAR(36) NOT NULL,
  `status` ENUM('success','failed') NOT NULL,
  `fetched_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `matched_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `new_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `error_code` VARCHAR(100) NULL,
  `error_message` VARCHAR(500) NULL,
  `started_at` DATETIME(3) NOT NULL,
  `finished_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bionluk_sync_runs_started_idx` (`started_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `bionluk_events` (
  `id` CHAR(36) NOT NULL,
  `request_id` VARCHAR(64) NULL,
  `type` ENUM('proposal_sent','job_won','payment_received') NOT NULL,
  `title` VARCHAR(500) NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL DEFAULT 0,
  `currency` CHAR(3) NOT NULL DEFAULT 'TRY',
  `event_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `bionluk_events_request_idx` (`request_id`),
  KEY `bionluk_events_type_idx` (`type`),
  KEY `bionluk_events_date_idx` (`event_at`),
  CONSTRAINT `bionluk_events_request_fk` FOREIGN KEY (`request_id`)
    REFERENCES `bionluk_requests`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-bionluk-tracker-config', 'bionluk_tracker_config', '*',
 '{"enabled":false,"fetch_limit":30,"notify_threshold":40,"strong_threshold":65,"recent_bonus_hours":24,"recent_bonus":6,"depth_bonus_per_hit":3,"depth_bonus_max":12,"monthly_goal":{"currency":"TRY","net_target":0},"categories":[{"key":"scraping_automation","weight":50,"keywords":["scraping","veri cekme","veri çekme","crawler","bot","otomasyon","automation","playwright"]},{"key":"web_fullstack","weight":45,"keywords":["next.js","nextjs","react","fastify","node","fullstack","web sitesi","landing","frontend","backend","api","dashboard","panel"]},{"key":"social_media","weight":45,"keywords":["sosyal medya","social media","instagram","reels","story","icerik üretim","içerik üretim"]},{"key":"crm_marketing","weight":48,"keywords":["crm","pazarlama otomasyon","marketing automation","lead","funnel","pipeline","segmentasyon"]},{"key":"ai_llm","weight":45,"keywords":["yapay zeka","ai","llm","gpt","chatgpt","openai","prompt"]},{"key":"seo_geo","weight":35,"keywords":["seo","geo","lighthouse","core web vitals","google maps"]},{"key":"ecommerce","weight":35,"keywords":["e-ticaret","eticaret","shopify","woocommerce","sepet","odeme entegrasyon","ödeme entegrasyon"]}],"negative":[{"key":"out_of_scope","penalty":22,"keywords":["logo tasarım","logo tasarim","video düzenleme","video duzenleme","seslendirme","veri girişi","veri girisi","tez","çeviri","ceviri","unity","c++"]}]}')
ON DUPLICATE KEY UPDATE `value`=VALUES(`value`), `updated_at`=CURRENT_TIMESTAMP(3);
