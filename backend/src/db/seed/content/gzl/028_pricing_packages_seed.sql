-- =============================================================
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/028_pricing_packages_seed.sql
-- Gerekce : Fiyatlandirma planlari (plan madde 3)
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- =============================================================
-- 028 — paket fiyatlandirma seed'i
-- Kapsam: e-ticaret paketleri, sosyal medya yonetimi, bakim planlari.
--
-- FIYAT DAYANAGI (2026-07-09):
--   * E-ticaret kurulum bedelleri Bionluk "modern e-ticaret siteleri gelistiririm"
--     ilanindaki paket fiyatlariyla BIREBIR ayni: 10.000 / 30.000 / 50.000 TL.
--   * Sosyal medya kurulum bedeli Bionluk "sosyal medya otomasyon paneli" ilanindan
--     (15.000 TL baslangic paketi) alinmistir.
--   * AYLIK bedeller (bakim ve sosyal medya yonetimi) Bionluk'ta KARSILIGI YOKTUR —
--     Bionluk ilanlarinin tamami tek seferlik istir. Bu aylik rakamlar oneridir.
--   * Bionluk fiyatlari platform komisyonu dahildir; burada parite korunmustur
--     (dogrudan kanalda ayni liste fiyati, kendi ilanimizin altini oymamak icin).
--   Detay: docs/HIZMET_FIYAT_MATRISI.md
--
-- NOT: `price_unit` frontend'de HENUZ RENDER EDILMIYOR (formatMoney yalnizca tutari
-- basar). Bu yuzden kurulum/aylik ayrimi title, description ve features metinlerinde
-- ACIKCA yazilmistir. price_unit render'i eklenince metinler sadelestirilebilir.
--
-- price_amount semantigi:
--   setup_monthly -> tutar KURULUM bedelidir; aylik bakim features icinde yazilidir.
--   month         -> tutar AYLIK bedeldir.
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `pricing_plans`
  (`id`, `code`, `price_amount`, `price_unit`, `currency`, `is_active`, `is_featured`, `display_order`, `cta_href`, `created_at`, `updated_at`)
