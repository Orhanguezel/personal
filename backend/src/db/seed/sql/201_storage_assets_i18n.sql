-- =============================================================
-- 201_storage_assets_i18n.sql  (storage_assets_i18n)
--  - TR + EN + DE
--  - DE: TR kopyası (Almanca özel çeviri gelene kadar)
--  - SAFE re-runnable: ON DUPLICATE KEY UPDATE + NOT EXISTS copy
-- =============================================================

/* ================= TABLE ================= */
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

/* ================= SEED ================= */

-- -------------------------------------------------------------
-- TR
-- -------------------------------------------------------------
INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_HERO_ID, 'tr', 'Hero', 'Hero', 'Öne çıkan görsel', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_REF1_ID, 'tr', 'Ref1', 'Ref1', 'Öne çıkan görsel', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_REF2_ID, 'tr', 'Ref2', 'Ref2', 'Öne çıkan görsel', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_G1A_ID, 'tr', 'Galeri1A', 'Galeri 1A', 'Galeri görseli', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_G1B_ID, 'tr', 'Galeri1B', 'Galeri 1B', 'Galeri görseli', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_G2A_ID, 'tr', 'Galeri2A', 'Galeri 2A', 'Galeri görseli', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

-- -------------------------------------------------------------
-- EN
-- -------------------------------------------------------------
INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_HERO_ID, 'en', 'Hero', 'Hero', 'Featured image', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_REF1_ID, 'en', 'Ref1', 'Ref1', 'Featured image', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_REF2_ID, 'en', 'Ref2', 'Ref2', 'Featured image', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_G1A_ID, 'en', 'Gallery1A', 'Gallery 1A', 'Gallery image', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_G1B_ID, 'en', 'Gallery1B', 'Gallery 1B', 'Gallery image', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

INSERT INTO storage_assets_i18n
(id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
VALUES
(UUID(), @ASSET_G2A_ID, 'en', 'Gallery2A', 'Gallery 2A', 'Gallery image', NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
  title=VALUES(title),
  alt=VALUES(alt),
  caption=VALUES(caption),
  description=VALUES(description),
  updated_at=VALUES(updated_at);

-- -------------------------------------------------------------
-- PROJECT IMAGES — TR
-- -------------------------------------------------------------
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_SPORTOONLINE_1,'tr','QuickEcommerce','QuickEcommerce ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_SPORTOONLINE_2,'tr','QuickEcommerce 2','QuickEcommerce ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_SPORTOONLINE_3,'tr','QuickEcommerce 3','QuickEcommerce ekran görüntüsü 3','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_1,'tr','Ensotek','Ensotek ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_2,'tr','Ensotek 2','Ensotek ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_TR_1,'tr','Ensotek TR','Ensotek TR ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_TR_2,'tr','Ensotek TR 2','Ensotek TR ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_TR_3,'tr','Ensotek TR 3','Ensotek TR ekran görüntüsü 3','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KOMPOZIT_1,'tr','Karbonkompozit','Karbonkompozit ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KOMPOZIT_2,'tr','Karbonkompozit 2','Karbonkompozit ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KOMPOZIT_3,'tr','Karbonkompozit 3','Karbonkompozit ekran görüntüsü 3','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PAKETJET_1,'tr','PaketJet','PaketJet ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PAKETJET_2,'tr','PaketJet 2','PaketJet ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PAKETJET_3,'tr','PaketJet 3','PaketJet ekran görüntüsü 3','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KATALOG_1,'tr','KatalogAI','KatalogAI ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KATALOG_2,'tr','KatalogAI 2','KatalogAI ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_VISTASEED_1,'tr','VistaSeed','VistaSeed ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_VISTASEED_2,'tr','VistaSeed 2','VistaSeed ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_VISTASEED_3,'tr','VistaSeed 3','VistaSeed ekran görüntüsü 3','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PROMATS_1,'tr','Promats','Promats ana ekran görüntüsü','Proje görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PROMATS_2,'tr','Promats 2','Promats ekran görüntüsü 2','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PROMATS_3,'tr','Promats 3','Promats ekran görüntüsü 3','Galeri görseli',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);

-- PROJECT IMAGES — EN
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_SPORTOONLINE_1,'en','QuickEcommerce','QuickEcommerce main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_SPORTOONLINE_2,'en','QuickEcommerce 2','QuickEcommerce screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_SPORTOONLINE_3,'en','QuickEcommerce 3','QuickEcommerce screenshot 3','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_1,'en','Ensotek','Ensotek main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_2,'en','Ensotek 2','Ensotek screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_TR_1,'en','Ensotek TR','Ensotek TR main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_TR_2,'en','Ensotek TR 2','Ensotek TR screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_ENSOTEK_TR_3,'en','Ensotek TR 3','Ensotek TR screenshot 3','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KOMPOZIT_1,'en','Karbonkompozit','Karbonkompozit main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KOMPOZIT_2,'en','Karbonkompozit 2','Karbonkompozit screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KOMPOZIT_3,'en','Karbonkompozit 3','Karbonkompozit screenshot 3','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PAKETJET_1,'en','PaketJet','PaketJet main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PAKETJET_2,'en','PaketJet 2','PaketJet screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PAKETJET_3,'en','PaketJet 3','PaketJet screenshot 3','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KATALOG_1,'en','KatalogAI','KatalogAI main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_KATALOG_2,'en','KatalogAI 2','KatalogAI screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_VISTASEED_1,'en','VistaSeed','VistaSeed main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_VISTASEED_2,'en','VistaSeed 2','VistaSeed screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_VISTASEED_3,'en','VistaSeed 3','VistaSeed screenshot 3','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PROMATS_1,'en','Promats','Promats main screenshot','Project visual',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PROMATS_2,'en','Promats 2','Promats screenshot 2','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);
INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at) VALUES (UUID(),@PROJ_PROMATS_3,'en','Promats 3','Promats screenshot 3','Gallery image',NULL,NOW(3),NOW(3)) ON DUPLICATE KEY UPDATE title=VALUES(title),alt=VALUES(alt),caption=VALUES(caption),updated_at=VALUES(updated_at);

-- -------------------------------------------------------------
-- TR → DE otomatik kopya (Almanca özel çeviri gelene kadar)
--  - Sadece DE kaydı yoksa ekler
--  - Var olan DE'leri ezmez (bilerek)
-- -------------------------------------------------------------
INSERT INTO storage_assets_i18n (id, asset_id, locale, title, alt, caption, description, created_at, updated_at)
SELECT UUID(), s.asset_id, 'de', s.title, s.alt, s.caption, s.description, NOW(3), NOW(3)
FROM storage_assets_i18n s
WHERE s.locale='tr'
  AND NOT EXISTS (
    SELECT 1
    FROM storage_assets_i18n t
    WHERE t.asset_id = s.asset_id
      AND t.locale = 'de'
  );
