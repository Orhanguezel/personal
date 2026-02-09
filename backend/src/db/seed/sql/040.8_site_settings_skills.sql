-- =============================================================
-- ADD: ui_skills (localized) — skills UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_skills',
  'en',
  CAST(JSON_OBJECT(
    'skills1', JSON_OBJECT(
      'heading','My Skills',
      'intro_html','I thrive on turning complex problems into simple, beautiful<br />solutions that enhance user satisfaction.',
      'loading','Loading...',
      'error','Failed to load skills.',
      'empty','No skills found.',
      'extra_intro','In addition, I have some programming knowledge such as:',
      'extra_items', JSON_ARRAY('HTML','CSS','Javascript','Bootstrap','TailwindCSS')
    ),
    'skills2', JSON_OBJECT(
      'badge','Skills',
      'heading','My Skills',
      'loading','Loading...',
      'error','Failed to load.',
      'list_items', JSON_ARRAY(
        JSON_OBJECT('label','Front-End:','value','HTML, CSS, JavaScript, React, Angular'),
        JSON_OBJECT('label','Back-End:','value','Node.js, Express, Python, Django'),
        JSON_OBJECT('label','Databases:','value','MySQL, PostgreSQL, MongoDB'),
        JSON_OBJECT('label','Tools & Platforms:','value','Git, Docker, AWS, Heroku'),
        JSON_OBJECT('label','Others:','value','RESTful APIs, GraphQL, Agile Methodologies')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_skills',
  'de',
  CAST(JSON_OBJECT(
    'skills1', JSON_OBJECT(
      'heading','Meine Skills',
      'intro_html','Ich verwandle komplexe Probleme in einfache, schöne<br />Lösungen, die die Benutzerzufriedenheit erhöhen.',
      'loading','Wird geladen...',
      'error','Skills konnten nicht geladen werden.',
      'empty','Keine Skills gefunden.',
      'extra_intro','Außerdem habe ich Programmierkenntnisse wie:',
      'extra_items', JSON_ARRAY('HTML','CSS','JavaScript','Bootstrap','TailwindCSS')
    ),
    'skills2', JSON_OBJECT(
      'badge','Skills',
      'heading','Meine Skills',
      'loading','Wird geladen...',
      'error','Konnte nicht geladen werden.',
      'list_items', JSON_ARRAY(
        JSON_OBJECT('label','Front-End:','value','HTML, CSS, JavaScript, React, Angular'),
        JSON_OBJECT('label','Back-End:','value','Node.js, Express, Python, Django'),
        JSON_OBJECT('label','Datenbanken:','value','MySQL, PostgreSQL, MongoDB'),
        JSON_OBJECT('label','Tools & Plattformen:','value','Git, Docker, AWS, Heroku'),
        JSON_OBJECT('label','Sonstiges:','value','RESTful APIs, GraphQL, Agile Methodologien')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_skills',
  'tr',
  CAST(JSON_OBJECT(
    'skills1', JSON_OBJECT(
      'heading','Yeteneklerim',
      'intro_html','Karmaşık problemleri basit ve estetik<br />çözümlere dönüştürmeyi seviyorum.',
      'loading','Yükleniyor...',
      'error','Yetenekler yüklenemedi.',
      'empty','Yetenek bulunamadı.',
      'extra_intro','Ayrıca şu programlama bilgilerine sahibim:',
      'extra_items', JSON_ARRAY('HTML','CSS','Javascript','Bootstrap','TailwindCSS')
    ),
    'skills2', JSON_OBJECT(
      'badge','Yetenekler',
      'heading','Yeteneklerim',
      'loading','Yükleniyor...',
      'error','Yüklenemedi.',
      'list_items', JSON_ARRAY(
        JSON_OBJECT('label','Ön Yüz:','value','HTML, CSS, JavaScript, React, Angular'),
        JSON_OBJECT('label','Arka Uç:','value','Node.js, Express, Python, Django'),
        JSON_OBJECT('label','Veritabanları:','value','MySQL, PostgreSQL, MongoDB'),
        JSON_OBJECT('label','Araçlar ve Platformlar:','value','Git, Docker, AWS, Heroku'),
        JSON_OBJECT('label','Diğerleri:','value','RESTful API''ler, GraphQL, Agile Metodolojiler')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
