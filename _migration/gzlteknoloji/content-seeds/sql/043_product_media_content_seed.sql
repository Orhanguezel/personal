-- 043 — Ürün kapaklarını Storage üzerinden yönetir ve KatalogAI TR içeriğini düzeltir.

SET NAMES utf8mb4;

INSERT INTO `storage_assets`
  (`id`,`user_id`,`name`,`bucket`,`path`,`folder`,`mime`,`size`,`width`,`height`,`url`,
   `provider`,`provider_public_id`,`provider_resource_type`,`provider_format`,`metadata`)
VALUES
  ('19300000-0000-4000-8000-000000000001',NULL,'geoserra.webp','public','products/geoserra.webp','products','image/webp',23988,1400,788,'/uploads/products/geoserra.webp','local','products/geoserra.webp','image','webp',JSON_OBJECT('scope','products','slug','geoserra')),
  ('19300000-0000-4000-8000-000000000002',NULL,'sozial.webp','public','products/sozial.webp','products','image/webp',7704,1400,788,'/uploads/products/sozial.webp','local','products/sozial.webp','image','webp',JSON_OBJECT('scope','products','slug','sozial')),
  ('19300000-0000-4000-8000-000000000003',NULL,'katalogai.webp','public','products/katalogai.webp','products','image/webp',101672,1400,788,'/uploads/products/katalogai.webp','local','products/katalogai.webp','image','webp',JSON_OBJECT('scope','products','slug','katalogai')),
  ('19300000-0000-4000-8000-000000000004',NULL,'invitea.webp','public','products/invitea.webp','products','image/webp',7820,1400,788,'/uploads/products/invitea.webp','local','products/invitea.webp','image','webp',JSON_OBJECT('scope','products','slug','invitea')),
  ('19300000-0000-4000-8000-000000000005',NULL,'scraper-api.webp','public','products/scraper-api.webp','products','image/webp',9330,1400,788,'/uploads/products/scraper-api.webp','local','products/scraper-api.webp','image','webp',JSON_OBJECT('scope','products','slug','scraper-api')),
  ('19300000-0000-4000-8000-000000000006',NULL,'marketpulse.webp','public','products/marketpulse.webp','products','image/webp',40644,1400,788,'/uploads/products/marketpulse.webp','local','products/marketpulse.webp','image','webp',JSON_OBJECT('scope','products','slug','marketpulse'))
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`),`size`=VALUES(`size`),`width`=VALUES(`width`),`height`=VALUES(`height`),`url`=VALUES(`url`),`metadata`=VALUES(`metadata`);

UPDATE `products` SET `image_url`='/uploads/products/geoserra.webp', `images`=JSON_ARRAY('/uploads/products/geoserra.webp'), `storage_asset_id`='19300000-0000-4000-8000-000000000001' WHERE `id`='30000000-0000-4000-8000-000000000201';
UPDATE `products` SET `image_url`='/uploads/products/sozial.webp', `images`=JSON_ARRAY('/uploads/products/sozial.webp'), `storage_asset_id`='19300000-0000-4000-8000-000000000002' WHERE `id`='30000000-0000-4000-8000-000000000202';
UPDATE `products` SET `image_url`='/uploads/products/katalogai.webp', `images`=JSON_ARRAY('/uploads/products/katalogai.webp'), `storage_asset_id`='19300000-0000-4000-8000-000000000003' WHERE `id`='30000000-0000-4000-8000-000000000203';
UPDATE `products` SET `image_url`='/uploads/products/invitea.webp', `images`=JSON_ARRAY('/uploads/products/invitea.webp'), `storage_asset_id`='19300000-0000-4000-8000-000000000004' WHERE `id`='30000000-0000-4000-8000-000000000204';
UPDATE `products` SET `image_url`='/uploads/products/scraper-api.webp', `images`=JSON_ARRAY('/uploads/products/scraper-api.webp'), `storage_asset_id`='19300000-0000-4000-8000-000000000005' WHERE `id`='30000000-0000-4000-8000-000000000205';
UPDATE `products` SET `image_url`='/uploads/products/marketpulse.webp', `images`=JSON_ARRAY('/uploads/products/marketpulse.webp'), `storage_asset_id`='19300000-0000-4000-8000-000000000006' WHERE `id`='30000000-0000-4000-8000-000000000206';

UPDATE `product_i18n`
SET `description`='Ürün kataloglarını yapay zekâ destekli arama, filtreleme, teklif oluşturma ve PDF çıktılarıyla yöneten dijital katalog platformu.',
    `alt`='KatalogAI yapay zekâ destekli katalog platformu',
    `meta_description`='Yapay zekâ destekli ürün kataloğu, gelişmiş arama, teklif oluşturma ve PDF çıktı platformu.'
WHERE `product_id`='30000000-0000-4000-8000-000000000203' AND `locale`='tr';
