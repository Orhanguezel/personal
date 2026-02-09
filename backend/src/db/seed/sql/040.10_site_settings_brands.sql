-- =============================================================
-- ADD: ui_brands (localized) — brands UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_brands',
  'en',
  CAST(JSON_OBJECT(
    'heading','Trusted by industry leaders',
    'intro_html','I have collaborated with many large corporations, companies, and agencies around<br />the world in many fields of design and consulting',
    'track','right',
    'loading','Loading...',
    'error','Failed to load brands.',
    'empty','No brands found.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_brands',
  'de',
  CAST(JSON_OBJECT(
    'heading','Von Branchenführern geschätzt',
    'intro_html','Ich habe mit vielen großen Unternehmen, Firmen und Agenturen auf der ganzen Welt<br />in vielen Bereichen von Design und Beratung zusammengearbeitet',
    'track','right',
    'loading','Wird geladen...',
    'error','Marken konnten nicht geladen werden.',
    'empty','Keine Marken gefunden.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_brands',
  'tr',
  CAST(JSON_OBJECT(
    'heading','Sektör liderlerinin tercihi',
    'intro_html','Birçok büyük kurum, şirket ve ajans ile dünyanın dört bir yanında<br />tasarım ve danışmanlık alanlarında çalıştım',
    'track','right',
    'loading','Yükleniyor...',
    'error','Markalar yüklenemedi.',
    'empty','Marka bulunamadı.'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
