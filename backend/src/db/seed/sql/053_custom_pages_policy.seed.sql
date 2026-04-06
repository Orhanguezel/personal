-- =============================================================
-- FILE: 053_custom_pages_policy.seed.sql
-- Custom Pages — module_key='policy' (Privacy, KVKK, Terms)
-- - content: LONGTEXT JSON-string {"html":"..."}
-- - i18n: TR/EN/DE
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

SET @MODULE_KEY := 'policy';
SET @EMPTY_ARR := '[]';

-- helper pattern:
-- CONCAT('{"html":"', REPLACE(REPLACE(REPLACE(CONCAT(...), '"','\"'), '\n','\\n'), '\r',''), '"}')

-- =============================================================
-- PAGE #1 — Privacy Policy
-- =============================================================
SET @PAGE1 := UUID();

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE1,@MODULE_KEY,1,10,10,
 NULL,NULL,
 NULL,NULL,
 NULL,
 @EMPTY_ARR,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE1, 'en',
  'Privacy Policy',
  'privacy-policy',
  'Policy',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Privacy Policy</h2>',
      '<p>This policy explains how we collect, use, and protect your personal data.</p>',
      '<h3>1. Data We Collect</h3>',
      '<ul>',
      '<li>Contact details you provide (name, email, phone)</li>',
      '<li>Usage data (pages visited, device/browser info)</li>',
      '<li>Inquiry content sent via forms</li>',
      '</ul>',
      '<h3>2. How We Use Data</h3>',
      '<ul>',
      '<li>To respond to requests and provide services</li>',
      '<li>To improve site performance and user experience</li>',
      '<li>To comply with legal obligations</li>',
      '</ul>',
      '<h3>3. Data Sharing</h3>',
      '<p>We do not sell personal data. We may share it with service providers only when necessary.</p>',
      '<h3>4. Your Rights</h3>',
      '<p>You may request access, correction, or deletion of your data at any time.</p>',
      '<h3>5. Contact</h3>',
      '<p>For privacy requests, contact us at orhanguzell@gmail.com.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'How we collect, use, and protect your data.',
  'Summary of privacy policy and your rights.',
  NULL,
  'Privacy Policy',
  'Our privacy policy explains data collection, use, sharing, and your rights.',
  'privacy,policy,data protection',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE1, 'tr',
  'Gizlilik Politikası',
  'gizlilik-politikasi',
  'Politika',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Gizlilik Politikası</h2>',
      '<p>Bu politika kişisel verilerin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.</p>',
      '<h3>1. Toplanan Veriler</h3>',
      '<ul>',
      '<li>İletişim bilgileri (ad, e-posta, telefon)</li>',
      '<li>Kullanım verileri (ziyaret edilen sayfalar, cihaz/tarayıcı)</li>',
      '<li>Formlardan gönderilen içerikler</li>',
      '</ul>',
      '<h3>2. Verilerin Kullanımı</h3>',
      '<ul>',
      '<li>Talep ve hizmetleri karşılamak</li>',
      '<li>Site performansını ve deneyimi geliştirmek</li>',
      '<li>Yasal yükümlülüklere uymak</li>',
      '</ul>',
      '<h3>3. Veri Paylaşımı</h3>',
      '<p>Kişisel veri satmayız. Yalnızca gerekli durumlarda hizmet sağlayıcılarla paylaşırız.</p>',
      '<h3>4. Haklarınız</h3>',
      '<p>Verilerinize erişim, düzeltme veya silme talep edebilirsiniz.</p>',
      '<h3>5. İletişim</h3>',
      '<p>Gizlilik talepleri için orhanguzell@gmail.com adresiyle iletişime geçin.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Kişisel verilerin nasıl toplandığı ve korunduğu.',
  'Gizlilik politikası ve haklarınızın özeti.',
  NULL,
  'Gizlilik Politikası',
  'Veri toplama, kullanım, paylaşım ve haklarınızı açıklayan gizlilik politikası.',
  'gizlilik,politika,veri koruma',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE1, 'de',
  'Datenschutzrichtlinie',
  'datenschutz',
  'Richtlinie',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Datenschutzrichtlinie</h2>',
      '<p>Diese Richtlinie erklärt, wie wir personenbezogene Daten erheben, nutzen und schützen.</p>',
      '<h3>1. Erhobene Daten</h3>',
      '<ul>',
      '<li>Kontaktangaben (Name, E-Mail, Telefon)</li>',
      '<li>Nutzungsdaten (besuchte Seiten, Geräte/Browser)</li>',
      '<li>Inhalte aus Formularanfragen</li>',
      '</ul>',
      '<h3>2. Nutzung der Daten</h3>',
      '<ul>',
      '<li>Beantwortung von Anfragen und Bereitstellung von Services</li>',
      '<li>Verbesserung von Performance und Nutzererlebnis</li>',
      '<li>Einhaltung rechtlicher Pflichten</li>',
      '</ul>',
      '<h3>3. Datenweitergabe</h3>',
      '<p>Wir verkaufen keine Daten. Weitergabe erfolgt nur bei Bedarf an Dienstleister.</p>',
      '<h3>4. Ihre Rechte</h3>',
      '<p>Sie können Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen.</p>',
      '<h3>5. Kontakt</h3>',
      '<p>Für Datenschutzanfragen: orhanguzell@gmail.com</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Wie wir Daten erheben, nutzen und schützen.',
  'Zusammenfassung der Datenschutzrichtlinie.',
  NULL,
  'Datenschutzrichtlinie',
  'Unsere Datenschutzrichtlinie erklärt Erhebung, Nutzung, Weitergabe und Rechte.',
  'datenschutz,policy,daten',
  NOW(3),NOW(3)
);

