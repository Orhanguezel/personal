-- =============================================================
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/019_twitter_schema.sql
-- Gerekce : site_settings sosyal medya anahtarlari
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- =============================================================
-- 019 — Twitter/X entegrasyonu: tweets log tablosu + site_settings anahtarlari
-- Modul: @vps/shared-backend/modules/twitter
-- Kimlik bilgileri admin panelden site_settings uzerinden girilir (env yok).
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-twitter-enabled',             'twitter_enabled',             '*', 'false'),
('ss-twitter-api-key',             'twitter_api_key',             '*', '""'),
('ss-twitter-api-secret',          'twitter_api_secret',          '*', '""'),
('ss-twitter-access-token',        'twitter_access_token',        '*', '""'),
('ss-twitter-access-token-secret', 'twitter_access_token_secret', '*', '""');
