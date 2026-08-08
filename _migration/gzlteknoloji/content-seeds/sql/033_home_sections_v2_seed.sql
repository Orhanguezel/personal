-- =============================================================
-- 033 — home sections v2 + ui layout + gzl-index2 preset
-- =============================================================

SET NAMES utf8mb4;

UPDATE `home_sections`
SET `is_active` = 0
WHERE `component_key` IN ('HeroNew','SalesChannelsSection','FeaturesNew','HomeIntroSection','AppDownloadSection');

INSERT INTO `home_sections` (`id`, `slug`, `label`, `component_key`, `order_index`, `is_active`, `config`) VALUES
('home-hero-v2', 'hero-v2', 'Hero v2', 'HeroV2', 10, 1, '{"image":"/assets/imgs/hero/hero-main.webp","image_alt":{"tr":"GZL Teknoloji — yazılım, otomasyon ve veri platformları","en":"GZL Teknoloji — software, automation and data platforms"},"eyebrow":"GZL Teknoloji","title":{"tr":"Yazılım, otomasyon ve dijital büyüme ekipleri kurarız","en":"We build software, automation and digital growth systems"},"subtitle":{"tr":"Kurumsal web, SaaS, lead otomasyonu ve GEO/SEO analizlerini tek teknik omurgada tasarlayıp geliştiririz.","en":"We design and build corporate web, SaaS, lead automation and GEO/SEO analytics on a single technical backbone."},"signature":"Build, measure, refine.","ctas":[{"label":{"tr":"Teklif al","en":"Get a quote"},"href":"/contact"},{"label":{"tr":"Hizmetleri incele","en":"Explore services"},"href":"/services"}],"tone":"dark"}'),
('home-marquee-v2', 'marquee-v2', 'Kayan teknoloji şeridi', 'MarqueeStrip', 20, 1, '{"items":["Next.js","Fastify","MySQL","SEO","GEO","Automation","SaaS","Analytics","Docker","TypeScript"],"tone":"deep"}'),
('home-corporate-v2', 'corporate-v2', 'Kurumsal band v2', 'CorporateBandV2', 30, 1, '{"eyebrow":{"tr":"Tek ekip, uçtan uca süreç","en":"One team, end-to-end"},"title":{"tr":"Fikirden canlı ürüne giden kısa yol","en":"The short path from idea to live product"},"body":{"tr":"Strateji, geliştirme, ölçümleme ve yayın sonrası iyileştirme döngüsünü tek ekip ritminde yürütürüz.","en":"We run strategy, development, measurement and post-launch improvement as a single team rhythm."},"stats":[{"value":"16+","label":{"tr":"hizmet paketi","en":"service packages"}},{"value":"27","label":{"tr":"portfolyo işi","en":"portfolio projects"}},{"value":"4.97","label":{"tr":"yayınlanabilir müşteri puanı","en":"published client rating"}}],"tone":"light"}'),
('home-services-v2', 'services-v2', 'Hizmetler v2', 'ServicesV2', 40, 1, '{"title":{"tr":"Hizmetler","en":"Services"},"tone":"dark"}'),
('home-experience-v2', 'experience-v2', 'Deneyim v2', 'ExperienceV2', 50, 1, '{"eyebrow":{"tr":"Çalışma modeli","en":"How we work"},"title":{"tr":"Net, ölçülebilir, üç aşamalı","en":"Clear, measurable, three-stage"},"body":{"tr":"Her proje keşiften üretime, üretimden sürekli iyileştirmeye uzanan görünür bir akışla ilerler.","en":"Every project follows a visible path from discovery to delivery and continuous improvement."},"milestones":[{"year":"01","title":{"tr":"Keşif","en":"Discovery"},"body":{"tr":"İş hedefi, kanal ve veri ihtiyacı netleşir.","en":"Business goals, channels and data needs are clarified."}},{"year":"02","title":{"tr":"Üretim","en":"Build"},"body":{"tr":"Arayüz, API, otomasyon ve içerik birlikte ilerler.","en":"UI, API, automation and content move forward together."}},{"year":"03","title":{"tr":"Büyüme","en":"Growth"},"body":{"tr":"Performans, SEO/GEO ve lead kalitesi düzenli ölçülür.","en":"Performance, SEO/GEO and lead quality are measured continuously."}}],"tone":"deep"}'),
('home-portfolio-v2', 'portfolio-v2', 'Portfolyo v2', 'PortfolioV2', 60, 1, '{"title":{"tr":"Seçili işler","en":"Selected work"},"tone":"light"}'),
('home-skills-v2', 'skills-v2', 'Yetkinlikler v2', 'SkillsV2', 70, 1, '{"eyebrow":{"tr":"Teknoloji omurgası","en":"Technology backbone"},"title":{"tr":"Doğru araç, sade mimari","en":"The right tool, a clear architecture"},"body":{"tr":"Ürünü yalnızca geliştirmiyor; ölçülebilir, sürdürülebilir ve büyümeye hazır bir teknik sistem kuruyoruz.","en":"We build more than the product: a measurable, maintainable technical system ready to grow."},"groups":[{"title":"Frontend","items":["Next.js","React","Tailwind","TypeScript"]},{"title":"Backend","items":["Fastify","MySQL","Drizzle","Docker"]},{"title":"Growth","items":["SEO","GEO","Analytics","Automation"]}],"tone":"dark"}'),
('home-testimonials-v2', 'testimonials-v2', 'Müşteri Yorumları v2', 'TestimonialsV2', 75, 1, '{"title":{"tr":"Ne dediler?","en":"What they say"},"tone":"light"}'),
('home-blog-v2', 'blog-v2', 'Blog v2', 'BlogV2', 80, 1, '{"posts":[],"tone":"light"}'),
('home-contact-v2', 'contact-v2', 'İletişim v2', 'ContactV2', 90, 1, '{"eyebrow":{"tr":"Birlikte başlayalım","en":"Start together"},"title":{"tr":"Projeyi birlikte netleştirelim","en":"Let''s scope your project together"},"body":{"tr":"İhtiyacınızı, hedefinizi ve teslim önceliğinizi yazın; kapsamı teknik olarak sadeleştirip dönüş yapalım.","en":"Tell us your needs, goals and delivery priority; we''ll simplify the scope technically and get back to you."},"points":[{"tr":"Net kapsam ve gerçekçi teslim planı","en":"Clear scope and realistic delivery plan"},{"tr":"İhtiyaca uygun teknoloji seçimi","en":"Technology choices matched to your needs"},{"tr":"Yayın sonrası ölçüm ve destek","en":"Post-launch measurement and support"}],"tone":"deep"}')
ON DUPLICATE KEY UPDATE
  `label` = VALUES(`label`),
  `component_key` = VALUES(`component_key`),
  `order_index` = VALUES(`order_index`),
  `is_active` = VALUES(`is_active`),
  `config` = VALUES(`config`);

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-ui-layout', 'ui_layout', '*', '{"header_style":"v1","footer_style":"v1"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

SET @gzl_index2_preset = JSON_OBJECT(
  'id', 'gzl-index2',
  'label', 'Index-2 (koyu/acik ritim)',
  'description', 'Koyu ve acik bant ritmi; portfolio ve hizmet odakli v2 ana sayfa.',
  'preview', JSON_OBJECT('primary', '#22c55e', 'bg', '#08110d', 'text', '#f4f7f2', 'accent', '#d6b25e'),
  'tokens', JSON_OBJECT(
    'version', '2',
    'colors', JSON_OBJECT(
      'brand_primary', '#22c55e',
      'brand_primary_dark', '#15803d',
      'brand_primary_light', '#86efac',
      'brand_secondary', '#d6b25e',
      'brand_secondary_dim', '#a68a45',
      'brand_secondary_light', '#f2d37d',
      'brand_accent', '#38bdf8',
      'bg_base', '#08110d',
      'bg_deep', '#020604',
      'bg_surface', '#f8faf7',
      'bg_surface_high', '#ffffff',
      'text_primary', '#f4f7f2',
      'text_secondary', '#c9d7cf',
      'text_muted', '#8fa099',
      'text_muted_soft', '#72837c',
      'border', 'rgba(214,178,94,0.28)',
      'border_soft', 'rgba(214,178,94,0.14)',
      'success', '#22c55e',
      'warning', '#d6b25e',
      'error', '#ef4444',
      'info', '#38bdf8',
      'bg_base_dark', '#020604',
      'bg_deep_dark', '#000000',
      'bg_surface_dark', '#0f1f18',
      'bg_surface_high_dark', '#172b22',
      'text_primary_dark', '#f4f7f2',
      'text_secondary_dark', '#c9d7cf',
      'text_muted_dark', '#8fa099'
    ),
    'typography', JSON_OBJECT(
      'font_display', 'var(--font-pj), system-ui, sans-serif',
      'font_serif', 'var(--font-source-serif), Georgia, serif',
      'font_sans', 'var(--font-pj), system-ui, sans-serif',
      'font_mono', 'var(--font-ibm-mono), ui-monospace, monospace',
      'base_size', '16px'
    ),
    'radius', JSON_OBJECT('xs','4px','sm','8px','md','12px','lg','16px','xl','20px','pill','9999px'),
    'shadows', JSON_OBJECT(
      'soft', '0 2px 20px rgba(34,197,94,0.08)',
      'card', '0 8px 40px rgba(2,6,4,0.16)',
      'glow_primary', '0 0 60px rgba(34,197,94,0.2)',
      'glow_gold', '0 0 36px rgba(214,178,94,0.18)'
    ),
    'branding', JSON_OBJECT(
      'app_name', 'GZL Teknoloji',
      'tagline', 'Koyu/acik ritimli teknoloji vitrini.',
      'tagline_en', 'Dark/light rhythm technology showcase.',
      'logo_url', '/uploads/site-media/logo_transparent.png',
      'favicon_url', '/uploads/site-media/favicon.png',
      'theme_color', '#08110d',
      'theme_color_dark', '#020604',
      'og_image_url', '/img/og-default.jpg'
    )
  )
);

UPDATE `site_settings`
SET `value` = CASE
  WHEN JSON_SEARCH(CAST(`value` AS JSON), 'one', 'gzl-index2', NULL, '$[*].id') IS NULL
    THEN JSON_UNQUOTE(JSON_ARRAY_APPEND(CAST(`value` AS JSON), '$', CAST(@gzl_index2_preset AS JSON)))
  ELSE `value`
END
WHERE `key` = 'theme_presets' AND `locale` = '*';
