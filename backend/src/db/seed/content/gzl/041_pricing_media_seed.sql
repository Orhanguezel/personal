-- =============================================================
-- @generated migrate-gzlteknoloji-content
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/041_pricing_media_seed.sql
-- Gerekce : Fiyatlandirma gorselleri
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- 041 — Paket ailesi kapak görselleri (Storage)

SET NAMES utf8mb4;

INSERT INTO `storage_assets`
  (`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`,
   `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `metadata`)
VALUES
  ('19100000-0000-4000-8000-000000000001', NULL, 'paket-e-ticaret.webp', 'public', 'pricing/paket-e-ticaret.webp', 'pricing', 'image/webp', 58906, 1400, 788, '/uploads/pricing/paket-e-ticaret.webp', 'local', 'pricing/paket-e-ticaret.webp', 'image', 'webp', JSON_OBJECT('scope','pricing','family','paket-e-ticaret','locale','tr')),
  ('19100000-0000-4000-8000-000000000002', NULL, 'e-commerce-package.webp', 'public', 'pricing/e-commerce-package.webp', 'pricing', 'image/webp', 58906, 1400, 788, '/uploads/pricing/e-commerce-package.webp', 'local', 'pricing/e-commerce-package.webp', 'image', 'webp', JSON_OBJECT('scope','pricing','family','e-commerce-package','locale','en')),
  ('19100000-0000-4000-8000-000000000003', NULL, 'sosyal-medya.webp', 'public', 'pricing/sosyal-medya.webp', 'pricing', 'image/webp', 67158, 1400, 788, '/uploads/pricing/sosyal-medya.webp', 'local', 'pricing/sosyal-medya.webp', 'image', 'webp', JSON_OBJECT('scope','pricing','family','sosyal-medya','locale','*')),
  ('19100000-0000-4000-8000-000000000004', NULL, 'bakim.webp', 'public', 'pricing/bakim.webp', 'pricing', 'image/webp', 64818, 1400, 788, '/uploads/pricing/bakim.webp', 'local', 'pricing/bakim.webp', 'image', 'webp', JSON_OBJECT('scope','pricing','family','bakim','locale','tr')),
  ('19100000-0000-4000-8000-000000000005', NULL, 'care.webp', 'public', 'pricing/care.webp', 'pricing', 'image/webp', 64818, 1400, 788, '/uploads/pricing/care.webp', 'local', 'pricing/care.webp', 'image', 'webp', JSON_OBJECT('scope','pricing','family','care','locale','en'))
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`), `mime` = VALUES(`mime`), `size` = VALUES(`size`),
  `width` = VALUES(`width`), `height` = VALUES(`height`), `url` = VALUES(`url`),
  `provider_public_id` = VALUES(`provider_public_id`), `metadata` = VALUES(`metadata`);
