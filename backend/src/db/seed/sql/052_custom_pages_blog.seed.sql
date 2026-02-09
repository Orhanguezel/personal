-- =============================================================
-- FILE: 052_custom_pages_blog.seed.sql (FINAL / CLEAN / UUID())
-- Blog (3 posts) — module_key='blog'
-- - content: LONGTEXT JSON-string {"html":"..."}  ✅
-- - i18n: TR/EN/DE
-- - summary/excerpt dolu
-- - HTML gerçek tag'lerle ✅ (FE render için)
-- =============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

START TRANSACTION;

SET @MODULE_KEY := 'blog';
SET @EMPTY_ARR := '[]';
SET @AUTHOR_ID := '11111111-1111-1111-1111-111111111111';

-- helper pattern:
-- CONCAT('{"html":"', REPLACE(REPLACE(REPLACE(CONCAT(...), '"','\"'), '\n','\\n'), '\r',''), '"}')

-- =============================================================
-- BLOG POST #1
-- =============================================================
SET @PAGE1 := UUID();
SET @IMG1  := '/assets/imgs/blog/blog-1/img-1.png';
SET @IMAGES1 := CONCAT('["', REPLACE(@IMG1, '"', '\"'), '"]');

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `author_id`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE1,@MODULE_KEY,1,10,10,
 @AUTHOR_ID,
 @IMG1,NULL,
 @IMG1,NULL,
 'UI/UX trends cover image',
 @IMAGES1,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE1, 'en',
  '5 UI/UX Trends to Watch in 2026',
  '5-ui-ux-trends-to-watch-in-2026',
  'App Design',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>UI/UX in 2026: What actually moves the needle</h2>',
      '<p>Trends are only useful when they improve outcomes: faster task completion, fewer errors, higher retention, and clearer product understanding.</p>',
      '<hr/>',
      '<h3>1) AI-assisted personalization (with control)</h3>',
      '<p>Personalization works when users can <strong>inspect</strong> and <strong>override</strong> suggestions. Don’t hide logic.</p>',
      '<ul>',
      '<li>Provide “Why am I seeing this?”</li>',
      '<li>Allow opt-out per feature</li>',
      '<li>Prefer progressive disclosure over aggressive automation</li>',
      '</ul>',
      '<h3>2) Accessible motion &amp; micro-interactions</h3>',
      '<p>Motion should guide attention, not steal it. Always support reduced motion.</p>',
      '<blockquote><p><strong>Rule:</strong> animations must never block completion of a core task.</p></blockquote>',
      '<h3>3) Design systems that scale across products</h3>',
      '<p>Teams win when tokens, components, and patterns are shared and measurable.</p>',
      '<ul>',
      '<li>Tokenize spacing, typography, color, radius</li>',
      '<li>Define content rules (headings, summaries, CTAs)</li>',
      '<li>Measure adoption (coverage %)</li>',
      '</ul>',
      '<h3>4) Performance-first UX</h3>',
      '<p>Performance is a feature. Treat it like one.</p>',
      '<table class="table"><thead><tr><th>Metric</th><th>Target</th></tr></thead><tbody>',
      '<tr><td>INP</td><td>&lt; 200ms</td></tr>',
      '<tr><td>LCP</td><td>&lt; 2.5s</td></tr>',
      '<tr><td>CLS</td><td>&lt; 0.1</td></tr>',
      '</tbody></table>',
      '<h3>5) Content clarity as interface</h3>',
      '<p>Shorter beats clever. Labels beat icons when stakes are high (payments, destructive actions).</p>',
      '<pre><code>// Good: explicit\nDelete project\n// Bad: ambiguous\nRemove</code></pre>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Practical checklist</h4>',
      '<ul>',
      '<li>Audit top 5 user flows</li>',
      '<li>Define UX baseline metrics</li>',
      '<li>Ship improvements in 2-week iterations</li>',
      '<li>Validate with usability tests</li>',
      '</ul>',
      '</div>',
      '<h4>Conclusion</h4>',
      '<p>In 2026, the best teams will pair speed with control: accessible motion, measurable systems, and performance-first UI decisions.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'A practical, outcome-driven overview of UI/UX trends for modern products: personalization, accessibility, design systems, and performance.',
  'Key 2026 themes: controllable personalization, accessible motion, scalable design systems, performance-first UX, and content clarity.',
  'UI/UX trends cover image',
  '5 UI/UX Trends to Watch in 2026',
  'Outcome-driven UI/UX trends: accessibility, performance, scalable systems, and controllable personalization.',
  'uiux,design trends,design system,accessibility,performance,product design',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE1, 'tr',
  '2026’da Takip Edilecek 5 UI/UX Trendi',
  '2026-ui-ux-trendleri',
  'Uygulama Tasarımı',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>2026 UI/UX: Gerçekten sonuç getiren trendler</h2>',
      '<p>Trendler ancak metrikleri iyileştiriyorsa değerlidir: daha hızlı görev tamamlama, daha az hata, daha yüksek elde tutma ve daha net ürün algısı.</p>',
      '<hr/>',
      '<h3>1) Kontrollü kişiselleştirme (AI destekli)</h3>',
      '<p>Kişiselleştirme kullanıcı kontrolüyle çalışır: öneriyi <strong>anlat</strong>, <strong>kapatma</strong> seçeneği ver.</p>',
      '<ul>',
      '<li>“Bunu neden görüyorum?” açıklaması</li>',
      '<li>Özellik bazlı opt-out</li>',
      '<li>Aşırı otomasyon yerine kademeli yaklaşım</li>',
      '</ul>',
      '<h3>2) Erişilebilir motion &amp; mikro etkileşimler</h3>',
      '<p>Animasyon dikkat yönlendirmeli; işi engellememeli. Reduced motion mutlaka desteklenmeli.</p>',
      '<blockquote><p><strong>Kural:</strong> core task asla animasyon yüzünden bloklanmamalı.</p></blockquote>',
      '<h3>3) Ürünler arası ölçeklenen design system</h3>',
      '<ul>',
      '<li>Spacing/typography/color token’ları</li>',
      '<li>İçerik kuralları: başlık/özet/CTA</li>',
      '<li>Adoption ölçümü</li>',
      '</ul>',
      '<h3>4) Performance-first UX</h3>',
      '<p>Performans bir “feature”dır.</p>',
      '<h3>5) İçerik netliği = arayüz</h3>',
      '<pre><code>// İyi\nProjeyi sil\n// Kötü\nKaldır</code></pre>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Checklist</h4>',
      '<ul>',
      '<li>Top 5 akışı audit et</li>',
      '<li>UX baseline metriklerini belirle</li>',
      '<li>2 haftalık iterasyonlarla iyileştir</li>',
      '<li>Usability test ile doğrula</li>',
      '</ul>',
      '</div>',
      '<h4>Sonuç</h4>',
      '<p>2026’da en iyi ekipler hız + kontrol dengesini kuracak: erişilebilir motion, ölçülebilir sistem ve performans odaklı kararlar.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Modern ürünler için sonuç odaklı UI/UX trendleri: kişiselleştirme, erişilebilirlik, design system ve performans.',
  '2026 temaları: kontrollü kişiselleştirme, erişilebilir motion, ölçeklenen design system, performance-first UX ve içerik netliği.',
  'UI/UX trendleri kapak görseli',
  '2026 UI/UX Trendleri',
  'Sonuç odaklı UI/UX trendleri: erişilebilirlik, performans, scalable design system ve kontrollü kişiselleştirme.',
  'uiux,tasarim trendleri,design system,erisebilirlik,performans,urun tasarimi',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE1, 'de',
  '5 UI/UX Trends für 2026',
  '5-ui-ux-trends-2026',
  'App Design',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>UI/UX 2026: Trends mit echtem Impact</h2>',
      '<p>Trends zählen nur, wenn sie Outcomes verbessern: schnellere Aufgaben, weniger Fehler, höhere Retention und klarere Produktführung.</p>',
      '<hr/>',
      '<h3>1) AI-Personalisierung (mit Kontrolle)</h3>',
      '<ul>',
      '<li>“Warum sehe ich das?”</li>',
      '<li>Opt-out pro Feature</li>',
      '<li>Progressive statt aggressive Automation</li>',
      '</ul>',
      '<h3>2) Barrierefreie Motion &amp; Micro-Interactions</h3>',
      '<blockquote><p><strong>Regel:</strong> Core Tasks dürfen nie durch Animation blockiert werden.</p></blockquote>',
      '<h3>3) Skalierbare Design-Systeme</h3>',
      '<ul>',
      '<li>Tokens für Spacing/Typo/Color</li>',
      '<li>Content-Regeln (Titel, Summary, CTA)</li>',
      '<li>Adoption messen</li>',
      '</ul>',
      '<h3>4) Performance-first UX</h3>',
      '<p>Performance ist ein Feature – und sollte so behandelt werden.</p>',
      '<h3>5) Content-Klarheit als Interface</h3>',
      '<pre><code>// Gut\nProjekt löschen\n// Schlecht\nEntfernen</code></pre>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Checklist</h4>',
      '<ul>',
      '<li>Top-5-Flows auditieren</li>',
      '<li>UX-Baseline definieren</li>',
      '<li>In 2-Wochen-Iterationen shippen</li>',
      '<li>Mit Usability Tests validieren</li>',
      '</ul>',
      '</div>',
      '<h4>Fazit</h4>',
      '<p>2026 gewinnen Teams, die Geschwindigkeit mit Kontrolle verbinden: Accessibility, messbare Systeme und Performance-first Entscheidungen.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Ein outcome-orientierter Überblick über UI/UX Trends: Personalisierung, Accessibility, Design-Systeme und Performance.',
  '2026 zählen kontrollierbare Personalisierung, barrierefreie Motion, skalierbare Systeme, Performance-first UX und Content-Klarheit.',
  'UI/UX Trends Titelbild',
  '5 UI/UX Trends für 2026',
  'Praktische UI/UX Trends: Barrierefreiheit, Performance, skalierbare Design-Systeme und kontrollierbare Personalisierung.',
  'uiux,design trends,design system,barrierefreiheit,performance,produkt design',
  NOW(3),NOW(3)
);

