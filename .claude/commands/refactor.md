Belirtilen kodu veya modülü refactor et: $ARGUMENTS

## Analiz Aşaması (Önce oku, sonra değiştir)

1. **Mevcut durumu anla:**
   - Dosyanın/modülün ne yaptığını özetle
   - Bağımlılıklarını ve onu kullanan yerleri bul
   - Mevcut testleri kontrol et

2. **Sorunları tespit et:**
   - Kod tekrarı (DRY ihlalleri)
   - 200 satırı aşan dosyalar
   - 20 satırı aşan fonksiyonlar
   - 3'ten fazla parametre alan fonksiyonlar
   - Deeply nested if/else veya callback'ler
   - `any` tipi kullanımları
   - Hard-coded değerler
   - God class / God function anti-pattern'leri
   - Tight coupling (sıkı bağımlılık)

## Refactoring Kuralları

- **ASLA davranışı değiştirme** — sadece yapıyı iyileştir
- **Küçük adımlarla ilerle** — her adımda testler geçmeli
- **Extract, don't rewrite** — mevcut kodu küçük parçalara ayır
- Ortak pattern'leri utility fonksiyonlarına taşı
- Magic number/string'leri named constant'lara dönüştür (DB'ye taşınacaksa `app_constants` tablosuna ekle)
- Callback hell → async/await
- Nested conditionals → early return pattern
- Switch/case → strategy pattern veya polymorphism
- Büyük interface'leri küçük, focused interface'lere böl

## Refactoring Sonrası

1. Tüm mevcut testlerin hâlâ geçtiğini doğrula
2. `tsc --noEmit` hatasız geçmeli
3. Yeni oluşan fonksiyon/modüller için test yaz
4. Değişikliklerin özetini çıkar:
   - Neler değişti ve neden
   - Önceki vs sonraki karmaşıklık karşılaştırması
   - Breaking change var mı?
