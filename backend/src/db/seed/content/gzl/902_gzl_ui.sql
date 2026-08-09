-- =============================================================
-- FILE: content/gzl/902_gzl_ui.sql
-- ELLE YAZILDI (uretici script bu dosyaya dokunmaz).
--
-- GZL Teknoloji ARAYUZ/MARKA icerigi — tr/en/de icin AYRI.
-- Kaynak metin: icerik/hakkimizda.tr.md + icerik/hakkimizda.en.md
--
-- NEDEN VAR:
--   Istemci bilesenleri (SiteLogo, OffCanvas, Contact, Hero) marka verisini
--   `/ui/<locale>.json` uzerinden okur; o dosyalar da site_settings'ten
--   uretilir (frontend/scripts/generate-ui-settings.mjs).
--   Bu anahtarlar GZL veritabaninda YOKTU, dolayisiyla gzlteknoloji.com
--   Guezel Web Design'in degerlerini gosteriyordu: GWD logosu, Alman telefon
--   numarasi, "Grevenbroich merkezli ... ben Orhan Guzel" hero metni.
--
-- SAYILAR: hakkimizda.md'deki dogrulanabilir degerler kullanildi
--   (15 yil muhendislik, 21 tamamlanmis proje, 16 Bionluk siparisi, 4,50/5).
--   Sablondan gelen "250 proje / 680 musteri / 18 odul" gibi sisirilmis
--   degerler BILEREK kullanilmadi.
--
-- ESCAPE NOTU: MySQL tek tirnakli dizgede TERS BOLU de kacis karakteridir.
-- JSON icindeki \\" ifadeleri, dosya uretilirken ikilenmezse kayit sirasinda
-- " olur ve deger GECERSIZ JSON olarak saklanir. (Bu hata bir kez yapildi:
-- ui_home bozuk kaydedildi, hero metni istemcide cozulemedi.)
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('4735bd39-46a8-5863-b251-b7bd711b38a4', 'contact_info', '*', '{"companyName": "GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.", "phone": "", "email": "info@gzlteknoloji.com", "address": "Gemlik / Bursa", "website": "https://gzlteknoloji.com"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('cd192947-172a-5126-80df-d0babbeb6022', 'ui_home', 'tr', '{"home1": {"greeting": "Merhaba, biz GZL Teknoloji", "title_html": "GZL Teknoloji — <span class=\\"text-primary-1\\">Yazılım ve Dijital Çözümler</span>", "description": "Gemlik/Bursa merkezli yazılım ve dijital danışmanlık şirketiyiz. Özel yazılım, kurumsal web ve e-ticaret, iş süreçleri otomasyonu, yapay zekâ entegrasyonu ve GEO/SEO danışmanlığı sunuyoruz.", "cta_primary": "Teklif alın", "cta_secondary": "Projelerimiz", "experience_label": "21 tamamlanmış proje", "hero_image": "/uploads/site-media/logo_transparent.png", "hero_image_alt": "GZL Teknoloji"}, "home2": {"greeting": "Merhaba, biz GZL Teknoloji", "title_html": "<span class=\\"text-linear-4\\">GZL</span> Teknoloji<span class=\\"flicker\\">_</span>", "description_html": "<p>Kurumsal web sitesi ve e-ticaretten ERP, CRM ve otomasyon panellerine kadar üretime hazır sistemler geliştiriyoruz. Proje kod tesliminde değil, sunucuda sorunsuz çalıştığında biter.</p>"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('da947f2c-e953-54a1-b2c0-0168690cc948', 'contact_section', 'tr', '{"headline": "İletişime geçin", "intro": "Projenizi konuşalım. Kapsam, teslim süresi ve fiyat yazılı olarak netleşsin.", "marquee": "gzlteknoloji", "cards": {"phone_label": "Telefon", "email_label": "E-posta", "skype_label": "Skype", "address_label": "Adres"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('ae6008f8-ec5f-58ed-a0a8-5f35d7e12230', 'ui_static', 'tr', '{"static1": {"items": [{"value": 15, "prefix": "+", "label_top": "Yıl", "label_bottom": "Mühendislik deneyimi"}, {"value": 21, "prefix": "", "label_top": "Tamamlanmış", "label_bottom": "Proje"}, {"value": 16, "prefix": "", "label_top": "Bionluk", "label_bottom": "Siparişi"}, {"value": 4.5, "prefix": "", "label_top": "Değerlendirme", "label_bottom": "Puanı"}]}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('28336ca4-0532-54f1-96ec-daa0a6a67510', 'ui_home', 'en', '{"home1": {"greeting": "Hello, we are GZL Technology", "title_html": "GZL Technology — <span class=\\"text-primary-1\\">Software and Digital Solutions</span>", "description": "A software and digital consultancy company based in Gemlik/Bursa, Türkiye. We deliver custom software, corporate web and e-commerce, business process automation, AI integration and GEO/SEO consultancy.", "cta_primary": "Request a quote", "cta_secondary": "Our work", "experience_label": "21 completed projects", "hero_image": "/uploads/site-media/logo_transparent.png", "hero_image_alt": "GZL Technology"}, "home2": {"greeting": "Hello, we are GZL Technology", "title_html": "<span class=\\"text-linear-4\\">GZL</span> Technology<span class=\\"flicker\\">_</span>", "description_html": "<p>From corporate websites and e-commerce to ERP, CRM and automation panels, we build production-ready systems. A project is not done when the code ships — it is done when it runs reliably in production.</p>"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('a66da43a-75e2-5460-ae98-6d83d16d3fb1', 'contact_section', 'en', '{"headline": "Get in touch", "intro": "Let us talk about your project. Scope, delivery time and price agreed in writing.", "marquee": "gzlteknoloji", "cards": {"phone_label": "Phone", "email_label": "Email", "skype_label": "Skype", "address_label": "Address"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('d6dc0060-3a6f-59e5-8a66-4bb3a0d88d15', 'ui_static', 'en', '{"static1": {"items": [{"value": 15, "prefix": "+", "label_top": "Years", "label_bottom": "Engineering experience"}, {"value": 21, "prefix": "", "label_top": "Completed", "label_bottom": "Projects"}, {"value": 16, "prefix": "", "label_top": "Bionluk", "label_bottom": "Orders"}, {"value": 4.5, "prefix": "", "label_top": "Rating", "label_bottom": "Score"}]}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('cb9750d3-b665-5ae9-95e2-40f5ed4f2b78', 'ui_home', 'de', '{"home1": {"greeting": "Hallo, wir sind GZL Technologie", "title_html": "GZL Technologie — <span class=\\"text-primary-1\\">Software und digitale Lösungen</span>", "description": "Software- und Digitalberatung mit Sitz in Gemlik/Bursa, Türkei. Wir liefern individuelle Software, Unternehmenswebsites und E-Commerce, Prozessautomatisierung, KI-Integration sowie GEO/SEO-Beratung.", "cta_primary": "Angebot anfordern", "cta_secondary": "Unsere Projekte", "experience_label": "21 abgeschlossene Projekte", "hero_image": "/uploads/site-media/logo_transparent.png", "hero_image_alt": "GZL Technologie"}, "home2": {"greeting": "Hallo, wir sind GZL Technologie", "title_html": "<span class=\\"text-linear-4\\">GZL</span> Technologie<span class=\\"flicker\\">_</span>", "description_html": "<p>Von Unternehmenswebsites und E-Commerce bis zu ERP-, CRM- und Automatisierungspanels bauen wir produktionsreife Systeme. Ein Projekt endet nicht mit der Codeübergabe, sondern wenn es im Betrieb zuverlässig läuft.</p>"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('d3469d8a-51e7-5f80-8be5-09b073c35886', 'contact_section', 'de', '{"headline": "Kontakt aufnehmen", "intro": "Sprechen wir über Ihr Projekt. Umfang, Lieferzeit und Preis schriftlich vereinbart.", "marquee": "gzlteknoloji", "cards": {"phone_label": "Telefon", "email_label": "E-Mail", "skype_label": "Skype", "address_label": "Adresse"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
  ('a619ebb0-b685-5d30-8cb8-739e66d31e9b', 'ui_static', 'de', '{"static1": {"items": [{"value": 15, "prefix": "+", "label_top": "Jahre", "label_bottom": "Ingenieurerfahrung"}, {"value": 21, "prefix": "", "label_top": "Abgeschlossene", "label_bottom": "Projekte"}, {"value": 16, "prefix": "", "label_top": "Bionluk", "label_bottom": "Bestellungen"}, {"value": 4.5, "prefix": "", "label_top": "Bewertung", "label_bottom": "Punkte"}]}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), `updated_at` = CURRENT_TIMESTAMP(3);

