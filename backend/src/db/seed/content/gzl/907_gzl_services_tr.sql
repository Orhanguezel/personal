-- =============================================================
-- FILE: content/gzl/907_gzl_services_tr.sql
-- URETILDI: scripts/gzl-service-content.mjs  (@generated gzl-service-content)
--
-- ELLE DUZENLEME. Bu dosya scriptten uretilir; degisiklik gerekiyorsa
-- scripts/gzl-service-content.mjs duzenlenip script yeniden calistirilir.
--
-- Ne yapar: Bionluk ilan metinlerinden tasinan TR hizmet kayitlarini gercek
-- hizmet sayfasi icerigine cevirir (H2 bolumler, liste, SSS, ic link, meta).
-- Icerik JSON zarfinin `html` alanina yazilir; `packages` alani KORUNUR.
-- =============================================================

SET NAMES utf8mb4;

UPDATE `services_i18n` SET
  `name` = 'GEO Analizi ve SEO Denetimi',
  `summary` = 'Sitenizin arama motorlarındaki ve yapay zekâ asistanlarındaki görünürlüğünü ölçen, önceliklendirilmiş aksiyon planıyla teslim edilen teknik analiz raporu.',
  `meta_title` = 'GEO Analizi ve SEO Denetimi | GZL Teknoloji',
  `meta_description` = 'GEO analizi, teknik SEO denetimi ve Lighthouse ölçümü tek raporda. Sitenizin ChatGPT, Gemini ve Perplexity gibi yapay zekâ aramalarındaki görünürlüğünü ölçüyoruz.',
  `meta_keywords` = 'GEO analizi, GEO SEO denetimi, Lighthouse raporu',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>GEO analizi, bir web sitesinin yalnızca Google sonuçlarında değil; ChatGPT, Gemini, Perplexity ve Google AI Overviews gibi üretken arama sistemlerinde nasıl algılandığını ölçer. GZL Teknoloji olarak bu ölçümü teknik SEO denetimi ve Lighthouse performans testiyle birleştirip tek bir rapor halinde teslim ediyoruz.</p>
<h2>GEO analizi nedir?</h2>
<p>Kullanıcıların önemli bir bölümü artık bilgiye arama sonuç sayfasından değil, doğrudan bir yapay zekâ asistanından ulaşıyor. Bu sistemler siteleri sıralamaz, alıntılar. GEO analizi sitenizin alıntılanabilir olup olmadığını, yapay zekâ tarayıcılarının içeriğinize erişip erişemediğini ve yapılandırılmış verinizin markanızı doğru tanımlayıp tanımlamadığını inceler. 2026 itibarıyla bu ölçüm, klasik SEO raporunun tamamlayıcısı değil eşdeğeridir.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>0-100 arası yapay zekâ alıntılanabilirlik skoru ve skorun hangi bileşenlerden oluştuğu</li><li>ChatGPT, Gemini, Perplexity ve Google AI Overviews için ayrı ayrı hazırlık durumu</li><li>GPTBot, ClaudeBot, PerplexityBot gibi yapay zekâ tarayıcılarının erişim kontrolü</li><li>llms.txt uyumluluğu ve Schema.org / JSON-LD yapılandırılmış veri denetimi</li><li>robots.txt, sitemap.xml, canonical, meta etiketleri ve iç bağlantı analizi</li><li>Lighthouse performans, erişilebilirlik ve Core Web Vitals ölçümü (LCP, INP, CLS)</li></ul>
<p>Rapor, geliştiricinize doğrudan iletebileceğiniz teknik notlar ve önceliklendirilmiş bir aksiyon listesi içerir. Hangi maddenin görünürlüğe ne kadar katkı yapacağı ayrıca belirtilir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Alan adını ve varsa hedef anahtar kelimelerinizi paylaşırsınız; siteye erişim vermeniz gerekmez.</li><li>Otomatik taramalar ve manuel denetim birlikte yürütülür.</li><li>Bulgular etki/efor matrisine göre sıralanır.</li><li>PDF rapor teslim edilir; isterseniz uygulama desteği ayrıca planlanır.</li></ol>
<p>Analiz süreci canlı sitenize hiçbir müdahale içermez; ölçüm tamamen dışarıdan yapılır. Uygulama aşamasını birlikte yürütmek isteyen müşterilerimiz için maddeleri geliştirme paketine dönüştürüyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Sitesi yıllardır yayında olan ama organik trafiği duran kurumsal firmalar</li><li>Yeni sitesini açmadan önce teknik kontrol isteyen markalar</li><li>Yapay zekâ asistanlarında rakiplerinin görünüp kendisinin görünmediğini fark eden işletmeler</li><li>Ajansından aldığı raporu bağımsız bir gözle doğrulatmak isteyen yöneticiler</li></ul>
<p>Analiz, sektör ayrımı gözetmeden her web sitesine uygulanabilir. Yalnızca giriş sayfası olan tek sayfalık sitelerde kapsam doğal olarak daralır; bu durumda daha küçük bir paket öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Tek sayfalık hızlı kontrol ile çok dilli kurumsal sitelerin tam denetimi arasında kapsam ciddi biçimde değişiyor. Bu nedenle fiyat, sayfa sayısı ve dil sayısına göre belirleniyor; güncel paket aralıklarını paketler sayfasında bulabilirsiniz. Rapor teslimi tipik olarak 2-5 iş günü sürer.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>GEO analizi ile SEO analizi arasındaki fark nedir?</h3>
<p>SEO analizi sitenizin arama sonuçlarındaki sıralamasını etkileyen sinyalleri inceler. GEO analizi ise yapay zekâ asistanlarının içeriğinizi anlayıp anlamadığını ve yanıtlarında kaynak gösterip göstermediğini ölçer. İkisi farklı sinyaller kullandığı için raporda ayrı bölümler halinde sunulur.</p>
<h3>Siteme erişim vermem gerekiyor mu?</h3>
<p>Hayır. Analiz için alan adı yeterlidir. Yalnızca uygulama aşamasında, üzerinde anlaşırsak, ilgili sistemlere erişim talep edilir.</p>
<h3>Rapordaki maddeleri kendi ekibim uygulayabilir mi?</h3>
<p>Evet. Rapor bu amaçla yazılıyor: her madde hangi dosyada ne değişeceği düzeyinde açıklanıyor. Ekibiniz yoksa uygulamayı biz üstleniyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/yapay-zeka-arama-optimizasyonu-geo">Yapay zekâ arama optimizasyonu</a> · <a href="/tr/hizmetler/seo-hizmeti">SEO hizmeti</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'geo-seo-lighthouse-analizi';

UPDATE `services_i18n` SET
  `name` = 'Yapay Zekâ Arama Optimizasyonu (GEO)',
  `summary` = 'Sitenizin yapay zekâ asistanlarının yanıtlarında kaynak olarak gösterilmesi için içerik yapısı, yapılandırılmış veri ve tarayıcı erişimi düzenlenir.',
  `meta_title` = 'Yapay Zekâ Arama Optimizasyonu (GEO) | GZL Teknoloji',
  `meta_description` = 'Yapay zekâ arama optimizasyonu ile siteniz ChatGPT, Gemini ve Perplexity yanıtlarında kaynak gösterilir. llms.txt, JSON-LD ve içerik yapısı uçtan uca kurulur.',
  `meta_keywords` = 'yapay zekâ arama optimizasyonu, GEO optimizasyonu, ChatGPT görünürlüğü',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Yapay zekâ arama optimizasyonu (GEO), bir sitenin ChatGPT, Gemini, Perplexity ve Google AI Overviews yanıtlarında kaynak olarak gösterilmesini hedefleyen çalışmadır. GZL Teknoloji bu çalışmayı analizle değil uygulamayla bitirir: eksikler tespit edilir, sonra sitede doğrudan giderilir.</p>
<h2>Yapay zekâ arama optimizasyonu nedir?</h2>
<p>Klasik SEO sıralama için yarışır; yapay zekâ arama optimizasyonu ise alıntılanmak için yarışır. Bir asistan yanıt üretirken kaynağın net tanımlanmış, parçalanabilir ve doğrulanabilir olmasını arar. Bu yüzden çalışmanın merkezinde içerik yapısı, yapılandırılmış veri ve tarayıcı erişimi vardır. 2026 itibarıyla birçok sektörde markaya gelen trafiğin görünür kısmı azalırken asistan yanıtlarındaki görünürlük belirleyici hale geldi.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>llms.txt dosyasının oluşturulması ve içerik envanterinin buraya işlenmesi</li><li>Organization, Service, FAQPage ve Article şemalarıyla JSON-LD yapılandırması</li><li>Yapay zekâ tarayıcıları için robots.txt erişim politikasının düzenlenmesi</li><li>Sayfaların soru-cevap ve tanım blokları halinde yeniden yapılandırılması</li><li>Marka varlık tutarlılığı: aynı isim, adres ve tanımın tüm sayfalarda eşleşmesi</li><li>Öncesi ve sonrası GEO skoru karşılaştırması</li></ul>
<p>Çalışma sonunda sitenizde hangi sayfanın hangi soruya yanıt verdiği açıkça belirlenmiş olur. Bu haritalama hem yapay zekâ sistemleri hem de içerik ekibiniz için referans belge işlevi görür.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut durum ölçülür ve hedef sorular listelenir.</li><li>Teknik altyapı (llms.txt, JSON-LD, robots) düzenlenir.</li><li>Öncelikli sayfalar yeniden yapılandırılır.</li><li>Ölçüm tekrarlanır ve fark raporlanır.</li></ol>
<p>Süreç boyunca canlı sitede yapılan her değişiklik önce hazırlık ortamında denenir. Daha önce yürüttüğümüz projelerde GEO skorunda 35 seviyesinden 74 seviyesine çıkan örnekler oldu; sonuç içeriğin mevcut olgunluğuna göre değişir.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Ürün veya hizmetini tarif eden içeriği olan, ama bu içeriği yapay zekâ yanıtlarında göremeyen markalar</li><li>Teknik dokümantasyonu ve sık sorulan soruları bulunan yazılım firmaları</li><li>Bilgi arama niyetiyle gelen kullanıcıya hitap eden hizmet işletmeleri</li><li>Çok dilli sitesiyle birden fazla pazara seslenen ihracatçılar</li></ul>
<p>Yapay zekâ arama optimizasyonu, ürün sayfası sayısı az olan ama uzmanlık iddiası yüksek işletmelerde en hızlı sonucu veriyor. Böyle bir yapınız varsa öncelikli sayfa sayısı azalır, süre kısalır.</p>
<h2>Fiyat ve süre</h2>
<p>Fiyat, optimize edilecek sayfa ve dil sayısına bağlıdır. Tek dilli kurumsal sitelerde çalışma genellikle 1-2 hafta, çok dilli ve çok sayfalı sitelerde 3-5 hafta sürer. Güncel aralıklar için paketler sayfasına bakabilir veya doğrudan yazabilirsiniz.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Yapay zekâ arama optimizasyonu SEO yerine mi geçiyor?</h3>
<p>Hayır, yerine geçmiyor. İkisi birlikte çalışıyor: teknik SEO temeli olmayan bir sitede yapay zekâ görünürlüğü de kalıcı olmuyor. Çalışmaya genellikle teknik SEO eksiklerini kapatarak başlıyoruz.</p>
<h3>Sonucu nasıl ölçüyorsunuz?</h3>
<p>Öncesinde ve sonrasında aynı ölçüm setini uyguluyoruz: alıntılanabilirlik skoru, şema kapsamı, tarayıcı erişimi ve hedef sorularda görünürlük. Fark raporu teslim ediliyor.</p>
<h3>İçerikleri siz mi yazıyorsunuz?</h3>
<p>Mevcut içerik varsa yeniden yapılandırıyoruz. İçerik yoksa, üzerinde anlaşırsak yazımını da üstleniyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/geo-seo-lighthouse-analizi">GEO + SEO + Lighthouse analizi</a> · <a href="/tr/hizmetler/seo-hizmeti">SEO hizmeti</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'yapay-zeka-arama-optimizasyonu-geo';

