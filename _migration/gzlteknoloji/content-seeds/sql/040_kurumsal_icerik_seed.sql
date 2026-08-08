-- =============================================================
-- 040 — Kurumsal icerik: hakkimizda anlatisi + legal TASLAKLAR
-- Kaynak: docs/icerik/ (OPUS teslimi, 2026-07-10)
-- Legal sayfalar is_published=0 — AVUKAT ONAYI SONRASI Codex publish eder
-- (WP-6: route'lar + footer menu + is_published=1).
-- =============================================================

SET NAMES utf8mb4;

INSERT INTO `site_settings` (`id`, `key`, `locale`, `value`) VALUES
('ss-ui-about-page-tr', 'ui_about_page', 'tr', '{"intro":"GZL Teknoloji, Gemlik/Bursa merkezli bir yazılım ve dijital danışmanlık şirketidir. Resmî unvanımız GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.''dir ve şirketimiz 10 Haziran 2026''da kurulmuştur. Özel yazılım geliştirme, kurumsal web sitesi ve e-ticaret projeleri, iş süreçleri otomasyonu, yapay zekâ entegrasyonu ve GEO/SEO danışmanlığı alanlarında çalışıyoruz.","sections":[{"title":"Mühendislikten yazılıma: birinci el deneyim","paragraphs":["Kurucumuz Orhan Güzel, yazılım sektörüne geçmeden önce 15 yıl kamu sektöründe mühendis olarak görev yaptı. Bu dönemin kazandırdığı proje disiplini, şartname okuma alışkanlığı ve süreç yönetimi becerisi, bugün her yazılım projemizde uyguladığımız çalışma biçiminin temelini oluşturuyor: net kapsam, yazılı teslim kriterleri ve ölçülebilir sonuç.","Yazılıma geçiş bir kariyer değişikliğinden fazlasıydı. Orhan Güzel, DCI Web Geliştirme programını (2025) tamamladıktan sonra Almanya ve Türkiye pazarlarında art arda gerçek projeler geliştirdi ve canlıya aldı. Almanya''daki çalışmalarımız guezelwebdesign.de üzerinden yürütülür. Bugün anlattığımız her yetkinliğin arkasında bizzat tasarlanmış, kodlanmış, yayına alınmış ve işletilen bir sistem vardır — ikinci elden aktarılan bilgi değil, birinci el deneyim."],"items":[]},{"title":"Kanıtlanabilir işler","paragraphs":["Portfolyomuzda 21 tamamlanmış proje yer alıyor. Öne çıkanlar:","Bionluk üzerindeki hizmet geçmişimizde 16 tamamlanmış sipariş ve 4,50/5 değerlendirme puanı bulunuyor (Haziran 2026 itibarıyla)."],"items":["Sportoonline — spor ve outdoor e-ticaret platformu (canlı)","Ensotek — çok kiracılı B2B SaaS platformu (canlı)","Vista İnşaat ve Bereket Fide — kurumsal web siteleri ve yönetim panelleri (canlı)","MarketPulse — bayi, rakip ve pazar izleme SaaS paneli","SocialPulse — sosyal medya yönetim ve otomasyon platformu","Paspas ERP — üretim ve operasyon yönetim sistemi (teslim edildi)","GeoSerra — yapay zekâ aramaları için GEO + SEO platformu"]},{"title":"Ne yapıyoruz","paragraphs":[],"items":["Kurumsal web sitesi ve e-ticaret: Next.js altyapılı, çok dilli, paketli teslim modeliyle","Özel yazılım: ERP, CRM ve lead bulma panelleri, online sipariş sistemleri","Otomasyon: veri kazıma (web scraping), bot geliştirme, API entegrasyonları","Yapay zekâ entegrasyonu: AI destekli içerik, tahmin ve karar destek sistemleri","GEO/SEO danışmanlığı: klasik arama motorları ve ChatGPT, Perplexity gibi yapay zekâ aramaları için görünürlük"]},{"title":"Çalışma ilkelerimiz","paragraphs":[],"items":["Şeffaf kapsam ve fiyat. Her teklif; kapsamı, teslim süresini ve revizyon hakkını yazılı olarak içerir.","Canlıya alma dahildir. Proje kod tesliminde değil, sunucuda sorunsuz çalıştığında biter.","Ölçülebilir sonuç. Performans (Lighthouse/Core Web Vitals), dönüşüm izleme ve SEO çıktıları raporlanır.","Tek muhatap. Tasarımdan yayına kadar süreci aynı ekip yürütür; kayıp aktarım olmaz."]},{"title":"Kurumsal kimlik","paragraphs":[],"items":["Unvan: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.","Adres: Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa","Vergi: Gemlik VD — 4542302453 · MERSİS: 0454230245300001 · Ticaret Sicil: 7069 (Gemlik)","Kuruluş: 10.06.2026","Şirket müdürü: Nutuya Güzel","E-posta: info@gzlteknoloji.com","Almanya''daki çalışmalarımız guezelwebdesign.de üzerinden yürütülür (ayrı tüzel yapı)."]}],"title":"GZL Teknoloji Hakkında"}'),
('ss-ui-about-page-en', 'ui_about_page', 'en', '{"intro":"GZL Teknoloji is a software and digital consulting company based in Gemlik, Bursa (Türkiye). Our registered name is GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., incorporated on 10 June 2026. We work in custom software development, corporate websites and e-commerce, business process automation, AI integration and GEO/SEO consulting.","sections":[{"title":"From engineering to software: first-hand experience","paragraphs":["Our founder, Orhan Güzel, worked for 15 years as an engineer in the public sector before moving into software. The project discipline, specification-driven thinking and process management skills from that period form the foundation of how we run every software project today: a clear scope, written acceptance criteria and measurable results.","The move into software was more than a career change. After completing the DCI Web Development program (2025), Orhan Güzel built and shipped a series of real, production projects for the German and Turkish markets. Our work in Germany is carried out through guezelwebdesign.de. Behind every capability we describe there is a system that was personally designed, coded, deployed and operated — first-hand experience, not second-hand knowledge."],"items":[]},{"title":"Verifiable work","paragraphs":["Our portfolio contains 21 completed projects. Highlights include:","Our service history on Bionluk shows 16 completed orders with a 4.50/5 rating (as of June 2026)."],"items":["Sportoonline — sports and outdoor e-commerce platform (live)","Ensotek — multi-tenant B2B SaaS platform (live)","Vista İnşaat and Bereket Fide — corporate websites with admin panels (live)","MarketPulse — dealer, competitor and market monitoring SaaS panel","SocialPulse — social media management and automation platform","Paspas ERP — production and operations management system (delivered)","GeoSerra — GEO + SEO platform for AI-powered search"]},{"title":"What we do","paragraphs":[],"items":["Corporate websites and e-commerce: built on Next.js, multilingual, delivered as fixed-scope packages","Custom software: ERP systems, CRM and lead generation panels, online ordering systems","Automation: web scraping, bot development, API integrations","AI integration: AI-assisted content, prediction and decision-support systems","GEO/SEO consulting: visibility in classic search engines and in AI search such as ChatGPT and Perplexity"]},{"title":"How we work","paragraphs":[],"items":["Transparent scope and pricing. Every proposal states the scope, delivery time and revision rights in writing.","Deployment is included. A project is finished when it runs reliably in production, not when the code is handed over.","Measurable results. Performance (Lighthouse/Core Web Vitals), conversion tracking and SEO outcomes are reported.","One point of contact. The same team handles the process from design to launch — nothing is lost in handovers."]},{"title":"Company details","paragraphs":[],"items":["Registered name: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.","Address: Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14, Gemlik / Bursa, Türkiye","Tax: Gemlik Tax Office — 4542302453 · MERSIS: 0454230245300001 · Trade Registry: 7069 (Gemlik)","Incorporated: 10 June 2026","Company director: Nutuya Güzel","E-mail: info@gzlteknoloji.com","Our work in Germany is carried out through guezelwebdesign.de (a separate legal entity)."]}],"title":"About GZL Technology"}')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

INSERT INTO `custom_pages` (`id`,`module_key`,`is_published`,`display_order`) VALUES
('41000000-0000-4000-8000-000000000101','legal',0,10),('41000000-0000-4000-8000-000000000102','legal',0,20),('41000000-0000-4000-8000-000000000103','legal',0,30),('41000000-0000-4000-8000-000000000104','legal',0,40)
ON DUPLICATE KEY UPDATE `module_key`=VALUES(`module_key`), `display_order`=VALUES(`display_order`);

INSERT INTO custom_pages_i18n (page_id,locale,title,slug,content,summary,meta_title,meta_description) VALUES
('41000000-0000-4000-8000-000000000101','tr','Mesafeli Satış Sözleşmesi','mesafeli-satis-sozlesmesi','<blockquote><p>TASLAK — yayına almadan önce avukat onayı gereklidir. Hukuki danışmanlık teşkil etmez.</p></blockquote>
<h2>Madde 1 — Taraflar</h2>
<h3>1.1 SATICI (Hizmet Sağlayıcı)</h3>
<p>| Alan | Bilgi |</p>
<p>|------|-------|</p>
<p>| Unvan | GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. |</p>
<p>| Merkez | Gemlik/Bursa |</p>
<p>| Adres | Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa |</p>
<p>| Vergi Dairesi / No | Gemlik VD — 4542302453 |</p>
<p>| MERSİS | 0454230245300001 |</p>
<p>| Ticaret Sicil No | 7069 (Gemlik) |</p>
<p>| Telefon | {{TELEFON}} |</p>
<p>| E-posta | info@gzlteknoloji.com |</p>
<p>| İnternet sitesi | gzlteknoloji.com |</p>
<p>(Bundan sonra "SATICI" olarak anılacaktır.)</p>
<h3>1.2 ALICI</h3>
<p>| Alan | Bilgi |</p>
<p>|------|-------|</p>
<p>| Ad Soyad / Unvan | {{ALICI_AD_SOYAD_UNVAN}} |</p>
<p>| Adres | {{ALICI_ADRES}} |</p>
<p>| Telefon | {{ALICI_TELEFON}} |</p>
<p>| E-posta | {{ALICI_EPOSTA}} |</p>
<p>| TC Kimlik No / Vergi No (fatura için) | {{ALICI_TCKN_VKN}} |</p>
<p>(Bundan sonra "ALICI" olarak anılacaktır.)</p>
<h2>Madde 2 — Tanımlar</h2>
<p>Bu sözleşmede geçen;</p>
<ul>
<li><strong>Kanun:</strong> 6502 sayılı Tüketicinin Korunması Hakkında Kanun''u,</li>
<li><strong>Yönetmelik:</strong> Mesafeli Sözleşmeler Yönetmeliği''ni,</li>
<li><strong>Hizmet:</strong> Bir ücret karşılığında yapılan ya da yapılması taahhüt edilen mal sağlama dışındaki her türlü tüketici işleminin konusunu,</li>
<li><strong>Dijital Teslimat:</strong> Hizmet çıktısının fiziksel bir taşıyıcı olmaksızın elektronik ortamda ALICI''ya sunulmasını (erişim/yönetim bilgilerinin iletilmesi, sistemin ALICI''nın kullanımına açılması veya kurulumun ALICI''ya ait ortamda tamamlanması),</li>
<li><strong>Sipariş Sayfası:</strong> SATICI''nın internet sitesinde seçilen hizmet paketine ait kapsam, bedel, teslim süresi ve revizyon hakkının görüntülendiği sayfayı,</li>
<li><strong>Platform:</strong> gzlteknoloji.com alan adlı internet sitesini</li>
</ul>
<p>ifade eder.</p>
<h2>Madde 3 — Sözleşmenin Konusu</h2>
<p>3.1. İşbu sözleşmenin konusu; ALICI''nın Platform üzerinden elektronik ortamda siparişini verdiği, nitelikleri ve satış bedeli Sipariş Sayfası''nda ve ön bilgilendirme formunda belirtilen hizmetin ifası ile tarafların hak ve yükümlülüklerinin, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca belirlenmesidir.</p>
<p>3.2. SATICI''nın sunduğu hizmetler; yazılım geliştirme, web sitesi ve e-ticaret altyapısı kurulumu, veri analizi ve raporlama, otomasyon/panel kurulumu, teknik danışmanlık ve abonelik esaslı yönetim panelleri gibi <strong>hizmet ifası ve dijital teslimat</strong> niteliğindedir. Sözleşme kapsamında <strong>fiziksel ürün satışı ve kargo ile teslimat yoktur.</strong></p>
<h2>Madde 4 — Sözleşme Konusu Hizmetin Nitelikleri</h2>
<p>4.1. Hizmetin temel nitelikleri (kapsam, paket içeriği, dahil olan iş kalemleri, revizyon hakkı sayısı) ALICI''nın seçtiği paketin Sipariş Sayfası''nda yer aldığı şekildedir ve işbu sözleşmenin ayrılmaz parçasıdır.</p>
<p>4.2. Sipariş anında Sipariş Sayfası''nda ilan edilen bedel ve nitelikler, taraflar arasında yazılı olarak aksi kararlaştırılmadıkça geçerlidir.</p>
<h2>Madde 5 — Hizmet Bedeli ve Ödeme</h2>
<p>5.1. Hizmet bedeli, tüm vergiler dahil olmak üzere Sipariş Sayfası''nda ve ödeme adımında Türk Lirası (TL) olarak gösterilen tutardır.</p>
<p>5.2. Ödeme, Platform üzerinden <strong>Iyzico ödeme altyapısı aracılığıyla kredi kartı / banka kartı</strong> ile tahsil edilir. Kart bilgileri SATICI tarafından saklanmaz; ödeme işlemi Iyzico''nun güvenli ödeme sayfası/altyapısı üzerinden gerçekleştirilir.</p>
<p>5.3. Aylık abonelik niteliğindeki hizmetlerde (ör. bakım planları, sosyal medya yönetimi, panel abonelikleri) bedel, Sipariş Sayfası''nda "aylık" olarak belirtilen tutar üzerinden dönemsel olarak tahsil edilir. Kurulum bedeli ile aylık bedel ayrımı Sipariş Sayfası''nda açıkça gösterilir.</p>
<p>5.4. Bankanın/kart kuruluşunun kampanya, taksit veya ek ücret uygulamaları ALICI ile bankası arasındaki ilişkiye tabidir.</p>
<h2>Madde 6 — İfa ve Teslim Süresi</h2>
<p>6.1. Hizmetin ifasına, ödemenin onaylanması ve ifa için ALICI''dan alınması gereken bilgi/içerik/erişimlerin (alan adı, sunucu erişimi, marka görselleri, metinler vb.) SATICI''ya eksiksiz iletilmesiyle başlanır.</p>
<p>6.2. Hizmet, <strong>sipariş sayfasında belirtilen teslim süresi</strong> içinde ifa edilir. Teslim süresi paket bazında farklılık gösterir ve her paketin Sipariş Sayfası''nda gün olarak açıkça ilan edilir. ALICI''dan beklenen bilgi ve içeriklerin geç iletilmesinden kaynaklanan gecikmeler teslim süresine eklenir.</p>
<p>6.3. <strong>Dijital teslimat</strong>, aşağıdaki hallerden uygun olanının gerçekleşmesiyle tamamlanmış sayılır: a) Hizmet çıktısına ait erişim/yönetim bilgilerinin ALICI''nın bildirdiği e-posta adresine iletilmesi, b) Kurulumun ALICI''ya ait alan adı/sunucu/hesap üzerinde tamamlanarak kullanıma açılması, c) Rapor, analiz veya dijital içeriğin elektronik ortamda ALICI''ya gönderilmesi.</p>
<p>6.4. SATICI, haklı bir sebebin varlığı hâlinde durumu ALICI''ya bildirmek kaydıyla ifayı makul süre erteleyebilir; ifanın imkânsızlaştığı hâllerde ilgili mevzuat hükümleri uyarınca tahsil edilen bedel ALICI''ya iade edilir.</p>
<h2>Madde 7 — Cayma Hakkı</h2>
<p>7.1. ALICI''nın tüketici sıfatını taşıması hâlinde; ALICI, hizmet ifasına ilişkin mesafeli sözleşmelerde <strong>sözleşmenin kurulduğu günden itibaren on dört (14) gün</strong> içinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkına sahiptir. Madde 8''deki istisnalar saklıdır.</p>
<p>7.2. Cayma bildirimi, süre dolmadan önce yazılı olarak veya kalıcı veri saklayıcısı ile <strong>info@gzlteknoloji.com</strong> adresine iletilir. ALICI, ön bilgilendirme formu ekindeki örnek cayma formunu kullanabilir; ancak bu zorunlu değildir.</p>
<p>7.3. Süresinde ve geçerli şekilde kullanılan cayma hakkı hâlinde, tahsil edilmiş bedel, cayma bildiriminin SATICI''ya ulaştığı tarihten itibaren <strong>on dört (14) gün</strong> içinde, ödemenin yapıldığı ödeme aracına uygun şekilde ve ALICI''ya herhangi bir masraf yüklemeksizin iade edilir.</p>
<h2>Madde 8 — Cayma Hakkının İstisnaları</h2>
<p>8.1. Mesafeli Sözleşmeler Yönetmeliği''nin cayma hakkının istisnalarını düzenleyen hükümleri uyarınca, aşağıdaki hâllerde ALICI cayma hakkını kullanamaz:</p>
<p>a) <strong>Cayma hakkı süresi sona ermeden önce, tüketicinin onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler.</strong> ALICI, ödeme adımında hizmetin ifasına derhâl başlanmasını onaylar ve ifaya başlanması hâlinde cayma hakkını kaybedeceğine ilişkin açık şekilde bilgilendirilir; bu onayı vermesi durumunda, ifaya başlandıktan sonra cayma hakkı kullanılamaz. b) <strong>Elektronik ortamda anında ifa edilen hizmetler ile tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.</strong> Satın alma ile birlikte anında erişime açılan dijital içerik, rapor, lisans/erişim bilgisi ve benzeri teslimatlar bu kapsamdadır.</p>
<p>8.2. İfasına başlanmış ancak tamamlanmamış hizmetlerde sözleşmenin sona erdirilmesi hâlinde, ifa edilen kısma karşılık gelen bedel hakkaniyete uygun olarak hesaplanır; ayrıntılar "İade ve Teslimat Koşulları" sayfasında düzenlenmiştir.</p>
<h2>Madde 9 — B2B / Tacir ve Tüzel Kişi Alıcılar</h2>
<p>9.1. 6502 sayılı Kanun kapsamındaki tüketici; <strong>ticari veya mesleki olmayan amaçlarla</strong> hareket eden gerçek veya tüzel kişidir.</p>
<p>9.2. <strong>Tüzel kişi tacirler ile ticari veya mesleki amaçlarla hareket eden alıcılar tüketici sayılmaz.</strong> Bu alıcılar bakımından işbu sözleşmenin tüketici mevzuatına dayanan hükümleri (özellikle Madde 7''deki cayma hakkı ve Madde 11.1''deki tüketici uyuşmazlık yolları) <strong>uygulanmaz</strong>; bunların yerine 6102 sayılı Türk Ticaret Kanunu ve 6098 sayılı Türk Borçlar Kanunu''nun genel hükümleri uygulanır.</p>
<p>9.3. Fatura bilgilerinde ticari unvan/vergi numarası bildiren veya hizmeti ticari ya da mesleki faaliyeti kapsamında satın alan ALICI, bu maddenin kendisine uygulanacağını kabul eder.</p>
<h2>Madde 10 — Mücbir Sebep</h2>
<p>Tarafların kontrolü dışında gelişen; doğal afet, salgın, savaş, mevzuat değişikliği, genel internet/altyapı kesintileri gibi ifayı imkânsızlaştıran veya önemli ölçüde güçleştiren hâllerde, etkilenen tarafın yükümlülükleri mücbir sebep süresince askıya alınır. Mücbir sebebin otuz (30) günden uzun sürmesi hâlinde taraflardan her biri sözleşmeyi tazminatsız feshedebilir; ifa edilmemiş kısma ilişkin bedel iade edilir.</p>
<h2>Madde 11 — Uyuşmazlık Çözümü</h2>
<p>11.1. Tüketici sıfatını taşıyan ALICI, işbu sözleşmeden doğan uyuşmazlıklarda; Ticaret Bakanlığı''nca her yıl belirlenen parasal sınırlar dâhilinde, yerleşim yerinin bulunduğu veya tüketici işleminin yapıldığı yerdeki <strong>Tüketici Hakem Heyeti''ne</strong>, bu sınırların üzerindeki uyuşmazlıklarda ise <strong>Tüketici Mahkemesi''ne</strong> başvurabilir.</p>
<p>11.2. Tüketici sayılmayan alıcılar bakımından uyuşmazlıklarda Bursa (Gemlik) mahkemeleri ve icra daireleri yetkilidir.</p>
<p>11.3. İşbu sözleşme Türk hukukuna tabidir.</p>
<h2>Madde 12 — Yürürlük</h2>
<p>12.1. ALICI, Platform üzerinden siparişini tamamlamadan önce işbu sözleşmeyi ve ön bilgilendirme formunu okuyup elektronik ortamda onayladığını; ön bilgilendirmenin kendisine sipariş öncesinde yapıldığını kabul ve beyan eder.</p>
<p>12.2. İşbu sözleşme, ALICI''nın elektronik ortamdaki onayı ve ödemenin gerçekleşmesi ile kurulmuş ve yürürlüğe girmiş sayılır. Sözleşmenin bir örneği kalıcı veri saklayıcısı ile (e-posta) ALICI''ya gönderilir ve SATICI tarafından ilgili mevzuatta öngörülen süre boyunca saklanır.</p>
<p><strong>SATICI:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. <strong>ALICI:</strong> {{ALICI_AD_SOYAD_UNVAN}} <strong>Tarih:</strong> {{SIPARIS_TARIHI}}</p>
<p>---</p>','TASLAK — avukat onayı sonrası yayınlanacaktır.','Mesafeli Satış Sözleşmesi','TASLAK — avukat onayı sonrası yayınlanacaktır.'),
('41000000-0000-4000-8000-000000000101','en','Distance Sales Agreement','distance-sales-agreement','<blockquote><p>DRAFT — attorney review is required before publication. This document does not constitute legal advice.</p></blockquote>
<p><em>This is an English courtesy translation. The Turkish version of this agreement is the legally binding text, and this agreement is governed by Turkish law.</em></p>
<h2>Article 1 — Parties</h2>
<h3>1.1 SELLER (Service Provider)</h3>
<p>| Field | Information |</p>
<p>|-------|-------------|</p>
<p>| Legal name | GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. |</p>
<p>| Registered seat | Gemlik/Bursa, Türkiye |</p>
<p>| Address | Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa |</p>
<p>| Tax office / Tax ID | Gemlik Tax Office — 4542302453 |</p>
<p>| MERSIS No | 0454230245300001 |</p>
<p>| Trade Registry No | 7069 (Gemlik) |</p>
<p>| Phone | {{TELEFON}} |</p>
<p>| E-mail | info@gzlteknoloji.com |</p>
<p>| Website | gzlteknoloji.com |</p>
<p>(Hereinafter referred to as the "SELLER".)</p>
<h3>1.2 BUYER</h3>
<p>| Field | Information |</p>
<p>|-------|-------------|</p>
<p>| Full name / Legal name | {{ALICI_AD_SOYAD_UNVAN}} |</p>
<p>| Address | {{ALICI_ADRES}} |</p>
<p>| Phone | {{ALICI_TELEFON}} |</p>
<p>| E-mail | {{ALICI_EPOSTA}} |</p>
<p>| Turkish ID No. / Tax ID (for invoicing) | {{ALICI_TCKN_VKN}} |</p>
<p>(Hereinafter referred to as the "BUYER".)</p>
<h2>Article 2 — Definitions</h2>
<p>In this Agreement;</p>
<ul>
<li><strong>Law</strong> means the Turkish Law No. 6502 on the Protection of Consumers;</li>
<li><strong>Regulation</strong> means the Turkish Regulation on Distance Contracts;</li>
<li><strong>Service</strong> means the subject matter of any consumer transaction, other than the supply of goods, performed or undertaken to be performed in return for a fee;</li>
<li><strong>Digital Delivery</strong> means making the output of the Service available to the BUYER by electronic means without any physical carrier (transmission of access/administration credentials, activation of the system for the BUYER''s use, or completion of installation in an environment belonging to the BUYER);</li>
<li><strong>Order Page</strong> means the page on the SELLER''s website displaying the scope, price, delivery time and revision entitlement of the selected service package;</li>
<li><strong>Platform</strong> means the website operated under the domain gzlteknoloji.com.</li>
</ul>
<h2>Article 3 — Subject Matter</h2>
<p>3.1. The subject matter of this Agreement is to determine, in accordance with Law No. 6502 on the Protection of Consumers and the Regulation on Distance Contracts, the rights and obligations of the parties concerning the performance of the service ordered electronically by the BUYER via the Platform, the characteristics and price of which are stated on the Order Page and in the preliminary information form.</p>
<p>3.2. The services offered by the SELLER — including software development, website and e-commerce platform setup, data analysis and reporting, automation/panel setup, technical consulting and subscription-based management panels — constitute <strong>performance of services and digital delivery</strong>. <strong>No physical goods are sold and no shipment by courier takes place</strong> under this Agreement.</p>
<h2>Article 4 — Characteristics of the Service</h2>
<p>4.1. The essential characteristics of the service (scope, package content, included work items, number of revisions) are as displayed on the Order Page of the package selected by the BUYER, which forms an integral part of this Agreement.</p>
<p>4.2. The price and characteristics announced on the Order Page at the time of ordering shall prevail unless the parties agree otherwise in writing.</p>
<h2>Article 5 — Service Fee and Payment</h2>
<p>5.1. The service fee is the amount displayed in Turkish Lira (TL), inclusive of all taxes, on the Order Page and at the payment step.</p>
<p>5.2. Payment is collected via the Platform by <strong>credit card / debit card through the Iyzico payment infrastructure</strong>. Card details are not stored by the SELLER; the payment transaction is processed through Iyzico''s secure payment infrastructure.</p>
<p>5.3. For subscription-type services (e.g. maintenance plans, social media management, panel subscriptions), the fee stated as "monthly" on the Order Page is collected periodically. The distinction between the setup fee and the monthly fee is clearly indicated on the Order Page.</p>
<p>5.4. Any instalment schemes, campaigns or additional charges applied by the BUYER''s bank or card issuer are subject to the relationship between the BUYER and its bank.</p>
<h2>Article 6 — Performance and Delivery Time</h2>
<p>6.1. Performance of the service commences upon confirmation of payment and upon complete transmission to the SELLER of the information, content and access credentials required from the BUYER (domain name, server access, brand assets, texts, etc.).</p>
<p>6.2. The service shall be performed within <strong>the delivery time stated on the order page</strong>. Delivery times vary by package and are clearly announced in days on each package''s Order Page. Delays caused by the BUYER''s late provision of required information and content shall be added to the delivery time.</p>
<p>6.3. <strong>Digital delivery</strong> is deemed completed upon whichever of the following applies: a) transmission of the access/administration credentials of the service output to the e-mail address notified by the BUYER; b) completion of installation on the BUYER''s domain, server or account and activation for use; c) electronic transmission of the report, analysis or digital content to the BUYER.</p>
<p>6.4. Where a justified reason exists, the SELLER may postpone performance for a reasonable period by notifying the BUYER; where performance becomes impossible, amounts collected shall be refunded to the BUYER in accordance with the applicable legislation.</p>
<h2>Article 7 — Right of Withdrawal</h2>
<p>7.1. Where the BUYER qualifies as a consumer, the BUYER has the right to withdraw from this distance service contract within <strong>fourteen (14) days from the date the contract is concluded</strong>, without giving any reason and without paying any penalty. The exceptions set out in Article 8 are reserved.</p>
<p>7.2. The withdrawal notice must be sent, before the expiry of this period, in writing or via a durable data carrier to <strong>info@gzlteknoloji.com</strong>. The BUYER may, but is not obliged to, use the model withdrawal form annexed to the preliminary information form.</p>
<p>7.3. Where the right of withdrawal is validly exercised within the period, any amount collected shall be refunded within <strong>fourteen (14) days</strong> of receipt of the withdrawal notice by the SELLER, in a manner compatible with the payment instrument used and without imposing any cost on the BUYER.</p>
<h2>Article 8 — Exceptions to the Right of Withdrawal</h2>
<p>8.1. Pursuant to the provisions of the Regulation on Distance Contracts governing exceptions to the right of withdrawal, the BUYER may not exercise the right of withdrawal in the following cases:</p>
<p>a) <strong>Contracts for services whose performance has begun with the consumer''s consent before the expiry of the withdrawal period.</strong> At the payment step, the BUYER consents to the immediate commencement of performance and is expressly informed that they will lose the right of withdrawal once performance has begun; where such consent is given, the right of withdrawal cannot be exercised after performance has commenced. b) <strong>Contracts for services performed instantly in the electronic environment and for intangible goods delivered instantly to the consumer.</strong> Digital content, reports, licences/access credentials and similar deliverables made available immediately upon purchase fall within this scope.</p>
<p>8.2. Where a contract is terminated after performance has begun but before completion, the amount corresponding to the performed portion shall be calculated equitably; details are set out in the "Refund and Delivery Terms" page.</p>
<h2>Article 9 — B2B / Merchant and Legal-Entity Buyers</h2>
<p>9.1. A consumer under Law No. 6502 is a natural or legal person acting for purposes <strong>outside their trade or profession</strong>.</p>
<p>9.2. <strong>Legal-entity merchants and buyers acting for commercial or professional purposes do not qualify as consumers.</strong> The provisions of this Agreement based on consumer legislation (in particular the right of withdrawal in Article 7 and the consumer dispute mechanisms in Article 11.1) <strong>do not apply</strong> to such buyers; instead, the general provisions of the Turkish Commercial Code No. 6102 and the Turkish Code of Obligations No. 6098 apply.</p>
<p>9.3. A BUYER who provides a commercial title/tax number in the invoicing details, or who purchases the service within the scope of its commercial or professional activity, accepts that this Article applies to it.</p>
<h2>Article 10 — Force Majeure</h2>
<p>In circumstances beyond the parties'' control that render performance impossible or substantially more difficult — such as natural disasters, epidemics, war, legislative changes, or general internet/infrastructure outages — the obligations of the affected party shall be suspended for the duration of the force majeure event. If the event lasts longer than thirty (30) days, either party may terminate the Agreement without compensation; fees corresponding to the unperformed portion shall be refunded.</p>
<h2>Article 11 — Dispute Resolution</h2>
<p>11.1. A BUYER qualifying as a consumer may, for disputes arising from this Agreement, apply to the <strong>Consumer Arbitration Committee</strong> of their place of residence or of the place where the consumer transaction was made, within the monetary limits determined annually by the Turkish Ministry of Trade, and to the <strong>Consumer Court</strong> for disputes exceeding those limits.</p>
<p>11.2. For buyers who do not qualify as consumers, the courts and enforcement offices of Bursa (Gemlik), Türkiye shall have jurisdiction.</p>
<p>11.3. <strong>This Agreement is governed by Turkish law.</strong></p>
<h2>Article 12 — Entry into Force</h2>
<p>12.1. The BUYER declares that, before completing the order on the Platform, they have read and electronically approved this Agreement and the preliminary information form, and that the preliminary information was provided to them prior to the order.</p>
<p>12.2. This Agreement is deemed concluded and effective upon the BUYER''s electronic approval and completion of payment. A copy of the Agreement is sent to the BUYER via a durable data carrier (e-mail) and retained by the SELLER for the period prescribed by the applicable legislation.</p>
<p><strong>SELLER:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. <strong>BUYER:</strong> {{ALICI_AD_SOYAD_UNVAN}} <strong>Date:</strong> {{SIPARIS_TARIHI}}</p>
<p>---</p>
<h2>Sources / basis</h2>
<ul>
<li><strong>Company identity source:</strong> Official company records (<code>vps-guezel/sirket/turkiye/</code> — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → <code>{{TELEFON}}</code> placeholder remains.</li>
<li><strong>Delivery times:</strong> <code>backend/src/db/seed/sql/032_service_packages_schema_seed.sql</code> → <code>service_packages.delivery_days</code> (1–45 days depending on package) and <code>revisions</code> (0–10). The text therefore refers to "the delivery time stated on the order page" instead of fixed durations.</li>
<li><strong>Setup vs. monthly fee semantics:</strong> <code>backend/src/db/seed/sql/028_pricing_packages_seed.sql</code> → <code>pricing_plans.price_unit</code> (<code>setup_monthly</code> / <code>month</code>).</li>
<li><strong>Payment infrastructure:</strong> Phase 2 plan — online collection via Iyzico (task brief).</li>
<li><strong>Legislation:</strong> Turkish Law No. 6502 on the Protection of Consumers; Regulation on Distance Contracts (withdrawal period, refund period, service-performance exceptions); Turkish Commercial Code No. 6102 and Code of Obligations No. 6098 (non-consumer buyers). Article numbers of the Regulation were deliberately omitted — verification notes are in <code>docs/icerik/_tmp/EKSIK_legal.md</code>.</li>
</ul>','DRAFT — to be published after legal review.','Distance Sales Agreement','DRAFT — to be published after legal review.'),
('41000000-0000-4000-8000-000000000102','tr','Ön Bilgilendirme Formu','on-bilgilendirme-formu','<blockquote><p>TASLAK — yayına almadan önce avukat onayı gereklidir. Hukuki danışmanlık teşkil etmez.</p></blockquote>
<p>İşbu Ön Bilgilendirme Formu, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, sipariş onaylanmadan önce ALICI''yı bilgilendirmek amacıyla hazırlanmıştır.</p>
<h2>1. Satıcının Kimlik ve İletişim Bilgileri</h2>
<p>| Alan | Bilgi |</p>
<p>|------|-------|</p>
<p>| Unvan | GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. |</p>
<p>| Merkez | Gemlik/Bursa |</p>
<p>| Adres | Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa |</p>
<p>| Vergi Dairesi / No | Gemlik VD — 4542302453 |</p>
<p>| MERSİS | 0454230245300001 |</p>
<p>| Ticaret Sicil No | 7069 (Gemlik) |</p>
<p>| Kuruluş tarihi | 10.06.2026 |</p>
<p>| Telefon | {{TELEFON}} |</p>
<p>| E-posta | info@gzlteknoloji.com |</p>
<p>| İnternet sitesi | gzlteknoloji.com |</p>
<p>Şikâyet ve talepleriniz için yukarıdaki e-posta adresi ve telefon numarası kullanılabilir.</p>
<h2>2. Hizmetin Temel Nitelikleri</h2>
<p>2.1. Satışa sunulan hizmetler; yazılım geliştirme, web sitesi ve e-ticaret altyapısı kurulumu, veri analizi ve raporlama, otomasyon/panel kurulumu, teknik danışmanlık ve abonelik esaslı yönetim panelleri gibi <strong>hizmet ifası ve dijital teslimat</strong> niteliğindedir. <strong>Fiziksel ürün satışı ve kargo ile teslimat yoktur.</strong></p>
<p>2.2. Seçtiğiniz paketin kapsamı, içerdiği iş kalemleri, revizyon hakkı sayısı ve teslim süresi, sipariş sayfasında paket bazında ilan edilir ve sipariş anındaki hâliyle bağlayıcıdır.</p>
<h2>3. Vergiler Dahil Toplam Bedel</h2>
<p>3.1. Hizmetin tüm vergiler dahil toplam bedeli, sipariş sayfasında ve ödeme adımında Türk Lirası (TL) olarak gösterilir. Gösterilen tutar dışında ALICI''dan ek bir bedel (kargo, teslimat masrafı vb.) talep edilmez.</p>
<p>3.2. Abonelik esaslı hizmetlerde kurulum bedeli ile aylık bedel ayrı ayrı ve açıkça gösterilir; aylık bedel, ilgili dönem başında tahsil edilir.</p>
<h2>4. Ödeme ve İfa Şekli</h2>
<p>4.1. <strong>Ödeme:</strong> Iyzico ödeme altyapısı üzerinden kredi kartı / banka kartı ile yapılır. Kart bilgileriniz SATICI tarafından saklanmaz.</p>
<p>4.2. <strong>İfa:</strong> Hizmetin ifasına, ödemenin onaylanması ve ifa için gerekli bilgi/içerik/erişimlerin tarafınızca iletilmesiyle başlanır. Hizmet, <strong>sipariş sayfasında belirtilen teslim süresi</strong> içinde ifa edilir. Dijital teslimat; erişim/yönetim bilgilerinin e-posta ile iletilmesi, kurulumun size ait ortamda tamamlanarak kullanıma açılması veya dijital içeriğin elektronik ortamda gönderilmesi ile tamamlanmış sayılır.</p>
<h2>5. Cayma Hakkı: Süre, Koşullar ve İstisnalar</h2>
<p>5.1. Tüketici sıfatını taşıyan ALICI, hizmet ifasına ilişkin bu mesafeli sözleşmede, <strong>sözleşmenin kurulduğu günden itibaren 14 (on dört) gün</strong> içinde gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkına sahiptir.</p>
<p>5.2. Cayma bildirimi, süre dolmadan <strong>info@gzlteknoloji.com</strong> adresine yazılı olarak veya kalıcı veri saklayıcısıyla gönderilir. Aşağıdaki örnek form kullanılabilir (zorunlu değildir):</p>
<blockquote><p><strong>Örnek Cayma Formu</strong></p></blockquote>
<blockquote><p>— Kime: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa, info@gzlteknoloji.com</p></blockquote>
<blockquote><p>— Bu formla aşağıdaki hizmetin satışına ilişkin sözleşmeden cayma hakkımı kullandığımı beyan ederim.</p></blockquote>
<blockquote><p>— Sipariş tarihi / Sipariş no: …</p></blockquote>
<blockquote><p>— Hizmetin konusu: …</p></blockquote>
<blockquote><p>— Tüketicinin adı soyadı ve adresi: …</p></blockquote>
<blockquote><p>— Tarih ve (kâğıt üzerinde bildirilmesi hâlinde) imza: …</p></blockquote>
<p>5.3. Geçerli cayma hâlinde tahsil edilen bedel, bildirimin SATICI''ya ulaşmasından itibaren 14 gün içinde, ödeme aracınıza uygun şekilde ve masrafsız iade edilir.</p>
<p>5.4. <strong>Cayma hakkının istisnaları</strong> — aşağıdaki hâllerde cayma hakkı kullanılamaz:</p>
<p>a) <strong>Onayınızla ifasına başlanan hizmetler:</strong> Ödeme adımında hizmetin ifasına derhâl başlanmasını onaylamanız ve ifaya başlanması hâlinde cayma hakkınızı kaybedeceğiniz konusunda bilgilendirilmiş olmanız durumunda, ifaya başlandıktan sonra cayma hakkı kullanılamaz. b) <strong>Elektronik ortamda anında ifa edilen hizmetler ve anında teslim edilen gayrimaddi mallar:</strong> Satın alma ile birlikte anında erişime açılan dijital içerik, rapor, lisans/erişim bilgisi ve benzeri teslimatlarda cayma hakkı bulunmamaktadır.</p>
<p>5.5. <strong>Tüzel kişi tacirler ile ticari veya mesleki amaçla hareket eden alıcılar tüketici sayılmadığından</strong>, cayma hakkı ve tüketici mevzuatına dayanan diğer haklar bu alıcılara uygulanmaz.</p>
<h2>6. İfasına Başlanan Hizmetlerde Kısmi İade</h2>
<p>Cayma hakkının istisna kapsamında olmadığı veya sözleşmenin taraflarca sonlandırıldığı hâllerde; ifa edilen kısma karşılık gelen bedel, yapılan işin toplam işe oranı esas alınarak hakkaniyete uygun şekilde hesaplanır ve kalan tutar iade edilir. Ayrıntı: "İade ve Teslimat Koşulları" sayfası.</p>
<h2>7. Şikâyet ve Uyuşmazlık Yolları</h2>
<p>7.1. Şikâyet ve taleplerinizi öncelikle <strong>info@gzlteknoloji.com</strong> adresine iletebilirsiniz; başvurular en kısa sürede yanıtlanır.</p>
<p>7.2. Tüketici sıfatını taşıyan ALICI; uyuşmazlık hâlinde, Ticaret Bakanlığı''nca her yıl belirlenen parasal sınırlar dâhilinde yerleşim yerinin bulunduğu veya tüketici işleminin yapıldığı yerdeki <strong>Tüketici Hakem Heyeti''ne</strong>, bu sınırların üzerindeki uyuşmazlıklarda <strong>Tüketici Mahkemesi''ne</strong> başvurabilir.</p>
<h2>8. Geçerlilik ve Teyit</h2>
<p>8.1. İşbu form sipariş onaylanmadan önce ALICI''nın incelemesine sunulur; ALICI, siparişi onaylamakla bu formda yer alan ön bilgileri edindiğini teyit eder.</p>
<p>8.2. Bu formun ve mesafeli satış sözleşmesinin birer örneği, kalıcı veri saklayıcısı ile (e-posta) ALICI''ya gönderilir.</p>
<p>---</p>','TASLAK — avukat onayı sonrası yayınlanacaktır.','Ön Bilgilendirme Formu','TASLAK — avukat onayı sonrası yayınlanacaktır.'),
('41000000-0000-4000-8000-000000000102','en','Preliminary Information Form','preliminary-information-form','<blockquote><p>DRAFT — attorney review is required before publication. This document does not constitute legal advice.</p></blockquote>
<p><em>This is an English courtesy translation. The Turkish version is the legally binding text; this form and the related agreement are governed by Turkish law.</em></p>
<p>This Preliminary Information Form has been prepared to inform the BUYER before the order is confirmed, pursuant to Turkish Law No. 6502 on the Protection of Consumers and the Regulation on Distance Contracts.</p>
<h2>1. Identity and Contact Details of the Seller</h2>
<p>| Field | Information |</p>
<p>|-------|-------------|</p>
<p>| Legal name | GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. |</p>
<p>| Registered seat | Gemlik/Bursa, Türkiye |</p>
<p>| Address | Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa |</p>
<p>| Tax office / Tax ID | Gemlik Tax Office — 4542302453 |</p>
<p>| MERSIS No | 0454230245300001 |</p>
<p>| Trade Registry No | 7069 (Gemlik) |</p>
<p>| Date of incorporation | 10.06.2026 |</p>
<p>| Phone | {{TELEFON}} |</p>
<p>| E-mail | info@gzlteknoloji.com |</p>
<p>| Website | gzlteknoloji.com |</p>
<p>The above e-mail address and phone number may be used for complaints and requests.</p>
<h2>2. Essential Characteristics of the Service</h2>
<p>2.1. The services offered — software development, website and e-commerce platform setup, data analysis and reporting, automation/panel setup, technical consulting and subscription-based management panels — constitute <strong>performance of services and digital delivery</strong>. <strong>No physical goods are sold and no courier shipment takes place.</strong></p>
<p>2.2. The scope of the selected package, the work items it includes, the number of revisions and the delivery time are announced per package on the order page and are binding as displayed at the time of ordering.</p>
<h2>3. Total Price Including Taxes</h2>
<p>3.1. The total price of the service, inclusive of all taxes, is displayed in Turkish Lira (TL) on the order page and at the payment step. No additional charge (shipping, delivery costs, etc.) is requested from the BUYER beyond the displayed amount.</p>
<p>3.2. For subscription-based services, the setup fee and the monthly fee are shown separately and clearly; the monthly fee is collected at the beginning of each period.</p>
<h2>4. Payment and Performance</h2>
<p>4.1. <strong>Payment:</strong> by credit card / debit card through the Iyzico payment infrastructure. Your card details are not stored by the SELLER.</p>
<p>4.2. <strong>Performance:</strong> performance of the service commences upon confirmation of payment and your provision of the information, content and access credentials required for performance. The service is performed within <strong>the delivery time stated on the order page</strong>. Digital delivery is deemed completed upon transmission of access/administration credentials by e-mail, completion and activation of the installation in your own environment, or electronic transmission of the digital content.</p>
<h2>5. Right of Withdrawal: Period, Conditions and Exceptions</h2>
<p>5.1. A BUYER qualifying as a consumer has the right to withdraw from this distance service contract within <strong>fourteen (14) days from the date the contract is concluded</strong>, without giving any reason and without paying any penalty.</p>
<p>5.2. The withdrawal notice must be sent, before the expiry of this period, in writing or via a durable data carrier to <strong>info@gzlteknoloji.com</strong>. The following model form may be used (it is not mandatory):</p>
<blockquote><p><strong>Model Withdrawal Form</strong></p></blockquote>
<blockquote><p>— To: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., Cumhuriyet Mah. Hastane Cad. Şahinler Sit. C Blok No:12-C İç Kapı No:14 Gemlik/Bursa, info@gzlteknoloji.com</p></blockquote>
<blockquote><p>— I hereby declare that I exercise my right of withdrawal from the contract for the sale of the following service.</p></blockquote>
<blockquote><p>— Order date / Order no.: …</p></blockquote>
<blockquote><p>— Subject of the service: …</p></blockquote>
<blockquote><p>— Name and address of the consumer: …</p></blockquote>
<blockquote><p>— Date and (if notified on paper) signature: …</p></blockquote>
<p>5.3. In the event of a valid withdrawal, the amount collected shall be refunded within 14 days of receipt of the notice by the SELLER, in a manner compatible with your payment instrument and free of charge.</p>
<p>5.4. <strong>Exceptions to the right of withdrawal</strong> — the right of withdrawal cannot be exercised in the following cases:</p>
<p>a) <strong>Services whose performance has begun with your consent:</strong> where, at the payment step, you consent to the immediate commencement of performance and have been informed that you will lose your right of withdrawal once performance has begun, the right of withdrawal cannot be exercised after performance has commenced. b) <strong>Services performed instantly in the electronic environment and intangible goods delivered instantly:</strong> no right of withdrawal exists for digital content, reports, licences/access credentials and similar deliverables made available immediately upon purchase.</p>
<p>5.5. <strong>Since legal-entity merchants and buyers acting for commercial or professional purposes do not qualify as consumers</strong>, the right of withdrawal and other rights based on consumer legislation do not apply to such buyers.</p>
<h2>6. Partial Refund for Services Whose Performance Has Begun</h2>
<p>Where the withdrawal exceptions do not apply, or where the contract is terminated by the parties, the amount corresponding to the performed portion shall be calculated equitably on the basis of the ratio of the work performed to the total work, and the remaining amount shall be refunded. Details: "Refund and Delivery Terms" page.</p>
<h2>7. Complaints and Dispute Resolution</h2>
<p>7.1. You may first address complaints and requests to <strong>info@gzlteknoloji.com</strong>; applications are answered as soon as possible.</p>
<p>7.2. A BUYER qualifying as a consumer may, in the event of a dispute, apply to the <strong>Consumer Arbitration Committee</strong> of their place of residence or of the place where the consumer transaction was made, within the monetary limits determined annually by the Turkish Ministry of Trade, and to the <strong>Consumer Court</strong> for disputes exceeding those limits.</p>
<h2>8. Validity and Confirmation</h2>
<p>8.1. This form is presented for the BUYER''s review before the order is confirmed; by confirming the order, the BUYER confirms having received the preliminary information contained in this form.</p>
<p>8.2. A copy of this form and of the distance sales agreement is sent to the BUYER via a durable data carrier (e-mail).</p>
<p>---</p>
<h2>Sources / basis</h2>
<ul>
<li><strong>Company identity source:</strong> Official company records (<code>vps-guezel/sirket/turkiye/</code> — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → <code>{{TELEFON}}</code> placeholder remains.</li>
<li><strong>Delivery times:</strong> <code>backend/src/db/seed/sql/032_service_packages_schema_seed.sql</code> → <code>service_packages.delivery_days</code> (1–45 days per package) and <code>revisions</code>; the "delivery time stated on the order page" wording derives from this field.</li>
<li><strong>Setup vs. monthly fee:</strong> <code>backend/src/db/seed/sql/028_pricing_packages_seed.sql</code> → <code>pricing_plans.price_unit</code>.</li>
<li><strong>Payment:</strong> Phase 2 Iyzico integration (task brief).</li>
<li><strong>Legislation:</strong> Law No. 6502 and the Regulation on Distance Contracts (preliminary information duty, 14-day withdrawal period, model withdrawal form, exceptions). Article numbers deliberately omitted — see <code>docs/icerik/_tmp/EKSIK_legal.md</code>.</li>
</ul>','DRAFT — to be published after legal review.','Preliminary Information Form','DRAFT — to be published after legal review.'),
('41000000-0000-4000-8000-000000000103','tr','İade ve Teslimat Koşulları','iade-ve-teslimat','<blockquote><p>TASLAK — yayına almadan önce avukat onayı gereklidir. Hukuki danışmanlık teşkil etmez.</p></blockquote>
<p>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. (Gemlik/Bursa · Gemlik VD — 4542302453 · info@gzlteknoloji.com · gzlteknoloji.com) tarafından gzlteknoloji.com üzerinden sunulan hizmetlerin teslimat ve iade koşulları aşağıdadır. Sunduğumuz her şey <strong>hizmet ve dijital teslimattır</strong>; fiziksel ürün satışımız ve kargo ile gönderimimiz <strong>yoktur</strong>.</p>
<h2>1. Dijital Hizmet Teslimatının Tanımı</h2>
<p>Hizmetiniz, niteliğine göre aşağıdaki yollardan biriyle "teslim edilmiş" sayılır:</p>
<ol>
<li><strong>Erişim bilgilerinin iletilmesi:</strong> Panel, site, rapor veya sistemin kullanıcı adı/şifre ve yönetim bilgilerinin, siparişte bildirdiğiniz e-posta adresine gönderilmesi.</li>
<li><strong>Kurulumun tamamlanması:</strong> Yazılımın/sitenin size ait alan adı, sunucu veya hesap üzerinde kurulup çalışır durumda kullanıma açılması.</li>
<li><strong>Dijital içeriğin gönderilmesi:</strong> Analiz, rapor, tasarım dosyası veya benzeri çıktının elektronik ortamda tarafınıza iletilmesi.</li>
</ol>
<p>Teslimatın gerçekleştiği an, ilgili e-postanın gönderildiği veya sistemin kullanıma açıldığı andır.</p>
<h2>2. Teslim Süreleri</h2>
<ul>
<li>Her hizmet paketinin teslim süresi <strong>gün cinsinden, sipariş sayfasında</strong> ilan edilir; paketler arasında farklılık gösterir (küçük işlerde 1–2 gün, kapsamlı projelerde 45 güne kadar çıkabilir).</li>
<li>Süre; ödemenin onaylanması <strong>ve</strong> ifa için sizden beklenen bilgi/içerik/erişimlerin (alan adı, sunucu erişimi, marka görselleri, metinler vb.) eksiksiz iletilmesiyle başlar.</li>
<li>Sizden kaynaklanan gecikmeler (içerik gönderilmemesi, geri bildirim verilmemesi, erişim sağlanmaması) teslim süresine eklenir.</li>
<li>Öngörülemeyen bir gecikme hâlinde durum e-posta ile bildirilir ve yeni bir teslim tarihi önerilir.</li>
</ul>
<h2>3. Revizyon Hakkı</h2>
<ul>
<li>Her pakete dahil <strong>revizyon hakkı sayısı sipariş sayfasında</strong> belirtilir (paket seviyesine göre değişir).</li>
<li>Revizyon; teslim edilen işin, sipariş kapsamı <strong>içinde kalan</strong> düzeltme ve küçük değişiklik taleplerini kapsar. Kapsam dışı yeni özellik, yeni sayfa/modül veya kapsam genişletme talepleri revizyon sayılmaz ve ayrıca ücretlendirilir.</li>
<li>Revizyon talepleri teslimden itibaren makul süre içinde (önerilen: 14 gün) info@gzlteknoloji.com adresine yazılı olarak iletilmelidir.</li>
</ul>
<h2>4. İptal ve İade Koşulları</h2>
<h3>4.1 Tüketiciler için cayma hakkı</h3>
<ul>
<li>Tüketici sıfatını taşıyorsanız, sözleşmenin kurulduğu günden itibaren <strong>14 gün</strong> içinde cayma hakkınız vardır (Mesafeli Sözleşmeler Yönetmeliği''ndeki istisnalar saklıdır).</li>
<li><strong>İstisnalar — cayma hakkı kullanılamayan hâller:</strong></li>
<li>Ödeme adımındaki <strong>onayınızla ifasına başlanan</strong> hizmetler (onayla birlikte işe başlandıysa),</li>
<li><strong>Elektronik ortamda anında ifa edilen</strong> hizmetler ve <strong>anında teslim edilen</strong> dijital içerik/gayrimaddi mallar (satın almayla birlikte erişime açılan rapor, lisans, erişim bilgisi vb.).</li>
<li>Geçerli cayma hâlinde ödediğiniz tutar, bildirimin bize ulaşmasından itibaren <strong>14 gün</strong> içinde ödeme aracınıza masrafsız iade edilir.</li>
</ul>
<h3>4.2 Henüz ifasına başlanmamış siparişler</h3>
<p>İfasına henüz başlanmamış bir siparişi iptal ederseniz, tahsil edilen bedelin tamamı iade edilir.</p>
<h3>4.3 Kısmi ifa hâlinde hakkaniyete uygun bedel</h3>
<p>İfasına başlanmış ancak tamamlanmamış bir hizmetin sona erdirilmesi hâlinde:</p>
<ul>
<li>O ana kadar <strong>ifa edilen kısma karşılık gelen bedel</strong>, yapılan işin toplam işe oranı (tamamlanan iş kalemleri, harcanan çalışma süresi ve teslim edilen ara çıktılar) esas alınarak <strong>hakkaniyete uygun</strong> şekilde hesaplanır.</li>
<li>Kalan tutar 14 gün içinde iade edilir; ifa edilen kısmın bedeli iade kapsamı dışındadır.</li>
<li>Talebiniz hâlinde hesaplamanın dökümü tarafınıza yazılı olarak sunulur.</li>
</ul>
<h3>4.4 Abonelik esaslı hizmetler</h3>
<ul>
<li>Aylık abonelikler (bakım planı, sosyal medya yönetimi, panel aboneliği vb.) dönem sonunda yenilenir; <strong>bir sonraki dönem başlamadan önce</strong> e-posta ile bildirerek aboneliği sonlandırabilirsiniz.</li>
<li>Başlamış dönemin bedeli, o dönem içinde hizmet sunulmuş olması nedeniyle kural olarak iade edilmez; hizmetin hiç sunulamadığı dönemler için ücret alınmaz veya iade edilir.</li>
</ul>
<h3>4.5 Tüketici sayılmayan (B2B) alıcılar</h3>
<p>Tüzel kişi tacirler ile ticari veya mesleki amaçla hareket eden alıcılar tüketici sayılmaz; cayma hakkı bu alıcılara uygulanmaz. İptal ve iade, taraflar arasındaki sözleşme ile Türk Ticaret Kanunu ve Borçlar Kanunu genel hükümlerine tabidir.</p>
<h2>5. İade Yöntemi</h2>
<ul>
<li>İadeler, ödemenin yapıldığı <strong>aynı ödeme aracına</strong> (kredi kartı/banka kartı — Iyzico altyapısı üzerinden) yapılır.</li>
<li>İade tutarının kartınıza yansıma süresi bankanıza göre değişebilir.</li>
</ul>
<h2>6. Başvuru</h2>
<p>Tüm iptal, iade ve revizyon talepleri için: <strong>info@gzlteknoloji.com</strong> — {{TELEFON}}</p>
<p>---</p>','TASLAK — avukat onayı sonrası yayınlanacaktır.','İade ve Teslimat Koşulları','TASLAK — avukat onayı sonrası yayınlanacaktır.'),
('41000000-0000-4000-8000-000000000103','en','Refund and Delivery Terms','refund-and-delivery-terms','<blockquote><p>DRAFT — attorney review is required before publication. This document does not constitute legal advice.</p></blockquote>
<p><em>This is an English courtesy translation. The Turkish version is the legally binding text; these terms are governed by Turkish law.</em></p>
<p>These are the delivery and refund terms for the services offered via gzlteknoloji.com by GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. (Gemlik/Bursa · Gemlik Tax Office — 4542302453 · info@gzlteknoloji.com · gzlteknoloji.com). Everything we offer is a <strong>service with digital delivery</strong>; we do <strong>not</strong> sell physical goods and nothing is shipped by courier.</p>
<h2>1. Definition of Digital Service Delivery</h2>
<p>Depending on its nature, your service is deemed "delivered" through one of the following:</p>
<ol>
<li><strong>Transmission of access credentials:</strong> sending the username/password and administration details of the panel, website, report or system to the e-mail address you provided with your order.</li>
<li><strong>Completion of installation:</strong> installing the software/website on your own domain, server or account and activating it in working condition.</li>
<li><strong>Transmission of digital content:</strong> delivering the analysis, report, design file or similar output to you electronically.</li>
</ol>
<p>Delivery occurs at the moment the relevant e-mail is sent or the system is activated for your use.</p>
<h2>2. Delivery Times</h2>
<ul>
<li>The delivery time of each service package is announced <strong>in days on the order page</strong> and varies between packages (from 1–2 days for small jobs up to 45 days for comprehensive projects).</li>
<li>The period starts upon confirmation of payment <strong>and</strong> your complete provision of the information, content and access credentials required for performance (domain name, server access, brand assets, texts, etc.).</li>
<li>Delays attributable to you (content not provided, feedback not given, access not granted) are added to the delivery time.</li>
<li>In the event of an unforeseen delay, you will be notified by e-mail and a new delivery date will be proposed.</li>
</ul>
<h2>3. Revision Entitlement</h2>
<ul>
<li>The <strong>number of revisions included</strong> in each package is stated on the order page and varies by package tier.</li>
<li>A revision covers correction and minor change requests that remain <strong>within the scope of the order</strong>. Requests for new features, new pages/modules or scope extensions are not revisions and are charged separately.</li>
<li>Revision requests should be submitted in writing to info@gzlteknoloji.com within a reasonable period after delivery (recommended: 14 days).</li>
</ul>
<h2>4. Cancellation and Refund Terms</h2>
<h3>4.1 Right of withdrawal for consumers</h3>
<ul>
<li>If you qualify as a consumer, you have a right of withdrawal within <strong>14 days</strong> from the date the contract is concluded (subject to the exceptions in the Turkish Regulation on Distance Contracts).</li>
<li><strong>Exceptions — cases where the right of withdrawal cannot be exercised:</strong></li>
<li>services whose performance has begun <strong>with your consent</strong> given at the payment step (where work started following that consent);</li>
<li>services <strong>performed instantly in the electronic environment</strong> and digital content/intangible goods <strong>delivered instantly</strong> (reports, licences, access credentials, etc. made available upon purchase).</li>
<li>In the event of a valid withdrawal, the amount you paid is refunded to your payment instrument, free of charge, within <strong>14 days</strong> of our receipt of your notice.</li>
</ul>
<h3>4.2 Orders whose performance has not yet begun</h3>
<p>If you cancel an order before performance has begun, the full amount collected is refunded.</p>
<h3>4.3 Equitable fee in the event of partial performance</h3>
<p>Where a service whose performance has begun is terminated before completion:</p>
<ul>
<li>the <strong>fee corresponding to the portion performed</strong> up to that point is calculated <strong>equitably</strong>, based on the ratio of the work performed to the total work (completed work items, hours spent, and interim deliverables handed over);</li>
<li>the remaining amount is refunded within 14 days; the fee for the performed portion is not refundable;</li>
<li>upon request, a written breakdown of the calculation is provided to you.</li>
</ul>
<h3>4.4 Subscription-based services</h3>
<ul>
<li>Monthly subscriptions (maintenance plans, social media management, panel subscriptions, etc.) renew at the end of each period; you may terminate the subscription by e-mail notice <strong>before the next period begins</strong>.</li>
<li>The fee for a period that has already started is, as a rule, not refunded, since the service has been provided during that period; no fee is charged, or fees are refunded, for periods in which the service could not be provided at all.</li>
</ul>
<h3>4.5 Non-consumer (B2B) buyers</h3>
<p>Legal-entity merchants and buyers acting for commercial or professional purposes do not qualify as consumers; the right of withdrawal does not apply to them. Cancellation and refunds are governed by the contract between the parties and the general provisions of the Turkish Commercial Code and the Turkish Code of Obligations.</p>
<h2>5. Refund Method</h2>
<ul>
<li>Refunds are made to the <strong>same payment instrument</strong> used for payment (credit/debit card — via the Iyzico infrastructure).</li>
<li>The time it takes for the refund to appear on your card may vary depending on your bank.</li>
</ul>
<h2>6. Contact</h2>
<p>For all cancellation, refund and revision requests: <strong>info@gzlteknoloji.com</strong> — {{TELEFON}}</p>
<p>---</p>
<h2>Sources / basis</h2>
<ul>
<li><strong>Company identity source:</strong> Official company records (<code>vps-guezel/sirket/turkiye/</code> — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → <code>{{TELEFON}}</code> placeholder remains.</li>
<li><strong>Delivery times (1–45 days) and revisions (0–10):</strong> <code>backend/src/db/seed/sql/032_service_packages_schema_seed.sql</code> → <code>service_packages.delivery_days</code> and <code>service_packages.revisions</code>; both the "stated on the order page" wording and the day range derive from this seed.</li>
<li><strong>Subscription/setup distinction:</strong> <code>backend/src/db/seed/sql/028_pricing_packages_seed.sql</code> → <code>pricing_plans.price_unit</code> (<code>setup_monthly</code>/<code>month</code>) and the monthly maintenance/social media plans.</li>
<li><strong>Payment/refund channel:</strong> Phase 2 Iyzico integration (task brief).</li>
<li><strong>Legislation:</strong> Law No. 6502 and the Regulation on Distance Contracts (withdrawal period, refund period, service exceptions, partial performance). The revision request window (14 days) is a <strong>commercial suggestion</strong>, not a statutory rule — see <code>docs/icerik/_tmp/EKSIK_legal.md</code>.</li>
</ul>','DRAFT — to be published after legal review.','Refund and Delivery Terms','DRAFT — to be published after legal review.'),
('41000000-0000-4000-8000-000000000104','tr','Ticari Elektronik İleti Onayı','ticari-elektronik-ileti-onayi','<blockquote><p>TASLAK — yayına almadan önce avukat onayı gereklidir. Hukuki danışmanlık teşkil etmez.</p></blockquote>
<p>Bu sayfa; 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ile Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik uyarınca, <strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong> (Gemlik/Bursa · Gemlik VD — 4542302453 · info@gzlteknoloji.com · gzlteknoloji.com · Tel: {{TELEFON}}) tarafından gönderilecek ticari elektronik iletilere ilişkin onay metinlerini ve haklarınızı içerir.</p>
<h2>1. Bülten (Newsletter) Formu Onay Metni</h2>
<p>Form yanındaki onay kutusuyla birlikte kullanılacak metin:</p>
<blockquote><p><strong>Bülten onayı:</strong> GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. tarafından; yeni hizmetler, kampanyalar, duyurular ve teknik içerikler hakkında <strong>e-posta</strong> yoluyla ticari elektronik ileti gönderilmesine, 6563 sayılı Kanun ve ilgili Yönetmelik kapsamında <strong>onay veriyorum</strong>. Bu onayı dilediğim zaman, hiçbir gerekçe göstermeksizin ve ücretsiz olarak reddedebileceğimi biliyorum.</p></blockquote>
<p>Uygulama notları (geliştirici için):</p>
<ul>
<li>Onay kutusu <strong>önceden işaretli OLAMAZ</strong>; kullanıcı aktif olarak işaretlemelidir.</li>
<li>Onay; bülten aboneliği hizmet sunumunun ön şartı hâline getirilemez.</li>
<li>Onayın alındığı tarih, kanal ve IP bilgisi ispat için kayıt altına alınmalıdır.</li>
</ul>
<h2>2. Lead / Teklif Formu Onay Metni</h2>
<p>Teklif alma ve iletişim formlarında <strong>iki ayrı durum</strong> vardır:</p>
<p><strong>a) Talebe yanıt (onay gerektirmez):</strong> Kendi talebinizle ilettiğiniz teklif/iletişim isteğine yanıt verilmesi — talebinizle sınırlı olmak üzere — ticari elektronik ileti onayı gerektirmez. Form altına bilgilendirme notu:</p>
<blockquote><p>Bu formu göndermeniz, yalnızca talebinize yanıt verilmesi amacıyla sizinle iletişim kurmamıza olanak tanır; ayrıca pazarlama iletisi gönderilmez.</p></blockquote>
<p><strong>b) Pazarlama amaçlı ileti (ayrı ve isteğe bağlı onay kutusu):</strong></p>
<blockquote><p><strong>Pazarlama onayı (isteğe bağlı):</strong> Talebimden bağımsız olarak; GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.''nin hizmetleri, kampanyaları ve duyuruları hakkında <strong>e-posta ve/veya SMS/arama</strong> yoluyla ticari elektronik ileti göndermesine onay veriyorum. Bu onayı dilediğim zaman ücretsiz olarak geri alabilirim.</p></blockquote>
<p>Uygulama notları:</p>
<ul>
<li>Pazarlama onayı kutusu, formun gönderilebilmesi için <strong>zorunlu tutulamaz</strong> ve önceden işaretli olamaz.</li>
<li>Onay hangi kanallar (e-posta / SMS / arama) için alındıysa yalnızca o kanallardan ileti gönderilebilir; kanal bazlı ayrık kutular tercih edilmelidir.</li>
</ul>
<h2>3. İYS (İleti Yönetim Sistemi) Kaydı</h2>
<ul>
<li>Alınan tüm ticari elektronik ileti onayları, ilgili Yönetmelik uyarınca <strong>İleti Yönetim Sistemi''ne (İYS)</strong> kaydedilir; İYS''ye kaydı bulunmayan onaylara dayanarak ileti gönderilemez.</li>
<li>Alıcılar onay ve ret bilgilerini <strong>iys.org.tr</strong> üzerinden de görüntüleyebilir ve yönetebilir.</li>
<li>Onayın alınmasından İYS kaydına kadar geçmesi gereken süre ve kayıt yükümlülüğünün ayrıntıları ilgili Yönetmelik hükümlerine tabidir; entegrasyon Faz 2''de Iyzico/e-posta altyapısıyla birlikte planlanmalıdır.</li>
</ul>
<h2>4. Ret (Onayı Geri Alma) Hakkı ve Yöntemi</h2>
<ul>
<li>Verdiğiniz onayı <strong>dilediğiniz zaman, hiçbir gerekçe göstermeksizin ve ücretsiz</strong> olarak geri alabilirsiniz (ret hakkı).</li>
<li>Ret yöntemleri:</li>
<li>Gönderilen her ticari e-postanın altındaki <strong>"listeden çık / abonelikten ayrıl"</strong> bağlantısı,</li>
<li><strong>info@gzlteknoloji.com</strong> adresine ret bildirimi göndermek,</li>
<li><strong>İYS (iys.org.tr)</strong> üzerinden ret hakkını kullanmak,</li>
<li>SMS gönderimi yapılıyorsa iletide belirtilen kısa numara/yönteme ret göndermek.</li>
<li>Ret bildirimi tarafımıza ulaştıktan sonra, ilgili mevzuatta öngörülen süre içinde ileti gönderimi durdurulur.</li>
<li>Her ticari elektronik iletide; göndericinin kimliği (unvan), iletişim bilgileri ve reddetme yöntemi yer almak zorundadır.</li>
</ul>
<h2>5. Kişisel Verilerin Korunması İlişkisi</h2>
<p>Onay kapsamında işlenen ad-soyad, e-posta, telefon gibi kişisel veriler; 6698 sayılı Kişisel Verilerin Korunması Kanunu''na uygun olarak işlenir. Ayrıntılar için sitedeki Gizlilik/KVKK Aydınlatma Metni''ne bakınız. Ticari elektronik ileti onayı ile KVKK aydınlatması <strong>ayrı metinlerdir</strong>; form tasarımında ikisi tek kutuda birleştirilmemelidir.</p>
<p>---</p>','TASLAK — avukat onayı sonrası yayınlanacaktır.','Ticari Elektronik İleti Onayı','TASLAK — avukat onayı sonrası yayınlanacaktır.'),
('41000000-0000-4000-8000-000000000104','en','Commercial Electronic Message Consent','commercial-electronic-message-consent','<blockquote><p>DRAFT — attorney review is required before publication. This document does not constitute legal advice.</p></blockquote>
<p><em>This is an English courtesy translation. The Turkish version is the legally binding text; these consents are governed by Turkish law — in particular Law No. 6563 on the Regulation of Electronic Commerce and the Regulation on Commercial Communication and Commercial Electronic Messages.</em></p>
<p>This page contains the consent texts and your rights regarding commercial electronic messages to be sent by <strong>GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.</strong> (Gemlik/Bursa · Gemlik Tax Office — 4542302453 · info@gzlteknoloji.com · gzlteknoloji.com · Phone: {{TELEFON}}).</p>
<h2>1. Newsletter Form Consent Text</h2>
<p>Text to be used together with the checkbox next to the form:</p>
<blockquote><p><strong>Newsletter consent:</strong> I <strong>consent</strong>, within the scope of Turkish Law No. 6563 and the related Regulation, to GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. sending me commercial electronic messages by <strong>e-mail</strong> about new services, campaigns, announcements and technical content. I understand that I may refuse this consent at any time, without giving any reason and free of charge.</p></blockquote>
<p>Implementation notes (for the developer):</p>
<ul>
<li>The consent checkbox must <strong>NOT be pre-ticked</strong>; the user must actively tick it.</li>
<li>Consent may not be made a precondition for providing the newsletter subscription service.</li>
<li>The date, channel and IP address of the consent must be recorded for evidentiary purposes.</li>
</ul>
<h2>2. Lead / Quote Form Consent Text</h2>
<p>There are <strong>two distinct situations</strong> on quote and contact forms:</p>
<p><strong>a) Response to a request (no consent required):</strong> Responding to a quote/contact request you submitted yourself — limited to your request — does not require commercial electronic message consent. Information note under the form:</p>
<blockquote><p>Submitting this form only allows us to contact you for the purpose of responding to your request; no marketing messages will be sent.</p></blockquote>
<p><strong>b) Marketing messages (separate and optional checkbox):</strong></p>
<blockquote><p><strong>Marketing consent (optional):</strong> Independently of my request, I consent to GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. sending me commercial electronic messages by <strong>e-mail and/or SMS/phone call</strong> about its services, campaigns and announcements. I may withdraw this consent at any time, free of charge.</p></blockquote>
<p>Implementation notes:</p>
<ul>
<li>The marketing consent checkbox may <strong>not be made mandatory</strong> for submitting the form and may not be pre-ticked.</li>
<li>Messages may only be sent through the channels (e-mail / SMS / call) for which consent was obtained; separate per-channel checkboxes are preferred.</li>
</ul>
<h2>3. Registration with İYS (Message Management System)</h2>
<ul>
<li>All commercial electronic message consents obtained are registered with the Turkish <strong>Message Management System (İYS — İleti Yönetim Sistemi)</strong> as required by the related Regulation; messages may not be sent on the basis of consents not registered with İYS.</li>
<li>Recipients may also view and manage their consent and opt-out records via <strong>iys.org.tr</strong>.</li>
<li>The time limit for registering a consent with İYS and the details of the registration obligation are subject to the provisions of the related Regulation; the integration should be planned in Phase 2 together with the Iyzico/e-mail infrastructure.</li>
</ul>
<h2>4. Right to Opt Out (Withdraw Consent) and Method</h2>
<ul>
<li>You may withdraw your consent <strong>at any time, without giving any reason and free of charge</strong> (right of refusal).</li>
<li>Opt-out methods:</li>
<li>the <strong>"unsubscribe"</strong> link at the bottom of every commercial e-mail sent;</li>
<li>sending an opt-out notice to <strong>info@gzlteknoloji.com</strong>;</li>
<li>exercising the right of refusal via <strong>İYS (iys.org.tr)</strong>;</li>
<li>where SMS messages are sent, replying via the short number/method indicated in the message.</li>
<li>Once your opt-out notice reaches us, message sending is stopped within the period prescribed by the applicable legislation.</li>
<li>Every commercial electronic message must contain the sender''s identity (legal name), contact details and the opt-out method.</li>
</ul>
<h2>5. Relationship with Personal Data Protection</h2>
<p>Personal data processed under these consents — such as name, e-mail and phone number — are processed in accordance with Turkish Law No. 6698 on the Protection of Personal Data (KVKK). See the Privacy/KVKK notice on the website for details. The commercial electronic message consent and the KVKK privacy notice are <strong>separate texts</strong>; they must not be merged into a single checkbox in form design.</p>
<p>---</p>
<h2>Sources / basis</h2>
<ul>
<li><strong>Company identity source:</strong> Official company records (<code>vps-guezel/sirket/turkiye/</code> — trade registry gazette 10.06.2026): legal name, address, Gemlik Tax Office 4542302453, MERSIS 0454230245300001, Trade Registry No 7069 (Gemlik). No company phone on record → <code>{{TELEFON}}</code> placeholder remains.</li>
<li><strong>Legislation:</strong> Turkish Law No. 6563 on the Regulation of Electronic Commerce; Regulation on Commercial Communication and Commercial Electronic Messages (consent, İYS registration obligation, right of refusal, mandatory message content); Law No. 6698 (KVKK). Article numbers and the İYS registration deadline were deliberately omitted — see <code>docs/icerik/_tmp/EKSIK_legal.md</code>.</li>
<li><strong>Form distinction (newsletter / lead):</strong> the newsletter and quote/lead forms in the gzlteknoloji.com frontend (e.g. <code>frontend/src/components/containers/gzl/GzlLeadForm.tsx</code>) — hence two separate consent texts.</li>
<li><strong>İYS integration timing:</strong> Phase 2 online payment plan (task brief) — a recommendation, not a statutory requirement.</li>
</ul>','DRAFT — to be published after legal review.','Commercial Electronic Message Consent','DRAFT — to be published after legal review.')
ON DUPLICATE KEY UPDATE title=VALUES(title), slug=VALUES(slug), content=VALUES(content), summary=VALUES(summary), meta_title=VALUES(meta_title), meta_description=VALUES(meta_description);
