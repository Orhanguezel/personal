# gzlteknoloji.com — Hukuki Metin Tutarlılık Denetimi (WP-6.5)

**Tarih:** 2026-07-10
**Denetleyen:** Claude (Opus) — WP-6.5 görevi
**Şirket künyesi referansı:** GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti., Gemlik/Bursa, info@gzlteknoloji.com

---

## 0. Yöntem ve Doğrulanan Gerçek Durum

İncelenen kaynaklar:

- `frontend/src/components/containers/legal/` altındaki 6 bileşen (KvkkPageContent, PrivacyPolicyPageContent, PrivacyNoticePageContent, CookiePolicyPageContent, TermsPageContent, LegalNoticePageContent)
- `frontend/src/components/containers/gzl/GzlLeadForm.tsx` (fiilen toplanan form verileri)
- `backend/src/db/seed/sql/025_contact_newsletter_schema.sql` ve `026_custom_pages_seo_social_schema.sql`
- `packages/shared-backend/modules/contact/` ve `modules/newsletter/` (backend'in fiilen kaydettiği alanlar)
- `frontend/src/features/analytics/AnalyticsScripts.tsx` ve `frontend/src/layout/banner/CookieConsentBanner.tsx`
- **Canlı üretim veritabanı** (VPS `vps-guezel`, DB `gzlteknoloji`) — custom_pages, site_settings, contact_messages, newsletter_subscribers sorguları

### Kritik mimari tespit: Hukuki metinlerin İÇERİĞİ kodda değil, veritabanında

6 bileşenin tamamı metni `custom_pages` tablosundan (module_key: `kvkk`, `privacy`, `privacy_notice`, `cookies`, `terms`, `legal_notice`) çeker. Seed dosyalarında bu sayfalar için **hiçbir INSERT yoktur** ve üretim veritabanında `custom_pages` tablosu **tamamen boştur** (0 kayıt, 2026-07-10 itibarıyla doğrulandı).

Sonuç — sitenin bugünkü fiili durumu:

| Sayfa | Canlıda görünen |
|---|---|
| KVKK Aydınlatma Metni | "İçerik henüz hazırlanmadı." (BOŞ) |
| Gizlilik Politikası | TSX içindeki fallback metin (tek dolu sayfa) |
| Privacy Notice | "Content not found." (BOŞ) |
| Çerez Politikası | "İçerik henüz hazırlanmadı." (BOŞ) |
| Kullanım Koşulları | "İçerik henüz hazırlanmadı." (BOŞ) |
| Yasal Uyarı | "İçerik henüz hazırlanmadı." (BOŞ) |

### Envanter ile canlı yapılandırma arasındaki farklar (denetim sırasında doğrulandı)

- **GA4/GTM:** Kod tarafında Consent Mode'lu (varsayılan "denied") GTM/GA4/Facebook Pixel altyapısı hazır; ancak üretim `site_settings` içinde `ga4_measurement_id`, `gtm_container_id`, `facebook_pixel_id` **boş** ("") — yani analitik şu an fiilen yüklenmiyor. Ölçüm kurulduğu an metinlerin hazır olması gerekir.
- **Cloudinary:** Kod `STORAGE_DRIVER=cloudinary` destekler; üretim `.env`'de `STORAGE_DRIVER=local` ve hiçbir CLOUDINARY anahtarı yok — görseller şu an **kendi VPS'te** barındırılıyor. Envanterdeki "Cloudinary (yurt dışı)" satırı bugünkü canlı yapılandırmayla örtüşmüyor; ileride Cloudinary'ye geçilecekse metne o zaman eklenmeli veya "kullanılması halinde" kaydıyla şimdiden yazılmalı (**doğrulanmalı**: Cloudinary'ye geçiş planı var mı?).
- **Lead formu fiilen şunları topluyor:** ad soyad, e-posta, telefon, firma, bütçe/zamanlama, mesaj, seçilen paket/hizmet (URL parametresinden), onay kutusu; backend ayrıca **IP ve user-agent** kaydeder, gizli `website` alanı honeypot'tur (`contact_messages` tablosu).
- **Newsletter fiilen şunları kaydeder:** e-posta, locale, meta (JSON) — `newsletter_subscribers`. IP varsayılan olarak kaydedilmiyor.
- **Çerez banner'ı aktif** ve onay tercihini 180 gün ömürlü kendi çerezi + localStorage ile saklıyor; "Cookie Policy" bağlantısı şu an **boş sayfaya** gidiyor.

