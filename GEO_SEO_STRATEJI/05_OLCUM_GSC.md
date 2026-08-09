# Ölçüm & Google Search Console (GSC) Oyun Kitabı

**Amaç:** "Yayınladık, umarız işe yarar" değil; GSC verisiyle **hangi sayfanın hangi kelimede nerede olduğunu** görüp en yüksek getirili hamleyi yapmak. GSC'de öne çıkmak = bu döngüyü disiplinli çevirmek.

---

## 1. Kurulum (yayın günü — bir kez)

1. **GSC** — domain property (`gzlteknoloji.com`), DNS TXT ile doğrula (tüm alt yol + subdomain kapsanır).
2. **Bing Webmaster Tools** — ekle (Copilot + Bing görünürlüğü; GSC'den import edilebilir).
3. **GA4** — kur, GTM ile bağla. Dönüşüm olayları: `teklif_formu_gonderim`, `demo_talebi`, `whatsapp_tikla`, `telefon_tikla`.
4. **Sitemap** — GSC'ye `sitemap.xml` gönder.
5. **İlk indexleme** — en önemli 10 URL için "URL Inspection → Request Indexing".
6. **IndexNow** (opsiyonel, Bing) — yeni/güncellenen URL'leri anında bildir.

---

## 2. Taban ölçüm (ilk 7–14 gün)

Site yeni; ilk hafta veri az olacak, panik yok. Kaydet:
- Toplam impression / click (muhtemelen ~0'dan başlar).
- Coverage: kaç sayfa "Indexed", kaç "Excluded" ve neden.
- İlk görünen sorgular (genelde marka + uzun kuyruk).

Bu taban, 30/60/90 gün hedeflerinin (bkz. `00`) referansı.

---

## 3. KPI seti (aylık izlenecek)

| KPI | Kaynak | Neden |
|---|---|---|
| Toplam impression | GSC Performance | Görünürlük büyüyor mu |
| Toplam click | GSC | Gerçek trafik |
| Ortalama pozisyon (para sayfaları) | GSC (sayfa filtresi) | Sıralama trendi |
| İlk 10'daki sorgu sayısı | GSC (position ≤ 10) | Rekabet gücü |
| Index'li sayfa oranı | GSC Coverage | Teknik sağlık |
| Organik → lead dönüşümü | GA4 | Para eden trafik mi |
| AI atıf sayısı (manuel test) | Dosya 04 rutini | GEO ilerleme |
| Core Web Vitals (iyi URL %) | GSC / PageSpeed | Sıralama faktörü |

---

## 4. GSC'de "hızlı zafer" avlama (en yüksek ROI iş)

Bu, GSC'nin en değerli kullanımı. Aylık şu üç sorguyu çalıştır:

**A) Fırsat sorguları — 2. sayfada takılanlar (pozisyon 8–20).**
GSC Performance → Queries → pozisyona göre sırala → 8–20 aralığı. Bunlar "birazcık itince ilk sayfaya girecek" kelimeler. Aksiyon: o sayfayı güncelle (başlığa kelimeyi ekle, içeriği derinleştir, iç link ver). *Yeni içerik yazmaktan çok daha hızlı sonuç verir.*

**B) Yüksek impression, düşük CTR sayfaları.**
Gösterim var ama tıklama yok = title/description zayıf. Aksiyon: meta title/description'ı daha çekici + kelime-önde yaz (dosya 02 şablonu).

**C) "Fırsat sorgusu" ama sayfamız yok.**
GSC'de bir sorgu geliyor ama o niyeti karşılayan sayfamız yoksa → yeni içerik konusu (dosya 03 takvimine ekle).

---

## 5. Coverage / hata izleme

İlk ay haftalık, sonra aylık GSC "Pages" (Coverage):
- **Indexed** artıyor mu?
- **"Discovered – currently not indexed"** → içerik zayıf/az; güçlendir veya iç link ver.
- **"Crawled – not indexed"** → kalite sinyali düşük; E-E-A-T + özgünlük artır.
- **"Duplicate / alternate"** → canonical/hreflang hatası; dosya 02'yi kontrol et.
- **noindex kazası** → para sayfası yanlışlıkla noindex olmuş mu? (en sık ve en pahalı hata).

---

## 6. Aylık ritim (30 dakikalık disiplin)

Her ayın ilk günü:

1. **Skor kartını doldur** (aşağıdaki tablo) — KPI'lar geçen aya göre.
2. **Hızlı zafer avı** (Bölüm 4 A/B/C) → 3–5 somut aksiyon çıkar.
3. **Kazananı güçlendir** — en çok büyüyen 1–2 sayfayı genişlet/güncelle (`dateModified` tazele).
4. **AI atıf testi** (dosya 04) — sonuçları işle.
5. **Sıradaki içerik** — takvimden (dosya 03) sonraki yazıları teyit et; GSC'den gelen yeni fırsat konularını ekle.

---

## 7. Aylık skor kartı şablonu

```
## GZL Teknoloji — SEO/GEO Skor Kartı — {AY/YIL}

| Metrik              | Geçen ay | Bu ay | Δ   |
|---------------------|----------|-------|-----|
| Impression          |          |       |     |
| Click               |          |       |     |
| Ort. pozisyon (para)|          |       |     |
| Top-10 sorgu        |          |       |     |
| Index'li sayfa      |          |       |     |
| Organik lead        |          |       |     |
| AI atıf (test)      |          |       |     |
| CWV iyi URL %       |          |       |     |

### Bu ay kazananlar (büyüyen sayfa/kelime)
-

### Hızlı zafer aksiyonları (pozisyon 8–20)
- [ ] {sayfa} — {kelime} — {ne yapılacak}

### Bu ay yayınlanan içerik
-

### Sıradaki ay planı
-
```

---

## 8. Gerçekçi beklenti (dürüst)

- Yeni domain "sandbox" etkisiyle ilk 2–3 ay yavaş sıralanır; bu normal, panikle içerik silme.
- İlk kazançlar **uzun kuyruk + düşük rekabet + yerel + GEO** kelimelerden gelir (yüksek hacimli "e-ticaret sitesi" değil).
- GEO atıfı bazen klasik sıralamadan **önce** gelir (AI motorları yeni ama yapılı/spesifik içeriği hızlı alıntılar) — bu yüzden GEO kümesi (dosya 03, Küme 3) erken önceliklidir.
- Bileşik etki: 3. aydan sonra içerik+otorite birikimi hızlanır. İstikrar > patlama.

**Tek cümlelik strateji:** Düşük rekabetli + gerçek uzmanlığımız olan kelimelerde erken kazan, GSC'yle kazananı büyüt, GEO ile hem klasik hem AI aramada aynı içerikten çift görünürlük al.
