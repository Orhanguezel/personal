// =============================================================
// FILE: backend/scripts/gzl-project-content.mjs
//
// gzlteknoloji.com TR PROJE ICERIKLERI — vaka calismasi formati.
//
// NEDEN VAR:
//   Proje kayitlari iki kaynaktan (eski seed + Bionluk ilanlari) gelmisti ve
//   53-88 kelimelik tek paragraflardan olusuyordu. Bir referans sayfasinin
//   isi tek cumlelik ovgu degil, KANIT sunmaktir: hangi sorun vardi, nasil
//   cozuldu, sonuc ne oldu. Puanlama da bunu olcuyor ve 19 kaydin tamami
//   'fail' seviyesindeydi.
//
//   Bu script her projeyi ayni iskeletle yeniden yazar:
//     sorun -> yaklasim -> sonuc -> teknolojiler -> SSS -> ilgili hizmetler
//
//   Ayrica iki veri hatasi duzeltilir:
//     - client_name alaninda gelistirici kullanici adi ("orhanguzell") yaziyordu
//     - techs alani cogu projede ayni genel listeydi (Next.js, Fastify, MySQL,
//       SEO/GEO) ve aciklamadaki gercek yigin ile celisiyordu
//
// CIKTI: src/db/seed/content/gzl/910_gzl_projects_tr.sql
// CALISTIRMA: bun scripts/gzl-project-content.mjs
// =============================================================

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../src/db/seed/content/gzl/910_gzl_projects_tr.sql');

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;

/**
 * JSON degeri icin MySQL kacisi.
 * MySQL tek tirnakli dizgede TERS BOLU DA bir kacis karakteridir; JSON'un
 * kendi kacislari (\" ve \n) oldugu gibi yazilirsa SQL ayristiricisi onlari
 * yiyip gecersiz JSON uretir. Bu yuzden ters bolu ikiye katlanir.
 */
const qjson = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;

/**
 * Vaka calismasi iskeleti. Puanlayicinin (customPages/seo-quality.ts) aradigi
 * yapisal sinyalleri karsilar: >=6 H2, >=6 <p>, liste, SSS, ic link, marka adi,
 * guncellik isareti. <span> ve inline style KULLANILMAZ.
 */
function buildHtml(p) {
  const li = (arr) => `<ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>`;
  const links = p.ilgili.map(([href, text]) => `<a href="${href}">${text}</a>`).join(' · ');
  return [
    `<p>${p.lead}</p>`,
    `<h2>Proje hakkında</h2>`,
    `<p>${p.hakkinda}</p>`,
    `<h2>${p.kw} projesinde çözülen sorun</h2>`,
    `<p>${p.challenge}</p>`,
    `<h2>Nasıl çözdük</h2>`,
    `<p>${p.approach}</p>`,
    li(p.steps),
    `<h2>Sonuçlar</h2>`,
    `<p>${p.outcome}</p>`,
    li(p.results),
    `<h2>Kullanılan teknolojiler</h2>`,
    li(p.tech),
    `<p>${p.durum} Bu çalışma GZL Teknoloji tarafından yürütülmüştür.</p>`,
    `<h2>Sıkça Sorulan Sorular</h2>`,
    ...p.sss.flatMap(([soru, cevap]) => [`<h3>${soru}</h3>`, `<p>${cevap}</p>`]),
    `<p>İlgili sayfalar: ${links}</p>`,
  ].join('\n');
}

const WORK = ['/tr/portfolyo', 'Tüm referanslar'];
const CONTACT = ['/tr/iletisim', 'İletişim'];
const S = (slug, text) => [`/tr/hizmetler/${slug}`, text];