---

## 1. KVKK Aydınlatma Metni (`KvkkPageContent.tsx`, module_key: `kvkk`)

### (a) Metnin bugün iddia ettiği
Hiçbir şey — sayfa boş. TSX'te fallback metin yok; DB'de kayıt yok. Ziyaretçi "İçerik henüz hazırlanmadı." görüyor.

### (b) Envanterle çelişen / eksik noktalar

- **[KRİTİK — K1]** Site, lead/teklif formu üzerinden fiilen kişisel veri (ad, e-posta, telefon, firma, mesaj, seçilen paket, IP) topluyor; ancak KVKK kapsamındaki aydınlatma yükümlülüğünü karşılayacak metin canlıda **hiç yok**. Veri sorumlusu kimliği, işleme amaçları, hukuki sebepler, aktarım, saklama ve ilgili kişi hakları — hiçbiri yayında değil.
- **[K2]** Lead formundaki onay kutusu ("Bu taleple ilgili benimle iletişime geçilmesini kabul ediyorum.") hiçbir aydınlatma metnine bağlantı vermiyor. Boş bir sayfaya bile link yok; onay kutusu tek başına aydınlatma yerine geçmez.

### (c) Somut öneri

Aşağıdaki iskeletle tam bir aydınlatma metni yazılıp admin panelden `kvkk` module_key ile yayınlanmalı (TR + EN):

> **Veri Sorumlusu:** GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti. (Gemlik/Bursa). İletişim: info@gzlteknoloji.com
>
> **İşlenen kişisel veriler ve amaçları:**
> - Teklif/iletişim formu: ad soyad, e-posta, telefon, firma adı, bütçe/zamanlama bilgisi, mesaj içeriği ve talep edilen hizmet/paket bilgisi — teklif hazırlama ve talebinize dönüş yapma amacıyla.
> - Güvenlik kayıtları: IP adresi ve tarayıcı bilgisi (user-agent) — form gönderimlerinde istismar ve istenmeyen ileti (spam) önleme amacıyla.
> - E-bülten: e-posta adresi ve dil tercihi — ticari elektronik ileti gönderimi amacıyla, onayınıza bağlı olarak.
>
> **Hukuki sebepler:** Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması, veri sorumlusunun meşru menfaati (güvenlik) ve ticari elektronik iletiler bakımından açık rıza.
>
> **Aktarım:** Form ve bülten verileri şirketimizin kendi sunucusunda saklanır; üçüncü kişilere satılmaz. Ticari elektronik ileti onayları, mevzuat gereği İleti Yönetim Sistemi'ne (İYS) kaydedilir. [Analitik etkinleştirildiğinde: aşağıdaki 2(c) yurt dışı aktarım paragrafı buraya da eklenir.]
>
> **Haklarınız:** Kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltme, silinmesini isteme, işlemeye itiraz etme ve diğer yasal haklarınız için info@gzlteknoloji.com adresine başvurabilirsiniz.

Ayrıca lead formu onay satırına bağlantı eklenmeli: "…kabul ediyorum. **[KVKK Aydınlatma Metni]**" (link: `/kvkk`).

Not: Metinde kanun madde numaraları (m.5, m.9, m.11 vb.) anılacaksa yayın öncesi hukukçu tarafından **doğrulanmalı**; bu denetim madde numarası dayatmaz.

---

## 2. Gizlilik Politikası (`PrivacyPolicyPageContent.tsx`, module_key: `privacy`)

### (a) Metnin bugün iddia ettiği (TSX fallback — canlıda görünen tek hukuki metin)