UPDATE `services_i18n` SET
  `name` = 'SEO Hizmeti',
  `summary` = 'Teknik altyapı düzeltmeleri, sayfa içi optimizasyon ve içerik planını birlikte yürüten, ölçülebilir sonuç odaklı SEO çalışması.',
  `meta_title` = 'SEO Hizmeti: Teknik SEO ve İçerik | GZL Teknoloji',
  `meta_description` = 'SEO hizmeti kapsamında teknik altyapı, sayfa içi optimizasyon, içerik planı ve ölçümleme birlikte yürütülür. Raporlanabilir, kalıcı organik büyüme hedeflenir.',
  `meta_keywords` = 'SEO hizmeti, teknik SEO, arama motoru optimizasyonu, organik trafik',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>SEO hizmeti, bir web sitesinin arama motorlarında düzenli ve kalıcı trafik alması için teknik altyapı, sayfa içi optimizasyon ve içerik planının birlikte yürütülmesidir. GZL Teknoloji olarak sıralama vaadi vermek yerine, ölçülebilir maddelerden oluşan bir çalışma planı sunuyoruz.</p>
<h2>SEO hizmeti nedir?</h2>
<p>Arama motoru optimizasyonu üç katmandan oluşur: sitenin taranabilir ve hızlı olması, sayfaların hedef aramayla eşleşmesi ve içeriğin o aramayı gerçekten karşılaması. Bu katmanlardan biri eksikse diğerlerine yapılan yatırım sonuç vermez. SEO hizmeti kapsamında önce ölçüyor, sonra en yüksek etkiye sahip maddeden başlıyoruz.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Teknik denetim: tarama, indeksleme, canonical, sitemap ve hız sorunları</li><li>Anahtar kelime ve niyet analizi; hangi sayfanın hangi aramayı hedeflediğinin haritası</li><li>Sayfa içi optimizasyon: başlık hiyerarşisi, meta etiketler, iç bağlantı yapısı</li><li>İçerik planı ve öncelik sırası</li><li>Google Search Console ve analitik kurulumunun doğrulanması</li><li>Aylık ilerleme raporu</li></ul>
<p>Her ayın sonunda hangi maddenin tamamlandığı, hangi metriğin nasıl değiştiği ve bir sonraki ayın planı tek sayfada özetlenir. Müşterilerimizin çoğu bu raporu kendi yönetim ekibine doğrudan iletiyor.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut durum ve rakip karşılaştırması çıkarılır.</li><li>Teknik engeller kaldırılır.</li><li>Öncelikli sayfalar optimize edilir.</li><li>İçerik üretimi ve ölçüm döngüsü kurulur.</li></ol>
<p>Organik sonuçlar genellikle üçüncü aydan itibaren belirginleşir; teknik düzeltmelerin etkisi ise ilk haftalarda görülebilir. Süreci kısa vadeli sıçramalar yerine kalıcı büyüme üzerine kuruyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Reklam bütçesine bağımlılığını azaltmak isteyen e-ticaret ve hizmet firmaları</li><li>Sitesini yenilemiş ama sıralamalarını kaybetmiş markalar</li><li>Yeni pazara açılırken o dildeki aramalarda görünmek isteyen ihracatçılar</li><li>İçerik üretiyor fakat trafiğe dönüştüremeyen ekipler</li></ul>
<p>SEO hizmeti, ürün ya da hizmetine dair arama hacmi bulunan her işletme için anlamlıdır. Arama hacminin çok düşük olduğu niş alanlarda ise doğrudan talep yaratan kanalları önermeyi tercih ediyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Tek seferlik denetim ile aylık sürekli çalışma farklı fiyatlanır. Site büyüklüğü, dil sayısı ve içerik üretiminin dahil olup olmaması belirleyicidir. Güncel aralıkları paketler sayfasında görebilirsiniz.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Sıralama garantisi veriyor musunuz?</h3>
<p>Hayır. Arama motoru sıralaması üçüncü tarafın kontrolündedir ve garanti veren teklifler genellikle gerçekçi değildir. Bunun yerine yapılacak işi, ölçüm yöntemini ve beklenen etkiyi yazılı olarak paylaşıyoruz.</p>
<h3>İçerik üretimi dahil mi?</h3>
<p>Pakete göre değişir. İçerik planı her zaman dahildir; yazımın dahil olup olmayacağını birlikte belirliyoruz.</p>
<h3>Mevcut ajansımla birlikte çalışabilir misiniz?</h3>
<p>Evet. Teknik tarafı biz üstlenip içerik tarafını mevcut ekibinizle yürüttüğümüz projeler var. Görev dağılımını başta netleştiriyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/geo-seo-lighthouse-analizi">GEO + SEO + Lighthouse analizi</a> · <a href="/tr/hizmetler/ga4-gtm-donusum-izleme">GA4 ve dönüşüm izleme</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'seo-hizmeti';

UPDATE `services_i18n` SET
  `name` = 'Lead Bulma Paneli ve Rakip Takibi',
  `summary` = 'Dizin, fuar ve pazar yeri kaynaklarından potansiyel müşteri toplayan, rakip hareketlerini izleyen ve satış ekibine hazır liste üreten özel panel.',
  `meta_title` = 'Lead Bulma ve Rakip Takip Paneli | GZL Teknoloji',
  `meta_description` = 'Firmanıza özel lead bulma paneli: dizin, fuar ve pazar yeri taramasından potansiyel müşteri listesi, rakip fiyat takibi ve otomatik raporlama tek ekranda.',
  `meta_keywords` = 'lead bulma paneli, rakip takip yazılımı, potansiyel müşteri listesi',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Lead bulma paneli, satış ekibinizin manuel olarak topladığı potansiyel müşteri verisini otomatik toplayan, tekilleştiren ve önceliklendiren bir yazılımdır. GZL Teknoloji olarak bu paneli hazır bir araç satarak değil, sizin sektörünüzün kaynaklarına göre kurgulayarak geliştiriyoruz.</p>
<h2>Lead bulma paneli nedir?</h2>
<p>Çoğu firmada potansiyel müşteri listesi elektronik tabloda tutulur; veri eskir, tekrar eder ve kimin hangi kaydı takip ettiği kaybolur. Lead bulma paneli bu işi kalıcı bir sisteme dönüştürür: kaynaklar tanımlanır, tarama periyodik çalışır, çıkan kayıtlar tekilleştirilip skorlanır ve satış ekibine yalnızca temas edilebilir olanlar düşer.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Sektörünüze göre tanımlanmış veri kaynakları ve periyodik tarama işleri</li><li>Firma, yetkili, iletişim ve web sitesi alanlarıyla normalize edilmiş kayıt yapısı</li><li>Tekilleştirme (aynı firmanın farklı kaynaklardan gelen kayıtlarının birleştirilmesi)</li><li>Rakip fiyat ve ürün hareketlerinin izlenmesi ve değişim uyarıları</li><li>Satış hunisi durumları, not ve görev atama ekranları</li><li>Excel/CSV dışa aktarım ve yönetici özeti raporu</li></ul>
<p>Panel sizin sunucunuzda veya bizim yönettiğimiz altyapıda çalışabilir. Verinin tamamı size aittir; dışa aktarım her zaman açıktır ve kilitlenme yaratacak bir bağımlılık kurmayız.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Hedef müşteri profili ve kullanılabilir veri kaynakları birlikte belirlenir.</li><li>Örnek tarama yapılır, çıkan verinin kalitesi ölçülür.</li><li>Panel ve tarama altyapısı kurulur, ekip eğitimi verilir.</li><li>İlk ay çalışma izlenir, skorlama kuralları gerçek sonuçlara göre ayarlanır.</li></ol>
<p>Deneyimimize göre en kritik aşama ilk aydır: skorlama kuralları saha geri bildirimiyle ayarlanmadığında panel çok fazla düşük kaliteli kayıt üretir. Bu nedenle ilk ayki ayar turunu proje kapsamına dahil ediyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Dışa açık müşteri listesi bulunan B2B üretici ve ihracatçılar</li><li>Bayi veya servis ağı kurmak isteyen markalar</li><li>Rakip fiyatlarını düzenli izlemesi gereken e-ticaret ekipleri</li><li>Satış ekibi küçük olduğu için zamanını doğru kayda ayırmak zorunda olan firmalar</li></ul>
<p>Hedef kitlesi tamamen bireysel tüketici olan işletmelerde lead bulma paneli genellikle doğru araç değildir; bu durumda reklam ve içerik tarafına yönlendiriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Fiyat, kaynak sayısına ve panelin kapsamına göre değişir. Tek kaynaklı bir başlangıç kurulumu birkaç hafta içinde çalışır hale gelirken, çok kaynaklı ve skorlamalı sistemler 4-8 hafta sürer. Güncel paket aralıklarını paketler sayfasında bulabilirsiniz.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Toplanan veri yasal olarak kullanılabilir mi?</h3>
<p>Panel yalnızca herkese açık kaynaklardan veri toplar ve kişisel veri işleme sorumluluğu size aittir. Kurulum sırasında hangi alanların toplanacağını birlikte sınırlandırıyor, gerekmeyen kişisel alanları en baştan kapsam dışı bırakıyoruz.</p>
<h3>Mevcut CRM sistemimize bağlanır mı?</h3>
<p>Evet. API’si olan CRM sistemlerine aktarım yapılabilir; API yoksa CSV aktarımı ile çalışılır.</p>
<h3>Kaynak siteler yapısını değiştirirse ne oluyor?</h3>
<p>Tarama işleri hata verdiğinde uyarı üretir. Bakım paketi kapsamında bu güncellemeleri biz yapıyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/google-maps-veri-cekme-botu">Google Maps veri toplama botu</a> · <a href="/tr/hizmetler/amazon-fiyat-scraping-sistemi">Amazon fiyat takip sistemi</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'lead-bulma-rakip-takip-paneli';

UPDATE `services_i18n` SET
  `name` = 'Sosyal Medya Otomasyon Paneli',
  `summary` = 'Birden fazla marka ve platformu tek ekrandan yöneten, içerik takvimi, onay akışı ve performans raporlaması içeren özel sosyal medya paneli.',
  `meta_title` = 'Sosyal Medya Otomasyon Paneli | GZL Teknoloji',
  `meta_description` = 'Markanıza özel sosyal medya otomasyon paneli: çok hesaplı planlama, yapay zekâ destekli içerik taslakları, onay akışı ve performans raporlaması tek yerde.',
  `meta_keywords` = 'sosyal medya otomasyon paneli, içerik planlama yazılımı, sosyal medya yönetimi',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Sosyal medya otomasyon paneli, birden fazla hesabın içerik planını, onay akışını ve performans raporunu tek ekranda toplayan bir yazılımdır. GZL Teknoloji olarak hazır araçların sınırlarına takılan ekipler için markaya özel panel geliştiriyoruz.</p>
<h2>Sosyal medya otomasyon paneli nedir?</h2>
<p>Hazır planlama araçları tek marka ve tek ekip için tasarlanır. Ajanslarda ve çok markalı yapılarda ise onay zinciri, marka bazlı yetkilendirme ve müşteriye özel raporlama gerekir. Panel bu ihtiyaçlara göre kurgulanır; içerik üretiminden yayına ve raporlamaya kadar süreç tek yerde ilerler.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Instagram, Facebook, X, LinkedIn ve YouTube için hesap bağlama ve zamanlanmış yayın</li><li>Marka bazlı içerik takvimi ve sürükle-bırak planlama ekranı</li><li>Yapay zekâ destekli başlık, açıklama ve etiket taslakları</li><li>Çok aşamalı onay akışı ve rol bazlı yetkilendirme</li><li>Görsel/video kütüphanesi ve yeniden kullanım</li><li>Etkileşim, erişim ve büyüme metrikleriyle müşteriye gönderilebilir rapor</li></ul>
<p>Panel, platformların resmî API’leri üzerinden çalışır. Bu, yayınların güvenilir olmasını sağlar; buna karşılık her platformun izin verdiği işlem seti farklıdır ve kapsam başta netleştirilir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut iş akışınız ve onay zinciriniz çıkarılır.</li><li>Platform izinleri ve uygulama başvuruları tamamlanır.</li><li>Panel geliştirilir, pilot bir marka ile canlıya alınır.</li><li>Tüm markalar taşınır ve ekip eğitimi yapılır.</li></ol>
<p>Platform uygulama onayları bazen proje süresini belirleyen aşama olur. Bu nedenle başvuruları projenin ilk haftasında başlatıyor, geliştirmeyi paralel yürütüyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Birden fazla markayı aynı anda yöneten ajanslar</li><li>Şube veya bayi hesapları merkezden yönetilen zincir işletmeler</li><li>İçerik üretimi dış kaynaklı olduğu için onay akışına ihtiyaç duyan pazarlama ekipleri</li><li>Hazır araçların abonelik maliyetini kalıcı bir yatırımla değiştirmek isteyen firmalar</li></ul>
<p>Tek hesabı olan ve haftada birkaç paylaşım yapan işletmeler için özel panel genellikle gereksiz bir yatırımdır; bu durumda mevcut hazır araçlarla ilerlemenizi öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Fiyat, bağlanacak platform sayısına ve otomasyon derinliğine göre belirlenir. Temel planlama paneli 3-4 haftada, yapay zekâ destekli ve çok markalı sürüm 6-10 haftada teslim edilir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Hesap şifrelerimizi paylaşmamız gerekiyor mu?</h3>
<p>Hayır. Bağlantı, platformların resmî yetkilendirme akışıyla kurulur; panel yalnızca verdiğiniz izinler kadarını görür ve bu izinleri istediğiniz an geri alabilirsiniz.</p>
<h3>Yapay zekâ ürettiği içerik doğrudan yayınlanıyor mu?</h3>
<p>Varsayılan olarak hayır. Üretilen metin taslak olarak düşer, onay akışından geçmeden yayına gitmez.</p>
<h3>Panel kendi sunucumuzda çalışabilir mi?</h3>
<p>Evet. Kurumsal müşterilerimizin bir bölümünde panel kendi altyapılarında çalışıyor; kurulum ve güncelleme sürecini birlikte planlıyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/ga4-gtm-donusum-izleme">GA4 ve dönüşüm izleme</a> · <a href="/tr/hizmetler/ozel-yazilim-nextjs-fastify">Özel yazılım geliştirme</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'sosyal-medya-otomasyon-paneli';