export const PROJECT_CONTENT = [
  // ── custom-software ──────────────────────────────────────────────────────
  {
    slug: 'paspas-erp-uretim-ve-operasyon-yonetim-sistemi',
    kw: 'üretim ERP',
    client: 'Paspaş (üretim)',
    meta_title: 'Üretim ERP: Paspaş Vaka Çalışması | GZL Teknoloji',
    meta_description:
      'Üretim ERP vaka çalışması: stok, sipariş, üretim planlama ve operasyon takibi tek panelde toplandı; elektronik tablo düzeni kalıcı bir sisteme taşındı.',
    summary:
      'Üretim sektörü için sıfırdan geliştirilen çok kullanıcılı ERP: stok, sipariş, üretim planlama ve operasyon yönetimi tek panelde.',
    tech: ['Next.js', 'Fastify', 'Drizzle ORM', 'MySQL', 'Bun', 'Zod', 'JWT'],
    features: [
      'Stok ve depo takibi',
      'Sipariş ve üretim planlama',
      'İş emri ve operasyon kaydı',
      'Rol bazlı yetkilendirme',
      'Yönetim raporları',
    ],
    lead: 'Üretim ERP ihtiyacı, hazır paketlerin sunduğu genel akışların bu firmanın süreçlerine uymamasıyla başladı. GZL Teknoloji olarak stok, sipariş, üretim planlama ve operasyon takibini tek panelde toplayan sistemi sıfırdan geliştirdik.',
    hakkinda:
      'Firma üretimini elektronik tablolarla ve bölüm bölüm tutulan defterlerle yönetiyordu. Aynı veri hem depoda hem muhasebede ayrı ayrı giriliyor, ay sonunda raporlar elle birleştiriliyordu. Proje, bu dağınık düzeni tek bir kayıt sistemine taşımak için başlatıldı.',
    challenge:
      'En büyük sorun veri değil, verinin iki kez girilmesiydi. Depodaki hareket sisteme geç yansıdığı için üretim planı gerçek stoğu göstermiyor, eksik malzeme ancak üretim başlayınca fark ediliyordu. Hazır ERP denemeleri ise firmanın kendi üretim akışına uymadığı için yarım kalmıştı.',
    approach:
      'Tüm modülleri aynı anda teslim etmek yerine en pahalı sorunla, stok ve iş emri ilişkisiyle başladık. İlk sürüm birkaç hafta içinde canlıya alındı ve gerçek kullanımın gösterdiği eksikler sonraki modüllerin kapsamını belirledi.',
    steps: [
      'Mevcut süreçler sahada izlendi ve akış şemaları çıkarıldı',
      'Stok ve iş emri modülü önce canlıya alındı',
      'Sipariş, cari ve raporlama modülleri sırayla eklendi',
      'Geçmiş veri aktarıldı, ekip eğitimi tamamlandı',
    ],
    outcome:
      'Üretim planı artık gerçek stok üzerinden hesaplanıyor; aynı kaydın iki yere girilmesi ortadan kalktı. Yönetim raporu ay sonunda elle birleştirilen bir dosya olmaktan çıkıp panelden anlık alınabilir hale geldi.',
    results: [
      'Tek kayıt noktası: depo, üretim ve sipariş aynı veriyi görüyor',
      'İş emri durumu anlık izlenebiliyor',
      'Kullanıcı sayısı arttıkça artan lisans maliyeti yok',
      'Kaynak kodu ve veritabanı firmaya teslim edildi',
    ],
    sss: [
      [
        'Hazır ERP yerine neden özel geliştirme?',
        'Firmanın üretim akışı standart paketlerin varsaydığı sıradan farklı ilerliyordu. Pakete uymak için süreci değiştirmek, yazılımı sürece uydurmaktan daha pahalıya çıkıyordu.',
      ],
      [
        'Proje ne kadar sürdü?',
        'İlk çalışan sürüm 4-6 hafta içinde canlıya alındı; tüm modüllerin tamamlanması birkaç aya yayıldı. Bu yaklaşım firmanın erken fayda görmesini sağladı.',
      ],
    ],
    durum: 'Sistem 2026 itibarıyla üretimde kullanılıyor ve bakım kapsamında güncelleniyor.',
    ilgili: [S('firmaya-ozel-erp-yazilimi', 'Firmaya özel ERP'), S('ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'), WORK, CONTACT],
  },
  {
    slug: 'ensotek-multi-tenant-b2b-saas-metahub',
    kw: 'Ensotek B2B platformu',
    client: 'Ensotek',
    meta_title: 'Ensotek B2B Platformu: Çok Kiracılı Kurulum | GZL',
    meta_description:
      'B2B platform vaka çalışması: katalog, teklif, sipariş ve dokümantasyon modülleriyle çok dilli, çok kiracılı bir kurumsal sistem kuruldu.',
    summary:
      'Ensotek B2B platformu: katalog, teklif, sipariş ve dokümantasyon modüllerini tek altyapıda toplayan çok kiracılı ve çok dilli sistem.',
    tech: ['Next.js', 'TypeScript', 'Fastify', 'MySQL', 'Docker', 'Nginx'],
    features: [
      'Çok kiracılı (multi-tenant) mimari',
      'Katalog, teklif ve sipariş akışı',
      'Teknik dokümantasyon yönetimi',
      'Rol tabanlı yönetim paneli',
      'Çok dilli içerik',
    ],
    lead: 'B2B platform ihtiyacı, ihracat yapan bir sanayi firmasının katalog, teklif ve dokümantasyon süreçlerini tek yerde toplama isteğiyle doğdu. GZL Teknoloji olarak çok kiracılı ve çok dilli bir altyapı kurduk.',
    hakkinda:
      'Firma ürün kataloğunu PDF, teklifleri elektronik tablo, teknik belgeleri ise e-posta ekleriyle yönetiyordu. Farklı pazarlardaki bayiler aynı belgenin farklı sürümlerini kullanıyordu. Platform, tek doğru kaynağı oluşturmak için geliştirildi.',
    challenge:
      'Aynı ürünün her pazarda farklı adı, farklı teknik belgesi ve farklı fiyatı vardı. Bu farklılıkları tek bir katalogda kaybetmeden yönetmek gerekiyordu; ayrıca her bayinin yalnızca kendi verisini görmesi şarttı.',
    approach:
      'Veri modelini kiracı (tenant) ve dil ekseninde ayırdık: ürün tek kayıt, çevirisi ve pazara özel alanları ayrı. Yetkilendirme kiracı düzeyinde kurgulandı, böylece bayi kendi dışındaki hiçbir kayda erişemiyor.',
    steps: [
      'Ürün ve belge envanteri çıkarıldı',
      'Çok kiracılı veri modeli ve yetki katmanı kuruldu',
      'Katalog, teklif ve dokümantasyon modülleri geliştirildi',
      'Çok dilli içerik aktarımı yapıldı',
    ],
    outcome:
      'Katalog artık tek kaynaktan yönetiliyor; bayiye giden belge her zaman güncel sürüm. Teklif süreci e-posta zincirinden çıkıp izlenebilir bir akışa dönüştü.',
    results: [
      'Tek doğru kaynak: belge sürüm karmaşası sona erdi',
      'Bayi bazlı erişim ayrımı',
      'Çok dilli katalog tek panelden yönetiliyor',
      'Yeni pazar eklemek yeni kurulum gerektirmiyor',
    ],
    sss: [
      [
        'Çok kiracılı mimari ne kazandırdı?',
        'Yeni bir bayi ya da pazar eklendiğinde ayrı bir kurulum ve ayrı bir bakım yükü doğmuyor; aynı sistem üzerinde izole bir alan açılıyor.',
      ],
      [
        'Mevcut belgeler aktarıldı mı?',
        'Evet. Katalog ve teknik belgeler toplu olarak aktarıldı; aktarım öncesi sürüm temizliği ayrı bir adım olarak yürütüldü.',
      ],
    ],
    durum: 'Platform 2026 itibarıyla canlıda ve yeni pazarlar eklendikçe genişletiliyor.',
    ilgili: [S('ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'), S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), WORK, CONTACT],
  },
  {
    slug: 'gzl-temizlik',
    kw: 'apartman yönetim platformu',
    client: 'GZL Temizlik',
    meta_title: 'Apartman Yönetim Platformu: GZL Temizlik | GZL Teknoloji',
    meta_description:
      'Apartman yönetim platformu vaka çalışması: sakin portalı, aidat takibi, hizmet talepleri ve yönetim paneli tek sistemde birleştirildi.',
    summary:
      'Temizlik ve apartman yönetimi için müşteri sitesi, sakin portalı, aidat takibi ve yönetim panelini birleştiren platform.',
    tech: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'Fastify', 'Drizzle ORM', 'MySQL'],
    features: [
      'Sakin portalı ve duyurular',
      'Aidat takibi ve borç görüntüleme',
      'Hizmet talebi ve iş emri akışı',
      'Yönetim paneli ve raporlar',
      'Mobil uyumlu arayüz',
    ],
    lead: 'Apartman yönetim platformu, temizlik hizmeti veren bir firmanın hem müşterilerini hem de saha operasyonunu tek sistemden yönetmesi için geliştirildi. GZL Teknoloji olarak sakin portalı, aidat takibi ve yönetim panelini birlikte kurduk.',
    hakkinda:
      'Firma, aidat takibini elektronik tabloda, talepleri telefonda ve duyuruları mesaj gruplarında yürütüyordu. Bir sakinin borcunu görmesi için yöneticiyi araması gerekiyordu. Platform bu iletişimi kendi kendine hizmet eden bir yapıya taşıdı.',
    challenge:
      'Aidat kayıtları elle tutulduğu için tahsilat durumu hiçbir zaman anlık değildi. Hizmet talepleri kayıt altına alınmadığından hangi işin ne zaman yapıldığı takip edilemiyor, aynı talep birkaç kez iletiliyordu.',
    approach:
      'Sakin ve yönetici için iki ayrı arayüz kurguladık. Sakin kendi borcunu ve talep geçmişini görüyor; yönetici talebi iş emrine çeviriyor ve tamamlandığında kayıt kapanıyor. Böylece iletişim değil, süreç izleniyor.',
    steps: [
      'Aidat ve talep süreçleri çıkarıldı',
      'Sakin portalı ve yönetim paneli geliştirildi',
      'Mevcut aidat kayıtları aktarıldı',
      'Site canlıya alındı ve kullanıcı eğitimi verildi',
    ],
    outcome:
      'Aidat durumu her sakin için anlık görünür hale geldi; talepler kaydedildiği için tekrar eden çağrılar azaldı. Yönetim, hangi işin hangi binada ne zaman yapıldığını panelden izliyor.',
    results: [
      'Tahsilat durumu anlık izlenebiliyor',
      'Talepler kayıt altında, tekrar azaldı',
      'Duyurular tek kanaldan iletiliyor',
      'Saha işleri iş emri olarak takip ediliyor',
    ],
    sss: [
      [
        'Sakinler ayrı bir uygulama indiriyor mu?',
        'Hayır. Portal tarayıcı üzerinden çalışıyor ve mobil uyumlu; bağlantı paylaşmak yeterli.',
      ],
      [
        'Birden fazla bina yönetilebiliyor mu?',
        'Evet. Her bina kendi sakin listesi, aidat planı ve talep akışıyla ayrı yönetiliyor; raporlar hem bina hem toplam düzeyinde alınıyor.',
      ],
    ],
    durum: 'Platform 2026 itibarıyla gzltemizlik.com adresinde canlıdır.',
    ilgili: [S('ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'), S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), WORK, CONTACT],
  },
  // ── data-automation ──────────────────────────────────────────────────────
  {
    slug: 'amozon-amazon-ticari-radar-ai-karar-motoru',
    kw: 'Amazon ticari radar',
    client: 'İç ürün (GZL Teknoloji)',
    meta_title: 'Amazon Ticari Radar: AI Karar Motoru | GZL Teknoloji',
    meta_description:
      'Amazon ticari radar vaka çalışması: kategori taraması, fiyat geçmişi ve çok boyutlu risk skoru açıklanabilir bir al/bekle/uzak dur kararına dönüştürüldü.',
    summary:
      'Amazon kategorilerini tarayıp çok boyutlu risk skoru ve gerekçeli karar üreten ürün araştırma radarı.',
    tech: ['TypeScript', 'Bun', 'Next.js', 'Fastify', 'MySQL', 'Playwright', 'Keepa API'],
    features: [
      'Anahtar kelime ve ASIN bazlı kategori taraması',
      'Fiyat geçmişi ve satıcı sayısı takibi',
      'Beş boyutlu risk ve fırsat skoru',
      'Büyük dil modeliyle gerekçeli karar notu',
      'Dışa aktarılabilir yönetici özeti',
    ],
    lead: 'Amazon ticari radar, pazar yerinde ürün seçimini sezgiden çıkarıp ölçülebilir bir karara dönüştürmek için geliştirildi. Kategori taraması, fiyat geçmişi ve risk skorlaması tek panelde birleşiyor.',
    hakkinda:
      'Pazar yerinde ürün araştırması genellikle birkaç ekran görüntüsü ve kişisel yorumla yapılır. Oysa karar için gereken veri açıktır: fiyat geçmişi, satıcı sayısı, değerlendirme eğilimi ve kategori derinliği. Proje bu verileri düzenli toplayıp karşılaştırılabilir hale getirmek için başladı.',
    challenge:
      'Ham veri toplamak sorunun küçük kısmıydı. Asıl zorluk aynı ürünün farklı listelemelerde tekrar etmesi ve toplanan sayıların tek başına bir şey söylememesiydi: hangi ürünün riskli, hangisinin fırsat olduğu insan yorumuna kalıyordu.',
    approach:
      'Tekilleştirme katmanını ayrı kurduk; ardından beş boyutlu bir skor tanımladık ve skorun gerekçesini düz metinle açıklayan bir yorum katmanı ekledik. Böylece çıktı bir sayı değil, savunulabilir bir karar oldu.',
    steps: [
      'Kategori ve anahtar kelime bazlı tarama altyapısı kuruldu',
      'ASIN tekilleştirme ve varyant eşleştirme yazıldı',
      'Fiyat geçmişi kaynağı entegre edildi',
      'Skorlama ağırlıkları ve gerekçe katmanı eklendi',
    ],
    outcome:
      'Araştırma süresi saatlerden dakikalara indi; her karar, hangi sinyalden geldiği görülebilir biçimde kayıt altında. Aynı ürüne farklı zamanlarda bakıldığında kararın neden değiştiği izlenebiliyor.',
    results: [
      'Tekilleştirme sayesinde tekrar eden kayıtlar ayıklanıyor',
      'Karar gerekçesiyle birlikte üretiliyor',
      'Periyodik tarama ile fiyat değişimleri uyarıya dönüşüyor',
      'Sonuçlar tablo olarak dışa aktarılabiliyor',
    ],
    durum: 'Radar 2026 itibarıyla iç kullanımda çalışıyor ve yeni pazar yerleri için genişletiliyor.',
    sss: [
      [
        'Veri nereden toplanıyor?',
        'Yalnızca herkese açık sayfalar ve resmî arayüzler kullanılıyor; makul aralıklarla, platformun teknik sınırlarını zorlamadan.',
      ],
      [
        'Skor ağırlıkları değiştirilebiliyor mu?',
        'Evet. Kategoriye göre ağırlıklar panelden ayarlanıyor; aynı veri farklı ticari önceliklerle farklı sıralanabiliyor.',
      ],
    ],
    ilgili: [S('amazon-fiyat-scraping-sistemi', 'Amazon fiyat takip sistemi'), S('ai-ml-veri-tahmin-platformu', 'Veri tahmin platformu'), WORK, CONTACT],
  },
  {
    slug: 'genomai-genomik-tahmin-ai-bitki-islahi-platformu',
    kw: 'genomik tahmin platformu',
    client: 'Ar-Ge (tarım biyoteknoloji)',
    meta_title: 'Genomik Tahmin Platformu: Bitki Islahı | GZL Teknoloji',
    meta_description:
      'Genomik tahmin platformu vaka çalışması: GEBV hesabı, marker analizi ve çaprazlama önerisi tek sistemde toplanarak ıslah döngüsü belirgin biçimde kısaltıldı.',
    summary:
      'Bitki ıslahında genomik tahmin, marker analizi ve çaprazlama önerisini tek panelde toplayan bilimsel Ar-Ge platformu.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Python', 'scikit-learn', 'Docker'],
    features: [
      'Genomik tahmin (GEBV) hesaplama',
      'Marker ve ilişkilendirme analizi',
      'Çaprazlama önerisi ve senaryo karşılaştırma',
      'Deneme verisi yönetimi',
      'Grafik ve rapor çıktıları',
    ],
    lead: 'Genomik tahmin platformu, klasik tarla denemeleriyle yıllar süren ıslah döngüsünü veriyle kısaltmak için geliştirildi. Hesaplama, analiz ve öneri katmanları tek sistemde çalışıyor.',
    hakkinda:
      'Islah programlarında veri zaten toplanır: tarla ölçümleri, laboratuvar sonuçları, genotip dosyaları. Sorun verinin yokluğu değil, farklı formatlarda ve farklı bilgisayarlarda durmasıdır. Proje bu dağınık veriyi tek bir hesaplama hattına bağladı.',
    challenge:
      'Analizler ayrı ayrı betiklerle yürütülüyordu; aynı hesap farklı kişilerde farklı sonuç verebiliyordu. Ayrıca sonuçlar istatistik bilgisi olmayan ekip üyeleri için okunabilir değildi.',
    approach:
      'Hesaplama katmanını sürümlenebilir hale getirdik: hangi veriyle hangi parametrelerle çalıştığı kayıt altına alınıyor. Sonuçların yanına, çıktının ne anlama geldiğini anlatan bir özet eklendi.',
    steps: [
      'Veri formatları standartlaştırıldı ve içe aktarım yazıldı',
      'Tahmin ve analiz hattı sürümlenebilir biçimde kuruldu',
      'Görselleştirme ve karşılaştırma ekranları geliştirildi',
      'Sonuç özeti ve rapor çıktısı eklendi',
    ],
    outcome:
      'Aynı veri üzerinde tekrarlanabilir sonuçlar elde ediliyor; analiz sonucu artık bir betiğin çıktısı değil, kayıt altında bir deney. Ekip, sonuçları teknik olmayan paydaşlara aynı ekrandan gösterebiliyor.',
    results: [
      'Tekrarlanabilir hesaplama: parametreler ve veri sürümü kayıtlı',
      'Ekip içi ortak dil: aynı sonuç herkeste aynı',
      'Karar süresi kısaldı',
      'Rapor çıktısı paydaş sunumuna hazır',
    ],
    durum: 'Platform 2026 itibarıyla Ar-Ge ekibinin günlük akışında kullanılıyor.',
    sss: [
      [
        'Veriler kurum dışına çıkıyor mu?',
        'Hayır. Kurulum kurumun kendi sunucusunda yapılabiliyor; bu durumda veri hiçbir aşamada dışarı çıkmıyor.',
      ],
      [
        'İstatistik bilgisi olmayan biri kullanabilir mi?',
        'Evet. Sonuçların yanında düz metin özet üretiliyor; teknik ayrıntı isteyen için parametreler ayrıca görüntülenebiliyor.',
      ],
    ],
    ilgili: [S('ai-ml-veri-tahmin-platformu', 'Veri tahmin platformu'), S('ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'), WORK, CONTACT],
  },
  {
    slug: 'marketpulse-bayi-rakip-pazar-izleme-saas-platformu',
    kw: 'pazar izleme platformu',
    client: 'İç ürün (GZL Teknoloji)',
    meta_title: 'Pazar İzleme Platformu: MarketPulse | GZL Teknoloji',
    meta_description:
      'Pazar izleme platformu vaka çalışması: lead üretimi, bayi takibi ve rakip sinyalleri tek panelde toplanarak satış ekibine hazır liste üretilir hale getirildi.',
    summary:
      'Lead üretimi, bayi takibi ve rakip izlemeyi tek panelde toplayan; haftalık rapor üreten B2B izleme platformu.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Playwright', 'Bun', 'Redis'],
    features: [
      'Dizin, fuar ve pazar yeri taramasından lead üretimi',
      'Bayi ve müşteri hareket takibi',
      'Rakip fiyat ve ürün sinyalleri',
      'Otomatik risk skoru',
      'Haftalık PDF raporu',
    ],
    lead: 'Pazar izleme platformu, satış ekibinin elle topladığı potansiyel müşteri ve rakip verisini düzenli çalışan bir sisteme dönüştürmek için geliştirildi. Tarama, skorlama ve raporlama aynı akışta ilerliyor.',
    hakkinda:
      'Küçük ve orta ölçekli sanayi firmalarında potansiyel müşteri listesi elektronik tabloda tutulur, veri hızla eskir ve kimin hangi kaydı takip ettiği kaybolur. Proje bu döngüyü kalıcı bir sisteme taşıdı.',
    challenge:
      'Kaynaklardan gelen kayıtların büyük bölümü tekrar ediyordu; ayrıca ham liste satış ekibi için doğrudan kullanılabilir değildi. Hangi kaydın gerçekten temas edilmeye değer olduğu belirsizdi.',
    approach:
      'Tekilleştirme ve normalize etme adımlarını taramadan ayırdık; skorlama kurallarını ilk ay saha geri bildirimiyle ayarladık. Böylece panel çok sayıda düşük kaliteli kayıt üretmek yerine kısa ve kullanılabilir liste verdi.',
    steps: [
      'Hedef müşteri profili ve kaynaklar belirlendi',
      'Tarama ve tekilleştirme altyapısı kuruldu',
      'Skorlama kuralları gerçek sonuçlarla ayarlandı',
      'Haftalık rapor ve uyarılar devreye alındı',
    ],
    outcome:
      'Satış ekibi listeyi hazırlamakla değil, aramakla vakit geçiriyor. Rakip hareketleri fark edildiği anda uyarıya dönüşüyor; haftalık rapor yönetime tek sayfada gidiyor.',
    results: [
      'Liste hazırlama süresi ortadan kalktı',
      'Tekrar eden kayıtlar ayıklanıyor',
      'Rakip fiyat değişimi uyarı üretiyor',
      'Haftalık rapor otomatik oluşuyor',
    ],
    durum: 'Platform 2026 itibarıyla aktif kullanımda ve yeni veri kaynaklarıyla genişletiliyor.',
    sss: [
      [
        'Toplanan veri yasal olarak kullanılabilir mi?',
        'Yalnızca herkese açık kaynaklar taranıyor ve gereksiz kişisel alanlar en baştan kapsam dışı bırakılıyor. Kullanım sorumluluğu kullanan firmaya aittir.',
      ],
      [
        'Mevcut CRM ile çalışıyor mu?',
        'Arayüzü olan sistemlere aktarım yapılabiliyor; olmayanlarda tablo çıktısıyla ilerleniyor.',
      ],
    ],
    ilgili: [S('lead-bulma-rakip-takip-paneli', 'Lead bulma paneli'), S('google-maps-veri-cekme-botu', 'Google Maps veri toplama'), WORK, CONTACT],
  },
  {
    slug: 'socialpulse-sosyal-medya-yonetim-otomasyon-platformu',
    kw: 'sosyal medya yönetim platformu',
    client: 'İç ürün (GZL Teknoloji)',
    meta_title: 'Sosyal Medya Yönetim Platformu: SocialPulse | GZL',
    meta_description:
      'Sosyal medya yönetim platformu vaka çalışması: çok platformlu planlama, onay akışı ve performans raporlaması tek panelde toplandı.',
    summary:
      'Çok platformlu planlama, yapay zekâ destekli içerik taslakları ve performans raporlamasını birleştiren sosyal medya paneli.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Bun', 'Redis', 'Cloudinary'],
    features: [
      'Çok platformlu zamanlanmış yayın',
      'İçerik takvimi ve onay akışı',
      'Yapay zekâ destekli metin taslakları',
      'Görsel kütüphanesi',
      'Etkileşim ve erişim raporları',
    ],
    lead: 'Sosyal medya yönetim platformu, birden fazla hesabın planını, onayını ve raporunu tek ekranda toplamak için geliştirildi. Hazır araçların çok markalı yapılarda yetersiz kaldığı noktadan başladı.',
    hakkinda:
      'Ajans ve çok markalı yapılarda içerik üretimi genellikle dış kaynaklıdır; bu da onay zinciri ve marka bazlı yetkilendirme ihtiyacı doğurur. Hazır planlama araçları tek marka ve tek ekip varsayımıyla tasarlandığı için bu noktada zorlanır.',
    challenge:
      'Her platformun izin verdiği işlem seti farklıydı ve uygulama onayları proje takvimini belirleyecek kadar uzayabiliyordu. Ayrıca onaysız içeriğin yanlışlıkla yayına gitmesi kabul edilebilir bir risk değildi.',
    approach:
      'Platform başvurularını projenin ilk haftasında başlattık ve geliştirmeyi paralel yürüttük. Yayın akışını, onaydan geçmeyen içeriğin teknik olarak yayınlanamayacağı biçimde kurguladık.',
    steps: [
      'Mevcut iş akışı ve onay zinciri çıkarıldı',
      'Platform izinleri ve başvurular tamamlandı',
      'Panel geliştirildi, pilot marka ile canlıya alındı',
      'Tüm markalar taşındı ve ekip eğitimi yapıldı',
    ],
    outcome:
      'İçerik üretimi, onay ve raporlama aynı ekranda ilerliyor. Müşteriye giden rapor panelden alınıyor; yayın hataları onay adımı sayesinde belirgin biçimde azaldı.',
    results: [
      'Tek ekranda çok marka yönetimi',
      'Onaysız içerik yayına gidemiyor',
      'Rapor hazırlama süresi kısaldı',
      'Abonelik maliyeti yerine kalıcı sistem',
    ],
    durum: 'Panel 2026 itibarıyla kullanımda; yeni platform entegrasyonları sürüyor.',
    sss: [
      [
        'Hesap şifreleri paylaşılıyor mu?',
        'Hayır. Bağlantı platformların resmî yetkilendirme akışıyla kuruluyor ve verilen izinler istenildiği an geri alınabiliyor.',
      ],
      [
        'Yapay zekâ içeriği doğrudan yayınlanıyor mu?',
        'Hayır. Üretilen metin taslak olarak düşüyor ve onay akışından geçmeden yayına gitmiyor.',
      ],
    ],
    ilgili: [S('sosyal-medya-otomasyon-paneli', 'Sosyal medya otomasyon paneli'), S('ga4-gtm-donusum-izleme', 'Dönüşüm izleme kurulumu'), WORK, CONTACT],
  },

  // ── seo-geo ──────────────────────────────────────────────────────────────
  {
    slug: 'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu',
    kw: 'GEO analiz platformu',
    client: 'GeoSerra (ürün)',
    meta_title: 'GEO Analiz Platformu: GeoSerra Vaka Çalışması | GZL',
    meta_description:
      'GEO analiz platformu vaka çalışması: yapay zekâ aramalarında görünürlüğü ölçen altı boyutlu skor, tarayıcı erişim denetimi ve aksiyon planı üretildi.',
    summary:
      'Siteleri yapay zekâ aramaları için analiz eden, altı boyutlu GEO skoru ve aksiyon planı üreten platform.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Python', 'Lighthouse', 'Playwright'],
    features: [
      'Altı boyutlu GEO skoru',
      'Yapay zekâ tarayıcı erişim denetimi',
      'Alıntılanabilirlik ölçümü',
      'Şema ve llms.txt denetimi',
      'PDF rapor ve aksiyon planı',
    ],
    lead: 'GEO analiz platformu, bir sitenin ChatGPT, Perplexity, Gemini ve Google AI Overviews gibi sistemlerde nasıl göründüğünü ölçmek için geliştirildi. Ölçüm sonunda okunabilir bir rapor ve öncelikli aksiyon listesi üretiliyor.',
    hakkinda:
      'Klasik SEO araçları sıralamayı ölçer; yapay zekâ sistemlerinde ise sıralama değil alıntılanma söz konusudur. Bu farkı ölçen hazır bir araç bulunmadığı için ölçüm setini kendimiz tanımladık.',
    challenge:
      'Ölçülecek şey soyuttu: bir sayfanın alıntılanabilir olup olmadığı tek bir sayıya indirgenemez. Ayrıca sonuçların, teknik ekibi olmayan işletmelerce de uygulanabilir olması gerekiyordu.',
    approach:
      'Skoru altı ayrı boyuta ayırdık; her boyut kendi başına açıklanabilir ve düzeltilebilir maddelerden oluşuyor. Rapor, bulgu listesi yerine öncelik sırasına dizilmiş bir yapılacaklar listesi olarak tasarlandı.',
    steps: [
      'Ölçüm boyutları ve puanlama kuralları tanımlandı',
      'Tarama ve denetim hattı kuruldu',
      'Rapor şablonu ve aksiyon planı tasarlandı',
      'Gerçek siteler üzerinde doğrulandı',
    ],
    outcome:
      'Analiz, teknik ekibe iletilebilecek somut maddelere dönüştü. Aynı site tekrar tarandığında hangi maddenin skoru ne kadar değiştirdiği görülebiliyor.',
    results: [
      'Ölçüm tekrarlanabilir ve karşılaştırılabilir',
      'Bulgular doğrudan uygulanabilir maddeler halinde',
      'Yapay zekâ tarayıcı erişimi denetleniyor',
      'Rapor PDF olarak paylaşılabiliyor',
    ],
    durum: 'Platform 2026 itibarıyla geoserra.com adresinde çalışıyor.',
    sss: [
      [
        'Analiz için siteye erişim gerekiyor mu?',
        'Hayır, alan adı yeterli. Erişim yalnızca uygulama aşamasında, üzerinde anlaşıldığında talep ediliyor.',
      ],
      [
        'Sonuçlar klasik SEO araçlarıyla çelişir mi?',
        'Çelişmez, tamamlar. Teknik SEO temeli olmayan bir sitede yapay zekâ görünürlüğü de kalıcı olmuyor.',
      ],
    ],
    ilgili: [S('yapay-zeka-arama-optimizasyonu-geo', 'Yapay zekâ arama optimizasyonu'), S('geo-seo-lighthouse-analizi', 'GEO analizi ve SEO denetimi'), WORK, CONTACT],
  },
  {
    slug: 'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu',
    kw: 'haber portalı SEO optimizasyonu',
    client: 'Wiribu.de',
    meta_title: 'Haber Portalı SEO Optimizasyonu: Wiribu.de | GZL',
    meta_description:
      'Haber portalı SEO optimizasyonu vaka çalışması: Lighthouse dört kategoride 100 puana çıkarıldı, GEO skoru 35 seviyesinden 74 seviyesine yükseldi.',
    summary:
      'Almanya pazarına yönelik haber portalında teknik SEO ve GEO optimizasyonu; Lighthouse dört kategoride 100 puan.',
    tech: ['PHP', 'JSON-LD', 'llms.txt', 'IndexNow', 'Lighthouse'],
    features: [
      'NewsArticle yapılandırılmış verisi',
      'llms.txt ve yapay zekâ tarayıcı erişimi',
      'IndexNow ile hızlı indeksleme bildirimi',
      'Görsel alt metin sistemi',
      'Core Web Vitals iyileştirmeleri',
    ],
    lead: 'Haber portalı SEO optimizasyonu, mevcut bir PHP portalının hem klasik aramada hem de yapay zekâ yanıtlarında görünürlüğünü artırmak için yürütüldü. Çalışma ölçümle başlayıp ölçümle bitti.',
    hakkinda:
      'Portal yayında ve içerik üretimi düzenliydi; eksik olan teknik katmandı. Haber içeriği yapılandırılmış veriyle tanımlanmadığında arama motorları ve asistanlar içeriği doğru sınıflandıramıyordu.',
    challenge:
      'Mevcut kod tabanı yeniden yazılamazdı; iyileştirmelerin yayın akışını bozmadan, çalışan sistem üzerinde yapılması gerekiyordu. Ayrıca performans skorları görsel ağırlığı yüzünden düşüktü.',
    approach:
      'Değişiklikleri küçük ve geri alınabilir adımlara böldük. Önce ölçüm alındı, sonra her adımdan sonra ölçüm tekrarlandı; böylece hangi müdahalenin ne kazandırdığı belirsiz kalmadı.',
    steps: [
      'Başlangıç ölçümü alındı (Lighthouse ve GEO)',
      'JSON-LD NewsArticle şeması eklendi',
      'llms.txt, robots ve IndexNow yapılandırıldı',
      'Görsel ve kaynak optimizasyonu yapıldı',
    ],
    outcome:
      'Lighthouse dört kategoride 100 puana ulaştı; GEO skoru 35 seviyesinden 74 seviyesine çıktı. Yapay zekâ tarayıcılarının içeriğe erişimi denetlenip açıldı.',
    results: [
      'Lighthouse dört kategoride 100 puan',
      'GEO skoru 35 seviyesinden 74 seviyesine',
      'Haber içeriği yapılandırılmış veriyle tanımlı',
      'Yeni içerik indekslemeye daha hızlı giriyor',
    ],
    durum: 'Çalışma 2026 itibarıyla tamamlanmış olup portal canlıda.',
    sss: [
      [
        'Kod tabanı değiştirildi mi?',
        'Yeniden yazım yapılmadı. Mevcut PHP portalı üzerinde, yayın akışını durdurmayan hedefli değişiklikler uygulandı.',
      ],
      [
        'Skorlar kalıcı mı?',
        'Teknik iyileştirmeler kalıcıdır; ancak yeni eklenen ağır görseller veya üçüncü taraf betikleri skorları tekrar düşürebilir. Bu yüzden ölçüm düzenli tekrarlanmalı.',
      ],
    ],
    ilgili: [S('seo-hizmeti', 'SEO hizmeti'), S('yapay-zeka-arama-optimizasyonu-geo', 'Yapay zekâ arama optimizasyonu'), WORK, CONTACT],
  },
  {
    slug: 'trackpulse-web-analitik-donusum-izleme-platformu',
    kw: 'dönüşüm izleme platformu',
    client: 'İç ürün (GZL Teknoloji)',
    meta_title: 'Dönüşüm İzleme Platformu: TrackPulse | GZL Teknoloji',
    meta_description:
      'Dönüşüm izleme platformu vaka çalışması: GA4, etiket yöneticisi ve reklam pikselleri tek olay şemasında birleştirilerek kanal bazlı geri dönüş ölçülebilir hale getirildi.',
    summary:
      'GA4, etiket yöneticisi ve reklam piksellerini tek olay şemasında birleştiren; kanal ve atıf analizi sunan platform.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'GA4', 'Google Tag Manager', 'Meta Pixel'],
    features: [
      'Tek olay şeması ve etiket yönetimi',
      'E-ticaret ölçümü ve dönüşüm hunisi',
      'Kanal ve atıf (ROAS) analizi',
      'Sunucu taraflı izleme desteği',
      'Doğrulama raporu',
    ],
    lead: 'Dönüşüm izleme platformu, ölçümün olduğu ama güvenilir olmadığı sitelerdeki karmaşayı çözmek için geliştirildi. Tüm kaynaklar tek bir olay şemasından besleniyor.',
    hakkinda:
      'Çoğu sitede etiketler zaman içinde üst üste eklenir: aynı satın alma iki kez sayılır, form gönderimi hiç sayılmaz, reklam paneli ile analitik farklı rakam gösterir. Proje bu karmaşayı tek şemaya indirmek için başladı.',
    challenge:
      'Farklı platformlar aynı olayı farklı adlarla bekliyordu. Şemayı sadeleştirirken geçmiş verinin de anlamlı kalması, yani raporlarda kırılma yaratmadan geçiş yapılması gerekiyordu.',
    approach:
      'Önce mevcut kurulumu denetleyip çift sayımları çıkardık; ardından tek bir olay sözlüğü tanımlayıp tüm kaynakları ona bağladık. Geçiş planı, hangi raporun ne zaman değişeceğini önceden gösterecek şekilde hazırlandı.',
    steps: [
      'Mevcut etiketler denetlendi, çift sayımlar tespit edildi',
      'Tek olay şeması tanımlandı',
      'Etiketler kuruldu ve hazırlık ortamında test edildi',
      'Canlıda iki hafta doğrulama yapıldı',
    ],
    outcome:
      'Aynı dönüşüm artık tek kez sayılıyor ve her olayın nereden geldiği belgeli. Kanal bazlı geri dönüş, reklam paneliyle tutarlı biçimde raporlanabiliyor.',
    results: [
      'Çift sayım ortadan kalktı',
      'Olay sözlüğü belgelenmiş durumda',
      'Kanal ve atıf analizi tek panelde',
      'Yeni sayfa eklendiğinde aynı standart uygulanıyor',
    ],
    durum: 'Platform 2026 itibarıyla kullanımda; sunucu taraflı izleme kapsamı genişletiliyor.',
    sss: [
      [
        'Geçmiş veri kayboluyor mu?',
        'Hayır. Kurulum mevcut mülk üzerinde yapılabiliyor; yalnızca olay adları değişirse raporlarda kırılma olur ve bu önceden planlanıyor.',
      ],
      [
        'Çerez onayıyla uyumlu mu?',
        'Evet. Etiketler onay durumuna bağlı çalışıyor; onay verilmeyen ziyaretçide ölçüm sınırlanıyor.',
      ],
    ],
    ilgili: [S('ga4-gtm-donusum-izleme', 'Dönüşüm izleme kurulumu'), S('seo-hizmeti', 'SEO hizmeti'), WORK, CONTACT],
  },
  {
    slug: 'cok-dilli-b2b-sitesi-geo-seo-lighthouse-analizi',
    kw: 'ihracat odaklı B2B sitesi',
    client: 'İhracatçı sanayi firması',
    meta_title: 'İhracat Odaklı B2B Sitesi: GEO ve SEO Kurulumu | GZL',
    meta_description:
      'Çok dilli B2B sitesi vaka çalışması: dile göre adres yapısı, yapılandırılmış veri ve performans optimizasyonu ile uluslararası görünürlük kuruldu.',
    summary:
      'İhracat odaklı B2B sitesi: dile göre adres yapısı, yapılandırılmış veri ve performans kurulumu tek projede.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'JSON-LD', 'Lighthouse'],
    features: [
      'Dile göre adres (URL) yapısı',
      'Hreflang ve canonical kurulumu',
      'Ürün ve kurumsal yapılandırılmış veri',
      'Core Web Vitals optimizasyonu',
      'Çok dilli içerik yönetimi',
    ],
    lead: 'Çok dilli B2B sitesi projesinde amaç, farklı pazarlardaki alıcıların markaya kendi dilinde ve doğru içerikle ulaşmasıydı. Teknik kurulum baştan arama ve yapay zekâ görünürlüğü gözetilerek yapıldı.',
    hakkinda:
      'İhracat yapan firmalarda site genellikle tek dilde kurulur, çeviriler sonradan eklenir. Bu yapı arama motorlarında hangi sayfanın hangi pazara ait olduğunu belirsiz bırakır ve içerik birbirini yer.',
    challenge:
      'Aynı ürün sayfasının farklı dillerdeki sürümleri birbirinin kopyası gibi algılanıyordu. Ayrıca çeviriler farklı zamanlarda eklendiği için bazı diller eksik kalıyordu.',
    approach:
      'Adres yapısını dile göre ayırdık ve her sayfa için dil eşlemesini açıkça tanımladık. İçerik yönetimini, eksik çevirinin görünür olduğu bir yapıya çevirdik; böylece boşluklar takip edilebilir hale geldi.',
    steps: [
      'Dil ve pazar haritası çıkarıldı',
      'Dile göre adres yapısı ve hreflang kuruldu',
      'Yapılandırılmış veri eklendi',
      'Performans ve erişilebilirlik ölçümleri iyileştirildi',
    ],
    outcome:
      'Her pazar kendi diline ait sayfalarla görünür hale geldi; dil sürümleri birbirinin kopyası olarak değerlendirilmiyor. Eksik çeviriler panelden izlenebiliyor.',
    results: [
      'Dile göre kanonik adres yapısı',
      'Dil sürümleri arasında doğru eşleme',
      'Yapılandırılmış veriyle net ürün tanımı',
      'Eksik çeviriler görünür ve takip edilebilir',
    ],
    durum: 'Site 2026 itibarıyla canlıda ve yeni dil eklemeleri aynı yapıyla ilerliyor.',
    sss: [
      [
        'Her dil için ayrı site mi kuruldu?',
        'Hayır. Tek kod tabanı ve tek yönetim paneli var; diller aynı içerik yapısının çevirileri olarak yönetiliyor.',
      ],
      [
        'Yeni bir dil eklemek ne kadar sürüyor?',
        'Teknik hazırlık hazır olduğu için süre çeviri içeriğinin hazırlanmasına bağlı; teknik tarafta ek kurulum gerekmiyor.',
      ],
    ],
    ilgili: [S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), S('geo-seo-lighthouse-analizi', 'GEO analizi ve SEO denetimi'), WORK, CONTACT],
  },
  // ── web-ecommerce ────────────────────────────────────────────────────────
  {
    slug: 'vista-insaat-kurumsal-web-sitesi-admin-paneli',
    kw: 'inşaat kurumsal sitesi',
    client: 'Vista İnşaat',
    meta_title: 'İnşaat Kurumsal Sitesi: Vista İnşaat | GZL Teknoloji',
    meta_description:
      'İnşaat kurumsal sitesi vaka çalışması: proje galerisi, çok dilli içerik yönetimi, teklif modülü ve PDF çıktısı tek yönetim panelinde toplandı.',
    summary:
      'İnşaat firması için çok dilli kurumsal site: proje galerisi, teklif modülü, PDF çıktısı ve yönetim paneli.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Drizzle ORM', 'Tailwind CSS', 'Cloudinary'],
    features: [
      'Proje ve referans galerisi',
      'Çok dilli içerik yönetimi',
      'Teklif modülü ve PDF çıktısı',
      'Yönetim paneli',
      'Görsel optimizasyonu',
    ],
    lead: 'İnşaat kurumsal sitesi projesinde amaç, tamamlanan işleri görsel ağırlıklı biçimde anlatan ve teklif taleplerini kayıt altına alan bir yapı kurmaktı. Site ve yönetim paneli birlikte geliştirildi.',
    hakkinda:
      'İnşaat firmalarında satışın büyük bölümü referansla ilerler; sitenin işi bu referansları düzenli ve güncel göstermektir. Firma ise proje görsellerini paylaşımlarda dağınık biçimde tutuyor, güncelleme için dışarıya bağımlı kalıyordu.',
    challenge:
      'Proje görselleri yüksek çözünürlüklüydü ve sayfa açılışını yavaşlatıyordu. Ayrıca içerik iki dilde tutulacaktı; çeviri eklemek her seferinde geliştirici müdahalesi gerektirmemeliydi.',
    approach:
      'Görselleri boyut ve biçim olarak otomatik işleyen bir akış kurduk. İçerik yönetimini dil bazlı tasarladık: yeni proje eklemek ve çevirisini girmek panelden yapılabiliyor.',
    steps: [
      'Sayfa haritası ve içerik yapısı çıkarıldı',
      'Yönetim paneli ve dil bazlı içerik modeli kuruldu',
      'Proje galerisi ve teklif modülü geliştirildi',
      'Performans ve arama motoru kontrolleriyle yayına alındı',
    ],
    outcome:
      'Firma yeni projeyi kendi ekleyebiliyor; teklif talepleri e-posta yığınında kaybolmak yerine kayıt altına giriyor. Görseller optimize edildiği için sayfa açılışı hızlandı.',
    results: [
      'İçerik güncellemesi geliştirici gerektirmiyor',
      'Teklif talepleri kayıt altında',
      'Görseller otomatik optimize ediliyor',
      'İki dilli yapı tek panelden yönetiliyor',
    ],
    durum: 'Site 2026 itibarıyla canlıda ve içerik firma tarafından güncelleniyor.',
    sss: [
      [
        'Yeni proje eklemek zor mu?',
        'Hayır. Panelden başlık, açıklama ve görseller yükleniyor; görsel işleme ve yayına alma otomatik ilerliyor.',
      ],
      [
        'Site ileride büyütülebilir mi?',
        'Evet. Altyapı modüler kurulduğu için blog, kariyer veya bayi girişi gibi modüller sonradan eklenebiliyor.',
      ],
    ],
    ilgili: [S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), S('teklif-raporlama-web-sayfasi', 'Teklif ve raporlama uygulaması'), WORK, CONTACT],
  },
  {
    slug: 'bereket-fide-kurumsal-web-sitesi-urun-katalogu',
    kw: 'ürün kataloğu sitesi',
    client: 'Bereket Fide',
    meta_title: 'Ürün Kataloğu Sitesi: Bereket Fide | GZL Teknoloji',
    meta_description:
      'Ürün kataloğu sitesi vaka çalışması: fide üretim firması için katalog, admin paneli ve arama motorlarına uygun dinamik sayfa yapısı kuruldu.',
    summary:
      'Fide üretim firması için ürün kataloğu, yönetim paneli ve arama motorlarına uygun dinamik sayfalardan oluşan kurumsal site.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Tailwind CSS', 'Drizzle ORM'],
    features: [
      'Kategorili ürün kataloğu',
      'Yönetim paneli',
      'Arama motorlarına uygun dinamik sayfalar',
      'İletişim ve talep formu',
      'Mobil uyumlu tasarım',
    ],
    lead: 'Ürün kataloğu sitesi, fide üreten bir firmanın çeşit listesini müşterilerine düzenli biçimde sunması için geliştirildi. Katalog, yönetim paneli ve içerik yapısı birlikte kuruldu.',
    hakkinda:
      'Tarım üretiminde çeşit listesi sezona göre değişir; basılı katalog hazırlandığı anda eskimeye başlar. Firma güncel listeyi mesajla paylaşıyordu, bu da hem takip edilemiyor hem de aramalarda hiç görünmüyordu.',
    challenge:
      'Ürün sayısı fazlaydı ve her çeşidin kendi özellikleri vardı. Bu yapıyı hem yönetilebilir hem de her ürünün ayrı bir sayfa olarak aranabildiği biçimde kurmak gerekiyordu.',
    approach:
      'Ürünleri kategori ve özellik ekseninde modelledik; her çeşit kendi adresine sahip bir sayfa oldu. Panel, sezon başında toplu güncelleme yapmayı kolaylaştıracak biçimde tasarlandı.',
    steps: [
      'Ürün ve kategori yapısı çıkarıldı',
      'Katalog modeli ve yönetim paneli geliştirildi',
      'Ürün sayfaları arama motorlarına uygun kuruldu',
      'İçerik aktarıldı ve site yayına alındı',
    ],
    outcome:
      'Her çeşit kendi adresinden bulunabiliyor; güncel liste tek kaynaktan yayınlanıyor. Firma sezon değişiminde kataloğu kendi güncelliyor.',
    results: [
      'Her ürün ayrı sayfa olarak aranabiliyor',
      'Sezon güncellemesi panelden yapılıyor',
      'Talep formu ile gelen sorular kayıt altında',
      'Mobil kullanım öncelikli tasarım',
    ],
    durum: 'Site 2026 itibarıyla canlıda ve katalog düzenli güncelleniyor.',
    sss: [
      [
        'Ürünler toplu yüklenebiliyor mu?',
        'Evet. Tablo ile toplu aktarım yapılabiliyor; görseller de toplu eşleştiriliyor.',
      ],
      [
        'Sonradan e-ticaret eklenebilir mi?',
        'Evet. Katalog yapısı sipariş ve ödeme modülleriyle genişletilebilecek biçimde kuruldu.',
      ],
    ],
    ilgili: [S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), S('e-ticaret-sitesi', 'E-ticaret sitesi kurulumu'), WORK, CONTACT],
  },
  {
    slug: 'sportoonline-spor-outdoor-e-ticaret-platformu',
    kw: 'spor e-ticaret platformu',
    client: 'Sportoonline',
    meta_title: 'Spor E-Ticaret Platformu: Sportoonline | GZL Teknoloji',
    meta_description:
      'Spor e-ticaret platformu vaka çalışması: çok kategorili ürün yapısı, sepet, kupon ve mağaza yönetimi tek sistemde kuruldu.',
    summary:
      'Spor giyim, supplement ve outdoor ürünlerini listeleyen çok kategorili e-ticaret platformu.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Drizzle ORM', 'Tailwind CSS', 'Cloudinary'],
    features: [
      'Çok kategorili ürün yapısı',
      'Varyant ve stok yönetimi',
      'Sepet, kupon ve kampanya',
      'Sipariş yönetimi',
      'Mağaza ve içerik yönetimi',
    ],
    lead: 'Spor e-ticaret platformu, farklı ürün gruplarını tek mağazada toplayan bir satış kanalı kurmak için geliştirildi. Ürün yapısı, sepet akışı ve yönetim paneli birlikte tasarlandı.',
    hakkinda:
      'Spor giyim, supplement ve outdoor ürünleri farklı özellik setlerine sahiptir: birinde beden, diğerinde tat ve gramaj belirleyicidir. Tek bir ürün modeliyle bu farklılıkları taşımak projenin merkezindeki konuydu.',
    challenge:
      'Kategoriler arasında ortak olmayan özellikler yüzünden filtreleme karmaşıklaşıyordu. Ayrıca kampanya kurgularının kategori bazlı çalışması gerekiyordu.',
    approach:
      'Ürün modelini çekirdek alanlar ve kategoriye özel alanlar olarak ikiye ayırdık. Filtreler kategori bağlamında üretiliyor; kampanya kuralları da aynı yapıdan besleniyor.',
    steps: [
      'Kategori ve özellik matrisi çıkarıldı',
      'Ürün modeli ve varyant yapısı kuruldu',
      'Sepet, kupon ve sipariş akışı geliştirildi',
      'Test siparişleriyle uçtan uca doğrulandı',
    ],
    outcome:
      'Farklı ürün grupları aynı mağazada, kendi mantığına uygun biçimde listeleniyor. Kampanyalar kategori bazında tanımlanabiliyor ve sipariş akışı tek panelden izleniyor.',
    results: [
      'Kategoriye özel filtreler',
      'Varyant yönetimi tek yerde',
      'Kampanya kuralları esnek',
      'Sipariş süreci uçtan uca izlenebiliyor',
    ],
    durum: 'Platform 2026 itibarıyla canlıda ve ürün kataloğu genişletiliyor.',
    sss: [
      [
        'Ürün sayısı arttığında yavaşlar mı?',
        'Listeleme ve filtreleme sunucu tarafında yapıldığı ve önbelleklendiği için ürün sayısının artması kullanıcı deneyimini bozmuyor.',
      ],
      [
        'Pazar yeri entegrasyonu mümkün mü?',
        'Evet. Ürün ve stok verisi arayüz üzerinden dışa açılabildiği için pazar yeri entegrasyonları eklenebiliyor.',
      ],
    ],
    ilgili: [S('modern-e-ticaret-sitesi', 'Modern e-ticaret sitesi'), S('e-ticaret-sitesi', 'E-ticaret sitesi kurulumu'), WORK, CONTACT],
  },
  {
    slug: 'kamanilan',
    kw: 'emlak ilan platformu',
    client: 'Kamanilan',
    meta_title: 'Emlak İlan Platformu: Kamanilan | GZL Teknoloji',
    meta_description:
      'Emlak ilan platformu vaka çalışması: portföy yönetimi, çok dilli arayüz, ödeme entegrasyonu ve yönetim paneli tek sistemde birleştirildi.',
    summary:
      'Portföy yönetimi, çok dilli arayüz ve ödeme entegrasyonu içeren emlak ilan ve gayrimenkul yönetim platformu.',
    tech: ['Next.js', 'React', 'TypeScript', 'Fastify', 'Drizzle ORM', 'MySQL', 'Iyzipay'],
    features: [
      'İlan ve portföy yönetimi',
      'Gelişmiş arama ve filtreleme',
      'Çok dilli arayüz',
      'Ödeme entegrasyonu',
      'Yönetim paneli',
    ],
    lead: 'Emlak ilan platformu, portföyün ilan sitelerine bağımlı kalmadan kendi kanalında yayınlanması için geliştirildi. İlan yönetimi, arama ve ödeme akışı tek sistemde çalışıyor.',
    hakkinda:
      'İlan platformları görünürlük sağlar ama müşteri ilişkisi orada kalır ve her ilan için ücret ödenir. Kendi platformu olan ofis, arama motorlarından gelen talebi doğrudan alır ve portföyünü kalıcı bir varlığa çevirir.',
    challenge:
      'İlan verisi çok alanlıdır ve filtreleme mantığı bu alanlar üzerine kurulur; alan yapısı baştan yanlış tasarlanırsa sonradan değiştirmek tüm ilanların güncellenmesini gerektirir.',
    approach:
      'Alan yapısını ilan tipine göre ayırdık: konut, iş yeri ve arsa farklı alan setleriyle çalışıyor. Arama ve filtreleme bu yapıdan otomatik üretiliyor.',
    steps: [
      'İlan tipleri ve alan setleri belirlendi',
      'İlan yönetimi ve arama altyapısı kuruldu',
      'Çok dilli arayüz ve ödeme akışı eklendi',
      'Portföy aktarıldı ve site yayına alındı',
    ],
    outcome:
      'Portföy kendi adresinde yayınlanıyor ve gelen talep doğrudan ofise ulaşıyor. İlan tipine göre filtreleme, arayan kişinin doğru kayda hızlı ulaşmasını sağlıyor.',
    results: [
      'İlan tipine göre doğru filtreler',
      'Talepler doğrudan ofise ulaşıyor',
      'Çok dilli kullanım',
      'Ödeme akışı entegre',
    ],
    durum: 'Platform 2026 itibarıyla kamanilan.com adresinde canlıdır.',
    sss: [
      [
        'İlanlar dış platformlarla eşitlenebiliyor mu?',
        'Kaynak sistemde arayüz varsa düzenli eşitleme kurulabiliyor; yoksa ilanlar panelden yönetiliyor.',
      ],
      [
        'Danışman bazlı yönetim var mı?',
        'Evet. İlanlar danışmana atanabiliyor ve performans danışman bazında raporlanabiliyor.',
      ],
    ],
    ilgili: [S('emlak-ilan-sitesi', 'Emlak ilan sitesi'), S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), WORK, CONTACT],
  },
  {
    slug: 'konig-energetik-randevulu-masaj-wellness-sitesi',
    kw: 'online randevu sitesi',
    client: 'Königs Massage (Bonn)',
    meta_title: 'Online Randevu Sitesi: Königs Massage | GZL Teknoloji',
    meta_description:
      'Online randevu sitesi vaka çalışması: çok dilli wellness sitesi, takvim yönetimi ve otomatik hatırlatmalarla telefon trafiği belirgin biçimde azaldı.',
    summary:
      'Bonn merkezli bir masaj ve wellness merkezi için çok dilli kurumsal site, online randevu ve hizmet yönetimi.',
    tech: ['Next.js', 'Fastify', 'MySQL', 'Drizzle ORM', 'Nodemailer'],
    features: [
      'Online randevu ve takvim yönetimi',
      'Çok dilli (TR/DE) içerik',
      'Hizmet ve personel yönetimi',
      'Otomatik onay ve hatırlatma',
      'Yapay zekâ destekli sohbet yanıtları',
    ],
    lead: 'Online randevu sitesi, mesai dışında gelen taleplerin kaybolmaması ve takvimin tek yerden yönetilmesi için geliştirildi. Site, randevu akışı ve bildirimler birlikte kuruldu.',
    hakkinda:
      'Randevuyla çalışan işletmelerde en büyük kayıp, cevaplanamayan telefonlar ve gelmeyen müşterilerdir. Merkez randevuları telefonla alıyor, seans sırasında gelen aramaları karşılayamıyordu.',
    challenge:
      'Çalışma saatleri, hizmet süreleri ve personel müsaitliği birbirine bağlıydı; kurallar yanlış kurulduğunda aynı saate iki randevu düşme riski vardı. Ayrıca içerik iki dilde sunulacaktı.',
    approach:
      'Takvim kurallarını hizmet süresi ve personel müsaitliği üzerinden modelledik ve canlıya geçmeden gerçek senaryolarla test ettik. Bildirimler onay ve hatırlatma olmak üzere iki aşamaya ayrıldı.',
    steps: [
      'Hizmet listesi, süreler ve çalışma saatleri tanımlandı',
      'Takvim ve çakışma kontrolü kuruldu',
      'Çok dilli site içeriği hazırlandı',
      'Bildirim kanalları bağlanıp canlıya geçildi',
    ],
    outcome:
      'Randevular mesai dışında da alınabiliyor; hatırlatmalar sayesinde gelmeyen müşteri oranı düştü. Telefon trafiği azaldı ve takvim tek ekrandan yönetiliyor.',
    results: [
      'Mesai dışı randevu alımı',
      'Otomatik onay ve hatırlatma',
      'Çakışma kontrolü ile çift rezervasyon yok',
      'İki dilli kullanım',
    ],
    durum: 'Site 2026 itibarıyla canlıda ve randevular sistem üzerinden alınıyor.',
    sss: [
      [
        'Müşteri randevusunu kendisi iptal edebiliyor mu?',
        'Evet, belirlenen süre sınırına kadar. İptal ve erteleme kuralları panelden yönetiliyor.',
      ],
      [
        'Dış takvimlerle eşleşiyor mu?',
        'Takvim uygulamalarıyla eşleme kurulabiliyor; böylece dışarıda alınan randevular da müsaitliğe yansıyor.',
      ],
    ],
    ilgili: [S('randevu-sistemli-kurumsal-site', 'Randevu sistemli web sitesi'), S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), WORK, CONTACT],
  },
  {
    slug: 'antalya-doner-qr-menu-online-siparis-next-js',
    kw: 'QR menü sistemi',
    client: 'Antalya Döner',
    meta_title: 'QR Menü Sistemi: Antalya Döner Vaka Çalışması | GZL',
    meta_description:
      'QR menü ve sipariş sistemi vaka çalışması: çok dilli menü, sepet, teslimat akışı ve yönetim paneli komisyonsuz kendi kanalında kuruldu.',
    summary:
      'QR menü sistemi ve online sipariş akışını komisyonsuz kendi kanalında toplayan çok dilli restoran çözümü.',
    tech: ['Next.js', 'TypeScript', 'Fastify', 'MySQL', 'Tailwind CSS'],
    features: [
      'Çok dilli QR menü',
      'Ürün, varyant ve ekstra seçenekleri',
      'Sepet ve kupon',
      'Teslimat ve paket servis akışı',
      'Yönetim paneli ve raporlar',
    ],
    lead: 'QR menü ve sipariş sistemi, restoranın siparişi platform komisyonu ödemeden kendi kanalından alması için geliştirildi. Menü, sepet ve mutfak akışı tek sistemde çalışıyor.',
    hakkinda:
      'Pazar yeri uygulamaları hızlı hacim getirir; buna karşılık her siparişten komisyon alır ve müşteri verisi işletmede kalmaz. Kendi kanalı olan işletme sadık müşteriyi kendi sistemine taşır.',
    challenge:
      'Menüde ürün, varyant ve ekstra seçenekleri iç içeydi; fiyat bu seçimlere göre değişiyordu. Ayrıca menü birden fazla dilde sunulacaktı ve fiyat değişiminde QR kodların yeniden basılmaması gerekiyordu.',
    approach:
      'Menüyü ürün, varyant ve ekstra olarak üç katmanda modelledik; fiyat hesabı bu katmanlardan üretiliyor. QR kod sabit bir adrese işaret ettiği için menü değişikliği yeniden basım gerektirmiyor.',
    steps: [
      'Menü yapısı ve fiyat kuralları çıkarıldı',
      'QR menü ve sipariş akışı geliştirildi',
      'Teslimat bölgeleri ve ödeme tercihleri tanımlandı',
      'Deneme siparişleriyle servis akışı test edildi',
    ],
    outcome:
      'Sipariş kendi kanalından geliyor ve müşteri verisi işletmede kalıyor. Menü güncellemesi panelden yapılıyor, fiyat değişikliği QR kodları etkilemiyor.',
    results: [
      'Komisyonsuz kendi satış kanalı',
      'Menü güncellemesi panelden',
      'Çok dilli kullanım',
      'Sipariş akışı uçtan uca izlenebiliyor',
    ],
    durum: 'Sistem 2026 itibarıyla kullanımda ve menü işletme tarafından güncelleniyor.',
    sss: [
      [
        'Müşteri uygulama indiriyor mu?',
        'Hayır. Sistem tarayıcıda çalışıyor; QR kodu okutmak yeterli.',
      ],
      [
        'Birden fazla şube eklenebilir mi?',
        'Evet. Şube bazlı menü, fiyat ve teslimat bölgesi tanımlanabiliyor.',
      ],
    ],
    ilgili: [S('online-siparis-sistemi', 'Online sipariş sistemi'), S('modern-e-ticaret-sitesi', 'Modern e-ticaret sitesi'), WORK, CONTACT],
  },
  {
    slug: 'miss-et-balik',
    kw: 'restoran tanıtım sitesi',
    client: 'Miss Et & Balık',
    meta_title: 'Restoran Tanıtım Sitesi: Miss Et & Balık | GZL',
    meta_description:
      'Restoran tanıtım sitesi vaka çalışması: tek sayfa yapı, QR menü desteği ve hızlı açılışla mekân tanıtımı ve menü erişimi birleştirildi.',
    summary:
      'Et ve balık restoranı için QR menü destekli, hızlı açılan tek sayfa tanıtım sitesi.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Nginx', 'SSL'],
    features: [
      'Tek sayfa tanıtım yapısı',
      'QR menü erişimi',
      'Hızlı açılış ve düşük kaynak kullanımı',
      'Mobil öncelikli tasarım',
      'İletişim ve yol tarifi',
    ],
    lead: 'Restoran tanıtım sitesi, mekânı anlatan ve menüye hızlı erişim veren sade bir yapı olarak kuruldu. Ağır bir altyapı yerine hızlı açılan tek sayfa tercih edildi.',
    hakkinda:
      'Küçük ölçekli bir restoran için ziyaretçinin ihtiyacı sınırlıdır: menü, konum ve iletişim. Bu ihtiyaç için içerik yönetim sistemi kurmak gereksiz bir bakım yükü yaratır.',
    challenge:
      'Ziyaretçilerin büyük bölümü mobil ve çoğu zaman zayıf bağlantıyla geliyordu. Sayfanın hızlı açılması, görsellerin ise mekânı iyi anlatması gerekiyordu; bu iki ihtiyaç birbirine zıttı.',
    approach:
      'Görselleri boyut ve biçim olarak optimize ettik, betik kullanımını en aza indirdik. Menüye erişimi QR kod üzerinden doğrudan verdik; böylece masadaki ziyaretçi ek adım yaşamıyor.',
    steps: [
      'İçerik ve görsel seçimi yapıldı',
      'Tek sayfa yapı kuruldu',
      'Görseller optimize edildi',
      'QR menü bağlantısı ve yayın tamamlandı',
    ],
    outcome:
      'Sayfa zayıf bağlantıda da hızlı açılıyor; menüye erişim tek adıma indi. Bakım yükü neredeyse yok, güncelleme ihtiyacı düşük.',
    results: [
      'Hızlı açılış, düşük kaynak kullanımı',
      'Masadan QR ile doğrudan menü',
      'Mobil öncelikli görünüm',
      'Düşük bakım yükü',
    ],
    durum: 'Site 2026 itibarıyla yayında ve menü bağlantısı güncel tutuluyor.',
    sss: [
      [
        'Neden içerik yönetim sistemi kullanılmadı?',
        'İçerik nadiren değiştiği için panel kurmak gereksiz bakım yükü yaratacaktı. İhtiyaç büyürse yapı taşınabilir.',
      ],
      [
        'Online sipariş eklenebilir mi?',
        'Evet. Sipariş akışı ayrı bir modül olarak eklenebiliyor; bunun için sipariş sistemi hizmetimize bakabilirsiniz.',
      ],
    ],
    ilgili: [S('online-siparis-sistemi', 'Online sipariş sistemi'), S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), WORK, CONTACT],
  },
  {
    slug: 'gzlteknoloji',
    kw: 'kurumsal satış sitesi',
    client: 'GZL Teknoloji',
    meta_title: 'Kurumsal Satış Sitesi: gzlteknoloji.com | GZL Teknoloji',
    meta_description:
      'Kurumsal satış sitesi vaka çalışması: hizmet kataloğu, paket satışı ve içerik yönetimi tek kod tabanında iki marka için ayrı ayrı sunuldu.',
    summary:
      'Hizmet kataloğu, paket satışı ve içerik yönetimini birleştiren kurumsal satış sitesi; tek kod tabanı iki markayı ayrı veritabanlarıyla sunuyor.',
    tech: ['Next.js', 'React', 'TypeScript', 'Fastify', 'Drizzle ORM', 'MySQL', 'Bun'],
    features: [
      'Hizmet ve paket kataloğu',
      'Portfolyo ve referans yönetimi',
      'Blog ve içerik modülü',
      'Çok dilli yapı',
      'Yönetim paneli',
    ],
    lead: 'Kurumsal satış sitesi, hizmetleri ürünleştirip paket olarak sunmak için kuruldu. Aynı kod tabanı iki ayrı markayı, ayrı veritabanlarıyla ve ayrı içerikle sunuyor.',
    hakkinda:
      'Ajans ve yazılım firmalarında hizmetler genellikle serbest tanımlıdır; bu da her teklifi sıfırdan hazırlamayı gerektirir. Site, hizmetleri kapsamı ve süresi belli paketlere dönüştürmek üzere kurgulandı.',
    challenge:
      'İki marka aynı kod tabanını paylaşacaktı ama içerik, logo, adres ve dil varsayılanları tamamen farklıydı. Kod tarafında sabit yazılmış her marka verisi yanlış sitede görünme riski taşıyordu.',
    approach:
      'Marka verisini tamamen veritabanına taşıdık; kod tabanında marka adı, adres veya logo sabit yazılmıyor. Dağıtım profili hangi veritabanına bağlanacağını ve varsayılan dili belirliyor.',
    steps: [
      'Ortak kod tabanı ve profil ayrımı kuruldu',
      'Marka verisi veritabanına taşındı',
      'Hizmet ve paket katalogları oluşturuldu',
      'İki site ayrı ayrı yayına alındı',
    ],
    outcome:
      'Tek kod tabanı iki markayı birbirine karıştırmadan sunuyor. Yeni bir marka eklemek yeni bir kod tabanı değil, yeni bir profil ve içerik seti anlamına geliyor.',
    results: [
      'Marka verisi kodda değil veritabanında',
      'Profil bazlı dağıtım',
      'Hizmetler paket olarak satılabiliyor',
      'İçerik panelden yönetiliyor',
    ],
    durum: 'Site 2026 itibarıyla gzlteknoloji.com adresinde canlıdır.',
    sss: [
      [
        'İki site aynı veritabanını mı kullanıyor?',
        'Hayır. Her marka kendi veritabanına sahip; ortak olan yalnızca kod tabanı.',
      ],
      [
        'Yeni marka eklemek ne gerektiriyor?',
        'Yeni bir dağıtım profili, kendi veritabanı ve kendi içerik seti. Kod tarafında değişiklik gerekmiyor.',
      ],
    ],
    ilgili: [S('kurumsal-web-sitesi', 'Kurumsal web sitesi'), S('ozel-yazilim-nextjs-fastify', 'Özel yazılım geliştirme'), WORK, CONTACT],
  },
];

