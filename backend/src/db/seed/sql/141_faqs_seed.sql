-- =============================================================
-- 141_faqs_seed.sql (FINAL)
-- GuezelWebDesign – Multilingual FAQs seed (faqs + faqs_i18n)
-- ✅ 140_faqs.sql şema mevcut olmalı (DROP/CREATE yok)
-- ✅ TR + EN + DE
-- ✅ NO category fields
-- ✅ faqs_i18n.id: UUID()
-- ✅ Unique: (faq_id, locale) ve (locale, slug)
-- =============================================================

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET collation_connection = 'utf8mb4_unicode_ci';
SET time_zone = '+00:00';

START TRANSACTION;

-- =============================================================
-- PARENT (faqs) — STABIL ID (seed tekrarında duplicate olmasın)
-- =============================================================
INSERT INTO `faqs`
(`id`, `is_active`, `display_order`, `created_at`, `updated_at`)
VALUES
('11111111-1111-1111-1111-111111111111', 1, 1, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('22222222-2222-2222-2222-222222222222', 1, 2, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('33333333-3333-3333-3333-333333333333', 1, 3, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('44444444-4444-4444-4444-444444444444', 1, 4, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('55555555-5555-5555-5555-555555555555', 1, 5, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('66666666-6666-6666-6666-666666666666', 1, 6, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('77777777-7777-7777-7777-777777777777', 1, 7, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000'),
('88888888-8888-8888-8888-888888888888', 1, 8, '2026-01-01 00:00:00.000', '2026-01-01 00:00:00.000')
ON DUPLICATE KEY UPDATE
  `is_active`     = VALUES(`is_active`),
  `display_order` = VALUES(`display_order`),
  `updated_at`    = VALUES(`updated_at`);

-- =============================================================
-- I18N (faqs_i18n) — TR + EN + DE
-- id => UUID() ✅
-- Upsert conflict: (faq_id, locale) veya (locale, slug)
-- =============================================================
INSERT INTO `faqs_i18n`
(`id`, `faq_id`, `locale`, `question`, `answer`, `slug`, `created_at`, `updated_at`)
VALUES

-- =============================================================
-- 1) Süreç nasıl işliyor?
-- =============================================================
(UUID(), '11111111-1111-1111-1111-111111111111', 'tr',
'Proje süreci nasıl işliyor?',
'Kısa bir keşif görüşmesiyle hedefleri ve ihtiyaçları netleştiriyoruz. Ardından kapsam (sayfa sayısı, özellikler), zaman planı ve teklif oluşturuyorum. Tasarım onayı sonrası geliştirme, test ve yayına alma adımlarına geçiyoruz. Teslimden sonra bakım ve destek opsiyonlarıyla devam edebiliriz.',
'proje-sureci-nasil-isliyor',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '11111111-1111-1111-1111-111111111111', 'en',
'How does the project process work?',
'We start with a short discovery call to clarify goals and requirements. Then I propose scope (pages/features), timeline, and a quote. After design approval, we move to development, testing, and deployment. Post-launch, ongoing maintenance and support options are available.',
'how-does-the-project-process-work',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '11111111-1111-1111-1111-111111111111', 'de',
'Wie läuft der Projektablauf ab?',
'Wir starten mit einem kurzen Gespräch, um Ziele und Anforderungen zu klären. Danach erstelle ich Umfang (Seiten/Funktionen), Zeitplan und Angebot. Nach Design-Freigabe folgen Entwicklung, Tests und Go-Live. Nach dem Launch sind Wartung und Support optional möglich.',
'wie-laeuft-der-projektablauf-ab',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 2) Hangi hizmetleri sunuyorsunuz?
-- =============================================================
(UUID(), '22222222-2222-2222-2222-222222222222', 'tr',
'Hangi hizmetleri sunuyorsunuz?',
'Kurumsal web sitesi, e-ticaret, landing page, özel panel (admin), API entegrasyonları, performans/SEO iyileştirme, bakım ve güvenlik güncellemeleri sunuyorum. İhtiyaca göre tasarım + geliştirme veya mevcut projeye katkı şeklinde çalışabiliyoruz.',
'hangi-hizmetleri-sunuyorsunuz',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '22222222-2222-2222-2222-222222222222', 'en',
'What services do you offer?',
'I build business websites, e-commerce, landing pages, custom admin panels, API integrations, performance/SEO improvements, and ongoing maintenance/security updates. We can work end-to-end (design + development) or improve an existing project.',
'what-services-do-you-offer',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '22222222-2222-2222-2222-222222222222', 'de',
'Welche Leistungen bieten Sie an?',
'Ich erstelle Unternehmenswebsites, E-Commerce, Landingpages, Admin-Panels, API-Integrationen, Performance-/SEO-Optimierung sowie Wartung und Sicherheitsupdates. Je nach Bedarf komplett (Design + Entwicklung) oder als Erweiterung eines bestehenden Projekts.',
'welche-leistungen-bieten-sie-an',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 3) Teslim süresi ne kadar?
-- =============================================================
(UUID(), '33333333-3333-3333-3333-333333333333', 'tr',
'Teslim süresi ne kadar?',
'Süre; kapsam, içerik hazırlığı ve geri bildirim hızına göre değişir. Basit bir landing page genelde 3–7 gün, kurumsal site 1–3 hafta, daha kapsamlı projeler 3–8 hafta aralığında planlanır. Net takvimi teklif aşamasında paylaşırım.',
'teslim-suresi-ne-kadar',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '33333333-3333-3333-3333-333333333333', 'en',
'How long does delivery take?',
'Timing depends on scope, content readiness, and feedback speed. A simple landing page is usually 3–7 days, a business site 1–3 weeks, and larger projects typically 3–8 weeks. I provide a clear timeline in the proposal.',
'how-long-does-delivery-take',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '33333333-3333-3333-3333-333333333333', 'de',
'Wie lange dauert die Umsetzung?',
'Die Dauer hängt von Umfang, Content und Feedback ab. Eine Landingpage meist 3–7 Tage, eine Unternehmenswebsite 1–3 Wochen, größere Projekte häufig 3–8 Wochen. Einen festen Zeitplan erhalten Sie im Angebot.',
'wie-lange-dauert-die-umsetzung',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 4) SEO dahil mi?
-- =============================================================
(UUID(), '44444444-4444-4444-4444-444444444444', 'tr',
'SEO çalışması fiyata dahil mi?',
'Temel teknik SEO (site hızı, indexlenebilirlik, meta etiketler, yapılandırılmış veri gibi) projeye göre dahil edilebilir. İçerik stratejisi, kapsamlı anahtar kelime çalışması ve sürekli SEO ise ayrı bir paket olarak planlanır.',
'seo-fiyata-dahil-mi',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '44444444-4444-4444-4444-444444444444', 'en',
'Is SEO included in the price?',
'Basic technical SEO (speed, indexability, meta tags, structured data) can be included depending on the project. Content strategy, extensive keyword research, and ongoing SEO are typically offered as a separate package.',
'is-seo-included',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '44444444-4444-4444-4444-444444444444', 'de',
'Ist SEO im Preis enthalten?',
'Grundlegendes technisches SEO (Speed, Indexierbarkeit, Meta-Tags, strukturierte Daten) kann je nach Projekt enthalten sein. Content-Strategie, Keyword-Recherche und laufende SEO-Betreuung sind meist ein separates Paket.',
'ist-seo-im-preis-enthalten',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 5) Hosting / domain / bakım
-- =============================================================
(UUID(), '55555555-5555-5555-5555-555555555555', 'tr',
'Hosting ve bakım hizmeti sağlıyor musunuz?',
'Evet. İsterseniz domain/DNS, SSL, sunucu kurulumu, yedekleme, güvenlik ve düzenli güncelleme süreçlerini yönetebilirim. Mevcut altyapınıza da entegre olabilirim. Bakım modeli; aylık paket veya ihtiyaç bazlı olarak belirlenir.',
'hosting-ve-bakim-sagliyor-musunuz',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '55555555-5555-5555-5555-555555555555', 'en',
'Do you provide hosting and maintenance?',
'Yes. I can manage domain/DNS, SSL, server setup, backups, security, and regular updates, or integrate with your existing infrastructure. Maintenance can be handled via a monthly plan or on-demand support.',
'do-you-provide-hosting-and-maintenance',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '55555555-5555-5555-5555-555555555555', 'de',
'Bieten Sie Hosting und Wartung an?',
'Ja. Ich kann Domain/DNS, SSL, Server-Setup, Backups, Security und regelmäßige Updates übernehmen oder mich in Ihre bestehende Infrastruktur integrieren. Wartung ist als Monatsvertrag oder nach Bedarf möglich.',
'bieten-sie-hosting-und-wartung-an',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 6) İçerik/Metin/Fotoğraf kimden?
-- =============================================================
(UUID(), '66666666-6666-6666-6666-666666666666', 'tr',
'İçerik (metin, görsel) kim tarafından sağlanıyor?',
'İçeriği siz sağlayabilirsiniz veya içerik üretimi konusunda destek sunabilirim. Mevcut metinleri düzenleyebilir, çok dilli içerik yapısını kurabilir ve uygun stok görsellerle sayfayı tamamlayabilirim. Projenin başında içerik sorumluluğunu netleştiriyoruz.',
'icerik-metin-gorsel-kimden',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '66666666-6666-6666-6666-666666666666', 'en',
'Who provides the content (text, images)?',
'You can provide the content, or I can support content creation. I can refine existing copy, set up a multilingual content structure, and complement pages with suitable stock visuals. We clarify responsibilities at the start.',
'who-provides-content',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '66666666-6666-6666-6666-666666666666', 'de',
'Wer liefert Inhalte (Text, Bilder)?',
'Sie können Inhalte liefern oder ich unterstütze bei der Erstellung. Ich kann Texte optimieren, eine mehrsprachige Struktur aufsetzen und Seiten mit passenden Stock-Bildern ergänzen. Das klären wir zu Projektbeginn.',
'wer-liefert-inhalte',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 7) Revizyon hakkı
-- =============================================================
(UUID(), '77777777-7777-7777-7777-777777777777', 'tr',
'Kaç revizyon hakkım var?',
'Standart olarak belirli sayıda revizyon (ör. 2 tur) dahil edilir. Kapsam ve teslim modeline göre bu sayı değişebilir. Ek revizyonlar saatlik veya paket bazlı olarak planlanır.',
'kac-revizyon-hakkim-var',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '77777777-7777-7777-7777-777777777777', 'en',
'How many revision rounds are included?',
'Typically a set number of revision rounds (e.g., 2) is included. This can vary by scope and delivery model. Additional revisions can be handled hourly or via add-on packages.',
'how-many-revisions-are-included',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '77777777-7777-7777-7777-777777777777', 'de',
'Wie viele Korrekturrunden sind enthalten?',
'Üblicherweise sind eine bestimmte Anzahl an Korrekturrunden (z. B. 2) enthalten. Je nach Umfang kann das variieren. Weitere Anpassungen sind stunden- oder paketbasiert möglich.',
'wie-viele-korrekturrunden-sind-enthalten',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

-- =============================================================
-- 8) Fiyatlandırma nasıl?
-- =============================================================
(UUID(), '88888888-8888-8888-8888-888888888888', 'tr',
'Fiyatlandırma nasıl yapılıyor?',
'Fiyat; kapsam, sayfa sayısı, entegrasyonlar ve teslim süresine göre belirlenir. Net bir teklif için hedef, örnek beğeniler ve gerekli özellikleri paylaşırsanız kısa sürede teklif hazırlayabilirim.',
'fiyatlandirma-nasil-yapiliyor',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '88888888-8888-8888-8888-888888888888', 'en',
'How does pricing work?',
'Pricing depends on scope, number of pages, integrations, and timeline. If you share your goals, reference examples, and required features, I can prepare a tailored quote quickly.',
'how-does-pricing-work',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000'),

(UUID(), '88888888-8888-8888-8888-888888888888', 'de',
'Wie setzt sich der Preis zusammen?',
'Der Preis hängt von Umfang, Seitenanzahl, Integrationen und Zeitplan ab. Wenn Sie Ziele, Beispiele und benötigte Funktionen teilen, kann ich kurzfristig ein passendes Angebot erstellen.',
'wie-setzt-sich-der-preis-zusammen',
'2026-01-01 00:00:00.000','2026-01-01 00:00:00.000')

ON DUPLICATE KEY UPDATE
  `question`   = VALUES(`question`),
  `answer`     = VALUES(`answer`),
  `slug`       = VALUES(`slug`),
  `updated_at` = VALUES(`updated_at`);

COMMIT;
