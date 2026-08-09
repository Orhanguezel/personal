-- =============================================================
-- FILE: 131_storage_assets_i18n_schema.sql
-- storage_assets_i18n SEMASI — icerikten bagimsiz, TUM deployment'larda calisir.
--
-- NEDEN AYRI DOSYA:
--   Bu tablo daha once yalnizca 201_storage_assets_i18n.sql icinde
--   yaratiliyordu; o dosya ise 57 adet Guzel Web Design medya kaydi tasiyan
--   bir *icerik* dosyasidir ve gzl profilinde calistirilmaz.
--   Sema burada, icerik orada. (130_storage_assets.sql'den sonra calismali —
--   foreign key parent tablosu orada yaratiliyor.)
--
--   Eski dosyadaki CREATE ifadesi IF NOT EXISTS oldugu icin no-op'a doner.
-- =============================================================

CREATE TABLE IF NOT EXISTS `storage_assets_i18n` (
  id          CHAR(36)     NOT NULL,
  asset_id    CHAR(36)     NOT NULL,
  locale      VARCHAR(10)  NOT NULL,

  title       VARCHAR(255)  DEFAULT NULL,
  alt         VARCHAR(255)  DEFAULT NULL,
  caption     VARCHAR(1000) DEFAULT NULL,
  description TEXT          DEFAULT NULL,

  created_at  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  UNIQUE KEY ux_storage_assets_i18n_parent_locale (asset_id, locale),
  KEY idx_storage_assets_i18n_locale (locale),
  CONSTRAINT fk_storage_assets_i18n_asset
    FOREIGN KEY (asset_id) REFERENCES storage_assets(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