-- =============================================================
-- PAGE #2 — KVKK (TR) / Data Protection (EN/DE)
-- =============================================================
SET @PAGE2 := UUID();

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE2,@MODULE_KEY,1,20,20,
 NULL,NULL,
 NULL,NULL,
 NULL,
 @EMPTY_ARR,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE2, 'en',
  'KVKK / Data Protection',
  'kvkk',
  'Policy',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>KVKK / Data Protection</h2>',
      '<p>This page summarizes our data protection commitments in accordance with applicable regulations.</p>',
      '<h3>Data Processing Purposes</h3>',
      '<p>We process personal data to provide services, communicate, and improve quality.</p>',
      '<h3>Retention</h3>',
      '<p>Data is stored only for the required legal or operational period.</p>',
      '<h3>Security</h3>',
      '<p>We implement technical and organizational measures to protect data.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'KVKK-focused data protection summary.',
  'Our KVKK / data protection commitments.',
  NULL,
  'KVKK / Data Protection',
  'Data protection practices aligned with KVKK and similar regulations.',
  'kvkk,data protection,privacy',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE2, 'tr',
  'KVKK Aydınlatma',
  'kvkk',
  'Politika',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>KVKK Aydınlatma</h2>',
      '<p>Bu sayfa, KVKK kapsamında kişisel verilerin işlenmesine dair özet bilgi sağlar.</p>',
      '<h3>İşleme Amaçları</h3>',
      '<p>Veriler hizmet sunumu, iletişim ve kalite geliştirme amaçlarıyla işlenir.</p>',
      '<h3>Saklama Süresi</h3>',
      '<p>Veriler, gerekli yasal/operasyonel süre boyunca saklanır.</p>',
      '<h3>Güvenlik</h3>',
      '<p>Verilerin korunması için teknik ve idari tedbirler uygulanır.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'KVKK kapsamında veri işleme özeti.',
  'KVKK aydınlatma metni özeti.',
  NULL,
  'KVKK Aydınlatma',
  'KVKK ve ilgili mevzuata uygun veri koruma uygulamalarımız.',
  'kvkk,veri koruma,gizlilik',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE2, 'de',
  'KVKK / Datenschutz',
  'kvkk',
  'Richtlinie',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>KVKK / Datenschutz</h2>',
      '<p>Diese Seite fasst unsere Datenschutzpraktiken gemäß geltender Vorschriften zusammen.</p>',
      '<h3>Zweck der Verarbeitung</h3>',
      '<p>Wir verarbeiten Daten zur Leistungserbringung, Kommunikation und Qualitätsverbesserung.</p>',
      '<h3>Aufbewahrung</h3>',
      '<p>Daten werden nur so lange wie erforderlich gespeichert.</p>',
      '<h3>Sicherheit</h3>',
      '<p>Wir setzen technische und organisatorische Maßnahmen zum Schutz ein.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Datenschutz-Übersicht nach KVKK.',
  'Zusammenfassung unserer Datenschutzpraxis.',
  NULL,
  'KVKK / Datenschutz',
  'Datenschutzpraktiken im Einklang mit KVKK und ähnlichen Regeln.',
  'kvkk,datenschutz,privacy',
  NOW(3),NOW(3)
);

