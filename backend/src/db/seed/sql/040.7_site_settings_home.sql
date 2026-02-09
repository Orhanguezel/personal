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
      'greeting','👋 Hi there, I''m Orhan Guzel',
      'title_html','Building <span class="text-primary-1">GWD</span> digital experiences',
      'description','Founder of GWD (guezelwebdesign.com). I help individuals and brands create user-focused digital products and interactive experiences.',
      'cta_primary','Download CV',
      'cta_secondary','Hire me',
      'experience_label','+ 12 years with professional design software',
      'hero_image','/assets/imgs/hero/hero-1/man.png',
      'hero_image_alt','Orhan Guzel',
      'decor_image','/assets/imgs/hero/hero-1/decorate.png',
      'decor_image_alt','Decor'
    ),
    'home2', JSON_OBJECT(
      'greeting','Hey, I''m Orhan Guzel',
      'title_html','Founder of <span class="text-linear-4">GWD</span> Web &amp; App Studio<span class="flicker">_</span>',
      'description_html','&lt;p&gt;<span class="text-dark">At</span> <span class="text-secondary-2">guezelwebdesign.com</span><span class="text-dark">, I build fast, reliable web and app experiences with</span> <span class="text-secondary-2">NodeJS</span>, <span class="text-secondary-2">React</span>, <span class="text-secondary-2">Angular</span>, and <span class="text-secondary-2">Laravel</span><span class="text-dark">.</span>&lt;/p&gt;',
      'more_label','...and more',
      'cv_label','[ Download my CV ]',
      'hero_image','assets/imgs/home-page-2/hero-1/people.png',
      'hero_image_alt','Orhan Guzel',
      'icon_image','assets/imgs/home-page-2/hero-1/icon.svg',
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
      'greeting','👋 Hallo, ich bin Orhan Guzel',
      'title_html','Digitale Erlebnisse für <span class="text-primary-1">GWD</span>',
      'description','Gründer von GWD (guezelwebdesign.com). Ich helfe Einzelpersonen und Marken, nutzerzentrierte digitale Produkte und interaktive Erlebnisse zu entwickeln.',
      'cta_primary','Lebenslauf herunterladen',
      'cta_secondary','Kontakt aufnehmen',
      'experience_label','+ 12 Jahre mit professioneller Designsoftware',
      'hero_image','/assets/imgs/hero/hero-1/man.png',
      'hero_image_alt','Orhan Guzel',
      'decor_image','/assets/imgs/hero/hero-1/decorate.png',
      'decor_image_alt','Dekor'
    ),
    'home2', JSON_OBJECT(
      'greeting','Hey, ich bin Orhan Guzel',
      'title_html','Gründer von <span class="text-linear-4">GWD</span> Web &amp; App Studio<span class="flicker">_</span>',
      'description_html','&lt;p&gt;<span class="text-dark">Bei</span> <span class="text-secondary-2">guezelwebdesign.com</span><span class="text-dark"> entwickle ich schnelle, zuverlässige Web- und App-Erlebnisse mit</span> <span class="text-secondary-2">NodeJS</span>, <span class="text-secondary-2">React</span>, <span class="text-secondary-2">Angular</span> und <span class="text-secondary-2">Laravel</span><span class="text-dark">.</span>&lt;/p&gt;',
      'more_label','...und mehr',
      'cv_label','[ Lebenslauf herunterladen ]',
      'hero_image','assets/imgs/home-page-2/hero-1/people.png',
      'hero_image_alt','Orhan Guzel',
      'icon_image','assets/imgs/home-page-2/hero-1/icon.svg',
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
      'greeting','👋 Merhaba, ben Orhan Guzel',
      'title_html','<span class="text-primary-1">GWD</span> için dijital deneyimler',
      'description','GWD (guezelwebdesign.com) kurucusuyum. Bireylerin ve markaların kullanıcı odaklı dijital ürünler ve etkileşimli deneyimler oluşturmasına yardımcı oluyorum.',
      'cta_primary','CV indir',
      'cta_secondary','Beni işe al',
      'experience_label','+ 12 yıl profesyonel tasarım yazılımlarıyla',
      'hero_image','/assets/imgs/hero/hero-1/man.png',
      'hero_image_alt','Orhan Guzel',
      'decor_image','/assets/imgs/hero/hero-1/decorate.png',
      'decor_image_alt','Dekor'
    ),
    'home2', JSON_OBJECT(
      'greeting','Selam, ben Orhan Guzel',
      'title_html','<span class="text-linear-4">GWD</span> Web &amp; App Studio kurucusu<span class="flicker">_</span>',
      'description_html','&lt;p&gt;<span class="text-dark">guezelwebdesign.com</span><span class="text-dark"> altında hızlı ve güvenilir web/app deneyimleri geliştiriyorum;</span> <span class="text-secondary-2">NodeJS</span>, <span class="text-secondary-2">React</span>, <span class="text-secondary-2">Angular</span> ve <span class="text-secondary-2">Laravel</span><span class="text-dark">.</span>&lt;/p&gt;',
      'more_label','...ve daha fazlası',
      'cv_label','[ CV indir ]',
      'hero_image','assets/imgs/home-page-2/hero-1/people.png',
      'hero_image_alt','Orhan Guzel',
      'icon_image','assets/imgs/home-page-2/hero-1/icon.svg',
      'icon_image_alt','Dekor'
    )
  ) AS CHAR CHARACTER SET utf8mb4),
  NOW(3), NOW(3)
)
ON DUPLICATE KEY UPDATE
  `value` = VALUES(`value`),
  `updated_at` = VALUES(`updated_at`);
