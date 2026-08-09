-- =============================================================
-- @generated migrate-gzlteknoloji-content
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/039_blog_media_seed.sql
-- Gerekce : Blog yazilari medya/icerik guncellemesi (plan madde 5)
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- =============================================================
-- 039 — Blog kapak gorselleri (deterministik)
-- Dosyalar: backend/uploads/blog/<tr-slug>.webp (deploy.sh senkronlar)
-- Admin: storage modulunden yeni gorsel yuklenip custom_pages.featured_image
-- guncellenerek degistirilebilir; bu seed yalniz baslangic degerini verir.
-- =============================================================

SET NAMES utf8mb4;

INSERT IGNORE INTO `storage_assets`
  (`id`, `user_id`, `name`, `bucket`, `path`, `folder`, `mime`, `size`, `width`, `height`, `url`, `hash`,
   `provider`, `provider_public_id`, `provider_resource_type`, `provider_format`, `provider_version`, `etag`, `metadata`)
VALUES
  ('19000000-0000-4000-8000-000000000001', NULL, 'geo-nedir.webp', 'public', 'blog/geo-nedir.webp', 'blog',
   'image/webp', 13274, 1200, 675, '/uploads/blog/geo-nedir.webp', NULL,
   'local', 'blog/geo-nedir.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000001','role','featured')),
  ('19000000-0000-4000-8000-000000000002', NULL, 'e-ticaret-sitesi-maliyeti.webp', 'public', 'blog/e-ticaret-sitesi-maliyeti.webp', 'blog',
   'image/webp', 8518, 1200, 675, '/uploads/blog/e-ticaret-sitesi-maliyeti.webp', NULL,
   'local', 'blog/e-ticaret-sitesi-maliyeti.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000002','role','featured')),
  ('19000000-0000-4000-8000-000000000003', NULL, 'chatgpt-neden-onermiyor.webp', 'public', 'blog/chatgpt-neden-onermiyor.webp', 'blog',
   'image/webp', 7472, 1200, 675, '/uploads/blog/chatgpt-neden-onermiyor.webp', NULL,
   'local', 'blog/chatgpt-neden-onermiyor.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000003','role','featured')),
  ('19000000-0000-4000-8000-000000000004', NULL, 'sosyal-medya-yonetimi-fiyatlari.webp', 'public', 'blog/sosyal-medya-yonetimi-fiyatlari.webp', 'blog',
   'image/webp', 9660, 1200, 675, '/uploads/blog/sosyal-medya-yonetimi-fiyatlari.webp', NULL,
   'local', 'blog/sosyal-medya-yonetimi-fiyatlari.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000004','role','featured')),
  ('19000000-0000-4000-8000-000000000005', NULL, 'is-otomasyonu-elle-yapilan-5-is.webp', 'public', 'blog/is-otomasyonu-elle-yapilan-5-is.webp', 'blog',
   'image/webp', 13990, 1200, 675, '/uploads/blog/is-otomasyonu-elle-yapilan-5-is.webp', NULL,
   'local', 'blog/is-otomasyonu-elle-yapilan-5-is.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000005','role','featured')),
  ('19000000-0000-4000-8000-000000000006', NULL, 'bayi-takibi-excel-crm.webp', 'public', 'blog/bayi-takibi-excel-crm.webp', 'blog',
   'image/webp', 6974, 1200, 675, '/uploads/blog/bayi-takibi-excel-crm.webp', NULL,
   'local', 'blog/bayi-takibi-excel-crm.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000006','role','featured')),
  ('19000000-0000-4000-8000-000000000007', NULL, 'ai-overviews.webp', 'public', 'blog/ai-overviews.webp', 'blog',
   'image/webp', 10182, 1200, 675, '/uploads/blog/ai-overviews.webp', NULL,
   'local', 'blog/ai-overviews.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000007','role','featured')),
  ('19000000-0000-4000-8000-000000000008', NULL, 'sera-otomasyonu-yazilimi.webp', 'public', 'blog/sera-otomasyonu-yazilimi.webp', 'blog',
   'image/webp', 10388, 1200, 675, '/uploads/blog/sera-otomasyonu-yazilimi.webp', NULL,
   'local', 'blog/sera-otomasyonu-yazilimi.webp', 'image', 'webp', NULL, NULL,
   JSON_OBJECT('scope','blog','page_id','37000000-0000-4000-8000-000000000008','role','featured'));

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/geo-nedir.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000001' WHERE `id`='37000000-0000-4000-8000-000000000001';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/e-ticaret-sitesi-maliyeti.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000002' WHERE `id`='37000000-0000-4000-8000-000000000002';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/chatgpt-neden-onermiyor.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000003' WHERE `id`='37000000-0000-4000-8000-000000000003';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/sosyal-medya-yonetimi-fiyatlari.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000004' WHERE `id`='37000000-0000-4000-8000-000000000004';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/is-otomasyonu-elle-yapilan-5-is.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000005' WHERE `id`='37000000-0000-4000-8000-000000000005';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/bayi-takibi-excel-crm.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000006' WHERE `id`='37000000-0000-4000-8000-000000000006';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/ai-overviews.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000007' WHERE `id`='37000000-0000-4000-8000-000000000007';

UPDATE `custom_pages` SET `featured_image`='/uploads/blog/sera-otomasyonu-yazilimi.webp', `storage_asset_id`='19000000-0000-4000-8000-000000000008' WHERE `id`='37000000-0000-4000-8000-000000000008';
