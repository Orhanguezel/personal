-- 221_projects_seeder_en.sql
-- Seed: Projects + I18n + Gallery (EN) — FULL (no empty client/time/tools/website)
-- Requires: 220_projects.sql applied
-- Notes:
--  - services, techs are LONGTEXT => store JSON-string (use CAST(JSON_ARRAY(...) AS CHAR))
--  - summary/content are LONGTEXT => store JSON text (use CAST(... AS CHAR))
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- UUID variables (stable inside this transaction)
-- =============================================================
SET @p1 := UUID();
SET @p2 := UUID();
SET @p3 := UUID();
SET @p4 := UUID();

SET @pi18n1 := UUID();
SET @pi18n2 := UUID();
SET @pi18n3 := UUID();
SET @pi18n4 := UUID();

SET @img1 := UUID();
SET @img2 := UUID();
SET @img3 := UUID();
SET @img4 := UUID();

SET @imgI18n1 := UUID();
SET @imgI18n2 := UUID();
SET @imgI18n3 := UUID();
SET @imgI18n4 := UUID();

SET @asset1 := UUID();
SET @asset2 := UUID();
SET @asset3 := UUID();
SET @asset4 := UUID();

-- =============================================================
-- PROJECTS (parent) — FULL fields (NO nulls for website/time/tools/client)
-- =============================================================
INSERT INTO `projects` (
  `id`,
  `is_published`, `is_featured`, `display_order`,
  `featured_image`, `featured_image_asset_id`,
  `demo_url`, `repo_url`,
  `category`, `client_name`,
  `start_date`, `complete_date`,
  `completion_time_label`,
  `services`, `website_url`,
  `techs`,
  `created_at`, `updated_at`
) VALUES
(
  @p1,
  1, 1, 1,
  '/assets/imgs/work/img-1.png', @asset1,
  'https://example.com/demo/ecommerce-redesign', 'https://github.com/example/ecommerce-redesign',
  'UI/UX', 'Conceptual JSC',
  '2025-06-01', '2025-12-01',
  '6 months',
  CAST(JSON_ARRAY('UI/UX Design') AS CHAR),
  'https://example.com/ecommerce-redesign',
  CAST(JSON_ARRAY('Figma','Sketch','Photoshop','Framer') AS CHAR),
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @p2,
  1, 1, 2,
  '/assets/imgs/work/img-2.png', @asset2,
  'https://example.com/demo/fitness-app', 'https://github.com/example/fitness-app-uiux',
  'APP DESIGN', 'Conceptual JSC',
  '2025-03-01', '2025-09-01',
  '6 months',
  CAST(JSON_ARRAY('App Design','UI/UX Design') AS CHAR),
  'https://example.com/fitness-app',
  CAST(JSON_ARRAY('Figma','Sketch','Photoshop','Framer') AS CHAR),
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @p3,
  1, 0, 3,
  '/assets/imgs/work/img-3.png', @asset3,
  'https://example.com/demo/travel-booking', 'https://github.com/example/travel-booking-platform',
  'WEB DEVELOPMENT', 'Conceptual JSC',
  '2025-02-01', '2025-08-01',
  '6 months',
  CAST(JSON_ARRAY('Web Development') AS CHAR),
  'https://example.com/travel-booking',
  CAST(JSON_ARRAY('Figma','Sketch','Photoshop','Framer') AS CHAR),
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @p4,
  1, 0, 4,
  '/assets/imgs/work/img-4.png', @asset4,
  'https://example.com/demo/educational-platform', 'https://github.com/example/educational-platform-uiux',
  'VISUAL DESIGN', 'Conceptual JSC',
  '2025-01-01', '2025-07-01',
  '6 months',
  CAST(JSON_ARRAY('Visual Design','UI/UX Design') AS CHAR),
  'https://example.com/educational-platform',
  CAST(JSON_ARRAY('Figma','Sketch','Photoshop','Framer') AS CHAR),
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- =============================================================
-- PROJECTS_I18N (en) — FULL i18n fields
-- content stored as JSON text: {"html":"...","description":null,...}
-- =============================================================
INSERT INTO `projects_i18n` (
  `id`, `project_id`, `locale`,
  `title`, `slug`,
  `summary`, `content`,
  `featured_image_alt`,
  `meta_title`, `meta_description`,
  `created_at`, `updated_at`
) VALUES
(
  @pi18n1,
  @p1,
  'en',
  'E-commerce Website Redesign',
  'e-commerce-website-redesign',
  CAST(
    'Designed an interactive and engaging platform to improve digital commerce experiences. We created a clearer hierarchy, more efficient browsing, and conversion-focused flows that make shopping faster and easier.'
  AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Redesigned the e-commerce experience with a conversion-focused layout, clearer hierarchy, and modern UI patterns.</p>',
      '<p>Scope included product discovery, product detail improvements, cart/checkout UX, and responsive refinements.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Cleaner navigation', 'Optimized PDP layout', 'Streamlined cart & checkout', 'Responsive refinements'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Improved visual hierarchy', 'Consistent component system', 'Accessibility-first decisions')
  ) AS CHAR),
  'E-commerce Website Redesign cover image',
  'E-commerce Website Redesign',
  'UI/UX case study: e-commerce redesign with improved usability and modern visuals.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @pi18n2,
  @p2,
  'en',
  'Fitness App UI/UX',
  'fitness-app-ui-ux',
  CAST(
    'A habit-building fitness app concept with fast interactions and a clean UI system. We improved onboarding clarity, information architecture, and accessibility across key screens.'
  AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Designed a fitness app UI/UX focused on habit-building flows and fast interactions.</p>',
      '<p>Improved information architecture, onboarding clarity, and accessible components across screens.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Clear onboarding', 'Quick workout start', 'Progress tracking', 'Accessible UI components'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('High-contrast UI', 'Card-based layout', 'Motion-ready component patterns')
  ) AS CHAR),
  'Fitness App UI/UX cover image',
  'Fitness App UI/UX',
  'App design case study: fitness UI/UX with user-centered flows and clean layout.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @pi18n3,
  @p3,
  'en',
  'Travel Booking Platform',
  'travel-booking-platform',
  CAST(
    'A seamless travel booking experience across flights, hotels, and car rentals. The UI focuses on search clarity, fast booking, and trustworthy payment steps.'
  AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Travila is a comprehensive travel booking app designed to provide users with a seamless and enjoyable booking experience.</p>',
      '<h5 class="fs-5 fw-medium">Description</h5>',
      '<p>The project involved creating an intuitive and visually appealing user interface, ensuring that users can effortlessly book flights, hotels, and car rentals all within a single app.</p>',
      '<h5 class="fs-5 fw-medium mt-4">Key Features</h5>',
      '<ul>',
      '<li><p class="text-dark fw-bold">User-Centric Interface: <span class="text-300 fw-medium">Clean navigation and smooth booking flow.</span></p></li>',
      '<li><p class="text-dark fw-bold">Integrated Search and Booking: <span class="text-300 fw-medium">Fast search and streamlined checkout.</span></p></li>',
      '<li><p class="text-dark fw-bold">Personalized Recommendations: <span class="text-300 fw-medium">Suggestions based on preferences and behavior.</span></p></li>',
      '<li><p class="text-dark fw-bold">Secure Payment Gateway: <span class="text-300 fw-medium">Protected transactions and reliable payments.</span></p></li>',
      '<li><p class="text-dark fw-bold">Interactive Maps: <span class="text-300 fw-medium">Explore destinations, attractions, and directions.</span></p></li>',
      '</ul>',
      '<h5 class="fs-5 fw-medium mt-4">Design Highlights</h5>',
      '<ul>',
      '<li><p class="text-dark fw-bold">Visual Appeal: <span class="text-300 fw-medium">Modern palette and high-quality imagery.</span></p></li>',
      '<li><p class="text-dark fw-bold">Usability: <span class="text-300 fw-medium">Clear labels, icons, and straightforward structure.</span></p></li>',
      '<li><p class="text-dark fw-bold">Responsive Design: <span class="text-300 fw-medium">Consistent experience across devices.</span></p></li>',
      '</ul>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Fast search', 'Multi-service booking', 'Secure payments', 'Maps integration'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Trust-building UI', 'Clear steps', 'Mobile-first patterns')
  ) AS CHAR),
  'Travel Booking Platform cover image',
  'Travel Booking Platform',
  'Travel booking UI/UX case study: search, booking, secure payments, and maps.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @pi18n4,
  @p4,
  'en',
  'Educational Platform UI/UX',
  'educational-platform-ui-ux',
  CAST(
    'An educational platform concept with interactive modules and accessibility-first design. Navigation and content presentation were optimized to increase engagement.'
  AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Designed an educational platform with interactive modules, clean course structure, and accessibility-first UI decisions.</p>',
      '<p>Optimized content presentation, navigation, and learner engagement across sections.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Structured courses', 'Interactive modules', 'Progress visibility', 'Accessibility-first components'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Readable typography scale', 'Consistent layout grid', 'Component-driven UI system')
  ) AS CHAR),
  'Educational Platform UI/UX cover image',
  'Educational Platform UI/UX',
  'UI/UX case study: modern, accessible educational platform concept.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- =============================================================
