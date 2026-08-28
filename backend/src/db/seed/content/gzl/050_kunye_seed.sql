-- =============================================================
-- 050 — Kunye (gorunur resmi unvan) + iletisim kunyesi
-- -------------------------------------------------------------
-- NEDEN (2026-08-28): Meta isletme dogrulamasi reddedildi —
--   "Resmi isletme adinizin internet sitesinde yer almasi gerektigi icin
--    ... iliskili oldugunu dogrulayamiyoruz."
-- Resmi unvan yalnizca JSON-LD icindeydi; sayfada GORUNUR degildi.
-- Ayrica 6102 s. TTK m.39 ve 5651 s.K. unvanin sitede bulunmasini ister.
--
-- Bu dosya:
--   1) company_brand -> gorunur kunye verisi (footer bileseni bunu okur)
--   2) contact_info  -> TR merkez bilgisi (Alman numarasi/adresi DEGIL)
--   3) seo_local_business -> legalName + telephone
--   4) custom_pages 'impressum' (legal modulu) -> /tr/impressum, /en, /de
--
-- MARKA KURALI: bu degerler yalnizca gzl profiline aittir; kodda yazmaz.
-- =============================================================

SET NAMES utf8mb4;

-- ── 1) Gorunur kunye kaynagi ────────────────────────────────────────────────
-- `name` Meta'ya bildirilen yazimla birebir ayni tutulur ("Ltd. Sti.");
-- tam yazim `legal_name_long` alaninda korunur.
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-company-brand-gzl', 'company_brand', '*', '{"name":"GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.","legal_name_long":"GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi","short_name":"GZL Teknoloji","website":"https://gzlteknoloji.com","phone":"+90 505 715 14 60","email":"info@gzlteknoloji.com","descriptions":{"tr":"Gemlik ve Bursa merkezli yazılım, dijital çözüm ve teknoloji şirketi.","en":"A software, digital solutions and technology company based in Gemlik and Bursa."},"socials":{},"legal":{"vergi_dairesi":"Gemlik","vergi_no":"4542302453","mersis":"0454230245300001","ticaret_sicil":"7069 (Gemlik)","adres":"Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik/Bursa","mudur":"Nutuya Güzel","kurulus":"10.06.2026"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- ── 2) Iletisim kunyesi ─────────────────────────────────────────────────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-contact-info-gzl', 'contact_info', '*', '{"companyName":"GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.","phone":"+90 505 715 14 60","email":"info@gzlteknoloji.com","address":"Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik/Bursa","website":"https://gzlteknoloji.com"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- ── 3) Yapisal veri: legalName + telefon ────────────────────────────────────
INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-seo-local-business-gzl', 'seo_local_business', '*', '{"@type":"Organization","name":"GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.","legalName":"GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi","alternateName":"GZL Teknoloji","url":"https://gzlteknoloji.com","logo":"https://gzlteknoloji.com/uploads/site-media/logo_transparent.png","email":"info@gzlteknoloji.com","telephone":"+90 505 715 14 60","taxID":"4542302453","vatID":"4542302453","foundingDate":"2026-06-10","address":{"@type":"PostalAddress","streetAddress":"Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14","addressLocality":"Gemlik","addressRegion":"Bursa","postalCode":"16600","addressCountry":"TR"}}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- ── 4) Kunye sayfasi ────────────────────────────────────────────────────────
INSERT INTO `custom_pages` (`id`,`module_key`,`is_published`,`display_order`,`order_num`) VALUES
('49000000-0000-4000-8000-000000000001','legal',1,5,5)
ON DUPLICATE KEY UPDATE `module_key`=VALUES(`module_key`), `is_published`=VALUES(`is_published`), `display_order`=VALUES(`display_order`), `order_num`=VALUES(`order_num`);

