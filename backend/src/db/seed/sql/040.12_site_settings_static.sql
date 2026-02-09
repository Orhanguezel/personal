-- =============================================================
-- ADD: ui_static (localized) — Static1/Static2 counters (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_static',
  'en',
  CAST(JSON_OBJECT(
    'static1', JSON_OBJECT(
      'items', JSON_ARRAY(
        JSON_OBJECT('value', 12, 'prefix', '+', 'label_top', 'Year of', 'label_bottom', 'Experience'),
        JSON_OBJECT('value', 250, 'prefix', '+', 'label_top', 'Projects', 'label_bottom', 'Completed'),
        JSON_OBJECT('value', 680, 'prefix', '+', 'label_top', 'Satisfied', 'label_bottom', 'Happy Clients'),
        JSON_OBJECT('value', 18, 'prefix', '+', 'label_top', 'Awards', 'label_bottom', 'Won Received')
      )
    ),
    'static2', JSON_OBJECT(
      'background_image', 'assets/imgs/home-page-2/static/bg.png',
      'items', JSON_ARRAY(
        JSON_OBJECT('value', 12, 'suffix', '+', 'label', 'Year Experience', 'icon', 'ri-shape-line'),
        JSON_OBJECT('value', 250, 'suffix', '+', 'label', 'Projects Completed', 'icon', 'ri-computer-line'),
        JSON_OBJECT('value', 680, 'suffix', '+', 'label', 'Satisfied Clients', 'icon', 'ri-service-line'),
        JSON_OBJECT('value', 18, 'suffix', '+', 'label', 'Awards Winner', 'icon', 'ri-award-line')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_static',
  'de',
  CAST(JSON_OBJECT(
    'static1', JSON_OBJECT(
      'items', JSON_ARRAY(
        JSON_OBJECT('value', 12, 'prefix', '+', 'label_top', 'Jahre', 'label_bottom', 'Erfahrung'),
        JSON_OBJECT('value', 250, 'prefix', '+', 'label_top', 'Projekte', 'label_bottom', 'Abgeschlossen'),
        JSON_OBJECT('value', 680, 'prefix', '+', 'label_top', 'Zufriedene', 'label_bottom', 'Kunden'),
        JSON_OBJECT('value', 18, 'prefix', '+', 'label_top', 'Auszeichnungen', 'label_bottom', 'Erhalten')
      )
    ),
    'static2', JSON_OBJECT(
      'background_image', 'assets/imgs/home-page-2/static/bg.png',
      'items', JSON_ARRAY(
        JSON_OBJECT('value', 12, 'suffix', '+', 'label', 'Jahre Erfahrung', 'icon', 'ri-shape-line'),
        JSON_OBJECT('value', 250, 'suffix', '+', 'label', 'Projekte Abgeschlossen', 'icon', 'ri-computer-line'),
        JSON_OBJECT('value', 680, 'suffix', '+', 'label', 'Zufriedene Kunden', 'icon', 'ri-service-line'),
        JSON_OBJECT('value', 18, 'suffix', '+', 'label', 'Auszeichnungen Gewonnen', 'icon', 'ri-award-line')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_static',
  'tr',
  CAST(JSON_OBJECT(
    'static1', JSON_OBJECT(
      'items', JSON_ARRAY(
        JSON_OBJECT('value', 12, 'prefix', '+', 'label_top', 'Deneyim', 'label_bottom', 'Yılı'),
        JSON_OBJECT('value', 250, 'prefix', '+', 'label_top', 'Proje', 'label_bottom', 'Tamamlandı'),
        JSON_OBJECT('value', 680, 'prefix', '+', 'label_top', 'Memnun', 'label_bottom', 'Müşteriler'),
        JSON_OBJECT('value', 18, 'prefix', '+', 'label_top', 'Ödül', 'label_bottom', 'Kazanıldı')
      )
    ),
    'static2', JSON_OBJECT(
      'background_image', 'assets/imgs/home-page-2/static/bg.png',
      'items', JSON_ARRAY(
        JSON_OBJECT('value', 12, 'suffix', '+', 'label', 'Yıl Deneyim', 'icon', 'ri-shape-line'),
        JSON_OBJECT('value', 250, 'suffix', '+', 'label', 'Projeler Tamamlandı', 'icon', 'ri-computer-line'),
        JSON_OBJECT('value', 680, 'suffix', '+', 'label', 'Memnun Müşteriler', 'icon', 'ri-service-line'),
        JSON_OBJECT('value', 18, 'suffix', '+', 'label', 'Ödül Kazanan', 'icon', 'ri-award-line')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
