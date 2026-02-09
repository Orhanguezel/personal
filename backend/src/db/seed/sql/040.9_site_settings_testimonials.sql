-- =============================================================
-- ADD: ui_testimonials (localized) — testimonials UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_testimonials',
  'en',
  CAST(JSON_OBJECT(
    'headline','Client Testimonials',
    'intro_line_1','I believe that working hard and trying to learn every day will make me',
    'intro_line_2','improve in satisfying my customers.',
    'target_type','testimonial',
    'bucket','11111111-1111-1111-1111-111111111111',
    'cta_label','',
    'cta_href','#',
    'loading','Loading...',
    'error','Failed to load testimonials.',
    'empty','No testimonials yet.',
    'man_img','/assets/imgs/testimonials/testimonials-1/man.png',
    'decorate_img','/assets/imgs/testimonials/testimonials-1/decorate.png'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_testimonials',
  'de',
  CAST(JSON_OBJECT(
    'headline','Kundenstimmen',
    'intro_line_1','Ich glaube, dass hartes Arbeiten und tägliches Lernen mich dabei',
    'intro_line_2','verbessern, meine Kunden zufriedenzustellen.',
    'target_type','testimonial',
    'bucket','11111111-1111-1111-1111-111111111111',
    'cta_label','',
    'cta_href','#',
    'loading','Wird geladen...',
    'error','Testimonials konnten nicht geladen werden.',
    'empty','Noch keine Testimonials.',
    'man_img','/assets/imgs/testimonials/testimonials-1/man.png',
    'decorate_img','/assets/imgs/testimonials/testimonials-1/decorate.png'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_testimonials',
  'tr',
  CAST(JSON_OBJECT(
    'headline','Müşteri Yorumları',
    'intro_line_1','Her gün çalışıp öğrenmenin beni',
    'intro_line_2','müşterilerimi memnun etme konusunda geliştireceğine inanıyorum.',
    'target_type','testimonial',
    'bucket','11111111-1111-1111-1111-111111111111',
    'cta_label','',
    'cta_href','#',
    'loading','Yükleniyor...',
    'error','Yorumlar yüklenemedi.',
    'empty','Henüz yorum yok.',
    'man_img','/assets/imgs/testimonials/testimonials-1/man.png',
    'decorate_img','/assets/imgs/testimonials/testimonials-1/decorate.png'
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
