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
      'heading','My Latest Works',
      'intro_html','I believe that working hard and trying to learn every day will<br />make me improve in satisfying my customers.',
      'cta_label','View All Projects',
      'cta_short_label','View All'
    ),
    'projects2', JSON_OBJECT(
      'badge','Projects',
      'heading','My Recent Works',
      'slide_title_html','Integrate AI into the <br /> ecommerce system',
      'slide_description','Developed an online learning platform with course management, quizzes, and progress tracking.',
      'info_label','Project Info',
      'client_label','Client',
      'completion_label','Completion Time',
      'technologies_label','Technologies',
      'live_demo_label','Live Demo',
      'github_label','View on Github',
      'sample_client','Conceptual JSC',
      'sample_completion','6 months',
      'sample_technologies','Node.js, React, MongoDB, Stripe'
    ),
    'work', JSON_OBJECT(
      'badge','Recent Work',
      'title_html','Explore <span class="text-300">My Latest Work and Discover the</span> Craftsmanship Behind <span class="text-300">Each Design</span>',
      'intro_html','Explore my latest work and discover the craftsmanship behind each design: <br />a detailed look into how I bring innovation and creativity to life',
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
      'gallery_label','Gallery'
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
      'heading','Meine neuesten Arbeiten',
      'intro_html','Ich glaube, dass hartes Arbeiten und tägliches Lernen<br />mich dabei verbessern, meine Kunden zufrieden zu stellen.',
      'cta_label','Alle Projekte anzeigen',
      'cta_short_label','Alle anzeigen'
    ),
    'projects2', JSON_OBJECT(
      'badge','Projekte',
      'heading','Meine jüngsten Arbeiten',
      'slide_title_html','KI in das <br />E-Commerce-System integrieren',
      'slide_description','Eine Online-Lernplattform mit Kursverwaltung, Quizzen und Fortschrittsverfolgung entwickelt.',
      'info_label','Projektinfo',
      'client_label','Kunde',
      'completion_label','Fertigstellungszeit',
      'technologies_label','Technologien',
      'live_demo_label','Live-Demo',
      'github_label','Auf GitHub ansehen',
      'sample_client','Conceptual JSC',
      'sample_completion','6 Monate',
      'sample_technologies','Node.js, React, MongoDB, Stripe'
    ),
    'work', JSON_OBJECT(
      'badge','Aktuelle Arbeiten',
      'title_html','Entdecken Sie <span class="text-300">meine neuesten Arbeiten und die</span> Handwerkskunst hinter <span class="text-300">jedem Design</span>',
      'intro_html','Entdecken Sie meine neuesten Arbeiten und die Handwerkskunst hinter jedem Design: <br />ein genauer Blick darauf, wie ich Innovation und Kreativität zum Leben erwecke',
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
      'gallery_label','Galerie'
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
      'heading','En Son Çalışmalarım',
      'intro_html','Çok çalışmanın ve her gün öğrenmeye çalışmanın<br />müşterilerimi memnun etme konusunda beni geliştireceğine inanıyorum.',
      'cta_label','Tüm Projeleri Gör',
      'cta_short_label','Tümünü Gör'
    ),
    'projects2', JSON_OBJECT(
      'badge','Projeler',
      'heading','Son Çalışmalarım',
      'slide_title_html','E-ticaret sistemine <br />Yapay Zeka entegre et',
      'slide_description','Kurs yönetimi, sınavlar ve ilerleme takibi içeren çevrim içi öğrenme platformu geliştirildi.',
      'info_label','Proje Bilgisi',
      'client_label','Müşteri',
      'completion_label','Tamamlanma Süresi',
      'technologies_label','Teknolojiler',
      'live_demo_label','Canlı Demo',
      'github_label','GitHub''da Gör',
      'sample_client','Conceptual JSC',
      'sample_completion','6 ay',
      'sample_technologies','Node.js, React, MongoDB, Stripe'
    ),
    'work', JSON_OBJECT(
      'badge','Son Çalışmalar',
      'title_html','<span class="text-300">En Son Çalışmalarımı ve</span> Her Tasarımın Arkasındaki <span class="text-300">İşçiliği</span> Keşfedin',
      'intro_html','En son çalışmalarımı ve her tasarımın arkasındaki işçiliği keşfedin: <br />yenilik ve yaratıcılığı nasıl hayata geçirdiğime detaylı bir bakış',
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
      'gallery_label','Galeri'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
