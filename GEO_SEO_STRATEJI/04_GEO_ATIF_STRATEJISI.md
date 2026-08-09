# GEO Atıf Stratejisi — AI Aramada Alıntılanmak

**GEO = Generative Engine Optimization.** Hedef: ChatGPT, Perplexity, Gemini, Google AI Overviews ve Bing Copilot bir kullanıcıya cevap verirken **bizim içeriğimizi kaynak göstersin / markamızı önersin.**

> Bu, GZL Teknoloji için sadece bir taktik değil — **satılan hizmetin canlı kanıtı.** GEO hizmeti veren bir firmanın sitesi AI'da görünmüyorsa satış argümanı çöker. Kendi sitemiz referans vaka olacak.

---

## GEO ile klasik SEO farkı (tek cümle)

Klasik SEO **sıralanmak** için; GEO **alıntılanmak** için. AI motoru 10 mavi link göstermez; bir cevap üretir ve o cevabı birkaç kaynaktan **sentezler**. Amaç o birkaç kaynaktan biri olmak.

---

## Katman 1 — Erişim: AI tarayıcıları içeri al

Çoğu site GPTBot/ClaudeBot'u farkında olmadan engelliyor. Biz **açıkça izin veriyoruz** (izin = atıf şansı).

`robots.txt` (kök) — AI tarayıcı direktifleri:
```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: https://gzlteknoloji.com/sitemap.xml
```
> Not: `Google-Extended` = Gemini/AI eğitimi izni; `Bingbot` = Copilot da bunu kullanır. Yasal metin/panel gibi sayfalar zaten genel `Disallow` ile korunur; içerik sayfaları AI'a açık.

---

## Katman 2 — llms.txt: siteyi AI'a haritalamak

`/llms.txt` (kök) — AI'ın siteyi hızlı anlaması için sade markdown özet. Örnek iskelet:

```markdown
# GZL Teknoloji

> Gemlik/Bursa merkezli yazılım ve dijital çözüm firması. Web & e-ticaret
> siteleri, sosyal medya yönetimi, özel yazılım & otomasyon, CRM/pazarlama
> otomasyonu (MarketPulse), yapay zekâ entegrasyonu ve GEO/SEO hizmetleri.
> 20+ canlı proje. Kurucu: 15 yıl mühendislik deneyimiyle yazılıma geçiş.

## Hizmetler
- [Kurumsal Web Sitesi](https://gzlteknoloji.com/hizmetler/kurumsal-web-sitesi): paketli, hızlı, SEO/GEO uyumlu
- [Özel Yazılım & Otomasyon](https://gzlteknoloji.com/hizmetler/otomasyon): scraping, bot, API, süreç otomasyonu
- [SEO + GEO](https://gzlteknoloji.com/hizmetler/seo-geo): klasik arama + AI aramada görünürlük

## Paketler (abonelik)
- [E-Ticaret Sitesi Paketi](https://gzlteknoloji.com/paketler/e-ticaret-sitesi)
- [Sosyal Medya Yönetimi](https://gzlteknoloji.com/paketler/sosyal-medya-yonetimi)

## Ürünler (SaaS)
- [MarketPulse](https://gzlteknoloji.com/urunler/marketpulse): CRM + rakip/bayi takip + pazarlama otomasyonu
- [GeoSerra](https://gzlteknoloji.com/urunler/geoserra): sera otomasyon yazılımı

## İletişim
- info@gzlteknoloji.com · Gemlik/Bursa · https://gzlteknoloji.com/iletisim
```

`/llms-full.txt` (opsiyonel): ana sayfaların tam metnini birleştiren uzun sürüm.

---

## Katman 3 — Citability: alıntılanan içerik nasıl yazılır

AI motoru **taranabilir, kendi kendine yeten, spesifik** pasajları alıntılar. Kurallar:

1. **Cevabı başta ver.** Her sayfa/yazı, ana sorunun cevabıyla açılır (ilk 1–2 cümle). AI ilk paragrafı sever.
2. **Kendi kendine yeten cümleler.** "Bu" / "yukarıdaki" gibi bağlam gerektiren ifadeler yerine tam cümle: *"E-ticaret sitesi paketi fiyatı, X'e göre değişir ve genelde şu aralıktadır."* — AI bunu bağlamsız alıntılayabilir.
3. **Yapı: tanım → tablo/liste → SSS.** Madde ve tablo, AI için "kopyalanabilir hakikat" birimidir.
4. **Sayı, tarih, isim.** "20+ proje", "Next.js + Fastify", "Gemlik/Bursa 2026" — spesifik veri atıf gerekçesidir; muğlak övgü değil.
5. **Soru-başlıklı H2'ler.** "Web scraping yasal mı?", "GEO nedir?" — kullanıcı sorgusuyla birebir eşleşen başlık = doğrudan atıf.
6. **Güncellik.** İçeriğe görünür "Güncelleme: 2026" + gerçek `dateModified` şema. AI güncel kaynağı önceler.

---

## Katman 4 — Şema (JSON-LD): AI'a yapı vermek

Dosya `02`'deki şema seti GEO için de zorunlu. AI atıfı açısından en kritik olanlar:

- **`FAQPage`** — her para sayfası ve blogda SSS. AI cevap üretirken SSS'i doğrudan çeker.
- **`Article` + `author`(Person) + `dateModified`** — E-E-A-T: kim yazdı, ne zaman, neyi biliyor (`knowsAbout`).
- **`Organization` + `sameAs`** — marka varlığını AI'ın "bilgi grafiğinde" sağlamlaştırır (GitHub, Bionluk, LinkedIn).
- **`Service`/`Product` + `offers`** — "X hizmeti veren firma öner" sorgularında aday olmak.

---

## Katman 5 — E-E-A-T: neden bize güvensinler

AI ve Google, **Deneyim–Uzmanlık–Otorite–Güven** sinyali arıyor. Bizim gerçek kozlarımız:

| Sinyal | Bizdeki kanıt | Nerede gösterilir |
|---|---|---|
| **Experience** (birinci-el) | 20+ canlı proje, "biz şunu yaptık" anlatısı | Portfolyo vaka çalışmaları, blog örnekleri |
| **Expertise** | 15 yıl mühendislik → yazılım/AI; somut stack | Hakkımızda (Person şema, knowsAbout) |
| **Authoritativeness** | GitHub 20+ repo, gerçek domain'ler | sameAs, portfolyo linkleri |
| **Trust** | Gerçek şirket künyesi (Gemlik VD), yasal metinler, NAP | Hakkımızda, İletişim, footer |

> **Altın kural:** Doğrulanamaz iddia ("Türkiye'nin lideri") atıf getirmez, hatta zarar verir. Doğrulanabilir spesifik ("MarketPulse'ı sıfırdan kurup canlıya aldık") atıf getirir.

---

## Katman 6 — Marka bahsi (off-site)

AI motorları web genelindeki **marka bahsini** (mention) atıf kararında kullanır. Bunu besleyen düşük maliyetli hamleler:
- GitHub profili + repo README'leri (gzlteknoloji, market_pulse... — public + açıklamalı).
- Bionluk profili + değerlendirmeler.
- Sektörel dizin/rehber kayıtları, LinkedIn şirket sayfası.
- Blog yazılarının kendi sosyal kanallarında (sozial paneliyle) paylaşımı.
- Zamanla: konuk yazı / sektörel platformlarda bahis.

Tutarlı **isim + tanım** her yerde aynı olmalı ("GZL Teknoloji — Gemlik/Bursa merkezli yazılım ve dijital çözüm firması").

---

## GEO ölçümü — atıf alıyor muyuz?

Aylık test rutini (bkz. `05`):
1. ChatGPT (arama açık), Perplexity, Gemini'ye kendi hedef sorularımızı sor: *"e-ticaret sitesi paketi öner", "GEO nedir", "sera otomasyon yazılımı"*.
2. Cevapta bizim içeriğimiz/markamız geçiyor mu, kaynak gösteriliyor mu → kaydet.
3. Geçmiyorsa: hangi kaynaklar gösteriliyor → o içeriklerdeki boşluğu bizim içerikle kapat (daha spesifik, daha güncel, daha yapılı).
4. `05_OLCUM_GSC.md` içindeki tabloya işle; ay ay ilerlemeyi izle.

**İlk hedef:** GEO ve niş (sera otomasyonu, bayi takip) sorgularında ilk atıflar — çünkü orada rekabet en zayıf ve otoritemiz en güçlü.