-- =============================================================
-- PAGE #3 — Terms & Conditions
-- =============================================================
SET @PAGE3 := UUID();

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE3,@MODULE_KEY,1,30,30,
 NULL,NULL,
 NULL,NULL,
 NULL,
 @EMPTY_ARR,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE3, 'en',
  'Terms & Conditions',
  'terms-and-conditions',
  'Policy',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Terms &amp; Conditions</h2>',
      '<p>By using this website, you agree to the following terms.</p>',
      '<h3>Use of Service</h3>',
      '<p>Content is provided as-is and may change without notice.</p>',
      '<h3>Intellectual Property</h3>',
      '<p>All content and assets are owned by the site owner unless stated otherwise.</p>',
      '<h3>Liability</h3>',
      '<p>We are not liable for indirect or consequential damages.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Website usage terms and conditions.',
  'Terms and conditions summary.',
  NULL,
  'Terms & Conditions',
  'Terms governing the use of this website.',
  'terms,conditions,policy',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE3, 'tr',
  'Kullanım Şartları',
  'kullanim-sartlari',
  'Politika',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Kullanım Şartları</h2>',
      '<p>Bu web sitesini kullanarak aşağıdaki şartları kabul etmiş olursunuz.</p>',
      '<h3>Hizmetin Kullanımı</h3>',
      '<p>İçerik olduğu gibi sunulur ve haber verilmeksizin değişebilir.</p>',
      '<h3>Fikri Mülkiyet</h3>',
      '<p>Tüm içerik ve varlıklar aksi belirtilmedikçe site sahibine aittir.</p>',
      '<h3>Sorumluluk</h3>',
      '<p>Dolaylı veya sonuçsal zararlardan sorumlu değiliz.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Site kullanım şartları.',
  'Kullanım şartları özeti.',
  NULL,
  'Kullanım Şartları',
  'Web sitesi kullanımına ilişkin şartlar.',
  'kullanim sartlari,politikalar',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE3, 'de',
  'Nutzungsbedingungen',
  'nutzungsbedingungen',
  'Richtlinie',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Nutzungsbedingungen</h2>',
      '<p>Durch die Nutzung dieser Website stimmen Sie den folgenden Bedingungen zu.</p>',
      '<h3>Service-Nutzung</h3>',
      '<p>Inhalte werden ohne Gewähr bereitgestellt und können geändert werden.</p>',
      '<h3>Urheberrecht</h3>',
      '<p>Alle Inhalte und Assets gehören dem Betreiber, sofern nicht anders angegeben.</p>',
      '<h3>Haftung</h3>',
      '<p>Wir haften nicht für indirekte oder Folgeschäden.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Nutzungsbedingungen der Website.',
  'Zusammenfassung der Nutzungsbedingungen.',
  NULL,
  'Nutzungsbedingungen',
  'Bedingungen für die Nutzung dieser Website.',
  'nutzungsbedingungen,policy',
  NOW(3),NOW(3)
);

