-- =============================================================
-- ADD: ui_admin (localized) — Admin UI copy
-- Removed legacy module copy for retired admin areas.
-- =============================================================

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`, `created_at`, `updated_at`)
VALUES
(
  UUID(),
  'ui_admin',
  'en',
  CAST(JSON_OBJECT(
    'app_name', 'GuezelWebDesign',
    'nav', JSON_OBJECT(
      'labels', JSON_OBJECT(
        'general', 'General',
        'content', 'Content',
        'marketing', 'Marketing',
        'communication', 'Communication',
        'system', 'System'
      ),
      'items', JSON_OBJECT(
        'dashboard', 'Dashboard',
        'site_settings', 'Site Settings',
        'custom_pages', 'Custom Pages',
        'services', 'Services',
        'projects', 'Projects',
        'pricing', 'Pricing',
        'brands', 'Brands',
        'resume', 'Resume',
        'skills', 'Skills',
        'menu_items', 'Menu Items',
        'footer_sections', 'Footer Sections',
        'newsletter', 'Newsletter',
        'contacts', 'Contacts',
        'reviews', 'Reviews',
        'users', 'Users',
        'email_templates', 'Email Templates',
        'notifications', 'Notifications',
        'storage', 'Storage',
        'db', 'Database'
      )
    ),
    'common', JSON_OBJECT(
      'actions', JSON_OBJECT(
        'create', 'Create',
        'edit', 'Edit',
        'delete', 'Delete',
        'save', 'Save',
        'cancel', 'Cancel',
        'refresh', 'Refresh',
        'search', 'Search',
        'filter', 'Filter',
        'close', 'Close',
        'back', 'Back',
        'confirm', 'Confirm'
      ),
      'states', JSON_OBJECT(
        'loading', 'Loading',
        'error', 'An error occurred',
        'empty', 'No records found',
        'updating', 'Updating',
        'saving', 'Saving'
      )
    ),
    'pages', JSON_OBJECT(
      'dashboard', JSON_OBJECT(
        'title', 'Dashboard',
        'subtitle', 'Overview and quick totals.',
        'label_services', 'Services',
        'label_contacts', 'Contacts',
        'label_newsletter', 'Newsletter',
        'label_email_templates', 'Email Templates',
        'label_site_settings', 'Site Settings',
        'label_custom_pages', 'Custom Pages',
        'label_menuitem', 'Menu Items',
        'label_footer_sections', 'Footer Sections',
        'label_reviews', 'Reviews',
        'label_support', 'Support',
        'label_users', 'Users',
        'label_storage', 'Storage',
        'label_projects', 'Projects',
        'label_pricing_plans', 'Pricing Plans',
        'label_skillCounters', 'Skills',
        'label_brandLogos', 'Brands'
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'ui_admin',
  'tr',
  CAST(JSON_OBJECT(
    'app_name', 'GuezelWebDesign',
    'nav', JSON_OBJECT(
      'labels', JSON_OBJECT(
        'general', 'Genel',
        'content', 'İçerik',
        'marketing', 'Pazarlama',
        'communication', 'İletişim',
        'system', 'Sistem'
      ),
      'items', JSON_OBJECT(
        'dashboard', 'Panel',
        'site_settings', 'Site Ayarları',
        'custom_pages', 'Sayfalar',
        'services', 'Hizmetler',
        'projects', 'Projeler',
        'pricing', 'Fiyatlar',
        'brands', 'Markalar',
        'resume', 'Özgeçmiş',
        'skills', 'Yetenekler',
        'menu_items', 'Menü Öğeleri',
        'footer_sections', 'Footer Bölümleri',
        'newsletter', 'Bülten',
        'contacts', 'Mesajlar',
        'reviews', 'Yorumlar',
        'users', 'Kullanıcılar',
        'email_templates', 'E-posta Şablonları',
        'notifications', 'Bildirimler',
        'storage', 'Dosyalar',
        'db', 'Veritabanı'
      )
    ),
    'common', JSON_OBJECT(
      'actions', JSON_OBJECT(
        'create', 'Oluştur',
        'edit', 'Düzenle',
        'delete', 'Sil',
        'save', 'Kaydet',
        'cancel', 'Vazgeç',
        'refresh', 'Yenile',
        'search', 'Ara',
        'filter', 'Filtrele',
        'close', 'Kapat',
        'back', 'Geri',
        'confirm', 'Onayla'
      ),
      'states', JSON_OBJECT(
        'loading', 'Yükleniyor',
        'error', 'Bir hata oluştu',
        'empty', 'Kayıt bulunamadı',
        'updating', 'Güncelleniyor',
        'saving', 'Kaydediliyor'
      )
    ),
    'pages', JSON_OBJECT(
      'dashboard', JSON_OBJECT(
        'title', 'Panel',
        'subtitle', 'Genel durum ve hızlı sayılar.',
        'label_services', 'Hizmetler',
        'label_contacts', 'Mesajlar',
        'label_newsletter', 'Bülten',
        'label_email_templates', 'E-posta Şablonları',
        'label_site_settings', 'Site Ayarları',
        'label_custom_pages', 'Sayfalar',
        'label_menuitem', 'Menü Öğeleri',
        'label_footer_sections', 'Footer Bölümleri',
        'label_reviews', 'Yorumlar',
        'label_support', 'Destek',
        'label_users', 'Kullanıcılar',
        'label_storage', 'Dosyalar',
        'label_projects', 'Projeler',
        'label_pricing_plans', 'Fiyat Planları',
        'label_skillCounters', 'Yetenekler',
        'label_brandLogos', 'Markalar'
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
),
(
  UUID(),
  'ui_admin',
  'de',
  CAST(JSON_OBJECT(
    'app_name', 'GuezelWebDesign',
    'nav', JSON_OBJECT(
      'labels', JSON_OBJECT(
        'general', 'Allgemein',
        'content', 'Inhalt',
        'marketing', 'Marketing',
        'communication', 'Kommunikation',
        'system', 'System'
      ),
      'items', JSON_OBJECT(
        'dashboard', 'Dashboard',
        'site_settings', 'Seiteneinstellungen',
        'custom_pages', 'Seiten',
        'services', 'Leistungen',
        'projects', 'Projekte',
        'pricing', 'Preise',
        'brands', 'Marken',
        'resume', 'Lebenslauf',
        'skills', 'Skills',
        'menu_items', 'Menüpunkte',
        'footer_sections', 'Footer-Bereiche',
        'newsletter', 'Newsletter',
        'contacts', 'Nachrichten',
        'reviews', 'Bewertungen',
        'users', 'Benutzer',
        'email_templates', 'E-Mail-Vorlagen',
        'notifications', 'Benachrichtigungen',
        'storage', 'Dateien',
        'db', 'Datenbank'
      )
    ),
    'common', JSON_OBJECT(
      'actions', JSON_OBJECT(
        'create', 'Erstellen',
        'edit', 'Bearbeiten',
        'delete', 'Löschen',
        'save', 'Speichern',
        'cancel', 'Abbrechen',
        'refresh', 'Aktualisieren',
        'search', 'Suchen',
        'filter', 'Filtern',
        'close', 'Schließen',
        'back', 'Zurück',
        'confirm', 'Bestätigen'
      ),
      'states', JSON_OBJECT(
        'loading', 'Wird geladen',
        'error', 'Ein Fehler ist aufgetreten',
        'empty', 'Keine Einträge gefunden',
        'updating', 'Wird aktualisiert',
        'saving', 'Wird gespeichert'
      )
    ),
    'pages', JSON_OBJECT(
      'dashboard', JSON_OBJECT(
        'title', 'Dashboard',
        'subtitle', 'Übersicht und schnelle Kennzahlen.',
        'label_services', 'Leistungen',
        'label_contacts', 'Nachrichten',
        'label_newsletter', 'Newsletter',
        'label_email_templates', 'E-Mail-Vorlagen',
        'label_site_settings', 'Seiteneinstellungen',
        'label_custom_pages', 'Seiten',
        'label_menuitem', 'Menüpunkte',
        'label_footer_sections', 'Footer-Bereiche',
        'label_reviews', 'Bewertungen',
        'label_support', 'Support',
        'label_users', 'Benutzer',
        'label_storage', 'Dateien',
        'label_projects', 'Projekte',
        'label_pricing_plans', 'Preispläne',
        'label_skillCounters', 'Skills',
        'label_brandLogos', 'Marken'
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3),
  NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
