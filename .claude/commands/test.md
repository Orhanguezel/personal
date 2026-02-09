Belirtilen dosya/modül için kapsamlı testler yaz: $ARGUMENTS

## Test Stratejisi

### 1. Mevcut Durumu Analiz Et
- Hedef dosyayı oku ve ne yaptığını anla
- Mevcut testleri kontrol et (varsa)
- Bağımlılıkları belirle (mock'lanacaklar)
- Test framework'ünü tespit et (Jest, Vitest vb.)

### 2. Test Kategorileri

**Unit Testler** — İzole fonksiyon/sınıf testleri
- Her public fonksiyon için en az bir test
- Happy path + edge case + error case
- External bağımlılıklar mock'lanmalı

**Integration Testler** — Modüller arası etkileşim
- API endpoint'leri (request → response)
- DB işlemleri (repository layer)
- Servisler arası iletişim

### 3. AAA Pattern (Zorunlu)

```typescript
describe('FeatureService', () => {
  describe('create', () => {
    it('should create a new feature with valid input', async () => {
      // Arrange — hazırlık
      const input: CreateFeatureDto = {
        name: 'Test Feature',
        // ...
      };
      mockRepository.save.mockResolvedValue({ id: '1', ...input });

      // Act — çalıştır
      const result = await service.create(input);

      // Assert — doğrula
      expect(result).toBeDefined();
      expect(result.name).toBe('Test Feature');
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Test Feature' })
      );
    });
  });
});
```

### 4. Edge Case'ler (Mutlaka Test Et)
- Boş input / null / undefined
- Çok uzun string'ler
- Negatif sayılar, sıfır, MAX_SAFE_INTEGER
- Boş array / tek elemanlı array
- Duplicate kayıt
- Yetkisiz erişim
- Network hatası / timeout
- Concurrent (eşzamanlı) işlemler

### 5. Mock Kuralları
- Sadece external bağımlılıkları mock'la (DB, API, file system)
- Internal modülleri mock'lama — gerçeğini kullan
- Mock factory pattern kullan:
  ```typescript
  const createMockUser = (overrides?: Partial<User>): User => ({
    id: 'user-1' as UserId,
    email: 'test@example.com',
    name: 'Test User',
    ...overrides,
  });
  ```

### 6. Test İsimlendirme
```
describe('[Modül/Sınıf adı]')
  describe('[metot adı]')
    it('should [beklenen davranış] when [koşul]')
```

Örnekler:
- `should return user when valid id is provided`
- `should throw NotFoundError when user does not exist`
- `should invalidate cache when user is updated`

## Kontroller
- Tüm testler geçiyor mu? (`npm run test`)
- Coverage yeterli mi? (minimum %80)
- Testler birbirinden bağımsız mı? (sıra değişse de geçmeli)
- Test süresi makul mü? (bir test 5 saniyeyi aşmamalı)
