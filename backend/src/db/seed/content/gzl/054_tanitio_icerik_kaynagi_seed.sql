-- =============================================================
-- 054 — Tanitio icerik kaynagi profili (gzl)
-- -------------------------------------------------------------
-- /api/v1/integrations/tanitio/contract ve /context yanitlarindaki kiraciya
-- ozel metinler. Onceden router.ts icinde sabitti; ayni kod guezelwebdesign.com'da
-- da kostugu icin marka kurali geregi veriye tasindi (2026-10-01).
-- Degerler canlidaki yanitla birebir aynidir; Tanitio tarafinda degisiklik yok.
--
-- MARKA KURALI: bu degerler yalnizca gzl profiline aittir; kodda yazmaz.
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-tanitio-content-source-gzl', 'tanitio_content_source', '*', '{"contract":"gzlteknoloji-tanitio-web-connection","tenant":"gzlteknoloji","brand":"GZL Teknoloji","locale":"tr-TR","timezone":"Europe/Istanbul","sector":"kurumsal web, e-ticaret, özel yazılım ve dijital otomasyon","audience":["KOBİler","girişimciler","dijital dönüşüm hedefleyen işletmeler"],"contentPillars":["özel yazılım","web ve e-ticaret","iş otomasyonu","GEO ve SEO","vaka çalışmaları"],"defaultHashtags":["#gzlteknoloji","#yazilim","#webtasarim","#eticaret","#dijitaldonusum"]}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);
