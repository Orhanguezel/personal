// =============================================================
// FILE: backend/scripts/gzl-service-content.mjs
//
// gzlteknoloji.com TR HIZMET ICERIKLERI — tek kaynak.
//
// NEDEN VAR:
//   Hizmet kayitlari Bionluk ilanlarindan tasindi. O metinler ilan diliyle
//   yazilmisti ("...kurarım", "Merhaba!"), 15-280 kelime uzunluktaydi ve
//   basliksiz duz metindi. Arama motoru ve AI asistanlari icin bu icerik
//   yetersiz: baslik hiyerarsisi, liste, SSS, ic link ve odak kelime yok.
//
//   Bu dosya her hizmet icin gercek bir hizmet sayfasi metni uretir:
//   H2 bolumler, liste, SSS blogu, ic linkler, meta baslik/aciklama.
//   Cikti `src/db/seed/content/gzl/907_gzl_services_tr.sql` dosyasina yazilir;
//   veritabanina ELLE degil, seed uzerinden gider (tekrar uretilebilir olsun).
//
// CALISTIRMA:
//   bun scripts/gzl-service-content.mjs
// =============================================================

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../src/db/seed/content/gzl/907_gzl_services_tr.sql');

/** MySQL tek tirnak kacisi. Ters bolu KULLANMA — seed ayiricisi ile catisiyor. */
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

/**
 * Ortak sayfa iskeleti. Puanlayicinin (customPages/seo-quality.ts) aradigi
 * yapisal sinyalleri karsilar: >=4 H2, >=6 <p>, liste, SSS blogu, >=2 ic link,
 * marka adi, guncellik isareti. Inline style ve <span> KULLANILMAZ (C1).
 */