VALUES
  ('20000000-0000-4000-8000-000000000001', 'eticaret-baslangic', 10000.00, 'setup_monthly', 'TRY', 1, 0, 1, '/teklif-al?paket=eticaret-baslangic', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000002', 'eticaret-profesyonel', 30000.00, 'setup_monthly', 'TRY', 1, 1, 2, '/teklif-al?paket=eticaret-profesyonel', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000003', 'eticaret-kurumsal', 50000.00, 'setup_monthly', 'TRY', 1, 0, 3, '/teklif-al?paket=eticaret-kurumsal', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000004', 'sosyal-medya-baslangic', 4500.00, 'month', 'TRY', 1, 0, 10, '/teklif-al?paket=sosyal-medya-baslangic', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000005', 'sosyal-medya-buyume', 7500.00, 'month', 'TRY', 1, 1, 11, '/teklif-al?paket=sosyal-medya-buyume', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000006', 'sosyal-medya-pro', 12500.00, 'month', 'TRY', 1, 0, 12, '/teklif-al?paket=sosyal-medya-pro', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000007', 'bakim-destek-temel', 1500.00, 'month', 'TRY', 1, 0, 20, '/teklif-al?paket=bakim-destek-temel', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000000-0000-4000-8000-000000000008', 'bakim-destek-pro', 3500.00, 'month', 'TRY', 1, 0, 21, '/teklif-al?paket=bakim-destek-pro', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `price_amount` = VALUES(`price_amount`),
  `price_unit`   = VALUES(`price_unit`),
  `currency`     = VALUES(`currency`),
  `is_featured`  = VALUES(`is_featured`),
  `updated_at`   = CURRENT_TIMESTAMP(3);

INSERT INTO `pricing_plans_i18n`
  (`id`, `plan_id`, `locale`, `badge`, `title`, `description`, `features`, `cta_label`, `cta_href`, `created_at`, `updated_at`)
VALUES
  ('20000001-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'tr', 'Paket E-Ticaret', 'Başlangıç E-Ticaret', 'Katalog, sepet ve temel admin paneli ile hızlı e-ticaret kurulumu. Fiyat tek seferlik kurulum bedelidir.', '["Kurulum: 10.000 ₺ (tek seferlik)","Aylık bakım: 1.500 ₺","Ürün kataloğu","Sepet akışı","Temel admin panel","SEO uyumlu sayfalar"]', 'Teklif al', '/teklif-al?paket=eticaret-baslangic', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001', 'en', 'E-Commerce Package', 'Starter E-Commerce', 'Fast e-commerce setup with catalog, cart and basic admin panel. The price shown is the one-off setup fee.', '["Setup: ₺10,000 (one-off)","Monthly care: ₺1,500","Product catalog","Cart flow","Basic admin panel","SEO-ready pages"]', 'Request quote', '/en/quote?package=eticaret-baslangic', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'tr', 'Paket E-Ticaret', 'Profesyonel E-Ticaret', 'Kupon, varyant, çoklu dil ve raporlama ihtiyacı olan işletmeler için. Fiyat tek seferlik kurulum bedelidir.', '["Kurulum: 30.000 ₺ (tek seferlik)","Aylık bakım: 2.500 ₺","Ürün varyantları","Kupon ve kampanya","Çok dilli vitrin","Sipariş raporları"]', 'Teklif al', '/teklif-al?paket=eticaret-profesyonel', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000002', '20000000-0000-4000-8000-000000000002', 'en', 'E-Commerce Package', 'Professional E-Commerce', 'For businesses that need coupons, variants, multilingual storefront and reports. The price shown is the one-off setup fee.', '["Setup: ₺30,000 (one-off)","Monthly care: ₺2,500","Product variants","Coupons and campaigns","Multilingual storefront","Order reports"]', 'Request quote', '/en/quote?package=eticaret-profesyonel', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'tr', 'Paket E-Ticaret', 'Kurumsal E-Ticaret', 'Çok şubeli, entegrasyonlu ve özel akışlı e-ticaret projeleri için. Fiyat tek seferlik kurulum bedelidir.', '["Kurulum: 50.000 ₺ (tek seferlik)","Aylık bakım: 4.000 ₺","Çok şube desteği","ERP/CRM entegrasyon hazırlığı","Gelişmiş raporlar","Özel iş akışları","Öncelikli destek"]', 'Teklif al', '/teklif-al?paket=eticaret-kurumsal', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000003', '20000000-0000-4000-8000-000000000003', 'en', 'E-Commerce Package', 'Enterprise E-Commerce', 'For multi-branch, integration-ready and custom e-commerce workflows. The price shown is the one-off setup fee.', '["Setup: ₺50,000 (one-off)","Monthly care: ₺4,000","Multi-branch support","ERP/CRM integration readiness","Advanced reports","Custom workflows","Priority support"]', 'Request quote', '/en/quote?package=eticaret-kurumsal', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'tr', 'Sosyal Medya', 'Sosyal Medya Başlangıç', 'Tek marka için düzenli içerik planlama ve yayın takibi. Fiyat aylık yönetim bedelidir.', '["Aylık yönetim: 4.500 ₺","Panel kurulumu: 15.000 ₺ (tek seferlik)","Aylık içerik takvimi","Temel görsel/metin planlama","Instagram/Facebook odağı","Aylık rapor"]', 'Başvuru yap', '/teklif-al?paket=sosyal-medya-baslangic', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000004', '20000000-0000-4000-8000-000000000004', 'en', 'Social Media', 'Social Media Starter', 'Regular content planning and publishing follow-up for one brand. The price shown is the monthly management fee.', '["Monthly management: ₺4,500","Panel setup: ₺15,000 (one-off)","Monthly content calendar","Basic visual/copy planning","Instagram/Facebook focus","Monthly report"]', 'Apply', '/en/quote?package=sosyal-medya-baslangic', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', 'tr', 'Sosyal Medya', 'Sosyal Medya Büyüme', 'Çok kanallı yayın, analiz ve reklam hazırlığı için büyüme paketi. Fiyat aylık yönetim bedelidir.', '["Aylık yönetim: 7.500 ₺","Panel kurulumu: 25.000 ₺ (tek seferlik)","Çoklu platform planlama","AI destekli içerik taslakları","Performans analizi","Reklam kampanya hazırlığı"]', 'Başvuru yap', '/teklif-al?paket=sosyal-medya-buyume', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000005', '20000000-0000-4000-8000-000000000005', 'en', 'Social Media', 'Social Media Growth', 'Growth package for multi-channel publishing, analytics and ad readiness. The price shown is the monthly management fee.', '["Monthly management: ₺7,500","Panel setup: ₺25,000 (one-off)","Multi-platform planning","AI-assisted content drafts","Performance analysis","Ad campaign readiness"]', 'Apply', '/en/quote?package=sosyal-medya-buyume', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000006', 'tr', 'Sosyal Medya', 'Sosyal Medya Pro', 'Çok marka, rol yönetimi ve otomasyon odaklı profesyonel paket. Fiyat aylık yönetim bedelidir.', '["Aylık yönetim: 12.500 ₺","Panel kurulumu: 45.000 ₺ (tek seferlik)","Çok marka yönetimi","Rol bazlı iş akışı","GA4/Ads entegrasyon hazırlığı","Otomasyon paneli"]', 'Başvuru yap', '/teklif-al?paket=sosyal-medya-pro', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000006', '20000000-0000-4000-8000-000000000006', 'en', 'Social Media', 'Social Media Pro', 'Professional plan focused on multi-brand workflows and automation. The price shown is the monthly management fee.', '["Monthly management: ₺12,500","Panel setup: ₺45,000 (one-off)","Multi-brand management","Role-based workflow","GA4/Ads integration readiness","Automation panel"]', 'Apply', '/en/quote?package=sosyal-medya-pro', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000007', 'tr', 'Bakım', 'Bakım Destek Temel', 'Canlı siteler için güvenlik, yedek ve küçük düzeltme desteği. Fiyat aylık bedeldir.', '["Aylık: 1.500 ₺","Aylık teknik kontrol","Yedek ve güncelleme takibi","Küçük içerik düzeltmeleri","E-posta destek"]', 'Teklif al', '/teklif-al?paket=bakim-destek-temel', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000007', '20000000-0000-4000-8000-000000000007', 'en', 'Care', 'Basic Care Support', 'Security, backup and small-fix support for live websites. The price shown is the monthly fee.', '["Monthly: ₺1,500","Monthly technical check","Backup and update tracking","Small content fixes","Email support"]', 'Request quote', '/en/quote?package=bakim-destek-temel', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),

  ('20000001-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000008', 'tr', 'Bakım', 'Bakım Destek Pro', 'Aktif geliştirme, performans izleme ve öncelikli destek paketi. Fiyat aylık bedeldir.', '["Aylık: 3.500 ₺","Aylık 4 saat geliştirme","Performans izleme","Öncelikli destek","SEO/GEO teknik takip"]', 'Teklif al', '/teklif-al?paket=bakim-destek-pro', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
  ('20000002-0000-4000-8000-000000000008', '20000000-0000-4000-8000-000000000008', 'en', 'Care', 'Pro Care Support', 'Active development, performance monitoring and priority support package. The price shown is the monthly fee.', '["Monthly: ₺3,500","4 development hours per month","Performance monitoring","Priority support","SEO/GEO technical tracking"]', 'Request quote', '/en/quote?package=bakim-destek-pro', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))
ON DUPLICATE KEY UPDATE
  `badge`       = VALUES(`badge`),
  `title`       = VALUES(`title`),
  `description` = VALUES(`description`),
  `features`    = VALUES(`features`),
  `cta_label`   = VALUES(`cta_label`),
  `cta_href`    = VALUES(`cta_href`),
  `updated_at`  = CURRENT_TIMESTAMP(3);