-- =============================================================
-- BLOG POST #2
-- =============================================================
SET @PAGE2 := UUID();
SET @IMG2  := '/assets/imgs/blog/blog-1/img-2.png';
SET @IMAGES2 := CONCAT('["', REPLACE(@IMG2, '"', '\"'), '"]');

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `author_id`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE2,@MODULE_KEY,1,20,20,
 @AUTHOR_ID,
 @IMG2,NULL,
 @IMG2,NULL,
 'User research cover image',
 @IMAGES2,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE2, 'en',
  'The Importance of User Research',
  'the-importance-of-user-research',
  'Branding',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Research reduces risk (and saves budget)</h2>',
      '<p>Strong products are built on real user needs. Research helps validate assumptions before expensive builds.</p>',
      '<hr/>',
      '<h3>What research gives you</h3>',
      '<ul>',
      '<li><strong>Clarity</strong>: what users actually try to do</li>',
      '<li><strong>Priorities</strong>: what matters most</li>',
      '<li><strong>Language</strong>: how users describe problems</li>',
      '</ul>',
      '<h3>Practical methods (fast)</h3>',
      '<ol>',
      '<li>5–8 interviews (30–45 min)</li>',
      '<li>Prototype test (Figma) with 5 users</li>',
      '<li>Analytics baseline for core funnels</li>',
      '</ol>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Do / Don’t</h4>',
      '<p><strong>Do:</strong> recruit real target users, record sessions, write down quotes.</p>',
      '<p><strong>Don’t:</strong> rely on internal opinions or “CEO user”.</p>',
      '</div>',
      '<h3>Template questions</h3>',
      '<ul>',
      '<li>What triggered you to look for a solution?</li>',
      '<li>What did you try before?</li>',
      '<li>What would “success” look like for you?</li>',
      '</ul>',
      '<h4>Conclusion</h4>',
      '<p>Research doesn’t slow you down; it prevents you from building the wrong thing faster.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'User research makes design decisions clearer and outcomes more predictable by validating assumptions early.',
  'Validate assumptions early with interviews and quick prototype tests; measure impact after launch.',
  'User research cover image',
  'The Importance of User Research',
  'How user research validates assumptions, prevents waste, and improves product-market fit.',
  'user research,ux,product discovery,usability testing,interviews',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE2, 'tr',
  'Kullanıcı Araştırmasının Önemi',
  'kullanici-arastirmasinin-onemi',
  'Markalama',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Araştırma riski azaltır (bütçe kurtarır)</h2>',
      '<p>Güçlü ürünler gerçek kullanıcı ihtiyaçlarına dayanır. Araştırma, maliyetli geliştirmeden önce varsayımları doğrular.</p>',
      '<hr/>',
      '<h3>Araştırma ne sağlar?</h3>',
      '<ul>',
      '<li><strong>Netlik</strong>: kullanıcı ne yapmaya çalışıyor?</li>',
      '<li><strong>Öncelik</strong>: en kritik problem hangisi?</li>',
      '<li><strong>Dil</strong>: kullanıcı problemi nasıl anlatıyor?</li>',
      '</ul>',
      '<h3>Hızlı yöntemler</h3>',
      '<ol>',
      '<li>5–8 kullanıcı görüşmesi</li>',
      '<li>Figma prototip testi (5 kişi)</li>',
      '<li>Core funnel analitik baseline</li>',
      '</ol>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Do / Don’t</h4>',
      '<p><strong>Do:</strong> gerçek hedef kullanıcı, kayıt + not, birebir alıntılar.</p>',
      '<p><strong>Don’t:</strong> iç ekip tahminleriyle karar verme.</p>',
      '</div>',
      '<h4>Fazit</h4>',
      '<p>Araştırma yavaşlatmaz; yanlış şeyi hızlıca üretmeni engeller.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Kullanıcı araştırması; kararları netleştirir, varsayımları doğrular ve ürün çıktısını daha öngörülebilir yapar.',
  'Görüşme + hızlı prototip testleriyle varsayımları erken doğrula, yayın sonrası metriklerle etkiyi ölç.',
  'Kullanıcı araştırması kapak görseli',
  'Kullanıcı Araştırmasının Önemi',
  'Araştırma; israfı azaltır, varsayımları doğrular ve ürün-uyumunu artırır.',
  'kullanici arastirmasi,ux,urun kesfi,kullanilabilirlik testi,gorusme',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE2, 'de',
  'Warum User Research wichtig ist',
  'warum-user-research-wichtig-ist',
  'Branding',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Research reduziert Risiko (und spart Budget)</h2>',
      '<p>Gute Produkte basieren auf echten Bedürfnissen. Research validiert Annahmen, bevor teuer entwickelt wird.</p>',
      '<hr/>',
      '<h3>Was du bekommst</h3>',
      '<ul>',
      '<li><strong>Klarheit</strong>: Was Nutzer wirklich erreichen wollen</li>',
      '<li><strong>Prioritäten</strong>: Was am meisten zählt</li>',
      '<li><strong>Sprache</strong>: Wie Nutzer Probleme beschreiben</li>',
      '</ul>',
      '<h3>Schnelle Methoden</h3>',
      '<ol>',
      '<li>5–8 Interviews</li>',
      '<li>Prototyp-Test (5 Nutzer)</li>',
      '<li>Analytics Baseline</li>',
      '</ol>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Do / Don’t</h4>',
      '<p><strong>Do:</strong> echte Zielgruppe, Sessions aufzeichnen, Zitate sammeln.</p>',
      '<p><strong>Don’t:</strong> nur interne Meinungen als <em>“Daten”</em> behandeln.</p>',
      '</div>',
      '<h4>Fazit</h4>',
      '<p>Research verlangsamt nicht – es verhindert, dass du schneller das Falsche baust.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'User Research macht Entscheidungen klarer und Ergebnisse verlässlicher, weil Annahmen früh validiert werden.',
  'Annahmen früh validieren: Interviews, Prototypen-Tests und Metriken nach dem Launch verbessern den Product-Fit.',
  'User Research Titelbild',
  'Warum User Research wichtig ist',
  'Wie Research Annahmen validiert, Aufwand reduziert und den Product-Fit verbessert.',
  'user research,ux,product discovery,usability test,interviews',
  NOW(3),NOW(3)
);

