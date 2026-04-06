# Guezelwebdesign — Proje Durum Raporu

> **Tarih:** 2026-03-08
> **Amac:** Backend, Frontend (musteri sitesi) ve Admin Panel olmak uzere 3 bilesenin tum modullerini analiz edip mevcut durumu, eksiklikleri ve hatalari kayit altina almak.
> **Domain:** guezelwebdesign.com / www.guezelwebdesign.com
> **Stack:** Fastify 5 + Drizzle ORM + MySQL (Backend) · Next.js 16 + RTK Query (Frontend) · Next.js 16 + React Query + Zustand + Tailwind CSS 4 (Admin Panel)
> **i18n:** 3 dil (de, en, tr) — varsayilan: de
> **Deploy:** GitHub Actions → VPS (rsync + SSH + PM2)

---

## Guncel Not

> **Son Gozden Gecirme:** 2026-03-12
> Bu raporun ilk versiyonundaki bazi "Tamamlandi" satirlari guncel kod tabanina gore fazla iyimser kalmis durumda. Ozellikle i18n ve DB tabanli UI copy tarafinda halen kapatilmasi gereken isler var.

---

## Kendi Tespitlerim — Kalan Isler

Bu bolum, mevcut kod tabani ve son local/canli kontroller uzerinden eklenmistir. Amac; daginik notlar yerine merkezi bir eksik listesi olusturmaktir.

### 1. i18n / Locale Mimarisi

| # | Tespit | Etki | Oncelik |
|---|--------|------|---------|
| 1 | Frontend'in bircok bolumunde UI metinleri halen `useStaticSiteSetting` uzerinden `frontend/public/ui/*.json` dosyalarindan okunuyor. Bu yapi DB tabanli `site_settings` mimarisiyle celisiyor. | Canli DB guncellemeleri UI'a tam yansimiyor, locale fallback davranisi parcali kaliyor. | KRITIK |
| 2 | `work` modulu localde DB tabanli hale getirildi, ancak ana sayfa ve diger bolumlerde ayni gecis tamamlanmadi. | `/work` ile diger sayfalar arasinda farkli locale/data davranisi olusuyor. | YUKSEK |
| 3 | `frontend/public/ui/de.json`, `frontend/public/ui/en.json`, `frontend/public/ui/tr.json` halen aktif veri kaynagi gibi kullaniliyor. Bu dosyalar cache/fallback yardimcisi olarak kalsa bile ana kaynak olmamali. | "DB tek kaynak" kuralini bozuyor. | YUKSEK |
| 4 | `frontend/lighthouserc.cjs` icinde locale listesi sabit: `['de', 'en', 'tr']`. | Test/otomasyon katmani yeni dil eklenince manuel guncelleme istiyor. | ORTA |
| 5 | `frontend/i18n/config.ts` icinde fallback locale sabit `de`. Teknik olarak kabul edilebilir ama DB'deki `default_locale` ile tam senkron degil. | Runtime ile config arasinda ikinci bir "varsayilan dil" kaynagi olusuyor. | ORTA |

### 2. Projects / Work Modulu

| # | Tespit | Etki | Oncelik |
|---|--------|------|---------|
| 1 | `work` detail tarafinda locale query daha once hic gonderilmiyordu; localde duzeltildi ama henuz tum proje bloklarina yayilmadi. | `/tr/work/[slug]` gibi sayfalarda yanlis dilde proje icerigi gorunebiliyordu. | KRITIK |
| 2 | `Projects1.tsx` ve `Projects2.tsx` halen statik UI setting wrapper'i kullaniyor. | Ana sayfa proje bolumleri DB locale yapisindan kopuk calisiyor. | YUKSEK |
| 3 | `222_projects_seeder_tr.sql` ve `223_projects_seeder_de.sql` dosyalari kayit eslemesini `locale='en'` uzerinden yapiyor. Bu yapisal olarak 3 dile sabitleme degil ama EN baz kaydina bagimli. | Seed zinciri EN baz kayit olmadan saglam degil. | ORTA |

### 3. Services / Pricing / Blog / Home UI Copy

| # | Tespit | Etki | Oncelik |
|---|--------|------|---------|
| 1 | `ServicesClient.tsx`, `ServiceDetailClient.tsx`, `PricingClient.tsx`, `BlogList.tsx`, `BlogDetail.tsx`, `Home*`, `Contact*`, `Footer*`, `Header*`, `Resume1.tsx`, `Skills*`, `Testimonials1.tsx` gibi cok sayida component halen `useStaticSiteSetting` kullaniyor. | Locale davranisi ve icerik kaynagi tum sitede tutarsiz. | KRITIK |
| 2 | Seed dosyalari guncel olsa bile frontend bu verileri her yerde DB'den cekmedigi icin canli yansima eksik kaliyor. | "Seed degisti ama ekranda yok" sorunu tekrar ediyor. | KRITIK |

### 4. Seed / Data Senkronizasyonu

| # | Tespit | Etki | Oncelik |
|---|--------|------|---------|
| 1 | Canliya tam reseed yapildi; ancak seed runner icindeki dinamik portfolio scriptleri server ortaminda repo path bagimliligi yuzunden dogrudan guvenli degil. | Production seed akisinda gizli kirilma riski var. | YUKSEK |
| 2 | Seed dosyalari ile frontend render zinciri arasinda sistematik "verification checklist" henuz yok. | DB verisi dogru olsa bile UI farki gec tespit ediliyor. | ORTA |

### 5. Deploy / Runtime Tutarliligi

| # | Tespit | Etki | Oncelik |
|---|--------|------|---------|
| 1 | PM2 / workflow duzeltildi ama deploy sonrasi smoke test sadece temel endpointleri kontrol ediyor. | Locale bazli icerik regressions erken yakalanmiyor. | ORTA |
| 2 | `work` gibi locale hassas moduller icin deploy sonrasi `/de`, `/en`, `/tr` varyantlarini kontrol eden otomatik test yok. | Dil regressions production'a kacabilir. | ORTA |

### 6. Rapor Seviyesi Duzeltme Ihtiyaci

Asagidaki satirlar mevcut raporda "Tamamlandi" diye gorunse de gercekte revize edilmelidir:

- `Site Ayarlari (i18n)`:
  Durum, "DB tabanli altyapi tamam; frontend tuketimi kismi" seklinde guncellenmeli.
- `Hizmetler (Services)`:
  Seed ve backend tamam; frontend UI copy tuketimi DB tarafina tam tasinmadi.
- `Projeler (Projects/Work)`:
  Backend tamam; frontend locale tutarliligi duzeltme asamasinda.
- `Blog`, `Pricing`, `Resume`, `Skills`, `Contact`, `Footer`, `Header`, `Home`:
  Bu bolumler i18n acisindan "tamamlandi" degil, "statik fallback kullaniyor / DB gecisi bekliyor" notuyla isaretlenmeli.

### Onerilen Sirali Kapanis Plani

1. `useStaticSiteSetting` kullanan tum public-facing componentleri envanterle.
2. `work` modulu icin baslatilan DB tabanli yaklasimi `projects`, `services`, `blog`, `pricing`, `home`, `contact`, `footer`, `header`, `resume`, `skills`, `testimonials` alanlarina yay.
3. `public/ui/*.json` dosyalarini ana kaynak olmaktan cikar; gerekiyorsa sadece gecici fallback veya build-time snapshot rolune indir.
4. Locale sayisini hicbir yerde sabit diziyle kullanma; `app_locales` ve `default_locale` verisini DB/API uzerinden oku.
5. Seed -> API -> UI dogrulama checklist'i ekle.
6. Tum bunlar bitince canli deploy + locale smoke test yap.

---

## Kullanici Kararlari — Yeni Hedef Mimari

Bu bolum 2026-03-12 tarihinde netlestirilen urun yonu ve mimari kararlarini icerir. Bundan sonraki tum gelistirmelerde bu kurallar baglayici kabul edilecektir.

### A. Dil Mimarisi — Nihai Kural

| Alan | Kaynak | Kural |
|------|--------|-------|
| Sayfa statik metinleri | `frontend/public/ui/*.json` | Statik UI metinleri JSON dosyalarindan okunacak |
| Dinamik icerikler | Veritabani (`site_settings`, `projects`, `services`, `blog`, vb.) | Dinamik moduller DB'den locale bazli cekilecek |
| Aktif diller | JSON klasorundeki dosyalar + DB `app_locales` | Kod icinde sabit locale listesi olmayacak |
| Varsayilan dil | DB `default_locale` | Kod icinde ikinci bir sabit default locale mantigi minimuma indirilecek |