UPDATE `services_i18n` SET
  `name` = 'Veri Tahmin Platformu (Yapay Zekâ ve Makine Öğrenmesi)',
  `summary` = 'Kurum verisi üzerinde tahmin modelleri eğiten, sonuçları görselleştiren ve karar destek çıktısı üreten uçtan uca makine öğrenmesi platformu.',
  `meta_title` = 'Yapay Zekâ Destekli Veri Tahmin Platformu | GZL Teknoloji',
  `meta_description` = 'Veri tahmin platformu ile verinizi karara dönüştürün: model eğitimi, versiyonlama, görselleştirme ve açıklanabilir sonuçlar tek panelde toplanır.',
  `meta_keywords` = 'veri tahmin platformu, makine öğrenmesi platformu, tahmin modeli geliştirme',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Veri tahmin platformu, kurumunuzda zaten biriken veriyi tahmin ve karar çıktısına dönüştüren bir sistemdir. GZL Teknoloji olarak model geliştirme, versiyonlama, görselleştirme ve raporlamayı tek panelde birleştiren çözümler kuruyoruz.</p>
<h2>Veri tahmin platformu nedir?</h2>
<p>Makine öğrenmesi projelerinin çoğu modelin doğruluğu yüzünden değil, modelin üretime alınamaması yüzünden başarısız olur. Platform bu boşluğu kapatır: veri hazırlama, eğitim, sürüm takibi ve sonucun iş ekibinin anlayacağı biçimde sunulması aynı akışın parçası haline gelir. Ar-Ge ekipleri, tarım ve biyoteknoloji alanındaki müşterilerimizde bu yapı 2026 itibarıyla standart hale geldi.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Veri yükleme, doğrulama ve ön işleme akışı</li><li>Regresyon ve sınıflandırma modelleri, güven aralıklarıyla birlikte sonuç tabloları</li><li>Model versiyonlama ve deney takibi (MLflow uyumlu)</li><li>Dağılım, PCA ve karşılaştırma grafikleriyle görselleştirme</li><li>Otomatik yeniden eğitim döngüsü ve performans izleme</li><li>Büyük dil modeli destekli yorum katmanı: sonucun düz metinle açıklanması</li></ul>
<p>Model dokümantasyonu her pakete dahildir. Hangi verinin nasıl işlendiği, hangi varsayımların yapıldığı ve modelin nerede yanılabileceği yazılı olarak teslim edilir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Veri envanteri çıkarılır ve tahmin hedefi netleştirilir.</li><li>Küçük bir veri kümesiyle fizibilite modeli eğitilir.</li><li>Sonuç anlamlıysa platform kurulur ve modeller üretime alınır.</li><li>İzleme ve yeniden eğitim döngüsü devreye alınır.</li></ol>
<p>Fizibilite aşamasını ayrı tutuyoruz; veri tahmin için yeterli değilse bunu projenin başında söylemeyi, sonunda büyük bir yatırımın karşılıksız kalmasına tercih ediyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Ar-Ge ve laboratuvar verisi biriken kurumlar</li><li>Tarım, tohumculuk ve biyoteknoloji alanında ıslah ve verim tahmini yapan ekipler</li><li>Talep, stok veya fiyat tahmini yapmak isteyen üretim ve perakende firmaları</li><li>Elektronik tablolarla yürüttüğü analizi kalıcı bir sisteme taşımak isteyen ekipler</li></ul>
<p>Veri hacmi çok düşük olduğunda makine öğrenmesi yerine daha basit istatistiksel yöntemler öneriyoruz; bu durumda küçük bir raporlama paneli genellikle yeterli oluyor.</p>
<h2>Fiyat ve süre</h2>
<p>Tek model içeren başlangıç kurulumu bir hafta içinde teslim edilebilir. Çok modelli, versiyonlamalı ve otomatik yeniden eğitimli tam platform 4-8 hafta sürer. Kapsam ve fiyat, veri hacmine ve model sayısına göre belirlenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Verimizi dışarı çıkarmamız gerekiyor mu?</h3>
<p>Hayır. Platform kendi sunucunuzda kurulabilir; bu durumda veri kurum dışına çıkmaz. Bulut kurulum tercih edildiğinde erişim ve saklama politikaları sözleşmeyle belirlenir.</p>
<h3>Modelin doğruluğu garanti ediliyor mu?</h3>
<p>Doğruluk verinin niteliğine bağlıdır ve peşinen garanti edilemez. Bu yüzden fizibilite aşamasında ölçülen metrikleri paylaşıyor, devam kararını birlikte veriyoruz.</p>
<h3>Sonuçları iş ekibimiz anlayabilir mi?</h3>
<p>Evet, yorum katmanı bu amaçla var: model çıktısı sayı olarak değil, gerekçesiyle birlikte metin halinde de sunuluyor.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/amazon-fiyat-scraping-sistemi">Amazon fiyat takip sistemi</a> · <a href="/tr/hizmetler/firmaya-ozel-erp-yazilimi">Firmaya özel ERP</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'ai-ml-veri-tahmin-platformu';

UPDATE `services_i18n` SET
  `name` = 'Amazon Fiyat Takip Sistemi ve Ürün Araştırması',
  `summary` = 'Amazon ve benzeri pazar yerlerinde ürün, fiyat ve rakip verisini toplayan, skorlayan ve karar destek raporu üreten panel.',
  `meta_title` = 'Amazon Ürün ve Fiyat Takip Sistemi | GZL Teknoloji',
  `meta_description` = 'Amazon fiyat takip sistemi ile ürün araştırması, fiyat geçmişi ve rakip analizi otomatikleşir. Skorlanmış sonuçlar karar verilebilir rapora dönüşür.',
  `meta_keywords` = 'Amazon fiyat takip sistemi, ürün araştırma paneli, e-ticaret veri toplama',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Amazon fiyat takip sistemi, pazar yeri üzerinde ürün araştırmasını, fiyat geçmişini ve rakip hareketlerini otomatik toplayan bir paneldir. GZL Teknoloji olarak toplanan veriyi ham liste olarak bırakmıyor; risk ve fırsat skoruna dönüştürüyoruz.</p>
<h2>Amazon fiyat takip sistemi nedir?</h2>
<p>Pazar yerinde ürün seçimi, çoğunlukla birkaç ekran görüntüsü ve sezgiyle yapılır. Oysa karar için gereken veri açıktır: fiyat geçmişi, satıcı sayısı, değerlendirme eğilimi ve kategori derinliği. Sistem bu verileri periyodik toplar, aynı ürünü farklı listelemelerde tekilleştirir ve güncel haliyle karşılaştırılabilir kılar.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Anahtar kelime veya kategori bazlı tarama ve ürün listeleme</li><li>ASIN tekilleştirme ve varyant eşleştirme</li><li>Fiyat geçmişi takibi ve değişim uyarıları</li><li>Satıcı sayısı, değerlendirme ve stok sinyalleriyle çok boyutlu skorlama</li><li>Büyük dil modeli destekli açıklanabilir karar notu</li><li>Yönetici özeti ve dışa aktarılabilir rapor</li></ul>
<p>Skorlama kuralları sabit değildir; sizin kategori bilginize göre ağırlıklandırılır. Böylece panel kendi ticari önceliklerinizi yansıtır.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Hedef kategori ve karar kriterleri belirlenir.</li><li>Örnek tarama ile veri kalitesi doğrulanır.</li><li>Panel kurulur, skorlama ağırlıkları ayarlanır.</li><li>Periyodik tarama ve uyarılar devreye alınır.</li></ol>
<p>Pazar yerlerinin sayfa yapısı düzenli değişir. Bu nedenle tarama katmanını izlenebilir kuruyor, hata durumunda sessizce boş veri üretmesini değil uyarı vermesini sağlıyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Pazar yerinde yeni ürün kategorisi araştıran satıcılar</li><li>Fiyat rekabetini günlük takip etmesi gereken markalar</li><li>Tedarik kararını veriyle almak isteyen ithalatçılar</li><li>Danışmanlık verirken müşterisine rapor üretmesi gereken ekipler</li></ul>
<p>Tek ürünle çalışan ve fiyatı nadiren değişen satıcılar için sistem genellikle gereğinden kapsamlı kalıyor; bu durumda daha küçük bir izleme kurulumu öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Tek kategori taraması yapan başlangıç paneli yaklaşık bir haftada, skorlama ve karar katmanı içeren tam sürüm 3-6 haftada teslim edilir. Fiyat, tarama hacmine ve kaynak sayısına göre belirlenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Veri toplama pazar yeri kurallarına aykırı mı?</h3>
<p>Sistem yalnızca herkese açık sayfaları, makul aralıklarla ve platformun teknik sınırlarını zorlamadan tarar. Resmî API mevcut olan yerlerde önce API kullanılır.</p>
<h3>Fiyat geçmişi ne kadar geriye gidiyor?</h3>
<p>Kurulumdan itibaren biriken veri sizindir. Geriye dönük veri için harici kaynak entegrasyonu gerekir; bunu proje kapsamında ayrıca değerlendiriyoruz.</p>
<h3>Başka pazar yerleri eklenebilir mi?</h3>
<p>Evet. Mimari çok kaynaklı çalışacak şekilde kurulur; yeni kaynak eklemek yeni bir tarama modülü yazmak anlamına gelir.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/lead-bulma-rakip-takip-paneli">Lead bulma ve rakip takip paneli</a> · <a href="/tr/hizmetler/google-maps-veri-cekme-botu">Google Maps veri toplama botu</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'amazon-fiyat-scraping-sistemi';

UPDATE `services_i18n` SET
  `name` = 'Google Maps Veri Toplama Botu',
  `summary` = 'Bölge ve sektör bazlı işletme listelerini Google Maps ve web kaynaklarından toplayıp temizleyen, tekilleştiren ve tabloya dönüştüren bot.',
  `meta_title` = 'Google Maps Veri Toplama Botu | GZL Teknoloji',
  `meta_description` = 'Google Maps veri toplama botu ile bölge ve sektör bazlı işletme listeleri çıkarılır: ad, adres, telefon, web sitesi ve puan verisi tabloya dönüşür.',
  `meta_keywords` = 'Google Maps veri toplama, işletme listesi çıkarma, veri kazıma botu',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Google Maps veri toplama botu, belirlediğiniz bölge ve sektördeki işletmeleri listeleyip iletişim bilgileriyle birlikte tabloya dönüştüren bir araçtır. GZL Teknoloji olarak bu botları tek seferlik liste çıkarmak için değil, düzenli çalışan bir veri akışı kurmak için geliştiriyoruz.</p>