-- =============================================================
-- BLOG POST #3
-- =============================================================
SET @PAGE3 := UUID();
SET @IMG3  := '/assets/imgs/blog/blog-1/img-3.png';
SET @IMAGES3 := CONCAT('["', REPLACE(@IMG3, '"', '\"'), '"]');

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `author_id`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE3,@MODULE_KEY,1,30,30,
 @AUTHOR_ID,
 @IMG3,NULL,
 @IMG3,NULL,
 'Color psychology cover image',
 @IMAGES3,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE3, 'en',
  'The Role of Color Psychology',
  'the-role-of-color-psychology',
  'Mockup',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Color shapes perception</h2>',
      '<p>Color influences trust, urgency, and clarity. The right palette can increase comprehension and conversion.</p>',
      '<hr/>',
      '<h3>3 practical rules</h3>',
      '<ul>',
      '<li><strong>Contrast first</strong>: readability beats aesthetics</li>',
      '<li><strong>Limit accents</strong>: 1–2 accent colors</li>',
      '<li><strong>Match tone</strong>: serious vs playful vs premium</li>',
      '</ul>',
      '<h3>Common mistakes</h3>',
      '<ul>',
      '<li>Too many brand colors in one screen</li>',
      '<li>Low-contrast text</li>',
      '<li>Meaning only by color (no icon/label)</li>',
      '</ul>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Accessibility reminder</h4>',
      '<p>Never rely on color alone. Use icons + labels and keep contrast high.</p>',
      '</div>',
      '<h4>Conclusion</h4>',
      '<p>Color should support the message. If users must “decode” the UI, the palette is working against you.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'A practical guide to using color with intent—without overwhelming the UI.',
  'Use contrast, limit accents, and match brand tone to improve clarity and trust.',
  'Color psychology cover image',
  'The Role of Color Psychology',
  'How color impacts perception, readability, and brand trust in digital products.',
  'color psychology,ui,branding,contrast,accessibility',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE3, 'tr',
  'Renk Psikolojisinin Rolü',
  'renk-psikolojisinin-rolu',
  'Mockup',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Renk algıyı şekillendirir</h2>',
      '<p>Renk; güven, aciliyet ve netlik hissini etkiler. Doğru palet, okunabilirliği ve dönüşümü artırabilir.</p>',
      '<hr/>',
      '<h3>3 pratik kural</h3>',
      '<ul>',
      '<li><strong>Önce kontrast</strong>: okunabilirlik</li>',
      '<li><strong>Vurguyu azalt</strong>: 1–2 accent</li>',
      '<li><strong>Ton uyumu</strong>: premium / eğlenceli / ciddi</li>',
      '</ul>',
      '<h3>Sık hatalar</h3>',
      '<ul>',
      '<li>Tek ekranda çok fazla renk</li>',
      '<li>Düşük kontrast yazı</li>',
      '<li>Renk tek başına anlam taşıyor</li>',
      '</ul>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Erişilebilirlik</h4>',
      '<p>Renge güvenme. İkon + label kullan, kontrastı yüksek tut.</p>',
      '</div>',
      '<h4>Sonuç</h4>',
      '<p>Renk mesajı desteklemeli. Kullanıcı UI’ı çözmeye çalışıyorsa palet ters çalışıyordur.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'UI’ı boğmadan, renkleri amaçlı kullanmak için pratik bir yaklaşım.',
  'Kontrastı güçlendir, vurgu renklerini sınırlı tut ve marka tonuyla eşleştir: netlik ve güven artar.',
  'Renk psikolojisi kapak görseli',
  'Renk Psikolojisi',
  'Dijital ürünlerde renklerin algı, okunabilirlik ve marka güvenine etkisi.',
  'renk psikolojisi,ui,marka,kontrast,erisebilirlik',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE3, 'de',
  'Die Rolle der Farbpsychologie',
  'die-rolle-der-farbpsychologie',
  'Mockup',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Farbe prägt Wahrnehmung</h2>',
      '<p>Farben beeinflussen Vertrauen, Dringlichkeit und Klarheit. Eine passende Palette verbessert Lesbarkeit und Conversion.</p>',
      '<hr/>',
      '<h3>3 praktische Regeln</h3>',
      '<ul>',
      '<li><strong>Kontrast zuerst</strong>: Lesbarkeit vor Ästhetik</li>',
      '<li><strong>Akzente begrenzen</strong>: 1–2 Akzentfarben</li>',
      '<li><strong>Zum Ton passen</strong>: seriös vs spielerisch vs premium</li>',
      '</ul>',
      '<h3>Häufige Fehler</h3>',
      '<ul>',
      '<li>Zu viele Farben pro Screen</li>',
      '<li>Niedriger Textkontrast</li>',
      '<li>Bedeutung nur über Farbe (ohne Icon/Label)</li>',
      '</ul>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Accessibility</h4>',
      '<p>Niemals nur auf Farbe setzen. Icons + Labels nutzen und Kontrast hoch halten.</p>',
      '</div>',
      '<h4>Fazit</h4>',
      '<p>Farbe unterstützt die Botschaft. Wenn Nutzer das UI “entschlüsseln” müssen, arbeitet die Palette gegen dich.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Praktische Hinweise, wie Farben gezielt eingesetzt werden—ohne das UI zu überladen.',
  'Mehr Klarheit und Vertrauen durch Kontrast, begrenzte Akzentfarben und passende Brand-Tonalität.',
  'Farbpsychologie Titelbild',
  'Die Rolle der Farbpsychologie',
  'Wie Farben Wahrnehmung, Lesbarkeit und Markenvertrauen in digitalen Produkten beeinflussen.',
  'farbpsychologie,ui,branding,kontrast,barrierefreiheit',
  NOW(3),NOW(3)
);

