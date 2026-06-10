-- =============================================================
-- 200_storage_assets.sql  (storage_assets)
-- =============================================================

/* ================= TABLE ================= */
CREATE TABLE IF NOT EXISTS `storage_assets` (
  id                       CHAR(36)      NOT NULL,
  user_id                  CHAR(36)      DEFAULT NULL,

  `name`                   VARCHAR(255)  NOT NULL,
  bucket                   VARCHAR(64)   NOT NULL,
  `path`                   VARCHAR(512)  NOT NULL,
  folder                   VARCHAR(255)  DEFAULT NULL,

  mime                     VARCHAR(127)  NOT NULL,
  size                     BIGINT UNSIGNED NOT NULL,

  width                    INT UNSIGNED  DEFAULT NULL,
  height                   INT UNSIGNED  DEFAULT NULL,

  url                      TEXT          DEFAULT NULL,
  hash                     VARCHAR(64)   DEFAULT NULL,

  provider                 VARCHAR(16)   NOT NULL DEFAULT 'cloudinary',
  provider_public_id       VARCHAR(255)  DEFAULT NULL,
  provider_resource_type   VARCHAR(16)   DEFAULT NULL,
  provider_format          VARCHAR(32)   DEFAULT NULL,
  provider_version         INT UNSIGNED  DEFAULT NULL,
  etag                     VARCHAR(64)   DEFAULT NULL,

  metadata                 JSON          DEFAULT NULL,

  created_at               DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at               DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (id),
  UNIQUE KEY uniq_bucket_path (bucket, `path`),
  KEY idx_storage_bucket (bucket),
  KEY idx_storage_folder (folder),
  KEY idx_storage_created (created_at),
  KEY idx_provider_pubid (provider_public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* ================= SEED: ASSETS (deterministik anahtar: bucket+path) ================= */

-- Ortak demo URL (Unsplash)
SET @DEMO_IMG_URL := 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&h=600&q=80';

-- hero
SET @ASSET_HERO_ID := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='references/hero.jpg' LIMIT 1);
SET @ASSET_HERO_ID := COALESCE(@ASSET_HERO_ID, UUID());
INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(@ASSET_HERO_ID, NULL, 'hero.jpg', 'public', 'references/hero.jpg', 'references',
 'image/jpeg', 245120, NULL, NULL,
 @DEMO_IMG_URL, NULL,
 'cloudinary', NULL, 'image', 'jpg', 1, NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
 mime=VALUES(mime),
 size=VALUES(size),
 url=VALUES(url),
 provider_format=VALUES(provider_format),
 updated_at=VALUES(updated_at);

-- ref1
SET @ASSET_REF1_ID := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='references/ref1.jpg' LIMIT 1);
SET @ASSET_REF1_ID := COALESCE(@ASSET_REF1_ID, UUID());
INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(@ASSET_REF1_ID, NULL, 'ref1.jpg', 'public', 'references/ref1.jpg', 'references',
 'image/jpeg', 180300, NULL, NULL,
 @DEMO_IMG_URL, NULL,
 'cloudinary', NULL, 'image', 'jpg', 1, NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
 mime=VALUES(mime),
 size=VALUES(size),
 url=VALUES(url),
 provider_format=VALUES(provider_format),
 updated_at=VALUES(updated_at);

-- ref2
SET @ASSET_REF2_ID := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='references/ref2.jpg' LIMIT 1);
SET @ASSET_REF2_ID := COALESCE(@ASSET_REF2_ID, UUID());
INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(@ASSET_REF2_ID, NULL, 'ref2.jpg', 'public', 'references/ref2.jpg', 'references',
 'image/jpeg', 171550, NULL, NULL,
 @DEMO_IMG_URL, NULL,
 'cloudinary', NULL, 'image', 'jpg', 1, NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
 mime=VALUES(mime),
 size=VALUES(size),
 url=VALUES(url),
 provider_format=VALUES(provider_format),
 updated_at=VALUES(updated_at);

-- gallery 1A
SET @ASSET_G1A_ID := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='references/g1a.jpg' LIMIT 1);
SET @ASSET_G1A_ID := COALESCE(@ASSET_G1A_ID, UUID());
INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(@ASSET_G1A_ID, NULL, 'g1a.jpg', 'public', 'references/g1a.jpg', 'references',
 'image/jpeg', 200000, NULL, NULL,
 @DEMO_IMG_URL, NULL,
 'cloudinary', NULL, 'image', 'jpg', 1, NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
 mime=VALUES(mime),
 size=VALUES(size),
 url=VALUES(url),
 provider_format=VALUES(provider_format),
 updated_at=VALUES(updated_at);

-- gallery 1B
SET @ASSET_G1B_ID := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='references/g1b.jpg' LIMIT 1);
SET @ASSET_G1B_ID := COALESCE(@ASSET_G1B_ID, UUID());
INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(@ASSET_G1B_ID, NULL, 'g1b.jpg', 'public', 'references/g1b.jpg', 'references',
 'image/jpeg', 210000, NULL, NULL,
 @DEMO_IMG_URL, NULL,
 'cloudinary', NULL, 'image', 'jpg', 1, NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
 mime=VALUES(mime),
 size=VALUES(size),
 url=VALUES(url),
 provider_format=VALUES(provider_format),
 updated_at=VALUES(updated_at);

-- gallery 2A
SET @ASSET_G2A_ID := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='references/g2a.jpg' LIMIT 1);
SET @ASSET_G2A_ID := COALESCE(@ASSET_G2A_ID, UUID());
INSERT INTO storage_assets
(id, user_id, `name`, bucket, `path`, folder, mime, size, width, height, url, hash,
 provider, provider_public_id, provider_resource_type, provider_format, provider_version, etag, metadata, created_at, updated_at)
VALUES
(@ASSET_G2A_ID, NULL, 'g2a.jpg', 'public', 'references/g2a.jpg', 'references',
 'image/jpeg', 205000, NULL, NULL,
 @DEMO_IMG_URL, NULL,
 'cloudinary', NULL, 'image', 'jpg', 1, NULL, NULL, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE
 mime=VALUES(mime),
 size=VALUES(size),
 url=VALUES(url),
 provider_format=VALUES(provider_format),
 updated_at=VALUES(updated_at);

/* ================= PROJECT SCREENSHOTS (local uploads) ================= */

-- QuickEcommerce / Sportoonline
SET @PROJ_SPORTOONLINE_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/sportoonline.png' LIMIT 1);
SET @PROJ_SPORTOONLINE_1 := COALESCE(@PROJ_SPORTOONLINE_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_SPORTOONLINE_1,NULL,'sportoonline.png','public','projects/sportoonline.png','projects','image/png',1159761,NULL,NULL,'/uploads/projects/sportoonline.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_SPORTOONLINE_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/sportoonline-2.png' LIMIT 1);
SET @PROJ_SPORTOONLINE_2 := COALESCE(@PROJ_SPORTOONLINE_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_SPORTOONLINE_2,NULL,'sportoonline-2.png','public','projects/sportoonline-2.png','projects','image/png',1081973,NULL,NULL,'/uploads/projects/sportoonline-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_SPORTOONLINE_3 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/sportoonline-3.png' LIMIT 1);
SET @PROJ_SPORTOONLINE_3 := COALESCE(@PROJ_SPORTOONLINE_3, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_SPORTOONLINE_3,NULL,'sportoonline-3.png','public','projects/sportoonline-3.png','projects','image/png',875566,NULL,NULL,'/uploads/projects/sportoonline-3.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- Ensotek DE
SET @PROJ_ENSOTEK_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/ensotek.png' LIMIT 1);
SET @PROJ_ENSOTEK_1 := COALESCE(@PROJ_ENSOTEK_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_ENSOTEK_1,NULL,'ensotek.png','public','projects/ensotek.png','projects','image/png',1388789,NULL,NULL,'/uploads/projects/ensotek.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_ENSOTEK_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/ensotek-2.png' LIMIT 1);
SET @PROJ_ENSOTEK_2 := COALESCE(@PROJ_ENSOTEK_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_ENSOTEK_2,NULL,'ensotek-2.png','public','projects/ensotek-2.png','projects','image/png',511703,NULL,NULL,'/uploads/projects/ensotek-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- Ensotek TR (ensotek.com.tr)
SET @PROJ_ENSOTEK_TR_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/ensotek_com.tr.png' LIMIT 1);
SET @PROJ_ENSOTEK_TR_1 := COALESCE(@PROJ_ENSOTEK_TR_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_ENSOTEK_TR_1,NULL,'ensotek_com.tr.png','public','projects/ensotek_com.tr.png','projects','image/png',587489,NULL,NULL,'/uploads/projects/ensotek_com.tr.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_ENSOTEK_TR_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/ensotek.tr.png' LIMIT 1);
SET @PROJ_ENSOTEK_TR_2 := COALESCE(@PROJ_ENSOTEK_TR_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_ENSOTEK_TR_2,NULL,'ensotek.tr.png','public','projects/ensotek.tr.png','projects','image/png',572747,NULL,NULL,'/uploads/projects/ensotek.tr.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_ENSOTEK_TR_3 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/ensotek.tr-3.png' LIMIT 1);
SET @PROJ_ENSOTEK_TR_3 := COALESCE(@PROJ_ENSOTEK_TR_3, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_ENSOTEK_TR_3,NULL,'ensotek.tr-3.png','public','projects/ensotek.tr-3.png','projects','image/png',159316,NULL,NULL,'/uploads/projects/ensotek.tr-3.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- Karbonkompozit
SET @PROJ_KOMPOZIT_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/kompozit.png' LIMIT 1);
SET @PROJ_KOMPOZIT_1 := COALESCE(@PROJ_KOMPOZIT_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_KOMPOZIT_1,NULL,'kompozit.png','public','projects/kompozit.png','projects','image/png',517755,NULL,NULL,'/uploads/projects/kompozit.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_KOMPOZIT_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/kompozit-2.png' LIMIT 1);
SET @PROJ_KOMPOZIT_2 := COALESCE(@PROJ_KOMPOZIT_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_KOMPOZIT_2,NULL,'kompozit-2.png','public','projects/kompozit-2.png','projects','image/png',565612,NULL,NULL,'/uploads/projects/kompozit-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_KOMPOZIT_3 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/kompozit-3.png' LIMIT 1);
SET @PROJ_KOMPOZIT_3 := COALESCE(@PROJ_KOMPOZIT_3, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_KOMPOZIT_3,NULL,'kompozit-3.png','public','projects/kompozit-3.png','projects','image/png',1059854,NULL,NULL,'/uploads/projects/kompozit-3.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- PaketJet
SET @PROJ_PAKETJET_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/paketjet.png' LIMIT 1);
SET @PROJ_PAKETJET_1 := COALESCE(@PROJ_PAKETJET_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_PAKETJET_1,NULL,'paketjet.png','public','projects/paketjet.png','projects','image/png',843715,NULL,NULL,'/uploads/projects/paketjet.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_PAKETJET_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/paketjet-2.png' LIMIT 1);
SET @PROJ_PAKETJET_2 := COALESCE(@PROJ_PAKETJET_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_PAKETJET_2,NULL,'paketjet-2.png','public','projects/paketjet-2.png','projects','image/png',148087,NULL,NULL,'/uploads/projects/paketjet-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_PAKETJET_3 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/paketjet-3.png' LIMIT 1);
SET @PROJ_PAKETJET_3 := COALESCE(@PROJ_PAKETJET_3, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_PAKETJET_3,NULL,'paketjet-3.png','public','projects/paketjet-3.png','projects','image/png',301532,NULL,NULL,'/uploads/projects/paketjet-3.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- KatalogAI
SET @PROJ_KATALOG_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/katalog.png' LIMIT 1);
SET @PROJ_KATALOG_1 := COALESCE(@PROJ_KATALOG_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_KATALOG_1,NULL,'katalog.png','public','projects/katalog.png','projects','image/png',286802,NULL,NULL,'/uploads/projects/katalog.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_KATALOG_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/katalog-2.png' LIMIT 1);
SET @PROJ_KATALOG_2 := COALESCE(@PROJ_KATALOG_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_KATALOG_2,NULL,'katalog-2.png','public','projects/katalog-2.png','projects','image/png',678714,NULL,NULL,'/uploads/projects/katalog-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- VistaSeed
SET @PROJ_VISTASEED_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/vistaseed.png' LIMIT 1);
SET @PROJ_VISTASEED_1 := COALESCE(@PROJ_VISTASEED_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_VISTASEED_1,NULL,'vistaseed.png','public','projects/vistaseed.png','projects','image/png',1563633,NULL,NULL,'/uploads/projects/vistaseed.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_VISTASEED_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/vistaseed-2.png' LIMIT 1);
SET @PROJ_VISTASEED_2 := COALESCE(@PROJ_VISTASEED_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_VISTASEED_2,NULL,'vistaseed-2.png','public','projects/vistaseed-2.png','projects','image/png',220809,NULL,NULL,'/uploads/projects/vistaseed-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_VISTASEED_3 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/vistaseed-3.png' LIMIT 1);
SET @PROJ_VISTASEED_3 := COALESCE(@PROJ_VISTASEED_3, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_VISTASEED_3,NULL,'vistaseed-3.png','public','projects/vistaseed-3.png','projects','image/png',461222,NULL,NULL,'/uploads/projects/vistaseed-3.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

-- Promats (storage only — project entry pending)
SET @PROJ_PROMATS_1 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/promats.png' LIMIT 1);
SET @PROJ_PROMATS_1 := COALESCE(@PROJ_PROMATS_1, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_PROMATS_1,NULL,'promats.png','public','projects/promats.png','projects','image/png',190623,NULL,NULL,'/uploads/projects/promats.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_PROMATS_2 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/promats-2.png' LIMIT 1);
SET @PROJ_PROMATS_2 := COALESCE(@PROJ_PROMATS_2, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_PROMATS_2,NULL,'promats-2.png','public','projects/promats-2.png','projects','image/png',275108,NULL,NULL,'/uploads/projects/promats-2.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

SET @PROJ_PROMATS_3 := (SELECT id FROM storage_assets WHERE bucket='public' AND `path`='projects/promats-3.png' LIMIT 1);
SET @PROJ_PROMATS_3 := COALESCE(@PROJ_PROMATS_3, UUID());
INSERT INTO storage_assets (id,user_id,`name`,bucket,`path`,folder,mime,size,width,height,url,hash,provider,provider_public_id,provider_resource_type,provider_format,provider_version,etag,metadata,created_at,updated_at) VALUES
(@PROJ_PROMATS_3,NULL,'promats-3.png','public','projects/promats-3.png','projects','image/png',153360,NULL,NULL,'/uploads/projects/promats-3.png',NULL,'local',NULL,'image','png',1,NULL,NULL,NOW(3),NOW(3))
ON DUPLICATE KEY UPDATE url=VALUES(url),size=VALUES(size),updated_at=VALUES(updated_at);

