Belirtilen entity/modül için admin panel CRUD sayfaları oluştur: $ARGUMENTS

## Gereksinimler

Her admin panel sayfası şu bileşenlere sahip olmalı:

### 1. Listeleme Sayfası
- Sayfalama (sayfa boyutu `app_constants` tablosundan)
- Sıralama (tüm kolonlara göre)
- Arama/filtreleme
- Toplu işlem (seç, sil, durum değiştir)
- CSV/Excel export
- Kolon görünürlüğü ayarlanabilir

### 2. Oluşturma/Düzenleme Formu
- Tüm form label'ları `translations` tablosundan
- Validation (client + server tarafı, Zod ile)
- Dosya yükleme (gerekiyorsa)
- İlişkili kayıtlar için autocomplete/select
- Otomatik kaydetme (draft)

### 3. Detay Sayfası
- Tüm alanları göster
- İlişkili kayıtları listele
- Değişiklik geçmişi (audit log)
- Hızlı düzenleme (inline edit)

### 4. Silme
- Soft delete kullan (deleted_at)
- Bağımlılık kontrolü (ilişkili kayıt varsa uyar)
- Onay dialog'u

## Kod Yapısı

```
src/
  features/
    admin/
      [entity]/
        components/
          [Entity]List.tsx
          [Entity]Form.tsx
          [Entity]Detail.tsx
          [Entity]Filters.tsx
        hooks/
          use[Entity]List.ts
          use[Entity]Mutation.ts
        api/
          [entity].api.ts
        types/
          [entity].types.ts
        validations/
          [entity].schema.ts
```

## Kurallar
- Tüm metinler DB'den (translations tablosu)
- Tüm limitler/ayarlar DB'den (app_constants tablosu)
- Reusable bileşenler kullan (DataTable, FormField, Modal vb.)
- Her CRUD işlemi için audit log kaydı oluştur
- Yetkilendirme kontrolü: role-based access
- Responsive tasarım
- Loading skeleton'ları kullan
- Optimistic UI update
- Error boundary ile sarmalama
