Proje sabitlerini ve konfigürasyon değerlerini yönet: $ARGUMENTS

## Temel Prensipler

Bu projede **tüm sabitler ve konfigürasyon değerleri veritabanında tutulur**.
Admin panelden düzenlenebilir olmalıdır. Deploy gerektirmeden değiştirilebilmelidir.

## Hard-coded Değer YASAKTIR

Aşağıdakiler KESİNLİKLE kod içinde hard-coded olmamalıdır:
- UI metinleri (çeviriler — `/i18n` komutuna bak)
- Renk kodları, font boyutları (tema ayarları)
- Sayfa başlığları, meta açıklamaları
- E-posta şablonları
- Hata mesajları
- Limit değerleri (sayfa boyutu, max upload, timeout)
- Feature flag'ler
- Fiyatlar, vergiler, komisyonlar
- İş kuralları parametreleri

## Veritabanı Şeması

```sql
CREATE TABLE app_constants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_name  VARCHAR(100) NOT NULL,    -- 'pagination', 'upload', 'email'
  key         VARCHAR(255) NOT NULL,     -- 'page_size', 'max_file_size'
  value       TEXT NOT NULL,             -- '25', '10485760'
  value_type  VARCHAR(20) NOT NULL,      -- 'string', 'number', 'boolean', 'json'
  description TEXT,                      -- Admin panelde gösterilecek açıklama
  is_public   BOOLEAN DEFAULT false,     -- Frontend'e gönderilsin mi?
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_name, key)
);

CREATE INDEX idx_constants_group ON app_constants(group_name);
CREATE INDEX idx_constants_public ON app_constants(is_public) WHERE is_public = true;
```

## TypeScript Entegrasyonu

```typescript
// types/constants.ts
interface AppConstant {
  groupName: string;
  key: string;
  value: string;
  valueType: 'string' | 'number' | 'boolean' | 'json';
  description?: string;
  isPublic: boolean;
}

// Tip-güvenli erişim
interface ConstantsService {
  getString(group: string, key: string): Promise<string>;
  getNumber(group: string, key: string): Promise<number>;
  getBoolean(group: string, key: string): Promise<boolean>;
  getJSON<T>(group: string, key: string): Promise<T>;
  invalidateCache(group?: string): Promise<void>;
}

// Kullanım
// const pageSize = await constants.getNumber('pagination', 'page_size');
// const maxUpload = await constants.getNumber('upload', 'max_file_size');
```

## Cache Stratejisi

- Sabitler başlangıçta yüklenip memory/Redis cache'te tutulmalı
- Admin panelden değiştirildiğinde cache invalidate edilmeli
- TTL: 5 dakika (configurable)
- Fallback: Cache miss'te DB'den oku

## Görevler

Eğer yeni sabit eklenmesi isteniyorsa:
1. `app_constants` tablosuna seed/migration ekle
2. Tip-güvenli accessor fonksiyonu yaz
3. Admin panel CRUD'unu güncelle
4. Kodda hard-coded olan yeri DB çağrısıyla değiştir

Eğer hard-coded değer taraması isteniyorsa:
1. Tüm dosyalarda magic number/string tara
2. Regex ile şunları bul: hard-coded URL, port, limit, boyut, süre
3. Her bulguyu tablo halinde listele: dosya, satır, değer, önerilen grup/anahtar
4. Migration script'i ve seed data'yı hazırla

## Admin Panel Gereksinimleri

- Sabitleri gruplara göre listele
- Inline düzenleme (değer, açıklama)
- Değişiklik geçmişi (audit log)
- JSON tipindekiler için JSON editörü
- Değişiklik sonrası cache temizleme butonu
