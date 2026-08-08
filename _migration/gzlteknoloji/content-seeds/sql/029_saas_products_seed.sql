-- =============================================================
-- 029 — SaaS products seed
-- Scope: GeoSerra, Sozial, KatalogAI, Invitea, Scraper API.
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `categories`
  (`id`, `module_key`, `icon`, `is_active`, `is_featured`, `display_order`)
VALUES
  ('30000000-0000-4000-8000-000000000001', 'products', 'Boxes', 1, 1, 1)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `category_i18n`
  (`category_id`, `locale`, `name`, `slug`, `description`, `meta_title`, `meta_description`)
VALUES
  ('30000000-0000-4000-8000-000000000001', 'tr', 'SaaS Ürünleri', 'saas-urunleri', 'GZL Teknoloji tarafından geliştirilen demo ve başvuru odaklı SaaS ürünleri.', 'SaaS Ürünleri | GZL Teknoloji', 'GeoSerra, Sozial, KatalogAI, Invitea ve Scraper API ürünlerini inceleyin.'),
  ('30000000-0000-4000-8000-000000000001', 'en', 'SaaS Products', 'saas-products', 'Demo and request-driven SaaS products developed by GZL Technology.', 'SaaS Products | GZL Technology', 'Explore GeoSerra, Sozial, KatalogAI, Invitea and Scraper API.')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `sub_categories`
  (`id`, `category_id`, `icon`, `is_active`, `is_featured`, `display_order`)
VALUES
  ('30000000-0000-4000-8000-000000000101', '30000000-0000-4000-8000-000000000001', 'Sparkles', 1, 1, 1)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `sub_category_i18n`
  (`sub_category_id`, `locale`, `name`, `slug`, `description`)
VALUES
  ('30000000-0000-4000-8000-000000000101', 'tr', 'Dijital Platformlar', 'dijital-platformlar', 'AI, otomasyon, katalog ve scraping odaklı platformlar.'),
  ('30000000-0000-4000-8000-000000000101', 'en', 'Digital Platforms', 'digital-platforms', 'AI, automation, catalog and scraping focused platforms.')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `products`
  (`id`, `item_type`, `product_kind`, `demo_url`, `docs_url`, `status`, `pricing_model`, `category_id`, `sub_category_id`, `price`, `image_url`, `images`, `is_active`, `is_featured`, `order_num`, `product_code`, `stock_quantity`)
VALUES
  ('30000000-0000-4000-8000-000000000201', 'product', 'saas', 'https://geoserra.gzltek.tech', NULL, 'beta', 'subscription', '30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000101', 0.00, '/assets/imgs/work/projects/geoserra.png', JSON_ARRAY('/assets/imgs/work/projects/geoserra.png'), 1, 1, 1, 'GEOSERRA', 0),
  ('30000000-0000-4000-8000-000000000202', 'product', 'saas', 'https://sozial.gzltek.tech', NULL, 'beta', 'subscription', '30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000101', 0.00, '/assets/imgs/work/projects/sozial.png', JSON_ARRAY('/assets/imgs/work/projects/sozial.png'), 1, 1, 2, 'SOZIAL', 0),
  ('30000000-0000-4000-8000-000000000203', 'product', 'saas', 'https://katalogai.gzltek.tech', NULL, 'coming_soon', 'subscription', '30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000101', 0.00, '/assets/imgs/work/projects/katalogai.png', JSON_ARRAY('/assets/imgs/work/projects/katalogai.png'), 1, 0, 3, 'KATALOGAI', 0),
  ('30000000-0000-4000-8000-000000000204', 'product', 'saas', 'https://invitea.gzltek.tech', NULL, 'coming_soon', 'subscription', '30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000101', 0.00, '/assets/imgs/work/projects/invitea.png', JSON_ARRAY('/assets/imgs/work/projects/invitea.png'), 1, 0, 4, 'INVITEA', 0),
  ('30000000-0000-4000-8000-000000000205', 'product', 'api', 'https://scraper.gzltek.tech', NULL, 'beta', 'usage', '30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000101', 0.00, '/assets/imgs/work/projects/scraper-api.png', JSON_ARRAY('/assets/imgs/work/projects/scraper-api.png'), 1, 0, 5, 'SCRAPER-API', 0),
  ('30000000-0000-4000-8000-000000000206', 'product', 'saas', 'https://marketpulse.gzltek.tech', NULL, 'beta', 'subscription', '30000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000101', 0.00, NULL, JSON_ARRAY(), 1, 1, 6, 'MARKETPULSE', 0)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `product_i18n`
  (`product_id`, `locale`, `title`, `slug`, `description`, `alt`, `tags`, `specifications`, `meta_title`, `meta_description`)
