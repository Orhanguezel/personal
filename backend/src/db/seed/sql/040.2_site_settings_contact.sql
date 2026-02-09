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
    'intro','I’m always excited to take on new projects and collaborate with innovative minds. If you have a project in mind or just want to chat, feel free to reach out!',
    'marquee','guezelwebdesign',
    'cards', JSON_OBJECT(
      'phone_label','Phone Number',
      'email_label','Email',
      'skype_label','Skype',
      'address_label','Address'
    ),
    'form', JSON_OBJECT(
      'title','Leave a message',
      'name_label','Your name',
      'email_label','Email address',
      'phone_label','Your phone',
      'subject_label','Subject',
      'message_label','Message',
      'name_ph','John Doe',
      'email_ph','contact.john@gmail.com',
      'phone_ph','+49 000 000 00 00',
      'subject_ph','I want to contact about…',
      'message_ph','Your message here…',
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
    'intro','Ich freue mich immer auf neue Projekte und die Zusammenarbeit mit innovativen Köpfen. Wenn du ein Projekt hast oder einfach kurz sprechen willst, melde dich gern!',
    'marquee','guezelwebdesign',
    'cards', JSON_OBJECT(
      'phone_label','Telefon',
      'email_label','E-Mail',
      'skype_label','Skype',
      'address_label','Adresse'
    ),
    'form', JSON_OBJECT(
      'title','Nachricht senden',
      'name_label','Dein Name',
      'email_label','E-Mail Adresse',
      'phone_label','Telefon',
      'subject_label','Betreff',
      'message_label','Nachricht',
      'name_ph','Max Mustermann',
      'email_ph','kontakt@beispiel.de',
      'phone_ph','+49 000 000 00 00',
      'subject_ph','Ich möchte sprechen über…',
      'message_ph','Deine Nachricht…',
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
    'intro','Yeni projeler ve markalarla çalışmak beni her zaman heyecanlandırır. Aklında bir proje varsa ya da sadece konuşmak istersen bana yaz!',
    'marquee','guezelwebdesign',
    'cards', JSON_OBJECT(
      'phone_label','Telefon',
      'email_label','E-posta',
      'skype_label','Skype',
      'address_label','Adres'
    ),
    'form', JSON_OBJECT(
      'title','Mesaj Bırak',
      'name_label','Adın',
      'email_label','E-posta',
      'phone_label','Telefon',
      'subject_label','Konu',
      'message_label','Mesaj',
      'name_ph','Ad Soyad',
      'email_ph','ornek@mail.com',
      'phone_ph','+49 000 000 00 00',
      'subject_ph','Şunun için iletişime geçmek istiyorum…',
      'message_ph','Mesajını yaz…',
      'submit','Mesaj Gönder'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