- GZL Teknoloji'nin yazılım/web/otomasyon hizmeti sunduğu; site, iletişim formları ve bağlı servis akışlarını kapsadığı
- İşlenen veriler: ad-soyad, firma adı, e-posta, telefon, web sitesi adresi, talep içeriği, "teknik kayıtlar", iletişim geçmişi
- Amaçlar: taleplere dönüş, teklif, sözleşmeli hizmet, destek, güvenlik/performans, yasal yükümlülük, iş iletişimi
- Uzun bir **LinkedIn OAuth** bölümü (token'ların saklanması, organizasyon sayfası yayını vb.)
- Hukuki sebepler: sözleşme, meşru menfaat, gerektiğinde açık rıza, yasal yükümlülük; "gerekli süre boyunca" saklama
- Paylaşım: "altyapı, barındırma, analiz, e-posta, proje yönetimi ve platform API sağlayıcıları" (isimsiz, genel)
- Haklar ve iletişim: info@gzlteknoloji.com

### (b) Envanterle çelişen / eksik noktalar

- **[G1]** Veri sorumlusu künyesi yok: "GZL Teknoloji" ticari ad olarak geçiyor ama tüzel kişi unvanı (GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.) ve adres (Gemlik/Bursa) hiçbir yerde yazmıyor.
- **[KRİTİK — G2]** **Yurt dışına veri aktarımı hiç yazılmıyor.** Google (GA4/GTM) ve Cloudinary isimleri metinde geçmiyor; "analiz … sağlayıcıları" ifadesi isimsiz ve aktarımın yurt dışına olduğunu söylemiyor. KVKK'nın yurt dışına aktarım rejimi (m.9 — **doğrulanmalı**) kapsamında açık bilgilendirme yok. Şu an analitik ID'leri boş ve depolama yerel olduğu için fiili aktarım yok gibi görünüyor; ancak (1) kod altyapısı hazır, (2) GEO/SEO planında GA4 kurulumu var — analitik açıldığı gün bu eksik canlı bir uyum ihlaline dönüşür. Önerilen paragraf (c)'de.
- **[G3]** LinkedIn OAuth bölümü sitenin ziyaretçiye dönük gerçekliğiyle örtüşmüyor: sitede son kullanıcının LinkedIn ile yetkilendirme yaptığı bir akış yok; `social_posts` modülü şirketin kendi sayfa otomasyonu için dahili bir araç. Bu bölüm başka projeden gelen şablon artığı izlenimi veriyor; ziyaretçi gizlilik politikasında kafa karıştırıyor. Sadeleştirilmeli veya "şirketin kendi kurumsal sayfa yönetimi" olarak yeniden çerçevelenmeli (**doğrulanmalı**: ileride müşterilere LinkedIn bağlama özelliği sunulacak mı?).
- **[G4]** IP adresi, user-agent ve honeypot ile spam/güvenlik işlemesi açıkça yazılmıyor ("teknik kayıtlar" belirsiz). Envanterdeki "IP, honeypot → güvenlik" satırının karşılığı yok.
- **[G5]** Newsletter işlemesi hiç yok: e-posta + dil tercihinin pazarlama iletisi amacıyla işlendiği, ticari elektronik ileti onayı ve **İYS** kaydı anlatılmıyor.
- **[G6]** KVKK'ya adıyla atıf yok (metin hiçbir kanunu anmıyor); ilgili kişi başvurusunun usulü ve yanıt süresi belirtilmemiş (**doğrulanmalı**: Veri Sorumlusuna Başvuru Usulü Tebliği'ne uygun usul cümlesi hukukçuyla teyit edilmeli).
- **[G7]** Saklama süreleri tümüyle soyut ("gerekli süre boyunca"). En azından kategori bazında somut süre veya ölçüt (ör. teklif talepleri X yıl, bülten kaydı üyelik silinene dek) verilmeli.
- **[G8]** Sayfa altındaki "Son güncelleme" alanı `new Date()` ile **her ziyarette o günün tarihini** basıyor — metin hiç güncellenmemişken güncellenmiş izlenimi verir, yanıltıcıdır. Gerçek yayın/revizyon tarihi DB'den veya sabitten gelmeli (aynı sorun 6 bileşenin hepsinde var; burada tek bulgu olarak sayılmıştır).