### B. Dil Mimarisi — Zorunlu Is Kurallari

1. Kod tabaninda hicbir yerde `['de', 'en', 'tr']`, `['tr','en','de']` veya benzeri sabit locale dizileri olmayacak.
2. `generateStaticParams`, locale switcher, route helper, test config ve UI helper katmanlari dahil olmak uzere locale listesi dinamik olacak.
3. Frontend statik UI metinleri, `frontend/public/ui/` klasorundeki mevcut JSON dosyalarini tarayarak hangi dillerin mevcut oldugunu anlayacak.
4. Yeni bir dil eklendiginde:
   - ilgili JSON dil dosyasi eklenecek
   - DB'de `app_locales` ve ilgili icerik kayitlari eklenecek
   - kodda ek bir locale tanimi gerekmeyecek
5. Kullanici bir dili sectiginde:
   - page-level statik UI metinleri ilgili JSON dosyasindan gelecek
   - dinamik icerikler ayni locale ile DB'den cekilecek
   - header, footer, menu, work, services, blog, pricing, contact ve diger tum alanlar ayni locale davranisini kullanacak
6. Locale switcher tum sayfada ortak ve tek davranisli olacak.
7. `work` modulu, `projects`/satilan urunler modulu olarak yeniden konumlandirilacak.

### C. Rapor Duzeltmesi — Onceki Tespitlerde Revizyon

Yukaridaki karar geregi onceki "DB tek kaynak olacak" yorumu guncellenmistir:

- **Statik UI copy** icin kaynak: `public/ui/*.json`
- **Dinamik modul verisi** icin kaynak: Veritabani
- **Locale sayisi** icin kural: Koddan degil, dosya sistemi + DB metadata uzerinden dinamik tespit

Bu nedenle asagidaki hedef benimsenmistir:

- `useStaticSiteSetting` tamamen kaldirilmak zorunda degil;
- fakat kullandigi locale listesi sabit olmayacak;
- ve static/dynamic locale cozumleme zinciri tek bir ortak locale sistemine baglanacak.

---

## Yeni Urun Yonelimi — Satisa Acik Projeler Platformu

Site artik sadece klasik portfolyo vitrini degil; satilabilir web yazilim projelerinin tanitildigi ve satin alinabildigi bir urune dogru evrilecektir.

### Hedef

- `work` modulu, satilan urun projeleri vitrini olarak calisacak
- proje detay sayfalarinda mockup, admin panel, frontend ve moduller tanitilacak
- kullanici bu projeleri sepete ekleyip satin alabilecek
- satin alma icin uyelik zorunlu olacak

### Satisa Konu Olan Proje Tipi

- admin panel + frontend + backend iceren hazir web yazilim projeleri
- ornek: emlak, temizlik, booking, kurumsal site, ecommerce, service platformlari

---

## Yeni Moduller — Eklenecek Backlog

### 1. Header Dil Secici

| Alan | Gereksinim |
|------|------------|
| Konum | Header icinde, genel site tasarimina uygun |
| Veri kaynagi | JSON klasorunde bulunan aktif diller + DB `app_locales` |
| Davranis | Kullanici dili degistirdiginde ayni sayfanin o locale versiyonuna gecis |
| Kural | Hardcoded dil secenekleri olmayacak |

### 2. Projects Store / Productized Work

| Alan | Gereksinim |
|------|------------|
| Modulin yeni amaci | Portfolyo vitrininden satilabilir proje kataloguna gecis |
| Liste sayfasi | Satilan projeler kartlar halinde listelenecek |
| Detay sayfasi | Mockup, ozellikler, moduller, admin panel, frontend, backend tanitimi olacak |
| CTA | Sepete ekle / Satin al / Demo incele |
| Kural | Dil destekli, locale uyumlu, dinamik icerik |

### 3. Uyelik Sistemi

| Alan | Gereksinim |
|------|------------|
| Gereklilik | Satin alma icin zorunlu |
| Akis | Register / login / profil / oturum |
| Entegrasyon | Mevcut backend auth altyapisi kullanilacak |
| Ek Not | Gelecekte kullanici satin aldigi projeleri panelinden gorebilmeli |

### 4. Sepet ve Siparis

| Alan | Gereksinim |
|------|------------|
| Sepet | Kullanici proje urunlerini sepete ekleyebilmeli |
| Checkout | Mevcut checkout altyapisi proje urunlerine uyarlanacak |
| Kural | Satin alma uyelik gerektirecek |
| Siparis Sonrasi | Satin alinan proje, kullanici hesabina baglanacak |

### 5. PayPal Odeme Altyapisi

| Alan | Gereksinim |
|------|------------|
| Odeme tipi | PayPal ile satin alma |
| Durum | Backend ve checkout altyapisinda mevcut parcali yapi var |
| Is | Urun/proje satisina uyarlanacak |
| Kural | Canli urun satis akisi ile dogrudan baglanacak |

### 6. Wallet / Cuzdan Modulu

| Alan | Gereksinim |
|------|------------|
| Modulin amaci | Kullanici bakiyesi / iade / kredi takibi |
| Baglanti | Siparis, odeme, iade ve kampanya sistemi ile entegre olmali |
| Kural | Backend'deki mevcut wallet tablolari ve is mantigi degerlendirilecek |

### 7. Yorum / Begeni Sistemi

| Alan | Gereksinim |
|------|------------|
| Hedef | Satilan projeler icin kullanici yorumu ve begeni |
| Kosul | Yorum icin satin alma veya en azindan uyelik kontrolu gerekliligi ayrica netlestirilecek |
| Moderasyon | Admin tarafinda yonetim gerekli |

### 8. Banner Sistemi

| Alan | Gereksinim |
|------|------------|
| Hedef | Kampanya, urun tanitimi, cta banner alanlari |
| Kapsam | Ana sayfa, proje detay, checkout veya kampanya alanlari |
| Kaynak | Kamanilan reposundaki ilgili modul referans alinabilir |

### 9. Popup Sistemi

| Alan | Gereksinim |
|------|------------|
| Hedef | Duyuru, kampanya, uyelik cagrisi, indirim popup'lari |
| Kapsam | Frontend + admin yonetimi |
| Kaynak | Kamanilan reposundaki popup modulu alinip uyarlanabilir |

### 10. Kampanya Modulu

| Alan | Gereksinim |
|------|------------|
| Hedef | Indirim, paket teklif, sezon kampanyasi |
| Baglanti | Banner, popup, checkout, wallet ve urun fiyatlariyla calisacak |
| Kaynak | Kamanilan reposundaki yapilar referans alinabilir |

---

## Kopyalanabilecek Moduller — Kamanilan Kaynagi

Kullanici kararina gore asagidaki moduller icin `kamanilan` reposu referans/taşıma kaynagi olarak kullanilabilir:

- banner sistemi
- popup sistemi
- kampanya sistemi
- checkout / satis akisi ile ilgili yardimci parcalar
- urun sunum kaliplari

### Kural

1. Modul "aynen kopyala ve bitir" mantigiyla degil, once tasinacak dosya/envanter listesiyle alinacak.
2. Her modul icin:
   - mevcut bagimliliklar
   - schema/tablolar
   - endpointler
   - admin ekranlari
   - frontend bilesenleri
   - siteye uyarlama ihtiyaclari
   ayri ayri cikarilacak.

---

## Yeni Is Paketleri — Sirali Gorev Listesi

### Paket A — Locale Altyapisi

1. JSON klasorunden aktif dilleri dinamik tespit eden frontend helper yaz.
2. `app_locales` + `default_locale` ile bu helper'i eslestir.
3. Kod tabanindaki sabit locale kullanımlarini temizle.
4. Header dil seciciyi ekle.
5. Route / locale switch / SEO / test / build katmanlarinda dinamik locale akisini standart hale getir.

### Paket B — Static UI vs Dynamic Data Ayrimi

1. Statik UI copy'nin JSON kaynakli kalacagi alanlari netle.
2. Dinamik data'nin DB kaynakli olacagi alanlari netle.
3. Her component icin veri kaynagini tablo halinde cikar.
4. `useStaticSiteSetting` ve DB query kullanan componentleri tek tek standardize et.

### Paket C — Projects Store Donusumu

1. `work` modulu artik satilan projeler vitrini olacak sekilde yeniden tanimlansin.
2. Liste ve detay tasarimlari urun satisina gore guncellensin.
3. Mockup, moduller, admin panel ve frontend tanitimi eklenebilsin.
4. Fiyat, paket, satin alma cagrilari baglansin.

### Paket D — Uyelik + Satis + Wallet