<h2>Google Maps veri toplama nedir?</h2>
<p>Saha satışı, bayi arayışı ve pazar araştırması yapan ekipler aynı işi elle yapar: haritada arama, kayıt kopyalama, tabloya yapıştırma. Bot bu döngüyü otomatikleştirir. Aramalar bölge ve kategori kombinasyonuna göre çalışır, sonuçlar tekilleştirilir ve eksik alanlar işletmenin web sitesinden tamamlanır.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Bölge ve kategori kombinasyonlarına göre otomatik arama planı</li><li>İşletme adı, adres, telefon, web sitesi, puan ve yorum sayısı alanları</li><li>Aynı işletmenin farklı kayıtlarının tekilleştirilmesi</li><li>Web sitesinden e-posta ve sosyal hesap tamamlama</li><li>Excel/CSV çıktısı ve isteğe bağlı panel arayüzü</li><li>Periyodik yeniden tarama ve değişiklik raporu</li></ul>
<p>Çıktı, satış ekibinin doğrudan kullanabileceği biçimde teslim edilir: tekilleştirilmiş, alanları normalize edilmiş ve kaynağı belli. Ham veri yığını teslim etmiyoruz.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Hedef bölge, kategori ve gerekli alanlar belirlenir.</li><li>Örnek tarama yapılır, doğruluk oranı ölçülür.</li><li>Bot kurulur ve tam tarama çalıştırılır.</li><li>Periyodik güncelleme planlanır.</li></ol>
<p>Örnek tarama aşamasını atlamıyoruz: bölge ve kategori seçiminin doğruluk oranına etkisi büyük ve bunu erken görmek toplam süreyi kısaltıyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Saha satış ekibine bölge listesi hazırlaması gereken firmalar</li><li>Bayi, servis noktası veya tedarikçi ağı kurmak isteyen markalar</li><li>Belirli bir sektördeki işletme yoğunluğunu ölçmek isteyen araştırmacılar</li><li>Etkinlik ve fuar öncesi hedef liste hazırlayan pazarlama ekipleri</li></ul>
<p>Yalnızca birkaç yüz kayıtlık tek seferlik bir ihtiyaç varsa, bot kurmak yerine tek seferlik liste çıkarma hizmetiyle ilerlemek daha ekonomik oluyor.</p>
<h2>Fiyat ve süre</h2>
<p>Tek seferlik liste çıkarma birkaç gün içinde tamamlanır. Panelli ve periyodik çalışan kurulum 2-4 hafta sürer. Fiyat, hedef kayıt sayısına ve tamamlanacak alan sayısına göre belirlenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Toplanan veriyi pazarlama amaçlı kullanabilir miyim?</h3>
<p>Veriler herkese açık kaynaklardan gelir; ancak kullanım sorumluluğu ve kişisel verilerin korunmasına ilişkin yükümlülükler size aittir. Kurulumda gereksiz kişisel alanları kapsam dışı bırakıyoruz.</p>
<h3>Doğruluk oranı ne kadar?</h3>
<p>Alanlara göre değişir: ad ve adres yüksek doğrulukla gelir, e-posta ise ancak işletmenin web sitesinde yayımlanmışsa tamamlanabilir. Örnek tarama bu oranı proje başında gösterir.</p>
<h3>Sonuçları kendi sistemimize aktarabilir miyiz?</h3>
<p>Evet. CSV ve Excel çıktısı standarttır; API’si olan CRM sistemlerine doğrudan aktarım da yapılabilir.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/lead-bulma-rakip-takip-paneli">Lead bulma ve rakip takip paneli</a> · <a href="/tr/hizmetler/amazon-fiyat-scraping-sistemi">Amazon fiyat takip sistemi</a> · <a href="/tr/hizmetler">Tüm hizmetler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'google-maps-veri-cekme-botu';

UPDATE `services_i18n` SET
  `name` = 'GA4, GTM ve Dönüşüm İzleme Kurulumu',
  `summary` = 'GA4, Google Tag Manager ve reklam piksellerinin doğru kurulumu; olay şeması, e-ticaret ölçümü ve doğrulama raporuyla birlikte teslim edilir.',
  `meta_title` = 'GA4, GTM ve Dönüşüm İzleme Kurulumu | GZL Teknoloji',
  `meta_description` = 'Dönüşüm izleme kurulumu ile GA4, Google Tag Manager ve reklam pikselleri doğru yapılandırılır; hangi kanalın gerçekten satış getirdiği ölçülebilir hale gelir.',
  `meta_keywords` = 'dönüşüm izleme kurulumu, GA4 kurulumu, Google Tag Manager, e-ticaret ölçümleme',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Dönüşüm izleme kurulumu, web sitenizdeki anlamlı eylemlerin doğru ölçülmesini sağlayan teknik çalışmadır. GZL Teknoloji olarak GA4, Google Tag Manager ve reklam piksellerini birbirini tekrar etmeyen tek bir olay şeması üzerine kuruyoruz.</p>
<h2>Dönüşüm izleme kurulumu nedir?</h2>
<p>Çoğu sitede ölçüm vardır ama güvenilir değildir: aynı satın alma iki kez sayılır, form gönderimi hiç sayılmaz, reklam paneli ile analitik farklı rakam gösterir. Bunun nedeni genellikle etiketlerin zaman içinde üst üste eklenmesi ve hiçbirinin güncel şemaya göre gözden geçirilmemesidir. Kurulum bu karmaşayı tek bir şemaya indirger ve her olayın nereden geldiği belgelenir.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Google Tag Manager konteyner kurulumu ve mevcut etiketlerin temizliği</li><li>GA4 mülkü, veri akışı ve olay şemasının tanımlanması</li><li>E-ticaret ölçümü: ürün görüntüleme, sepete ekleme, ödeme adımları ve satın alma</li><li>Form, telefon ve WhatsApp gibi iletişim dönüşümlerinin tanımlanması</li><li>Meta Pixel ve Google Ads dönüşümlerinin aynı şemadan beslenmesi</li><li>Doğrulama raporu: hangi olayın hangi sayfada, hangi değerle tetiklendiği</li></ul>
<p>Kurulum sonunda ölçüm planı yazılı olarak teslim edilir. Bu belge, ileride yeni sayfa veya kampanya eklendiğinde ekibinizin aynı standardı sürdürmesini sağlar.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut kurulum denetlenir, çift sayım ve eksik olaylar tespit edilir.</li><li>Ölçüm planı hazırlanır ve onaylanır.</li><li>Etiketler kurulur, hazırlık ortamında test edilir.</li><li>Canlıya alınır ve iki hafta boyunca doğrulama yapılır.</li></ol>
<p>İki haftalık doğrulama süresini kapsama dahil ediyoruz; ölçüm hatalarının çoğu ilk günlerde değil, gerçek trafik altında ortaya çıkıyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Reklam harcaması yapan ve geri dönüşünü net göremeyen e-ticaret siteleri</li><li>Formdan gelen talebi kanal bazında ayrıştıramayan hizmet firmaları</li><li>Sitesini yenilemiş ve ölçümü sıfırdan kurması gereken markalar</li><li>Ajans değişikliği sonrası ölçüm sahipliğini kendi bünyesine almak isteyen şirketler</li></ul>
<p>Trafiği çok düşük ve dönüşüm sayısı tek haneli olan sitelerde ayrıntılı ölçüm kurmak yerine önce talep yaratmaya odaklanmayı öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Standart bir kurumsal sitede kurulum 3-5 iş günü, çok adımlı e-ticaret akışlarında 1-2 hafta sürer. Fiyat, ölçülecek olay sayısına ve mevcut kurulumun karmaşıklığına göre belirlenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Mevcut GA4 verimiz kaybolur mu?</h3>
<p>Hayır. Yeni kurulum mevcut mülk üzerinde yapılabilir; geçmiş veri korunur. Yalnızca olay adları değişiyorsa raporlarda kırılma olur ve bunu önceden planlıyoruz.</p>
<h3>Çerez onayı ile uyumlu mu?</h3>
<p>Evet. Etiketler onay durumuna bağlı çalışacak şekilde kurulur; onay verilmeyen ziyaretçide ölçüm sınırlanır.</p>
<h3>Raporları biz mi kuracağız?</h3>
<p>Temel raporlar kurulum kapsamında hazırlanır. Yönetim ekibine özel gösterge panelleri isteniyorsa ayrıca planlıyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/seo-hizmeti">SEO hizmeti</a> · <a href="/tr/hizmetler/geo-seo-lighthouse-analizi">GEO analizi ve SEO denetimi</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'ga4-gtm-donusum-izleme';

UPDATE `services_i18n` SET
  `name` = 'Firmaya Özel ERP ve Yönetim Sistemi',
  `summary` = 'Stok, sipariş, üretim planlama, cari ve raporlamayı tek panelde toplayan, işletmenizin kendi iş akışına göre geliştirilen ERP çözümü.',
  `meta_title` = 'Firmaya Özel ERP ve Yönetim Sistemi | GZL Teknoloji',
  `meta_description` = 'Firmaya özel ERP ile stok, sipariş, üretim ve cari takibi tek panelde toplanır. Hazır paketlere sığmayan iş akışlarınıza göre geliştirilir.',
  `meta_keywords` = 'firmaya özel ERP, üretim yönetim sistemi, stok ve sipariş takibi',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Firmaya özel ERP, hazır paketlerin dayattığı iş akışına uymak yerine sizin süreçlerinizi esas alan bir yönetim sistemidir. GZL Teknoloji olarak stok, sipariş, üretim ve cari takibini tek panelde toplayan sistemleri sıfırdan geliştiriyoruz.</p>
<h2>Firmaya özel ERP nedir?</h2>
<p>Hazır ERP paketleri geniş bir sektör yelpazesine hitap etmek için tasarlanır; bu yüzden her firmada kullanılmayan modüller ve zorlama çözümler ortaya çıkar. Firmaya özel ERP ise yalnızca kullandığınız süreçleri kapsar. Sonuç: daha az ekran, daha az eğitim, daha az kullanıcı direnci ve lisans başına artmayan bir maliyet.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Stok, depo ve parti/seri takibi</li><li>Sipariş, teklif ve fatura akışı; cari hesap yönetimi</li><li>Üretim planlama, iş emri ve operasyon takibi</li><li>Rol bazlı yetkilendirme ve işlem geçmişi kaydı</li><li>Yönetim raporları ve dışa aktarım</li><li>Mevcut muhasebe veya e-fatura sistemlerine entegrasyon</li></ul>
<p>Sistem web tabanlı geliştirilir; ofis, depo ve sahadan aynı anda kullanılabilir. Kurulum sonrası kaynak kodu ve veritabanı erişimi sizindir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut süreçler yerinde incelenir ve akış şemaları çıkarılır.</li><li>Öncelikli modül belirlenip ilk sürüm hızlıca canlıya alınır.</li><li>Kullanım geri bildirimiyle diğer modüller sırayla eklenir.</li><li>Veri aktarımı ve ekip eğitimi tamamlanır.</li></ol>
<p>Tüm modülleri aynı anda teslim etmek yerine öncelikli süreçle başlıyoruz. Bu yaklaşım hem projenin erken değer üretmesini sağlıyor hem de yanlış varsayımların büyümeden düzeltilmesine imkân veriyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Hazır ERP denemiş ama süreçlerine uymadığı için vazgeçmiş üretim firmaları</li><li>Elektronik tablolarla yönetilen stok ve sipariş süreçlerini sisteme taşımak isteyen işletmeler</li><li>Kullanıcı sayısı arttıkça lisans maliyeti katlanan şirketler</li><li>Kendi sektörüne özel hesaplama ve raporlama kuralları olan kurumlar</li></ul>
<p>Süreçleri standart ve küçük ölçekli işletmelerde hazır bir paket genellikle daha ekonomik olur; böyle durumlarda özel geliştirme önermiyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Tek modüllük bir başlangıç sürümü 4-6 haftada canlıya alınabilir. Çok modüllü tam sistemler 3-6 ay sürer. Fiyat, modül sayısına ve entegrasyon ihtiyacına göre belirlenir; güncel aralıklar için paketler sayfasına bakabilirsiniz.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Mevcut verilerimiz aktarılabilir mi?</h3>
<p>Evet. Elektronik tablo, hazır ERP veya eski veritabanından aktarım yapılabilir. Aktarım öncesi veri temizliği ayrı bir adım olarak planlanır.</p>
<h3>Kaynak kodu bizde mi olacak?</h3>
<p>Evet. Teslimde kaynak kodu ve veritabanı şeması size devredilir; başka bir ekiple devam etmek istediğinizde engel oluşmaz.</p>
<h3>Sistem kendi sunucumuzda çalışabilir mi?</h3>
<p>Evet, kendi sunucunuzda veya bizim yönettiğimiz altyapıda çalışabilir. Karar genellikle veri politikanıza göre veriliyor.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/osgb-isletme-yonetim-sistemi">OSGB işletme yönetim sistemi</a> · <a href="/tr/hizmetler/ozel-yazilim-nextjs-fastify">Özel yazılım geliştirme</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'firmaya-ozel-erp-yazilimi';