INSERT INTO `custom_pages_i18n` (`id`,`page_id`,`locale`,`title`,`slug`,`content`,`summary`,`meta_title`,`meta_description`) VALUES
(
  '49000000-0000-4000-8000-000000000011',
  '49000000-0000-4000-8000-000000000001',
  'tr',
  'Künye',
  'impressum',
  '<p><strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong> (tam ticaret unvanı: GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi), gzlteknoloji.com internet sitesinin sahibi ve işletmecisidir.</p><h2>Şirket bilgileri</h2><ul><li><strong>Ticaret unvanı:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</li><li><strong>Adres:</strong> Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik / Bursa, Türkiye</li><li><strong>Vergi dairesi ve numarası:</strong> Gemlik Vergi Dairesi — 4542302453</li><li><strong>MERSİS numarası:</strong> 0454230245300001</li><li><strong>Ticaret sicil numarası:</strong> 7069 (Gemlik Ticaret Sicil Müdürlüğü)</li><li><strong>Kuruluş tarihi:</strong> 10.06.2026</li><li><strong>Şirket müdürü:</strong> Nutuya Güzel</li><li><strong>E-posta:</strong> info@gzlteknoloji.com</li><li><strong>Telefon:</strong> +90 505 715 14 60</li><li><strong>İnternet sitesi:</strong> https://gzlteknoloji.com</li></ul><h2>Faaliyet konusu</h2><p>Özel yazılım geliştirme, kurumsal web sitesi ve e-ticaret çözümleri, iş süreçleri otomasyonu, yapay zekâ entegrasyonu ile GEO/SEO danışmanlığı.</p><h2>Yasal dayanak</h2><p>Bu künye, 6102 sayılı Türk Ticaret Kanunu''nun 39. maddesi ile 5651 sayılı Kanun ve 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun uyarınca yayımlanmıştır.</p><h2>İlişkili yapı</h2><p>gzlteknoloji.com yalnızca GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.''ye aittir. Almanya''daki çalışmalar <strong>guezelwebdesign.com / guezelwebdesign.de</strong> alan adları üzerinden, Almanya''da serbest meslek (freiberuflich) kaydıyla ayrı bir yapı olarak yürütülür.</p><h2>İçerik sorumluluğu</h2><p>Sitedeki içeriklerin hazırlanmasında azami özen gösterilmektedir. Dış bağlantı verilen sitelerin içeriğinden ilgili site sahipleri sorumludur.</p>',
  'GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. resmi künye bilgileri: ticaret unvanı, adres, vergi ve MERSİS numarası, ticaret sicil numarası ve iletişim.',
  'Künye — GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
  'GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. — Gemlik/Bursa. Ticaret unvanı, adres, vergi no, MERSİS ve ticaret sicil bilgileri.'
),
(
  '49000000-0000-4000-8000-000000000012',
  '49000000-0000-4000-8000-000000000001',
  'en',
  'Legal Notice',
  'impressum',
  '<p><strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong> (full registered name: GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi) is the owner and operator of the gzlteknoloji.com website.</p><h2>Company details</h2><ul><li><strong>Registered name:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</li><li><strong>Address:</strong> Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik / Bursa, Türkiye</li><li><strong>Tax office and number:</strong> Gemlik Tax Office — 4542302453</li><li><strong>MERSIS number:</strong> 0454230245300001</li><li><strong>Trade registry number:</strong> 7069 (Gemlik Trade Registry Office)</li><li><strong>Incorporated:</strong> 10 June 2026</li><li><strong>Company director:</strong> Nutuya Güzel</li><li><strong>E-mail:</strong> info@gzlteknoloji.com</li><li><strong>Phone:</strong> +90 505 715 14 60</li><li><strong>Website:</strong> https://gzlteknoloji.com</li></ul><h2>Field of activity</h2><p>Custom software development, corporate websites and e-commerce, business process automation, AI integration and GEO/SEO consulting.</p><h2>Legal basis</h2><p>This legal notice is published under Article 39 of Turkish Commercial Code No. 6102, Law No. 5651 and Law No. 6563 on the Regulation of Electronic Commerce.</p><h2>Related structure</h2><p>gzlteknoloji.com belongs solely to GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. Work in Germany is carried out through <strong>guezelwebdesign.com / guezelwebdesign.de</strong> as a separate freelance (freiberuflich) registration in Germany.</p>',
  'Legal notice and registered company details of GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
  'Legal Notice — GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
  'Registered name, address, tax number, MERSIS and trade registry details of GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., Gemlik/Bursa.'
),
(
  '49000000-0000-4000-8000-000000000013',
  '49000000-0000-4000-8000-000000000001',
  'de',
  'Impressum',
  'impressum',
  '<p><strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong> (vollstaendige Firma: GZL Danışmanlık Hizmetleri ve Teknoloji Limited Şirketi) ist Inhaberin und Betreiberin der Website gzlteknoloji.com.</p><h2>Angaben zum Unternehmen</h2><ul><li><strong>Firma:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</li><li><strong>Anschrift:</strong> Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik / Bursa, Tuerkei</li><li><strong>Finanzamt und Steuernummer:</strong> Finanzamt Gemlik — 4542302453</li><li><strong>MERSIS-Nummer:</strong> 0454230245300001</li><li><strong>Handelsregisternummer:</strong> 7069 (Handelsregister Gemlik)</li><li><strong>Gruendung:</strong> 10.06.2026</li><li><strong>Geschaeftsfuehrerin:</strong> Nutuya Güzel</li><li><strong>E-Mail:</strong> info@gzlteknoloji.com</li><li><strong>Telefon:</strong> +90 505 715 14 60</li><li><strong>Website:</strong> https://gzlteknoloji.com</li></ul><h2>Taetigkeitsbereich</h2><p>Individuelle Softwareentwicklung, Unternehmenswebsites und E-Commerce, Prozessautomatisierung, KI-Integration sowie GEO/SEO-Beratung.</p><h2>Hinweis zur Struktur</h2><p>gzlteknoloji.com gehoert ausschliesslich der GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. Die Taetigkeit in Deutschland erfolgt getrennt davon ueber <strong>guezelwebdesign.com / guezelwebdesign.de</strong> als freiberufliche Taetigkeit in Deutschland.</p>',
  'Impressum und Firmenangaben der GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
  'Impressum — GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
  'Firma, Anschrift, Steuernummer, MERSIS und Handelsregister der GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., Gemlik/Bursa.'
)
ON DUPLICATE KEY UPDATE
  `title`=VALUES(`title`), `slug`=VALUES(`slug`), `content`=VALUES(`content`),
  `summary`=VALUES(`summary`), `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`);