1. Uyelik zorunlu satin alma akisini tasarla.
2. Cart / checkout / order akislarini proje satisina uyarla.
3. PayPal odeme akisini bagla.
4. Wallet / balance mantigini aktif et.
5. Satin alinan urunlerin kullanici hesabinda listelenmesini planla.

### Paket E — Community / Promotion Modulleri

1. Begeni sistemi
2. Yorum sistemi
3. Banner sistemi
4. Popup sistemi
5. Kampanya sistemi

### Paket F — Kamanilan Modullerinin Transfer Analizi

1. Kamanilan reposunda ilgili modulleri envanterle.
2. Tasinacak dosyalari listele.
3. Uyumlandirma gereksinimlerini cikar.
4. Sonra hedef projeye parcali entegrasyon yap.

---

## Yeni Is Kurallari — Uygulama Disiplini

1. Yeni bir dil eklemek icin kod degisikligi gerekmesi istenmiyor.
2. JSON dil dosyasi + DB locale kaydi yeterli olmali.
3. Frontend'de hicbir modul sabit dil listesiyle calismamali.
4. Header dil secici tum sayfada ortak davranmali.
5. Satis modulu, uyelik olmadan satin alma izni vermemeli.
6. Urun/proje detaylari hem tanitim hem satis odakli olmali.
7. Yeni moduller once rapora backlog olarak yazilacak, sonra uygulanacak.

---

## Ozet Tablo

| #  | Modul                              | Backend   | Frontend  | Admin Panel | Durum                              |
| -- | ---------------------------------- | --------- | --------- | ----------- | ---------------------------------- |
| 1  | Auth (Kimlik Dogrulama)            | ✅ Tam    | —         | ✅ Tam      | Tamamlandi (TEMP_LOGIN riski var)  |
| 2  | Kullanicilar & Profiller           | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 3  | Kullanici Rolleri                  | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 4  | Site Ayarlari (i18n)               | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 5  | Hizmetler (Services)               | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 6  | Projeler (Projects/Work)           | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 7  | Blog (Custom Pages: blog)          | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 8  | Ozel Sayfalar (Custom Pages)       | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 9  | Fiyatlandirma (Pricing)            | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 10 | SSS (FAQs)                         | ✅ Tam    | ✅ Kismi  | ✅ Tam      | Pricing sayfasinda gosteriliyor    |
| 11 | Incelemeler (Reviews)              | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 12 | Slider                             | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 13 | Markalar (Brands)                  | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 14 | Menu Ogeleri                       | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 15 | Footer Bolumleri                   | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 16 | Iletisim (Contact)                 | ✅ Tam    | ✅ Tam    | ✅ Tam      | Tamamlandi                         |
| 17 | Bulten (Newsletter)                | ✅ Tam    | —         | ✅ Tam      | FE'de form yok                     |
| 18 | Bildirimler (Notifications)        | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 19 | E-posta Sablonlari                 | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 20 | Posta (Mail)                       | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 21 | Depolama (Storage/Cloudinary)      | ✅ Tam    | ✅ Kismi  | ✅ Tam      | Tamamlandi                         |
| 22 | Ozgecmis (Resume)                  | ✅ Tam    | —         | ✅ Tam      | FE sayfasi yok                     |
| 23 | Yetenekler (Skills)                | ✅ Tam    | —         | ✅ Tam      | Sections'da gosteriliyor           |
| 24 | Musaitlik (Availability)           | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 25 | Randevular (Bookings)              | ✅ Tam    | —         | ✅ Tam      | FE randevu formu yok               |
| 26 | Kaynaklar (Resources)              | ✅ Tam    | —         | ✅ Tam      | FE sayfasi yok                     |
| 27 | Chat (AI Destekli)                 | ✅ Tam    | —         | —           | FE + Admin entegrasyonu eksik       |
| 28 | Destek (Support/Tickets)           | ✅ Tam    | —         | —           | FE + Admin entegrasyonu eksik       |
| 29 | Teklifler (Offers)                 | —         | —         | ✅ Tam      | Backend endpoint belirsiz           |
| 30 | Pop-up'lar                         | —         | —         | ✅ Tam      | Backend endpoint belirsiz           |
| 31 | SEO                                | ✅ Tam    | ✅ Tam    | —           | Tamamlandi                         |
| 32 | Denetim (Audit)                    | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 33 | Veritabani Yonetimi (DB Admin)     | ✅ Kismi  | —         | ✅ Kismi    | 5 endpoint eksik                    |
| 34 | Dashboard                          | ✅ Tam    | —         | ✅ Tam      | Tamamlandi                         |
| 35 | Raporlar (Reports)                 | —         | —         | ✅ Tam      | Backend endpoint belirsiz           |
| 36 | Site Paketleri (Products)          | ✅ Tam    | ✅ Tam    | ✅ Tam      | Sprint 1-4 tamamlandi              |
| 37 | Checkout (Odeme/Siparis)           | ✅ Tam    | ✅ Tam    | ✅ Tam      | Sprint 1-4 tamamlandi              |
| 38 | PayPal Entegrasyonu                | ✅ Tam    | ✅ Tam    | ✅ Tam      | Orders API v2 + Subscriptions API  |

---

## 1. Auth (Kimlik Dogrulama)

**Tanim:** JWT tabanli kullanici kimlik dogrulama sistemi. Admin panelinde ayri auth akisi mevcuttur.

### Backend Endpoints

| Islem                      | Endpoint                                                            | Durum |
| -------------------------- | ------------------------------------------------------------------- | ----- |
| Kayit                      | `POST /api/auth/signup`                                             | ✅    |
| Giris                      | `POST /api/auth/token`                                              | ✅    |
| Token yenileme             | `POST /api/auth/token/refresh`                                      | ✅    |
| Mevcut kullanici           | `GET /api/auth/user`                                                | ✅    |
| Oturum durumu              | `GET /api/auth/status`                                              | ✅    |
| Profil guncelleme          | `PUT /api/auth/user`                                                | ✅    |
| Cikis                      | `POST /api/auth/logout`                                             | ✅    |
| Sifre sifirlama talebi     | `POST /api/auth/password-reset/request`                             | ✅    |
| Sifre sifirlama onay       | `POST /api/auth/password-reset/confirm`                             | ✅    |
| Google OAuth (ID token)    | `POST /api/auth/google`                                             | ✅    |
| Google OAuth (redirect)    | `POST /api/auth/google/start` + `GET /api/auth/google/callback`     | ✅    |
| Admin: Kullanici listesi   | `GET /api/admin/users`                                              | ✅    |
| Admin: Kullanici guncelle  | `PATCH /api/admin/users/:id`                                        | ✅    |
| Admin: Aktif/pasif         | `POST /api/admin/users/:id/active`                                  | ✅    |
| Admin: Rol atama           | `POST /api/admin/users/:id/roles`                                   | ✅    |
| Admin: Sifre degistirme    | `POST /api/admin/users/:id/password`                                | ✅    |
| Admin: Silme               | `DELETE /api/admin/users/:id`                                       | ✅    |

### Frontend (Musteri Sitesi)

Frontend'de auth sayfalari (login, register, forgot-password vb.) **bulunmuyor**. Bu bir web tasarim portfolyo sitesi oldugu icin auth kullanici tarafinda gerekli degil.

### Admin Panel

| Ekran                            | Durum |
| -------------------------------- | ----- |
| Login sayfasi                    | ✅    |
| Kullanici yonetimi (CRUD)       | ✅    |
| Rol yonetimi                    | ✅    |

### Sorunlar

| # | Sorun | Dosya | Oncelik |
|---|-------|-------|---------|
| 1 | `ALLOW_TEMP_LOGIN` + `TEMP_PASSWORD="admin123"` ile gecici giris mekanizmasi mevcut — uretimde guvenlik riski | `backend/src/modules/auth/controller.ts:176-178` | KRITIK |
| 2 | Kullanici silme isleminde orders, wallet_transactions, tickets temizligi TODO olarak birakilmis | `backend/src/modules/auth/admin.controller.ts:336` | ORTA |
| 3 | `@fastify/rate-limit` plugin'i app.ts'de **register edilmemis** — route config'lerde rateLimit tanimli ama enforce edilmiyor | `backend/src/app.ts` | YUKSEK |

---

## 2. Site Ayarlari (SiteSettings / i18n)

**Tanim:** Cok dilli site ayarlari (slogan, logo, footer metinleri, sayfa basliklari vb.). Admin panelden yonetilir, frontend'te server-side ve client-side olarak tuketilir.

