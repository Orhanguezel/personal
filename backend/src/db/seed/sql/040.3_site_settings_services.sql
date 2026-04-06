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
      'badge','Services',
      'title_html','From <span class="text-300">idea and architecture</span> to production-ready <span class="text-300">web platforms</span>',
      'intro_html','I build full-stack systems for commerce, operations and business workflows. <br /> The focus is clean architecture, reliable APIs, maintainable frontends and real delivery.',
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
      'intro_html','End-to-end product delivery for web applications, admin panels, APIs,<br />e-commerce and internal business systems',
      'error','Failed to load services.',
      'cta_label','Get a Quote',
      'empty','No services found.',
      'loading_title','Loading...',
      'loading_text','Please wait',
      'card_fallback_title','Untitled'
    ),
    'section2', JSON_OBJECT(
      'badge','Collaboration',
      'title_html','Building solutions <span class="text-300">tailored<br />to your real workflow</span>',
      'error','Failed to load services.',
      'learn_more','Learn more',
      'empty','No services found.',
      'loading_title','Loading...',
      'loading_text','Please wait',
      'card_fallback_title','Untitled',
      'footer_text_html','Open to <span class="text-dark">remote and hybrid projects</span> across Germany and Europe.<br />Let''s discuss scope, stack and delivery.',
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
      'badge','Leistungen',
      'title_html','Von <span class="text-300">Idee und Architektur</span> bis zur produktionsreifen <span class="text-300">Web-Plattform</span>',
      'intro_html','Ich entwickle Full-Stack-Systeme für Commerce, Operations und Business-Workflows. <br /> Im Fokus stehen saubere Architektur, verlässliche APIs und wartbare Frontends.',
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
      'intro_html','End-to-End Umsetzung für Webanwendungen, Admin Panels, APIs,<br />E-Commerce und interne Business-Systeme',
      'error','Services konnten nicht geladen werden.',
      'cta_label','Angebot anfordern',
      'empty','Keine Services gefunden.',
      'loading_title','Wird geladen...',
      'loading_text','Bitte warten',
      'card_fallback_title','Ohne Titel'
    ),
    'section2', JSON_OBJECT(
      'badge','Zusammenarbeit',
      'title_html','Lösungen entwickeln <span class="text-300">passend<br />zu Ihrem realen Workflow</span>',
      'error','Services konnten nicht geladen werden.',
      'learn_more','Mehr erfahren',
      'empty','Keine Services gefunden.',
      'loading_title','Wird geladen...',
      'loading_text','Bitte warten',
      'card_fallback_title','Ohne Titel',
      'footer_text_html','Offen für <span class="text-dark">Remote- und Hybrid-Projekte</span> in Deutschland und Europa.<br />Lassen Sie uns über Scope, Stack und Delivery sprechen.',
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
      'badge','Hizmetler',
      'title_html','<span class="text-300">Fikir ve mimariden</span> üretime hazır <span class="text-300">web platformlarına</span>',
      'intro_html','Ticaret, operasyon ve iş süreçleri için full-stack sistemler geliştiriyorum. <br /> Odak noktam temiz mimari, güvenilir API katmanı ve sürdürülebilir frontend yapısı.',
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
      'intro_html','Web uygulamaları, admin panelleri, API''ler,<br />e-ticaret altyapıları ve iç operasyon sistemleri için uçtan uca geliştirme',
      'error','Hizmetler yüklenemedi.',
      'cta_label','Teklif Al',
      'empty','Hizmet bulunamadı.',
      'loading_title','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'card_fallback_title','Başlıksız'
    ),
    'section2', JSON_OBJECT(
      'badge','İş Birliği',
      'title_html','Gerçek iş akışınıza uygun <span class="text-300">özelleştirilmiş<br />çözümler</span>',
      'error','Hizmetler yüklenemedi.',
      'learn_more','Detaylar',
      'empty','Hizmet bulunamadı.',
      'loading_title','Yükleniyor...',
      'loading_text','Lütfen bekleyin',
      'card_fallback_title','Başlıksız',
      'footer_text_html','Almanya ve Avrupa genelinde <span class="text-dark">remote ve hybrid projelere</span> açığım.<br />Kapsamı, teknolojiyi ve teslim planını konuşalım.',
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