-- PROJECT_IMAGES (gallery parent) — FULL
-- =============================================================
INSERT INTO `project_images` (
  `id`, `project_id`,
  `asset_id`, `image_url`,
  `display_order`, `is_active`,
  `created_at`, `updated_at`
) VALUES
(
  @img1,
  @p1,
  @asset1,
  '/assets/imgs/work/img-1.png',
  0, 1,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @img2,
  @p2,
  @asset2,
  '/assets/imgs/work/img-2.png',
  0, 1,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @img3,
  @p3,
  @asset3,
  '/assets/imgs/work/img-3.png',
  0, 1,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @img4,
  @p4,
  @asset4,
  '/assets/imgs/work/img-4.png',
  0, 1,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- =============================================================
-- PROJECT_IMAGES_I18N (en) — FULL
-- =============================================================
INSERT INTO `project_images_i18n` (
  `id`, `image_id`, `locale`,
  `alt`, `caption`,
  `created_at`, `updated_at`
) VALUES
(
  @imgI18n1,
  @img1,
  'en',
  'E-commerce Website Redesign',
  'Homepage / key visual',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @imgI18n2,
  @img2,
  'en',
  'Fitness App UI/UX',
  'App UI preview',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @imgI18n3,
  @img3,
  'en',
  'Travel Booking Platform',
  'Project visual / cover',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  @imgI18n4,
  @img4,
  'en',
  'Educational Platform UI/UX',
  'Project visual / cover',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

COMMIT;
