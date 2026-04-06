-- =============================================================
-- ADD: ui_project (localized) — projects/work UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_project',
  'en',
  CAST(JSON_OBJECT(
    'projects1', JSON_OBJECT(
      'heading','Selected Projects',
      'intro_html','A focused portfolio of production-ready platforms, commerce systems<br />and operational applications built with modern full-stack tools.',
      'cta_label','View All Projects',
      'cta_short_label','View All'
    ),
    'projects2', JSON_OBJECT(
      'badge','Projects',
      'heading','Recent Work',
      'slide_title_html','Building <br />production-ready platforms',
      'slide_description','Selected work across commerce, B2B, booking, ERP and service platforms.',
      'info_label','Project Info',
      'client_label','Client',
      'completion_label','Completion Time',
      'technologies_label','Technologies',
      'live_demo_label','Live Demo',
      'github_label','View on Github',
      'sample_client','Own products / freelance delivery',
      'sample_completion','Active portfolio',
      'sample_technologies','Next.js, Fastify, Laravel, Flutter, MySQL'
    ),
    'work', JSON_OBJECT(
      'badge','Project Portfolio',
      'title_html','Explore <span class="text-300">production-ready systems</span> across commerce, operations and <span class="text-300">business workflows</span>',
      'intro_html','Selected case studies and active products covering e-commerce, B2B, ERP, booking, logistics and service operations.',
      'loading_title','Loading...',
      'label_client','Client',
      'label_completion_time','Completion Time',
      'label_tools','Tools',
      'updating','Updating...',
      'empty_title','No projects found',
      'empty_text','Please add projects from admin panel.'
    ),
    'detail', JSON_OBJECT(
      'loading','Loading...',
      'not_found','Not found',
      'slug_prefix','slug:',
      'slug_missing','slug missing',
      'badge','work details',
      'label_client','Client',
      'label_start','Start',
      'label_complete','Complete',
      'label_services','Services',
      'label_website','Website',
      'description_label','Description',
      'tools_label','Tools',
      'key_features_label','Key Features',
      'technologies_used_label','Technologies Used',
      'design_highlights_label','Design Highlights',
      'details_label','Details',
      'gallery_label','Gallery',
      'case_study_title','Case study',
      'case_study_challenge_label','Challenge',
      'case_study_approach_label','Approach',
      'case_study_outcome_label','Outcome',
      'price_label','Price',
      'purchase_label','Buy now'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_project',
  'de',
  CAST(JSON_OBJECT(
    'projects1', JSON_OBJECT(
      'heading','Ausgewählte Projekte',
      'intro_html','Ein fokussiertes Portfolio aus produktionsreifen Plattformen, Commerce-Systemen<br />und operativen Anwendungen mit modernen Full-Stack-Tools.',
      'cta_label','Alle Projekte anzeigen',
      'cta_short_label','Alle anzeigen'
    ),
    'projects2', JSON_OBJECT(
      'badge','Projekte',
      'heading','Aktuelle Arbeiten',
      'slide_title_html','Produktionsreife <br />Plattformen entwickeln',
      'slide_description','Ausgewählte Projekte aus Commerce, B2B, Booking, ERP und Service-Plattformen.',
      'info_label','Projektinfo',
      'client_label','Kunde',
      'completion_label','Fertigstellungszeit',
      'technologies_label','Technologien',
      'live_demo_label','Live-Demo',
      'github_label','Auf GitHub ansehen',
      'sample_client','Eigene Produkte / Freelance Delivery',
      'sample_completion','Aktives Portfolio',
      'sample_technologies','Next.js, Fastify, Laravel, Flutter, MySQL'
    ),
    'work', JSON_OBJECT(
      'badge','Projektportfolio',
      'title_html','Entdecken Sie <span class="text-300">produktionsreife Systeme</span> für Commerce, Operations und <span class="text-300">Business-Workflows</span>',
      'intro_html','Ausgewählte Case Studies und aktive Produkte aus E-Commerce, B2B, ERP, Booking, Logistik und Service-Operations.',
      'loading_title','Wird geladen...',
      'label_client','Kunde',
      'label_completion_time','Fertigstellungszeit',
      'label_tools','Tools',
      'updating','Aktualisiere...',
      'empty_title','Keine Projekte gefunden',
      'empty_text','Bitte Projekte im Admin-Panel hinzufügen.'
    ),
    'detail', JSON_OBJECT(
      'loading','Wird geladen...',
      'not_found','Nicht gefunden',
      'slug_prefix','slug:',
      'slug_missing','slug fehlt',
      'badge','Projekt-Details',
      'label_client','Kunde',
      'label_start','Start',
      'label_complete','Fertig',
      'label_services','Leistungen',
      'label_website','Website',
      'description_label','Beschreibung',
      'tools_label','Tools',
      'key_features_label','Hauptfunktionen',
      'technologies_used_label','Verwendete Technologien',
      'design_highlights_label','Design-Highlights',
      'details_label','Details',
      'gallery_label','Galerie',
      'case_study_title','Fallstudie',
      'case_study_challenge_label','Challenge',
      'case_study_approach_label','Vorgehen',
      'case_study_outcome_label','Ergebnis',
      'price_label','Preis',
      'purchase_label','Jetzt kaufen'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_project',
  'tr',
  CAST(JSON_OBJECT(
    'projects1', JSON_OBJECT(
      'heading','Seçilmiş Projeler',
      'intro_html','Modern full-stack araçlarla geliştirilen üretime hazır platformlar,<br />ticaret sistemleri ve operasyonel uygulamalardan seçmeler.',
      'cta_label','Tüm Projeleri Gör',
      'cta_short_label','Tümünü Gör'
    ),
    'projects2', JSON_OBJECT(
      'badge','Projeler',
      'heading','Güncel Çalışmalar',
      'slide_title_html','Üretime hazır <br />platformlar geliştiriyorum',
      'slide_description','Commerce, B2B, booking, ERP ve service platformlarından seçilmiş projeler.',
      'info_label','Proje Bilgisi',
      'client_label','Müşteri',
      'completion_label','Tamamlanma Süresi',
      'technologies_label','Teknolojiler',
      'live_demo_label','Canlı Demo',
      'github_label','GitHub''da Gör',
      'sample_client','Kendi ürünlerim / freelance teslimler',
      'sample_completion','Aktif portföy',
      'sample_technologies','Next.js, Fastify, Laravel, Flutter, MySQL'
    ),
    'work', JSON_OBJECT(
      'badge','Proje Portföyü',
      'title_html','<span class="text-300">Commerce, operasyon ve</span> iş süreçleri için geliştirdiğim <span class="text-300">sistemleri</span> keşfet',
      'intro_html','E-ticaret, B2B, ERP, booking, lojistik ve service operasyonları için geliştirdiğim seçilmiş case study ve aktif ürünler.',
      'loading_title','Yükleniyor...',
      'label_client','Müşteri',
      'label_completion_time','Tamamlanma Süresi',
      'label_tools','Araçlar',
      'updating','Güncelleniyor...',
      'empty_title','Proje bulunamadı',
      'empty_text','Lütfen admin panelinden proje ekleyin.'
    ),
    'detail', JSON_OBJECT(
      'loading','Yükleniyor...',
      'not_found','Bulunamadı',
      'slug_prefix','slug:',
      'slug_missing','slug yok',
      'badge','proje detayları',
      'label_client','Müşteri',
      'label_start','Başlangıç',
      'label_complete','Bitiş',
      'label_services','Hizmetler',
      'label_website','Web Sitesi',
      'description_label','Açıklama',
      'tools_label','Araçlar',
      'key_features_label','Öne Çıkan Özellikler',
      'technologies_used_label','Kullanılan Teknolojiler',
      'design_highlights_label','Tasarım Öne Çıkanları',
      'details_label','Detaylar',
      'gallery_label','Galeri',
      'case_study_title','Vaka çalışması',
      'case_study_challenge_label','Challenge',
      'case_study_approach_label','Yaklaşım',
      'case_study_outcome_label','Sonuç',
      'price_label','Fiyat',
      'purchase_label','Satın al'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