-- =============================================================
-- PAGE #4 — Impressum (Legal Notice)
-- =============================================================
SET @PAGE4 := UUID();

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE4,@MODULE_KEY,1,5,5,
 NULL,NULL,
 NULL,NULL,
 NULL,
 @EMPTY_ARR,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE4, 'de',
  'Impressum',
  'impressum',
  'Richtlinie',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Impressum</h2>',
      '<p><strong>Angaben gem&auml;&szlig; &sect; 5 DDG (Digitale-Dienste-Gesetz)</strong></p>',
      '<h3>Diensteanbieter</h3>',
      '<p>Orhan G&uuml;zel<br>Freiberuflicher Webentwickler<br>Daimlerstra&szlig;e 50<br>41516 Grevenbroich<br>Deutschland</p>',
      '<h3>Kontakt</h3>',
      '<p>E-Mail: info@guezelwebdesign.com<br>Telefon: +49 172 384 6068<br>Website: https://guezelwebdesign.com</p>',
      '<h3>Berufsbezeichnung</h3>',
      '<p>Freiberuflicher Webentwickler / Full-Stack Developer (Freiberufliche T&auml;tigkeit gem&auml;&szlig; &sect; 18 EStG)</p>',
      '<h3>Umsatzsteuer</h3>',
      '<p>Gem&auml;&szlig; &sect; 19 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).</p>',
      '<h3>Inhaltlich Verantwortlicher gem&auml;&szlig; &sect; 18 Abs. 2 MStV</h3>',
      '<p>Orhan G&uuml;zel (Anschrift wie oben)</p>',
      '<h3>EU-Streitbeilegung</h3>',
      '<p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href=\\\"https://ec.europa.eu/consumers/odr/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>',
      '<h3>Haftung f&uuml;r Inhalte</h3>',
      '<p>Die Inhalte dieser Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt. F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen. Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 DDG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>',
      '<h3>Haftung f&uuml;r Links</h3>',
      '<p>Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>',
      '<h3>Urheberrecht</h3>',
      '<p>Die Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung oder Verbreitung bedarf der schriftlichen Zustimmung des Autors.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Pflichtangaben gemaess DDG, Kontakt, Haftung und Urheberrecht.',
  'Impressum mit Angaben zum Diensteanbieter.',
  NULL,
  'Impressum — Guezel Web Design',
  'Impressum gemaess § 5 DDG. Diensteanbieter, Kontakt, Haftungsausschluss.',
  'impressum,legal,recht',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE4, 'en',
  'Legal Notice (Impressum)',
  'impressum',
  'Policy',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Legal Notice (Impressum)</h2>',
      '<p><strong>Information according to &sect; 5 DDG (German Digital Services Act)</strong></p>',
      '<h3>Service Provider</h3>',
      '<p>Orhan G&uuml;zel<br>Freelance Web Developer<br>Daimlerstra&szlig;e 50<br>41516 Grevenbroich<br>Germany</p>',
      '<h3>Contact</h3>',
      '<p>Email: info@guezelwebdesign.com<br>Phone: +49 172 384 6068<br>Website: https://guezelwebdesign.com</p>',
      '<h3>Professional Title</h3>',
      '<p>Freelance Web Developer / Full-Stack Developer (Freelance activity pursuant to &sect; 18 EStG, German Income Tax Act)</p>',
      '<h3>VAT</h3>',
      '<p>No VAT is charged pursuant to &sect; 19 UStG (German small business regulation).</p>',
      '<h3>Responsible for Content (&sect; 18 Abs. 2 MStV)</h3>',
      '<p>Orhan G&uuml;zel (address as above)</p>',
      '<h3>EU Dispute Resolution</h3>',
      '<p>The European Commission provides a platform for online dispute resolution (ODR): <a href=\\\"https://ec.europa.eu/consumers/odr/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://ec.europa.eu/consumers/odr/</a>. We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.</p>',
      '<h3>Liability for Content</h3>',
      '<p>The contents of our pages were created with great care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content pursuant to &sect; 7 (1) DDG.</p>',
      '<h3>Liability for Links</h3>',
      '<p>Our website contains links to external third-party websites over whose content we have no control. The respective provider is always responsible for the content of linked pages.</p>',
      '<h3>Copyright</h3>',
      '<p>The content and works on these pages are subject to German copyright law. Duplication, processing, or distribution requires written consent of the author.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Legal notice per German Digital Services Act, contact, disclaimer.',
  'Legal notice with service provider information.',
  NULL,
  'Legal Notice (Impressum) — Guezel Web Design',
  'Legal notice per § 5 DDG. Service provider, contact, disclaimer.',
  'impressum,legal notice,law',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE4, 'tr',
  'Yasal Bildirim (Impressum)',
  'impressum',
  'Politika',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Yasal Bildirim (Impressum)</h2>',
      '<p><strong>Alman Dijital Hizmetler Yasas&inodot; (&sect; 5 DDG) kapsam&inodot;nda zorunlu bilgiler</strong></p>',
      '<h3>Hizmet Sa&gbreve;lay&inodot;c&inodot;</h3>',
      '<p>Orhan G&uuml;zel<br>Serbest Web Geli&scedil;tirici<br>Daimlerstra&szlig;e 50<br>41516 Grevenbroich<br>Almanya</p>',
      '<h3>&Idot;leti&scedil;im</h3>',
      '<p>E-posta: info@guezelwebdesign.com<br>Telefon: +49 172 384 6068<br>Web sitesi: https://guezelwebdesign.com</p>',
      '<h3>Meslek &Uuml;nvan&inodot;</h3>',
      '<p>Serbest Web Geli&scedil;tirici / Full-Stack Developer (Alman Gelir Vergisi Kanunu &sect; 18 EStG kapsam&inodot;nda serbest meslek faaliyeti)</p>',
      '<h3>KDV</h3>',
      '<p>&sect; 19 UStG (Alman k&uuml;&ccedil;&uuml;k i&scedil;letme d&uuml;zenlemesi) kapsam&inodot;nda KDV al&inodot;nmamaktad&inodot;r.</p>',
      '<h3>&Idot;&ccedil;erikten Sorumlu Ki&scedil;i (&sect; 18 Abs. 2 MStV)</h3>',
      '<p>Orhan G&uuml;zel (yukar&inodot;daki adres)</p>',
      '<h3>AB Uyu&scedil;mazl&inodot;k &Ccedil;&ouml;z&uuml;m&uuml;</h3>',
      '<p>Avrupa Komisyonu &ccedil;evrimi&ccedil;i uyu&scedil;mazl&inodot;k &ccedil;&ouml;z&uuml;m&uuml; (ODR) platformu sunmaktad&inodot;r: <a href=\\\"https://ec.europa.eu/consumers/odr/\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">https://ec.europa.eu/consumers/odr/</a>.</p>',
      '<h3>Sorumluluk Reddi</h3>',
      '<p>Sayfalar&inodot;m&inodot;z&inodot;n i&ccedil;eri&gbreve;i b&uuml;y&uuml;k bir &ouml;zenle olu&scedil;turulmu&scedil;tur. Ancak i&ccedil;eri&gbreve;in do&gbreve;rulu&gbreve;u, eksiksizli&gbreve;i veya g&uuml;ncelli&gbreve;i konusunda garanti veremeyiz.</p>',
      '<h3>Telif Hakk&inodot;</h3>',
      '<p>Bu sayfalardaki i&ccedil;erik ve eserler Alman telif hakk&inodot; yasas&inodot;na tabidir.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Alman DDG kapsaminda yasal bildirim, iletisim ve sorumluluk reddi.',
  'Hizmet saglayici bilgileri iceren yasal bildirim.',
  NULL,
  'Yasal Bildirim (Impressum) — Guezel Web Design',
  'Alman Dijital Hizmetler Yasasi § 5 DDG kapsaminda yasal bildirim.',
  'impressum,yasal bildirim,hukuk',
  NOW(3),NOW(3)
);

COMMIT;
