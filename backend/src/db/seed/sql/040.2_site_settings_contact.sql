-- =============================================================
-- ADD: contact_section (localized) — guezelwebdesign
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'contact_section',
  'en',
  CAST(JSON_OBJECT(
    'headline','Get in touch',
    'intro','I build production-ready platforms, e-commerce systems and operational web applications. If you need a reliable full-stack implementation partner, send me a short message.',
    'marquee','guezelwebdesign',
    'cards', JSON_OBJECT(
      'phone_label','Phone Number',
      'email_label','Email',
      'address_label','Address'
    ),
    'form', JSON_OBJECT(
      'title','Leave a message',
      'name_label','Your name',
      'email_label','Email address',
      'phone_label','Your phone',
      'subject_label','Subject',
      'message_label','Message',
      'name_ph','Orhan Güzel',
      'email_ph','orhanguzell@gmail.com',
      'phone_ph','+49 172 384 6068',
      'subject_ph','',
      'message_ph','',
      'submit','Send Message'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'contact_section',
  'de',
  CAST(JSON_OBJECT(
    'headline','Kontakt',
    'intro','Ich entwickle produktionsreife Plattformen, E-Commerce-Systeme und operative Webanwendungen. Wenn Sie einen verlässlichen Full-Stack-Partner suchen, schreiben Sie mir kurz.',
    'marquee','guezelwebdesign',
    'cards', JSON_OBJECT(
      'phone_label','Telefon',
      'email_label','E-Mail',
      'address_label','Adresse'
    ),
    'form', JSON_OBJECT(
      'title','Nachricht senden',
      'name_label','Dein Name',
      'email_label','E-Mail Adresse',
      'phone_label','Telefon',
      'subject_label','Betreff',
      'message_label','Nachricht',
      'name_ph','Orhan Güzel',
      'email_ph','orhanguzell@gmail.com',
      'phone_ph','+49 172 384 6068',
      'subject_ph','',
      'message_ph','',
      'submit','Senden'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'contact_section',
  'tr',
  CAST(JSON_OBJECT(
    'headline','İletişime Geç',
    'intro','Üretime hazır platformlar, e-ticaret sistemleri ve operasyonel web uygulamaları geliştiriyorum. Projen için güvenilir bir full-stack geliştirme desteği arıyorsan bana yaz.',
    'marquee','guezelwebdesign',
    'cards', JSON_OBJECT(
      'phone_label','Telefon',
      'email_label','E-posta',
      'address_label','Adres'
    ),
    'form', JSON_OBJECT(
      'title','Mesaj Bırak',
      'name_label','Adın',
      'email_label','E-posta',
      'phone_label','Telefon',
      'subject_label','Konu',
      'message_label','Mesaj',
      'name_ph','Orhan Güzel',
      'email_ph','orhanguzell@gmail.com',
      'phone_ph','+49 172 384 6068',
      'subject_ph','',
      'message_ph','',
      'submit','Mesaj Gönder'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