UPDATE `services_i18n` SET
  `name` = 'OSGB Yönetim Sistemi (İşletme Yazılımı)',
  `summary` = 'Ortak sağlık ve güvenlik birimleri için sözleşme, ziyaret planlama, uzman ataması, eğitim ve raporlama süreçlerini yöneten özel yazılım.',
  `meta_title` = 'OSGB İşletme Yönetim Sistemi Yazılımı | GZL Teknoloji',
  `meta_description` = 'OSGB yönetim sistemi ile sözleşme, ziyaret planı, uzman ataması, eğitim ve muayene takibi tek panelde toplanır; mevzuata uygun raporlar üretilir.',
  `meta_keywords` = 'OSGB yönetim sistemi, OSGB yazılımı, İSG ziyaret takibi',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>OSGB yönetim sistemi, ortak sağlık ve güvenlik birimlerinin sözleşme, ziyaret, uzman ataması ve raporlama süreçlerini tek panelde yöneten bir yazılımdır. GZL Teknoloji olarak bu sistemi sahadaki gerçek iş akışına göre geliştiriyoruz.</p>
<h2>OSGB yönetim sistemi nedir?</h2>
<p>Bir OSGB’nin işi takvim yönetmektir: hangi işyerine, hangi ay, hangi uzmanın kaç saat gitmesi gerektiği mevzuatla belirlidir. Bu planlama elektronik tabloyla yürütüldüğünde eksik ziyaret ve gecikmiş eğitim kaçınılmaz olur. Sistem planı otomatik üretir, gerçekleşmeyi kaydeder ve açığı önceden uyarır.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>İşyeri, sözleşme ve tehlike sınıfı kayıtları</li><li>Mevzuata göre otomatik ziyaret planı ve uzman/hekim ataması</li><li>Ziyaret gerçekleşme kaydı, imza ve saha notları</li><li>Eğitim, muayene ve periyodik kontrol takibi</li><li>Belge arşivi ve süresi dolan belgeler için uyarı</li><li>İşyeri bazlı ve toplu yönetim raporları</li></ul>
<p>Raporlar hem iç takip hem de müşterinize sunum için hazırlanır. Süresi dolmak üzere olan yükümlülükler panelde ayrı bir liste halinde toplanır.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut işyeri portföyü ve planlama kuralları çıkarılır.</li><li>Plan üretim mantığı kurulur ve örnek ayla doğrulanır.</li><li>Saha kullanımı için mobil uyumlu ekranlar tamamlanır.</li><li>Veri aktarımı yapılır, ekip eğitimiyle canlıya geçilir.</li></ol>
<p>Planlama kurallarını doğrulama adımını atlamıyoruz: tehlike sınıfı ve çalışan sayısına bağlı süre hesabı yanlış kurulursa sistemin ürettiği tüm plan hatalı olur.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Çok sayıda işyeriyle çalışan ve planlamayı elektronik tabloyla yürüten OSGB’ler</li><li>Uzman ve hekim atamasını merkezden yönetmek isteyen kurumlar</li><li>Belge takibinde gecikme yaşayan ve denetime hazır olmak isteyen firmalar</li><li>Müşterisine düzenli rapor sunmak isteyen hizmet sağlayıcılar</li></ul>
<p>Tek uzmanla ve az sayıda işyeriyle çalışan yapılarda sistem gereğinden kapsamlı kalabilir; bu durumda daha küçük bir takip paneli öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Temel planlama ve ziyaret takibi içeren sürüm 4-6 haftada teslim edilir. Eğitim, muayene ve belge arşivini kapsayan tam sistem 2-4 ay sürer. Güncel fiyat aralıkları paketler sayfasında yer alır.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Mevzuat değişirse sistem güncellenir mi?</h3>
<p>Planlama kuralları yapılandırılabilir tanımlanır; süre ve periyot değerleri panelden değiştirilebilir. Yapısal değişiklikler bakım paketi kapsamında ele alınır.</p>
<h3>Uzmanlar sahadan kullanabilir mi?</h3>
<p>Evet. Ekranlar mobil uyumlu geliştirilir; ziyaret kaydı ve saha notu telefondan girilebilir.</p>
<h3>Mevcut kayıtlarımız aktarılabilir mi?</h3>
<p>Evet. İşyeri ve sözleşme listeleri elektronik tablodan aktarılabilir; aktarım öncesi doğrulama adımı planlanır.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/firmaya-ozel-erp-yazilimi">Firmaya özel ERP</a> · <a href="/tr/hizmetler/randevu-sistemli-kurumsal-site">Randevu sistemli kurumsal site</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'osgb-isletme-yonetim-sistemi';

UPDATE `services_i18n` SET
  `name` = 'Özel Yazılım Geliştirme (Next.js + Fastify)',
  `summary` = 'İş süreçlerinize özgü web uygulamalarının Next.js, Fastify ve MySQL ile uçtan uca geliştirilmesi; kaynak kodu ve altyapı sizde kalır.',
  `meta_title` = 'Özel Yazılım Geliştirme: Next.js ve Fastify | GZL Teknoloji',
  `meta_description` = 'Özel yazılım geliştirme hizmetiyle iş süreçlerinize özgü web uygulamaları kuruyoruz. Next.js, Fastify ve MySQL ile ölçeklenebilir, sahiplenilebilir mimari.',
  `meta_keywords` = 'özel yazılım geliştirme, web uygulaması geliştirme, Next.js Fastify',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Özel yazılım geliştirme, hazır ürünlerin karşılamadığı iş süreçleri için sıfırdan uygulama kurmaktır. GZL Teknoloji olarak bu işi Next.js, Fastify ve MySQL üzerine kuruyor; teslimde kaynak kodu ve altyapıyı müşteriye devrediyoruz.</p>
<h2>Özel yazılım geliştirme nedir?</h2>
<p>Bir sürecin hazır ürüne sığmadığı üç işaret vardır: ekibin araç dışında elektronik tablo tutması, aynı verinin iki sisteme elle girilmesi ve raporun her ay elle birleştirilmesi. Bu işaretler varsa özel yazılım maliyet değil tasarruf kalemidir. Geliştirmeye en pahalı sorunu çözen küçük bir sürümle başlıyoruz.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Süreç analizi ve veri modeli tasarımı</li><li>Next.js ile hızlı, SEO uyumlu ve mobil uyumlu arayüz</li><li>Fastify ile belgelenmiş API katmanı ve rol bazlı yetkilendirme</li><li>MySQL veri tabanı, göç (migration) ve yedekleme planı</li><li>Yönetim paneli, raporlama ve dışa aktarım</li><li>Sunucu kurulumu, izleme ve devreye alma</li></ul>
<p>Kod tabanı belgelenmiş ve okunabilir biçimde teslim edilir. Projeyi ileride başka bir ekip devraldığında engel çıkmaması, çalışma biçimimizin temel kuralıdır.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>İhtiyaç ve kapsam birlikte netleştirilir, öncelik sırası belirlenir.</li><li>Veri modeli ve ekran akışları onaylanır.</li><li>İlk çalışan sürüm kısa sürede canlıya alınır.</li><li>Geri bildirimle özellikler eklenir, bakım planına geçilir.</li></ol>
<p>Uzun süre görünmeyen bir geliştirme yerine erken çalışan sürüm üretmeyi tercih ediyoruz. Müşterilerimizin çoğunda ilk sürüm, kalan kapsamı da yeniden şekillendiriyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Süreci hazır yazılıma sığmayan üretim, lojistik ve hizmet firmaları</li><li>Ürün fikrini hızlıca doğrulamak isteyen girişimler</li><li>Birden fazla sistemi tek panelde birleştirmek isteyen şirketler</li><li>Mevcut yazılımı yavaşlayan veya bakımı zorlaşan işletmeler</li></ul>
<p>İhtiyaç gerçekten standartsa ve piyasada uygun bir ürün varsa bunu açıkça söylüyoruz; gereksiz özel geliştirme önermek uzun vadede iki taraf için de kayıp.</p>
<h2>Fiyat ve süre</h2>
<p>Küçük kapsamlı bir uygulama 3-5 haftada, çok modüllü sistemler 3-6 ayda teslim edilir. Fiyat kapsam ve entegrasyon sayısına göre belirlenir; güncel aralıkları paketler sayfasında bulabilirsiniz.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Neden Next.js ve Fastify?</h3>
<p>Bu ikili hem hızlı arayüz hem de sade bir sunucu katmanı sağlıyor; ekipler arasında yaygın bilindiği için ileride başka bir geliştiriciye devretmek de kolay oluyor.</p>
<h3>Proje bittikten sonra desteğiniz sürüyor mu?</h3>
<p>Evet. Bakım ve destek paketi kapsamında güncelleme, hata düzeltme ve küçük geliştirmeler yürütülüyor.</p>
<h3>Sabit fiyat mı, süre bazlı mı çalışıyorsunuz?</h3>
<p>Kapsamı net projelerde sabit fiyat veriyoruz. Kapsamın belirsiz olduğu durumlarda önce küçük bir keşif çalışması yapıp sonra sabit fiyata geçmeyi öneriyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/firmaya-ozel-erp-yazilimi">Firmaya özel ERP</a> · <a href="/tr/hizmetler/bakim-destek">Bakım ve destek</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'ozel-yazilim-nextjs-fastify';

UPDATE `services_i18n` SET
  `name` = 'Ubuntu VPS Kurulumu ve Yayına Alma',
  `summary` = 'Sunucu sertleştirme, Nginx, SSL, süreç yönetimi ve yedekleme dahil olmak üzere projenizin VPS üzerinde güvenli biçimde yayına alınması.',
  `meta_title` = 'Ubuntu VPS Kurulumu ve Yayına Alma | GZL Teknoloji',
  `meta_description` = 'Ubuntu VPS kurulumu, Nginx, SSL, güvenlik duvarı ve süreç yönetimiyle birlikte yapılır; projeniz izlenebilir ve yeniden kurulabilir biçimde yayına alınır.',
  `meta_keywords` = 'Ubuntu VPS kurulumu, sunucu kurulumu, Nginx SSL yapılandırma',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Ubuntu VPS kurulumu, bir projenin yalnızca çalışır hale gelmesi değil; güvenli, izlenebilir ve tekrar kurulabilir biçimde yayına alınmasıdır. GZL Teknoloji olarak sunucuyu teslim ederken kurulumun tüm adımlarını belgeliyoruz.</p>
