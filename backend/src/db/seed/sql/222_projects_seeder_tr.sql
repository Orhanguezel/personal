-- 222_projects_seed_tr.sql
-- Seed: Projects_i18n + Project_images_i18n (TR) — FULL
-- Strategy: lookup project_id via EN slugs, then UPSERT TR rows
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

START TRANSACTION;

-- Lookup parent project ids from EN slugs
SET @p1 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='e-commerce-website-redesign' LIMIT 1);
SET @p2 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='fitness-app-ui-ux' LIMIT 1);
SET @p3 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='travel-booking-platform' LIMIT 1);
SET @p4 := (SELECT project_id FROM projects_i18n WHERE locale='en' AND slug='educational-platform-ui-ux' LIMIT 1);

-- First image per project
SET @img1 := (SELECT id FROM project_images WHERE project_id=@p1 ORDER BY display_order ASC, created_at ASC LIMIT 1);
SET @img2 := (SELECT id FROM project_images WHERE project_id=@p2 ORDER BY display_order ASC, created_at ASC LIMIT 1);
SET @img3 := (SELECT id FROM project_images WHERE project_id=@p3 ORDER BY display_order ASC, created_at ASC LIMIT 1);
SET @img4 := (SELECT id FROM project_images WHERE project_id=@p4 ORDER BY display_order ASC, created_at ASC LIMIT 1);

