-- =============================================================
-- FILE: content/gzl/909_gzl_taxonomy.sql
-- URETILDI: scripts/gzl-taxonomy.mjs  (@generated gzl-taxonomy)
--
-- ELLE DUZENLEME. Degisiklik gerekiyorsa script guncellenip yeniden calistirilir.
--
-- Hizmet ve projeler AYNI kategori listesini kullanir; hizmet sayfasindaki
-- "bu kategoride yaptigimiz projeler" bolumu bu eslesmeden uretilir.
-- =============================================================

SET NAMES utf8mb4;

-- 1) Kategori listesi — etiketlerin TEK kaynagi (panelden duzenlenebilir)

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`)
VALUES ('19000000-0000-4000-8000-000000000901', 'content_categories', 'tr', '{"items":[{"slug":"web-ecommerce","label":"Web ve E-Ticaret","description":"Kurumsal siteler, e-ticaret, randevu ve sipariş sistemleri.","order":1},{"slug":"custom-software","label":"Özel Yazılım ve ERP","description":"İş süreçlerine özgü web uygulamaları, ERP ve yönetim panelleri.","order":2},{"slug":"data-automation","label":"Veri, Otomasyon ve Yapay Zekâ","description":"Veri toplama, tahmin modelleri ve otomasyon panelleri.","order":3},{"slug":"seo-geo","label":"SEO, GEO ve Ölçümleme","description":"Arama motoru ve yapay zekâ görünürlüğü, analitik kurulumu.","order":4},{"slug":"infra-support","label":"Altyapı ve Bakım","description":"Sunucu kurulumu, yayına alma, izleme ve sürekli bakım.","order":5}]}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`)
VALUES ('19000000-0000-4000-8000-000000000902', 'content_categories', 'en', '{"items":[{"slug":"web-ecommerce","label":"Web & E-Commerce","description":"Corporate sites, e-commerce, booking and ordering systems.","order":1},{"slug":"custom-software","label":"Custom Software & ERP","description":"Process-specific web applications, ERP and management panels.","order":2},{"slug":"data-automation","label":"Data, Automation & AI","description":"Data collection, prediction models and automation panels.","order":3},{"slug":"seo-geo","label":"SEO, GEO & Analytics","description":"Search and AI visibility, analytics and conversion tracking.","order":4},{"slug":"infra-support","label":"Infrastructure & Support","description":"Server setup, deployment, monitoring and ongoing maintenance.","order":5}]}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`)
VALUES ('19000000-0000-4000-8000-000000000903', 'content_categories', 'de', '{"items":[{"slug":"web-ecommerce","label":"Web & E-Commerce","description":"Unternehmensseiten, E-Commerce, Buchungs- und Bestellsysteme.","order":1},{"slug":"custom-software","label":"Individualsoftware & ERP","description":"Prozessspezifische Webanwendungen, ERP und Verwaltungspanels.","order":2},{"slug":"data-automation","label":"Daten, Automatisierung & KI","description":"Datenerfassung, Prognosemodelle und Automatisierungspanels.","order":3},{"slug":"seo-geo","label":"SEO, GEO & Analytics","description":"Sichtbarkeit in Suche und KI, Analytics und Conversion-Tracking.","order":4},{"slug":"infra-support","label":"Infrastruktur & Wartung","description":"Servereinrichtung, Deployment, Monitoring und laufende Wartung.","order":5}]}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

-- 2) Yinelenen proje kayitlari: once website_url tasinir, sonra silinir.

-- Ikisi de GeoSerra platformu; kisa kayit 415 karakterlik eski seed metni.
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`website_url` = 'https://geoserra.com', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug = 'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu';
DELETE p FROM `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id
  WHERE i.slug = 'geoserra';

-- Uc kayit da ayni musterinin (Königs Massage) ayni randevu platformu.
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`website_url` = 'https://energetische-massage-bonn.de', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug = 'konig-energetik-randevulu-masaj-wellness-sitesi';
DELETE p FROM `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id
  WHERE i.slug = 'konig-massage';
DELETE p FROM `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id
  WHERE i.slug = 'konigs-massage-multi-tenant-randevu-platformu-metahub';

-- Ayni calismanin iki kez yazilmis hali; metinler neredeyse ayni.
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`website_url` = 'https://wiribu.de', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug = 'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu';
DELETE p FROM `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id
  WHERE i.slug = 'wiribu-de-lighthouse-100-100-geo-optimizasyonu';

-- 3) Hizmet kategorileri
UPDATE `services` s
  JOIN `services_i18n` i ON i.service_id = s.id AND i.locale = 'tr'
  SET s.`type` = 'web-ecommerce', s.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('kurumsal-web-sitesi', 'randevu-sistemli-kurumsal-site', 'e-ticaret-sitesi', 'modern-e-ticaret-sitesi', 'online-siparis-sistemi', 'emlak-ilan-sitesi');
UPDATE `services` s
  JOIN `services_i18n` i ON i.service_id = s.id AND i.locale = 'tr'
  SET s.`type` = 'custom-software', s.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('firmaya-ozel-erp-yazilimi', 'osgb-isletme-yonetim-sistemi', 'ozel-yazilim-nextjs-fastify', 'teklif-raporlama-web-sayfasi');
UPDATE `services` s
  JOIN `services_i18n` i ON i.service_id = s.id AND i.locale = 'tr'
  SET s.`type` = 'data-automation', s.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('lead-bulma-rakip-takip-paneli', 'sosyal-medya-otomasyon-paneli', 'ai-ml-veri-tahmin-platformu', 'amazon-fiyat-scraping-sistemi', 'google-maps-veri-cekme-botu');
UPDATE `services` s
  JOIN `services_i18n` i ON i.service_id = s.id AND i.locale = 'tr'
  SET s.`type` = 'seo-geo', s.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('geo-seo-lighthouse-analizi', 'yapay-zeka-arama-optimizasyonu-geo', 'seo-hizmeti', 'ga4-gtm-donusum-izleme');
UPDATE `services` s
  JOIN `services_i18n` i ON i.service_id = s.id AND i.locale = 'tr'
  SET s.`type` = 'infra-support', s.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('ubuntu-vps-kurulum-yayinlama', 'bakim-destek');

-- 4) Proje kategorileri
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`category` = 'web-ecommerce', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('antalya-doner-qr-menu-online-siparis-next-js', 'bereket-fide-kurumsal-web-sitesi-urun-katalogu', 'gzlteknoloji', 'kamanilan', 'konig-energetik-randevulu-masaj-wellness-sitesi', 'miss-et-balik', 'sportoonline-spor-outdoor-e-ticaret-platformu', 'vista-insaat-kurumsal-web-sitesi-admin-paneli');
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`category` = 'custom-software', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('ensotek-multi-tenant-b2b-saas-metahub', 'gzl-temizlik', 'paspas-erp-uretim-ve-operasyon-yonetim-sistemi');
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`category` = 'data-automation', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('amozon-amazon-ticari-radar-ai-karar-motoru', 'genomai-genomik-tahmin-ai-bitki-islahi-platformu', 'marketpulse-bayi-rakip-pazar-izleme-saas-platformu', 'socialpulse-sosyal-medya-yonetim-otomasyon-platformu');
UPDATE `projects` p
  JOIN `projects_i18n` i ON i.project_id = p.id AND i.locale = 'tr'
  SET p.`category` = 'seo-geo', p.`updated_at` = CURRENT_TIMESTAMP(3)
  WHERE i.slug IN ('cok-dilli-b2b-sitesi-geo-seo-lighthouse-analizi', 'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu', 'trackpulse-web-analitik-donusum-izleme-platformu', 'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu');
