# Ortak içerik: işletim ve geri dönüş

Bu dizin `docs/ortak-icerik/INCELEME-VE-UYGULAMA-PLANI.md` raporunun uygulamasıdır.
Almanya: Guezel Web Design, de/en. Türkiye: GZL Teknoloji, tr.

## Veri sınırları

`gzl_shared_content` tek editoryal çalışma kaynağıdır. `gzl_shared_public`, aynı MySQL
transaction'ında açık yayın komutuyla üretilen son onaylı sürümdür; ikinci editoryal
kaynak değildir. `content_revisions` geçmişi, denetim günlüğü, ülke teklifleri,
çeviri onayları, URL geçmişi ve teslim kuyruğu çalışma şemasındadır.

Kullanıcılar, oturumlar, yasal sayfalar, iletişim, menü/altbilgi düzeni, siparişler,
ödeme kayıtları ve entegrasyon anahtarları mevcut ülke veritabanlarında kalır.
Eski operasyonel JOIN'ler yerel veritabanını kullanır. Yeni katalog okumaları ortak
sürüme gider. Ortak depo hatasında yerel kopyaya düşülmez: HTTP 503 döner.

Yeni içerik ve galeri POST istekleri `Idempotency-Key`, mevcut kayıttaki yazmalar
`If-Match` ister. Yayın komutları `expected_revision`, ülke teklifleri ayrıca
`expected_offer_revision` ister. GZL uygulaması ortak içerikte salt okunurdur.
Yazar paneli `https://panel.guezelwebdesign.com/admin/shared-content` adresidir.

## Göç kararları

Kimlikler kaynakların birleşimidir. Ortak kimlikte Türkçe çeviri için GZL,
Almanca/İngilizce için GWD önceliklidir. Seçilmeyen sürümler yedekte ve karar
manifestinde hash'leriyle korunur. Bilinen marka eki meta başlıktan ayrılır;
müşteri adları veya metinler topluca değiştirilmez. Kaynaklardan birinde kapalı
kayıt ortak yayında kapalı kalır.

Üç Almanya ve yirmi Türkiye fiyat planı farklı kimliklerini korur; eşdeğerlik
uydurulmaz. 23 ortak açıklama ve kaynağa ait ülke fiyatı saklanır. Başka ülkenin
fiyatına veya otomatik kur dönüşümüne düşülmez. Fiyatı olmayan içerik teklif ister.
Mevcut kaynakta proje/hizmet satın alma bayraklarının tamamı kapalıdır; göç bunları
açmaz. Yerel `site_packages` tabloları her iki kaynakta da boştur.

Yalnızca ortak içerikte referans verilen public medya ortak fiziksel köke kopyalanır. Yeni ortak URL öneki `/media/shared/` olur; eski `/uploads/` adresleri çalışır. Logo/favicon ve referanssız yerel medya kayıtları ülke deposunda kalır. Aynı yolun farklı
hash'i göçü durdurur. Yeni yerel yüklemeler SHA-256 adını kullanır; eski dosya
üzerine yazılmaz. Geçmiş bir revizyonun referans verdiği medya silinemez/yeniden
adlandırılamaz. Siteye ait eski yükleme kökleri uyumluluk için yerinde kalır.

## Yerelde doğrulama

Testler yalnızca `/tmp/gwd-shared-mysql/`, TCP 18346 üzerinde hazırlanmış ayrı
MySQL örneğini kullanır; üretim kullanıcısı veya müşteri kaydı testlere alınmaz.
Fixture dışa aktarımı editoryal tablolar ve açık ayar anahtarlarıyla sınırlıdır.

```bash
bun backend/scripts/build-immutable.mjs --test
bash backend/test/shared-content/run.sh
CONTENT_SITE_ID=gzl CONTENT_WRITER=0 DB_NAME=gzlteknoloji_v2 \
  TEST_FILE=backend/test/shared-content/reader.test.ts bash backend/test/shared-content/run.sh
CONTENT_DB_PORT=19999 TEST_FILE=backend/test/shared-content/outage.test.ts \
  bash backend/test/shared-content/run.sh
```

