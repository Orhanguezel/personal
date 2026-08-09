-- =============================================================
-- FILE: content/gzl/903_gzl_about_page.sql
-- ELLE YAZILDI. Hakkimizda sayfasi — kaynak: icerik/hakkimizda.{tr,en}.md
--
-- GZL Teknoloji'nin kurumsal anlatimi (unvan, kurulus, kurucu gecmisi,
-- kanitlanabilir isler, calisma ilkeleri, kurumsal kimlik).
-- Markdown'daki "Kaynak / dayanak" bolumu IC NOT oldugu icin yayina alinmadi.
--
-- ESCAPE NOTU: MySQL tek tirnakli dizgede ters bolu de kacistir; uretim
-- sirasinda hem ters bolu hem tek tirnak ikilenmistir.
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `custom_pages` (`id`, `module_key`, `is_published`, `display_order`)
VALUES ('8478ea33-66fd-5f08-912c-1aff9da9eb06', 'about', 1, 1)
ON DUPLICATE KEY UPDATE `is_published` = VALUES(`is_published`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`, `meta_title`, `meta_description`)
VALUES
  ('9e005aca-807b-53ee-8139-805dc61dd7a6', '8478ea33-66fd-5f08-912c-1aff9da9eb06', 'tr', 'Hakkımızda', 'hakkimizda', '<p>GZL Teknoloji, Gemlik/Bursa merkezli bir yazılım ve dijital danışmanlık şirketidir. Resmî unvanımız <strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong>''dir ve şirketimiz 10 Haziran 2026''da kurulmuştur. Özel yazılım geliştirme, kurumsal web sitesi ve e-ticaret projeleri, iş süreçleri otomasyonu, yapay zekâ entegrasyonu ve GEO/SEO danışmanlığı alanlarında çalışıyoruz.</p>
<h2>Mühendislikten yazılıma: birinci el deneyim</h2>
<p>Kurucumuz <strong>Orhan Güzel</strong>, yazılım sektörüne geçmeden önce 15 yıl kamu sektöründe mühendis olarak görev yaptı. Bu dönemin kazandırdığı proje disiplini, şartname okuma alışkanlığı ve süreç yönetimi becerisi, bugün her yazılım projemizde uyguladığımız çalışma biçiminin temelini oluşturuyor: net kapsam, yazılı teslim kriterleri ve ölçülebilir sonuç.</p>
<p>Yazılıma geçiş bir kariyer değişikliğinden fazlasıydı. Orhan Güzel, DCI Web Geliştirme programını (2025) tamamladıktan sonra Almanya ve Türkiye pazarlarında art arda gerçek projeler geliştirdi ve canlıya aldı. Almanya''daki çalışmalarımız guezelwebdesign.de üzerinden yürütülür. Bugün anlattığımız her yetkinliğin arkasında bizzat tasarlanmış, kodlanmış, yayına alınmış ve işletilen bir sistem vardır — ikinci elden aktarılan bilgi değil, birinci el deneyim.</p>
<h2>Kanıtlanabilir işler</h2>
<p>Portfolyomuzda <strong>21 tamamlanmış proje</strong> yer alıyor. Öne çıkanlar:</p>
<ul>
<li><strong>Sportoonline</strong> — spor ve outdoor e-ticaret platformu (canlı)</li>
<li><strong>Ensotek</strong> — çok kiracılı B2B SaaS platformu (canlı)</li>
<li><strong>Vista İnşaat</strong> ve <strong>Bereket Fide</strong> — kurumsal web siteleri ve yönetim panelleri (canlı)</li>
<li><strong>MarketPulse</strong> — bayi, rakip ve pazar izleme SaaS paneli</li>
<li><strong>SocialPulse</strong> — sosyal medya yönetim ve otomasyon platformu</li>
<li><strong>Paspas ERP</strong> — üretim ve operasyon yönetim sistemi (teslim edildi)</li>
<li><strong>GeoSerra</strong> — yapay zekâ aramaları için GEO + SEO platformu</li>
</ul>
<p>Bionluk üzerindeki hizmet geçmişimizde 16 tamamlanmış sipariş ve 4,50/5 değerlendirme puanı bulunuyor (Haziran 2026 itibarıyla).</p>
<h2>Ne yapıyoruz</h2>
<ul>
<li><strong>Kurumsal web sitesi ve e-ticaret:</strong> Next.js altyapılı, çok dilli, paketli teslim modeliyle</li>
<li><strong>Özel yazılım:</strong> ERP, CRM ve lead bulma panelleri, online sipariş sistemleri</li>
<li><strong>Otomasyon:</strong> veri kazıma (web scraping), bot geliştirme, API entegrasyonları</li>
<li><strong>Yapay zekâ entegrasyonu:</strong> AI destekli içerik, tahmin ve karar destek sistemleri</li>
<li><strong>GEO/SEO danışmanlığı:</strong> klasik arama motorları ve ChatGPT, Perplexity gibi yapay zekâ aramaları için görünürlük</li>
</ul>
<h2>Çalışma ilkelerimiz</h2>
<ol>
<li><strong>Şeffaf kapsam ve fiyat.</strong> Her teklif; kapsamı, teslim süresini ve revizyon hakkını yazılı olarak içerir.</li>
<li><strong>Canlıya alma dahildir.</strong> Proje kod tesliminde değil, sunucuda sorunsuz çalıştığında biter.</li>
<li><strong>Ölçülebilir sonuç.</strong> Performans (Lighthouse/Core Web Vitals), dönüşüm izleme ve SEO çıktıları raporlanır.</li>
<li><strong>Tek muhatap.</strong> Tasarımdan yayına kadar süreci aynı ekip yürütür; kayıp aktarım olmaz.</li>
</ol>
<h2>Kurumsal kimlik</h2>
<ul>
<li><strong>Unvan:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</li>
<li><strong>Adres:</strong> Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa</li>
<li><strong>Vergi:</strong> Gemlik VD — 4542302453 · <strong>MERSİS:</strong> 0454230245300001 · <strong>Ticaret Sicil:</strong> 7069 (Gemlik)</li>
<li><strong>Kuruluş:</strong> 10.06.2026</li>
<li><strong>Şirket müdürü:</strong> Nutuya Güzel</li>
<li><strong>E-posta:</strong> info@gzlteknoloji.com</li>
<li>Almanya''daki çalışmalarımız guezelwebdesign.de üzerinden yürütülür (ayrı tüzel yapı).</li>
</ul>',
   'GZL Teknoloji — Gemlik/Bursa merkezli yazılım ve dijital danışmanlık şirketi.', 'Hakkımızda | GZL Teknoloji', 'GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. — Gemlik/Bursa merkezli yazılım şirketi. 21 tamamlanmış proje, özel yazılım, e-ticaret, otomasyon ve GEO/SEO danışmanlığı.')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `content` = VALUES(`content`),
  `summary` = VALUES(`summary`), `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`), `updated_at` = CURRENT_TIMESTAMP(3);

INSERT INTO `custom_pages_i18n`
  (`id`, `page_id`, `locale`, `title`, `slug`, `content`, `summary`, `meta_title`, `meta_description`)
VALUES
  ('68aed483-1828-5002-8847-31f0af9f0880', '8478ea33-66fd-5f08-912c-1aff9da9eb06', 'en', 'About Us', 'about-us', '<p>GZL Teknoloji is a software and digital consulting company based in Gemlik, Bursa (Türkiye). Our registered name is <strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong>, incorporated on 10 June 2026. We work in custom software development, corporate websites and e-commerce, business process automation, AI integration and GEO/SEO consulting.</p>
<h2>From engineering to software: first-hand experience</h2>
<p>Our founder, <strong>Orhan Güzel</strong>, worked for 15 years as an engineer in the public sector before moving into software. The project discipline, specification-driven thinking and process management skills from that period form the foundation of how we run every software project today: a clear scope, written acceptance criteria and measurable results.</p>
<p>The move into software was more than a career change. After completing the DCI Web Development program (2025), Orhan Güzel built and shipped a series of real, production projects for the German and Turkish markets. Our work in Germany is carried out through guezelwebdesign.de. Behind every capability we describe there is a system that was personally designed, coded, deployed and operated — first-hand experience, not second-hand knowledge.</p>
<h2>Verifiable work</h2>
<p>Our portfolio contains <strong>21 completed projects</strong>. Highlights include:</p>
<ul>
<li><strong>Sportoonline</strong> — sports and outdoor e-commerce platform (live)</li>
<li><strong>Ensotek</strong> — multi-tenant B2B SaaS platform (live)</li>
<li><strong>Vista İnşaat</strong> and <strong>Bereket Fide</strong> — corporate websites with admin panels (live)</li>
<li><strong>MarketPulse</strong> — dealer, competitor and market monitoring SaaS panel</li>
<li><strong>SocialPulse</strong> — social media management and automation platform</li>
<li><strong>Paspas ERP</strong> — production and operations management system (delivered)</li>
<li><strong>GeoSerra</strong> — GEO + SEO platform for AI-powered search</li>
</ul>
<p>Our service history on Bionluk shows 16 completed orders with a 4.50/5 rating (as of June 2026).</p>
<h2>What we do</h2>
<ul>
<li><strong>Corporate websites and e-commerce:</strong> built on Next.js, multilingual, delivered as fixed-scope packages</li>
<li><strong>Custom software:</strong> ERP systems, CRM and lead generation panels, online ordering systems</li>
<li><strong>Automation:</strong> web scraping, bot development, API integrations</li>
<li><strong>AI integration:</strong> AI-assisted content, prediction and decision-support systems</li>
<li><strong>GEO/SEO consulting:</strong> visibility in classic search engines and in AI search such as ChatGPT and Perplexity</li>
</ul>
<h2>How we work</h2>
<ol>
<li><strong>Transparent scope and pricing.</strong> Every proposal states the scope, delivery time and revision rights in writing.</li>
<li><strong>Deployment is included.</strong> A project is finished when it runs reliably in production, not when the code is handed over.</li>
<li><strong>Measurable results.</strong> Performance (Lighthouse/Core Web Vitals), conversion tracking and SEO outcomes are reported.</li>
<li><strong>One point of contact.</strong> The same team handles the process from design to launch — nothing is lost in handovers.</li>
</ol>
<h2>Company details</h2>
<ul>
<li><strong>Registered name:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</li>
<li><strong>Address:</strong> Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik / Bursa, Türkiye</li>
<li><strong>Tax:</strong> Gemlik Tax Office — 4542302453 · <strong>MERSIS:</strong> 0454230245300001 · <strong>Trade Registry:</strong> 7069 (Gemlik)</li>
<li><strong>Incorporated:</strong> 10 June 2026</li>
<li><strong>Company director:</strong> Nutuya Güzel</li>
<li><strong>E-mail:</strong> info@gzlteknoloji.com</li>
<li>Our work in Germany is carried out through guezelwebdesign.de (a separate legal entity).</li>
</ul>',
   'GZL Technology — software and digital consulting company based in Gemlik/Bursa, Türkiye.', 'About Us | GZL Technology', 'GZL Danismanlik Hizmetleri ve Teknoloji Ltd. Sti. — software company based in Gemlik/Bursa. 21 completed projects, custom software, e-commerce, automation and GEO/SEO consulting.')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `content` = VALUES(`content`),
  `summary` = VALUES(`summary`), `meta_title` = VALUES(`meta_title`),
  `meta_description` = VALUES(`meta_description`), `updated_at` = CURRENT_TIMESTAMP(3);
