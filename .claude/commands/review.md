Kod tabanında kapsamlı bir inceleme yap. Aşağıdaki kontrol listesini sırasıyla uygula:

## 1. TypeScript Strict Uyumluluğu
- `any` tipi kullanılmış mı? Varsa `unknown` veya doğru tiple değiştir
- `import type { ... }` kullanılıyor mu? Tip-only importları düzelt
- Branded type'lar domain ID'ler için kullanılıyor mu? (UserId, ProductId vb.)
- Tüm fonksiyonların dönüş tipleri explicit mi?
- `strictNullChecks` ihlalleri var mı?

## 2. Clean Architecture & SOLID
- Single Responsibility: Her dosya/fonksiyon tek bir iş mi yapıyor?
- Katmanlar arası bağımlılık yönü doğru mu? (UI → Application → Domain → Infrastructure)
- Domain katmanı framework'ten bağımsız mı?
- Interface Segregation: Gereksiz büyük interface'ler var mı?
- Dependency Inversion: Somut sınıflara doğrudan bağımlılık var mı?

## 3. Kod Tekrarı (DRY)
- Tekrarlanan kod blokları bul
- Ortak utility/helper fonksiyonlarına taşınabilecek kodları belirle
- Benzer pattern'ler için generic/reusable çözümler öner

## 4. Determinizm & Konfigürasyon
- Hard-coded string/sayı var mı? Bunlar DB constant'larına taşınmalı
- Çevreye göre değişen değerler environment variable'da mı?
- Magic number/string kullanılmış mı?

## 5. i18n & Lokalizasyon
- UI'da hard-coded Türkçe/İngilizce metin var mı? Bunlar DB'den gelmeli
- Tarih/sayı formatları locale-aware mi?
- RTL desteği düşünülmüş mü?

## 6. Performans & Güvenlik
- N+1 query problemi var mı?
- Gereksiz re-render var mı? (React ise useMemo/useCallback eksik mi?)
- SQL injection, XSS riski var mı?
- Hassas veriler loglanıyor mu?

## 7. Test Kapsamı
- Yeni eklenen fonksiyonların testleri var mı?
- Edge case'ler test ediliyor mu?
- Mock'lar doğru kullanılıyor mu?

Sonuçları önem sırasına göre listele. Her bulgu için:
- **Dosya ve satır** numarası
- **Seviye**: 🔴 Kritik | 🟡 Önemli | 🟢 Öneri
- **Açıklama** ve **düzeltme önerisi**