VALUES
  ('30000000-0000-4000-8000-000000000201', 'tr', 'GeoSerra', 'geoserra', 'AI aramalarında görünürlük, GEO + SEO denetimi, llms.txt, JSON-LD ve Lighthouse raporlamasını tek panelde sunan analiz platformu.', 'GeoSerra GEO ve SEO platformu', JSON_ARRAY('GEO','SEO','AI Search','Lighthouse'), JSON_OBJECT('demo_url','https://geoserra.gzltek.tech','cta','Demo iste'), 'GeoSerra | GZL Teknoloji', 'AI aramaları için GEO + SEO analiz platformu.'),
  ('30000000-0000-4000-8000-000000000201', 'en', 'GeoSerra', 'geoserra', 'An analysis platform for AI-search visibility, GEO + SEO audits, llms.txt, JSON-LD and Lighthouse reporting.', 'GeoSerra GEO and SEO platform', JSON_ARRAY('GEO','SEO','AI Search','Lighthouse'), JSON_OBJECT('demo_url','https://geoserra.gzltek.tech','cta','Request demo'), 'GeoSerra | GZL Technology', 'GEO + SEO analysis platform for AI search.'),

  ('30000000-0000-4000-8000-000000000202', 'tr', 'Sozial', 'sozial', 'Çok markalı sosyal medya planlama, AI içerik taslağı, yayın takvimi ve performans takibini birleştiren otomasyon paneli.', 'Sozial sosyal medya SaaS', JSON_ARRAY('Social Media','Automation','AI Content'), JSON_OBJECT('demo_url','https://sozial.gzltek.tech','cta','Demo iste'), 'Sozial | GZL Teknoloji', 'Sosyal medya yönetim ve otomasyon SaaS platformu.'),
  ('30000000-0000-4000-8000-000000000202', 'en', 'Sozial', 'sozial', 'A multi-brand social media automation panel combining AI drafts, publishing calendar and performance tracking.', 'Sozial social media SaaS', JSON_ARRAY('Social Media','Automation','AI Content'), JSON_OBJECT('demo_url','https://sozial.gzltek.tech','cta','Request demo'), 'Sozial | GZL Technology', 'Social media management and automation SaaS platform.'),

  ('30000000-0000-4000-8000-000000000203', 'tr', 'KatalogAI', 'katalogai', 'Ürün kataloglarını AI destekli arama, filtreleme, teklif ve PDF çıktılarıyla yöneten katalog platformu.', 'KatalogAI katalog platformu', JSON_ARRAY('Catalog','AI Search','PDF','Quote'), JSON_OBJECT('demo_url','https://katalogai.gzltek.tech','cta','Demo iste'), 'KatalogAI | GZL Teknoloji', 'AI destekli katalog ve teklif platformu.'),
  ('30000000-0000-4000-8000-000000000203', 'en', 'KatalogAI', 'katalogai', 'Catalog platform with AI-assisted search, filtering, quote workflows and PDF outputs.', 'KatalogAI catalog platform', JSON_ARRAY('Catalog','AI Search','PDF','Quote'), JSON_OBJECT('demo_url','https://katalogai.gzltek.tech','cta','Request demo'), 'KatalogAI | GZL Technology', 'AI-assisted catalog and quotation platform.'),

  ('30000000-0000-4000-8000-000000000204', 'tr', 'Invitea', 'invitea', 'Etkinlik, davetiye ve RSVP süreçlerini dijital olarak yöneten, marka uyumlu davet platformu.', 'Invitea davetiye platformu', JSON_ARRAY('Invitation','RSVP','Events'), JSON_OBJECT('demo_url','https://invitea.gzltek.tech','cta','Demo iste'), 'Invitea | GZL Teknoloji', 'Dijital davetiye ve RSVP platformu.'),
  ('30000000-0000-4000-8000-000000000204', 'en', 'Invitea', 'invitea', 'Brandable digital invitation, event and RSVP management platform.', 'Invitea invitation platform', JSON_ARRAY('Invitation','RSVP','Events'), JSON_OBJECT('demo_url','https://invitea.gzltek.tech','cta','Request demo'), 'Invitea | GZL Technology', 'Digital invitation and RSVP platform.'),

  ('30000000-0000-4000-8000-000000000205', 'tr', 'Scraper API', 'scraper-api', 'Playwright tabanlı merkezi scraping API; dizin, fuar, rakip ve web sitesi analiz akışları için kullanılır.', 'Scraper API platformu', JSON_ARRAY('Scraping','Playwright','API','Automation'), JSON_OBJECT('demo_url','https://scraper.gzltek.tech','cta','Demo iste'), 'Scraper API | GZL Teknoloji', 'Merkezi scraping ve veri toplama API platformu.'),
  ('30000000-0000-4000-8000-000000000205', 'en', 'Scraper API', 'scraper-api', 'A Playwright-based central scraping API for directories, fairs, competitors and website analysis workflows.', 'Scraper API platform', JSON_ARRAY('Scraping','Playwright','API','Automation'), JSON_OBJECT('demo_url','https://scraper.gzltek.tech','cta','Request demo'), 'Scraper API | GZL Technology', 'Central scraping and data collection API platform.'),

  ('30000000-0000-4000-8000-000000000206', 'tr', 'MarketPulse', 'marketpulse', 'Lead, bayi ve rakip takibini pazarlama otomasyonu ve raporlama akışlarıyla birleştiren iş geliştirme platformu.', 'MarketPulse pazarlama otomasyonu platformu', JSON_ARRAY('CRM','Lead Generation','Competitor Monitoring','Automation'), JSON_OBJECT('demo_url','https://marketpulse.gzltek.tech','cta','Demo iste'), 'MarketPulse | GZL Teknoloji', 'Lead, bayi ve rakip takipli pazarlama otomasyonu platformu.'),
  ('30000000-0000-4000-8000-000000000206', 'en', 'MarketPulse', 'marketpulse', 'A business development platform combining lead, dealer and competitor monitoring with marketing automation and reporting.', 'MarketPulse marketing automation platform', JSON_ARRAY('CRM','Lead Generation','Competitor Monitoring','Automation'), JSON_OBJECT('demo_url','https://marketpulse.gzltek.tech','cta','Request demo'), 'MarketPulse | GZL Technology', 'Marketing automation platform for lead, dealer and competitor monitoring.')
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `product_specs`
  (`id`, `product_id`, `locale`, `name`, `value`, `category`, `order_num`)