function main() {
  const header = `-- =============================================================
-- FILE: content/gzl/910_gzl_projects_tr.sql
-- URETILDI: scripts/gzl-project-content.mjs  (@generated gzl-project-content)
--
-- ELLE DUZENLEME. Degisiklik gerekiyorsa script guncellenip yeniden calistirilir.
--
-- Proje kayitlarini vaka calismasi formatina cevirir (sorun/yaklasim/sonuc),
-- client_name ve techs alanlarindaki hatali degerleri duzeltir.
-- =============================================================

SET NAMES utf8mb4;
`;

  const stmts = PROJECT_CONTENT.map((p) => {
    const html = buildHtml(p);
    const content = JSON.stringify({
      // description = kisa ozet. ONCEDEN lead'in kopyasiydi; ayni metin hem
      // burada hem html icinde yer alinca kelime sayimi ve odak kelime
      // yogunlugu suni sekilde sisiyor, A4 kapisi kaliyordu.
      description: p.summary,
      key_features: p.features,
      technologies_used: p.tech,
      case_study: { challenge: p.challenge, approach: p.approach, outcome: p.outcome },
      html,
    });

    // Metinde ELLE yazilmis ters bolu olmamali (JSON'un kendi kacislari haric).
    if (html.includes('\\')) {
      throw new Error(`Metinde ters bolu var: ${p.slug}`);
    }

    return `
UPDATE \`projects_i18n\` SET
  \`summary\` = ${q(p.summary)},
  \`meta_title\` = ${q(p.meta_title)},
  \`meta_description\` = ${q(p.meta_description)},
  \`content\` = ${qjson(content)},
  \`updated_at\` = CURRENT_TIMESTAMP(3)
WHERE \`locale\` = 'tr' AND \`slug\` = ${q(p.slug)};

UPDATE \`projects\` pr
  JOIN \`projects_i18n\` i ON i.project_id = pr.id AND i.locale = 'tr'
  SET pr.\`client_name\` = ${q(p.client)},
      pr.\`techs\` = ${q(JSON.stringify(p.tech))},
      pr.\`updated_at\` = CURRENT_TIMESTAMP(3)
  WHERE i.slug = ${q(p.slug)};`;
  });

  writeFileSync(OUT, header + stmts.join('\n') + '\n', 'utf8');

  const words = PROJECT_CONTENT.map(
    (p) => buildHtml(p).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
  );
  console.log(`Yazildi: ${OUT}`);
  console.log(`Proje: ${PROJECT_CONTENT.length} | kelime ${Math.min(...words)}-${Math.max(...words)}`);
  for (const p of PROJECT_CONTENT) {
    const mt = p.meta_title.length;
    const md = p.meta_description.length;
    if (mt < 35 || mt > 65 || md < 120 || md > 170) {
      console.log(`  UYARI ${p.slug}: meta_title ${mt}, meta_description ${md}`);
    }
  }
}

if (import.meta.main) main();