### Backend
- `GET /api/site-settings` (public, locale destekli) ✅
- `GET/PUT /api/admin/site-settings` (admin CRUD) ✅
- SEO ayarlari ayri sema ile yonetiliyor (`seoSchema.ts`, `seo.validation.ts`) ✅

### Frontend
- `i18n/config.ts` — FALLBACK_LOCALE: `de`, RTL dil destegi ✅
- `i18n/settingsApi.server.ts` — Server-side ayar cekme ✅
- `i18n/settingsApi.client.ts` — Client-side ayar cekme ✅
- `utils/staticSiteSettings.ts` — Sayfa kopyalari (page_pricing, page_home vb.) ✅
- `public/ui/` — de.json, en.json, tr.json (UI metinleri) ✅
- `generateStaticParams`: `[en, de, tr]` ✅

### Admin Panel
- Site ayarlari CRUD sayfasi ✅

---

## 3. Hizmetler (Services)

**Tanim:** i18n destekli hizmet listesi. Parent + i18n child tablo deseni.

### Backend
- Tablolar: `services` (parent) + `service_i18n` (child) ✅
- Dosyalar: `schema.ts`, `validation.ts`, `repository.ts`, `controller.ts`, `router.ts`, `admin.controller.ts`, `admin.routes.ts` ✅
- COALESCE fallback pattern ✅

### Frontend
- `/[locale]/services` — Liste sayfasi (SSR + client hydration) ✅
- `/[locale]/services/[slug]` — Detay sayfasi ✅
- `ServicesClient.tsx` — RTK Query ile veri cekme ✅
- `ServiceDetailClient.tsx` — Tekil hizmet gosterimi ✅
- SEO metadata + ServiceJsonLd ✅

### Admin Panel
- Hizmet CRUD (parent + i18n cevirileri) ✅

---

## 4. Projeler (Projects / Work)

**Tanim:** i18n destekli portfolyo projeleri.

### Backend
- Tablolar: `projects` (parent) + `project_i18n` (child) ✅
- Tam CRUD + reorder endpoint ✅

### Frontend
- `/[locale]/work` — Proje listesi (PortfolioFilter ile filtreleme) ✅
- `/[locale]/work/[slug]` — Proje detay sayfasi ✅
- `Work.client.tsx` + `WorkSingle.client.tsx` ✅
- SEO metadata ✅

### Admin Panel
- Proje CRUD (parent + i18n) ✅

---

## 5. Blog (Custom Pages: blog)

**Tanim:** Blog, `customPages` modulunun `module_key="blog"` alt kumesi olarak calisir.

### Backend
- `customPages` modulu uzerinden ✅
- Tablolar: `custom_pages` + `custom_page_i18n` ✅

### Frontend
- `/[locale]/blog` — Blog listesi ✅
- `/[locale]/blog/[slug]` — Blog detay ✅
- `BlogList.tsx`, `BlogDetail.tsx` ✅
- `BlogCard1.tsx`, `BlogCard2.tsx`, `BlogCard3.tsx` (farkli kart tasarimlari) ✅
- `BlogPost.tsx` — Tekil post gosterimi ✅
- SEO metadata ✅

### Admin Panel
- Custom Pages CRUD (blog module_key ile filtreleme) ✅

---

## 6. Ozel Sayfalar (Custom Pages)

**Tanim:** Genel amacli, modul anahtari ile gruplanabilen i18n sayfalar.

### Backend
- Tam CRUD + i18n ✅

### Frontend
- `/[locale]/custompages/[module_key]/[slug]` — Dinamik sayfa gosterimi ✅
- `dangerouslySetInnerHTML` ile icerik render ✅

### Admin Panel
- Ozel sayfa CRUD ✅

---

## 7. Fiyatlandirma (Pricing)

**Tanim:** Fiyat planlari + FAQ bileşeni.

### Backend
- Tablolar: pricing (i18n destekli) ✅
- Tam CRUD ✅

### Frontend
- `/[locale]/pricing` — Fiyat kartlari + FAQ accordion ✅
- `PricingClient.tsx` — RTK Query ile plans + faqs cekme ✅
- Site settings'ten sayfa kopyalari (badge, title, intro vb.) ✅

### Admin Panel
- Pricing CRUD ✅

---

## 8. SSS (FAQs)

### Backend
- Tam CRUD + i18n ✅

### Frontend
- Bagimsiz sayfa **yok** — Pricing sayfasinda accordion olarak gosteriliyor ✅

### Admin Panel
- FAQ CRUD ✅

---

## 9. Incelemeler (Reviews) / Testimonials

### Backend
- Tam CRUD + i18n ✅

### Frontend
- `Testimonials1.tsx` section bileseninde gosteriliyor ✅
- Ana sayfa ve diger sayfalarda embed ✅

### Admin Panel
- Review CRUD ✅

---

## 10. Slider

### Backend
- Tam CRUD ✅

### Frontend
- Swiper.js ile slider gosterimi ✅

### Admin Panel
- Slider CRUD ✅

---

## 11. Markalar (Brands)

### Backend
- Tam CRUD ✅

### Frontend
- `Brands1.tsx` — Marka logolari marquee/carousel ✅

### Admin Panel
- Brand CRUD ✅

---

## 12. Menu Ogeleri

### Backend
- Tam CRUD + siralama ✅

### Frontend
- `Header1.tsx`, `Header2.tsx`, `Header3.tsx` — Dinamik menu ✅
- `OffCanvas.tsx` — Mobil menu ✅

### Admin Panel
- Menu item CRUD ✅

---

## 13. Footer Bolumleri

### Backend
- Tam CRUD ✅

### Frontend
- `Footer1.tsx`, `Footer2.tsx`, `Footer3.tsx` — Dinamik footer ✅

### Admin Panel
- Footer section CRUD ✅

---

## 14. Iletisim (Contact)

### Backend
- `POST /api/contact/messages` (public, rate limit onerisi var) ✅
- `GET /api/admin/contact/messages` + `PATCH .../:id` (okundu isaretle) ✅

### Frontend
- `Contact1.tsx`, `Contact2.tsx` — Iletisim formu section bileşenleri ✅

### Admin Panel
- Iletisim mesajlari listesi + okundu isareti ✅

---

## 15. Bulten (Newsletter)

### Backend
- Tam CRUD ✅

### Frontend
- **Bagimsiz abone formu yok** — Entegrasyon endpoint'leri mevcut ama FE'de gosterilmiyor

### Admin Panel
- Newsletter abone yonetimi ✅

---

## 16. Depolama (Storage / Cloudinary)

### Backend
- Cloudinary imzali yukleme ✅
- `storage` modulu (CRUD + admin) ✅

### Frontend
- `storage_public.endpoints.ts` mevcut ✅
- Gorseller `next/image` + Cloudinary remote patterns ile optimize ✅

### Admin Panel
- Storage yonetimi (upload, listele, sil) ✅

---

## 17. SEO

### Backend
- `/seo/meta` public endpoint ✅
- Site settings uzerinden SEO varsayilanlari ✅

### Frontend
- `seo/` klasoru — metadata builder, JSON-LD, breadcrumb ✅
- `seo/seo.server.ts` — Server-side SEO veri cekme ✅
- `seo/ServiceJsonLd.tsx` — Hizmet structured data ✅
- `seo/BreadcrumbJsonLd.tsx` — Breadcrumb structured data ✅
- `/robots.ts` — Robots.txt olusturma ✅
- `/sitemap.ts` — Dinamik sitemap (services, projects, custom_pages, products) ✅
- `seo/analytics/` — Google Analytics entegrasyonu ✅
- Her sayfada `generateMetadata` + `buildMetadata` ✅

---

## 18. Ozgecmis (Resume), Yetenekler (Skills), Deneyim

### Backend
- Resume: Tam CRUD + i18n ✅
- Skill: Tam CRUD + i18n ✅

### Frontend
- `Resume1.tsx`, `Skills1.tsx`, `Skills2.tsx` — Section bilesenlerinde gosteriliyor ✅
- `Experience2.tsx`, `Education2.tsx`, `Coporation2.tsx` — Alternatif anasayfa section'lari ✅
- Bagimsiz sayfa **yok** (section olarak embed)

### Admin Panel
- Resume CRUD ✅
- Skills CRUD ✅

---

## 19. Musaitlik (Availability) + Randevular (Bookings) + Kaynaklar (Resources)

### Backend
- Availability: Tam CRUD ✅
- Bookings: Tam CRUD ✅
- Resources: Tam CRUD ✅

### Frontend
- **Hicbir sayfada gosterilmiyor** — Entegrasyon endpoint'leri mevcut ama FE'de kullanilmiyor

