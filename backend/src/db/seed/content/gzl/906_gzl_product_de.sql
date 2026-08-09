-- =============================================================
-- FILE: content/gzl/906_gzl_product_de.sql
-- ELLE YAZILDI. SaaS urunlerinin ALMANCA cevirileri.
--
-- NEDEN AYRI DOSYA:
--   Ortak products modulu (packages/shared-backend/modules/products) i18n'i
--   `innerJoin(product_i18n) + eq(locale, istenen)` ile cozer — yani hizmet ve
--   projelerdeki gibi COALESCE FALLBACK'I YOKTUR. DE satiri olmayan urunler
--   listeye HIC girmiyordu: /de/produkte sayfasi 0 urun gosteriyordu
--   (EN'de 6 urun goruluyordu). Ortak modulu degistirmek diger projeleri
--   etkileyecegi icin dogru cozum eksik cevirileri yazmak.
--
-- Kaynak: mevcut tr/en satirlari (029_saas_products_seed).
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `product_i18n`
  (`product_id`, `locale`, `title`, `slug`, `description`, `alt`, `tags`, `specifications`, `meta_title`, `meta_description`)
VALUES
  ('30000000-0000-4000-8000-000000000201', 'de', 'GeoSerra', 'geoserra',
   'Analyseplattform für Sichtbarkeit in KI-Suchen: GEO- und SEO-Audits, llms.txt, JSON-LD und Lighthouse-Reporting in einem Panel.',
   'GeoSerra GEO- und SEO-Plattform',
   JSON_ARRAY('GEO','SEO','AI Search','Lighthouse'),
   JSON_OBJECT('demo_url','https://geoserra.gzltek.tech','cta','Demo anfragen'),
   'GeoSerra | GZL Technologie',
   'GEO- und SEO-Analyseplattform für KI-gestützte Suche.'),

  ('30000000-0000-4000-8000-000000000202', 'de', 'Sozial', 'sozial',
   'Automatisierungspanel für Social Media über mehrere Marken: KI-Entwürfe, Redaktionskalender und Performance-Tracking.',
   'Sozial Social-Media-SaaS',
   JSON_ARRAY('Social Media','Automation','AI Content'),
   JSON_OBJECT('demo_url','https://sozial.gzltek.tech','cta','Demo anfragen'),
   'Sozial | GZL Technologie',
   'SaaS-Plattform für Social-Media-Management und -Automatisierung.'),

  ('30000000-0000-4000-8000-000000000203', 'de', 'KatalogAI', 'katalogai',
   'Katalogplattform mit KI-gestützter Suche, Filterung, Angebotsprozessen und PDF-Ausgabe.',
   'KatalogAI Katalogplattform',
   JSON_ARRAY('Catalog','AI Search','PDF','Quote'),
   JSON_OBJECT('demo_url','https://katalogai.gzltek.tech','cta','Demo anfragen'),
   'KatalogAI | GZL Technologie',
   'KI-gestützte Katalog- und Angebotsplattform.'),

  ('30000000-0000-4000-8000-000000000204', 'de', 'Invitea', 'invitea',
   'Plattform für digitale Einladungen, Veranstaltungen und RSVP-Verwaltung — individuell auf die Marke anpassbar.',
   'Invitea Einladungsplattform',
   JSON_ARRAY('Events','Invitation','RSVP'),
   JSON_OBJECT('demo_url','https://invitea.gzltek.tech','cta','Demo anfragen'),
   'Invitea | GZL Technologie',
   'Digitale Einladungen, Veranstaltungen und RSVP-Verwaltung.'),

  ('30000000-0000-4000-8000-000000000205', 'de', 'Scraper API', 'scraper-api',
   'Zentrale Scraping-API auf Playwright-Basis für Verzeichnisse, Messen, Wettbewerber und Website-Analysen.',
   'Scraper API Datenerfassung',
   JSON_ARRAY('Scraping','Playwright','API','Data'),
   JSON_OBJECT('demo_url','https://scraper.gzltek.tech','cta','Demo anfragen'),
   'Scraper API | GZL Technologie',
   'Playwright-basierte zentrale Scraping- und Datenerfassungs-API.'),

  ('30000000-0000-4000-8000-000000000206', 'de', 'MarketPulse', 'marketpulse',
   'Plattform für Geschäftsentwicklung: Lead-, Händler- und Wettbewerbsbeobachtung zusammen mit Marketing-Automatisierung und Reporting.',
   'MarketPulse Markt- und Wettbewerbsbeobachtung',
   JSON_ARRAY('Lead Generation','Market Monitoring','Automation'),
   JSON_OBJECT('demo_url','https://marketpulse.gzltek.tech','cta','Demo anfragen'),
   'MarketPulse | GZL Technologie',
   'Lead-, Händler- und Wettbewerbsbeobachtung mit Marketing-Automatisierung.')
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `alt` = VALUES(`alt`),
  `tags` = VALUES(`tags`),
  `specifications` = VALUES(`specifications`),
  `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`),
  `updated_at` = CURRENT_TIMESTAMP(3);
