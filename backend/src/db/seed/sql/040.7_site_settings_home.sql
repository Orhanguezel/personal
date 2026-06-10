-- =============================================================
-- ADD: ui_home (localized) — home hero UI copy (tr/en/de)
-- =============================================================

INSERT INTO `site_settings` (`id`,`key`,`locale`,`value`,`created_at`,`updated_at`)
VALUES
(
  UUID(),
  'ui_home',
  'en',
  CAST(JSON_OBJECT(
    'home1', JSON_OBJECT(
      'greeting','👋 Hi there, I''m Orhan Güzel',
      'title_html','Building <span class="text-primary-1">production-ready</span> web platforms',
      'description','Full-stack web developer based in Grevenbroich, serving businesses in Neuss, Mönchengladbach, Düsseldorf and beyond. I build production-ready web platforms, e-commerce systems and operational applications.',
      'cta_primary','Download CV',
      'cta_secondary','Get in touch',
      'experience_label','15+ platforms live in production',
      'hero_image','/assets/imgs/guezel-showcase/workspace_guezel_web_design.webp',
      'hero_image_alt','Guezel Web Design showcase',
      'decor_image','/assets/imgs/hero/hero-1/decorate.png',
      'decor_image_alt','Decor'
    ),
    'home2', JSON_OBJECT(
      'greeting','Hey, I''m Orhan Güzel',
      'title_html','<span class="text-linear-4">Full-Stack</span> delivery for web &amp; app products<span class="flicker">_</span>',
      'description_html','&lt;p&gt;<span class="text-dark">At</span> <span class="text-secondary-2">guezelwebdesign.com</span><span class="text-dark">, I deliver admin panels, APIs, customer-facing apps and operational systems with</span> <span class="text-secondary-2">Next.js</span>, <span class="text-secondary-2">Fastify</span>, <span class="text-secondary-2">Laravel</span> <span class="text-dark">and</span> <span class="text-secondary-2">Flutter</span><span class="text-dark">.</span>&lt;/p&gt;',
      'more_label','...and more',
      'cv_label','[ Download my CV ]',
      'hero_image','/assets/imgs/guezel-showcase/storefront_guezel_web_design.webp',
      'hero_image_alt','Guezel Web Design showcase',
      'icon_image','/assets/imgs/home-page-2/hero-1/icon.svg',
      'icon_image_alt','Decor'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_home',
  'de',
  CAST(JSON_OBJECT(
    'home1', JSON_OBJECT(
      'greeting','👋 Hallo, ich bin Orhan Güzel',
      'title_html','Produktionsreife <span class="text-primary-1">Web-Plattformen</span> entwickeln',
      'description','Full-Stack Webentwickler aus Grevenbroich für Unternehmen in Neuss, Mönchengladbach, Düsseldorf und darüber hinaus. Ich entwickle produktionsreife Webplattformen, E-Commerce-Systeme und operative Anwendungen.',
      'cta_primary','CV herunterladen',
      'cta_secondary','Kontakt aufnehmen',
      'experience_label','15+ Plattformen live in Produktion',
      'hero_image','/assets/imgs/guezel-showcase/workspace_guezel_web_design.webp',
      'hero_image_alt','Guezel Web Design showcase',
      'decor_image','/assets/imgs/hero/hero-1/decorate.png',
      'decor_image_alt','Dekor'
    ),
    'home2', JSON_OBJECT(
      'greeting','Hey, ich bin Orhan Güzel',
      'title_html','<span class="text-linear-4">Full-Stack</span> Umsetzung für Web- &amp; App-Produkte<span class="flicker">_</span>',
      'description_html','&lt;p&gt;<span class="text-dark">Unter</span> <span class="text-secondary-2">guezelwebdesign.com</span><span class="text-dark"> liefere ich Admin Panels, APIs, Customer Apps und operative Systeme mit</span> <span class="text-secondary-2">Next.js</span>, <span class="text-secondary-2">Fastify</span>, <span class="text-secondary-2">Laravel</span> <span class="text-dark">und</span> <span class="text-secondary-2">Flutter</span><span class="text-dark">.</span>&lt;/p&gt;',
      'more_label','...und mehr',
      'cv_label','[ CV herunterladen ]',
      'hero_image','/assets/imgs/guezel-showcase/storefront_guezel_web_design.webp',
      'hero_image_alt','Guezel Web Design showcase',
      'icon_image','/assets/imgs/home-page-2/hero-1/icon.svg',
      'icon_image_alt','Dekor'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
),
(
  UUID(),
  'ui_home',
  'tr',
  CAST(JSON_OBJECT(
    'home1', JSON_OBJECT(
      'greeting','👋 Merhaba, ben Orhan Güzel',
      'title_html','Üretime hazır <span class="text-primary-1">web platformları</span> geliştiriyorum',
      'description','Grevenbroich merkezli full-stack web geliştiriciyim; Neuss, Mönchengladbach, Düsseldorf ve uzaktaki ekipler için üretime hazır web platformları, e-ticaret sistemleri ve operasyonel uygulamalar geliştiriyorum.',
      'cta_primary','CV indir',
      'cta_secondary','İletişime geç',
      'experience_label','15+ canlı platform',
      'hero_image','/assets/imgs/guezel-showcase/workspace_guezel_web_design.webp',
      'hero_image_alt','Guezel Web Design showcase',
      'decor_image','/assets/imgs/hero/hero-1/decorate.png',
      'decor_image_alt','Dekor'
    ),
    'home2', JSON_OBJECT(
      'greeting','Selam, ben Orhan Güzel',
      'title_html','Web ve app ürünleri için <span class="text-linear-4">full-stack</span> teslimat<span class="flicker">_</span>',
      'description_html','&lt;p&gt;<span class="text-dark">guezelwebdesign.com</span><span class="text-dark"> altında admin panel, API, müşteri uygulaması ve operasyon sistemleri geliştiriyorum;</span> <span class="text-secondary-2">Next.js</span>, <span class="text-secondary-2">Fastify</span>, <span class="text-secondary-2">Laravel</span> <span class="text-dark">ve</span> <span class="text-secondary-2">Flutter</span><span class="text-dark"> ile.</span>&lt;/p&gt;',
      'more_label','...ve daha fazlası',
      'cv_label','[ CV indir ]',
      'hero_image','/assets/imgs/guezel-showcase/storefront_guezel_web_design.webp',
      'hero_image_alt','Guezel Web Design showcase',
      'icon_image','/assets/imgs/home-page-2/hero-1/icon.svg',
      'icon_image_alt','Dekor'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