-- PROJECTS_I18N (tr) UPSERT
INSERT INTO projects_i18n (
  id, project_id, locale,
  title, slug,
  summary, content,
  featured_image_alt,
  meta_title, meta_description,
  created_at, updated_at
) VALUES
(
  UUID(), @p1, 'tr',
  'E-ticaret Sitesi Yeniden Tasarımı',
  'e-commerce-website-redesign',
  CAST('E-ticaret deneyimi; daha net hiyerarşi, modern bileşenler ve dönüşüm odaklı akışlarla yeniden tasarlandı. Ürün keşfi, PDP, sepet/ödeme ve responsive iyileştirmelerle kullanıcı yolculuğu hızlandırıldı.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>E-ticaret deneyimi; daha net hiyerarşi, modern bileşenler ve dönüşüm odaklı akışlarla yeniden tasarlandı.</p>',
      '<p>Kapsam: ürün keşfi, ürün detay sayfası iyileştirmeleri, sepet/ödeme UX ve responsive düzen optimizasyonu.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Net navigasyon', 'PDP iyileştirmeleri', 'Sepet/ödeme sadeleştirme', 'Responsive düzen'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Görsel hiyerarşi', 'Tutarlı bileşen sistemi', 'Erişilebilirlik odaklı kararlar')
  ) AS CHAR),
  'E-ticaret yeniden tasarım kapak görseli',
  'E-ticaret Sitesi Yeniden Tasarımı',
  'UI/UX proje: modern görseller ve daha iyi kullanılabilirlik ile e-ticaret yeniden tasarım.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @p2, 'tr',
  'Fitness Uygulaması UI/UX',
  'fitness-app-ui-ux',
  CAST('Alışkanlık kazandıran akışlar ve hızlı etkileşimler için fitness uygulaması UI/UX tasarlandı. Onboarding netliği, bilgi mimarisi ve erişilebilir bileşenler güçlendirildi.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Alışkanlık kazandıran akışlar ve hızlı etkileşimler için fitness uygulaması UI/UX tasarlandı.</p>',
      '<p>Bilgi mimarisi, onboarding netliği ve erişilebilir bileşenler güçlendirildi.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Onboarding akışı', 'Hızlı egzersiz başlatma', 'İlerleme takibi', 'Erişilebilir UI'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Kart tabanlı arayüz', 'Yüksek kontrast', 'Motion uyumlu bileşenler')
  ) AS CHAR),
  'Fitness UI/UX kapak görseli',
  'Fitness Uygulaması UI/UX',
  'Kullanıcı odaklı akışlar ve temiz düzen ile fitness uygulaması UI/UX çalışması.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @p3, 'tr',
  'Seyahat Rezervasyon Platformu',
  'travel-booking-platform',
  CAST('Uçuş, otel ve araç kiralama için tek uygulamada akıcı bir rezervasyon deneyimi tasarlandı. Arama netliği, hızlı booking ve güven veren ödeme adımları önceliklendirildi.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Travila; kullanıcıların tek bir uygulama üzerinden uçuş, otel ve araç kiralama işlemlerini kolayca yapabilmesi için tasarlanmış kapsamlı bir seyahat rezervasyon uygulamasıdır.</p>',
      '<h5 class="fs-5 fw-medium">Açıklama</h5>',
      '<p>Proje; sezgisel ve görsel açıdan güçlü bir arayüz kurgulayarak rezervasyon sürecini hızlı, güvenli ve keyifli hale getirmeyi hedefledi.</p>',
      '<h5 class="fs-5 fw-medium mt-4">Öne Çıkan Özellikler</h5>',
      '<ul>',
      '<li><p class="text-dark fw-bold">Kullanıcı Odaklı Arayüz: <span class="text-300 fw-medium">Temiz navigasyon ve akıcı rezervasyon akışı.</span></p></li>',
      '<li><p class="text-dark fw-bold">Arama ve Rezervasyon: <span class="text-300 fw-medium">Hızlı arama ve kolaylaştırılmış checkout.</span></p></li>',
      '<li><p class="text-dark fw-bold">Kişiselleştirilmiş Öneriler: <span class="text-300 fw-medium">Tercihlere ve davranışlara göre öneriler.</span></p></li>',
      '<li><p class="text-dark fw-bold">Güvenli Ödeme: <span class="text-300 fw-medium">Güvenli işlem deneyimi.</span></p></li>',
      '<li><p class="text-dark fw-bold">Etkileşimli Haritalar: <span class="text-300 fw-medium">Yakındaki yerler ve yönlendirme.</span></p></li>',
      '</ul>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Hızlı arama', 'Çoklu servis booking', 'Güvenli ödeme', 'Harita entegrasyonu'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Güven veren UI', 'Net adımlar', 'Mobile-first desenler')
  ) AS CHAR),
  'Seyahat rezervasyon platformu kapak görseli',
  'Seyahat Rezervasyon Platformu',
  'Arama, rezervasyon, güvenli ödeme ve harita akışlarıyla seyahat UI/UX vaka çalışması.',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @p4, 'tr',
  'Eğitim Platformu UI/UX',
  'educational-platform-ui-ux',
  CAST('Etkileşimli modüller, net kurs yapısı ve erişilebilirlik öncelikli UI kararlarıyla eğitim platformu tasarlandı. İçerik sunumu ve navigasyon optimize edildi.' AS CHAR),
  CAST(JSON_OBJECT(
    'html',
    CONCAT(
      '<p>Etkileşimli modüller, net kurs yapısı ve erişilebilirlik öncelikli UI kararlarıyla eğitim platformu tasarlandı.</p>',
      '<p>İçerik sunumu, navigasyon ve öğrenen etkileşimi optimize edildi.</p>'
    ),
    'description', NULL,
    'key_features', JSON_ARRAY('Kurs yapısı', 'Etkileşimli modüller', 'İlerleme görünürlüğü', 'Erişilebilir bileşenler'),
    'technologies_used', JSON_ARRAY('Figma', 'Sketch', 'Photoshop', 'Framer'),
    'design_highlights', JSON_ARRAY('Okunabilir tipografi', 'Tutarlı grid', 'Bileşen bazlı tasarım')
  ) AS CHAR),
  'Eğitim platformu UI/UX kapak görseli',
  'Eğitim Platformu UI/UX',
  'Modern ve erişilebilir eğitim platformu UI/UX konsepti.',
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

-- PROJECT_IMAGES_I18N (tr) UPSERT
INSERT INTO project_images_i18n (
  id, image_id, locale,
  alt, caption,
  created_at, updated_at
) VALUES
(
  UUID(), @img1, 'tr',
  'E-ticaret Sitesi Yeniden Tasarımı',
  'Ana sayfa / ana görsel',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @img2, 'tr',
  'Fitness Uygulaması UI/UX',
  'Uygulama arayüz önizleme',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @img3, 'tr',
  'Seyahat Rezervasyon Platformu',
  'Proje görseli / kapak',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
),
(
  UUID(), @img4, 'tr',
  'Eğitim Platformu UI/UX',
  'Proje görseli / kapak',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  alt = VALUES(alt),
  caption = VALUES(caption),
  updated_at = CURRENT_TIMESTAMP(3);

COMMIT;
