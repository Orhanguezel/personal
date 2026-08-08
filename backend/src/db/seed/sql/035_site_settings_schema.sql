-- =============================================================
-- FILE: 035_site_settings_schema.sql
-- site_settings SEMASI — icerikten bagimsiz, TUM deployment'larda calisir.
--
-- NEDEN AYRI DOSYA:
--   Bu tablo daha once yalnizca 040_site_settings.sql ve 040.1_site_meta.sql
--   icinde `CREATE TABLE IF NOT EXISTS` olarak yaratiliyordu. O dosyalar
--   *icerik* dosyasidir (Guzel Web Design marka degerleri) ve gzl profilinde
--   calistirilmaz — semanin onlara bagli olmasi profil ayrimini imkansiz
--   kiliyordu. Sema burada, icerik orada.
--
--   Eski dosyalardaki CREATE ifadeleri IF NOT EXISTS oldugu icin no-op'a
--   doner; onlara dokunulmadi.
-- =============================================================

CREATE TABLE IF NOT EXISTS `site_settings` (
  `id`         CHAR(36)      NOT NULL,
  `key`        VARCHAR(100)  NOT NULL,
  `locale`     VARCHAR(8)    NOT NULL,
  `value`      TEXT          NOT NULL,
  `created_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
                ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_locale_uq` (`key`, `locale`),
  KEY `site_settings_key_idx` (`key`),
  KEY `site_settings_locale_idx` (`locale`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
