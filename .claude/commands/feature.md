Yeni bir özellik geliştir: $ARGUMENTS

Aşağıdaki adımları sırasıyla uygula:

## 1. Analiz & Planlama
- Mevcut kod tabanını tara ve ilgili dosyaları bul
- Bu özelliğin hangi katmanlara dokunacağını belirle (Domain, Application, Infrastructure, UI)
- Bağımlılıkları ve etkilenen modülleri listele
- Planı onayım için sun

## 2. Domain Katmanı
- Entity/Value Object tanımla (branded type'lar ile)
- Repository interface'i oluştur
- Domain service gerekiyorsa yaz
- Tüm business logic burada olmalı, framework bağımsız

```typescript
// Örnek pattern
type FeatureId = Brand<string, 'FeatureId'>;

interface Feature {
  id: FeatureId;
  // ...props
}

interface IFeatureRepository {
  findById(id: FeatureId): Promise<Feature | null>;
  save(feature: Feature): Promise<Feature>;
}
```

## 3. Application Katmanı
- Use case / service sınıfları oluştur
- DTO'ları tanımla (input/output)
- Validation logic'i burada olmalı (zod veya class-validator)
- Error handling: custom exception sınıfları kullan

## 4. Infrastructure Katmanı
- Repository implementasyonu (Prisma/TypeORM/Drizzle)
- DB migration dosyası oluştur
- Sabitler/konfigürasyon değerleri için `app_constants` tablosuna seed ekle
- Cache stratejisi gerekiyorsa belirle

## 5. UI/API Katmanı
- API endpoint'leri veya React bileşenleri oluştur
- Tüm kullanıcıya görünen metinler `translations` tablosundan gelmeli
- Loading, error ve empty state'leri handle et
- Form varsa validation ekle

## 6. Admin Panel
- Yeni sabitler admin panelden düzenlenebilir olmalı
- Yeni çeviri anahtarları admin panelden yönetilebilir olmalı
- Gerekiyorsa CRUD sayfası oluştur

## 7. Testler
- Unit test: Domain logic için
- Integration test: API/DB etkileşimleri için
- Her test AAA pattern'i takip etsin (Arrange, Act, Assert)

## 8. Kontrol
- `tsc --noEmit` hata vermiyor mu?
- Lint/format geçiyor mu?
- Tüm testler geçiyor mu?
- Hard-coded string/değer kalmamış mı?