VALUES
  ('30000000-0000-4000-8000-000000001201', '30000000-0000-4000-8000-000000000201', 'tr', 'Demo URL', 'https://geoserra.gzltek.tech', 'service', 1),
  ('30000000-0000-4000-8000-000000001202', '30000000-0000-4000-8000-000000000202', 'tr', 'Demo URL', 'https://sozial.gzltek.tech', 'service', 1),
  ('30000000-0000-4000-8000-000000001203', '30000000-0000-4000-8000-000000000203', 'tr', 'Demo URL', 'https://katalogai.gzltek.tech', 'service', 1),
  ('30000000-0000-4000-8000-000000001204', '30000000-0000-4000-8000-000000000204', 'tr', 'Demo URL', 'https://invitea.gzltek.tech', 'service', 1),
  ('30000000-0000-4000-8000-000000001205', '30000000-0000-4000-8000-000000000205', 'tr', 'Demo URL', 'https://scraper.gzltek.tech', 'service', 1),
  ('30000000-0000-4000-8000-000000001206', '30000000-0000-4000-8000-000000000206', 'tr', 'Demo URL', 'https://marketpulse.gzltek.tech', 'service', 1)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `product_faqs`
  (`id`, `product_id`, `locale`, `question`, `answer`, `display_order`, `is_active`)
VALUES
  ('30000000-0000-4000-8000-000000002201', '30000000-0000-4000-8000-000000000201', 'tr', 'Demo nasıl istenir?', 'Ürün detay sayfasındaki demo iste formu veya teklif formu ile ihtiyacınızı iletebilirsiniz.', 1, 1),
  ('30000000-0000-4000-8000-000000002202', '30000000-0000-4000-8000-000000000202', 'tr', 'Platform hangi hesapları destekler?', 'Kapsam proje bazında netleşir; Instagram, Facebook, LinkedIn, X ve YouTube akışları için hazırlık yapılabilir.', 1, 1),
  ('30000000-0000-4000-8000-000000002203', '30000000-0000-4000-8000-000000000205', 'tr', 'Scraping API hangi kaynakları destekler?', 'Dizin, fuar, rakip site ve hedef web sayfaları için özel profil geliştirilebilir.', 1, 1),
  ('30000000-0000-4000-8000-000000002204', '30000000-0000-4000-8000-000000000206', 'tr', 'MarketPulse hangi ekipler içindir?', 'Satış, pazarlama ve iş geliştirme ekipleri lead, bayi ve rakip takibini tek panelde yönetebilir.', 1, 1),
  ('30000000-0000-4000-8000-000000002205', '30000000-0000-4000-8000-000000000206', 'en', 'Who is MarketPulse for?', 'Sales, marketing and business development teams can manage lead, dealer and competitor monitoring in one panel.', 1, 1)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP(3);
