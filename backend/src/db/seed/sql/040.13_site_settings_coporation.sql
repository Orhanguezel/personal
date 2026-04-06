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
      'badge', 'Collaboration',
      'heading_html', 'Selected <span class="text-300">projects, products and</span> long-term <span class="text-300">delivery work_</span>',
    'contact', JSON_OBJECT(
      'avatar', '/assets/imgs/coporation/avatar.png',
      'avatar_alt', 'Orhan Guzel',
      'skype_label', 'Skype',
      'skype_value', '',
      'skype_href', '',
      'phone_label', 'Phone',
      'phone_value', '+49 172 384 6068',
      'phone_href', 'tel:+491723846068',
      'email_label', 'Email',
      'email_value', 'orhanguzell@gmail.com',
      'email_href', 'mailto:orhanguzell@gmail.com'
    ),
    'journal', JSON_OBJECT(
      'badge', 'Recent Focus',
      'items', JSON_ARRAY(
        JSON_OBJECT('date','2026:','title','Portfolio and career data standardization'),
        JSON_OBJECT('date','2026:','title','GuezelWebDesign production portfolio refresh'),
        JSON_OBJECT('date','2025-2026:','title','QuickEcommerce full-stack platform delivery'),
        JSON_OBJECT('date','2025-2026:','title','Ensotek B2B platform and multilingual frontend'),
        JSON_OBJECT('date','2025-2026:','title','ERP, booking and service platform implementations')
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
      'badge', 'Zusammenarbeit',
      'heading_html', 'Ausgewählte <span class="text-300">Projekte, Produkte und</span> langfristige <span class="text-300">Delivery-Arbeit_</span>',
    'contact', JSON_OBJECT(
      'avatar', '/assets/imgs/coporation/avatar.png',
      'avatar_alt', 'Orhan Guzel',
      'skype_label', 'Skype',
      'skype_value', '',
      'skype_href', '',
      'phone_label', 'Telefon',
      'phone_value', '+49 172 384 6068',
      'phone_href', 'tel:+491723846068',
      'email_label', 'E-Mail',
      'email_value', 'orhanguzell@gmail.com',
      'email_href', 'mailto:orhanguzell@gmail.com'
    ),
    'journal', JSON_OBJECT(
      'badge', 'Aktueller Fokus',
      'items', JSON_ARRAY(
        JSON_OBJECT('date','2026:','title','Portfolio- und Career-Daten standardisieren'),
        JSON_OBJECT('date','2026:','title','GuezelWebDesign Portfolio im Live-System aktualisieren'),
        JSON_OBJECT('date','2025-2026:','title','QuickEcommerce Full-Stack Plattform Delivery'),
        JSON_OBJECT('date','2025-2026:','title','Ensotek B2B Plattform und mehrsprachiges Frontend'),
        JSON_OBJECT('date','2025-2026:','title','ERP-, Booking- und Service-Plattformen umgesetzt')
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
      'heading_html', 'Seçilmiş <span class="text-300">projeler, ürünler ve</span> uzun soluklu <span class="text-300">teslim süreçleri_</span>',
    'contact', JSON_OBJECT(
      'avatar', '/assets/imgs/coporation/avatar.png',
      'avatar_alt', 'Orhan Guzel',
      'skype_label', 'Skype',
      'skype_value', '',
      'skype_href', '',
      'phone_label', 'Telefon',
      'phone_value', '+49 172 384 6068',
      'phone_href', 'tel:+491723846068',
      'email_label', 'E-posta',
      'email_value', 'orhanguzell@gmail.com',
      'email_href', 'mailto:orhanguzell@gmail.com'
    ),
    'journal', JSON_OBJECT(
      'badge', 'Güncel Odak',
      'items', JSON_ARRAY(
        JSON_OBJECT('date','2026:','title','Portföy ve kariyer verisini standardize etme'),
        JSON_OBJECT('date','2026:','title','GuezelWebDesign canlı portföy yenilemesi'),
        JSON_OBJECT('date','2025-2026:','title','QuickEcommerce full-stack platform teslimi'),
        JSON_OBJECT('date','2025-2026:','title','Ensotek B2B platformu ve çok dilli frontend'),
        JSON_OBJECT('date','2025-2026:','title','ERP, booking ve service platformu implementasyonları')
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
