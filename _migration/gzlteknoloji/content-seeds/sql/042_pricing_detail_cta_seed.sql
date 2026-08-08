-- 042 — Paket liste CTA metni: liste Detay, detay sayfası Teklif al akışını kullanır.

SET NAMES utf8mb4;

UPDATE `pricing_plans_i18n`
SET `cta_label` = CASE WHEN `locale` = 'en' THEN 'View details' ELSE 'Detay' END,
    `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` IN ('tr', 'en');
