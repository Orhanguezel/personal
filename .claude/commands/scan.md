Kod tabanında proje prensiplerine aykırı durumları tara: $ARGUMENTS

## Tarama Kategorileri

### 1. Hard-coded Değer Taraması 🔍
Tüm kaynak dosyalarında şunları ara:
- Hard-coded UI metinleri (Türkçe/İngilizce string'ler JSX/TSX içinde)
- Magic number'lar (fonksiyon parametresi veya config olmayan sayılar)
- Hard-coded URL'ler, port numaraları, IP adresleri
- Hard-coded renk kodları (#fff, rgb() vb.)
- Hard-coded dosya boyutu limitleri
- Hard-coded timeout/interval süreleri

Hariç tut: test dosyaları, tip tanımları, enum değerleri

### 2. Kod Tekrarı Taraması 🔄
- 5+ satırlık aynı veya çok benzer kod blokları
- Aynı mantığı farklı yerlerde tekrarlayan fonksiyonlar
- Copy-paste belirtileri (benzer isimlendirme pattern'leri)
- Benzer API çağrıları birleştirilebilir mi?

### 3. TypeScript Kalite Taraması 📝
- `any` tipi kullanımları
- `as` type assertion'ları (type guard tercih et)
- `// @ts-ignore` veya `// @ts-expect-error`
- Eksik return tipi
- `interface` vs `type` tutarsızlığı
- Kullanılmayan import'lar ve değişkenler

### 4. Mimari İhlal Taraması 🏗️
- UI katmanından doğrudan DB erişimi
- Domain katmanında framework import'u
- Circular dependency (dairesel bağımlılık)
- Katmanlar arası yanlış yönde bağımlılık
- God file (500+ satır dosyalar)
- God function (50+ satır fonksiyonlar)

### 5. Güvenlik Taraması 🔒
- Console.log ile hassas veri loglama
- Hardcoded credentials, API key, secret
- SQL/NoSQL injection riski
- XSS açığı (dangerouslySetInnerHTML, innerHTML)
- Eksik input validation
- CORS ayarları

### 6. i18n Uyumluluk Taraması 🌍
- UI'da `translations` tablosu yerine doğrudan metin kullanımı
- Tarih formatı locale-aware değil (moment/dayjs kullanmıyor)
- Sayı formatı locale-aware değil
- Para birimi hard-coded

## Çıktı Formatı

Her bulgu için tablo oluştur:

| # | Kategori | Seviye | Dosya:Satır | Bulgu | Önerilen Düzeltme |
|---|----------|--------|-------------|-------|-------------------|
| 1 | Hard-coded | 🔴 | src/pages/Home.tsx:42 | "Hoş geldiniz" | t('home.welcome') |
| 2 | DRY | 🟡 | src/api/*.ts | Aynı error handling 6 yerde | Ortak middleware |

Sonunda özet:
- Toplam bulgu sayısı (kategorilere göre)
- Öncelikli düzeltme sırası önerisi
- Tahmini efor (kolay/orta/zor)