### (c) Somut öneri — yurt dışı aktarım paragrafı (TR, analitik etkinleştirildiğinde zorunlu)

> **Yurt Dışına Veri Aktarımı**
>
> Web sitemizde, açık rızanıza bağlı olarak Google Analytics 4 ve Google Tag Manager (Google LLC / Google Ireland Ltd.) hizmetleri kullanılmaktadır. Bu hizmetler kapsamında çerezler ve benzeri teknolojiler aracılığıyla elde edilen cihaz ve kullanım verileri (örn. kısaltılmış IP adresi, tarayıcı bilgisi, sayfa görüntüleme olayları), sunucuları yurt dışında bulunan Google'a aktarılabilmektedir. Bu aktarım, yalnızca çerez bandı üzerinden vereceğiniz **açık rızanıza** dayanır; rıza vermediğiniz takdirde analitik çerezler çalıştırılmaz. [Cloudinary kullanılıyorsa ekle: Ayrıca sitemize yüklenen görseller, sunucuları yurt dışında bulunan Cloudinary Inc. altyapısında barındırılmaktadır.] Kişisel verilerin yurt dışına aktarımı, 6698 sayılı KVKK'nın yurt dışına aktarıma ilişkin hükümlerine uygun olarak yürütülür (ilgili madde ve güncel aktarım mekanizması — standart sözleşme/açık rıza — hukukçu tarafından **doğrulanmalı**).

Ek düzeltme cümleleri:

- Künye (metnin başına): "Bu politika kapsamında veri sorumlusu, Gemlik/Bursa adresinde yerleşik **GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.**'dir ('GZL Teknoloji')."
- Güvenlik işlemesi: "Form gönderimlerinde IP adresiniz ve tarayıcı bilginiz, istenmeyen ileti ve kötüye kullanım tespiti amacıyla meşru menfaat kapsamında kaydedilir; formda görünmeyen tuzak alan (honeypot) yalnızca otomatik bot gönderimlerini ayıklamak için kullanılır."
- Bülten/İYS: "E-bültenimize kaydolduğunuzda e-posta adresiniz ve dil tercihiniz, ticari elektronik ileti gönderimi amacıyla açık rızanıza dayalı olarak işlenir; onayınız mevzuat gereği İleti Yönetim Sistemi (İYS) üzerinden kayıt altına alınır. Her iletide yer alan bağlantı ile onayınızı dilediğiniz an geri alabilirsiniz."

---

## 3. Privacy Notice (`PrivacyNoticePageContent.tsx`, module_key: `privacy_notice`)

### (a) Metnin bugün iddia ettiği
Hiçbir şey — sayfa boş ("Content not found.").

### (b) Eksik / çelişen noktalar

- **[P1]** Sayfa boş; ayrıca `privacy` ile `privacy_notice` arasındaki işlev ayrımı tanımsız. İki ayrı boş/yarım gizlilik sayfası tutmak tutarlılık riski üretir (biri güncellenir, öteki unutulur).

### (c) Somut öneri
Ya bu sayfa kaldırılıp `/privacy-policy`'ye 301 yönlendirilmeli, ya da net bir işlev verilmeli (ör. `privacy` = Gizlilik Politikası TR, `privacy_notice` = kısa İngilizce özet bildirim). Hangisi seçilirse seçilsin içerik, Bölüm 2'deki düzeltmelerle **aynı envantere** dayanmalı; iki metin birbiriyle çelişmemeli.

---

## 4. Çerez Politikası (`CookiePolicyPageContent.tsx`, module_key: `cookies`)

### (a) Metnin bugün iddia ettiği
Hiçbir şey — sayfa boş.

### (b) Envanterle çelişen / eksik noktalar

