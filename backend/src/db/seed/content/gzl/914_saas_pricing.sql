SET NAMES utf8mb4;

-- SaaS plan prices are synchronized from the products' own repositories.
INSERT INTO `pricing_plans`
  (`id`,`code`,`price_amount`,`price_unit`,`currency`,`is_active`,`is_featured`,`display_order`,`cta_href`,`created_at`,`updated_at`)
VALUES
  ('91400000-0000-4000-8000-000000000001','sosyal-medya-platformu-baslangic',499,'month','TRY',1,0,100,'https://sosial.tarvista.com',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000002','sosyal-medya-platformu-profesyonel',1299,'month','TRY',1,1,101,'https://sosial.tarvista.com',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000003','sosyal-medya-platformu-ajans',3999,'month','TRY',1,0,102,'https://sosial.tarvista.com',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000004','ihracat-radari-standart',499,'month','TRY',1,0,110,'https://ihracatradari.com.tr',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000005','ihracat-radari-profesyonel',1299,'month','TRY',1,1,111,'https://ihracatradari.com.tr',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000006','ihracat-radari-tam-profesyonel',3999,'month','TRY',1,0,112,'https://ihracatradari.com.tr',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000007','geoserra-basic',5,'once','USD',1,0,120,'https://geoserra.com/pricing',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000008','geoserra-standard',15,'once','USD',1,1,121,'https://geoserra.com/pricing',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000009','geoserra-premium',50,'once','USD',1,0,122,'https://geoserra.com/pricing',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000010','amozon-scraping-paneli',15000,'setup','TRY',1,0,130,'/tr/iletisim?paket=amozon-scraping-paneli',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000011','amozon-skorlama-sistemi',25000,'setup','TRY',1,1,131,'/tr/iletisim?paket=amozon-skorlama-sistemi',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400000-0000-4000-8000-000000000012','amozon-tam-karar-radari',50000,'setup','TRY',1,0,132,'/tr/iletisim?paket=amozon-tam-karar-radari',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `price_amount`=VALUES(`price_amount`),`price_unit`=VALUES(`price_unit`),
  `currency`=VALUES(`currency`),`is_active`=VALUES(`is_active`),
  `is_featured`=VALUES(`is_featured`),`display_order`=VALUES(`display_order`),
  `cta_href`=VALUES(`cta_href`),`updated_at`=CURRENT_TIMESTAMP(3);

INSERT INTO `pricing_plans_i18n`
  (`id`,`plan_id`,`locale`,`badge`,`title`,`description`,`features`,`cta_label`,`cta_href`,`created_at`,`updated_at`)
VALUES
  ('91400001-0000-4000-8000-000000000001','91400000-0000-4000-8000-000000000001','tr','SaaS','Sosyal Medya Platformu — Başlangıç','Sosyal medya yönetim platformunun başlangıç planı.',JSON_ARRAY('2 sosyal medya hesabı','Aylık 150 gönderi','300 AI kredisi','2 kullanıcı'),'Platforma git','https://sosial.tarvista.com',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000002','91400000-0000-4000-8000-000000000002','tr','SaaS','Sosyal Medya Platformu — Profesyonel','Aktif ekipler için profesyonel sosyal medya planı.',JSON_ARRAY('5 sosyal medya hesabı','Aylık 600 gönderi','1.500 AI kredisi','5 kullanıcı'),'Platforma git','https://sosial.tarvista.com',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000003','91400000-0000-4000-8000-000000000003','tr','SaaS','Sosyal Medya Platformu — Ajans','Çok markalı ekipler ve ajanslar için.',JSON_ARRAY('15 sosyal medya hesabı','Sınırsız gönderi','5.000 AI kredisi','15 kullanıcı'),'Platforma git','https://sosial.tarvista.com',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000004','91400000-0000-4000-8000-000000000004','tr','SaaS','İhracat Radarı — Standart','Düzenli ihracat müşteri araştırmasına başlayan firmalar için.',JSON_ARRAY('250 firma kotası','1.000 kredi','2 kullanıcı'),'Platforma git','https://ihracatradari.com.tr',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000005','91400000-0000-4000-8000-000000000005','tr','SaaS','İhracat Radarı — Profesyonel','Aktif ihracat ve satış ekipleri için.',JSON_ARRAY('1.000 firma kotası','5.000 kredi','5 kullanıcı'),'Platforma git','https://ihracatradari.com.tr',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000006','91400000-0000-4000-8000-000000000006','tr','SaaS','İhracat Radarı — Tam Profesyonel','Yüksek kapasiteli araştırma ve ekip kullanımı için.',JSON_ARRAY('5.000 firma kotası','25.000 kredi','Ekip kullanımı'),'Platforma git','https://ihracatradari.com.tr',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000007','91400000-0000-4000-8000-000000000007','tr','SaaS','GeoSerra — Basic','Temel GEO ve SEO analizi.',JSON_ARRAY('Tek site analizi','GEO ve SEO skoru','PDF rapor'),'GeoSerra’ya git','https://geoserra.com/pricing',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000008','91400000-0000-4000-8000-000000000008','tr','SaaS','GeoSerra — Standard','Daha kapsamlı görünürlük ve teknik analiz.',JSON_ARRAY('Basic plan özellikleri','Gelişmiş analiz','Aksiyon listesi'),'GeoSerra’ya git','https://geoserra.com/pricing',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000009','91400000-0000-4000-8000-000000000009','tr','SaaS','GeoSerra — Premium','Rakip analizi ve gelişmiş raporlama.',JSON_ARRAY('Standard plan özellikleri','Rakip analizi','llms.txt üretimi','Yeniden analiz'),'GeoSerra’ya git','https://geoserra.com/pricing',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000010','91400000-0000-4000-8000-000000000010','tr','SaaS','Amozon — Scraping Paneli','Amazon ürün araştırması için başlangıç kurulumu.',JSON_ARRAY('Tek site veya kategori','Ürün detayı toplama','ASIN tekilleştirme','Sonuç paneli'),'Teklif al','/tr/iletisim?paket=amozon-scraping-paneli',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000011','91400000-0000-4000-8000-000000000011','tr','SaaS','Amozon — Skorlama Sistemi','Fiyat geçmişi ve açıklanabilir karar desteği.',JSON_ARRAY('Scraping Paneli özellikleri','Fiyat geçmişi','Risk ve fırsat skoru','AI karar açıklaması'),'Teklif al','/tr/iletisim?paket=amozon-skorlama-sistemi',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3)),
  ('91400001-0000-4000-8000-000000000012','91400000-0000-4000-8000-000000000012','tr','SaaS','Amozon — Tam Karar Radarı','Çok boyutlu ticari karar ve uyarı sistemi.',JSON_ARRAY('Skorlama Sistemi özellikleri','5 boyutlu karar skoru','Tez ve bozulma uyarısı','Gelişmiş raporlama'),'Teklif al','/tr/iletisim?paket=amozon-tam-karar-radari',CURRENT_TIMESTAMP(3),CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `badge`=VALUES(`badge`),`title`=VALUES(`title`),`description`=VALUES(`description`),
  `features`=VALUES(`features`),`cta_label`=VALUES(`cta_label`),
  `cta_href`=VALUES(`cta_href`),`updated_at`=CURRENT_TIMESTAMP(3);

-- Use the products' public names and live addresses. Invitea is not live yet.
UPDATE `products` SET `is_active`=0,`updated_at`=CURRENT_TIMESTAMP(3)
WHERE `product_code`='INVITEA';

UPDATE `products` SET `demo_url`='https://sosial.tarvista.com',`updated_at`=CURRENT_TIMESTAMP(3)
WHERE `product_code`='SOZIAL';
UPDATE `products` SET `demo_url`='https://ihracatradari.com.tr',`updated_at`=CURRENT_TIMESTAMP(3)
WHERE `product_code`='MARKETPULSE';
UPDATE `products` SET `demo_url`='https://geoserra.com',`updated_at`=CURRENT_TIMESTAMP(3)
WHERE `product_code`='GEOSERRA';

UPDATE `product_i18n` SET `title`='Sosyal Medya Platformu',`slug`='sosyal-medya-platformu',
  `meta_title`='Sosyal Medya Platformu | GZL Teknoloji',`updated_at`=CURRENT_TIMESTAMP(3)
WHERE `product_id`='30000000-0000-4000-8000-000000000202' AND `locale`='tr';
UPDATE `product_i18n` SET `title`='İhracat Radarı',`slug`='ihracat-radari',
  `meta_title`='İhracat Radarı | GZL Teknoloji',`updated_at`=CURRENT_TIMESTAMP(3)
WHERE `product_id`='30000000-0000-4000-8000-000000000206' AND `locale`='tr';
