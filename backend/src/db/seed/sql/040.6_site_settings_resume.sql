-- =============================================================
-- ADD: ui_resume (localized) — resume/education/experience UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_resume',
  'en',
  CAST(JSON_OBJECT(
    'resume1', JSON_OBJECT(
      'heading','My Resume',
      'intro_html','I believe that working hard and trying to learn every day will<br />make me improve in satisfying my customers.',
      'cta_label','Get in touch',
      'education_label','Education',
      'experience_label','Experience',
      'loading','Loading...',
      'error','Failed to load resume data.',
      'empty_education','No education entries found.',
      'empty_experience','No experience entries found.',
      'marquee_text','Branding . Marketing . User Interface'
    ),
    'education2', JSON_OBJECT(
      'heading','Education',
      'loading_label','Loading...',
      'loading_text','Please wait',
      'error_label','Failed',
      'error_text','Education data could not be loaded.',
      'empty_label','No entries',
      'empty_text','No education entries found.',
      'research_heading','Researched',
      'research_items', JSON_ARRAY(
        JSON_OBJECT(
          'year','2023-2024:',
          'title','Advanced Data Analytics with Big Data Tools',
          'description','Utilized big data tools for advanced analytics and insights.'
        ),
        JSON_OBJECT(
          'year','2021-2013:',
          'title','Cloud-Native Application Architectures',
          'description','Studied best practices for designing cloud-native applications.'
        ),
        JSON_OBJECT(
          'year','2019-2020:',
          'title','AI-Driven User Experience Personalization',
          'description','Leveraged AI to personalize user experiences based on behavior.'
        )
      )
    ),
    'experience2', JSON_OBJECT(
      'heading','Education',
      'loading_label','Loading...',
      'loading_text','Please wait',
      'error_label','Failed',
      'error_text','Education data could not be loaded.',
      'empty_label','No entries',
      'empty_text','No education entries found.',
      'research_heading','Researched',
      'research_items', JSON_ARRAY(
        JSON_OBJECT(
          'year','2023-2024:',
          'title','Advanced Data Analytics with Big Data Tools',
          'description','Utilized big data tools for advanced analytics and insights.'
        ),
        JSON_OBJECT(
          'year','2021-2013:',
          'title','Cloud-Native Application Architectures',
          'description','Studied best practices for designing cloud-native applications.'
        ),
        JSON_OBJECT(
          'year','2019-2020:',
          'title','AI-Driven User Experience Personalization',
          'description','Leveraged AI to personalize user experiences based on behavior.'
        )
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_resume',
  'de',
  CAST(JSON_OBJECT(
    'resume1', JSON_OBJECT(
      'heading','Mein Lebenslauf',
      'intro_html','Ich glaube, dass hartes Arbeiten und tägliches Lernen<br />mich darin verbessern, meine Kunden zufriedenzustellen.',
      'cta_label','Kontakt aufnehmen',
      'education_label','Ausbildung',
      'experience_label','Erfahrung',
      'loading','Wird geladen...',
      'error','Lebenslaufdaten konnten nicht geladen werden.',
      'empty_education','Keine Ausbildungseinträge gefunden.',
      'empty_experience','Keine Erfahrungseinträge gefunden.',
      'marquee_text','Branding . Marketing . Benutzeroberfläche'
    ),
    'education2', JSON_OBJECT(
      'heading','Ausbildung',
      'loading_label','Wird geladen...',
      'loading_text','Bitte warten',
      'error_label','Fehlgeschlagen',
      'error_text','Ausbildungsdaten konnten nicht geladen werden.',
      'empty_label','Keine Einträge',
      'empty_text','Keine Ausbildungseinträge gefunden.',
      'research_heading','Recherchiert',
      'research_items', JSON_ARRAY(
        JSON_OBJECT(
          'year','2023-2024:',
          'title','Erweiterte Datenanalyse mit Big-Data-Tools',
          'description','Big-Data-Tools für fortgeschrittene Analysen und Einblicke eingesetzt.'
        ),
        JSON_OBJECT(
          'year','2021-2013:',
          'title','Cloud-native Anwendungsarchitekturen',
          'description','Best Practices für das Design cloud-nativer Anwendungen untersucht.'
        ),
        JSON_OBJECT(
          'year','2019-2020:',
          'title','KI-gestützte Personalisierung der Nutzererfahrung',
          'description','KI genutzt, um Nutzererlebnisse basierend auf Verhalten zu personalisieren.'
        )
      )
    ),
    'experience2', JSON_OBJECT(
      'heading','Ausbildung',
      'loading_label','Wird geladen...',
      'loading_text','Bitte warten',
      'error_label','Fehlgeschlagen',
      'error_text','Ausbildungsdaten konnten nicht geladen werden.',
      'empty_label','Keine Einträge',
      'empty_text','Keine Ausbildungseinträge gefunden.',
      'research_heading','Recherchiert',
      'research_items', JSON_ARRAY(
        JSON_OBJECT(
          'year','2023-2024:',
          'title','Erweiterte Datenanalyse mit Big-Data-Tools',
          'description','Big-Data-Tools für fortgeschrittene Analysen und Einblicke eingesetzt.'
        ),
        JSON_OBJECT(
          'year','2021-2013:',
          'title','Cloud-native Anwendungsarchitekturen',
          'description','Best Practices für das Design cloud-nativer Anwendungen untersucht.'
        ),
        JSON_OBJECT(
          'year','2019-2020:',
          'title','KI-gestützte Personalisierung der Nutzererfahrung',
          'description','KI genutzt, um Nutzererlebnisse basierend auf Verhalten zu personalisieren.'
        )
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_resume',
  'tr',
  CAST(JSON_OBJECT(
    'resume1', JSON_OBJECT(
      'heading','Özgeçmişim',
      'intro_html','Her gün çalışıp öğrenmenin<br />müşterilerimi memnun etme konusunda beni geliştireceğine inanıyorum.',
      'cta_label','İletişime geç',
      'education_label','Eğitim',
      'experience_label','Deneyim',
      'loading','Yükleniyor...',
      'error','Özgeçmiş verileri yüklenemedi.',
      'empty_education','Eğitim kaydı bulunamadı.',
      'empty_experience','Deneyim kaydı bulunamadı.',
      'marquee_text','Markalama . Pazarlama . Kullanıcı Arayüzü'
    ),
    'education2', JSON_OBJECT(
      'heading','Eğitim',
      'loading_label','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'error_label','Başarısız',
      'error_text','Eğitim verileri yüklenemedi.',
      'empty_label','Kayıt yok',
      'empty_text','Eğitim kaydı bulunamadı.',
      'research_heading','Araştırmalar',
      'research_items', JSON_ARRAY(
        JSON_OBJECT(
          'year','2023-2024:',
          'title','Büyük Veri Araçlarıyla Gelişmiş Veri Analitiği',
          'description','Gelişmiş analizler ve içgörüler için büyük veri araçları kullanıldı.'
        ),
        JSON_OBJECT(
          'year','2021-2013:',
          'title','Bulut Yerel Uygulama Mimarileri',
          'description','Bulut yerel uygulamaları tasarlamak için en iyi uygulamalar incelendi.'
        ),
        JSON_OBJECT(
          'year','2019-2020:',
          'title','Yapay Zeka Destekli Kullanıcı Deneyimi Kişiselleştirme',
          'description','Davranışlara göre kullanıcı deneyimini kişiselleştirmek için yapay zeka kullanıldı.'
        )
      )
    ),
    'experience2', JSON_OBJECT(
      'heading','Eğitim',
      'loading_label','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'error_label','Başarısız',
      'error_text','Eğitim verileri yüklenemedi.',
      'empty_label','Kayıt yok',
      'empty_text','Eğitim kaydı bulunamadı.',
      'research_heading','Araştırmalar',
      'research_items', JSON_ARRAY(
        JSON_OBJECT(
          'year','2023-2024:',
          'title','Büyük Veri Araçlarıyla Gelişmiş Veri Analitiği',
          'description','Gelişmiş analizler ve içgörüler için büyük veri araçları kullanıldı.'
        ),
        JSON_OBJECT(
          'year','2021-2013:',
          'title','Bulut Yerel Uygulama Mimarileri',
          'description','Bulut yerel uygulamaları tasarlamak için en iyi uygulamalar incelendi.'
        ),
        JSON_OBJECT(
          'year','2019-2020:',
          'title','Yapay Zeka Destekli Kullanıcı Deneyimi Kişiselleştirme',
          'description','Davranışlara göre kullanıcı deneyimini kişiselleştirmek için yapay zeka kullanıldı.'
        )
      )
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