<h2>Ubuntu VPS kurulumu nedir?</h2>
<p>Sunucu kurulumu çoğu zaman birkaç komutla bitmiş sayılır; sorun aylar sonra çıkar. Güncellenmemiş paketler, açık kalan portlar, süresi dolan sertifikalar ve yedeği alınmayan veritabanı en sık karşılaştığımız üç sorunun kaynağıdır. Kurulumu bu riskleri baştan kapatacak biçimde yapıyoruz.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Ubuntu kurulumu, güncelleme politikası ve kullanıcı/yetki yapılandırması</li><li>Güvenlik duvarı, SSH sertleştirme ve gereksiz servislerin kapatılması</li><li>Nginx ters vekil yapılandırması ve ücretsiz SSL sertifikası (otomatik yenileme)</li><li>Süreç yöneticisiyle uygulamanın ayakta kalması ve yeniden başlatma politikası</li><li>Veritabanı kurulumu, kullanıcı ayrımı ve otomatik yedekleme</li><li>Kaynak kullanımı izleme ve temel uyarılar</li></ul>
<p>Kurulum sonunda hangi servisin nerede çalıştığını, hangi dosyanın neyi yapılandırdığını gösteren kısa bir devir belgesi teslim ediyoruz. Sunucuyu ileride başka biri devraldığında bu belge yeterli oluyor.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Proje gereksinimleri ve beklenen yük belirlenir, sunucu boyutu seçilir.</li><li>Kurulum ve sertleştirme yapılır.</li><li>Uygulama yayına alınır, alan adı ve SSL bağlanır.</li><li>Yedekleme ve izleme devreye alınır, devir belgesi teslim edilir.</li></ol>
<p>Kurulumu tek seferlik iş olarak görmüyoruz: yedeğin gerçekten geri yüklenebildiğini test etmeden kurulumu tamamlanmış saymıyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Kendi projesini paylaşımlı hostingten kendi sunucusuna taşımak isteyen firmalar</li><li>Geliştirici ekibi olan ama sistem yönetimi tarafı eksik kalan şirketler</li><li>Birden fazla projeyi tek sunucuda barındırmak isteyen ajanslar</li><li>Yavaşlayan veya sık kesinti yaşayan mevcut sunucusunu düzelttirmek isteyenler</li></ul>
<p>Tek sayfalık statik bir site için VPS genellikle gereksizdir; bu durumda daha basit ve ucuz barındırma seçeneklerini öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Tek proje için standart kurulum 1-2 gün sürer. Çok projeli, izlemeli ve otomatik dağıtımlı kurulumlar 1-2 hafta alır. Güncel fiyat aralıkları paketler sayfasında yer alır.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Hangi sağlayıcıyı öneriyorsunuz?</h3>
<p>Kurulum sağlayıcıdan bağımsız çalışır. Bütçe, konum ve yedekleme ihtiyacınıza göre birkaç seçenek sunuyor, kararı birlikte veriyoruz.</p>
<h3>Sunucu erişimi kimde olacak?</h3>
<p>Sunucu sizin hesabınıza kurulur ve yönetici erişimi sizdedir. Bakım anlaşması yoksa teslimden sonra erişimimizi kapatıyoruz.</p>
<h3>Mevcut projemi taşıyabilir misiniz?</h3>
<p>Evet. Taşıma öncesi hazırlık ortamında deneme kurulumu yapıyor, kesinti süresini önceden planlıyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/bakim-destek">Bakım ve destek</a> · <a href="/tr/hizmetler/ozel-yazilim-nextjs-fastify">Özel yazılım geliştirme</a> · <a href="/tr/hizmetler">Tüm hizmetler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'ubuntu-vps-kurulum-yayinlama';

UPDATE `services_i18n` SET
  `name` = 'Web Sitesi Bakım ve Destek',
  `summary` = 'Canlı site ve uygulamalar için düzenli güncelleme, güvenlik yaması, yedekleme doğrulama, performans takibi ve küçük geliştirme desteği.',
  `meta_title` = 'Web Sitesi Bakım ve Destek Hizmeti | GZL Teknoloji',
  `meta_description` = 'Web sitesi bakım hizmetiyle güncellemeler, güvenlik yamaları, yedekleme, performans takibi ve küçük geliştirmeler düzenli olarak yürütülür.',
  `meta_keywords` = 'web sitesi bakım, teknik destek, site güncelleme hizmeti',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Web sitesi bakım hizmeti, yayında olan bir sistemin güncel, güvenli ve hızlı kalmasını sağlar. GZL Teknoloji olarak bakımı "sorun çıkınca bakarız" değil, düzenli kontrol ve raporlama üzerine kuruyoruz.</p>
<h2>Web sitesi bakım nedir?</h2>
<p>Yayına alınan bir site zamanla kendiliğinden bozulur: bağımlılıklar eskir, sertifikalar süresini doldurur, içerik büyüdükçe sayfalar yavaşlar ve güvenlik açıkları birikir. Bakım, bu aşınmayı düzenli aralıklarla geri alma işidir. Bir arıza çıktıktan sonra müdahale etmek, önlemekten her zaman daha pahalıdır; bakım anlaşması olan müşterilerimizde kesinti süresi belirgin biçimde düşük seyrediyor.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Haftalık erişilebilirlik ve hata kontrolü</li><li>Bağımlılık ve güvenlik güncellemelerinin uygulanması</li><li>Yedeklerin alınması ve geri yüklenebilirliğinin doğrulanması</li><li>Performans ve Core Web Vitals takibi</li><li>Küçük içerik ve arayüz düzenlemeleri</li><li>Aylık durum raporu</li></ul>
<p>Rapor, o ay ne yapıldığını ve sitede hangi metriğin nasıl değiştiğini tek sayfada gösterir. Böylece bakım görünmez bir gider olmaktan çıkar.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut sistemin envanteri çıkarılır ve riskler listelenir.</li><li>Kritik açıklar ilk hafta kapatılır.</li><li>Düzenli kontrol takvimi devreye alınır.</li><li>Aylık rapor ve iyileştirme önerileri paylaşılır.</li></ol>
<p>İlk ay genellikle en yoğun aydır: birikmiş güncellemeler ve eksik yedekler bu dönemde tamamlanır. Sonraki aylarda çalışma düzenli kontrol ve küçük geliştirmelere döner.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Kendi teknik ekibi olmayan kurumsal firmalar</li><li>Siteyi geliştiren ajansla yolları ayrılmış işletmeler</li><li>Kesintinin doğrudan satış kaybı anlamına geldiği e-ticaret siteleri</li><li>Birden fazla siteyi tek elden yönetmek isteyen gruplar</li></ul>
<p>Yılda birkaç kez güncellenen ve iş sürekliliği açısından kritik olmayan tanıtım sayfalarında talep üzerine destek modeli daha uygun oluyor.</p>
<h2>Fiyat ve süre</h2>
<p>Aylık bakım ve gelişim desteği olmak üzere iki temel paket sunuyoruz. Fiyat, sistem sayısına ve yanıt süresi taahhüdüne göre belirlenir; güncel aralıklar paketler sayfasında listelenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Siteyi siz geliştirmediyseniz de bakım yapıyor musunuz?</h3>
<p>Evet. Devralmadan önce kısa bir inceleme yapıyor, riskleri ve ilk ay yapılacakları yazılı olarak paylaşıyoruz.</p>
<h3>Acil durumda ne kadar sürede müdahale ediyorsunuz?</h3>
<p>Yanıt süresi pakete göre tanımlanır. Kesinti durumunda müdahale önceliklidir ve olay sonrası kısa bir neden raporu paylaşılır.</p>
<h3>Yedeklerimiz gerçekten çalışıyor mu?</h3>
<p>Bakım kapsamında yedekler yalnızca alınmaz, düzenli olarak geri yükleme denemesiyle doğrulanır.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/ubuntu-vps-kurulum-yayinlama">Ubuntu VPS kurulumu</a> · <a href="/tr/hizmetler/seo-hizmeti">SEO hizmeti</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'bakim-destek';

UPDATE `services_i18n` SET
  `name` = 'Teklif ve Raporlama Uygulaması',
  `summary` = 'Fiyat tekliflerini şablondan üreten, onay ve takip sürecini izleyen, sonuçları yönetim raporuna dönüştüren web uygulaması.',
  `meta_title` = 'Teklif ve Raporlama Web Uygulaması | GZL Teknoloji',
  `meta_description` = 'Teklif ve raporlama uygulaması ile fiyat teklifleri tek şablondan üretilir, onay süreci izlenir ve sonuçlar yönetim raporuna dönüşür.',
  `meta_keywords` = 'teklif ve raporlama uygulaması, teklif yönetimi, PDF teklif hazırlama',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Teklif ve raporlama uygulaması, satış ekibinin elektronik tablo ve belge şablonlarıyla yürüttüğü teklif sürecini tek bir sisteme taşır. GZL Teknoloji olarak teklif üretimini, onay akışını ve sonuç raporlamasını aynı ekranda topluyoruz.</p>
<h2>Teklif ve raporlama uygulaması nedir?</h2>
<p>Teklif süreci dağınık olduğunda üç şey kaybolur: hangi teklifin hangi sürümünün gönderildiği, kimin onayladığı ve tekliflerin ne kadarının işe döndüğü. Uygulama bu üçünü kayıt altına alır. Teklif tek şablondan üretilir, sürümlenir ve sonucu işaretlenir; böylece kazanma oranı ölçülebilir hale gelir.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Ürün/hizmet kataloğu ve fiyat listesi yönetimi</li><li>Şablondan otomatik teklif oluşturma ve PDF çıktısı</li><li>Sürüm takibi ve revizyon geçmişi</li><li>Onay akışı ve rol bazlı yetkilendirme</li><li>Müşteriye özel bağlantı ile teklif görüntüleme</li><li>Kazanma oranı ve satış temsilcisi bazlı raporlar</li></ul>
<p>PDF çıktısı kurumsal kimliğinize göre tasarlanır. Aynı içerik hem yazdırılabilir belge hem de bağlantıyla paylaşılabilir sayfa olarak üretilir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Mevcut teklif şablonları ve fiyat kuralları incelenir.</li><li>Katalog ve hesaplama mantığı kurulur.</li><li>Şablon tasarlanır, örnek tekliflerle doğrulanır.</li><li>Ekip eğitimi verilir ve canlıya geçilir.</li></ol>
<p>Hesaplama kurallarını örnek gerçek tekliflerle doğrulamadan canlıya geçmiyoruz; iskonto ve vergi kurallarındaki küçük farklar sonradan büyük tutarsızlıklara dönüşüyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Günlük çok sayıda teklif üreten satış ekipleri</li><li>Fiyatlandırması hesaplamaya dayanan üretim ve proje firmaları</li><li>Teklif onayı yöneticiye bağlı olan kurumsal yapılar</li><li>Kazanma oranını ölçmek isteyen satış yöneticileri</li></ul>
<p>Ayda birkaç teklif üreten işletmelerde mevcut belge şablonları genellikle yeterli oluyor; bu durumda sistem yatırımı önermiyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>Temel teklif üretimi ve PDF çıktısı içeren sürüm 2-3 haftada teslim edilir. Onay akışı ve raporlama içeren tam sürüm 4-8 hafta sürer. Güncel fiyat aralıkları paketler sayfasında yer alır.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Mevcut fiyat listemizi kullanabilir miyiz?</h3>
<p>Evet. Elektronik tablodaki liste aktarılabilir ve panelden güncellenebilir hale getirilir.</p>
<h3>Müşteri teklifi görüntülediğinde haberimiz oluyor mu?</h3>
<p>Evet. Paylaşılan bağlantı görüntülendiğinde kayıt tutulur; bu bilgi takip aramalarında kullanılabiliyor.</p>
<h3>Muhasebe sistemimize bağlanır mı?</h3>
<p>API’si olan sistemlere aktarım yapılabilir. API yoksa dışa aktarım dosyasıyla çalışılır.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/firmaya-ozel-erp-yazilimi">Firmaya özel ERP</a> · <a href="/tr/hizmetler/ozel-yazilim-nextjs-fastify">Özel yazılım geliştirme</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'teklif-raporlama-web-sayfasi';

UPDATE `services_i18n` SET
  `name` = 'Kurumsal Web Sitesi',
  `summary` = 'Marka anlatımı, hizmet sayfaları ve iletişim akışını kapsayan; hızlı, mobil uyumlu ve arama motorlarına hazır kurumsal web sitesi.',
  `meta_title` = 'Kurumsal Web Sitesi Tasarımı ve Kurulumu | GZL Teknoloji',
  `meta_description` = 'Kurumsal web sitesi tasarımı: hızlı, mobil uyumlu ve SEO/GEO uyumlu altyapı, yönetim paneli ve çok dilli içerik desteğiyle birlikte teslim edilir.',
  `meta_keywords` = 'kurumsal web sitesi, web sitesi tasarımı, çok dilli kurumsal site',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Kurumsal web sitesi, bir firmanın dijitaldeki en temel varlığıdır: ne yaptığınızı anlatır, güven verir ve iletişim taleplerini toplar. GZL Teknoloji olarak kurumsal siteleri hız, erişilebilirlik ve arama görünürlüğü ölçütleriyle birlikte kuruyoruz.</p>
