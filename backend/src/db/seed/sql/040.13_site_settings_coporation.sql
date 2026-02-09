-- =============================================================
-- ADD: ui_coporation (localized) — Coporation2 UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_coporation',
  'en',
  CAST(JSON_OBJECT(
    'badge', 'Cooperation',
    'heading_html', 'More than +168 <span class="text-300">companies <br /></span> trusted <span class="text-300">worldwide_</span>',
    'contact', JSON_OBJECT(
      'avatar', 'assets/imgs/coporation/avatar.png',
      'avatar_alt', 'Orhan Guzel',
      'skype_label', '[skype]',
      'skype_value', 'GuezelWebDesign',
      'skype_href', '#',
      'phone_label', '[phone]',
      'phone_value', '+49 000 000 00 00',
      'phone_href', 'tel:+490000000000',
      'email_label', '[email]',
      'email_value', 'contact@guezelwebdesign.com',
      'email_href', 'mailto:contact@guezelwebdesign.com'
    ),
    'journal', JSON_OBJECT(
      'badge', 'Git Journaling',
      'items', JSON_ARRAY(
        JSON_OBJECT('date','15 Jul:','title','Muzzilla-streaming-API-services-for-Python'),
        JSON_OBJECT('date','30 Jun:','title','ChatHub-Chat-application-VueJs-Mongodb'),
        JSON_OBJECT('date','26 May:','title','DineEasy-coffee-tea-reservation-system'),
        JSON_OBJECT('date','17 Apr:','title','FinanceBuddy-Personal-finance-tracker'),
        JSON_OBJECT('date','05 Mar:','title','TuneStream-Music-streaming-service-API')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_coporation',
  'de',
  CAST(JSON_OBJECT(
    'badge', 'Kooperation',
    'heading_html', 'Mehr als +168 <span class="text-300">Unternehmen <br /></span> vertrauen <span class="text-300">weltweit_</span>',
    'contact', JSON_OBJECT(
      'avatar', 'assets/imgs/coporation/avatar.png',
      'avatar_alt', 'Orhan Guzel',
      'skype_label', '[skype]',
      'skype_value', 'GuezelWebDesign',
      'skype_href', '#',
      'phone_label', '[telefon]',
      'phone_value', '+49 000 000 00 00',
      'phone_href', 'tel:+490000000000',
      'email_label', '[email]',
      'email_value', 'contact@guezelwebdesign.com',
      'email_href', 'mailto:contact@guezelwebdesign.com'
    ),
    'journal', JSON_OBJECT(
      'badge', 'Git Journal',
      'items', JSON_ARRAY(
        JSON_OBJECT('date','15 Jul:','title','Muzzilla-streaming-API-services-for-Python'),
        JSON_OBJECT('date','30 Jun:','title','ChatHub-Chat-application-VueJs-Mongodb'),
        JSON_OBJECT('date','26 Mai:','title','DineEasy-coffee-tea-reservation-system'),
        JSON_OBJECT('date','17 Apr:','title','FinanceBuddy-Personal-finance-tracker'),
        JSON_OBJECT('date','05 Mär:','title','TuneStream-Music-streaming-service-API')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_coporation',
  'tr',
  CAST(JSON_OBJECT(
    'badge', 'İş Birliği',
    'heading_html', '+168''den fazla <span class="text-300">şirket <br /></span> <span class="text-300">dünya çapında_</span> güveniyor',
    'contact', JSON_OBJECT(
      'avatar', 'assets/imgs/coporation/avatar.png',
      'avatar_alt', 'Orhan Guzel',
      'skype_label', '[skype]',
      'skype_value', 'GuezelWebDesign',
      'skype_href', '#',
      'phone_label', '[telefon]',
      'phone_value', '+49 000 000 00 00',
      'phone_href', 'tel:+490000000000',
      'email_label', '[eposta]',
      'email_value', 'contact@guezelwebdesign.com',
      'email_href', 'mailto:contact@guezelwebdesign.com'
    ),
    'journal', JSON_OBJECT(
      'badge', 'Git Günlüğü',
      'items', JSON_ARRAY(
        JSON_OBJECT('date','15 Tem:','title','Muzzilla-streaming-API-services-for-Python'),
        JSON_OBJECT('date','30 Haz:','title','ChatHub-Chat-application-VueJs-Mongodb'),
        JSON_OBJECT('date','26 May:','title','DineEasy-coffee-tea-reservation-system'),
        JSON_OBJECT('date','17 Nis:','title','FinanceBuddy-Personal-finance-tracker'),
        JSON_OBJECT('date','05 Mar:','title','TuneStream-Music-streaming-service-API')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
