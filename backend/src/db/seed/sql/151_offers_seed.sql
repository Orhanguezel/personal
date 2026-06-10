-- =============================================================
-- 151_offers_seed.sql
-- Teklif sayacı (GWD); demo müşteri kaydı yok.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- (Opsiyonel) Teklif numarası sayaçları seed
-- Not: Sadece örnek. Prod'da servis bunu yönetiyor olabilir.
-- =============================================================
INSERT INTO `offer_number_counters` (`year`, `last_seq`, `prefix`)
VALUES
(YEAR(CURRENT_DATE), 0, 'GWD')
ON DUPLICATE KEY UPDATE
  `last_seq` = VALUES(`last_seq`),
  `prefix`   = VALUES(`prefix`);

-- =============================================================
-- SEED: offers — demo teklif kaydı yok; gerçek talepler formdan gelir.
-- =============================================================

COMMIT;
