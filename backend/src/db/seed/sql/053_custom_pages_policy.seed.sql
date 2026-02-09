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
      '<p>For privacy requests, contact us at contact@guezelwebdesign.com.</p>'
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
      '<p>Gizlilik talepleri için contact@guezelwebdesign.com adresiyle iletişime geçin.</p>'
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
      '<p>Für Datenschutzanfragen: contact@guezelwebdesign.com</p>'
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

COMMIT;
