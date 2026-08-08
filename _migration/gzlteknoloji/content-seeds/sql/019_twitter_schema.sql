-- =============================================================
-- 019 — Twitter/X entegrasyonu: tweets log tablosu + site_settings anahtarlari
-- Modul: @vps/shared-backend/modules/twitter
-- Kimlik bilgileri admin panelden site_settings uzerinden girilir (env yok).
-- =============================================================

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `tweets`;

CREATE TABLE `tweets` (
  `id` CHAR(36) NOT NULL,
  `content` TEXT NOT NULL,
  `status` VARCHAR(20) NOT NULL DEFAULT 'sent',
  `source` VARCHAR(32) NOT NULL DEFAULT 'manual',
  `x_tweet_id` VARCHAR(64) DEFAULT NULL,
  `error_message` TEXT DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_tweets_x_tweet_id` (`x_tweet_id`),
  KEY `idx_tweets_status` (`status`),
  KEY `idx_tweets_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-twitter-enabled',             'twitter_enabled',             '*', 'false'),
('ss-twitter-api-key',             'twitter_api_key',             '*', '""'),
('ss-twitter-api-secret',          'twitter_api_secret',          '*', '""'),
('ss-twitter-access-token',        'twitter_access_token',        '*', '""'),
('ss-twitter-access-token-secret', 'twitter_access_token_secret', '*', '""');