`reset.ts` önce `@@datadir` değerini kontrol eder; başka MySQL örneğini silmez.
`merge.ts` varsayılan olarak dry-run'dır. İlk yazmadan sonra aynı kaynak
fingerprint'iyle yeniden çağrıldığında mevcut editoryal değişikliklere dokunmaz.
Başka kaynakla mevcut çalışma alanının üstüne yazmayı reddeder.

## Üretim geçişi

Sunucu yalnızca `orhan@72.61.23.36` adresidir. Eski SSH takma adı kullanılmaz.
Sunucuda build, tsc, test veya tarayıcı çalıştırılmaz. Yerel yayın betiği
`DEPLOY_REF` ile değişmez commit'i derler; `BUILD_ONLY=1` paket üretir,
`DEPLOY_ONLY=1` tam aynı SHA'nın hazır paketini yükler. Her ülkenin `.next` çıktısı
ve marka dosyaları ayrıdır. Runtime paket sürümleri yerelde ve sunucuda kontrol
edilir. Paylaşılan backend kaynakları tek yerel Bun bundle'ına alınır; diğer
sitelerin ortak paket dosyaları değiştirilmez. Paket içinde medya, sıralama ve
veri erişimi uyarlamaları açıkça `build-immutable.mjs` içinde listelenmiştir.

1. İki DB ve iki yükleme kökünün yedeğini, env yedeğini, hash'leri ve diski doğrula.
2. Yerel testler, iki marka derlemesi ve tarayıcı kabulü tamamlanmış olmalı.
3. `freeze-editorial.py enable` ile yalnızca ilgili iki markanın CMS yazmalarını
   kısa süre durdur. Script nginx konfigürasyonunu test eder; hata halinde eski
   dosyaları geri koyar. Hesap/sipariş/ödeme yolları açık kalır.
4. `export.mjs` ile son kaynağı tekrar al; dry-run/manifest ve medya planını yenile.
5. Hazır `shared-content-merge.js` aracını root MySQL socket'iyle çalıştır;
   `--fixture`, `--manifest`, `--schema=dist/content-schema.sql`,
   `--crm-schema=dist/crm-imports.sql`, `--accept-manifest=<decisionFingerprint>`, `--write` ver. Fingerprint dry-run çıktısındaki eksiksiz dil/yayın/fiyat kararlarını sabitler. Bu derleme değildir.
6. `media-plan.py --selection=<manifest> --apply` yalnızca manifestte seçilmiş editoryal dosyaları kopyalar.
7. `provision.mjs --apply` ayrı writer/reader DB kullanıcılarını ve özel env'leri
   hazırlar; parola çıktıya basılmaz. Üretim env veya fixture repo'ya girmez.
8. Hazır paketleri yalnızca `scripts/deploy-yerel.sh` ile backend, frontend,
   admin sırasıyla iki siteye geçir. Başarısız uygulama otomatik eski çıktıya döner.
9. Kaynak/revizyon başlıklarını, CLAN 404/listeler/galeri, canonical/hreflang,
   sitemap, ortak medya hash'i ve iki markanın panelini doğrula.
10. `freeze-editorial.py disable`; yazma akışını ve teslim kuyruğunu tekrar doğrula.

## Geri dönüş

Ortak çalışma şemasını veya revizyon geçmişini **silme**. Önce CMS yazmasını kısa
süre durdur ve ortak şemaların güncel yedeğini al. `shared-content-rollback.js`
varsayılan olarak dry-run yapar. `--apply`, yalnızca son yayın projeksiyonunu
ülkelerin eski içerik tablolarına taşır, kaldırma kararlarını korur, ülke fiyatını
uygular ve yerel stokları korur. Kullanıcı/sipariş/ödeme tablolarına yazmaz.
Yeni taslaklar ve tüm revizyonlar ortak şemada kalır.

