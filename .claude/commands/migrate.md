Veritabanı değişikliği / migration oluştur: $ARGUMENTS

## Kurallar

### 1. Migration Dosyası
- ORM'in migration aracını kullan (Prisma migrate, Drizzle kit, TypeORM migration)
- Her migration tek bir mantıksal değişiklik içermeli
- Migration adı açıklayıcı olmalı: `add_user_preferences_table`, `add_index_on_translations`

### 2. Tablo Standartları

Her tabloda **zorunlu** alanlar:
```sql
id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
deleted_at  TIMESTAMPTZ          -- soft delete
```

### 3. İsimlendirme Kuralları
- Tablo adları: `snake_case`, çoğul (`users`, `order_items`)
- Kolon adları: `snake_case` (`first_name`, `is_active`)
- Index adları: `idx_[tablo]_[kolonlar]` (`idx_users_email`)
- Foreign key: `fk_[tablo]_[referans_tablo]` (`fk_orders_user_id`)
- Unique constraint: `uq_[tablo]_[kolonlar]` (`uq_users_email`)

### 4. Foreign Key Kuralları
- Her ilişki için explicit foreign key tanımla
- `ON DELETE` davranışını belirle:
  - `CASCADE`: Alt kayıtlar da silinsin (dikkatli kullan)
  - `SET NULL`: Alt kayıtlardaki referans NULL olsun
  - `RESTRICT`: İlişkili kayıt varsa silmeyi engelle (varsayılan tercih)
- Referans tablolarının da migration sıralamasına dikkat et

### 5. Index Stratejisi
- Foreign key kolonlarına index ekle
- Sık sorgulanan kolonlara index ekle
- Composite index'lerde kolon sırası önemli (en seçici olan önce)
- Partial index kullan: `WHERE deleted_at IS NULL`, `WHERE is_active = true`
- Unique constraint doğal index oluşturur, ayrıca ekleme

### 6. Seed Data
- `app_constants` tablosuna yeni sabitler ekleniyorsa seed'e ekle
- `translations` tablosuna yeni çeviri anahtarları ekleniyorsa tüm aktif diller için kayıt oluştur
- `languages` tablosu değişiyorsa etkilenen çevirileri güncelle
- Seed data idempotent olmalı (tekrar çalıştırılsa hata vermemeli)

### 7. Rollback
- Her migration'ın `down` / `rollback` tanımı olmalı
- Veri kaybına yol açacak rollback'lerde uyar

## Migration Sonrası Kontroller
- [ ] Migration hatasız çalışıyor mu?
- [ ] Rollback çalışıyor mu?
- [ ] TypeScript tipleri güncellendi mi? (Prisma generate, Drizzle push vb.)
- [ ] Seed data eklendi mi?
- [ ] İlgili repository/service'ler güncellendi mi?
- [ ] Performans etkisi değerlendirildi mi? (büyük tablolarda ALTER)
