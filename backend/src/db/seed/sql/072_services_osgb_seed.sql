-- =============================================================
-- 072 — OSGB Business Management System (vertical product service)
-- Strateji: gelir-motoru/docs/08-OSGB-PAZAR.md
-- Konumlandirma: "OSGB yazilimi" DEGIL -> "OSGB isletme yonetim sistemi".
-- Rakip IBYS degil, Excel. Fiyat kullanici basina degil, OSGB basina.
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

SET @svc_osgb := UUID();

INSERT INTO `services` (
  `id`, `type`, `featured`, `is_active`, `display_order`,
  `featured_image`, `image_url`, `image_asset_id`,
  `created_at`, `updated_at`
) VALUES (
  @svc_osgb,
  'engineering_support',
  1, 1, 30,
  '/assets/imgs/services-list/img-1.png',
  '/assets/imgs/services-list/img-1.png',
  NULL,
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- EN
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc_osgb, 'en',
  'ohs-provider-management-system',
  'OHS Provider Management System',
  'A management system for occupational health and safety providers: client and contract records, site visit tracking, automatic revenue calculation, expert capacity, health reports, archive and collections.',
  '{
    "tagline": "Compliance software reports. This one runs the business.",
    "highlights": [
      { "title": "Clients, Contracts and Site Visits", "description": "Client records with hazard class, region and headcount; a 12-month visit calendar with missed-visit alerts, evidence upload and planning." },
      { "title": "Revenue and Capacity", "description": "Monthly revenue calculated automatically from per-capita pricing and headcount, plus utilisation of safety experts and physicians from assignment durations." },
      { "title": "Operations and Archive", "description": "Task assignment, overdue tracking, document checklists with completion rates, health report and screening workflows, and role-based access." }
    ],
    "html": "<p>Statutory compliance software exists to report to the authority. It does not tell a provider who visited which client, which visit was missed, whether an expert is at capacity, how much will be invoiced this month, or who has not paid. That work usually lives in a spreadsheet.</p><p>This system replaces that spreadsheet. Existing data is migrated on day one, the client keeps ownership of their data and can export it at any time, and pricing is per organisation rather than per user.</p>"
  }',
  'OHS provider management system cover image',
  'OHS Provider Management System — Beyond Compliance Software',
  'Management system for occupational health and safety providers: clients, site visits, revenue, capacity, health reports and collections.',
  'ohs software, occupational health and safety, site visit tracking, vertical software, business management',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- TR
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc_osgb, 'tr',
  'osgb-isletme-yonetim-sistemi',
  'OSGB İşletme Yönetim Sistemi',
  'OSGB''ler için işletme yönetim sistemi: firma ve sözleşme kayıtları, İSG ziyaret takibi, otomatik ciro hesabı, uzman kapasitesi, sağlık raporu, arşiv ve tahsilat.',
  '{
    "tagline": "İBYS Bakanlığa veri gönderir. Bu sistem işinizi yönetir.",
    "highlights": [
      { "title": "Firmalar, Sözleşmeler ve İSG Ziyaretleri", "description": "Tehlike sınıfı, bölge ve çalışan sayısıyla firma kartları; 12 aylık ziyaret takvimi, eksik ziyaret uyarısı, delil yükleme ve planlama." },
      { "title": "Ciro ve Kapasite", "description": "Kişi başı fiyat ve çalışan sayısından otomatik aylık ciro hesabı; atama sürelerinden uzman ve işyeri hekimi doluluk oranı." },
      { "title": "Operasyon ve Arşiv", "description": "Görev atama, geciken iş takibi, tamamlanma yüzdeli evrak checklist''i, sağlık raporu ve tarama süreçleri, rol bazlı yetkilendirme." }
    ],
    "html": "<p>İBYS yasal uyum içindir; Bakanlığa veri gönderir. Ama hangi firmaya kim gitti, hangi ziyaret eksik kaldı, uzmanın kapasitesi doldu mu, bu ay ne kadar ciro edilecek, kim ödemedi — bunların hiçbirini söylemez. Bu iş genellikle bir Excel dosyasında yaşar.</p><p>Bu sistem o Excel''in yerine geçer. Mevcut veriler ilk gün aktarılır, veri müşteriye aittir ve dilediği zaman dışa aktarılabilir, fiyat kullanıcı başına değil OSGB ölçeğine göre belirlenir.</p>"
  }',
  'OSGB işletme yönetim sistemi kapak görseli',
  'OSGB İşletme Yönetim Sistemi — İBYS''nin Ötesinde',
  'OSGB''ler için işletme yönetim sistemi: firma takibi, İSG ziyaretleri, otomatik ciro, uzman kapasitesi, sağlık raporu ve tahsilat.',
  'osgb yazılımı, osgb işletme yönetim sistemi, isg ziyaret takibi, isg-katip, iş sağlığı güvenliği yazılımı',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);

-- DE
INSERT INTO `services_i18n` (
  `id`, `service_id`, `locale`,
  `slug`, `name`, `summary`, `content`, `image_alt`,
  `meta_title`, `meta_description`, `meta_keywords`,
  `created_at`, `updated_at`
) VALUES (
  UUID(), @svc_osgb, 'de',
  'betriebsfuehrungssystem-arbeitsschutzdienste',
  'Betriebsführungssystem für Arbeitsschutzdienste',
  'Managementsystem für Arbeitsschutzdienste: Kunden- und Vertragsakten, Besuchsverfolgung, automatische Umsatzberechnung, Kapazitätssteuerung, Gesundheitsberichte, Archiv und Forderungen.',
  '{
    "tagline": "Compliance-Software meldet. Dieses System führt den Betrieb.",
    "highlights": [
      { "title": "Kunden, Verträge und Besuche", "description": "Kundenakten mit Gefahrenklasse, Region und Mitarbeiterzahl; 12-Monats-Besuchskalender mit Warnungen bei fehlenden Besuchen, Nachweis-Upload und Planung." },
      { "title": "Umsatz und Kapazität", "description": "Automatische Umsatzberechnung aus Preis pro Kopf und Mitarbeiterzahl sowie Auslastung von Fachkräften und Betriebsärzten aus den Einsatzzeiten." },
      { "title": "Betrieb und Archiv", "description": "Aufgabenzuweisung, Verfolgung überfälliger Aufgaben, Dokumenten-Checklisten mit Fortschritt, Gesundheitsberichte und rollenbasierte Berechtigungen." }
    ],
    "html": "<p>Gesetzliche Compliance-Software dient der Meldung an die Behörde. Sie sagt jedoch nicht, wer welchen Kunden besucht hat, welcher Besuch fehlt, ob eine Fachkraft ausgelastet ist, wie viel diesen Monat abgerechnet wird oder wer nicht bezahlt hat. Diese Arbeit lebt meist in einer Tabelle.</p><p>Dieses System ersetzt diese Tabelle. Vorhandene Daten werden am ersten Tag übernommen, die Daten gehören dem Kunden und sind jederzeit exportierbar, und der Preis richtet sich nach der Organisation, nicht nach der Benutzerzahl.</p>"
  }',
  'Betriebsführungssystem für Arbeitsschutzdienste Titelbild',
  'Betriebsführungssystem für Arbeitsschutzdienste',
  'Managementsystem für Arbeitsschutzdienste: Kunden, Besuche, Umsatz, Kapazität, Gesundheitsberichte und Forderungen.',
  'arbeitsschutz software, branchensoftware, besuchsplanung, betriebsführung, arbeitssicherheit',
  CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)
);
