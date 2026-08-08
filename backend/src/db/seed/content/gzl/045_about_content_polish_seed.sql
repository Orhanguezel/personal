-- =============================================================
-- @generated migrate-gzlteknoloji-content
-- OTOMATIK URETILDI — ELLE DUZENLEMEYIN.
-- Uretici : backend/scripts/migrate-gzlteknoloji-content.mjs
-- Kaynak  : _migration/gzlteknoloji/content-seeds/sql/045_about_content_polish_seed.sql
-- Gerekce : Hakkimizda cilalama
--
-- Yeniden uretmek icin: bun run migrate:gzl
-- =============================================================

SET NAMES utf8mb4;
-- Hakkımızda içeriğini GZL Teknoloji'nin kurumsal anlatımıyla günceller.
-- İçerik iki dilde tutulur ve mevcut kurulumlarda güvenle yeniden çalıştırılabilir.

UPDATE site_settings
SET value = JSON_OBJECT(
  'title', 'GZL Teknoloji Hakkında',
  'intro', 'GZL Teknoloji, Gemlik/Bursa merkezli bir yazılım ve dijital danışmanlık şirketidir. Resmî unvanımız GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. olup özel yazılım geliştirme, kurumsal web sitesi ve e-ticaret projeleri, iş süreçleri otomasyonu, yapay zekâ entegrasyonu ve GEO/SEO danışmanlığı alanlarında çalışıyoruz.',
  'sections', JSON_ARRAY(
    JSON_OBJECT(
      'title', 'Mühendislik disipliniyle yazılım geliştirme',
      'paragraphs', JSON_ARRAY(
        'Kurucumuz Orhan Güzel, yazılım sektörüne geçmeden önce 15 yıl kamu sektöründe mühendis olarak görev yaptı. Bu dönemin kazandırdığı proje disiplini, şartname okuma alışkanlığı ve süreç yönetimi becerisi; bugün her yazılım projemizde uyguladığımız net kapsam, yazılı teslim kriterleri ve ölçülebilir sonuç yaklaşımının temelini oluşturuyor.',
        'Yazılım geliştirme yaklaşımımız teoriye değil, canlı sistem kurma deneyimine dayanır. Tasarım, veri modeli, API, yönetim paneli, otomasyon, test ve yayına alma adımlarını tek bir teknik bütün olarak ele alıyoruz.'
      ),
      'items', JSON_ARRAY()
    ),
    JSON_OBJECT(
      'title', 'Ürettiğimiz çözümler',
      'paragraphs', JSON_ARRAY(
        'Portfolyomuz; kurumsal web sitelerinden e-ticaret altyapılarına, SaaS ürünlerinden ERP ve otomasyon sistemlerine kadar farklı ölçeklerde tamamlanmış projelerden oluşuyor.',
        'Her projede kullanılabilirlik, sürdürülebilir teknik altyapı ve ölçülebilir iş sonucu hedefliyoruz.'
      ),
      'items', JSON_ARRAY(
        'MarketPulse — bayi, rakip ve pazar izleme SaaS paneli',
        'SocialPulse — sosyal medya yönetim ve otomasyon platformu',
        'GeoSerra — yapay zekâ aramaları için GEO ve SEO analiz platformu',
        'Özel ERP, CRM, sipariş ve operasyon yönetim sistemleri',
        'Çok dilli kurumsal web sitesi ve e-ticaret projeleri'
      )
    ),
    JSON_OBJECT(
      'title', 'Ne yapıyoruz',
      'paragraphs', JSON_ARRAY(),
      'items', JSON_ARRAY(
        'Kurumsal web sitesi ve e-ticaret: Next.js altyapılı, hızlı, güvenli ve çok dilli çözümler',
        'Özel yazılım: ERP, CRM, lead yönetimi ve online sipariş sistemleri',
        'Otomasyon: veri toplama, bot geliştirme ve API entegrasyonları',
        'Yapay zekâ entegrasyonu: içerik, analiz ve karar destek sistemleri',
        'GEO/SEO danışmanlığı: arama motorları ve yapay zekâ destekli aramalarda görünürlük'
      )
    ),
    JSON_OBJECT(
      'title', 'Çalışma ilkelerimiz',
      'paragraphs', JSON_ARRAY(),
      'items', JSON_ARRAY(
        'Şeffaf kapsam ve fiyat: Her teklif kapsamı, teslim süresini ve revizyon haklarını açıkça belirtir.',
        'Yayına alma desteği: Projeyi yalnızca kod teslimiyle değil, canlı ortamda güvenle çalışır durumda tamamlarız.',
        'Ölçülebilir sonuç: Performans, dönüşüm ve görünürlük çıktıları takip edilir.',
        'Teknik süreklilik: Bakımı kolay, geliştirilebilir ve sürdürülebilir sistemler kurarız.'
      )
    ),
    JSON_OBJECT(
      'title', 'Kurumsal kimlik',
      'paragraphs', JSON_ARRAY(),
      'items', JSON_ARRAY(
        'Unvan: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
        'Adres: Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa',
        'Vergi: Gemlik VD — 4542302453 · MERSİS: 0454230245300001 · Ticaret Sicil: 7069 (Gemlik)',
        'Kuruluş: 10.06.2026',
        'Şirket müdürü: Nutuya Güzel',
        'E-posta: info@gzlteknoloji.com'
      )
    )
  )
), updated_at = CURRENT_TIMESTAMP(3)
WHERE `key` = 'ui_about_page' AND locale = 'tr';