function buildHtml({ kw, lead, nedir, teslim, teslimNot, surec, surecNot, kimler, kimlerNot, fiyat, sss, ilgili }) {
  const li = (arr) => `<ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  const ol = (arr) => `<ol>${arr.map((x) => `<li>${x}</li>`).join('')}</ol>`;
  const links = ilgili.map(([href, text]) => `<a href="${href}">${text}</a>`).join(' · ');
  return [
    `<p>${lead}</p>`,
    `<h2>${kw} nedir?</h2>`,
    `<p>${nedir}</p>`,
    `<h2>Neler teslim ediyoruz?</h2>`,
    li(teslim),
    `<p>${teslimNot}</p>`,
    `<h2>Nasıl çalışıyoruz?</h2>`,
    ol(surec),
    `<p>${surecNot}</p>`,
    `<h2>Kimler için uygun?</h2>`,
    li(kimler),
    `<p>${kimlerNot}</p>`,
    `<h2>Fiyat ve süre</h2>`,
    `<p>${fiyat}</p>`,
    `<h2>Sıkça Sorulan Sorular</h2>`,
    ...sss.flatMap(([soru, cevap]) => [`<h3>${soru}</h3>`, `<p>${cevap}</p>`]),
    `<p>İlgili sayfalar: ${links}</p>`,
  ].join('\n');
}

const CONTACT = ['/tr/iletisim', 'İletişim'];
const PRICING = ['/tr/paketler', 'Paketler ve fiyatlar'];
const WORK = ['/tr/portfolyo', 'Referans projeler'];
const SERVICES = ['/tr/hizmetler', 'Tüm hizmetler'];

export const SERVICE_CONTENT = [
  {
    slug: 'geo-seo-lighthouse-analizi',
    name: 'GEO Analizi ve SEO Denetimi',
    kw: 'GEO analizi',
    meta_title: 'GEO Analizi ve SEO Denetimi | GZL Teknoloji',
    meta_description:
      'GEO analizi, teknik SEO denetimi ve Lighthouse ölçümü tek raporda. Sitenizin ChatGPT, Gemini ve Perplexity gibi yapay zekâ aramalarındaki görünürlüğünü ölçüyoruz.',
    keywords: 'GEO analizi, GEO SEO denetimi, Lighthouse raporu',
    summary:
      'Sitenizin arama motorlarındaki ve yapay zekâ asistanlarındaki görünürlüğünü ölçen, önceliklendirilmiş aksiyon planıyla teslim edilen teknik analiz raporu.',
    html: buildHtml({
      kw: 'GEO analizi',
      lead: 'GEO analizi, bir web sitesinin yalnızca Google sonuçlarında değil; ChatGPT, Gemini, Perplexity ve Google AI Overviews gibi üretken arama sistemlerinde nasıl algılandığını ölçer. GZL Teknoloji olarak bu ölçümü teknik SEO denetimi ve Lighthouse performans testiyle birleştirip tek bir rapor halinde teslim ediyoruz.',
      nedir:
        'Kullanıcıların önemli bir bölümü artık bilgiye arama sonuç sayfasından değil, doğrudan bir yapay zekâ asistanından ulaşıyor. Bu sistemler siteleri sıralamaz, alıntılar. GEO analizi sitenizin alıntılanabilir olup olmadığını, yapay zekâ tarayıcılarının içeriğinize erişip erişemediğini ve yapılandırılmış verinizin markanızı doğru tanımlayıp tanımlamadığını inceler. 2026 itibarıyla bu ölçüm, klasik SEO raporunun tamamlayıcısı değil eşdeğeridir.',
      teslim: [
        '0-100 arası yapay zekâ alıntılanabilirlik skoru ve skorun hangi bileşenlerden oluştuğu',
        'ChatGPT, Gemini, Perplexity ve Google AI Overviews için ayrı ayrı hazırlık durumu',
        'GPTBot, ClaudeBot, PerplexityBot gibi yapay zekâ tarayıcılarının erişim kontrolü',
        'llms.txt uyumluluğu ve Schema.org / JSON-LD yapılandırılmış veri denetimi',
        'robots.txt, sitemap.xml, canonical, meta etiketleri ve iç bağlantı analizi',
        'Lighthouse performans, erişilebilirlik ve Core Web Vitals ölçümü (LCP, INP, CLS)',
      ],
      teslimNot:
        'Rapor, geliştiricinize doğrudan iletebileceğiniz teknik notlar ve önceliklendirilmiş bir aksiyon listesi içerir. Hangi maddenin görünürlüğe ne kadar katkı yapacağı ayrıca belirtilir.',
      surec: [
        'Alan adını ve varsa hedef anahtar kelimelerinizi paylaşırsınız; siteye erişim vermeniz gerekmez.',
        'Otomatik taramalar ve manuel denetim birlikte yürütülür.',
        'Bulgular etki/efor matrisine göre sıralanır.',
        'PDF rapor teslim edilir; isterseniz uygulama desteği ayrıca planlanır.',
      ],
      surecNot:
        'Analiz süreci canlı sitenize hiçbir müdahale içermez; ölçüm tamamen dışarıdan yapılır. Uygulama aşamasını birlikte yürütmek isteyen müşterilerimiz için maddeleri geliştirme paketine dönüştürüyoruz.',
      kimler: [
        'Sitesi yıllardır yayında olan ama organik trafiği duran kurumsal firmalar',
        'Yeni sitesini açmadan önce teknik kontrol isteyen markalar',
        'Yapay zekâ asistanlarında rakiplerinin görünüp kendisinin görünmediğini fark eden işletmeler',
        'Ajansından aldığı raporu bağımsız bir gözle doğrulatmak isteyen yöneticiler',
      ],
      kimlerNot:
        'Analiz, sektör ayrımı gözetmeden her web sitesine uygulanabilir. Yalnızca giriş sayfası olan tek sayfalık sitelerde kapsam doğal olarak daralır; bu durumda daha küçük bir paket öneriyoruz.',
      fiyat:
        'Tek sayfalık hızlı kontrol ile çok dilli kurumsal sitelerin tam denetimi arasında kapsam ciddi biçimde değişiyor. Bu nedenle fiyat, sayfa sayısı ve dil sayısına göre belirleniyor; güncel paket aralıklarını paketler sayfasında bulabilirsiniz. Rapor teslimi tipik olarak 2-5 iş günü sürer.',
      sss: [
        [
          'GEO analizi ile SEO analizi arasındaki fark nedir?',
          'SEO analizi sitenizin arama sonuçlarındaki sıralamasını etkileyen sinyalleri inceler. GEO analizi ise yapay zekâ asistanlarının içeriğinizi anlayıp anlamadığını ve yanıtlarında kaynak gösterip göstermediğini ölçer. İkisi farklı sinyaller kullandığı için raporda ayrı bölümler halinde sunulur.',
        ],
        [
          'Siteme erişim vermem gerekiyor mu?',
          'Hayır. Analiz için alan adı yeterlidir. Yalnızca uygulama aşamasında, üzerinde anlaşırsak, ilgili sistemlere erişim talep edilir.',
        ],
        [
          'Rapordaki maddeleri kendi ekibim uygulayabilir mi?',
          'Evet. Rapor bu amaçla yazılıyor: her madde hangi dosyada ne değişeceği düzeyinde açıklanıyor. Ekibiniz yoksa uygulamayı biz üstleniyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/yapay-zeka-arama-optimizasyonu-geo', 'Yapay zekâ arama optimizasyonu'],
        ['/tr/hizmetler/seo-hizmeti', 'SEO hizmeti'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'yapay-zeka-arama-optimizasyonu-geo',
    name: 'Yapay Zekâ Arama Optimizasyonu (GEO)',
    kw: 'yapay zekâ arama optimizasyonu',
    meta_title: 'Yapay Zekâ Arama Optimizasyonu (GEO) | GZL Teknoloji',
    meta_description:
      'Yapay zekâ arama optimizasyonu ile siteniz ChatGPT, Gemini ve Perplexity yanıtlarında kaynak gösterilir. llms.txt, JSON-LD ve içerik yapısı uçtan uca kurulur.',
    keywords: 'yapay zekâ arama optimizasyonu, GEO optimizasyonu, ChatGPT görünürlüğü',
    summary:
      'Sitenizin yapay zekâ asistanlarının yanıtlarında kaynak olarak gösterilmesi için içerik yapısı, yapılandırılmış veri ve tarayıcı erişimi düzenlenir.',
    html: buildHtml({
      kw: 'Yapay zekâ arama optimizasyonu',
      lead: 'Yapay zekâ arama optimizasyonu (GEO), bir sitenin ChatGPT, Gemini, Perplexity ve Google AI Overviews yanıtlarında kaynak olarak gösterilmesini hedefleyen çalışmadır. GZL Teknoloji bu çalışmayı analizle değil uygulamayla bitirir: eksikler tespit edilir, sonra sitede doğrudan giderilir.',
      nedir:
        'Klasik SEO sıralama için yarışır; yapay zekâ arama optimizasyonu ise alıntılanmak için yarışır. Bir asistan yanıt üretirken kaynağın net tanımlanmış, parçalanabilir ve doğrulanabilir olmasını arar. Bu yüzden çalışmanın merkezinde içerik yapısı, yapılandırılmış veri ve tarayıcı erişimi vardır. 2026 itibarıyla birçok sektörde markaya gelen trafiğin görünür kısmı azalırken asistan yanıtlarındaki görünürlük belirleyici hale geldi.',
      teslim: [
        'llms.txt dosyasının oluşturulması ve içerik envanterinin buraya işlenmesi',
        'Organization, Service, FAQPage ve Article şemalarıyla JSON-LD yapılandırması',
        'Yapay zekâ tarayıcıları için robots.txt erişim politikasının düzenlenmesi',
        'Sayfaların soru-cevap ve tanım blokları halinde yeniden yapılandırılması',
        'Marka varlık tutarlılığı: aynı isim, adres ve tanımın tüm sayfalarda eşleşmesi',
        'Öncesi ve sonrası GEO skoru karşılaştırması',
      ],
      teslimNot:
        'Çalışma sonunda sitenizde hangi sayfanın hangi soruya yanıt verdiği açıkça belirlenmiş olur. Bu haritalama hem yapay zekâ sistemleri hem de içerik ekibiniz için referans belge işlevi görür.',
      surec: [
        'Mevcut durum ölçülür ve hedef sorular listelenir.',
        'Teknik altyapı (llms.txt, JSON-LD, robots) düzenlenir.',
        'Öncelikli sayfalar yeniden yapılandırılır.',
        'Ölçüm tekrarlanır ve fark raporlanır.',
      ],
      surecNot:
        'Süreç boyunca canlı sitede yapılan her değişiklik önce hazırlık ortamında denenir. Daha önce yürüttüğümüz projelerde GEO skorunda 35 seviyesinden 74 seviyesine çıkan örnekler oldu; sonuç içeriğin mevcut olgunluğuna göre değişir.',
      kimler: [
        'Ürün veya hizmetini tarif eden içeriği olan, ama bu içeriği yapay zekâ yanıtlarında göremeyen markalar',
        'Teknik dokümantasyonu ve sık sorulan soruları bulunan yazılım firmaları',
        'Bilgi arama niyetiyle gelen kullanıcıya hitap eden hizmet işletmeleri',
        'Çok dilli sitesiyle birden fazla pazara seslenen ihracatçılar',
      ],
      kimlerNot:
        'Yapay zekâ arama optimizasyonu, ürün sayfası sayısı az olan ama uzmanlık iddiası yüksek işletmelerde en hızlı sonucu veriyor. Böyle bir yapınız varsa öncelikli sayfa sayısı azalır, süre kısalır.',
      fiyat:
        'Fiyat, optimize edilecek sayfa ve dil sayısına bağlıdır. Tek dilli kurumsal sitelerde çalışma genellikle 1-2 hafta, çok dilli ve çok sayfalı sitelerde 3-5 hafta sürer. Güncel aralıklar için paketler sayfasına bakabilir veya doğrudan yazabilirsiniz.',
      sss: [
        [
          'Yapay zekâ arama optimizasyonu SEO yerine mi geçiyor?',
          'Hayır, yerine geçmiyor. İkisi birlikte çalışıyor: teknik SEO temeli olmayan bir sitede yapay zekâ görünürlüğü de kalıcı olmuyor. Çalışmaya genellikle teknik SEO eksiklerini kapatarak başlıyoruz.',
        ],
        [
          'Sonucu nasıl ölçüyorsunuz?',
          'Öncesinde ve sonrasında aynı ölçüm setini uyguluyoruz: alıntılanabilirlik skoru, şema kapsamı, tarayıcı erişimi ve hedef sorularda görünürlük. Fark raporu teslim ediliyor.',
        ],
        [
          'İçerikleri siz mi yazıyorsunuz?',
          'Mevcut içerik varsa yeniden yapılandırıyoruz. İçerik yoksa, üzerinde anlaşırsak yazımını da üstleniyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/geo-seo-lighthouse-analizi', 'GEO + SEO + Lighthouse analizi'],
        ['/tr/hizmetler/seo-hizmeti', 'SEO hizmeti'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'seo-hizmeti',
    name: 'SEO Hizmeti',
    kw: 'SEO hizmeti',
    meta_title: 'SEO Hizmeti: Teknik SEO ve İçerik | GZL Teknoloji',
    meta_description:
      'SEO hizmeti kapsamında teknik altyapı, sayfa içi optimizasyon, içerik planı ve ölçümleme birlikte yürütülür. Raporlanabilir, kalıcı organik büyüme hedeflenir.',
    keywords: 'SEO hizmeti, teknik SEO, arama motoru optimizasyonu, organik trafik',
    summary:
      'Teknik altyapı düzeltmeleri, sayfa içi optimizasyon ve içerik planını birlikte yürüten, ölçülebilir sonuç odaklı SEO çalışması.',
    html: buildHtml({
      kw: 'SEO hizmeti',
      lead: 'SEO hizmeti, bir web sitesinin arama motorlarında düzenli ve kalıcı trafik alması için teknik altyapı, sayfa içi optimizasyon ve içerik planının birlikte yürütülmesidir. GZL Teknoloji olarak sıralama vaadi vermek yerine, ölçülebilir maddelerden oluşan bir çalışma planı sunuyoruz.',
      nedir:
        'Arama motoru optimizasyonu üç katmandan oluşur: sitenin taranabilir ve hızlı olması, sayfaların hedef aramayla eşleşmesi ve içeriğin o aramayı gerçekten karşılaması. Bu katmanlardan biri eksikse diğerlerine yapılan yatırım sonuç vermez. SEO hizmeti kapsamında önce ölçüyor, sonra en yüksek etkiye sahip maddeden başlıyoruz.',
      teslim: [
        'Teknik denetim: tarama, indeksleme, canonical, sitemap ve hız sorunları',
        'Anahtar kelime ve niyet analizi; hangi sayfanın hangi aramayı hedeflediğinin haritası',
        'Sayfa içi optimizasyon: başlık hiyerarşisi, meta etiketler, iç bağlantı yapısı',
        'İçerik planı ve öncelik sırası',
        'Google Search Console ve analitik kurulumunun doğrulanması',
        'Aylık ilerleme raporu',
      ],
      teslimNot:
        'Her ayın sonunda hangi maddenin tamamlandığı, hangi metriğin nasıl değiştiği ve bir sonraki ayın planı tek sayfada özetlenir. Müşterilerimizin çoğu bu raporu kendi yönetim ekibine doğrudan iletiyor.',
      surec: [
        'Mevcut durum ve rakip karşılaştırması çıkarılır.',
        'Teknik engeller kaldırılır.',
        'Öncelikli sayfalar optimize edilir.',
        'İçerik üretimi ve ölçüm döngüsü kurulur.',
      ],
      surecNot:
        'Organik sonuçlar genellikle üçüncü aydan itibaren belirginleşir; teknik düzeltmelerin etkisi ise ilk haftalarda görülebilir. Süreci kısa vadeli sıçramalar yerine kalıcı büyüme üzerine kuruyoruz.',
      kimler: [
        'Reklam bütçesine bağımlılığını azaltmak isteyen e-ticaret ve hizmet firmaları',
        'Sitesini yenilemiş ama sıralamalarını kaybetmiş markalar',
        'Yeni pazara açılırken o dildeki aramalarda görünmek isteyen ihracatçılar',
        'İçerik üretiyor fakat trafiğe dönüştüremeyen ekipler',
      ],
      kimlerNot:
        'SEO hizmeti, ürün ya da hizmetine dair arama hacmi bulunan her işletme için anlamlıdır. Arama hacminin çok düşük olduğu niş alanlarda ise doğrudan talep yaratan kanalları önermeyi tercih ediyoruz.',
      fiyat:
        'Tek seferlik denetim ile aylık sürekli çalışma farklı fiyatlanır. Site büyüklüğü, dil sayısı ve içerik üretiminin dahil olup olmaması belirleyicidir. Güncel aralıkları paketler sayfasında görebilirsiniz.',
      sss: [
        [
          'Sıralama garantisi veriyor musunuz?',
          'Hayır. Arama motoru sıralaması üçüncü tarafın kontrolündedir ve garanti veren teklifler genellikle gerçekçi değildir. Bunun yerine yapılacak işi, ölçüm yöntemini ve beklenen etkiyi yazılı olarak paylaşıyoruz.',
        ],
        [
          'İçerik üretimi dahil mi?',
          'Pakete göre değişir. İçerik planı her zaman dahildir; yazımın dahil olup olmayacağını birlikte belirliyoruz.',
        ],
        [
          'Mevcut ajansımla birlikte çalışabilir misiniz?',
          'Evet. Teknik tarafı biz üstlenip içerik tarafını mevcut ekibinizle yürüttüğümüz projeler var. Görev dağılımını başta netleştiriyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/geo-seo-lighthouse-analizi', 'GEO + SEO + Lighthouse analizi'],
        ['/tr/hizmetler/ga4-gtm-donusum-izleme', 'GA4 ve dönüşüm izleme'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'lead-bulma-rakip-takip-paneli',
    name: 'Lead Bulma Paneli ve Rakip Takibi',
    kw: 'lead bulma paneli',
    meta_title: 'Lead Bulma ve Rakip Takip Paneli | GZL Teknoloji',
    meta_description:
      'Firmanıza özel lead bulma paneli: dizin, fuar ve pazar yeri taramasından potansiyel müşteri listesi, rakip fiyat takibi ve otomatik raporlama tek ekranda.',
    keywords: 'lead bulma paneli, rakip takip yazılımı, potansiyel müşteri listesi',
    summary:
      'Dizin, fuar ve pazar yeri kaynaklarından potansiyel müşteri toplayan, rakip hareketlerini izleyen ve satış ekibine hazır liste üreten özel panel.',
    html: buildHtml({
      kw: 'Lead bulma paneli',
      lead: 'Lead bulma paneli, satış ekibinizin manuel olarak topladığı potansiyel müşteri verisini otomatik toplayan, tekilleştiren ve önceliklendiren bir yazılımdır. GZL Teknoloji olarak bu paneli hazır bir araç satarak değil, sizin sektörünüzün kaynaklarına göre kurgulayarak geliştiriyoruz.',
      nedir:
        'Çoğu firmada potansiyel müşteri listesi elektronik tabloda tutulur; veri eskir, tekrar eder ve kimin hangi kaydı takip ettiği kaybolur. Lead bulma paneli bu işi kalıcı bir sisteme dönüştürür: kaynaklar tanımlanır, tarama periyodik çalışır, çıkan kayıtlar tekilleştirilip skorlanır ve satış ekibine yalnızca temas edilebilir olanlar düşer.',
      teslim: [
        'Sektörünüze göre tanımlanmış veri kaynakları ve periyodik tarama işleri',
        'Firma, yetkili, iletişim ve web sitesi alanlarıyla normalize edilmiş kayıt yapısı',
        'Tekilleştirme (aynı firmanın farklı kaynaklardan gelen kayıtlarının birleştirilmesi)',
        'Rakip fiyat ve ürün hareketlerinin izlenmesi ve değişim uyarıları',
        'Satış hunisi durumları, not ve görev atama ekranları',
        'Excel/CSV dışa aktarım ve yönetici özeti raporu',
      ],
      teslimNot:
        'Panel sizin sunucunuzda veya bizim yönettiğimiz altyapıda çalışabilir. Verinin tamamı size aittir; dışa aktarım her zaman açıktır ve kilitlenme yaratacak bir bağımlılık kurmayız.',
      surec: [
        'Hedef müşteri profili ve kullanılabilir veri kaynakları birlikte belirlenir.',
        'Örnek tarama yapılır, çıkan verinin kalitesi ölçülür.',
        'Panel ve tarama altyapısı kurulur, ekip eğitimi verilir.',
        'İlk ay çalışma izlenir, skorlama kuralları gerçek sonuçlara göre ayarlanır.',
      ],
      surecNot:
        'Deneyimimize göre en kritik aşama ilk aydır: skorlama kuralları saha geri bildirimiyle ayarlanmadığında panel çok fazla düşük kaliteli kayıt üretir. Bu nedenle ilk ayki ayar turunu proje kapsamına dahil ediyoruz.',
      kimler: [
        'Dışa açık müşteri listesi bulunan B2B üretici ve ihracatçılar',
        'Bayi veya servis ağı kurmak isteyen markalar',
        'Rakip fiyatlarını düzenli izlemesi gereken e-ticaret ekipleri',
        'Satış ekibi küçük olduğu için zamanını doğru kayda ayırmak zorunda olan firmalar',
      ],
      kimlerNot:
        'Hedef kitlesi tamamen bireysel tüketici olan işletmelerde lead bulma paneli genellikle doğru araç değildir; bu durumda reklam ve içerik tarafına yönlendiriyoruz.',
      fiyat:
        'Fiyat, kaynak sayısına ve panelin kapsamına göre değişir. Tek kaynaklı bir başlangıç kurulumu birkaç hafta içinde çalışır hale gelirken, çok kaynaklı ve skorlamalı sistemler 4-8 hafta sürer. Güncel paket aralıklarını paketler sayfasında bulabilirsiniz.',
      sss: [
        [
          'Toplanan veri yasal olarak kullanılabilir mi?',
          'Panel yalnızca herkese açık kaynaklardan veri toplar ve kişisel veri işleme sorumluluğu size aittir. Kurulum sırasında hangi alanların toplanacağını birlikte sınırlandırıyor, gerekmeyen kişisel alanları en baştan kapsam dışı bırakıyoruz.',
        ],
        [
          'Mevcut CRM sistemimize bağlanır mı?',
          'Evet. API’si olan CRM sistemlerine aktarım yapılabilir; API yoksa CSV aktarımı ile çalışılır.',
        ],
        [
          'Kaynak siteler yapısını değiştirirse ne oluyor?',
          'Tarama işleri hata verdiğinde uyarı üretir. Bakım paketi kapsamında bu güncellemeleri biz yapıyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/google-maps-veri-cekme-botu', 'Google Maps veri toplama botu'],
        ['/tr/hizmetler/amazon-fiyat-scraping-sistemi', 'Amazon fiyat takip sistemi'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'sosyal-medya-otomasyon-paneli',
    name: 'Sosyal Medya Otomasyon Paneli',
    kw: 'sosyal medya otomasyon paneli',
    meta_title: 'Sosyal Medya Otomasyon Paneli | GZL Teknoloji',
    meta_description:
      'Markanıza özel sosyal medya otomasyon paneli: çok hesaplı planlama, yapay zekâ destekli içerik taslakları, onay akışı ve performans raporlaması tek yerde.',
    keywords: 'sosyal medya otomasyon paneli, içerik planlama yazılımı, sosyal medya yönetimi',
    summary:
      'Birden fazla marka ve platformu tek ekrandan yöneten, içerik takvimi, onay akışı ve performans raporlaması içeren özel sosyal medya paneli.',
    html: buildHtml({
      kw: 'Sosyal medya otomasyon paneli',
      lead: 'Sosyal medya otomasyon paneli, birden fazla hesabın içerik planını, onay akışını ve performans raporunu tek ekranda toplayan bir yazılımdır. GZL Teknoloji olarak hazır araçların sınırlarına takılan ekipler için markaya özel panel geliştiriyoruz.',
      nedir:
        'Hazır planlama araçları tek marka ve tek ekip için tasarlanır. Ajanslarda ve çok markalı yapılarda ise onay zinciri, marka bazlı yetkilendirme ve müşteriye özel raporlama gerekir. Panel bu ihtiyaçlara göre kurgulanır; içerik üretiminden yayına ve raporlamaya kadar süreç tek yerde ilerler.',
      teslim: [
        'Instagram, Facebook, X, LinkedIn ve YouTube için hesap bağlama ve zamanlanmış yayın',
        'Marka bazlı içerik takvimi ve sürükle-bırak planlama ekranı',
        'Yapay zekâ destekli başlık, açıklama ve etiket taslakları',
        'Çok aşamalı onay akışı ve rol bazlı yetkilendirme',
        'Görsel/video kütüphanesi ve yeniden kullanım',
        'Etkileşim, erişim ve büyüme metrikleriyle müşteriye gönderilebilir rapor',
      ],
      teslimNot:
        'Panel, platformların resmî API’leri üzerinden çalışır. Bu, yayınların güvenilir olmasını sağlar; buna karşılık her platformun izin verdiği işlem seti farklıdır ve kapsam başta netleştirilir.',
      surec: [
        'Mevcut iş akışınız ve onay zinciriniz çıkarılır.',
        'Platform izinleri ve uygulama başvuruları tamamlanır.',
        'Panel geliştirilir, pilot bir marka ile canlıya alınır.',
        'Tüm markalar taşınır ve ekip eğitimi yapılır.',
      ],
      surecNot:
        'Platform uygulama onayları bazen proje süresini belirleyen aşama olur. Bu nedenle başvuruları projenin ilk haftasında başlatıyor, geliştirmeyi paralel yürütüyoruz.',
      kimler: [
        'Birden fazla markayı aynı anda yöneten ajanslar',
        'Şube veya bayi hesapları merkezden yönetilen zincir işletmeler',
        'İçerik üretimi dış kaynaklı olduğu için onay akışına ihtiyaç duyan pazarlama ekipleri',
        'Hazır araçların abonelik maliyetini kalıcı bir yatırımla değiştirmek isteyen firmalar',
      ],
      kimlerNot:
        'Tek hesabı olan ve haftada birkaç paylaşım yapan işletmeler için özel panel genellikle gereksiz bir yatırımdır; bu durumda mevcut hazır araçlarla ilerlemenizi öneriyoruz.',
      fiyat:
        'Fiyat, bağlanacak platform sayısına ve otomasyon derinliğine göre belirlenir. Temel planlama paneli 3-4 haftada, yapay zekâ destekli ve çok markalı sürüm 6-10 haftada teslim edilir.',
      sss: [
        [
          'Hesap şifrelerimizi paylaşmamız gerekiyor mu?',
          'Hayır. Bağlantı, platformların resmî yetkilendirme akışıyla kurulur; panel yalnızca verdiğiniz izinler kadarını görür ve bu izinleri istediğiniz an geri alabilirsiniz.',
        ],
        [
          'Yapay zekâ ürettiği içerik doğrudan yayınlanıyor mu?',
          'Varsayılan olarak hayır. Üretilen metin taslak olarak düşer, onay akışından geçmeden yayına gitmez.',
        ],
        [
          'Panel kendi sunucumuzda çalışabilir mi?',
          'Evet. Kurumsal müşterilerimizin bir bölümünde panel kendi altyapılarında çalışıyor; kurulum ve güncelleme sürecini birlikte planlıyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/ga4-gtm-donusum-izleme', 'GA4 ve dönüşüm izleme'],
        ['/tr/hizmetler/ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'ai-ml-veri-tahmin-platformu',
    name: 'Veri Tahmin Platformu (Yapay Zekâ ve Makine Öğrenmesi)',
    kw: 'veri tahmin platformu',
    meta_title: 'Yapay Zekâ Destekli Veri Tahmin Platformu | GZL Teknoloji',
    meta_description:
      'Veri tahmin platformu ile verinizi karara dönüştürün: model eğitimi, versiyonlama, görselleştirme ve açıklanabilir sonuçlar tek panelde toplanır.',
    keywords: 'veri tahmin platformu, makine öğrenmesi platformu, tahmin modeli geliştirme',
    summary:
      'Kurum verisi üzerinde tahmin modelleri eğiten, sonuçları görselleştiren ve karar destek çıktısı üreten uçtan uca makine öğrenmesi platformu.',
    html: buildHtml({
      kw: 'Veri tahmin platformu',
      lead: 'Veri tahmin platformu, kurumunuzda zaten biriken veriyi tahmin ve karar çıktısına dönüştüren bir sistemdir. GZL Teknoloji olarak model geliştirme, versiyonlama, görselleştirme ve raporlamayı tek panelde birleştiren çözümler kuruyoruz.',
      nedir:
        'Makine öğrenmesi projelerinin çoğu modelin doğruluğu yüzünden değil, modelin üretime alınamaması yüzünden başarısız olur. Platform bu boşluğu kapatır: veri hazırlama, eğitim, sürüm takibi ve sonucun iş ekibinin anlayacağı biçimde sunulması aynı akışın parçası haline gelir. Ar-Ge ekipleri, tarım ve biyoteknoloji alanındaki müşterilerimizde bu yapı 2026 itibarıyla standart hale geldi.',
      teslim: [
        'Veri yükleme, doğrulama ve ön işleme akışı',
        'Regresyon ve sınıflandırma modelleri, güven aralıklarıyla birlikte sonuç tabloları',
        'Model versiyonlama ve deney takibi (MLflow uyumlu)',
        'Dağılım, PCA ve karşılaştırma grafikleriyle görselleştirme',
        'Otomatik yeniden eğitim döngüsü ve performans izleme',
        'Büyük dil modeli destekli yorum katmanı: sonucun düz metinle açıklanması',
      ],
      teslimNot:
        'Model dokümantasyonu her pakete dahildir. Hangi verinin nasıl işlendiği, hangi varsayımların yapıldığı ve modelin nerede yanılabileceği yazılı olarak teslim edilir.',
      surec: [
        'Veri envanteri çıkarılır ve tahmin hedefi netleştirilir.',
        'Küçük bir veri kümesiyle fizibilite modeli eğitilir.',
        'Sonuç anlamlıysa platform kurulur ve modeller üretime alınır.',
        'İzleme ve yeniden eğitim döngüsü devreye alınır.',
      ],
      surecNot:
        'Fizibilite aşamasını ayrı tutuyoruz; veri tahmin için yeterli değilse bunu projenin başında söylemeyi, sonunda büyük bir yatırımın karşılıksız kalmasına tercih ediyoruz.',
      kimler: [
        'Ar-Ge ve laboratuvar verisi biriken kurumlar',
        'Tarım, tohumculuk ve biyoteknoloji alanında ıslah ve verim tahmini yapan ekipler',
        'Talep, stok veya fiyat tahmini yapmak isteyen üretim ve perakende firmaları',
        'Elektronik tablolarla yürüttüğü analizi kalıcı bir sisteme taşımak isteyen ekipler',
      ],
      kimlerNot:
        'Veri hacmi çok düşük olduğunda makine öğrenmesi yerine daha basit istatistiksel yöntemler öneriyoruz; bu durumda küçük bir raporlama paneli genellikle yeterli oluyor.',
      fiyat:
        'Tek model içeren başlangıç kurulumu bir hafta içinde teslim edilebilir. Çok modelli, versiyonlamalı ve otomatik yeniden eğitimli tam platform 4-8 hafta sürer. Kapsam ve fiyat, veri hacmine ve model sayısına göre belirlenir.',
      sss: [
        [
          'Verimizi dışarı çıkarmamız gerekiyor mu?',
          'Hayır. Platform kendi sunucunuzda kurulabilir; bu durumda veri kurum dışına çıkmaz. Bulut kurulum tercih edildiğinde erişim ve saklama politikaları sözleşmeyle belirlenir.',
        ],
        [
          'Modelin doğruluğu garanti ediliyor mu?',
          'Doğruluk verinin niteliğine bağlıdır ve peşinen garanti edilemez. Bu yüzden fizibilite aşamasında ölçülen metrikleri paylaşıyor, devam kararını birlikte veriyoruz.',
        ],
        [
          'Sonuçları iş ekibimiz anlayabilir mi?',
          'Evet, yorum katmanı bu amaçla var: model çıktısı sayı olarak değil, gerekçesiyle birlikte metin halinde de sunuluyor.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/amazon-fiyat-scraping-sistemi', 'Amazon fiyat takip sistemi'],
        ['/tr/hizmetler/firmaya-ozel-erp-yazilimi', 'Firmaya özel ERP'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'amazon-fiyat-scraping-sistemi',
    name: 'Amazon Fiyat Takip Sistemi ve Ürün Araştırması',
    kw: 'Amazon fiyat takip sistemi',
    meta_title: 'Amazon Ürün ve Fiyat Takip Sistemi | GZL Teknoloji',
    meta_description:
      'Amazon fiyat takip sistemi ile ürün araştırması, fiyat geçmişi ve rakip analizi otomatikleşir. Skorlanmış sonuçlar karar verilebilir rapora dönüşür.',
    keywords: 'Amazon fiyat takip sistemi, ürün araştırma paneli, e-ticaret veri toplama',
    summary:
      'Amazon ve benzeri pazar yerlerinde ürün, fiyat ve rakip verisini toplayan, skorlayan ve karar destek raporu üreten panel.',
    html: buildHtml({
      kw: 'Amazon fiyat takip sistemi',
      lead: 'Amazon fiyat takip sistemi, pazar yeri üzerinde ürün araştırmasını, fiyat geçmişini ve rakip hareketlerini otomatik toplayan bir paneldir. GZL Teknoloji olarak toplanan veriyi ham liste olarak bırakmıyor; risk ve fırsat skoruna dönüştürüyoruz.',
      nedir:
        'Pazar yerinde ürün seçimi, çoğunlukla birkaç ekran görüntüsü ve sezgiyle yapılır. Oysa karar için gereken veri açıktır: fiyat geçmişi, satıcı sayısı, değerlendirme eğilimi ve kategori derinliği. Sistem bu verileri periyodik toplar, aynı ürünü farklı listelemelerde tekilleştirir ve güncel haliyle karşılaştırılabilir kılar.',
      teslim: [
        'Anahtar kelime veya kategori bazlı tarama ve ürün listeleme',
        'ASIN tekilleştirme ve varyant eşleştirme',
        'Fiyat geçmişi takibi ve değişim uyarıları',
        'Satıcı sayısı, değerlendirme ve stok sinyalleriyle çok boyutlu skorlama',
        'Büyük dil modeli destekli açıklanabilir karar notu',
        'Yönetici özeti ve dışa aktarılabilir rapor',
      ],
      teslimNot:
        'Skorlama kuralları sabit değildir; sizin kategori bilginize göre ağırlıklandırılır. Böylece panel kendi ticari önceliklerinizi yansıtır.',
      surec: [
        'Hedef kategori ve karar kriterleri belirlenir.',
        'Örnek tarama ile veri kalitesi doğrulanır.',
        'Panel kurulur, skorlama ağırlıkları ayarlanır.',
        'Periyodik tarama ve uyarılar devreye alınır.',
      ],
      surecNot:
        'Pazar yerlerinin sayfa yapısı düzenli değişir. Bu nedenle tarama katmanını izlenebilir kuruyor, hata durumunda sessizce boş veri üretmesini değil uyarı vermesini sağlıyoruz.',
      kimler: [
        'Pazar yerinde yeni ürün kategorisi araştıran satıcılar',
        'Fiyat rekabetini günlük takip etmesi gereken markalar',
        'Tedarik kararını veriyle almak isteyen ithalatçılar',
        'Danışmanlık verirken müşterisine rapor üretmesi gereken ekipler',
      ],
      kimlerNot:
        'Tek ürünle çalışan ve fiyatı nadiren değişen satıcılar için sistem genellikle gereğinden kapsamlı kalıyor; bu durumda daha küçük bir izleme kurulumu öneriyoruz.',
      fiyat:
        'Tek kategori taraması yapan başlangıç paneli yaklaşık bir haftada, skorlama ve karar katmanı içeren tam sürüm 3-6 haftada teslim edilir. Fiyat, tarama hacmine ve kaynak sayısına göre belirlenir.',
      sss: [
        [
          'Veri toplama pazar yeri kurallarına aykırı mı?',
          'Sistem yalnızca herkese açık sayfaları, makul aralıklarla ve platformun teknik sınırlarını zorlamadan tarar. Resmî API mevcut olan yerlerde önce API kullanılır.',
        ],
        [
          'Fiyat geçmişi ne kadar geriye gidiyor?',
          'Kurulumdan itibaren biriken veri sizindir. Geriye dönük veri için harici kaynak entegrasyonu gerekir; bunu proje kapsamında ayrıca değerlendiriyoruz.',
        ],
        [
          'Başka pazar yerleri eklenebilir mi?',
          'Evet. Mimari çok kaynaklı çalışacak şekilde kurulur; yeni kaynak eklemek yeni bir tarama modülü yazmak anlamına gelir.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/lead-bulma-rakip-takip-paneli', 'Lead bulma ve rakip takip paneli'],
        ['/tr/hizmetler/google-maps-veri-cekme-botu', 'Google Maps veri toplama botu'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'google-maps-veri-cekme-botu',
    name: 'Google Maps Veri Toplama Botu',
    kw: 'Google Maps veri toplama',
    meta_title: 'Google Maps Veri Toplama Botu | GZL Teknoloji',
    meta_description:
      'Google Maps veri toplama botu ile bölge ve sektör bazlı işletme listeleri çıkarılır: ad, adres, telefon, web sitesi ve puan verisi tabloya dönüşür.',
    keywords: 'Google Maps veri toplama, işletme listesi çıkarma, veri kazıma botu',
    summary:
      'Bölge ve sektör bazlı işletme listelerini Google Maps ve web kaynaklarından toplayıp temizleyen, tekilleştiren ve tabloya dönüştüren bot.',
    html: buildHtml({
      kw: 'Google Maps veri toplama',
      lead: 'Google Maps veri toplama botu, belirlediğiniz bölge ve sektördeki işletmeleri listeleyip iletişim bilgileriyle birlikte tabloya dönüştüren bir araçtır. GZL Teknoloji olarak bu botları tek seferlik liste çıkarmak için değil, düzenli çalışan bir veri akışı kurmak için geliştiriyoruz.',
      nedir:
        'Saha satışı, bayi arayışı ve pazar araştırması yapan ekipler aynı işi elle yapar: haritada arama, kayıt kopyalama, tabloya yapıştırma. Bot bu döngüyü otomatikleştirir. Aramalar bölge ve kategori kombinasyonuna göre çalışır, sonuçlar tekilleştirilir ve eksik alanlar işletmenin web sitesinden tamamlanır.',
      teslim: [
        'Bölge ve kategori kombinasyonlarına göre otomatik arama planı',
        'İşletme adı, adres, telefon, web sitesi, puan ve yorum sayısı alanları',
        'Aynı işletmenin farklı kayıtlarının tekilleştirilmesi',
        'Web sitesinden e-posta ve sosyal hesap tamamlama',
        'Excel/CSV çıktısı ve isteğe bağlı panel arayüzü',
        'Periyodik yeniden tarama ve değişiklik raporu',
      ],
      teslimNot:
        'Çıktı, satış ekibinin doğrudan kullanabileceği biçimde teslim edilir: tekilleştirilmiş, alanları normalize edilmiş ve kaynağı belli. Ham veri yığını teslim etmiyoruz.',
      surec: [
        'Hedef bölge, kategori ve gerekli alanlar belirlenir.',
        'Örnek tarama yapılır, doğruluk oranı ölçülür.',
        'Bot kurulur ve tam tarama çalıştırılır.',
        'Periyodik güncelleme planlanır.',
      ],
      surecNot:
        'Örnek tarama aşamasını atlamıyoruz: bölge ve kategori seçiminin doğruluk oranına etkisi büyük ve bunu erken görmek toplam süreyi kısaltıyor.',
      kimler: [
        'Saha satış ekibine bölge listesi hazırlaması gereken firmalar',
        'Bayi, servis noktası veya tedarikçi ağı kurmak isteyen markalar',
        'Belirli bir sektördeki işletme yoğunluğunu ölçmek isteyen araştırmacılar',
        'Etkinlik ve fuar öncesi hedef liste hazırlayan pazarlama ekipleri',
      ],
      kimlerNot:
        'Yalnızca birkaç yüz kayıtlık tek seferlik bir ihtiyaç varsa, bot kurmak yerine tek seferlik liste çıkarma hizmetiyle ilerlemek daha ekonomik oluyor.',
      fiyat:
        'Tek seferlik liste çıkarma birkaç gün içinde tamamlanır. Panelli ve periyodik çalışan kurulum 2-4 hafta sürer. Fiyat, hedef kayıt sayısına ve tamamlanacak alan sayısına göre belirlenir.',
      sss: [
        [
          'Toplanan veriyi pazarlama amaçlı kullanabilir miyim?',
          'Veriler herkese açık kaynaklardan gelir; ancak kullanım sorumluluğu ve kişisel verilerin korunmasına ilişkin yükümlülükler size aittir. Kurulumda gereksiz kişisel alanları kapsam dışı bırakıyoruz.',
        ],
        [
          'Doğruluk oranı ne kadar?',
          'Alanlara göre değişir: ad ve adres yüksek doğrulukla gelir, e-posta ise ancak işletmenin web sitesinde yayımlanmışsa tamamlanabilir. Örnek tarama bu oranı proje başında gösterir.',
        ],
        [
          'Sonuçları kendi sistemimize aktarabilir miyiz?',
          'Evet. CSV ve Excel çıktısı standarttır; API’si olan CRM sistemlerine doğrudan aktarım da yapılabilir.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/lead-bulma-rakip-takip-paneli', 'Lead bulma ve rakip takip paneli'],
        ['/tr/hizmetler/amazon-fiyat-scraping-sistemi', 'Amazon fiyat takip sistemi'],
        SERVICES,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'ga4-gtm-donusum-izleme',
    name: 'GA4, GTM ve Dönüşüm İzleme Kurulumu',
    kw: 'dönüşüm izleme kurulumu',
    meta_title: 'GA4, GTM ve Dönüşüm İzleme Kurulumu | GZL Teknoloji',
    meta_description:
      'Dönüşüm izleme kurulumu ile GA4, Google Tag Manager ve reklam pikselleri doğru yapılandırılır; hangi kanalın gerçekten satış getirdiği ölçülebilir hale gelir.',
    keywords: 'dönüşüm izleme kurulumu, GA4 kurulumu, Google Tag Manager, e-ticaret ölçümleme',
    summary:
      'GA4, Google Tag Manager ve reklam piksellerinin doğru kurulumu; olay şeması, e-ticaret ölçümü ve doğrulama raporuyla birlikte teslim edilir.',
    html: buildHtml({
      kw: 'Dönüşüm izleme kurulumu',
      lead: 'Dönüşüm izleme kurulumu, web sitenizdeki anlamlı eylemlerin doğru ölçülmesini sağlayan teknik çalışmadır. GZL Teknoloji olarak GA4, Google Tag Manager ve reklam piksellerini birbirini tekrar etmeyen tek bir olay şeması üzerine kuruyoruz.',
      nedir:
        'Çoğu sitede ölçüm vardır ama güvenilir değildir: aynı satın alma iki kez sayılır, form gönderimi hiç sayılmaz, reklam paneli ile analitik farklı rakam gösterir. Bunun nedeni genellikle etiketlerin zaman içinde üst üste eklenmesi ve hiçbirinin güncel şemaya göre gözden geçirilmemesidir. Kurulum bu karmaşayı tek bir şemaya indirger ve her olayın nereden geldiği belgelenir.',
      teslim: [
        'Google Tag Manager konteyner kurulumu ve mevcut etiketlerin temizliği',
        'GA4 mülkü, veri akışı ve olay şemasının tanımlanması',
        'E-ticaret ölçümü: ürün görüntüleme, sepete ekleme, ödeme adımları ve satın alma',
        'Form, telefon ve WhatsApp gibi iletişim dönüşümlerinin tanımlanması',
        'Meta Pixel ve Google Ads dönüşümlerinin aynı şemadan beslenmesi',
        'Doğrulama raporu: hangi olayın hangi sayfada, hangi değerle tetiklendiği',
      ],
      teslimNot:
        'Kurulum sonunda ölçüm planı yazılı olarak teslim edilir. Bu belge, ileride yeni sayfa veya kampanya eklendiğinde ekibinizin aynı standardı sürdürmesini sağlar.',
      surec: [
        'Mevcut kurulum denetlenir, çift sayım ve eksik olaylar tespit edilir.',
        'Ölçüm planı hazırlanır ve onaylanır.',
        'Etiketler kurulur, hazırlık ortamında test edilir.',
        'Canlıya alınır ve iki hafta boyunca doğrulama yapılır.',
      ],
      surecNot:
        'İki haftalık doğrulama süresini kapsama dahil ediyoruz; ölçüm hatalarının çoğu ilk günlerde değil, gerçek trafik altında ortaya çıkıyor.',
      kimler: [
        'Reklam harcaması yapan ve geri dönüşünü net göremeyen e-ticaret siteleri',
        'Formdan gelen talebi kanal bazında ayrıştıramayan hizmet firmaları',
        'Sitesini yenilemiş ve ölçümü sıfırdan kurması gereken markalar',
        'Ajans değişikliği sonrası ölçüm sahipliğini kendi bünyesine almak isteyen şirketler',
      ],
      kimlerNot:
        'Trafiği çok düşük ve dönüşüm sayısı tek haneli olan sitelerde ayrıntılı ölçüm kurmak yerine önce talep yaratmaya odaklanmayı öneriyoruz.',
      fiyat:
        'Standart bir kurumsal sitede kurulum 3-5 iş günü, çok adımlı e-ticaret akışlarında 1-2 hafta sürer. Fiyat, ölçülecek olay sayısına ve mevcut kurulumun karmaşıklığına göre belirlenir.',
      sss: [
        [
          'Mevcut GA4 verimiz kaybolur mu?',
          'Hayır. Yeni kurulum mevcut mülk üzerinde yapılabilir; geçmiş veri korunur. Yalnızca olay adları değişiyorsa raporlarda kırılma olur ve bunu önceden planlıyoruz.',
        ],
        [
          'Çerez onayı ile uyumlu mu?',
          'Evet. Etiketler onay durumuna bağlı çalışacak şekilde kurulur; onay verilmeyen ziyaretçide ölçüm sınırlanır.',
        ],
        [
          'Raporları biz mi kuracağız?',
          'Temel raporlar kurulum kapsamında hazırlanır. Yönetim ekibine özel gösterge panelleri isteniyorsa ayrıca planlıyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/seo-hizmeti', 'SEO hizmeti'],
        ['/tr/hizmetler/geo-seo-lighthouse-analizi', 'GEO analizi ve SEO denetimi'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'firmaya-ozel-erp-yazilimi',
    name: 'Firmaya Özel ERP ve Yönetim Sistemi',
    kw: 'firmaya özel ERP',
    meta_title: 'Firmaya Özel ERP ve Yönetim Sistemi | GZL Teknoloji',
    meta_description:
      'Firmaya özel ERP ile stok, sipariş, üretim ve cari takibi tek panelde toplanır. Hazır paketlere sığmayan iş akışlarınıza göre geliştirilir.',
    keywords: 'firmaya özel ERP, üretim yönetim sistemi, stok ve sipariş takibi',
    summary:
      'Stok, sipariş, üretim planlama, cari ve raporlamayı tek panelde toplayan, işletmenizin kendi iş akışına göre geliştirilen ERP çözümü.',
    html: buildHtml({
      kw: 'Firmaya özel ERP',
      lead: 'Firmaya özel ERP, hazır paketlerin dayattığı iş akışına uymak yerine sizin süreçlerinizi esas alan bir yönetim sistemidir. GZL Teknoloji olarak stok, sipariş, üretim ve cari takibini tek panelde toplayan sistemleri sıfırdan geliştiriyoruz.',
      nedir:
        'Hazır ERP paketleri geniş bir sektör yelpazesine hitap etmek için tasarlanır; bu yüzden her firmada kullanılmayan modüller ve zorlama çözümler ortaya çıkar. Firmaya özel ERP ise yalnızca kullandığınız süreçleri kapsar. Sonuç: daha az ekran, daha az eğitim, daha az kullanıcı direnci ve lisans başına artmayan bir maliyet.',
      teslim: [
        'Stok, depo ve parti/seri takibi',
        'Sipariş, teklif ve fatura akışı; cari hesap yönetimi',
        'Üretim planlama, iş emri ve operasyon takibi',
        'Rol bazlı yetkilendirme ve işlem geçmişi kaydı',
        'Yönetim raporları ve dışa aktarım',
        'Mevcut muhasebe veya e-fatura sistemlerine entegrasyon',
      ],
      teslimNot:
        'Sistem web tabanlı geliştirilir; ofis, depo ve sahadan aynı anda kullanılabilir. Kurulum sonrası kaynak kodu ve veritabanı erişimi sizindir.',
      surec: [
        'Mevcut süreçler yerinde incelenir ve akış şemaları çıkarılır.',
        'Öncelikli modül belirlenip ilk sürüm hızlıca canlıya alınır.',
        'Kullanım geri bildirimiyle diğer modüller sırayla eklenir.',
        'Veri aktarımı ve ekip eğitimi tamamlanır.',
      ],
      surecNot:
        'Tüm modülleri aynı anda teslim etmek yerine öncelikli süreçle başlıyoruz. Bu yaklaşım hem projenin erken değer üretmesini sağlıyor hem de yanlış varsayımların büyümeden düzeltilmesine imkân veriyor.',
      kimler: [
        'Hazır ERP denemiş ama süreçlerine uymadığı için vazgeçmiş üretim firmaları',
        'Elektronik tablolarla yönetilen stok ve sipariş süreçlerini sisteme taşımak isteyen işletmeler',
        'Kullanıcı sayısı arttıkça lisans maliyeti katlanan şirketler',
        'Kendi sektörüne özel hesaplama ve raporlama kuralları olan kurumlar',
      ],
      kimlerNot:
        'Süreçleri standart ve küçük ölçekli işletmelerde hazır bir paket genellikle daha ekonomik olur; böyle durumlarda özel geliştirme önermiyoruz.',
      fiyat:
        'Tek modüllük bir başlangıç sürümü 4-6 haftada canlıya alınabilir. Çok modüllü tam sistemler 3-6 ay sürer. Fiyat, modül sayısına ve entegrasyon ihtiyacına göre belirlenir; güncel aralıklar için paketler sayfasına bakabilirsiniz.',
      sss: [
        [
          'Mevcut verilerimiz aktarılabilir mi?',
          'Evet. Elektronik tablo, hazır ERP veya eski veritabanından aktarım yapılabilir. Aktarım öncesi veri temizliği ayrı bir adım olarak planlanır.',
        ],
        [
          'Kaynak kodu bizde mi olacak?',
          'Evet. Teslimde kaynak kodu ve veritabanı şeması size devredilir; başka bir ekiple devam etmek istediğinizde engel oluşmaz.',
        ],
        [
          'Sistem kendi sunucumuzda çalışabilir mi?',
          'Evet, kendi sunucunuzda veya bizim yönettiğimiz altyapıda çalışabilir. Karar genellikle veri politikanıza göre veriliyor.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/osgb-isletme-yonetim-sistemi', 'OSGB işletme yönetim sistemi'],
        ['/tr/hizmetler/ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'osgb-isletme-yonetim-sistemi',
    name: 'OSGB Yönetim Sistemi (İşletme Yazılımı)',
    kw: 'OSGB yönetim sistemi',
    meta_title: 'OSGB İşletme Yönetim Sistemi Yazılımı | GZL Teknoloji',
    meta_description:
      'OSGB yönetim sistemi ile sözleşme, ziyaret planı, uzman ataması, eğitim ve muayene takibi tek panelde toplanır; mevzuata uygun raporlar üretilir.',
    keywords: 'OSGB yönetim sistemi, OSGB yazılımı, İSG ziyaret takibi',
    summary:
      'Ortak sağlık ve güvenlik birimleri için sözleşme, ziyaret planlama, uzman ataması, eğitim ve raporlama süreçlerini yöneten özel yazılım.',
    html: buildHtml({
      kw: 'OSGB yönetim sistemi',
      lead: 'OSGB yönetim sistemi, ortak sağlık ve güvenlik birimlerinin sözleşme, ziyaret, uzman ataması ve raporlama süreçlerini tek panelde yöneten bir yazılımdır. GZL Teknoloji olarak bu sistemi sahadaki gerçek iş akışına göre geliştiriyoruz.',
      nedir:
        'Bir OSGB’nin işi takvim yönetmektir: hangi işyerine, hangi ay, hangi uzmanın kaç saat gitmesi gerektiği mevzuatla belirlidir. Bu planlama elektronik tabloyla yürütüldüğünde eksik ziyaret ve gecikmiş eğitim kaçınılmaz olur. Sistem planı otomatik üretir, gerçekleşmeyi kaydeder ve açığı önceden uyarır.',
      teslim: [
        'İşyeri, sözleşme ve tehlike sınıfı kayıtları',
        'Mevzuata göre otomatik ziyaret planı ve uzman/hekim ataması',
        'Ziyaret gerçekleşme kaydı, imza ve saha notları',
        'Eğitim, muayene ve periyodik kontrol takibi',
        'Belge arşivi ve süresi dolan belgeler için uyarı',
        'İşyeri bazlı ve toplu yönetim raporları',
      ],
      teslimNot:
        'Raporlar hem iç takip hem de müşterinize sunum için hazırlanır. Süresi dolmak üzere olan yükümlülükler panelde ayrı bir liste halinde toplanır.',
      surec: [
        'Mevcut işyeri portföyü ve planlama kuralları çıkarılır.',
        'Plan üretim mantığı kurulur ve örnek ayla doğrulanır.',
        'Saha kullanımı için mobil uyumlu ekranlar tamamlanır.',
        'Veri aktarımı yapılır, ekip eğitimiyle canlıya geçilir.',
      ],
      surecNot:
        'Planlama kurallarını doğrulama adımını atlamıyoruz: tehlike sınıfı ve çalışan sayısına bağlı süre hesabı yanlış kurulursa sistemin ürettiği tüm plan hatalı olur.',
      kimler: [
        'Çok sayıda işyeriyle çalışan ve planlamayı elektronik tabloyla yürüten OSGB’ler',
        'Uzman ve hekim atamasını merkezden yönetmek isteyen kurumlar',
        'Belge takibinde gecikme yaşayan ve denetime hazır olmak isteyen firmalar',
        'Müşterisine düzenli rapor sunmak isteyen hizmet sağlayıcılar',
      ],
      kimlerNot:
        'Tek uzmanla ve az sayıda işyeriyle çalışan yapılarda sistem gereğinden kapsamlı kalabilir; bu durumda daha küçük bir takip paneli öneriyoruz.',
      fiyat:
        'Temel planlama ve ziyaret takibi içeren sürüm 4-6 haftada teslim edilir. Eğitim, muayene ve belge arşivini kapsayan tam sistem 2-4 ay sürer. Güncel fiyat aralıkları paketler sayfasında yer alır.',
      sss: [
        [
          'Mevzuat değişirse sistem güncellenir mi?',
          'Planlama kuralları yapılandırılabilir tanımlanır; süre ve periyot değerleri panelden değiştirilebilir. Yapısal değişiklikler bakım paketi kapsamında ele alınır.',
        ],
        [
          'Uzmanlar sahadan kullanabilir mi?',
          'Evet. Ekranlar mobil uyumlu geliştirilir; ziyaret kaydı ve saha notu telefondan girilebilir.',
        ],
        [
          'Mevcut kayıtlarımız aktarılabilir mi?',
          'Evet. İşyeri ve sözleşme listeleri elektronik tablodan aktarılabilir; aktarım öncesi doğrulama adımı planlanır.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/firmaya-ozel-erp-yazilimi', 'Firmaya özel ERP'],
        ['/tr/hizmetler/randevu-sistemli-kurumsal-site', 'Randevu sistemli kurumsal site'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'ozel-yazilim-nextjs-fastify',
    name: 'Özel Yazılım Geliştirme (Next.js + Fastify)',
    kw: 'özel yazılım geliştirme',
    meta_title: 'Özel Yazılım Geliştirme: Next.js ve Fastify | GZL Teknoloji',
    meta_description:
      'Özel yazılım geliştirme hizmetiyle iş süreçlerinize özgü web uygulamaları kuruyoruz. Next.js, Fastify ve MySQL ile ölçeklenebilir, sahiplenilebilir mimari.',
    keywords: 'özel yazılım geliştirme, web uygulaması geliştirme, Next.js Fastify',
    summary:
      'İş süreçlerinize özgü web uygulamalarının Next.js, Fastify ve MySQL ile uçtan uca geliştirilmesi; kaynak kodu ve altyapı sizde kalır.',
    html: buildHtml({
      kw: 'Özel yazılım geliştirme',
      lead: 'Özel yazılım geliştirme, hazır ürünlerin karşılamadığı iş süreçleri için sıfırdan uygulama kurmaktır. GZL Teknoloji olarak bu işi Next.js, Fastify ve MySQL üzerine kuruyor; teslimde kaynak kodu ve altyapıyı müşteriye devrediyoruz.',
      nedir:
        'Bir sürecin hazır ürüne sığmadığı üç işaret vardır: ekibin araç dışında elektronik tablo tutması, aynı verinin iki sisteme elle girilmesi ve raporun her ay elle birleştirilmesi. Bu işaretler varsa özel yazılım maliyet değil tasarruf kalemidir. Geliştirmeye en pahalı sorunu çözen küçük bir sürümle başlıyoruz.',
      teslim: [
        'Süreç analizi ve veri modeli tasarımı',
        'Next.js ile hızlı, SEO uyumlu ve mobil uyumlu arayüz',
        'Fastify ile belgelenmiş API katmanı ve rol bazlı yetkilendirme',
        'MySQL veri tabanı, göç (migration) ve yedekleme planı',
        'Yönetim paneli, raporlama ve dışa aktarım',
        'Sunucu kurulumu, izleme ve devreye alma',
      ],
      teslimNot:
        'Kod tabanı belgelenmiş ve okunabilir biçimde teslim edilir. Projeyi ileride başka bir ekip devraldığında engel çıkmaması, çalışma biçimimizin temel kuralıdır.',
      surec: [
        'İhtiyaç ve kapsam birlikte netleştirilir, öncelik sırası belirlenir.',
        'Veri modeli ve ekran akışları onaylanır.',
        'İlk çalışan sürüm kısa sürede canlıya alınır.',
        'Geri bildirimle özellikler eklenir, bakım planına geçilir.',
      ],
      surecNot:
        'Uzun süre görünmeyen bir geliştirme yerine erken çalışan sürüm üretmeyi tercih ediyoruz. Müşterilerimizin çoğunda ilk sürüm, kalan kapsamı da yeniden şekillendiriyor.',
      kimler: [
        'Süreci hazır yazılıma sığmayan üretim, lojistik ve hizmet firmaları',
        'Ürün fikrini hızlıca doğrulamak isteyen girişimler',
        'Birden fazla sistemi tek panelde birleştirmek isteyen şirketler',
        'Mevcut yazılımı yavaşlayan veya bakımı zorlaşan işletmeler',
      ],
      kimlerNot:
        'İhtiyaç gerçekten standartsa ve piyasada uygun bir ürün varsa bunu açıkça söylüyoruz; gereksiz özel geliştirme önermek uzun vadede iki taraf için de kayıp.',
      fiyat:
        'Küçük kapsamlı bir uygulama 3-5 haftada, çok modüllü sistemler 3-6 ayda teslim edilir. Fiyat kapsam ve entegrasyon sayısına göre belirlenir; güncel aralıkları paketler sayfasında bulabilirsiniz.',
      sss: [
        [
          'Neden Next.js ve Fastify?',
          'Bu ikili hem hızlı arayüz hem de sade bir sunucu katmanı sağlıyor; ekipler arasında yaygın bilindiği için ileride başka bir geliştiriciye devretmek de kolay oluyor.',
        ],
        [
          'Proje bittikten sonra desteğiniz sürüyor mu?',
          'Evet. Bakım ve destek paketi kapsamında güncelleme, hata düzeltme ve küçük geliştirmeler yürütülüyor.',
        ],
        [
          'Sabit fiyat mı, süre bazlı mı çalışıyorsunuz?',
          'Kapsamı net projelerde sabit fiyat veriyoruz. Kapsamın belirsiz olduğu durumlarda önce küçük bir keşif çalışması yapıp sonra sabit fiyata geçmeyi öneriyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/firmaya-ozel-erp-yazilimi', 'Firmaya özel ERP'],
        ['/tr/hizmetler/bakim-destek', 'Bakım ve destek'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'ubuntu-vps-kurulum-yayinlama',
    name: 'Ubuntu VPS Kurulumu ve Yayına Alma',
    kw: 'Ubuntu VPS kurulumu',
    meta_title: 'Ubuntu VPS Kurulumu ve Yayına Alma | GZL Teknoloji',
    meta_description:
      'Ubuntu VPS kurulumu, Nginx, SSL, güvenlik duvarı ve süreç yönetimiyle birlikte yapılır; projeniz izlenebilir ve yeniden kurulabilir biçimde yayına alınır.',
    keywords: 'Ubuntu VPS kurulumu, sunucu kurulumu, Nginx SSL yapılandırma',
    summary:
      'Sunucu sertleştirme, Nginx, SSL, süreç yönetimi ve yedekleme dahil olmak üzere projenizin VPS üzerinde güvenli biçimde yayına alınması.',
    html: buildHtml({
      kw: 'Ubuntu VPS kurulumu',
      lead: 'Ubuntu VPS kurulumu, bir projenin yalnızca çalışır hale gelmesi değil; güvenli, izlenebilir ve tekrar kurulabilir biçimde yayına alınmasıdır. GZL Teknoloji olarak sunucuyu teslim ederken kurulumun tüm adımlarını belgeliyoruz.',
      nedir:
        'Sunucu kurulumu çoğu zaman birkaç komutla bitmiş sayılır; sorun aylar sonra çıkar. Güncellenmemiş paketler, açık kalan portlar, süresi dolan sertifikalar ve yedeği alınmayan veritabanı en sık karşılaştığımız üç sorunun kaynağıdır. Kurulumu bu riskleri baştan kapatacak biçimde yapıyoruz.',
      teslim: [
        'Ubuntu kurulumu, güncelleme politikası ve kullanıcı/yetki yapılandırması',
        'Güvenlik duvarı, SSH sertleştirme ve gereksiz servislerin kapatılması',
        'Nginx ters vekil yapılandırması ve ücretsiz SSL sertifikası (otomatik yenileme)',
        'Süreç yöneticisiyle uygulamanın ayakta kalması ve yeniden başlatma politikası',
        'Veritabanı kurulumu, kullanıcı ayrımı ve otomatik yedekleme',
        'Kaynak kullanımı izleme ve temel uyarılar',
      ],
      teslimNot:
        'Kurulum sonunda hangi servisin nerede çalıştığını, hangi dosyanın neyi yapılandırdığını gösteren kısa bir devir belgesi teslim ediyoruz. Sunucuyu ileride başka biri devraldığında bu belge yeterli oluyor.',
      surec: [
        'Proje gereksinimleri ve beklenen yük belirlenir, sunucu boyutu seçilir.',
        'Kurulum ve sertleştirme yapılır.',
        'Uygulama yayına alınır, alan adı ve SSL bağlanır.',
        'Yedekleme ve izleme devreye alınır, devir belgesi teslim edilir.',
      ],
      surecNot:
        'Kurulumu tek seferlik iş olarak görmüyoruz: yedeğin gerçekten geri yüklenebildiğini test etmeden kurulumu tamamlanmış saymıyoruz.',
      kimler: [
        'Kendi projesini paylaşımlı hostingten kendi sunucusuna taşımak isteyen firmalar',
        'Geliştirici ekibi olan ama sistem yönetimi tarafı eksik kalan şirketler',
        'Birden fazla projeyi tek sunucuda barındırmak isteyen ajanslar',
        'Yavaşlayan veya sık kesinti yaşayan mevcut sunucusunu düzelttirmek isteyenler',
      ],
      kimlerNot:
        'Tek sayfalık statik bir site için VPS genellikle gereksizdir; bu durumda daha basit ve ucuz barındırma seçeneklerini öneriyoruz.',
      fiyat:
        'Tek proje için standart kurulum 1-2 gün sürer. Çok projeli, izlemeli ve otomatik dağıtımlı kurulumlar 1-2 hafta alır. Güncel fiyat aralıkları paketler sayfasında yer alır.',
      sss: [
        [
          'Hangi sağlayıcıyı öneriyorsunuz?',
          'Kurulum sağlayıcıdan bağımsız çalışır. Bütçe, konum ve yedekleme ihtiyacınıza göre birkaç seçenek sunuyor, kararı birlikte veriyoruz.',
        ],
        [
          'Sunucu erişimi kimde olacak?',
          'Sunucu sizin hesabınıza kurulur ve yönetici erişimi sizdedir. Bakım anlaşması yoksa teslimden sonra erişimimizi kapatıyoruz.',
        ],
        [
          'Mevcut projemi taşıyabilir misiniz?',
          'Evet. Taşıma öncesi hazırlık ortamında deneme kurulumu yapıyor, kesinti süresini önceden planlıyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/bakim-destek', 'Bakım ve destek'],
        ['/tr/hizmetler/ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'],
        SERVICES,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'bakim-destek',
    name: 'Web Sitesi Bakım ve Destek',
    kw: 'web sitesi bakım',
    meta_title: 'Web Sitesi Bakım ve Destek Hizmeti | GZL Teknoloji',
    meta_description:
      'Web sitesi bakım hizmetiyle güncellemeler, güvenlik yamaları, yedekleme, performans takibi ve küçük geliştirmeler düzenli olarak yürütülür.',
    keywords: 'web sitesi bakım, teknik destek, site güncelleme hizmeti',
    summary:
      'Canlı site ve uygulamalar için düzenli güncelleme, güvenlik yaması, yedekleme doğrulama, performans takibi ve küçük geliştirme desteği.',
    html: buildHtml({
      kw: 'Web sitesi bakım',
      lead: 'Web sitesi bakım hizmeti, yayında olan bir sistemin güncel, güvenli ve hızlı kalmasını sağlar. GZL Teknoloji olarak bakımı "sorun çıkınca bakarız" değil, düzenli kontrol ve raporlama üzerine kuruyoruz.',
      nedir:
        'Yayına alınan bir site zamanla kendiliğinden bozulur: bağımlılıklar eskir, sertifikalar süresini doldurur, içerik büyüdükçe sayfalar yavaşlar ve güvenlik açıkları birikir. Bakım, bu aşınmayı düzenli aralıklarla geri alma işidir. Bir arıza çıktıktan sonra müdahale etmek, önlemekten her zaman daha pahalıdır; bakım anlaşması olan müşterilerimizde kesinti süresi belirgin biçimde düşük seyrediyor.',
      teslim: [
        'Haftalık erişilebilirlik ve hata kontrolü',
        'Bağımlılık ve güvenlik güncellemelerinin uygulanması',
        'Yedeklerin alınması ve geri yüklenebilirliğinin doğrulanması',
        'Performans ve Core Web Vitals takibi',
        'Küçük içerik ve arayüz düzenlemeleri',
        'Aylık durum raporu',
      ],
      teslimNot:
        'Rapor, o ay ne yapıldığını ve sitede hangi metriğin nasıl değiştiğini tek sayfada gösterir. Böylece bakım görünmez bir gider olmaktan çıkar.',
      surec: [
        'Mevcut sistemin envanteri çıkarılır ve riskler listelenir.',
        'Kritik açıklar ilk hafta kapatılır.',
        'Düzenli kontrol takvimi devreye alınır.',
        'Aylık rapor ve iyileştirme önerileri paylaşılır.',
      ],
      surecNot:
        'İlk ay genellikle en yoğun aydır: birikmiş güncellemeler ve eksik yedekler bu dönemde tamamlanır. Sonraki aylarda çalışma düzenli kontrol ve küçük geliştirmelere döner.',
      kimler: [
        'Kendi teknik ekibi olmayan kurumsal firmalar',
        'Siteyi geliştiren ajansla yolları ayrılmış işletmeler',
        'Kesintinin doğrudan satış kaybı anlamına geldiği e-ticaret siteleri',
        'Birden fazla siteyi tek elden yönetmek isteyen gruplar',
      ],
      kimlerNot:
        'Yılda birkaç kez güncellenen ve iş sürekliliği açısından kritik olmayan tanıtım sayfalarında talep üzerine destek modeli daha uygun oluyor.',
      fiyat:
        'Aylık bakım ve gelişim desteği olmak üzere iki temel paket sunuyoruz. Fiyat, sistem sayısına ve yanıt süresi taahhüdüne göre belirlenir; güncel aralıklar paketler sayfasında listelenir.',
      sss: [
        [
          'Siteyi siz geliştirmediyseniz de bakım yapıyor musunuz?',
          'Evet. Devralmadan önce kısa bir inceleme yapıyor, riskleri ve ilk ay yapılacakları yazılı olarak paylaşıyoruz.',
        ],
        [
          'Acil durumda ne kadar sürede müdahale ediyorsunuz?',
          'Yanıt süresi pakete göre tanımlanır. Kesinti durumunda müdahale önceliklidir ve olay sonrası kısa bir neden raporu paylaşılır.',
        ],
        [
          'Yedeklerimiz gerçekten çalışıyor mu?',
          'Bakım kapsamında yedekler yalnızca alınmaz, düzenli olarak geri yükleme denemesiyle doğrulanır.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/ubuntu-vps-kurulum-yayinlama', 'Ubuntu VPS kurulumu'],
        ['/tr/hizmetler/seo-hizmeti', 'SEO hizmeti'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'teklif-raporlama-web-sayfasi',
    name: 'Teklif ve Raporlama Uygulaması',
    kw: 'teklif ve raporlama uygulaması',
    meta_title: 'Teklif ve Raporlama Web Uygulaması | GZL Teknoloji',
    meta_description:
      'Teklif ve raporlama uygulaması ile fiyat teklifleri tek şablondan üretilir, onay süreci izlenir ve sonuçlar yönetim raporuna dönüşür.',
    keywords: 'teklif ve raporlama uygulaması, teklif yönetimi, PDF teklif hazırlama',
    summary:
      'Fiyat tekliflerini şablondan üreten, onay ve takip sürecini izleyen, sonuçları yönetim raporuna dönüştüren web uygulaması.',
    html: buildHtml({
      kw: 'Teklif ve raporlama uygulaması',
      lead: 'Teklif ve raporlama uygulaması, satış ekibinin elektronik tablo ve belge şablonlarıyla yürüttüğü teklif sürecini tek bir sisteme taşır. GZL Teknoloji olarak teklif üretimini, onay akışını ve sonuç raporlamasını aynı ekranda topluyoruz.',
      nedir:
        'Teklif süreci dağınık olduğunda üç şey kaybolur: hangi teklifin hangi sürümünün gönderildiği, kimin onayladığı ve tekliflerin ne kadarının işe döndüğü. Uygulama bu üçünü kayıt altına alır. Teklif tek şablondan üretilir, sürümlenir ve sonucu işaretlenir; böylece kazanma oranı ölçülebilir hale gelir.',
      teslim: [
        'Ürün/hizmet kataloğu ve fiyat listesi yönetimi',
        'Şablondan otomatik teklif oluşturma ve PDF çıktısı',
        'Sürüm takibi ve revizyon geçmişi',
        'Onay akışı ve rol bazlı yetkilendirme',
        'Müşteriye özel bağlantı ile teklif görüntüleme',
        'Kazanma oranı ve satış temsilcisi bazlı raporlar',
      ],
      teslimNot:
        'PDF çıktısı kurumsal kimliğinize göre tasarlanır. Aynı içerik hem yazdırılabilir belge hem de bağlantıyla paylaşılabilir sayfa olarak üretilir.',
      surec: [
        'Mevcut teklif şablonları ve fiyat kuralları incelenir.',
        'Katalog ve hesaplama mantığı kurulur.',
        'Şablon tasarlanır, örnek tekliflerle doğrulanır.',
        'Ekip eğitimi verilir ve canlıya geçilir.',
      ],
      surecNot:
        'Hesaplama kurallarını örnek gerçek tekliflerle doğrulamadan canlıya geçmiyoruz; iskonto ve vergi kurallarındaki küçük farklar sonradan büyük tutarsızlıklara dönüşüyor.',
      kimler: [
        'Günlük çok sayıda teklif üreten satış ekipleri',
        'Fiyatlandırması hesaplamaya dayanan üretim ve proje firmaları',
        'Teklif onayı yöneticiye bağlı olan kurumsal yapılar',
        'Kazanma oranını ölçmek isteyen satış yöneticileri',
      ],
      kimlerNot:
        'Ayda birkaç teklif üreten işletmelerde mevcut belge şablonları genellikle yeterli oluyor; bu durumda sistem yatırımı önermiyoruz.',
      fiyat:
        'Temel teklif üretimi ve PDF çıktısı içeren sürüm 2-3 haftada teslim edilir. Onay akışı ve raporlama içeren tam sürüm 4-8 hafta sürer. Güncel fiyat aralıkları paketler sayfasında yer alır.',
      sss: [
        [
          'Mevcut fiyat listemizi kullanabilir miyiz?',
          'Evet. Elektronik tablodaki liste aktarılabilir ve panelden güncellenebilir hale getirilir.',
        ],
        [
          'Müşteri teklifi görüntülediğinde haberimiz oluyor mu?',
          'Evet. Paylaşılan bağlantı görüntülendiğinde kayıt tutulur; bu bilgi takip aramalarında kullanılabiliyor.',
        ],
        [
          'Muhasebe sistemimize bağlanır mı?',
          'API’si olan sistemlere aktarım yapılabilir. API yoksa dışa aktarım dosyasıyla çalışılır.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/firmaya-ozel-erp-yazilimi', 'Firmaya özel ERP'],
        ['/tr/hizmetler/ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  // ── WEB VE E-TICARET GRUBU ────────────────────────────────────────────────
  // DIKKAT: Bu grupta dort kayit birbirine yakin konudaydi ve ayni aramayi
  // hedefliyordu (icerik yamyamligi). Ayristirma su eksende yapildi:
  //   kurumsal-web-sitesi            -> kurumsal tanitim sitesi (genel)
  //   randevu-sistemli-kurumsal-site -> randevu/rezervasyon alan isletmeler
  //   e-ticaret-sitesi               -> hazir altyapiyla standart magaza
  //   modern-e-ticaret-sitesi        -> Next.js ile ozel/headless magaza
  {
    slug: 'kurumsal-web-sitesi',
    name: 'Kurumsal Web Sitesi',
    kw: 'kurumsal web sitesi',
    meta_title: 'Kurumsal Web Sitesi Tasarımı ve Kurulumu | GZL Teknoloji',
    meta_description:
      'Kurumsal web sitesi tasarımı: hızlı, mobil uyumlu ve SEO/GEO uyumlu altyapı, yönetim paneli ve çok dilli içerik desteğiyle birlikte teslim edilir.',
    keywords: 'kurumsal web sitesi, web sitesi tasarımı, çok dilli kurumsal site',
    summary:
      'Marka anlatımı, hizmet sayfaları ve iletişim akışını kapsayan; hızlı, mobil uyumlu ve arama motorlarına hazır kurumsal web sitesi.',
    html: buildHtml({
      kw: 'Kurumsal web sitesi',
      lead: 'Kurumsal web sitesi, bir firmanın dijitaldeki en temel varlığıdır: ne yaptığınızı anlatır, güven verir ve iletişim taleplerini toplar. GZL Teknoloji olarak kurumsal siteleri hız, erişilebilirlik ve arama görünürlüğü ölçütleriyle birlikte kuruyoruz.',
      nedir:
        'Kurumsal site bir katalog değil, satış sürecinin ilk adımıdır. Ziyaretçi üç soruya hızlıca yanıt arar: bu firma ne yapıyor, bana uygun mu ve nasıl ulaşırım. Bu üç sorunun yanıtı ilk ekranda net değilse tasarımın geri kalanı çalışmaz. Sayfa yapısını bu mantıkla kuruyor, teknik tarafı da 2026 ölçütlerine göre hazırlıyoruz.',
      teslim: [
        'Kurumsal kimliğinize uygun arayüz tasarımı ve mobil uyumluluk',
        'Hakkımızda, hizmetler, referanslar, blog ve iletişim sayfaları',
        'İçerik yönetim paneli: sayfa, blog ve görsel yönetimi',
        'Çok dilli yapı ve dile göre adres (URL) desteği',
        'Teknik SEO kurulumu: sitemap, canonical, JSON-LD ve meta yapılandırması',
        'İletişim formu, harita ve dönüşüm izleme bağlantısı',
      ],
      teslimNot:
        'Site teslim edildiğinde içerik güncellemesini kendi ekibiniz yapabilir. Panel, teknik bilgi gerektirmeyecek biçimde sadeleştirilir.',
      surec: [
        'Hedef kitle, rakip incelemesi ve sayfa haritası çıkarılır.',
        'Tasarım onaylanır.',
        'Geliştirme ve içerik yerleştirme yapılır.',
        'Performans ve SEO kontrolleriyle yayına alınır.',
      ],
      surecNot:
        'Yayına almadan önce hız, erişilebilirlik ve arama motoru kontrollerini standart olarak çalıştırıyoruz; bu adım sonradan yapılan düzeltmelerin çoğunu ortadan kaldırıyor.',
      kimler: [
        'Sitesi eskimiş ve mobilde iyi görünmeyen kurumsal firmalar',
        'Yeni kurulan ve ilk dijital varlığını oluşturan şirketler',
        'İhracat yapan ve çok dilli anlatıma ihtiyaç duyan üreticiler',
        'İçeriğini kendi güncellemek isteyen pazarlama ekipleri',
      ],
      kimlerNot:
        'Online satış yapacaksanız kurumsal site yerine e-ticaret altyapısıyla başlamak daha doğru olur; randevu alıyorsanız randevu sistemli kurumsal site sayfamıza bakabilirsiniz.',
      fiyat:
        'Tek dilli standart kurumsal site 2-4 haftada, çok dilli ve özel tasarımlı projeler 4-8 haftada teslim edilir. Fiyat sayfa sayısı, dil sayısı ve tasarım kapsamına göre belirlenir.',
      sss: [
        [
          'İçerikleri biz mi hazırlayacağız?',
          'Metin ve görselleri siz sağlarsanız süreç hızlanır. İçerik desteğine ihtiyaç duyduğunuzda metin yazımını ve düzenlemesini de üstleniyoruz.',
        ],
        [
          'Mevcut sitemizin adresleri korunur mu?',
          'Evet. Adres yapısı değişiyorsa yönlendirme haritası hazırlanır; böylece arama motorlarındaki mevcut değer korunur.',
        ],
        [
          'Site sonradan büyütülebilir mi?',
          'Evet. Altyapı modüler kurulur; e-ticaret, randevu veya üyelik gibi modüller sonradan eklenebilir.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/randevu-sistemli-kurumsal-site', 'Randevu sistemli kurumsal site'],
        ['/tr/hizmetler/seo-hizmeti', 'SEO hizmeti'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'randevu-sistemli-kurumsal-site',
    name: 'Randevu Sistemli Web Sitesi (Kurumsal)',
    kw: 'randevu sistemli web sitesi',
    meta_title: 'Randevu Sistemli Kurumsal Web Sitesi | GZL Teknoloji',
    meta_description:
      'Randevu sistemli web sitesi ile müşteriler uygun saati kendisi seçer; takvim, hatırlatma ve personel yönetimi tek panelde toplanır.',
    keywords: 'randevu sistemli web sitesi, online randevu yazılımı, rezervasyon sistemi',
    summary:
      'Online randevu, takvim yönetimi, personel ataması ve otomatik hatırlatma içeren kurumsal web sitesi çözümü.',
    html: buildHtml({
      kw: 'Randevu sistemli web sitesi',
      lead: 'Randevu sistemli web sitesi, ziyaretçinin telefon etmeden uygun saati seçip rezervasyon yapabildiği bir kurumsal sitedir. GZL Teknoloji olarak takvim, personel ataması ve hatırlatma akışını sitenin içine gömerek kuruyoruz.',
      nedir:
        'Randevuyla çalışan işletmelerde en büyük kayıp, cevaplanamayan telefonlar ve gelmeyen müşterilerdir. Online randevu bu iki kaybı doğrudan azaltır: talep mesai dışında da alınır, hatırlatma otomatik gider. Sistem ayrıca hangi hizmetin hangi saatte yoğunlaştığını gösterir; bu veri personel planlamasını kolaylaştırır.',
      teslim: [
        'Hizmet, süre ve fiyat tanımlarıyla randevu takvimi',
        'Personel/uzman bazlı müsaitlik ve çakışma kontrolü',
        'E-posta ve mesaj ile onay ve hatırlatma bildirimleri',
        'İptal ve erteleme akışı, müşteri geçmişi kaydı',
        'Çok dilli kurumsal site sayfaları ve içerik paneli',
        'Yoğunluk ve iptal oranı raporları',
      ],
      teslimNot:
        'İsteğe bağlı olarak online ödeme veya kapora alma adımı eklenebilir; bu adım gelmeyen müşteri oranını gözle görülür biçimde düşürüyor.',
      surec: [
        'Hizmet listesi, süreler ve çalışma saatleri tanımlanır.',
        'Takvim kuralları ve personel ataması kurgulanır.',
        'Site ve randevu akışı geliştirilir, deneme rezervasyonlarıyla test edilir.',
        'Bildirim kanalları bağlanır ve canlıya geçilir.',
      ],
      surecNot:
        'Çalışma saatleri, tatil günleri ve hizmet süreleri gibi kuralları canlıya geçmeden önce gerçek senaryolarla test ediyoruz; bu kurallardaki hata doğrudan çift rezervasyona yol açıyor.',
      kimler: [
        'Masaj, güzellik ve wellness merkezleri',
        'Klinik, diş hekimi ve sağlık hizmeti sunan işletmeler',
        'Danışmanlık ve eğitim veren profesyoneller',
        'Servis ve bakım randevusu alan teknik firmalar',
      ],
      kimlerNot:
        'Randevu almayan ve yalnızca tanıtım amaçlı site isteyen firmalar için standart kurumsal web sitesi paketi daha uygun oluyor.',
      fiyat:
        'Tek personelli temel randevu sistemi 3-4 haftada, çok personelli ve ödemeli sürüm 6-10 haftada teslim edilir. Güncel fiyat aralıkları paketler sayfasında listelenir.',
      sss: [
        [
          'Takvimimiz mevcut ajandayla eşleşebilir mi?',
          'Evet. Takvim uygulamalarıyla eşleme kurulabilir; böylece dışarıda alınan randevular da müsaitliğe yansır.',
        ],
        [
          'Müşteri randevusunu kendisi iptal edebilir mi?',
          'Evet, belirlediğiniz süre sınırına kadar. İptal ve erteleme kuralları panelden yönetilir.',
        ],
        [
          'Birden fazla şube yönetebilir miyiz?',
          'Evet. Şube bazlı takvim ve personel yönetimi kurulabilir; raporlar hem şube hem toplam düzeyinde alınır.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/kurumsal-web-sitesi', 'Kurumsal web sitesi'],
        ['/tr/hizmetler/online-siparis-sistemi', 'Online sipariş sistemi'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'e-ticaret-sitesi',
    name: 'E-Ticaret Sitesi Kurulumu',
    kw: 'e-ticaret sitesi kurulumu',
    meta_title: 'E-Ticaret Sitesi Kurulumu ve Yayına Alma | GZL Teknoloji',
    meta_description:
      'E-ticaret sitesi kurulumu: ürün yönetimi, ödeme ve kargo entegrasyonu, güvenli altyapı ve satış raporlarıyla mağazanız yayına hazır teslim edilir.',
    keywords: 'e-ticaret sitesi kurulumu, online mağaza kurulumu, ödeme entegrasyonu',
    summary:
      'Ürün, sipariş, ödeme ve kargo süreçlerini kapsayan; satışa hazır biçimde yayına alınan e-ticaret sitesi kurulumu.',
    html: buildHtml({
      kw: 'E-ticaret sitesi kurulumu',
      lead: 'E-ticaret sitesi kurulumu, ürün kataloğundan ödeme ve kargoya kadar tüm satış akışının çalışır hale getirilmesidir. GZL Teknoloji olarak mağazayı yalnızca kurmuyor, ilk siparişi alacak biçimde yayına hazırlıyoruz.',
      nedir:
        'Bir online mağazanın açılması ürünleri yüklemekle bitmez; ödeme, kargo, iade akışı, fatura bilgisi ve sipariş bildirimleri birlikte çalışmak zorundadır. Kurulum bu zincirin tamamını kapsar. Ayrıca güvenlik ve hız, e-ticarette doğrudan dönüşüm oranına yansıyan iki teknik başlıktır.',
      teslim: [
        'Ürün, kategori, varyant ve stok yönetimi',
        'Sepet, ödeme adımları ve sipariş yönetim ekranları',
        'Sanal pos veya ödeme sağlayıcı entegrasyonu',
        'Kargo entegrasyonu ve gönderi takibi',
        'Kampanya, kupon ve indirim kuralları',
        'Satış raporları ve dönüşüm izleme kurulumu',
      ],
      teslimNot:
        'Kurulum sonunda test siparişi uçtan uca çalıştırılır: ödeme, fatura bilgisi, kargo etiketi ve müşteri bildirimleri birlikte doğrulanır.',
      surec: [
        'Ürün yapısı, ödeme ve kargo tercihleri belirlenir.',
        'Mağaza kurulur, tasarım ve kategori yapısı oluşturulur.',
        'Entegrasyonlar bağlanır ve test siparişleriyle doğrulanır.',
        'Canlıya alınır, ekip eğitimi verilir.',
      ],
      surecNot:
        'Ürün verisi hazır olmayan projelerde süreç uzuyor. Bu yüzden ürün, görsel ve varyant listesini erken aşamada birlikte hazırlıyoruz.',
      kimler: [
        'Fiziksel mağazasını online satışa taşımak isteyen işletmeler',
        'Pazar yerlerine ek olarak kendi kanalını kurmak isteyen satıcılar',
        'Sınırlı ürün sayısıyla hızlı başlamak isteyen markalar',
        'Mevcut mağazası yavaş veya yönetilmesi zor olan firmalar',
      ],
      kimlerNot:
        'Çok özel bir satış akışına, özel fiyatlandırma veya bayi yapısına ihtiyacınız varsa özel geliştirilen modern e-ticaret sitesi sayfamız daha uygun.',
      fiyat:
        'Standart kurulum 2-4 hafta sürer. Entegrasyon sayısı ve ürün hacmi arttıkça süre uzar. Güncel fiyat aralıklarını paketler sayfasında bulabilirsiniz.',
      sss: [
        [
          'Sanal pos başvurusunu siz mi yapıyorsunuz?',
          'Başvuru firmanız adına yapılır; biz gerekli teknik bilgileri hazırlıyor ve entegrasyonu tamamlıyoruz.',
        ],
        [
          'Ürünleri toplu yükleyebilir miyiz?',
          'Evet. Elektronik tablo ile toplu yükleme yapılabilir; görseller de toplu olarak eşleştirilebilir.',
        ],
        [
          'Yasal metinler dahil mi?',
          'Mesafeli satış sözleşmesi gibi metinlerin şablonları yerleştirilir; nihai içerik hukuki danışmanınızla netleştirilmelidir.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/modern-e-ticaret-sitesi', 'Modern e-ticaret sitesi (özel geliştirme)'],
        ['/tr/hizmetler/ga4-gtm-donusum-izleme', 'GA4 ve dönüşüm izleme'],
        PRICING,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'modern-e-ticaret-sitesi',
    name: 'Modern E-Ticaret Sitesi (Next.js ile Özel Geliştirme)',
    kw: 'modern e-ticaret sitesi',
    meta_title: 'Modern E-Ticaret Sitesi: Next.js ile Özel | GZL Teknoloji',
    meta_description:
      'Modern e-ticaret sitesi: Next.js ile geliştirilen hızlı ve özel mağaza altyapısı. Bayi fiyatlandırma, özel akışlar ve kurumsal entegrasyonlar mümkün.',
    keywords: 'modern e-ticaret sitesi, Next.js e-ticaret, özel e-ticaret yazılımı',
    summary:
      'Hazır altyapıların sınırlarına takılan markalar için Next.js ile geliştirilen, özel satış akışlarına ve entegrasyonlara açık e-ticaret sistemi.',
    html: buildHtml({
      kw: 'Modern e-ticaret sitesi',
      lead: 'Modern e-ticaret sitesi, hazır altyapıların şablonuna sığmayan markalar için sıfırdan geliştirilen bir mağazadır. GZL Teknoloji olarak bu sistemleri Next.js ve Fastify üzerine kurup hız ile esnekliği birlikte sağlıyoruz.',
      nedir:
        'Hazır e-ticaret altyapıları hızlı başlangıç sunar; ancak bayi fiyatlandırması, özel varyant mantığı, kurumsal ERP entegrasyonu veya farklı ülkelere göre değişen akışlar gerektiğinde sınırlarına gelinir. Özel geliştirme bu noktada devreye girer: mağaza sizin satış modelinize göre kurulur, eklenti uyumluluğu diye bir kısıt kalmaz.',
      teslim: [
        'Next.js ile hızlı ürün ve kategori sayfaları, arama ve filtreleme',
        'Müşteri grubuna göre fiyatlandırma ve bayi/toptan akışları',
        'Özel varyant, paket ürün ve kampanya kurguları',
        'Ödeme, kargo ve ERP/muhasebe entegrasyonları',
        'Çok dilli ve çok para birimli yapı',
        'Yönetim paneli, raporlama ve dönüşüm ölçümü',
      ],
      teslimNot:
        'Kaynak kodu ve veritabanı sizindir. Abonelik ya da eklenti kilidine bağlı kalmadan sistemi büyütebilir, başka bir ekiple devam edebilirsiniz.',
      surec: [
        'Satış modeli, fiyat kuralları ve entegrasyon ihtiyaçları çıkarılır.',
        'Veri modeli ve ekran akışları tasarlanır.',
        'Çekirdek mağaza canlıya alınır.',
        'Entegrasyonlar ve özel akışlar sırayla eklenir.',
      ],
      surecNot:
        'Projeye çekirdek mağazayla başlayıp özel akışları sonra eklemek, hem satışa erken başlamayı hem de kapsamın gerçek kullanımla şekillenmesini sağlıyor.',
      kimler: [
        'Bayi ve toptan satışı olan, müşteri grubuna göre fiyat veren markalar',
        'ERP veya üretim sistemiyle stok/fiyat senkronizasyonu gereken firmalar',
        'Ürün yapısı standart dışı olan üreticiler',
        'Hazır altyapıda performans ve özelleştirme sınırına ulaşmış işletmeler',
      ],
      kimlerNot:
        'Standart ürün satan ve hızlı başlamak isteyen işletmeler için e-ticaret sitesi kurulumu paketi hem daha hızlı hem daha ekonomik oluyor.',
      fiyat:
        'Çekirdek mağaza 6-10 hafta, entegrasyonlu ve çok dilli projeler 3-5 ay sürer. Fiyat, özel akış ve entegrasyon sayısına göre belirlenir.',
      sss: [
        [
          'Hazır altyapıdan taşınabilir miyiz?',
          'Evet. Ürün, müşteri ve sipariş verisi aktarılabilir; adres yapısı için yönlendirme haritası hazırlanarak arama motorlarındaki değer korunur.',
        ],
        [
          'Performans farkı gerçekten hissediliyor mu?',
          'Ürün sayfalarında sunucu tarafı işleme ve önbellek stratejisi sayesinde açılış süreleri belirgin biçimde iyileşiyor; bu doğrudan dönüşüme yansıyor.',
        ],
        [
          'Bakımını kim üstleniyor?',
          'Bakım ve destek paketiyle güncellemeleri biz yürütüyoruz; kendi ekibiniz devralmak isterse teslim belgeleriyle destekliyoruz.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/e-ticaret-sitesi', 'E-ticaret sitesi kurulumu'],
        ['/tr/hizmetler/ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'online-siparis-sistemi',
    name: 'Online Sipariş Sistemi',
    kw: 'online sipariş sistemi',
    meta_title: 'Online Sipariş Sistemi ve QR Menü | GZL Teknoloji',
    meta_description:
      'Online sipariş sistemi ile restoran ve işletmeler kendi kanalından sipariş alır: QR menü, sepet, kurye/paket servis ve mutfak ekranı bir arada.',
    keywords: 'online sipariş sistemi, QR menü, restoran sipariş yazılımı',
    summary:
      'QR menü, sepet, teslimat ve paket servis akışı ile mutfak ekranını kapsayan, komisyonsuz kendi kanalınızdan sipariş alma sistemi.',
    html: buildHtml({
      kw: 'Online sipariş sistemi',
      lead: 'Online sipariş sistemi, işletmenin siparişi platform komisyonu ödemeden kendi kanalından almasını sağlar. GZL Teknoloji olarak QR menüden mutfak ekranına kadar tüm akışı tek sistemde kuruyoruz.',
      nedir:
        'Pazar yeri uygulamaları hızlı hacim getirir ama her siparişten komisyon alır ve müşteri verisi işletmede kalmaz. Kendi sipariş sisteminiz bu iki dezavantajı ortadan kaldırır: sadık müşteriyi kendi kanalınıza taşırsınız, sipariş geçmişi ve iletişim izni sizde kalır.',
      teslim: [
        'Çok dilli QR menü; ürün, varyant ve ekstra seçenekleri',
        'Sepet, kupon ve minimum tutar kuralları',
        'Teslimat ve paket servis akışı, bölge/ücret tanımları',
        'Mutfak ve kurye ekranları, sipariş durum takibi',
        'Online ödeme veya kapıda ödeme seçenekleri',
        'Satış ve ürün performans raporları',
      ],
      teslimNot:
        'Menü güncellemesi panelden yapılır; fiyat değişikliği QR kodları yeniden basmayı gerektirmez.',
      surec: [
        'Menü, teslimat bölgeleri ve ödeme tercihleri belirlenir.',
        'Sistem kurulur, menü ve görseller yüklenir.',
        'Deneme siparişleriyle mutfak ve kurye akışı test edilir.',
        'Canlıya alınır, personel eğitimi verilir.',
      ],
      surecNot:
        'Yoğun saatte sistemin nasıl davrandığını canlıya geçmeden denemek önemli; deneme siparişlerini gerçek servis akışıyla birlikte yürütüyoruz.',
      kimler: [
        'Restoran, kafe ve dönerci gibi hızlı servis işletmeleri',
        'Paket servis hacmi yüksek olan zincirler',
        'Komisyon maliyetini düşürmek isteyen işletmeler',
        'Masa başı QR menüye geçmek isteyen mekânlar',
      ],
      kimlerNot:
        'Yalnızca masa servisi yapan ve paket satışı bulunmayan işletmelerde QR menü tek başına yeterli olabiliyor; bu durumda daha küçük bir kurulum öneriyoruz.',
      fiyat:
        'QR menü ve temel sipariş akışı 2-3 haftada, kurye ve mutfak ekranı dahil tam sistem 4-8 haftada teslim edilir. Güncel fiyat aralıkları paketler sayfasında yer alır.',
      sss: [
        [
          'Yazar kasa veya adisyon sistemimize bağlanır mı?',
          'API’si olan sistemlerle entegrasyon kurulabilir. Entegrasyon yoksa sipariş, mutfak ekranı üzerinden yönetilir.',
        ],
        [
          'Müşteriler uygulama indirmek zorunda mı?',
          'Hayır. Sistem tarayıcı üzerinden çalışır; QR kod okutmak yeterlidir.',
        ],
        [
          'Birden fazla şube yönetebilir miyiz?',
          'Evet. Şube bazlı menü, fiyat ve teslimat bölgesi tanımlanabilir; raporlar şube kırılımıyla alınır.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/randevu-sistemli-kurumsal-site', 'Randevu sistemli kurumsal site'],
        ['/tr/hizmetler/e-ticaret-sitesi', 'E-ticaret sitesi kurulumu'],
        WORK,
        CONTACT,
      ],
    }),
  },
  {
    slug: 'emlak-ilan-sitesi',
    name: 'Emlak İlan Sitesi',
    kw: 'emlak ilan sitesi',
    meta_title: 'Emlak İlan Sitesi ve Portföy Yönetimi | GZL Teknoloji',
    meta_description:
      'Emlak ilan sitesi ile portföyünüzü kendi kanalınızda yayınlayın: harita, gelişmiş filtreleme, danışman yönetimi ve talep toplama bir arada.',
    keywords: 'emlak ilan sitesi, gayrimenkul portföy yönetimi, emlak web sitesi',
    summary:
      'Harita destekli arama, gelişmiş filtreleme, danışman ve portföy yönetimi ile talep toplama akışını kapsayan emlak ilan sitesi.',
    html: buildHtml({
      kw: 'Emlak ilan sitesi',
      lead: 'Emlak ilan sitesi, portföyünüzü ilan platformlarına bağımlı kalmadan kendi kanalınızda yayınlamanızı sağlar. GZL Teknoloji olarak harita destekli arama, danışman yönetimi ve talep toplama akışını tek sistemde kuruyoruz.',
      nedir:
        'İlan platformları görünürlük sağlar ama müşteri ilişkisi orada kalır ve her ilan için ücret ödenir. Kendi ilan siteniz portföyü kalıcı bir varlığa dönüştürür: arama motorlarından gelen talep doğrudan size ulaşır, danışman performansı ölçülebilir ve marka kendi adına birikim yapar.',
      teslim: [
        'İlan yönetimi: konut, iş yeri, arsa ve proje tipleri',
        'Harita üzerinde arama ve konum bazlı filtreleme',
        'Oda sayısı, metrekare, fiyat aralığı gibi gelişmiş filtreler',
        'Danışman profilleri ve ilan atama',
        'Talep formu, favoriler ve ilan karşılaştırma',
        'İlan performans raporları ve SEO uyumlu ilan sayfaları',
      ],
      teslimNot:
        'Her ilan, arama motorlarında ayrı bir sayfa olarak konumlanacak biçimde yapılandırılır; yapılandırılmış veri ile ilan bilgileri makine tarafından da okunabilir hale gelir.',
      surec: [
        'Portföy yapısı ve ilan alanları belirlenir.',
        'Site ve yönetim paneli geliştirilir.',
        'Mevcut ilanlar aktarılır, harita ve filtreler test edilir.',
        'Canlıya alınır, danışman eğitimi verilir.',
      ],
      surecNot:
        'İlan alanlarının başta doğru tanımlanması kritik: filtreleme mantığı bu alanlar üzerine kuruluyor ve sonradan değiştirmek mevcut ilanların güncellenmesini gerektiriyor.',
      kimler: [
        'Kendi portföyünü yöneten emlak ofisleri',
        'Proje satışı yapan müteahhit ve geliştiriciler',
        'Birden fazla danışmanla çalışan ofis ağları',
        'Kiralama odaklı portföy yöneten firmalar',
      ],
      kimlerNot:
        'Az sayıda ilanla çalışan bireysel danışmanlar için kurumsal web sitesi üzerine eklenen basit bir portföy bölümü genellikle yeterli oluyor.',
      fiyat:
        'Temel ilan sitesi 3-5 haftada, danışman yönetimi ve harita filtreleri dahil tam sürüm 6-10 haftada teslim edilir. Güncel fiyat aralıkları paketler sayfasında listelenir.',
      sss: [
        [
          'Mevcut ilanlarımızı aktarabilir miyiz?',
          'Evet. Elektronik tablo veya mevcut sistemden aktarım yapılabilir; görsel eşleştirmesi de toplu yürütülür.',
        ],
        [
          'İlanlar otomatik güncellenebilir mi?',
          'Kaynak sisteminizde API varsa düzenli eşitleme kurulabilir. Aksi durumda ilanlar panelden yönetilir.',
        ],
        [
          'Danışman performansını görebilir miyiz?',
          'Evet. İlan görüntülenme, talep sayısı ve dönüş oranları danışman bazında raporlanır.',
        ],
      ],
      ilgili: [
        ['/tr/hizmetler/kurumsal-web-sitesi', 'Kurumsal web sitesi'],
        ['/tr/hizmetler/seo-hizmeti', 'SEO hizmeti'],
        PRICING,
        CONTACT,
      ],
    }),
  },
];

function main() {
  const header = `-- =============================================================
-- FILE: content/gzl/907_gzl_services_tr.sql
-- URETILDI: scripts/gzl-service-content.mjs  (@generated gzl-service-content)
--
-- ELLE DUZENLEME. Bu dosya scriptten uretilir; degisiklik gerekiyorsa
-- scripts/gzl-service-content.mjs duzenlenip script yeniden calistirilir.
--
-- Ne yapar: Bionluk ilan metinlerinden tasinan TR hizmet kayitlarini gercek
-- hizmet sayfasi icerigine cevirir (H2 bolumler, liste, SSS, ic link, meta).
-- Icerik JSON zarfinin \`html\` alanina yazilir; \`packages\` alani KORUNUR.
-- =============================================================

SET NAMES utf8mb4;
`;

  const stmts = SERVICE_CONTENT.map((s) => {
    // packages alanini koru: mevcut JSON zarfinin uzerine yaz.
    return `
UPDATE \`services_i18n\` SET
  \`name\` = ${q(s.name)},
  \`summary\` = ${q(s.summary)},
  \`meta_title\` = ${q(s.meta_title)},
  \`meta_description\` = ${q(s.meta_description)},
  \`meta_keywords\` = ${q(s.keywords)},
  \`content\` = JSON_SET(
    CASE WHEN JSON_VALID(\`content\`) THEN \`content\` ELSE JSON_OBJECT() END,
    '$.html', ${q(s.html)}
  ),
  \`updated_at\` = CURRENT_TIMESTAMP(3)
WHERE \`locale\` = 'tr' AND \`slug\` = ${q(s.slug)};`;
  });

  writeFileSync(OUT, header + stmts.join('\n') + '\n', 'utf8');
  const words = SERVICE_CONTENT.map(
    (s) => s.html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
  );
  console.log(`Yazildi: ${OUT}`);
  console.log(`Hizmet sayisi: ${SERVICE_CONTENT.length}`);
  console.log(`Kelime araligi: ${Math.min(...words)} - ${Math.max(...words)}`);
  for (const s of SERVICE_CONTENT) {
    const mt = s.meta_title.length;
    const md = s.meta_description.length;
    const bad = [];
    if (mt < 35 || mt > 65) bad.push(`meta_title ${mt}`);
    if (md < 120 || md > 170) bad.push(`meta_description ${md}`);
    if (bad.length) console.log(`  UYARI ${s.slug}: ${bad.join(', ')}`);
  }
}

main();