<h2>Kurumsal web sitesi nedir?</h2>
<p>Kurumsal site bir katalog değil, satış sürecinin ilk adımıdır. Ziyaretçi üç soruya hızlıca yanıt arar: bu firma ne yapıyor, bana uygun mu ve nasıl ulaşırım. Bu üç sorunun yanıtı ilk ekranda net değilse tasarımın geri kalanı çalışmaz. Sayfa yapısını bu mantıkla kuruyor, teknik tarafı da 2026 ölçütlerine göre hazırlıyoruz.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Kurumsal kimliğinize uygun arayüz tasarımı ve mobil uyumluluk</li><li>Hakkımızda, hizmetler, referanslar, blog ve iletişim sayfaları</li><li>İçerik yönetim paneli: sayfa, blog ve görsel yönetimi</li><li>Çok dilli yapı ve dile göre adres (URL) desteği</li><li>Teknik SEO kurulumu: sitemap, canonical, JSON-LD ve meta yapılandırması</li><li>İletişim formu, harita ve dönüşüm izleme bağlantısı</li></ul>
<p>Site teslim edildiğinde içerik güncellemesini kendi ekibiniz yapabilir. Panel, teknik bilgi gerektirmeyecek biçimde sadeleştirilir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Hedef kitle, rakip incelemesi ve sayfa haritası çıkarılır.</li><li>Tasarım onaylanır.</li><li>Geliştirme ve içerik yerleştirme yapılır.</li><li>Performans ve SEO kontrolleriyle yayına alınır.</li></ol>
<p>Yayına almadan önce hız, erişilebilirlik ve arama motoru kontrollerini standart olarak çalıştırıyoruz; bu adım sonradan yapılan düzeltmelerin çoğunu ortadan kaldırıyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Sitesi eskimiş ve mobilde iyi görünmeyen kurumsal firmalar</li><li>Yeni kurulan ve ilk dijital varlığını oluşturan şirketler</li><li>İhracat yapan ve çok dilli anlatıma ihtiyaç duyan üreticiler</li><li>İçeriğini kendi güncellemek isteyen pazarlama ekipleri</li></ul>
<p>Online satış yapacaksanız kurumsal site yerine e-ticaret altyapısıyla başlamak daha doğru olur; randevu alıyorsanız randevu sistemli kurumsal site sayfamıza bakabilirsiniz.</p>
<h2>Fiyat ve süre</h2>
<p>Tek dilli standart kurumsal site 2-4 haftada, çok dilli ve özel tasarımlı projeler 4-8 haftada teslim edilir. Fiyat sayfa sayısı, dil sayısı ve tasarım kapsamına göre belirlenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>İçerikleri biz mi hazırlayacağız?</h3>
<p>Metin ve görselleri siz sağlarsanız süreç hızlanır. İçerik desteğine ihtiyaç duyduğunuzda metin yazımını ve düzenlemesini de üstleniyoruz.</p>
<h3>Mevcut sitemizin adresleri korunur mu?</h3>
<p>Evet. Adres yapısı değişiyorsa yönlendirme haritası hazırlanır; böylece arama motorlarındaki mevcut değer korunur.</p>
<h3>Site sonradan büyütülebilir mi?</h3>
<p>Evet. Altyapı modüler kurulur; e-ticaret, randevu veya üyelik gibi modüller sonradan eklenebilir.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/randevu-sistemli-kurumsal-site">Randevu sistemli kurumsal site</a> · <a href="/tr/hizmetler/seo-hizmeti">SEO hizmeti</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'kurumsal-web-sitesi';

UPDATE `services_i18n` SET
  `name` = 'Randevu Sistemli Web Sitesi (Kurumsal)',
  `summary` = 'Online randevu, takvim yönetimi, personel ataması ve otomatik hatırlatma içeren kurumsal web sitesi çözümü.',
  `meta_title` = 'Randevu Sistemli Kurumsal Web Sitesi | GZL Teknoloji',
  `meta_description` = 'Randevu sistemli web sitesi ile müşteriler uygun saati kendisi seçer; takvim, hatırlatma ve personel yönetimi tek panelde toplanır.',
  `meta_keywords` = 'randevu sistemli web sitesi, online randevu yazılımı, rezervasyon sistemi',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Randevu sistemli web sitesi, ziyaretçinin telefon etmeden uygun saati seçip rezervasyon yapabildiği bir kurumsal sitedir. GZL Teknoloji olarak takvim, personel ataması ve hatırlatma akışını sitenin içine gömerek kuruyoruz.</p>
<h2>Randevu sistemli web sitesi nedir?</h2>
<p>Randevuyla çalışan işletmelerde en büyük kayıp, cevaplanamayan telefonlar ve gelmeyen müşterilerdir. Online randevu bu iki kaybı doğrudan azaltır: talep mesai dışında da alınır, hatırlatma otomatik gider. Sistem ayrıca hangi hizmetin hangi saatte yoğunlaştığını gösterir; bu veri personel planlamasını kolaylaştırır.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Hizmet, süre ve fiyat tanımlarıyla randevu takvimi</li><li>Personel/uzman bazlı müsaitlik ve çakışma kontrolü</li><li>E-posta ve mesaj ile onay ve hatırlatma bildirimleri</li><li>İptal ve erteleme akışı, müşteri geçmişi kaydı</li><li>Çok dilli kurumsal site sayfaları ve içerik paneli</li><li>Yoğunluk ve iptal oranı raporları</li></ul>
<p>İsteğe bağlı olarak online ödeme veya kapora alma adımı eklenebilir; bu adım gelmeyen müşteri oranını gözle görülür biçimde düşürüyor.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Hizmet listesi, süreler ve çalışma saatleri tanımlanır.</li><li>Takvim kuralları ve personel ataması kurgulanır.</li><li>Site ve randevu akışı geliştirilir, deneme rezervasyonlarıyla test edilir.</li><li>Bildirim kanalları bağlanır ve canlıya geçilir.</li></ol>
<p>Çalışma saatleri, tatil günleri ve hizmet süreleri gibi kuralları canlıya geçmeden önce gerçek senaryolarla test ediyoruz; bu kurallardaki hata doğrudan çift rezervasyona yol açıyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Masaj, güzellik ve wellness merkezleri</li><li>Klinik, diş hekimi ve sağlık hizmeti sunan işletmeler</li><li>Danışmanlık ve eğitim veren profesyoneller</li><li>Servis ve bakım randevusu alan teknik firmalar</li></ul>
<p>Randevu almayan ve yalnızca tanıtım amaçlı site isteyen firmalar için standart kurumsal web sitesi paketi daha uygun oluyor.</p>
<h2>Fiyat ve süre</h2>
<p>Tek personelli temel randevu sistemi 3-4 haftada, çok personelli ve ödemeli sürüm 6-10 haftada teslim edilir. Güncel fiyat aralıkları paketler sayfasında listelenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Takvimimiz mevcut ajandayla eşleşebilir mi?</h3>
<p>Evet. Takvim uygulamalarıyla eşleme kurulabilir; böylece dışarıda alınan randevular da müsaitliğe yansır.</p>
<h3>Müşteri randevusunu kendisi iptal edebilir mi?</h3>
<p>Evet, belirlediğiniz süre sınırına kadar. İptal ve erteleme kuralları panelden yönetilir.</p>
<h3>Birden fazla şube yönetebilir miyiz?</h3>
<p>Evet. Şube bazlı takvim ve personel yönetimi kurulabilir; raporlar hem şube hem toplam düzeyinde alınır.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/kurumsal-web-sitesi">Kurumsal web sitesi</a> · <a href="/tr/hizmetler/online-siparis-sistemi">Online sipariş sistemi</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'randevu-sistemli-kurumsal-site';

UPDATE `services_i18n` SET
  `name` = 'E-Ticaret Sitesi Kurulumu',
  `summary` = 'Ürün, sipariş, ödeme ve kargo süreçlerini kapsayan; satışa hazır biçimde yayına alınan e-ticaret sitesi kurulumu.',
  `meta_title` = 'E-Ticaret Sitesi Kurulumu ve Yayına Alma | GZL Teknoloji',
  `meta_description` = 'E-ticaret sitesi kurulumu: ürün yönetimi, ödeme ve kargo entegrasyonu, güvenli altyapı ve satış raporlarıyla mağazanız yayına hazır teslim edilir.',
  `meta_keywords` = 'e-ticaret sitesi kurulumu, online mağaza kurulumu, ödeme entegrasyonu',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>E-ticaret sitesi kurulumu, ürün kataloğundan ödeme ve kargoya kadar tüm satış akışının çalışır hale getirilmesidir. GZL Teknoloji olarak mağazayı yalnızca kurmuyor, ilk siparişi alacak biçimde yayına hazırlıyoruz.</p>
<h2>E-ticaret sitesi kurulumu nedir?</h2>
<p>Bir online mağazanın açılması ürünleri yüklemekle bitmez; ödeme, kargo, iade akışı, fatura bilgisi ve sipariş bildirimleri birlikte çalışmak zorundadır. Kurulum bu zincirin tamamını kapsar. Ayrıca güvenlik ve hız, e-ticarette doğrudan dönüşüm oranına yansıyan iki teknik başlıktır.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Ürün, kategori, varyant ve stok yönetimi</li><li>Sepet, ödeme adımları ve sipariş yönetim ekranları</li><li>Sanal pos veya ödeme sağlayıcı entegrasyonu</li><li>Kargo entegrasyonu ve gönderi takibi</li><li>Kampanya, kupon ve indirim kuralları</li><li>Satış raporları ve dönüşüm izleme kurulumu</li></ul>
<p>Kurulum sonunda test siparişi uçtan uca çalıştırılır: ödeme, fatura bilgisi, kargo etiketi ve müşteri bildirimleri birlikte doğrulanır.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Ürün yapısı, ödeme ve kargo tercihleri belirlenir.</li><li>Mağaza kurulur, tasarım ve kategori yapısı oluşturulur.</li><li>Entegrasyonlar bağlanır ve test siparişleriyle doğrulanır.</li><li>Canlıya alınır, ekip eğitimi verilir.</li></ol>
<p>Ürün verisi hazır olmayan projelerde süreç uzuyor. Bu yüzden ürün, görsel ve varyant listesini erken aşamada birlikte hazırlıyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Fiziksel mağazasını online satışa taşımak isteyen işletmeler</li><li>Pazar yerlerine ek olarak kendi kanalını kurmak isteyen satıcılar</li><li>Sınırlı ürün sayısıyla hızlı başlamak isteyen markalar</li><li>Mevcut mağazası yavaş veya yönetilmesi zor olan firmalar</li></ul>
<p>Çok özel bir satış akışına, özel fiyatlandırma veya bayi yapısına ihtiyacınız varsa özel geliştirilen modern e-ticaret sitesi sayfamız daha uygun.</p>
<h2>Fiyat ve süre</h2>
<p>Standart kurulum 2-4 hafta sürer. Entegrasyon sayısı ve ürün hacmi arttıkça süre uzar. Güncel fiyat aralıklarını paketler sayfasında bulabilirsiniz.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Sanal pos başvurusunu siz mi yapıyorsunuz?</h3>
<p>Başvuru firmanız adına yapılır; biz gerekli teknik bilgileri hazırlıyor ve entegrasyonu tamamlıyoruz.</p>
<h3>Ürünleri toplu yükleyebilir miyiz?</h3>
<p>Evet. Elektronik tablo ile toplu yükleme yapılabilir; görseller de toplu olarak eşleştirilebilir.</p>
<h3>Yasal metinler dahil mi?</h3>
<p>Mesafeli satış sözleşmesi gibi metinlerin şablonları yerleştirilir; nihai içerik hukuki danışmanınızla netleştirilmelidir.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/modern-e-ticaret-sitesi">Modern e-ticaret sitesi (özel geliştirme)</a> · <a href="/tr/hizmetler/ga4-gtm-donusum-izleme">GA4 ve dönüşüm izleme</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'e-ticaret-sitesi';

UPDATE `services_i18n` SET
  `name` = 'Modern E-Ticaret Sitesi (Next.js ile Özel Geliştirme)',
  `summary` = 'Hazır altyapıların sınırlarına takılan markalar için Next.js ile geliştirilen, özel satış akışlarına ve entegrasyonlara açık e-ticaret sistemi.',
  `meta_title` = 'Modern E-Ticaret Sitesi: Next.js ile Özel | GZL Teknoloji',
  `meta_description` = 'Modern e-ticaret sitesi: Next.js ile geliştirilen hızlı ve özel mağaza altyapısı. Bayi fiyatlandırma, özel akışlar ve kurumsal entegrasyonlar mümkün.',
  `meta_keywords` = 'modern e-ticaret sitesi, Next.js e-ticaret, özel e-ticaret yazılımı',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Modern e-ticaret sitesi, hazır altyapıların şablonuna sığmayan markalar için sıfırdan geliştirilen bir mağazadır. GZL Teknoloji olarak bu sistemleri Next.js ve Fastify üzerine kurup hız ile esnekliği birlikte sağlıyoruz.</p>
