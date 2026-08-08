-- =============================================================
-- @generated migrate-gzlteknoloji-content
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/042_pricing_detail_cta_seed.sql
-- Gerekce : Fiyatlandirma detay/CTA metinleri
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- 042 — Paket liste CTA metni: liste Detay, detay sayfası Teklif al akışını kullanır.

SET NAMES utf8mb4;

UPDATE `pricing_plans_i18n`
SET `cta_label` = CASE WHEN `locale` = 'en' THEN 'View details' ELSE 'Detay' END,
    `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` IN ('tr', 'en');
