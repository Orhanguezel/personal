-- 223_projects_seed_de.sql
-- Seed: Projects_i18n + Project_images_i18n (DE) — FULL
-- Strategy: lookup project_id via EN slugs, then UPSERT DE rows
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

SET @p1 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='e-commerce-website-redesign' LIMIT 1);
SET @p2 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='fitness-app-ui-ux' LIMIT 1);
SET @p3 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='travel-booking-platform' LIMIT 1);
SET @p4 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='educational-platform-ui-ux' LIMIT 1);

SET @img1 := (SELECT id FROM project_images WHERE project_id=@p1 ORDER BY display_order ASC, created_at ASC LIMIT 1);
SET @img2 := (SELECT id FROM project_images WHERE project_id=@p2 ORDER BY display_order ASC, created_at ASC LIMIT 1);
SET @img3 := (SELECT id FROM project_images WHERE project_id=@p3 ORDER BY display_order ASC, created_at ASC LIMIT 1);
SET @img4 := (SELECT id FROM project_images WHERE project_id=@p4 ORDER BY display_order ASC, created_at ASC LIMIT 1);

-- PROJECTS_I18N (de) UPSERT — slug same as EN
INSERT INTO projects_i18n (
  id, project_id, locale,
  title, slug,
  summary, content,
  featured_image_alt,
  meta_title, meta_description,
  created_at, updated_at
) VALUES
(
  UUID(), @p1, 'de',
  'E-Commerce-Website Redesign',
  'e-commerce-website-redesign',
  CAST('Redesign des E-Commerce-Erlebnisses mit klarerer Hierarchie, modernen UI-Mustern und conversion-orientierten Flows. Fokus auf Produktentdeckung, PDP, Warenkorb/Checkout und responsive Verbesserungen.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Redesign des E-Commerce-Erlebnisses mit klarerer Hierarchie, modernen UI-Mustern und conversion-orientierten Flows.</p>',
      '<p>Umfang: Produktentdeckung, PDP-Optimierung, Warenkorb/Checkout-UX und responsive Verbesserungen.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Klarere Navigation', 'Optimiertes PDP', 'Schneller Checkout', 'Responsive Verbesserungen'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Bessere visuelle Hierarchie', 'Konsistentes UI-System', 'Accessibility-first')
  ) AS CHAR),
  'E-Commerce-Website Redesign Vorschaubild',
  'E-Commerce-Website Redesign',
  'UI/UX Fallstudie: E-Commerce-Redesign mit modernen Visuals und besserer Usability.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @p2, 'de',
  'Fitness-App UI/UX',
  'fitness-app-ui-ux',
  CAST('Fitness-App UI/UX mit Fokus auf schnelle Interaktionen und habit-building Flows. Verbesserte Informationsarchitektur, Onboarding-Klarheit und barrierearme Komponenten.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Fitness-App UI/UX mit Fokus auf schnelle Interaktionen und habit-building Flows.</p>',
      '<p>Verbesserte Informationsarchitektur, Onboarding-Klarheit und barrierearme Komponenten.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Klares Onboarding', 'Schnellstart Workouts', 'Progress Tracking', 'Barrierearme UI'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Kontraststark', 'Card Layout', 'Motion-ready Komponenten')
  ) AS CHAR),
  'Fitness-App UI/UX Vorschaubild',
  'Fitness-App UI/UX',
  'App-Design Fallstudie: Fitness UI/UX mit modernem Layout und nutzerzentrierten Flows.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @p3, 'de',
  'Reisebuchungsplattform',
  'travel-booking-platform',
  CAST('Nahtloses Buchungserlebnis für Flüge, Hotels und Mietwagen. Die UI priorisiert klare Suche, schnelle Buchung und vertrauenswürdige Zahlungs-Schritte.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Travila ist eine umfassende Reisebuchungs-App, die ein nahtloses und angenehmes Buchungserlebnis bietet.</p>',
      '<h5 class="fs-5 fw-medium">Beschreibung</h5>',
      '<p>Intuitive, visuell starke UI, damit Flüge, Hotels und Mietwagen bequem in einer App gebucht werden können.</p>',
      '<h5 class="fs-5 fw-medium mt-4">Key Features</h5>',
      '<ul>',
      '<li><p class="text-dark fw-bold">User-zentriertes UI: <span class="text-300 fw-medium">Klare Navigation und reibungsloser Buchungsflow.</span></p></li>',
      '<li><p class="text-dark fw-bold">Suche & Buchung: <span class="text-300 fw-medium">Schnelle Suche und effizienter Checkout.</span></p></li>',
      '<li><p class="text-dark fw-bold">Personalisierte Empfehlungen: <span class="text-300 fw-medium">Vorschläge basierend auf Präferenzen.</span></p></li>',
      '<li><p class="text-dark fw-bold">Sichere Zahlung: <span class="text-300 fw-medium">Geschützte Transaktionen.</span></p></li>',
      '<li><p class="text-dark fw-bold">Interaktive Karten: <span class="text-300 fw-medium">Orte entdecken und Navigation.</span></p></li>',
      '</ul>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Schnelle Suche', 'Multi-Service Booking', 'Sichere Zahlungen', 'Karten Integration'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Trust UI', 'Klare Schritte', 'Mobile-first Patterns')
  ) AS CHAR),
  'Reisebuchungsplattform Vorschaubild',
  'Reisebuchungsplattform',
  'UI/UX Fallstudie: Suche, Buchung, sichere Zahlungen und Karten-Flow.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @p4, 'de',
  'Lernplattform UI/UX',
  'educational-platform-ui-ux',
  CAST('Design einer Lernplattform mit interaktiven Modulen, klarer Kursstruktur und accessibility-first Entscheidungen. Optimierte Darstellung, Navigation und Lernenden-Engagement.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Design einer Lernplattform mit interaktiven Modulen, klarer Kursstruktur und accessibility-first Entscheidungen.</p>',
      '<p>Optimierte Darstellung, Navigation und Lernenden-Engagement.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Strukturierte Kurse', 'Interaktive Module', 'Progress Übersicht', 'Barrierearme Komponenten'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Lesbare Typografie', 'Konsistentes Grid', 'Component-driven UI')
  ) AS CHAR),
  'Lernplattform UI/UX Vorschaubild',
  'Lernplattform UI/UX',
  'UI/UX Fallstudie: Interaktive Lernplattform mit modernem, barrierearmem Design.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  slug = VALUES(slug),
  summary = VALUES(summary),
  content = VALUES(content),
  featured_image_alt = VALUES(featured_image_alt),
  meta_title = VALUES(meta_title),
  meta_description = VALUES(meta_description),
  updated_at = CURRENT_TIMESTAMP(3);

-- PROJECT_IMAGES_I18N (de) UPSERT
INSERT INTO project_images_i18n (
  id, image_id, locale,
  alt, caption,
  created_at, updated_at
) VALUES
(
  UUID(), @img1, 'de',
  'E-Commerce-Website Redesign',
  'Startseite / Key Visual',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @img2, 'de',
  'Fitness-App UI/UX',
  'App UI Vorschau',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @img3, 'de',
  'Reisebuchungsplattform',
  'Projektvisual / Cover',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @img4, 'de',
  'Lernplattform UI/UX',
  'Projektvisual / Cover',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

COMMIT;
