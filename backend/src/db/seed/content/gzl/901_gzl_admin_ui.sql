-- =============================================================
-- FILE: content/gzl/901_gzl_admin_ui.sql
-- ELLE YAZILDI. Migration script'i bu dosyaya dokunmaz.
--
-- NEDEN VAR:
--   Admin paneli acilirken GET /admin/site_settings/ui_admin?locale=tr
--   cagiriyor. Bu anahtar ADMIN ARAYUZ METINLERIDIR (menu etiketleri, bolum
--   adlari) — markaya degil UYGULAMAYA aittir. Emekli gzlteknoloji reposunda
--   karsiligi farkli bir anahtardaydi (ui_admin_config), bu yuzden panel
--   surekli 404 aliyordu.
--
--   Cozum: 040.15_site_settings_admin_ui.sql artik "core" olarak siniflandi
--   (profiles.json) — yani tr/en/de metinleriyle TUM deployment'larda calisir.
--   Geriye tek marka farki kaliyor: app_name. Burada onu override ediyoruz.
--   8 KB'lik metni kopyalamak yerine tek alan degistiriliyor; GWD'de metinler
--   guncellenince GZL de otomatik ayni guncellemeyi alir.
-- =============================================================

SET NAMES utf8mb4;

UPDATE `site_settings`
   SET `value` = JSON_SET(CAST(`value` AS JSON), '$.app_name', 'GZL Teknoloji'),
       `updated_at` = CURRENT_TIMESTAMP(3)
 WHERE `key` = 'ui_admin'
   AND JSON_VALID(`value`);