-- =============================================================
-- BLOG POST #4 (AI as Tech Lead: faster + safer delivery)
-- =============================================================
SET @PAGE4 := UUID();
SET @IMG4  := '/assets/imgs/blog/blog-1/img-4.png';
SET @IMAGES4 := CONCAT('["', REPLACE(@IMG4, '"', '\"'), '"]');

INSERT INTO `custom_pages`
(`id`,`module_key`,`is_published`,`display_order`,`order_num`,
 `author_id`,
 `featured_image`,`featured_image_asset_id`,
 `image_url`,`storage_asset_id`,
 `alt`,
 `images`,`storage_image_ids`,
 `created_at`,`updated_at`)
VALUES
(@PAGE4,@MODULE_KEY,1,40,40,
 @AUTHOR_ID,
 @IMG4,NULL,
 @IMG4,NULL,
 'AI engineering workflow cover image',
 @IMAGES4,@EMPTY_ARR,
 NOW(3),NOW(3));

INSERT INTO `custom_pages_i18n`
(`id`,`page_id`,`locale`,`title`,`slug`,`category`,
 `content`,`summary`,`excerpt`,
 `featured_image_alt`,`meta_title`,`meta_description`,`tags`,
 `created_at`,`updated_at`)
VALUES
(
  UUID(), @PAGE4, 'en',
  'How to Build Projects Faster with OpenAI: A Tech Lead Workflow',
  'how-to-build-projects-faster-with-openai-tech-lead-workflow',
  'Engineering',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Stop using AI like a code typist</h2>',
      '<p>Most teams ask AI to <em>fix a bug</em> or <em>write a component</em>. That works for micro tasks, but it doesn’t scale. The fastest teams use AI like a <strong>Tech Lead</strong>: decisions first, implementation second.</p>',
      '<hr/>',
      '<h3>1) Give AI the right inputs</h3>',
      '<p>Speed comes from constraints. Before you ask for code, provide:</p>',
      '<ul>',
      '<li><strong>Context</strong>: stack, folders, existing conventions</li>',
      '<li><strong>Rules</strong>: i18n contract, schema rules, no duplication</li>',
      '<li><strong>Goal</strong>: what “done” means (routes, SEO, API, edge cases)</li>',
      '</ul>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Prompt template</h4>',
      '<pre><code>',
      'Role: Senior Full-Stack SaaS Architect\\n',
      'Context: Next.js + RTK Query + DB schema + i18n rules\\n',
      'Constraints: FINAL code, no hacks, reuse existing helpers\\n',
      'Goal: ...\\n',
      'Output: decisions, FINAL code, risks + tests',
      '</code></pre>',
      '</div>',
      '<h3>2) Checklist first, code second</h3>',
      '<p>Ask for a delivery checklist before implementation. It prevents late rework and catches missing pieces early (loading states, empty states, SEO, pagination, permissions).</p>',
      '<ul>',
      '<li>Define endpoints and DTO shapes</li>',
      '<li>Define view models (UI props)</li>',
      '<li>Add mappers/adapters</li>',
      '<li>Implement UI + data binding</li>',
      '<li>Add tests and failure modes</li>',
      '</ul>',
      '<h3>3) Use an adapter layer (mappers)</h3>',
      '<p>Templates should not know backend DTO shapes. Convert DTOs into simple view models:</p>',
      '<pre><code>',
      'mapServiceDtoToCard(dto, locale) -> ServiceCardVM\\n',
      'mapBlogDtoToCard(dto, locale) -> BlogCardVM\\n',
      'mapReviewDtoToTestimonial(dto) -> TestimonialVM',
      '</code></pre>',
      '<p>If the backend changes, you update one mapper instead of refactoring dozens of UI components.</p>',
      '<h3>4) Review like a QA lead</h3>',
      '<p>After the code is generated, ask AI to attack it:</p>',
      '<ul>',
      '<li>Where will this break in 6 months?</li>',
      '<li>What are the top 5 edge cases?</li>',
      '<li>What is the worst production failure mode?</li>',
      '</ul>',
      '<blockquote><p><strong>Rule:</strong> treat AI output like a junior dev PR. Demand clean boundaries and predictable behavior.</p></blockquote>',
      '<h3>5) A repeatable daily routine</h3>',
      '<ol>',
      '<li>Plan: “What do we ship today?”</li>',
      '<li>Risk scan: “What is the riskiest part?”</li>',
      '<li>Build: checklist → code</li>',
      '<li>Review: “be ruthless” QA pass</li>',
      '</ol>',
      '<h4>Conclusion</h4>',
      '<p>AI is not just for typing code. Used as a Tech Lead, it becomes a decision engine: faster delivery, less rework, and more consistent architecture.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'A practical workflow to use OpenAI like a Tech Lead: checklist-first delivery, adapter layers, and ruthless QA review.',
  'Move from micro tasks to a repeatable Tech Lead workflow: constraints, checklists, mappers, and QA-style review.',
  'AI engineering workflow cover image',
  'How to Build Projects Faster with OpenAI: A Tech Lead Workflow',
  'Use OpenAI as a Tech Lead: define constraints, ship via checklists, isolate DTOs with mappers, and review like QA.',
  'openai,ai workflow,software delivery,tech lead,checklist,mappers,rtk,nextjs',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE4, 'tr',
  'OpenAI ile Projeleri Daha Hızlı Bitirmek: Tech Lead İş Akışı',
  'openai-ile-projeleri-daha-hizli-bitirmek-tech-lead-is-akisi',
  'Yazılım',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>AI’yi “kod yazan biri” gibi kullanmayı bırak</h2>',
      '<p>Çoğu ekip AI’den “şu bug’ı çöz” veya “şu component’i yaz” ister. Bu mikro görevlerde işe yarar; ama ölçeklemez. En hızlı ekipler AI’yi <strong>Tech Lead</strong> gibi kullanır: önce karar, sonra implementasyon.</p>',
      '<hr/>',
      '<h3>1) Doğru input setini ver</h3>',
      '<p>Hız, kısıtlarla gelir. Kod istemeden önce şunları netleştir:</p>',
      '<ul>',
      '<li><strong>Bağlam</strong>: stack, klasör yapısı, mevcut standartlar</li>',
      '<li><strong>Kurallar</strong>: i18n contract, schema kuralları, tekrar yok</li>',
      '<li><strong>Hedef</strong>: “done” tanımı (route, SEO, API, edge-case)</li>',
      '</ul>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Prompt şablonu</h4>',
      '<pre><code>',
      'Rol: Senior Full-Stack SaaS Architect\\n',
      'Bağlam: Next.js + RTK Query + DB schema + i18n kuralları\\n',
      'Kısıt: FINAL kod, hack yok, mevcut helper’ları kullan\\n',
      'Hedef: ...\\n',
      'Çıktı: kararlar, FINAL kod, riskler + test',
      '</code></pre>',
      '</div>',
      '<h3>2) Önce checklist, sonra kod</h3>',
      '<p>Implementasyondan önce teslim checklist’i çıkar. Bu; loading/empty state, SEO, pagination, permission gibi kritik parçaları baştan yakalar.</p>',
      '<ul>',
      '<li>Endpoint ve DTO şekilleri</li>',
      '<li>View model (UI props) tanımı</li>',
      '<li>Mapper/adapter katmanı</li>',
      '<li>UI + data binding</li>',
      '<li>Testler ve failure mode’lar</li>',
      '</ul>',
      '<h3>3) Adapter katmanı kullan (mapper)</h3>',
      '<p>Template UI backend DTO’larını bilmemeli. DTO’yu basit view model’e çevir:</p>',
      '<pre><code>',
      'mapServiceDtoToCard(dto, locale) -> ServiceCardVM\\n',
      'mapBlogDtoToCard(dto, locale) -> BlogCardVM\\n',
      'mapReviewDtoToTestimonial(dto) -> TestimonialVM',
      '</code></pre>',
      '<p>Backend değişirse onlarca UI dosyası yerine tek mapper güncellersin.</p>',
      '<h3>4) QA gibi review ettir</h3>',
      '<p>Kod üretildikten sonra AI’ye “acımasız” denetim yaptır:</p>',
      '<ul>',
      '<li>6 ay sonra neresi patlar?</li>',
      '<li>Top 5 edge-case nedir?</li>',
      '<li>En kötü prod failure mode hangisi?</li>',
      '</ul>',
      '<blockquote><p><strong>Kural:</strong> AI çıktısını junior PR gibi düşün. Sınırlar net mi, davranış öngörülebilir mi?</p></blockquote>',
      '<h3>5) Günlük rutin (tekrarlanabilir)</h3>',
      '<ol>',
      '<li>Plan: “Bugün ne ship ediyorum?”</li>',
      '<li>Risk: “En riskli parça hangisi?”</li>',
      '<li>Build: checklist → kod</li>',
      '<li>Review: QA pass</li>',
      '</ol>',
      '<h4>Sonuç</h4>',
      '<p>AI sadece kod yazdırma aracı değil; doğru kullanıldığında karar motoru olur: daha hızlı teslim, daha az refactor ve daha tutarlı mimari.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'OpenAI’yi Tech Lead gibi kullanmak için pratik bir akış: checklist-first teslim, mapper katmanı ve QA review.',
  'Mikro görevlerden çık: kısıtları netleştir, checklist ile ilerle, mapper ile DTO’yu izole et, QA gibi denetle.',
  'AI iş akışı kapak görseli',
  'OpenAI ile Projeleri Daha Hızlı Bitirmek: Tech Lead İş Akışı',
  'OpenAI’yi Tech Lead gibi kullan: kısıtları tanımla, checklist ile ship et, mapper ile DTO’yu izole et, QA review uygula.',
  'openai,yapay zeka,is akisi,yazilim teslim,tech lead,checklist,mapper,nextjs,rtk',
  NOW(3),NOW(3)
),
(
  UUID(), @PAGE4, 'de',
  'Projekte schneller bauen mit OpenAI: Ein Tech-Lead-Workflow',
  'projekte-schneller-bauen-mit-openai-tech-lead-workflow',
  'Engineering',
  CONCAT(
    '{"html":"',
    REPLACE(REPLACE(REPLACE(CONCAT(
      '<h2>Nutze AI nicht nur zum Tippen von Code</h2>',
      '<p>Viele Teams bitten AI um “Bug fixen” oder “Komponente schreiben”. Das hilft bei Micro-Tasks, skaliert aber schlecht. Die schnellsten Teams nutzen AI wie einen <strong>Tech Lead</strong>: erst Entscheidungen, dann Umsetzung.</p>',
      '<hr/>',
      '<h3>1) Gib die richtigen Inputs</h3>',
      '<p>Geschwindigkeit entsteht durch klare Constraints. Vor dem Code:</p>',
      '<ul>',
      '<li><strong>Kontext</strong>: Stack, Ordnerstruktur, Konventionen</li>',
      '<li><strong>Regeln</strong>: i18n Contract, Schema-Regeln, keine Duplikate</li>',
      '<li><strong>Ziel</strong>: Definition of Done (Routes, SEO, API, Edge Cases)</li>',
      '</ul>',
      '<div class="border-linear-3 rounded-4 p-4 mt-4">',
      '<h4>Prompt Vorlage</h4>',
      '<pre><code>',
      'Rolle: Senior Full-Stack SaaS Architect\\n',
      'Kontext: Next.js + RTK Query + DB Schema + i18n Regeln\\n',
      'Constraints: FINAL Code, keine Hacks, vorhandene Helper nutzen\\n',
      'Ziel: ...\\n',
      'Output: Entscheidungen, FINAL Code, Risiken + Tests',
      '</code></pre>',
      '</div>',
      '<h3>2) Erst Checklist, dann Code</h3>',
      '<p>Eine Delivery-Checklist vor der Umsetzung verhindert späte Rework-Schleifen (Loading/Empty States, SEO, Pagination, Permissions).</p>',
      '<ul>',
      '<li>Endpoints und DTO Shapes</li>',
      '<li>View Models (UI Props)</li>',
      '<li>Mapper/Adapter Layer</li>',
      '<li>UI + Data Binding</li>',
      '<li>Tests und Failure Modes</li>',
      '</ul>',
      '<h3>3) Adapter Layer (Mapper) einsetzen</h3>',
      '<p>Templates sollten Backend-DTOs nicht kennen. Wandle DTOs in einfache View Models um:</p>',
      '<pre><code>',
      'mapServiceDtoToCard(dto, locale) -> ServiceCardVM\\n',
      'mapBlogDtoToCard(dto, locale) -> BlogCardVM\\n',
      'mapReviewDtoToTestimonial(dto) -> TestimonialVM',
      '</code></pre>',
      '<p>Wenn sich das Backend ändert, aktualisierst du einen Mapper statt dutzende UI-Komponenten.</p>',
      '<h3>4) Review wie QA</h3>',
      '<p>Nach der Generierung: AI soll den Code angreifen.</p>',
      '<ul>',
      '<li>Was bricht in 6 Monaten?</li>',
      '<li>Top 5 Edge Cases?</li>',
      '<li>Worst-Case Production Failure Mode?</li>',
      '</ul>',
      '<blockquote><p><strong>Regel:</strong> behandle AI Output wie ein Junior-PR. Grenzen klar, Verhalten vorhersehbar.</p></blockquote>',
      '<h3>5) Tägliche Routine</h3>',
      '<ol>',
      '<li>Plan: “Was shippen wir heute?”</li>',
      '<li>Risiko: “Was ist der riskanteste Teil?”</li>',
      '<li>Build: Checklist → Code</li>',
      '<li>Review: QA Pass</li>',
      '</ol>',
      '<h4>Fazit</h4>',
      '<p>AI ist mehr als Code-Autocomplete. Als Tech Lead genutzt wird sie zur Entscheidungs-Engine: schneller liefern, weniger Rework, konsistentere Architektur.</p>'
    ), '"', '\"'), '\n', '\\n'), '\r', ''),
    '"}'
  ),
  'Ein praktischer Tech-Lead-Workflow: checklist-first Delivery, Mapper/Adapter Layer und QA-orientiertes Review mit OpenAI.',
  'Raus aus Micro-Tasks: klare Constraints, Checklist, Mapper zur DTO-Isolation und ein harter QA-Review.',
  'AI Engineering Workflow Titelbild',
  'Projekte schneller bauen mit OpenAI: Ein Tech-Lead-Workflow',
  'OpenAI als Tech Lead: Constraints definieren, per Checklist shippen, DTOs via Mapper isolieren, QA Review durchführen.',
  'openai,ai workflow,software delivery,tech lead,checklist,mapper,nextjs,rtk',
  NOW(3),NOW(3)
);



COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