<h2>Modern e-ticaret sitesi nedir?</h2>
<p>Hazır e-ticaret altyapıları hızlı başlangıç sunar; ancak bayi fiyatlandırması, özel varyant mantığı, kurumsal ERP entegrasyonu veya farklı ülkelere göre değişen akışlar gerektiğinde sınırlarına gelinir. Özel geliştirme bu noktada devreye girer: mağaza sizin satış modelinize göre kurulur, eklenti uyumluluğu diye bir kısıt kalmaz.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Next.js ile hızlı ürün ve kategori sayfaları, arama ve filtreleme</li><li>Müşteri grubuna göre fiyatlandırma ve bayi/toptan akışları</li><li>Özel varyant, paket ürün ve kampanya kurguları</li><li>Ödeme, kargo ve ERP/muhasebe entegrasyonları</li><li>Çok dilli ve çok para birimli yapı</li><li>Yönetim paneli, raporlama ve dönüşüm ölçümü</li></ul>
<p>Kaynak kodu ve veritabanı sizindir. Abonelik ya da eklenti kilidine bağlı kalmadan sistemi büyütebilir, başka bir ekiple devam edebilirsiniz.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Satış modeli, fiyat kuralları ve entegrasyon ihtiyaçları çıkarılır.</li><li>Veri modeli ve ekran akışları tasarlanır.</li><li>Çekirdek mağaza canlıya alınır.</li><li>Entegrasyonlar ve özel akışlar sırayla eklenir.</li></ol>
<p>Projeye çekirdek mağazayla başlayıp özel akışları sonra eklemek, hem satışa erken başlamayı hem de kapsamın gerçek kullanımla şekillenmesini sağlıyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Bayi ve toptan satışı olan, müşteri grubuna göre fiyat veren markalar</li><li>ERP veya üretim sistemiyle stok/fiyat senkronizasyonu gereken firmalar</li><li>Ürün yapısı standart dışı olan üreticiler</li><li>Hazır altyapıda performans ve özelleştirme sınırına ulaşmış işletmeler</li></ul>
<p>Standart ürün satan ve hızlı başlamak isteyen işletmeler için e-ticaret sitesi kurulumu paketi hem daha hızlı hem daha ekonomik oluyor.</p>
<h2>Fiyat ve süre</h2>
<p>Çekirdek mağaza 6-10 hafta, entegrasyonlu ve çok dilli projeler 3-5 ay sürer. Fiyat, özel akış ve entegrasyon sayısına göre belirlenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Hazır altyapıdan taşınabilir miyiz?</h3>
<p>Evet. Ürün, müşteri ve sipariş verisi aktarılabilir; adres yapısı için yönlendirme haritası hazırlanarak arama motorlarındaki değer korunur.</p>
<h3>Performans farkı gerçekten hissediliyor mu?</h3>
<p>Ürün sayfalarında sunucu tarafı işleme ve önbellek stratejisi sayesinde açılış süreleri belirgin biçimde iyileşiyor; bu doğrudan dönüşüme yansıyor.</p>
<h3>Bakımını kim üstleniyor?</h3>
<p>Bakım ve destek paketiyle güncellemeleri biz yürütüyoruz; kendi ekibiniz devralmak isterse teslim belgeleriyle destekliyoruz.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/e-ticaret-sitesi">E-ticaret sitesi kurulumu</a> · <a href="/tr/hizmetler/ozel-yazilim-nextjs-fastify">Özel yazılım geliştirme</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'modern-e-ticaret-sitesi';

UPDATE `services_i18n` SET
  `name` = 'Online Sipariş Sistemi',
  `summary` = 'QR menü, sepet, teslimat ve paket servis akışı ile mutfak ekranını kapsayan, komisyonsuz kendi kanalınızdan sipariş alma sistemi.',
  `meta_title` = 'Online Sipariş Sistemi ve QR Menü | GZL Teknoloji',
  `meta_description` = 'Online sipariş sistemi ile restoran ve işletmeler kendi kanalından sipariş alır: QR menü, sepet, kurye/paket servis ve mutfak ekranı bir arada.',
  `meta_keywords` = 'online sipariş sistemi, QR menü, restoran sipariş yazılımı',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Online sipariş sistemi, işletmenin siparişi platform komisyonu ödemeden kendi kanalından almasını sağlar. GZL Teknoloji olarak QR menüden mutfak ekranına kadar tüm akışı tek sistemde kuruyoruz.</p>
<h2>Online sipariş sistemi nedir?</h2>
<p>Pazar yeri uygulamaları hızlı hacim getirir ama her siparişten komisyon alır ve müşteri verisi işletmede kalmaz. Kendi sipariş sisteminiz bu iki dezavantajı ortadan kaldırır: sadık müşteriyi kendi kanalınıza taşırsınız, sipariş geçmişi ve iletişim izni sizde kalır.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>Çok dilli QR menü; ürün, varyant ve ekstra seçenekleri</li><li>Sepet, kupon ve minimum tutar kuralları</li><li>Teslimat ve paket servis akışı, bölge/ücret tanımları</li><li>Mutfak ve kurye ekranları, sipariş durum takibi</li><li>Online ödeme veya kapıda ödeme seçenekleri</li><li>Satış ve ürün performans raporları</li></ul>
<p>Menü güncellemesi panelden yapılır; fiyat değişikliği QR kodları yeniden basmayı gerektirmez.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Menü, teslimat bölgeleri ve ödeme tercihleri belirlenir.</li><li>Sistem kurulur, menü ve görseller yüklenir.</li><li>Deneme siparişleriyle mutfak ve kurye akışı test edilir.</li><li>Canlıya alınır, personel eğitimi verilir.</li></ol>
<p>Yoğun saatte sistemin nasıl davrandığını canlıya geçmeden denemek önemli; deneme siparişlerini gerçek servis akışıyla birlikte yürütüyoruz.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Restoran, kafe ve dönerci gibi hızlı servis işletmeleri</li><li>Paket servis hacmi yüksek olan zincirler</li><li>Komisyon maliyetini düşürmek isteyen işletmeler</li><li>Masa başı QR menüye geçmek isteyen mekânlar</li></ul>
<p>Yalnızca masa servisi yapan ve paket satışı bulunmayan işletmelerde QR menü tek başına yeterli olabiliyor; bu durumda daha küçük bir kurulum öneriyoruz.</p>
<h2>Fiyat ve süre</h2>
<p>QR menü ve temel sipariş akışı 2-3 haftada, kurye ve mutfak ekranı dahil tam sistem 4-8 haftada teslim edilir. Güncel fiyat aralıkları paketler sayfasında yer alır.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Yazar kasa veya adisyon sistemimize bağlanır mı?</h3>
<p>API’si olan sistemlerle entegrasyon kurulabilir. Entegrasyon yoksa sipariş, mutfak ekranı üzerinden yönetilir.</p>
<h3>Müşteriler uygulama indirmek zorunda mı?</h3>
<p>Hayır. Sistem tarayıcı üzerinden çalışır; QR kod okutmak yeterlidir.</p>
<h3>Birden fazla şube yönetebilir miyiz?</h3>
<p>Evet. Şube bazlı menü, fiyat ve teslimat bölgesi tanımlanabilir; raporlar şube kırılımıyla alınır.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/randevu-sistemli-kurumsal-site">Randevu sistemli kurumsal site</a> · <a href="/tr/hizmetler/e-ticaret-sitesi">E-ticaret sitesi kurulumu</a> · <a href="/tr/portfolyo">Referans projeler</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'online-siparis-sistemi';

UPDATE `services_i18n` SET
  `name` = 'Emlak İlan Sitesi',
  `summary` = 'Harita destekli arama, gelişmiş filtreleme, danışman ve portföy yönetimi ile talep toplama akışını kapsayan emlak ilan sitesi.',
  `meta_title` = 'Emlak İlan Sitesi ve Portföy Yönetimi | GZL Teknoloji',
  `meta_description` = 'Emlak ilan sitesi ile portföyünüzü kendi kanalınızda yayınlayın: harita, gelişmiş filtreleme, danışman yönetimi ve talep toplama bir arada.',
  `meta_keywords` = 'emlak ilan sitesi, gayrimenkul portföy yönetimi, emlak web sitesi',
  `content` = JSON_SET(
    CASE WHEN JSON_VALID(`content`) THEN `content` ELSE JSON_OBJECT() END,
    '$.html', '<p>Emlak ilan sitesi, portföyünüzü ilan platformlarına bağımlı kalmadan kendi kanalınızda yayınlamanızı sağlar. GZL Teknoloji olarak harita destekli arama, danışman yönetimi ve talep toplama akışını tek sistemde kuruyoruz.</p>
<h2>Emlak ilan sitesi nedir?</h2>
<p>İlan platformları görünürlük sağlar ama müşteri ilişkisi orada kalır ve her ilan için ücret ödenir. Kendi ilan siteniz portföyü kalıcı bir varlığa dönüştürür: arama motorlarından gelen talep doğrudan size ulaşır, danışman performansı ölçülebilir ve marka kendi adına birikim yapar.</p>
<h2>Neler teslim ediyoruz?</h2>
<ul><li>İlan yönetimi: konut, iş yeri, arsa ve proje tipleri</li><li>Harita üzerinde arama ve konum bazlı filtreleme</li><li>Oda sayısı, metrekare, fiyat aralığı gibi gelişmiş filtreler</li><li>Danışman profilleri ve ilan atama</li><li>Talep formu, favoriler ve ilan karşılaştırma</li><li>İlan performans raporları ve SEO uyumlu ilan sayfaları</li></ul>
<p>Her ilan, arama motorlarında ayrı bir sayfa olarak konumlanacak biçimde yapılandırılır; yapılandırılmış veri ile ilan bilgileri makine tarafından da okunabilir hale gelir.</p>
<h2>Nasıl çalışıyoruz?</h2>
<ol><li>Portföy yapısı ve ilan alanları belirlenir.</li><li>Site ve yönetim paneli geliştirilir.</li><li>Mevcut ilanlar aktarılır, harita ve filtreler test edilir.</li><li>Canlıya alınır, danışman eğitimi verilir.</li></ol>
<p>İlan alanlarının başta doğru tanımlanması kritik: filtreleme mantığı bu alanlar üzerine kuruluyor ve sonradan değiştirmek mevcut ilanların güncellenmesini gerektiriyor.</p>
<h2>Kimler için uygun?</h2>
<ul><li>Kendi portföyünü yöneten emlak ofisleri</li><li>Proje satışı yapan müteahhit ve geliştiriciler</li><li>Birden fazla danışmanla çalışan ofis ağları</li><li>Kiralama odaklı portföy yöneten firmalar</li></ul>
<p>Az sayıda ilanla çalışan bireysel danışmanlar için kurumsal web sitesi üzerine eklenen basit bir portföy bölümü genellikle yeterli oluyor.</p>
<h2>Fiyat ve süre</h2>
<p>Temel ilan sitesi 3-5 haftada, danışman yönetimi ve harita filtreleri dahil tam sürüm 6-10 haftada teslim edilir. Güncel fiyat aralıkları paketler sayfasında listelenir.</p>
<h2>Sıkça Sorulan Sorular</h2>
<h3>Mevcut ilanlarımızı aktarabilir miyiz?</h3>
<p>Evet. Elektronik tablo veya mevcut sistemden aktarım yapılabilir; görsel eşleştirmesi de toplu yürütülür.</p>
<h3>İlanlar otomatik güncellenebilir mi?</h3>
<p>Kaynak sisteminizde API varsa düzenli eşitleme kurulabilir. Aksi durumda ilanlar panelden yönetilir.</p>
<h3>Danışman performansını görebilir miyiz?</h3>
<p>Evet. İlan görüntülenme, talep sayısı ve dönüş oranları danışman bazında raporlanır.</p>
<p>İlgili sayfalar: <a href="/tr/hizmetler/kurumsal-web-sitesi">Kurumsal web sitesi</a> · <a href="/tr/hizmetler/seo-hizmeti">SEO hizmeti</a> · <a href="/tr/paketler">Paketler ve fiyatlar</a> · <a href="/tr/iletisim">İletişim</a></p>'
  ),
  `updated_at` = CURRENT_TIMESTAMP(3)
WHERE `locale` = 'tr' AND `slug` = 'emlak-ilan-sitesi';