- **[KRİTİK — C1]** Çerez onay bandı canlıda **aktif** ve "Cookie Policy / Çerez Politikası" bağlantısı boş bir sayfaya gidiyor. Ziyaretçiden çerez onayı isteniyor ama neye onay verdiğini okuyabileceği metin yok. Onayın "aydınlatılmış" niteliği bu haliyle savunulamaz.
- **[C2]** GA4/GTM çerezlerinin **adları ve süreleri yok** (metin olmadığı için hiçbir tablo yok). Analitik etkinleştirildiğinde en az şu çerezler belgelenmeli: `_ga` (Google Analytics, ayırt edici kimlik — genellikle ~2 yıl), `_ga_<container>` (oturum durumu — genellikle ~2 yıl), varsa `_gid` (~24 saat); Facebook Pixel etkinleştirilirse `_fbp` (~3 ay). Süreler yayın öncesi güncel Google/Meta dokümantasyonundan **doğrulanmalı** (kod tarafında Pixel desteği de mevcut).
- **[C3]** Sitenin **kendi rıza çerezi** anlatılmıyor: onay tercihi, versiyonlu bir çerezle **180 gün** ve ayrıca localStorage'da saklanıyor (`CookieConsentBanner.tsx`). "Zorunlu çerez" olarak adı, amacı ve süresiyle tabloya yazılmalı.

### (c) Somut öneri — çerez tablosu iskeleti (TR)

> Sitemizde çerezler iki grupta kullanılır:
>
> **1. Zorunlu çerezler** (rıza gerektirmez):
> | Çerez | Amaç | Süre |
> |---|---|---|
> | `cookie_consent_v1` (versiyona göre değişir) | Çerez tercihinizin hatırlanması | 180 gün |
>
> **2. Analitik çerezler** (yalnızca açık rızanızla):
> | Çerez | Sağlayıcı | Amaç | Süre |
> |---|---|---|---|
> | `_ga` | Google Analytics | Ziyaretçileri ayırt etme | ~2 yıl (doğrulanmalı) |
> | `_ga_XXXXXX` | Google Analytics | Oturum durumu | ~2 yıl (doğrulanmalı) |
>
> Analitik çerezler varsayılan olarak **kapalıdır**; yalnızca çerez bandında "Kabul Et" seçeneğini kullandığınızda etkinleşir (Google Consent Mode). Bu çerezler aracılığıyla toplanan veriler, sunucuları yurt dışında bulunan Google'a aktarılır — ayrıntı için Gizlilik Politikamızın "Yurt Dışına Veri Aktarımı" bölümüne bakınız. Tercihinizi dilediğiniz an "Çerez Ayarları" üzerinden değiştirebilirsiniz.

Analitik fiilen kurulana kadar geçici çözüm: tabloda yalnızca zorunlu rıza çerezi listelenir ve "Şu an üçüncü taraf analitik çerezi kullanılmamaktadır; kullanılmaya başlandığında bu politika güncellenecektir." cümlesi eklenir.

---

## 5. Kullanım Koşulları (`TermsPageContent.tsx`, module_key: `terms`)

### (a) Metnin bugün iddia ettiği
Hiçbir şey — sayfa boş.

### (b) Eksik / çelişen noktalar

- **[T1]** Footer "Kullanım Şartları / Terms" bağlantısı boş sayfaya gidiyor. Hizmet satışı/teklif akışı olan ticari bir sitede kullanım koşullarının hiç olmaması, fikri mülkiyet, sorumluluk sınırı ve teklif sürecinin bağlayıcılığı konularını boşlukta bırakır.

### (c) Somut öneri
Asgari kapsam: site sahibinin kimliği (künyeye atıf), içeriğin fikri mülkiyeti, sitedeki fiyat/paket bilgilerinin **bağlayıcı teklif olmayıp davet niteliğinde** olduğu, teklif formunun sözleşme kurmadığı, sorumluluk sınırlaması, uygulanacak hukuk ve yetkili mahkeme (Bursa/Gemlik — **doğrulanmalı**). Örnek cümle: "Sitede yer alan paket ve fiyat bilgileri bilgilendirme amaçlıdır; bağlayıcı teklif niteliği taşımaz. Sözleşme, tarafların yazılı olarak mutabık kaldığı teklif metniyle kurulur."

---

## 6. Yasal Uyarı / Künye (`LegalNoticePageContent.tsx`, module_key: `legal_notice`)

### (a) Metnin bugün iddia ettiği
Hiçbir şey — sayfa boş.