UPDATE site_settings
SET value = JSON_OBJECT(
  'title', 'About GZL Technology',
  'intro', 'GZL Technology is a software and digital consulting company based in Gemlik, Bursa, Türkiye. Our registered name is GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. We provide custom software, corporate websites, e-commerce platforms, business process automation, artificial intelligence integrations and GEO/SEO consulting.',
  'sections', JSON_ARRAY(
    JSON_OBJECT(
      'title', 'Software development with engineering discipline',
      'paragraphs', JSON_ARRAY(
        'Our founder, Orhan Güzel, worked as an engineer in the public sector for 15 years before moving into software. The project discipline, specification-driven thinking and process management gained during this period form the basis of our approach today: a clear scope, written acceptance criteria and measurable results.',
        'Our software development approach is grounded in building production systems. We treat design, data modelling, APIs, administration panels, automation, testing and deployment as parts of one coherent technical solution.'
      ),
      'items', JSON_ARRAY()
    ),
    JSON_OBJECT(
      'title', 'Solutions we build',
      'paragraphs', JSON_ARRAY(
        'Our portfolio covers projects of different scales, from corporate websites and e-commerce platforms to SaaS products, ERP solutions and automation systems.',
        'Every project is designed around usability, a sustainable technical foundation and measurable business outcomes.'
      ),
      'items', JSON_ARRAY(
        'MarketPulse — dealer, competitor and market monitoring SaaS platform',
        'SocialPulse — social media management and automation platform',
        'GeoSerra — GEO and SEO analysis platform for AI-powered search',
        'Custom ERP, CRM, ordering and operations management systems',
        'Multilingual corporate website and e-commerce projects'
      )
    ),
    JSON_OBJECT(
      'title', 'What we do',
      'paragraphs', JSON_ARRAY(),
      'items', JSON_ARRAY(
        'Corporate websites and e-commerce: fast, secure and multilingual solutions built with Next.js',
        'Custom software: ERP, CRM, lead management and online ordering systems',
        'Automation: data collection, bot development and API integrations',
        'AI integration: content, analytics and decision-support systems',
        'GEO/SEO consulting: visibility in search engines and AI-powered search experiences'
      )
    ),
    JSON_OBJECT(
      'title', 'How we work',
      'paragraphs', JSON_ARRAY(),
      'items', JSON_ARRAY(
        'Transparent scope and pricing: Every proposal clearly states the scope, delivery time and revision rights.',
        'Deployment support: We complete projects when they are running reliably in production, not merely when code is delivered.',
        'Measurable results: Performance, conversion and visibility outcomes are monitored.',
        'Technical continuity: We build maintainable, extensible and sustainable systems.'
      )
    ),
    JSON_OBJECT(
      'title', 'Company details',
      'paragraphs', JSON_ARRAY(),
      'items', JSON_ARRAY(
        'Registered name: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.',
        'Address: Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik/Bursa, Türkiye',
        'Tax: Gemlik Tax Office — 4542302453 · MERSIS: 0454230245300001 · Trade Registry: 7069 (Gemlik)',
        'Incorporated: 10 June 2026',
        'Company director: Nutuya Güzel',
        'Email: info@gzlteknoloji.com'
      )
    )
  )
), updated_at = CURRENT_TIMESTAMP(3)
WHERE `key` = 'ui_about_page' AND locale = 'en';

-- Genel site şemasında yalnızca kurumsal sosyal profilleri yayınla.
UPDATE site_settings
SET value = JSON_ARRAY(
  'https://github.com/Orhanguezel',
  'https://www.linkedin.com/in/orhan-g%C3%BCzel-53b47b11a'
), updated_at = CURRENT_TIMESTAMP(3)
WHERE `key` = 'ui_same_as' AND locale = '*';
