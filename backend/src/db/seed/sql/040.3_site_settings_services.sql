-- =============================================================
-- ADD: ui_services (localized) — services UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_services',
  'en',
  CAST(JSON_OBJECT(
    'page', JSON_OBJECT(
      'badge','My Services',
      'title_html','Transforming Ideas <span class="text-300">into Intuitive Designs for</span> Engaging User <span class="text-300">Experiences</span>',
      'intro_html','With expertise in mobile app and web design, I transform ideas into visually <br /> stunning and user-friendly interfaces that captivate and retain users. <br /> Explore my work and see design in action.',
      'tagline_fallback','Creative. Unique. Reality.',
      'card_fallback_title','Untitled',
      'loading','Loading...',
      'error','Failed to load services.',
      'empty','No services found.',
      'highlight_label','Highlight',
      'details_label','Details'
    ),
    'section1', JSON_OBJECT(
      'heading','What do I offer?',
      'intro_html','My journey started with a fascination for design and technology,<br />leading me to specialize in UI/UX design',
      'error','Failed to load services.',
      'cta_label','Get a Quote',
      'empty','No services found.',
      'loading_title','Loading...',
      'loading_text','Please wait',
      'card_fallback_title','Untitled'
    ),
    'section2', JSON_OBJECT(
      'badge','Cooperation',
      'title_html','Designing solutions <span class="text-300">customized<br />to meet your requirements</span>',
      'error','Failed to load services.',
      'learn_more','Learn more',
      'empty','No services found.',
      'loading_title','Loading...',
      'loading_text','Please wait',
      'card_fallback_title','Untitled',
      'footer_text_html','Excited to take on <span class="text-dark">new projects</span> and collaborate.<br />Let''s chat about your ideas.',
      'footer_link_label','Reach out!'
    ),
    'detail', JSON_OBJECT(
      'back_label','Back to Services',
      'loading','Loading...',
      'error','Failed to load service.',
      'highlight_label','Highlight',
      'details_label','Details',
      'description_label','Description',
      'gallery_label','Gallery',
      'gallery_loading','Loading...',
      'gallery_empty','No gallery images.',
      'not_found','Service not found.',
      'title_fallback','Service',
      'tagline_fallback','Creative. Unique. Reality.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_services',
  'de',
  CAST(JSON_OBJECT(
    'page', JSON_OBJECT(
      'badge','Meine Leistungen',
      'title_html','Ich verwandle Ideen <span class="text-300">in intuitive Designs</span> für fesselnde <span class="text-300">Nutzererlebnisse</span>',
      'intro_html','Mit Erfahrung in Mobile- und Webdesign verwandle ich Ideen in visuell <br /> ansprechende und benutzerfreundliche Interfaces, die begeistern. <br /> Entdecken Sie meine Arbeiten und sehen Sie Design in Aktion.',
      'tagline_fallback','Kreativ. Einzigartig. Echt.',
      'card_fallback_title','Ohne Titel',
      'loading','Wird geladen...',
      'error','Services konnten nicht geladen werden.',
      'empty','Keine Services gefunden.',
      'highlight_label','Highlight',
      'details_label','Details'
    ),
    'section1', JSON_OBJECT(
      'heading','Was biete ich an?',
      'intro_html','Meine Reise begann mit einer Faszination für Design und Technologie,<br />was mich zur Spezialisierung auf UI/UX-Design führte',
      'error','Services konnten nicht geladen werden.',
      'cta_label','Angebot anfordern',
      'empty','Keine Services gefunden.',
      'loading_title','Wird geladen...',
      'loading_text','Bitte warten',
      'card_fallback_title','Ohne Titel'
    ),
    'section2', JSON_OBJECT(
      'badge','Zusammenarbeit',
      'title_html','Lösungen gestalten <span class="text-300">maßgeschneidert<br />für Ihre Anforderungen</span>',
      'error','Services konnten nicht geladen werden.',
      'learn_more','Mehr erfahren',
      'empty','Keine Services gefunden.',
      'loading_title','Wird geladen...',
      'loading_text','Bitte warten',
      'card_fallback_title','Ohne Titel',
      'footer_text_html','Ich freue mich auf <span class="text-dark">neue Projekte</span> und Zusammenarbeit.<br />Lassen Sie uns über Ihre Ideen sprechen.',
      'footer_link_label','Kontakt aufnehmen!'
    ),
    'detail', JSON_OBJECT(
      'back_label','Zurück zu Services',
      'loading','Wird geladen...',
      'error','Service konnte nicht geladen werden.',
      'highlight_label','Highlight',
      'details_label','Details',
      'description_label','Beschreibung',
      'gallery_label','Galerie',
      'gallery_loading','Wird geladen...',
      'gallery_empty','Keine Galeriebilder.',
      'not_found','Service nicht gefunden.',
      'title_fallback','Service',
      'tagline_fallback','Kreativ. Einzigartig. Echt.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_services',
  'tr',
  CAST(JSON_OBJECT(
    'page', JSON_OBJECT(
      'badge','Hizmetlerim',
      'title_html','Fikirleri <span class="text-300">sezgisel tasarımlarla</span> etkileyici kullanıcı <span class="text-300">deneyimlerine</span> dönüştürüyorum',
      'intro_html','Mobil uygulama ve web tasarımındaki uzmanlığımla fikirleri görsel açıdan etkileyici <br /> ve kullanıcı dostu arayüzlere dönüştürüyorum. <br /> Çalışmalarımı keşfedin ve tasarımı aksiyonda görün.',
      'tagline_fallback','Yaratıcı. Özgün. Gerçek.',
      'card_fallback_title','Başlıksız',
      'loading','Yükleniyor...',
      'error','Hizmetler yüklenemedi.',
      'empty','Hizmet bulunamadı.',
      'highlight_label','Öne Çıkan',
      'details_label','Detaylar'
    ),
    'section1', JSON_OBJECT(
      'heading','Neler sunuyorum?',
      'intro_html','Tasarım ve teknolojiye olan ilgimle başlayan yolculuğum<br />beni UI/UX tasarımında uzmanlaşmaya yönlendirdi',
      'error','Hizmetler yüklenemedi.',
      'cta_label','Teklif Al',
      'empty','Hizmet bulunamadı.',
      'loading_title','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'card_fallback_title','Başlıksız'
    ),
    'section2', JSON_OBJECT(
      'badge','İş Birliği',
      'title_html','İhtiyaçlarınıza uygun <span class="text-300">özel tasarlanmış<br />çözümler</span>',
      'error','Hizmetler yüklenemedi.',
      'learn_more','Detaylar',
      'empty','Hizmet bulunamadı.',
      'loading_title','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'card_fallback_title','Başlıksız',
      'footer_text_html','Yeni <span class="text-dark">projeler</span> ve iş birlikleri için heyecanlıyım.<br />Fikirlerini konuşalım.',
      'footer_link_label','İletişime geç!'
    ),
    'detail', JSON_OBJECT(
      'back_label','Hizmetlere Dön',
      'loading','Yükleniyor...',
      'error','Hizmet yüklenemedi.',
      'highlight_label','Öne Çıkan',
      'details_label','Detaylar',
      'description_label','Açıklama',
      'gallery_label','Galeri',
      'gallery_loading','Yükleniyor...',
      'gallery_empty','Galeride görsel yok.',
      'not_found','Hizmet bulunamadı.',
      'title_fallback','Hizmet',
      'tagline_fallback','Yaratıcı. Özgün. Gerçek.'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