### (b) Eksik / çelişen noktalar

- **[L1]** Şirket künyesi sitenin **hiçbir yerinde** yayımlanmıyor: tüzel kişi unvanı, yerleşim yeri (Gemlik/Bursa), e-posta. Ticari elektronik ortamda tanıtıcı bilgi yükümlülükleri (ilgili mevzuat kapsamı — **doğrulanmalı**: MERSİS/ticaret sicil numarası ve vergi dairesi bilgisinin yayımlanma zorunluluğu hukukçuyla teyit edilmeli) bakımından eksiklik.

### (c) Somut öneri

> **Künye**
> Unvan: GZL Danışmanlık Hizmetleri ve Teknoloji Ltd. Şti.
> Adres: Gemlik / Bursa (tam adres eklenecek — doğrulanmalı)
> E-posta: info@gzlteknoloji.com
> Ticaret Sicil / MERSİS No: (doğrulanmalı, eklenecek)
> Vergi Dairesi / No: (doğrulanmalı, eklenecek)

Bu künye Yasal Uyarı sayfasına ve tercihen footer'a eklenmeli; KVKK ve Gizlilik metinleri "veri sorumlusu" tanımında bu künyeye atıf yapmalı.

---

## 7. Öncelik Sıralı Özet Tablo

| # | Metin | Bulgu sayısı | Kritiklik | Özet |
|---|---|---|---|---|
| 1 | Çerez Politikası | 3 | **KRİTİK** | Banner aktif, onay isteniyor, politika sayfası boş; çerez adı/süresi tablosu yok |
| 2 | KVKK Aydınlatma Metni | 2 | **KRİTİK** | Fiilen kişisel veri toplanırken aydınlatma metni hiç yok; form onay kutusu metne link vermiyor |
| 3 | Gizlilik Politikası | 8 | **KRİTİK** (G2) + Yüksek | Yurt dışı aktarım (Google/Cloudinary) hiç yazılmıyor; künye, İYS, IP/honeypot, saklama süreleri eksik; LinkedIn bölümü gerçek durumla örtüşmüyor; sahte "son güncelleme" tarihi |
| 4 | Yasal Uyarı / Künye | 1 | Yüksek | Şirket künyesi sitenin hiçbir yerinde yok |
| 5 | Kullanım Koşulları | 1 | Orta | Sayfa boş; footer bağlantısı ölü içeriğe gidiyor |
| 6 | Privacy Notice | 1 | Düşük | Sayfa boş; `privacy` ile işlev ayrımı tanımsız, tekilleştirilmeli |

**Toplam: 16 bulgu, bunların 3'ü kritik (C1, K1, G2).**

### Uygulama sırası önerisi

1. **Hemen:** KVKK Aydınlatma Metni + Çerez Politikası yazılıp admin panelden yayınlanmalı (custom_pages, `kvkk` ve `cookies`); lead formu onay satırına `/kvkk` bağlantısı eklenmeli.
2. **GA4/GTM kurulumuyla eşzamanlı (GEO/SEO Sprint kapsamında):** Gizlilik Politikası'na yurt dışı aktarım paragrafı + çerez tablosuna Google çerezleri eklenmeli — **analitik, bu metinler yayında olmadan etkinleştirilmemeli.**
3. **Aynı sprint içinde:** Künye (Yasal Uyarı) + Kullanım Koşulları + Gizlilik Politikası revizyonu (künye, İYS, IP/honeypot, saklama, LinkedIn sadeleştirme).
4. **Teknik:** 6 bileşendeki dinamik "Son güncelleme: bugün" alanı gerçek revizyon tarihiyle değiştirilmeli; hukuki sayfa içerikleri için seed/yedek stratejisi belirlenmeli (DB fresh seed'de metinler kaybolmasın).

---
*Not: Bu denetim teknik tutarlılık denetimidir; nihai metinler yayınlanmadan önce KVKK/e-ticaret mevzuatı yönünden hukukçu onayı önerilir. Belirsiz bırakılan tüm noktalar metin içinde "doğrulanmalı" olarak işaretlenmiştir.*
