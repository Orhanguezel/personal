-- =============================================================
-- @generated migrate-gzlteknoloji-content
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/040_service_content_polish_seed.sql
-- Gerekce : Hizmet metni cilalama (service_packages deyimleri dusurulur)
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- 040 — Hizmet liste/detay metin düzenlemeleri
-- Başlıkları normalize eder; öne çıkan lead/rakip takip hizmetine yapılandırılmış TR/EN içerik ekler.

SET NAMES utf8mb4;

UPDATE `services_i18n`
SET `name` = CONCAT(UPPER(LEFT(TRIM(`name`), 1)), SUBSTRING(TRIM(`name`), 2)),
    `image_alt` = CONCAT(UPPER(LEFT(TRIM(`image_alt`), 1)), SUBSTRING(TRIM(`image_alt`), 2))
WHERE `name` IS NOT NULL AND TRIM(`name`) <> '';

UPDATE `services_i18n`
SET `meta_title` = CONCAT(`name`, IF(`locale` = 'en', ' | GZL Technology', ' | GZL Teknoloji'))
WHERE `name` IS NOT NULL AND TRIM(`name`) <> '';

UPDATE `services_i18n`
SET
  `name` = 'Firmanıza Özel Lead Bulma ve Rakip Takip Paneli',
  `summary` = 'Potansiyel müşterileri bulun, rakip ve pazar sinyallerini izleyin; satış sürecinizi firmanıza özel tek bir B2B panelden yönetin.',
  `content` = JSON_OBJECT(
    'source', 'gzl_editorial',
    'overview', 'Firmanıza özel geliştirilen bu platform; potansiyel müşteri bulma, ideal müşteri profili puanlama, rakip takibi ve satış fırsatlarını tek merkezde toplar. Sistem sektörünüze, hedef pazarınıza ve mevcut iş akışınıza göre yapılandırılır.',
    'sections', JSON_ARRAY(
      JSON_OBJECT(
        'title', 'Neler Sunuyoruz?',
        'items', JSON_ARRAY(
          'Amazon satıcıları, B2B dizinleri, Google Maps ve fuar katılımcılarından potansiyel müşteri üretimi',
          'İdeal müşteri profili (ICP) eşleştirmesi ve 0–100 arası fırsat puanlama',
          'Yeni, görüşmede, teklif ve kazanıldı aşamalarını içeren satış pipeline paneli',
          'Rakip web sitesi, fiyat ve pazar hareketleri için otomatik sinyal takibi',
          'Karar verici iletişim bilgisi zenginleştirme ve yapay zekâ destekli erişim taslakları',
          'Haftalık PDF raporları ve e-posta bildirimleri'
        )
      ),
      JSON_OBJECT(
        'title', 'Nasıl İlerliyoruz?',
        'items', JSON_ARRAY(
          'Hedef sektör, pazar ve ideal müşteri profilini birlikte netleştiriyoruz.',
          'Demo panel üzerinden veri kaynaklarını ve kapsamı onaylıyoruz.',
          'Paneli, otomasyonları ve gerekli entegrasyonları geliştiriyoruz.',
          'Test, kısa eğitim ve canlıya alma süreciyle teslim ediyoruz.'
        )
      ),
      JSON_OBJECT(
        'title', 'Teknik Altyapı',
        'body', 'Next.js, React, TypeScript, Fastify, MySQL, Python scraper servisleri ve Docker tabanlı bağımsız kurulum. Verileriniz size özel ortamda tutulur.'
      )
    )
  ),
  `image_alt` = 'Firmanıza özel lead bulma ve rakip takip paneli',
  `meta_title` = 'Lead Bulma ve Rakip Takip Paneli | GZL Teknoloji',
  `meta_description` = 'B2B lead bulma, ICP puanlama, rakip ve pazar takibi ile satış pipeline süreçlerini tek panelde yönetin.'
WHERE `service_id` = '10000000-0000-4000-8000-0001861468' AND `locale` = 'tr';

UPDATE `services_i18n`
SET
  `name` = 'Custom Lead Generation and Competitor Monitoring Dashboard',
  `summary` = 'Find qualified prospects, monitor competitor and market signals, and manage your sales pipeline from one custom B2B dashboard.',
  `content` = JSON_OBJECT(
    'source', 'gzl_editorial',
    'overview', 'This custom platform brings prospect discovery, ideal customer profile scoring, competitor monitoring and sales opportunities into one workspace. It is configured around your industry, target market and existing workflow.',
    'sections', JSON_ARRAY(
      JSON_OBJECT(
        'title', 'What We Deliver',
        'items', JSON_ARRAY(
          'Prospect generation from Amazon sellers, B2B directories, Google Maps and trade-fair exhibitor lists',
          'Ideal customer profile matching and opportunity scoring from 0 to 100',
          'A sales pipeline covering new, contacted, quoted and won stages',
          'Automated signals for competitor websites, pricing and market activity',
          'Decision-maker contact enrichment and AI-assisted outreach drafts',
          'Weekly PDF reports and email notifications'
        )
      ),
      JSON_OBJECT(
        'title', 'How We Work',
        'items', JSON_ARRAY(
          'We define your target industry, market and ideal customer profile.',
          'We confirm data sources and scope through a demo dashboard.',
          'We build the dashboard, automations and required integrations.',
          'We complete testing, training and production launch.'
        )
      ),
      JSON_OBJECT(
        'title', 'Technical Foundation',
        'body', 'An independent deployment built with Next.js, React, TypeScript, Fastify, MySQL, Python scraper services and Docker. Your data remains in your dedicated environment.'
      )
    )
  ),
  `image_alt` = 'Custom lead generation and competitor monitoring dashboard',
  `meta_title` = 'Lead Generation and Competitor Monitoring | GZL Technology',
  `meta_description` = 'Manage B2B prospecting, ICP scoring, competitor monitoring and your sales pipeline from one custom dashboard.'
WHERE `service_id` = '10000000-0000-4000-8000-0001861468' AND `locale` = 'en';
