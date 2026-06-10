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
    'heading','Vertrauen aus echten Projekten',
    'intro_html','Erfahrung aus Websites, Plattformen und digitalen Prozessen für Unternehmen und lokale Dienstleister.',
    'track','right',
    'loading','Wird geladen...',
    'error','Referenzen konnten nicht geladen werden.',
    'empty','Keine Referenzen gefunden.'
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