### Admin Panel
- Availability CRUD ✅
- Bookings CRUD ✅
- Resources CRUD ✅

---

## 20. Bildirimler (Notifications) + E-posta Sablonlari + Posta (Mail)

### Backend
- Notifications: Tam CRUD ✅
- Email Templates: Tam CRUD + renderer + mailer servisi ✅
- Mail: gonderim servisi ✅

### Frontend
- Kullanilmiyor (admin-only ozellik)

### Admin Panel
- Bildirim yonetimi ✅
- E-posta sablonu CRUD ✅
- Posta yonetimi ✅

---

## 21. Chat (AI Destekli) + Destek (Support/Tickets)

### Backend
- Chat: Tam CRUD + AI servis katmani ✅
- Support: Tam CRUD (tickets) ✅

### Frontend
- **Her iki modul icin de FE sayfasi/bileşeni yok**

### Admin Panel
- **Her iki modul icin de admin sayfasi yok** (endpoint'ler mevcut ama UI yok)

---

## 22. Teklifler (Offers) + Pop-up'lar

### Admin Panel
- Offers CRUD sayfasi ✅
- Popups CRUD sayfasi ✅

### Backend + Frontend
- Offers: Admin endpoint mevcut (`offers_admin.endpoints.ts` + `offers_public.endpoints.ts`) ✅
- Popups: Admin endpoint mevcut (`popups_admin.endpoints.ts` + `popups.public.endpoints.ts`) ✅
- FE'de popup gosterim mekanizmasi belirsiz

---

## 23. Denetim (Audit)

### Backend
- Audit events schema + repository + request logger plugin ✅
- Stream controller (canli audit log akisi) ✅

### Admin Panel
- Audit log goruntuleyici ✅

---

## 24. Veritabani Yonetimi (DB Admin)

### Backend
- Module manifest + export/import controller ✅
- Module validation controller ✅

### Admin Panel
- DB admin sayfasi ✅

### Sorunlar

| # | Sorun | Dosya | Oncelik |
|---|-------|-------|---------|
| 1 | ModuleValidatePanel — backend validate endpoint'i implement edilmemis | `admin_panel/.../db/modules/ModuleValidatePanel.tsx` | ORTA |
| 2 | SiteSettingsUiPanel — backend bootstrap endpoint'i yok | `admin_panel/.../db/modules/SiteSettingsUiPanel.tsx` | ORTA |
| 3 | ModuleImportPanel — backend import endpoint'i yok | `admin_panel/.../db/modules/ModuleImportPanel.tsx` | ORTA |
| 4 | ModuleExportPanel — backend export endpoint'i yok | `admin_panel/.../db/modules/ModuleExportPanel.tsx` | ORTA |
| 5 | FullDbHeader — backend JSON export endpoint'i yok | `admin_panel/.../db/fullDb/FullDbHeader.tsx` | DUSUK |

---

## 25. Dashboard + Raporlar

### Backend
- Dashboard admin endpoint ✅

### Admin Panel
- Dashboard sayfasi ✅
- Reports sayfasi ✅

---

## Frontend Mimarisi Detayi

### Sayfa Yapisi (App Router)

```
app/
├── (redirect)/          # / → /de yonlendirme
│   ├── layout.tsx
│   └── page.tsx
├── [locale]/
│   ├── layout.tsx       # Root layout (fonts, global CSS, JSON-LD)
│   ├── page.tsx         # Ana sayfa
│   ├── head.tsx
│   ├── HomeSections.client.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── _components/
│   ├── services/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── _component/
│   ├── work/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── _component/
│   ├── pricing/
│   │   ├── page.tsx
│   │   └── _component/
│   ├── products/
│   │   ├── page.tsx
│   │   ├── [slug]/page.tsx
│   │   └── _component/
│   ├── checkout/
│   │   ├── page.tsx
│   │   ├── success/page.tsx
│   │   ├── cancel/page.tsx
│   │   └── _component/
│   ├── custompages/[module_key]/[slug]/page.tsx
│   ├── index-2/page.tsx
│   └── index-3/page.tsx
├── robots.ts
├── sitemap.ts
├── viewport.ts
└── providers.tsx
```

### Bilesen Yapisi

```
components/
├── blog/        # BlogCard1-3, BlogPost
├── elements/    # BackToTop, ImageHoverEffects, PortfolioFilter, ThemeSwitch
├── layout/      # Layout, SiteLogo, OffCanvas
│   ├── header/  # Header1-3
│   └── footer/  # Footer1-3
└── sections/    # 21 section bileseni (Home, Service, Projects, Blog, ...)
```

### Entegrasyon Katmani (RTK Query)

```
integrations/
├── apiBase.ts           # API base URL
├── baseApi.ts           # RTK Query base API
├── hooks.ts             # Auto-generated hooks (83 satir)
├── tags.ts              # Cache tag tanimlari
├── core/                # errors, normalize, token
├── endpoints/
│   ├── admin/           # 22 admin endpoint dosyasi
│   └── public/          # 23 public endpoint dosyasi
└── shared/              # Type tanimlari, normalizer'lar, helper'lar
```

### Test Altyapisi

```
tests/
├── home.spec.ts
├── services.spec.ts
├── services-detail.spec.ts
├── work.spec.ts
├── blog.spec.ts
├── seo.spec.ts
└── robots-sitemap.spec.ts
```

- **Test framework:** Playwright (E2E)
- **Kapsam:** 7 spec dosyasi — temel sayfa yuklenme ve SEO testleri
- **Unit test:** Yok

---

## Admin Panel Mimarisi Detayi

### Teknoloji Ozellikleri
- **React Compiler:** Aktif (otomatik memoization) ✅
- **Tailwind CSS 4:** PostCSS plugin ile ✅
- **shadcn/ui:** 54+ bilesen (Radix UI tabanli, WCAG uyumlu) ✅
- **Tema sistemi:** Dark/light mode + renk preset'leri + font secimi ✅
- **Drag & Drop:** dnd-kit ile tablo satirlarinda siralama ✅
- **Command Menu:** cmdk (Ctrl+K) ile hizli erisim ✅

### State Yonetimi
- **Redux Toolkit + RTK Query:** API veri cekme ve cache ✅
- **Zustand:** UI tercihleri (tema, sidebar, font) ✅
- **Persistence:** Kritik tercihler cookie'de (SSR uyumu), diger localStorage'da ✅

### Auth Akisi
- Token `localStorage`'da (`mh_access_token`) ✅
- Bearer token olarak her istekte gonderiliyor ✅
- 401'de otomatik token yenileme ✅
- **Next.js middleware YOK** — sadece client-side auth kontrolu ⚠️

### Bilesen Yapisi
```
components/
├── ui/           # 54+ shadcn/ui (Input, Card, Dialog, Table, vb.)
├── data-table/   # TanStack Table + dnd-kit (siralama, filtreleme, sayfalama)
├── common/       # AdminJsonEditor, AdminLocaleSelect, RichContentEditor
└── admin/        # 20+ modul bazli bilesen klasoru (her CRUD icin)
```

### i18n (Admin)
- `admin-translations.json` — Ana ceviri dosyasi ✅
- Desteklenen diller: tr, en, de, fr, es, it
- Fallback zinciri: istenen → kisa kod → tr → en → ilk mevcut

### Lint & Format
- **Biome 2.3:** Lint + format (2 space, 120 char satir) ✅
- **Husky + lint-staged:** Pre-commit hook'lari ✅
- **console.* kaldirma:** Uretim build'de otomatik ✅

---

## Backend Mimarisi Detayi

### Modul Yapisi (Standart Desen)

Her i18n modulu asagidaki dosyalardan olusur:
- `schema.ts` — Drizzle tablo tanimlari (parent + i18n child)
- `validation.ts` — Zod semalari
- `repository.ts` — DB sorgulari (COALESCE fallback pattern)
- `controller.ts` — Public handler'lar
- `router.ts` — Public route'lar
- `admin.controller.ts` — Admin handler'lar
- `admin.routes.ts` — Admin route'lari

### Kayitli Moduller (app.ts)

**Public (24 modul):** auth, storage, profiles, customPages, siteSettings, userRoles, faqs, services, menuItems, slider, contacts, emailTemplates, footerSections, mail, newsletter, notifications, reviews, support, projects, pricing, resume, skill, brands, seo, availability, resources, bookings

**Admin (24 modul):** audit, customPages, siteSettings, users, faqs, services, storage, menuItems, slider, contacts, dbAdmin, emailTemplates, footerSections, newsletter, reviews, support, dashboard, projects, pricing, resume, skill, brands, availability, resources, bookings

### Core Altyapi
- `core/env.ts` — Ortam degiskenleri ✅
- `core/error.ts` — Hata yonetimi ✅
- `common/middleware/locale.ts` — Locale cozumleme (query → header → Accept-Language) ✅
- `plugins/authPlugin.ts` — JWT auth ✅
- `plugins/mysql.ts` — MySQL baglantisi ✅
- `plugins/staticUploads.ts` — Statik dosya servisi ✅
- `db/client.ts` — Drizzle ORM istemcisi ✅
- `db/seed/` — Seed verileri ✅

---

## Tespit Edilen Sorunlar ve Eksiklikler

### KRITIK

| # | Sorun | Konum | Aciklama |
|---|-------|-------|----------|
| 1 | Gecici giris mekanizmasi | `backend/src/modules/auth/controller.ts:176-178` | `ALLOW_TEMP_LOGIN=1` ile `admin123` sifresiyle giris yapilabiliyor. Uretimde mutlaka kapatilmali. |

### YUKSEK

| # | Sorun | Konum | Aciklama |
|---|-------|-------|----------|
| 2 | Rate limiting enforce edilmiyor | `backend/src/app.ts` | `@fastify/rate-limit` plugin'i register edilmemis. Route config'lerde rateLimit tanimli (ornegin signup max:20) ama middleware aktif degil. Ozellikle auth ve contact endpoint'leri icin brute-force korumasi yok. |
| 3 | dangerouslySetInnerHTML (XSS riski) | Frontend — 22 dosya | Backend'den gelen HTML icerigi sanitize edilmeden render ediliyor. DOMPurify gibi bir kutuphane ile sanitize edilmeli. |
| 4 | Lighthouse Performance ~50/100 | Frontend genel | Core Web Vitals dusuk. LCP, FID, CLS iyilestirmeleri gerekli. |
| 5 | Lighthouse Accessibility ~79/100 | Frontend genel | Heading hiyerarsisi, color contrast, aria etiketleri eksik. |

### ORTA

| # | Sorun | Konum | Aciklama |
|---|-------|-------|----------|
| 6 | DB Admin — 5 backend endpoint eksik | Admin Panel DB modulleri | Validate, bootstrap, import, export, JSON export endpoint'leri implement edilmemis. |
| 7 | Chat + Support modulleri FE/Admin'de kullanilmiyor | Backend chat + support | Backend'de tam CRUD var ama ne FE'de ne Admin'de UI mevcut. |
| 8 | Kullanici silme temizligi eksik | `backend/src/modules/auth/admin.controller.ts:336` | orders, wallet_transactions, tickets silme islemi TODO. |
| 9 | Audit requestLogger plugin aktif degil | `backend/src/app.ts` | `requestLogger.plugin.ts` dosyasi mevcut ama app.ts'de register edilmemis. Audit loglama calismaz. |
| 10 | Newsletter FE formu yok | Frontend | Backend endpoint var ama FE'de abone olma formu yok. |
| 11 | Bookings FE sayfasi yok | Frontend | Randevu backend'i tam ama FE'de randevu formu/sayfasi yok. |
| 12 | E-posta senkron gonderiliyor | Backend mail modulu | Job queue (Bull/BullMQ) yok, e-posta gonderimi senkron. Hata durumunda tekrar deneme mekanizmasi yok. |
| 13 | Admin panelde Next.js middleware yok | `admin_panel` | Auth kontrolu sadece client-side. Middleware ile server-side koruma eklenmeli. |
| 14 | WebSocket env var tanimli ama entegrasyon yok | `admin_panel/.env` | `NEXT_PUBLIC_SOCKET_URL` tanimli ama kodda kullanilmiyor. |
| 15 | Webpack zorlamasi | `frontend/next.config.mjs` | wowjs UMD modulu nedeniyle Turbopack kullanilamiyor. |

### DUSUK

| # | Sorun | Konum | Aciklama |
|---|-------|-------|----------|
| 14 | README.md bos | Proje koku | Sadece `#` karakteri var, proje dokumantasyonu yok. |
| 15 | CLAUDE.md yok | Proje koku | Claude Code proje konfigurasyonu eksik. |
| 16 | Backend unit test yok | Backend | Sadece FE'de Playwright E2E testleri var. |
| 17 | Cache katmani yok | Backend | Redis veya in-memory cache yok. Sik erisilenler (site_settings, menu_items) her istekte DB'den cekiliyor. |
| 18 | API dokumantasyonu yok | Backend | OpenAPI/Swagger sema veya endpoint dokumantasyonu mevcut degil. |
| 19 | _shared/skill.ts TEMP PATH notu | `backend/src/modules/_shared/skill.ts:3` | Gecici yol notu temizlenmemis. |
| 20 | Admin panelde `any` type kullanimi | Admin Panel — 10 yer | `AdminImageUploadField`, `AdminJsonEditor`, `useAdminLocales`, `FullDbHeader` gibi dosyalarda `catch (err: any)` vb. tip guvenligi eksik. |
| 21 | Admin panelde test yok | `admin_panel` | Unit, integration veya E2E test dosyasi bulunmuyor. |
| 22 | robots.ts yanlis env var | `frontend/app/robots.ts:7` | `NEXT_PUBLIC_URL` kullaniliyor ama .env'de tanimli degil. Dogru degisken `NEXT_PUBLIC_SITE_URL` olmali. Hardcoded fallback calisiyor. |
| 23 | Backend port uyumsuzlugu | `frontend/integrations/apiBase.ts` | Dev fallback port 8084 ama backend .env'de port 8044. Env set edilmezse baglanti hatasi olur. |

---

## Mevcut Kabiliyetler Ozeti

### Tamamlanmis ve Calisan

1. **Cok dilli icerik yonetimi** — 3 dil (de/en/tr), COALESCE fallback, locale middleware
2. **i18n sayfa yapisi** — `[locale]` segmenti ile tum sayfalar dil destekli
3. **SEO altyapisi** — Metadata, JSON-LD, sitemap, robots, breadcrumb, analytics
4. **Portfolyo yonetimi** — Projeler listesi + detay + filtreleme
5. **Hizmet yonetimi** — Hizmet listesi + detay
6. **Blog sistemi** — Custom Pages uzerinden blog yaziları
7. **Fiyatlandirma** — Planlar + FAQ accordion
8. **Iletisim formu** — Form gonderimi + admin'de mesaj yonetimi
9. **Marka vitrinleri** — Logo carousel/marquee
10. **Slider yonetimi** — Admin'den yonetilebilir slider'lar
11. **Dinamik menu + footer** — Admin'den yonetilebilir navigasyon
12. **Tema degistirme** — ThemeSwitch bileseni (dark/light)
13. **Cloudinary entegrasyonu** — Gorsel yukleme + optimizasyon
14. **Admin paneli** — 30 modul icin tam CRUD arayuzu
15. **Audit logging** — Islem kaydi + canli stream
16. **E-posta sablonlari** — Dinamik e-posta icerigi
17. **JWT auth** — Kayit, giris, sifre sifirlama, Google OAuth
18. **Randevu + Musaitlik** — Backend altyapisi hazir
19. **CI/CD** — GitHub Actions ile otomatik deploy (VPS + rsync)
20. **Playwright E2E testleri** — 7 test dosyasi

### Kismi Calisan

1. **DB Admin** — UI var ama 5 backend endpoint eksik
2. **Newsletter** — Backend var, FE formu yok
3. **Chat/Support** — Backend var, FE + Admin UI yok
4. **Offers/Popups** — Admin UI var, FE gosterimi belirsiz
5. **Performance** — Lighthouse ~50/100, iyilestirme plani mevcut ama tamamlanmamis

---

## CI/CD ve Deploy

| Bilesen | Detay |
|---------|-------|
| CI Platformu | GitHub Actions |
| Workflow | `.github/workflows/main.yml` |
| Backend Build | Bun install + bun run build |
| Deploy Yontemi | rsync over SSH (retry logic, 3x tekrar, timeout 30s) |
| Hedef | VPS (`$VPS_HOST`, `$VPS_USER`) |
| PM2 | `ecosystem.config.cjs` — fork mode, 1 instance, 300M max memory |
| Docker | `docker-compose.yml` (MariaDB 10.11 + API) + `Dockerfile` (multi-stage, Node 20 Alpine) |
| Frontend Deploy | Workflow'da gorulmedi — muhtemelen ayri islem veya VPS'te build |

## Proje Istatistikleri

| Metrik | Deger |
|--------|-------|
| Backend Modul Sayisi | 31 |
| Admin Panel Sayfa Sayisi | 34 |
| Frontend Sayfa Sayisi | 15+ (dinamik dahil) |
| Tahmini API Endpoint | ~150+ |
| Veritabani Tablo Sayisi | ~70+ |
| Seed SQL Dosyasi | 80+ |
| RTK Query Endpoint Dosyasi | 45 (23 public + 22 admin) |
| Playwright Test Dosyasi | 7 |
| Desteklenen Dil | 3 (de, en, tr) |

---

## Teknoloji Stack Detayi

### Backend
| Teknoloji | Versiyon |
|-----------|----------|
| Fastify | 5.x |
| Drizzle ORM | 0.44.x |
| MySQL | mysql2 3.x |
| Zod | 3.25.x |
| Argon2 / bcryptjs | Sifre hashleme |
| Cloudinary | 2.x |
| Nodemailer | 7.x |
| Puppeteer | 24.x (PDF olusturma?) |
| Bun | Runtime |

### Frontend
| Teknoloji | Versiyon |
|-----------|----------|
| Next.js | 16.1.1 |
| React | 19.2.x |
| RTK Query | @reduxjs/toolkit 2.11.x |
| next-intl | 4.8.x |
| Swiper | 11.x |
| GSAP | 3.12.x |
| wowjs | 1.1.x |
| Playwright | 1.55.x (test) |

### Admin Panel
| Teknoloji | Versiyon |
|-----------|----------|
| Next.js | 16.1.x |
| React | 19.2.x |
| Tailwind CSS | 4.1.x |
| Radix UI | 1.4.x |
| React Hook Form | 7.69.x |
| TanStack React Query | 5.90.x |
| TanStack React Table | 8.21.x |
| Zustand | 5.x |
| Recharts | 2.15.x |
| dnd-kit | Drag & drop |
| Biome | 2.3.x (lint/format) |
| Husky + lint-staged | Pre-commit hooks |

---

## 36. Site Paketleri (Products)

**Tanim:** Satilik site paketleri (emlak, e-ticaret, ERP, landing page vb.) modulu. i18n destekli (parent + i18n pattern). Tablo adi: `site_packages` + `site_packages_i18n`.

### Backend Endpoints

| Islem                      | Endpoint                                  | Durum |
| -------------------------- | ----------------------------------------- | ----- |
| Liste (public, aktif)      | `GET /api/products`                       | ✅    |
| Detay (ID)                 | `GET /api/products/:id`                   | ✅    |
| Detay (slug)               | `GET /api/products/by-slug/:slug`         | ✅    |
| Admin: Liste (tumu)        | `GET /api/admin/products`                 | ✅    |
| Admin: Detay               | `GET /api/admin/products/:id`             | ✅    |
| Admin: Detay (slug)        | `GET /api/admin/products/by-slug/:slug`   | ✅    |
| Admin: Olustur             | `POST /api/admin/products`                | ✅    |
| Admin: Guncelle            | `PATCH /api/admin/products/:id`           | ✅    |
| Admin: Sil                 | `DELETE /api/admin/products/:id`          | ✅    |
| Admin: Siralama            | `POST /api/admin/products/reorder`        | ✅    |

### Dosya Yapisi

```
backend/src/modules/products/
  schema.ts           — site_packages + site_packages_i18n (Drizzle)
  validation.ts       — Zod: list, upsert, patch (parent + i18n)
  repository.ts       — COALESCE i18n pattern, CRUD + reorder
  controller.ts       — Public: list, getById, getBySlug
  router.ts           — Public routes
  admin.controller.ts — Admin CRUD + reorder
  admin.routes.ts     — Admin routes (auth required)
```

### Ozellikler
- **Urun tipleri:** `digital` (kaynak kod teslim), `service` (hizmet satisi)
- **Kategoriler:** `emlak`, `ecommerce`, `erp`, `landing`, vs.
- **Fiyatlandirma:** Tek seferlik (`price_onetime`) + aylik (`price_monthly`)
- **Para birimi:** EUR (varsayilan)
- **i18n:** title, slug, subtitle, description, features, seo_title, seo_description
- **Ek alanlar:** cover_image_url, gallery (JSON), demo_url, download_url, tags, tech_stack, paypal_plan_id

### Frontend (Sprint 2 — Tamamlandi)

| Sayfa / Bilesen                          | Dosya                                                         | Durum |
| ---------------------------------------- | ------------------------------------------------------------- | ----- |
| Paket listesi (SSR + client)             | `app/[locale]/products/page.tsx`                              | ✅    |
| Paket listesi client (kategori filtre)   | `app/[locale]/products/_component/ProductsClient.tsx`         | ✅    |
| Paket detay (SSR + SEO)                  | `app/[locale]/products/[slug]/page.tsx`                       | ✅    |
| Paket detay client (galeri, fiyat secimi)| `app/[locale]/products/[slug]/_component/ProductDetailClient.tsx` | ✅ |
| RTK Query endpoints                      | `integrations/endpoints/public/products.endpoints.ts`         | ✅    |
| Shared types + normalizer                | `integrations/shared/products.types.ts`                       | ✅    |
| Server-side data fetch                   | `utils/publicLists.server.ts` (getProductsListServer)         | ✅    |
| SEO keys                                 | `seo/seo.keys.ts` (products, productDetail)                   | ✅    |
| Sitemap                                  | `app/sitemap.ts` (/products + /products/[slug])               | ✅    |

**Ozellikler:**
- Kategori filtreleme: Alle, Immobilien, E-Commerce, ERP, Landing Page
- Kart gorunumu: gorsel, kategori badge, tech stack, fiyat(lar), demo linki
- Detay sayfasi: breadcrumb, gorsel galeri, odeme tipi secimi (radio), CTA butonlari, features listesi

### Admin Panel (Sprint 3 — Tamamlandi)

| Sayfa / Bilesen                          | Dosya                                                                          | Durum |
| ---------------------------------------- | ------------------------------------------------------------------------------ | ----- |
| Urun listesi (CRUD + filtre + siralama)  | `admin_panel/.../products/_components/admin-products-client.tsx`                | ✅    |
| Urun detay/form (create/edit)            | `admin_panel/.../products/_components/admin-product-detail-client.tsx`          | ✅    |
| Liste sayfa wrapper                      | `admin_panel/.../products/page.tsx`                                            | ✅    |
| Detay sayfa wrapper                      | `admin_panel/.../products/[id]/page.tsx`                                       | ✅    |
| RTK Query endpoints                      | `admin_panel/src/integrations/endpoints/admin/products_admin.endpoints.ts`      | ✅    |
| Shared types + normalizer                | `admin_panel/src/integrations/shared/products.types.ts`                         | ✅    |

**Ozellikler:**
- Urun CRUD: olustur, duzenle, sil, siralama (up/down + kaydet)
- Filtreler: arama, durum (aktif/taslak/arsiv), kategori, dil
- Form: genel bilgiler, fiyatlandirma (tek seferlik + aylik), SEO, medya, teknik stack, etiketler
- i18n: dil secimi, tum dillere kopyala/uygula
- Locale URL sync (?locale=)

---

## 37. Checkout (Odeme ve Siparis)

**Tanim:** Misafir checkout sistemi. Kayit gerektirmez, e-posta + isim bazli siparis olusturma. PayPal ile tek seferlik odeme ve aylik abonelik destegi. Tablolar: `orders`, `order_items`, `payments`, `subscriptions`.

### Backend Endpoints

| Islem                      | Endpoint                                       | Durum |
| -------------------------- | ---------------------------------------------- | ----- |
| Siparis olustur            | `POST /api/checkout/create`                    | ✅    |
| Odeme yakala (capture)     | `POST /api/checkout/capture`                   | ✅    |
| Abonelik aktifle           | `POST /api/checkout/subscription/activate`     | ✅    |
| PayPal webhook             | `POST /api/checkout/webhook`                   | ✅    |
| Siparis durumu (public)    | `GET /api/checkout/order/:id`                  | ✅    |
| Admin: Siparis listesi     | `GET /api/admin/orders`                        | ✅    |
| Admin: Siparis detayi      | `GET /api/admin/orders/:id`                    | ✅    |
| Admin: Siparis guncelle    | `PATCH /api/admin/orders/:id`                  | ✅    |
| Admin: Abonelik listesi    | `GET /api/admin/subscriptions`                 | ✅    |
| Admin: Abonelik iptal      | `POST /api/admin/subscriptions/:id/cancel`     | ✅    |

### Dosya Yapisi

```
backend/src/modules/checkout/
  schema.ts           — orders, order_items, payments, subscriptions (Drizzle)
  validation.ts       — Zod: createOrder, capture, activate, admin query/update
  repository.ts       — Tum CRUD (orders, items, payments, subscriptions)
  paypal.service.ts   — PayPal Orders API v2 + Subscriptions API v1 + Webhook
  controller.ts       — Public: create, capture, subscribe, webhook, status
  router.ts           — Public checkout routes
  admin.controller.ts — Admin: orders CRUD, subscriptions list/cancel
  admin.routes.ts     — Admin routes (auth required)
```

### PayPal Entegrasyonu

| Ozellik                   | API                          | Durum |
| ------------------------- | ---------------------------- | ----- |
| Access Token              | `/v1/oauth2/token`           | ✅    |
| Siparis Olustur           | `/v2/checkout/orders`        | ✅    |
| Odeme Yakala (Capture)    | `/v2/checkout/orders/.../capture` | ✅ |
| Abonelik Olustur          | `/v1/billing/subscriptions`  | ✅    |
| Abonelik Detay            | `/v1/billing/subscriptions/:id` | ✅ |
| Abonelik Iptal            | `/v1/billing/subscriptions/:id/cancel` | ✅ |
| Webhook Imza Dogrulama    | `/v1/notifications/verify-webhook-signature` | ✅ |

### Webhook Olaylari

| Olay                                | Islem                          |
| ----------------------------------- | ------------------------------ |
| `PAYMENT.SALE.COMPLETED`            | Abonelik yenileme -> payment kaydi |
| `BILLING.SUBSCRIPTION.CANCELLED`    | Abonelik iptal -> status guncelle  |
| `BILLING.SUBSCRIPTION.SUSPENDED`    | Abonelik askiya al                  |

### Env Degiskenleri (Yeni)

```
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
PAYPAL_WEBHOOK_ID=...
```

### SQL Seed Dosyalari

- `300_site_packages_schema.sql` — site_packages + site_packages_i18n tablolari
- `310_checkout_schema.sql` — orders, order_items, payments, subscriptions tablolari

### Frontend (Sprint 2 — Tamamlandi)

| Sayfa / Bilesen                          | Dosya                                                         | Durum |
| ---------------------------------------- | ------------------------------------------------------------- | ----- |
| Checkout sayfasi (misafir form)          | `app/[locale]/checkout/page.tsx`                              | ✅    |
| Checkout client (form + PayPal redirect) | `app/[locale]/checkout/_component/CheckoutClient.tsx`         | ✅    |
| Basarili odeme sayfasi                   | `app/[locale]/checkout/success/page.tsx`                      | ✅    |
| Basarili odeme client (capture/activate) | `app/[locale]/checkout/success/_component/SuccessClient.tsx`  | ✅    |
| Iptal sayfasi                            | `app/[locale]/checkout/cancel/page.tsx`                       | ✅    |
| RTK Query endpoints                      | `integrations/endpoints/public/checkout.endpoints.ts`         | ✅    |
| Shared types                             | `integrations/shared/checkout.types.ts`                       | ✅    |

**Checkout Akisi:**
1. Urun detaydan "Jetzt kaufen" → checkout sayfasina yonlendirir (query: product + type)
2. Misafir formu: isim, e-posta, telefon (opsiyonel)
3. "Mit PayPal bezahlen" → backend POST /checkout/create → PayPal approve_url
4. PayPal'da odeme → /checkout/success?order_id=...&token=...
5. Success sayfasi otomatik capture/activate → siparis detaylari gosterir
6. Iptal → /checkout/cancel → "Tekrar dene" butonu

**Ozellikler:**
- Sepet yok — tek urun checkout
- robots: noindex, nofollow (checkout sayfalari)
- Siparis ozeti karti (sag taraf)
- Hata yonetimi (PayPal hatalari, eksik urun vb.)

### Admin Panel (Sprint 3 — Tamamlandi)

| Sayfa / Bilesen                          | Dosya                                                                          | Durum |
| ---------------------------------------- | ------------------------------------------------------------------------------ | ----- |
| Siparis listesi (filtre + arama)         | `admin_panel/.../orders/_components/admin-orders-client.tsx`                    | ✅    |
| Siparis detay (durum + teslim yonetimi)  | `admin_panel/.../orders/_components/admin-order-detail-client.tsx`              | ✅    |
| Abonelik listesi + iptal                 | `admin_panel/.../orders/_components/admin-orders-client.tsx` (Tabs)             | ✅    |
| Liste sayfa wrapper                      | `admin_panel/.../orders/page.tsx`                                              | ✅    |
| Detay sayfa wrapper                      | `admin_panel/.../orders/[id]/page.tsx`                                         | ✅    |
| RTK Query endpoints                      | `admin_panel/src/integrations/endpoints/admin/orders_admin.endpoints.ts`        | ✅    |
| Shared types + normalizer                | `admin_panel/src/integrations/shared/orders.types.ts`                           | ✅    |

**Ozellikler:**
- Siparisler: filtreleme (durum, odeme durumu, arama), detay gorunumu
- Detay: musteri bilgileri, siparis kalemleri, odeme gecmisi, PayPal bilgileri
- Durum yonetimi: siparis durumu + odeme durumu degistirme
- Teslim: URL + not ekleme, teslim tarihi otomatik
- Admin notu ekleme
- Abonelikler: liste + iptal butonu (PayPal Subscriptions API)
- Tabs arayuzu: Siparisler / Abonelikler

### Sprint 4 — E-posta Bildirimleri + Dashboard (Tamamlandi)

#### E-posta Bildirimleri

| Tetikleyici                     | Template Key                      | Aciklama                        |
| ------------------------------- | --------------------------------- | ------------------------------- |
| Tek seferlik odeme capture      | `checkout_payment_received`       | Odeme onay e-postasi            |
| Abonelik aktiflestirildiginde   | `checkout_subscription_activated` | Abonelik baslatma bildirimi     |
| Admin "delivered" durumu secince| `checkout_order_delivered`        | Teslim bilgilendirme + link     |

- 3 sablon × 3 dil (de, en, tr) = 9 cevirisi hazir
- Seed dosyasi: `320_checkout_email_templates.sql`
- Fire-and-forget pattern: `void sendTemplatedEmail(...).catch(log)`
- `allowMissing: true` ile sablon yoksa sessizce atlanir

#### Dashboard Istatistikleri

| Kart Key        | Tablo              | Aciklama                |
| --------------- | ------------------ | ----------------------- |
| `products`      | `site_packages`    | Toplam urun sayisi      |
| `orders`        | `orders`           | Toplam siparis sayisi   |
| `subscriptions` | `subscriptions`    | Toplam abonelik sayisi  |

- `admin.controller.ts` → `getDashboardSummaryAdmin` icerisine 3 yeni satir eklendi
- Admin panel `ROUTE_MAP`'e `products`, `orders`, `subscriptions` rotalari eklendi

---

## Oneriler

### Kisa Vadeli (Hemen)
1. `ALLOW_TEMP_LOGIN` mekanizmasini uretimde kapat veya tamamen kaldir
2. `@fastify/rate-limit` plugin'ini app.ts'de register et (ozellikle auth + contact icin)
3. Audit `requestLogger` plugin'ini app.ts'de aktif et
4. `dangerouslySetInnerHTML` kullanan yerlere DOMPurify ekle
5. Bos README.md'yi proje dokumantasyonu ile doldur

### Orta Vadeli
6. Admin panele Next.js middleware ile server-side auth ekle
7. Lighthouse Performance iyilestirmelerini tamamla (IMPROVEMENT_PLAN.md)
8. DB Admin eksik endpoint'lerini implement et
9. Newsletter FE formu ekle (footer veya ayri sayfa)
10. Chat + Support icin en azindan admin UI olustur
11. Backend unit testleri ekle (en azindan repository katmani)
12. Admin panel icin E2E testleri ekle (auth akisi oncelikli)
13. E-posta gonderimini asenkron hale getir (BullMQ veya benzer job queue)
14. Redis veya in-memory cache ekle (site_settings, menu_items icin)
15. Admin paneldeki `any` type kullanimlarini duzelt
16. wowjs bagimliligini kaldir veya modern alternatifle degistir (Turbopack destegi icin)
17. OpenAPI/Swagger ile API dokumantasyonu olustur

### Uzun Vadeli
18. Randevu (Bookings) FE sayfasi/akisi olustur
19. CLAUDE.md olusturup proje konvansiyonlarini belgele
20. Playwright test kapsamini genislet (booking, contact form, i18n gecisleri)
21. CI/CD'ye frontend build + Lighthouse CI entegre et
22. Structured logging (Pino) ve monitoring altyapisi kur
