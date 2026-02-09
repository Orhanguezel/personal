Yeni bir API endpoint oluştur: $ARGUMENTS

## Endpoint Yapısı (Clean Architecture)

Her endpoint şu katmanlardan oluşmalı:

### 1. Router/Controller
```typescript
// routes/[resource].routes.ts
// - HTTP method + path tanımı
// - Request validation (Zod middleware)
// - Authentication/Authorization middleware
// - Controller fonksiyonu çağrısı
// - Response formatı standardize
```

### 2. DTO (Data Transfer Object)
```typescript
// dto/[action]-[resource].dto.ts
// - Zod schema ile input validation
// - Response tipi tanımı
// - ASLA entity'yi doğrudan response olarak dönme
```

### 3. Use Case / Service
```typescript
// services/[resource].service.ts
// - İş mantığı burada
// - Repository interface'i üzerinden DB erişimi
// - Transaction yönetimi
// - Event/notification tetikleme
```

### 4. Repository
```typescript
// repositories/[resource].repository.ts
// - Interface tanımı (domain katmanında)
// - Implementasyon (infrastructure katmanında)
// - Sorgu optimizasyonu
```

## Standartlar

### Response Formatı
```typescript
// Başarılı
{
  success: true,
  data: T,
  meta?: { page, limit, total, totalPages }
}

// Hata
{
  success: false,
  error: {
    code: string,        // 'VALIDATION_ERROR', 'NOT_FOUND'
    message: string,     // translations tablosundan
    details?: unknown[]  // validation hataları için
  }
}
```

### Hata Kodları
- Hata mesajları `translations` tablosundan gelmeli
- Hata kodları enum/const olarak tanımlanmalı
- HTTP status code'ları doğru kullanılmalı (400, 401, 403, 404, 409, 422, 500)

### Güvenlik
- Input sanitization
- Rate limiting
- JWT/Session authentication
- Role-based authorization
- Request size limitleri (`app_constants` tablosundan)

### Performans
- Sayfalama zorunlu (list endpoint'lerinde)
- Select sadece gerekli alanları çek
- N+1 query kontrolü
- Cache header'ları (GET istekleri için)

## Kontrol Listesi
- [ ] Zod validation şeması yazıldı
- [ ] DTO'lar tanımlandı
- [ ] Service/use case yazıldı
- [ ] Repository metodu eklendi
- [ ] Hata durumları handle edildi
- [ ] Auth middleware eklendi
- [ ] Unit test yazıldı
- [ ] Integration test yazıldı
- [ ] API dokümantasyonu güncellendi
