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
      'badge','Designing Experiences, Building Brands',
      'title_html','Crafting Products <span class="text-dark">with Purpose</span> — Orhan',
      'description','Welcome to GWD. I design and build modern web experiences that are fast, elegant, and conversion-focused.',
      'cv_label','Download CV',
      'cv_href','/assets/resume.pdf',
      'hire_label','Hire me',
      'hire_href','#contact',
      'hero_image','/assets/imgs/home-page-3/hero/img-1.png',
      'hero_image_alt','Orhan Guzel',
      'signature_image','/assets/imgs/home-page-3/hero/signature.png',
      'signature_image_alt','Signature'
    ),
    'typical', JSON_OBJECT(
      'heading','Typical Works',
      'empty','No projects yet.'
    ),
    'services', JSON_OBJECT(
      'heading','My Services',
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
      'phone','+49 000 000 00 00',
      'email','contact@guezelwebdesign.com',
      'skype','GuezelWebDesign',
      'address','Berlin, Germany',
      'map_href','https://www.google.com/maps?q=Berlin'
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
      'badge','Erlebnisse gestalten, Marken aufbauen',
      'title_html','Produkte mit <span class="text-dark">Purpose</span> — Orhan',
      'description','Willkommen bei GWD. Ich entwickle moderne Web-Erlebnisse, die schnell, elegant und conversion-stark sind.',
      'cv_label','Lebenslauf herunterladen',
      'cv_href','/assets/resume.pdf',
      'hire_label','Kontakt aufnehmen',
      'hire_href','#contact',
      'hero_image','/assets/imgs/home-page-3/hero/img-1.png',
      'hero_image_alt','Orhan Guzel',
      'signature_image','/assets/imgs/home-page-3/hero/signature.png',
      'signature_image_alt','Signatur'
    ),
    'typical', JSON_OBJECT(
      'heading','Typische Arbeiten',
      'empty','Noch keine Projekte.'
    ),
    'services', JSON_OBJECT(
      'heading','Meine Services',
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
      'phone','+49 000 000 00 00',
      'email','contact@guezelwebdesign.com',
      'skype','GuezelWebDesign',
      'address','Berlin, Deutschland',
      'map_href','https://www.google.com/maps?q=Berlin'
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
      'badge','Deneyimler Tasarlıyor, Markaları Büyütüyoruz',
      'title_html','Amaç Odaklı <span class="text-dark">Dijital Ürünler</span> — Orhan',
      'description','GWD dünyasına hoş geldiniz. Hızlı, şık ve dönüşüm odaklı web deneyimleri tasarlıyorum.',
      'cv_label','CV İndir',
      'cv_href','/assets/resume.pdf',
      'hire_label','Beni işe al',
      'hire_href','#contact',
      'hero_image','/assets/imgs/home-page-3/hero/img-1.png',
      'hero_image_alt','Orhan Guzel',
      'signature_image','/assets/imgs/home-page-3/hero/signature.png',
      'signature_image_alt','İmza'
    ),
    'typical', JSON_OBJECT(
      'heading','Öne Çıkan İşler',
      'empty','Henüz proje yok.'
    ),
    'services', JSON_OBJECT(
      'heading','Hizmetlerim',
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
      'phone','+49 000 000 00 00',
      'email','contact@guezelwebdesign.com',
      'skype','GuezelWebDesign',
      'address','Berlin, Almanya',
      'map_href','https://www.google.com/maps?q=Berlin'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
