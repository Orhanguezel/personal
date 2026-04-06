-- =============================================================
-- ADD: ui_home3 (localized) — Home 3 UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_home3',
  'en',
  CAST(JSON_OBJECT(
    'hero', JSON_OBJECT(
      'badge','Full-Stack Delivery',
      'title_html','Building <span class="text-dark">production-ready systems</span> — Orhan',
      'description','Welcome to Guezel Web Design. I build business platforms, e-commerce systems and operational applications with a focus on clean architecture and reliable delivery.',
      'cv_label','Download CV',
      'cv_href','/assets/resume.pdf',
      'hire_label','Get in touch',
      'hire_href','#contact',
      'hero_image','/assets/imgs/home-page-3/hero/img-1.png',
      'hero_image_alt','Orhan Guzel',
      'signature_image','/assets/imgs/home-page-3/hero/signature.png',
      'signature_image_alt','Signature'
    ),
    'typical', JSON_OBJECT(
      'heading','Selected Projects',
      'empty','No projects yet.'
    ),
    'services', JSON_OBJECT(
      'heading','Core Services',
      'empty','No services yet.'
    ),
    'resume', JSON_OBJECT(
      'education_heading','Education',
      'awards_heading','Awards',
      'empty_education','No education entries.',
      'empty_awards','No awards yet.'
    ),
    'blog', JSON_OBJECT(
      'heading','From Blog',
      'empty','No posts yet.',
      'default_category','Inspiration'
    ),
    'testimonials', JSON_OBJECT(
      'heading','Testimonials',
      'empty','No testimonials yet.'
    ),
    'contact', JSON_OBJECT(
      'heading','Contact me',
      'form_title','Let''s connect',
      'phone','+49 172 384 6068',
      'email','orhanguzell@gmail.com',
      'skype','',
      'address','Grevenbroich',
      'map_href','https://www.google.com/maps?q=Grevenbroich'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_home3',
  'de',
  CAST(JSON_OBJECT(
    'hero', JSON_OBJECT(
      'badge','Full-Stack Delivery',
      'title_html','Produktionsreife <span class="text-dark">Systeme entwickeln</span> — Orhan',
      'description','Willkommen bei Guezel Web Design. Ich entwickle Business-Plattformen, E-Commerce-Systeme und operative Anwendungen mit Fokus auf saubere Architektur und verlässliche Delivery.',
      'cv_label','CV herunterladen',
      'cv_href','/assets/resume.pdf',
      'hire_label','Kontakt aufnehmen',
      'hire_href','#contact',
      'hero_image','/assets/imgs/home-page-3/hero/img-1.png',
      'hero_image_alt','Orhan Guzel',
      'signature_image','/assets/imgs/home-page-3/hero/signature.png',
      'signature_image_alt','Signatur'
    ),
    'typical', JSON_OBJECT(
      'heading','Ausgewählte Projekte',
      'empty','Noch keine Projekte.'
    ),
    'services', JSON_OBJECT(
      'heading','Kernleistungen',
      'empty','Noch keine Services.'
    ),
    'resume', JSON_OBJECT(
      'education_heading','Ausbildung',
      'awards_heading','Auszeichnungen',
      'empty_education','Keine Einträge vorhanden.',
      'empty_awards','Noch keine Auszeichnungen.'
    ),
    'blog', JSON_OBJECT(
      'heading','Aus dem Blog',
      'empty','Noch keine Beiträge.',
      'default_category','Inspiration'
    ),
    'testimonials', JSON_OBJECT(
      'heading','Testimonials',
      'empty','Noch keine Testimonials.'
    ),
    'contact', JSON_OBJECT(
      'heading','Kontakt',
      'form_title','Lass uns verbinden',
      'phone','+49 172 384 6068',
      'email','orhanguzell@gmail.com',
      'skype','',
      'address','Grevenbroich',
      'map_href','https://www.google.com/maps?q=Grevenbroich'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_home3',
  'tr',
  CAST(JSON_OBJECT(
    'hero', JSON_OBJECT(
      'badge','Full-Stack Delivery',
      'title_html','Üretime hazır <span class="text-dark">sistemler geliştiriyorum</span> — Orhan',
      'description','Guezel Web Design''e hoş geldin. Temiz mimari ve güvenilir teslimat odağıyla iş platformları, e-ticaret sistemleri ve operasyonel uygulamalar geliştiriyorum.',
      'cv_label','CV İndir',
      'cv_href','/assets/resume.pdf',
      'hire_label','İletişime geç',
      'hire_href','#contact',
      'hero_image','/assets/imgs/home-page-3/hero/img-1.png',
      'hero_image_alt','Orhan Guzel',
      'signature_image','/assets/imgs/home-page-3/hero/signature.png',
      'signature_image_alt','İmza'
    ),
    'typical', JSON_OBJECT(
      'heading','Seçilmiş Projeler',
      'empty','Henüz proje yok.'
    ),
    'services', JSON_OBJECT(
      'heading','Temel Hizmetler',
      'empty','Henüz hizmet yok.'
    ),
    'resume', JSON_OBJECT(
      'education_heading','Eğitim',
      'awards_heading','Ödüller',
      'empty_education','Eğitim kaydı bulunamadı.',
      'empty_awards','Henüz ödül yok.'
    ),
    'blog', JSON_OBJECT(
      'heading','Blogdan',
      'empty','Henüz içerik yok.',
      'default_category','İlham'
    ),
    'testimonials', JSON_OBJECT(
      'heading','Yorumlar',
      'empty','Henüz yorum yok.'
    ),
    'contact', JSON_OBJECT(
      'heading','İletişim',
      'form_title','Hadi Tanışalım',
      'phone','+49 172 384 6068',
      'email','orhanguzell@gmail.com',
      'skype','',
      'address','Grevenbroich',
      'map_href','https://www.google.com/maps?q=Grevenbroich'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