Ortak mod açıkken derlenmiş frontend'i, ortak modu kapalı backend ile eşleştirme.
`/var/backups/guezel-content-unify-20261114/rollback-ui.tar.gz` iki ülke için
`SHARED_CONTENT=0` ile **yerelde** hazırlanmış ön yüzleri içerir. Önce mevcut
release'in güncel yedeğini al, rollback aracını çalıştır; sonra backend env'lerinde
`CONTENT_SHARED_ENABLED=0` yap ve bu uyumlu ön yüz paketlerini aynı yerel deploy
betiğiyle geçir. Arşivin `source-sha` ve `rollback-provenance.json` dosyaları derleme
kaynağını sabitler. Yönetim paneli ortak modu durum API'sinden okur ve eski yerel
formlara döner. PM2 restart ve iki origin'de sayfa kabulünü yap. Tek `.prev` yalnızca
önceki uygulama sürümüdür; birden fazla hotfix sonrasında ilk legacy sürüm olduğu
varsayılmaz. Ortak
kaynağa tekrar geçiş mevcut çalışma alanının üzerine ilk göçü yeniden yazarak
**yapılmaz**. Korunan revizyonlar üzerinden sürdürülür. Yeni içerik/medya dosyaları
silinmez. Freeze'i kaldır ve iki origin'i yeniden doğrula.

## Yayın teslimi ve önizleme

Yayınlama ortak transaction'da görünürlük kazanır. İki origin'in API revizyonu ve
uygun detay HTML'i ayrıca doğrulanır; tamamlanmayan hedef `pending` kalır ve worker
15 saniyede tekrar dener. Başarısız teslim, kapalı içeriği yerel kopyadan açmaz.
Ortak içerik SSR/API/sitemap okumaları no-store'dur; statik marka dosyaları ayrı
kalır. Tek origin'in yanıtı iki sitenin başarılı olduğu anlamına gelmez.

Önizleme belirli kayıt, ülke ve dile bağlı 15 dakikalık rastgele erişim kullanır.
Token URL'ye yazılmaz; POST ile ülke sitesine iletilip HttpOnly cookie'ye alınır.
Önizleme no-store/noindex'tir. Yayınlama değildir; dış sosyal/mail/ödeme gönderimi
test edilmez. Ortak taslak kaydı LinkedIn kuyruğunda yan etki üretmez.


## Başarısız yükleme temizliği

`shared-media-gc.js` varsayılan olarak dry-run yapar. Yalnızca `content/<SHA256>.*`
yolunda en az yedi gündür bekleyen, hiçbir medya kaydında veya immutable revizyonda
referansı olmayan dosyalar adaydır. Eski site dosyaları bu kapsama girmez.
`--apply` için editoryal yazma freeze'i ve `CONTENT_GC_FROZEN=1` birlikte gerekir;
canlı yüklemeyle yarışarak dosya silinmez. Geri dönüş aracı ortak dosyaları eski
ülke yükleme köklerinde `shared-editorial/` altına bağımsız kopyalar; ortak kaynağın
kendisini veya geçmişini değiştirmez. Ülke teklifi bulunmayan ticari kayıtlar eski
kodda ücretsiz görünecek şekilde açılmaz.


## Yeni satışların ülke ve sipariş sınırı

Proje/hizmet checkout okumaları aynı public ülke teklif görünümüne gider. Ülke
teklifi, pozitif fiyat, para birimi ve satış izni olmadan yeni sipariş açılmaz.
Yeni ortak kimlik ülkenin tarihsel FK tablosunda yoksa yalnızca kapalı bir referans
satırı eklenir; mevcut yerel satır ve sipariş snapshot'ı değiştirilmez. Gerçek
sipariş satırı güncel ortak başlık ile ülke tutarını snapshot olarak saklar.
Checkout'taki `product` eski web paketidir: `site_packages` ve yerel teklif/provider
bilgisini okur; editoryal `products` ile aynı tablo veya kimlik sayılmaz. Başlangıçta
iki ülkede de web paketi sayısı sıfırdır. Bu çalışma ödeme veya satış izni açmaz.
