Mevcut bir modülü çoklu dil destekli hale getir: $ARGUMENTS

## Genel Bakış

Bu checklist, **admin-translations.json** kullanan projeler için mevcut bir modülü (örnek: slider, storage, smtp) dil destekli hale getirme sürecini adım adım açıklar.

## Ön Koşullar

✅ Proje yapısı:
- `/src/i18n/admin-translations.json` dosyası mevcut
- `/src/i18n/adminUi.ts` içinde `useAdminTranslations` hook'u tanımlı
- Modül component'leri `/src/app/(main)/admin/(admin)/[module]/_components/` dizininde

✅ Desteklenen diller:
- Türkçe (tr)
- İngilizce (en)
- Almanca (de)

---

## Adım 1: Analiz ve Planlama

### 1.1. Modül Component'lerini Listele

```bash
# Modül dizinindeki tüm component dosyalarını listele
ls -la src/app/(main)/admin/(admin)/[MODULE]/_components/
```

**Checklist:**
- [ ] Tüm `.tsx` dosyalarını tespit et
- [ ] Her dosyanın sorumluluğunu belirle (List, Form, Header, Detail, vb.)
- [ ] Toplam dosya sayısını not et

### 1.2. Hardcoded String'leri Tespit Et

Her component dosyasını oku ve şunları belirle:

**Checklist:**
- [ ] UI label'ları (örn: "Slider Yönetimi", "Başlık", "Kaydet")
- [ ] Placeholder metinler (örn: "Başlık / slug içinde ara…")
- [ ] Buton metinleri (örn: "Düzenle", "Sil", "Yeni Oluştur")
- [ ] Tablo başlıkları (örn: "Görsel", "Durum", "Aksiyonlar")
- [ ] Error/Success mesajları (örn: "Kayıt silindi", "Hata oluştu")
- [ ] Validation mesajları (örn: "Başlık zorunludur")
- [ ] Helper metinler (örn: "Otomatik oluşturulur")
- [ ] Durum metinleri (örn: "Aktif", "Pasif", "Öne Çıkan")

**Toplam hardcoded string sayısını tahmin et:** ~150+ (orta boy modül için)

### 1.3. Translation Key Yapısını Planla

Modül için mantıksal bir hiyerarşi oluştur:

```
admin.[module].header.*        → Liste sayfası başlığı (arama, filtre, vb.)
admin.[module].list.*          → Liste view (tablo başlıkları, durum, butonlar)
admin.[module].form.*          → Form view (input label'ları, validation)
admin.[module].formHeader.*    → Form sayfası başlığı (title, action buttons)
admin.[module].formImage.*     → Görsel upload bölümü (varsa)
admin.[module].formJson.*      → JSON editor bölümü (varsa)
admin.[module].detail.*        → Detay sayfası (varsa)
```

**Checklist:**
- [ ] Her component için translation section'ı belirle
- [ ] Key naming convention'ını belirle (camelCase: `searchLabel`, `createButton`)
- [ ] Parametre gerektiren çeviriler için placeholder'ları planla (`{name}`, `{count}`)

---

## Adım 2: Translation Key'leri Ekle

### 2.1. admin-translations.json Dosyasını Oku

```bash
cat src/i18n/admin-translations.json
```

**Checklist:**
- [ ] Dosya yapısını anla (3 ana dil bloğu: tr, en, de)
- [ ] Mevcut modül section'larını incele (örnek: storage, smtp)
- [ ] Yeni modülün ekleneceği yeri belirle (alfabetik sıraya göre)

### 2.2. Türkçe (tr) Çevirileri Ekle

`admin-translations.json` dosyasında Türkçe bloğuna ekle:

```json
{
  "tr": {
    "admin": {
      // ... mevcut modüller ...
      "[module]": {
        "header": {
          "title": "Modül Yönetimi",
          "description": "Modül kayıtlarını çok dilli olarak yönet, listele ve düzenle.",
          "searchLabel": "Ara",
          "searchPlaceholder": "Başlık / slug içinde ara…",
          "localeLabel": "Dil",
          "localePlaceholder": "Dil seç",
          "localeEmptyError": "Dil seçenekleri yüklenemedi.",
          "localeEmptyHelp": "Lütfen admin/locales ayarlarını kontrol edin.",
          "filterLabel": "Filtreler",
          "onlyActiveLabel": "Sadece Aktifler",
          "onlyActiveHelp": "Yalnızca aktif kayıtları göster",
          "refreshButton": "Yenile",
          "createButton": "+ Yeni Modül",
          "loading": "Yükleniyor…",
          "total": "Toplam:"
        },
        "list": {
          "title": "Modül Listesi",
          "processing": "İşleniyor…",
          "totalLabel": "Toplam:",
          "reorderHelp": "Yukarı/aşağı butonları ile sıralamayı değiştir, ardından "Sıralamayı Kaydet" butonuna tıkla.",
          "saveOrderButton": "Sıralamayı Kaydet",
          "savingOrder": "Kaydediliyor…",
          "upButton": "Yukarı",
          "downButton": "Aşağı",
          "imageColumn": "Görsel",
          "titleColumn": "Başlık",
          "localeColumn": "Dil",
          "slugColumn": "Slug",
          "activeColumn": "Durum",
          "featuredColumn": "Öne Çıkan",
          "orderColumn": "Sıra",
          "actionsColumn": "Aksiyonlar",
          "noTitle": "(İsimsiz)",
          "noImage": "Görsel Yok",
          "buttonLabel": "Buton:",
          "linkLabel": "Link:",
          "localeLabel": "Dil:",
          "orderLabel": "Sıra:",
          "slugLabel": "Slug:",
          "activeStatus": "Aktif",
          "inactiveStatus": "Pasif",
          "featuredStatus": "Öne Çıkan",
          "normalStatus": "Normal",
          "editButton": "Düzenle",
          "deleteButton": "Sil",
          "loading": "Yükleniyor…",
          "noRecords": "Henüz kayıt yok.",
          "deleteConfirm": ""{name}" kaydını silmek istediğinize emin misiniz?",
          "deleted": ""{name}" başarıyla silindi.",
          "deleteError": "Silme işlemi başarısız.",
          "activeUpdateError": "Durum güncellenemedi.",
          "featuredUpdateError": "Öne çıkan durumu güncellenemedi.",
          "orderSaved": "Sıralama kaydedildi.",
          "orderSaveError": "Sıralama kaydedilemedi."
        },
        "form": {
          "contentTitle": "İçerik",
          "localeLabel": "Dil",
          "titleLabel": "Başlık",
          "slugLabel": "Slug",
          "slugHelp": "URL'de kullanılacak benzersiz tanımlayıcı (otomatik oluşturulur).",
          "descriptionLabel": "Açıklama",
          "orderLabel": "Görüntüleme Sırası",
          "activeLabel": "Aktif mi?",
          "activeHelp": "Ön yüzde görüntülensin mi?",
          "featuredLabel": "Öne Çıkan",
          "featuredHelp": "Slider olarak ana sayfada gösterilsin mi?",
          "buttonTextLabel": "Buton Metni",
          "buttonLinkLabel": "Buton Linki",
          "altLabel": "Alt Metin",
          "formMode": "✏️ Form",
          "jsonMode": "{ } JSON",
          "localeRequired": "Locale zorunludur.",
          "titleRequired": "Başlık zorunludur.",
          "slugRequired": "Slug zorunludur.",
          "created": "Modül kaydı başarıyla oluşturuldu.",
          "updated": "Modül kaydı başarıyla güncellendi.",
          "saveError": "Kaydetme başarısız.",
          "idNotFound": "ID bulunamadı.",
          "createTitle": "Yeni Modül Oluştur",
          "editTitle": "Modül Düzenle"
        },
        "formHeader": {
          "createTitle": "Yeni Modül Oluştur",
          "editTitle": "Modül Düzenle",
          "description": "Modül içeriklerini dil bazlı yönetin.",
          "loading": "Yükleniyor…",
          "saving": "Kaydediliyor…",
          "backButton": "Geri",
          "createButton": "Oluştur",
          "saveButton": "Kaydet"
        },
        "formImage": {
          "imageLabel": "Modül Görseli",
          "imageHelp": "Görsel yükleyin veya kütüphaneden seçin.",
          "altLabel": "Alt Metin",
          "altPlaceholder": "Görsel için alternatif metin…",
          "altHelp": "SEO ve erişilebilirlik için önemlidir."
        },
        "formJson": {
          "label": "Modül JSON",
          "helperText": "Formdaki tüm alanların bire bir karşılığıdır. Teknik kullanıcılar için."
        }
      }
      // ... sonraki modüller ...
    }
  }
}
```

**Checklist:**
- [ ] Tüm key'leri camelCase ile yaz
- [ ] Placeholder kullanılan metinleri işaretle (`{name}`, `{count}`)
- [ ] Tutarlı terminoloji kullan (örn: "Kaydet" → hep "Kaydet", "Save" değil)
- [ ] Helper/description metinler detaylı ve açıklayıcı olsun

### 2.3. İngilizce (en) Çevirileri Ekle

Türkçe çevirilerin birebir İngilizce karşılığını ekle:

**Checklist:**
- [ ] Her key için İngilizce çeviri ekle
- [ ] Teknik terimler doğru çevrilsin (slug → slug, locale → locale)
- [ ] Placeholder'lar aynı kalsın (`{name}`, `{count}`)
- [ ] Natural İngilizce kullan (örn: "Are you sure?" not "Are you certain?")

**Örnek:**
```json
{
  "en": {
    "admin": {
      "[module]": {
        "header": {
          "title": "Module Management",
          "description": "Manage, list and edit module records in multiple languages.",
          "searchLabel": "Search",
          "searchPlaceholder": "Search in title / slug…",
          // ...
        }
      }
    }
  }
}
```

### 2.4. Almanca (de) Çevirileri Ekle

Türkçe çevirilerin birebir Almanca karşılığını ekle:

**Checklist:**
- [ ] Her key için Almanca çeviri ekle
- [ ] Almanca dilbilgisi kurallarına uy (nouns büyük harfle)
- [ ] Placeholder'lar aynı kalsın
- [ ] Formal Almanca kullan (Sie, nicht du)

**Örnek:**
```json
{
  "de": {
    "admin": {
      "[module]": {
        "header": {
          "title": "Modul-Verwaltung",
          "description": "Moduleinträge mehrsprachig verwalten, auflisten und bearbeiten.",
          "searchLabel": "Suchen",
          "searchPlaceholder": "Im Titel / Slug suchen…",
          // ...
        }
      }
    }
  }
}
```

### 2.5. Doğrulama

**Checklist:**
- [ ] JSON syntax hatası yok mu? (`jq` ile kontrol et)
- [ ] Her 3 dil bloğunda aynı key yapısı var mı?
- [ ] Tüm placeholder'lar tutarlı mı?
- [ ] Virgül/süslü parantez hataları yok mu?

```bash
# JSON syntax kontrolü
jq empty src/i18n/admin-translations.json
```

---

## Adım 3: Component'leri Güncelle

### 3.1. Import Ekle

Her component dosyasına şu import'u ekle:

```typescript
import { useAdminTranslations } from '@/i18n/adminUi';
```

**Checklist:**
- [ ] Import satırı dosyanın en üstünde, diğer import'larla beraber
- [ ] Alfabetik sıraya göre yerleştir (tercihen)

### 3.2. Hook'u Çağır

Component function'ının içinde hook'u çağır:

```typescript
export function ComponentName({ ...props }) {
  const t = useAdminTranslations('tr');

  // ... rest of component
}
```

**Checklist:**
- [ ] Hook component function içinde ilk satırlarda çağrılmalı
- [ ] `const t = useAdminTranslations('tr');` şeklinde tanımla
- [ ] Locale parametresi her zaman `'tr'` (dinamik olarak değişmiyor)

### 3.3. Hardcoded String'leri Değiştir

Her hardcoded string'i `t()` fonksiyonu ile değiştir:

**Önceki:**
```typescript
<CardTitle>Slider Yönetimi</CardTitle>
```

**Sonrası:**
```typescript
<CardTitle>{t('admin.slider.header.title')}</CardTitle>
```

**Checklist:**
- [ ] Tüm label'ları güncelle
- [ ] Tüm placeholder'ları güncelle
- [ ] Tüm button metinlerini güncelle
- [ ] Tüm error/success mesajlarını güncelle
- [ ] Tüm validation mesajlarını güncelle
- [ ] Tüm helper metinleri güncelle

### 3.4. Parametreli Çeviriler

Dinamik değer içeren çeviriler için:

**Önceki:**
```typescript
toast.success(`"${item.name}" başarıyla silindi.`);
```

**Sonrası:**
```typescript
toast.success(t('admin.slider.list.deleted', { name: item.name }));
```

**Checklist:**
- [ ] Parametre gerektiren tüm metinleri tespit et
- [ ] `t()` fonksiyonuna ikinci parametre olarak obje geç
- [ ] Translation key'de placeholder kullan (`{name}`, `{count}`)

### 3.5. Özel Durumlar

#### Conditional String'ler

**Önceki:**
```typescript
{mode === 'create' ? 'Oluştur' : 'Kaydet'}
```

**Sonrası:**
```typescript
{mode === 'create' ? t('admin.slider.formHeader.createButton') : t('admin.slider.formHeader.saveButton')}
```

#### Fallback Değerler

**Önceki:**
```typescript
const name = safeText((item as any).name) || 'İsimsiz';
```

**Sonrası:**
```typescript
const name = safeText((item as any).name) || t('admin.slider.list.noTitle');
```

**Checklist:**
- [ ] Tüm conditional string'leri güncelle
- [ ] Tüm fallback değerleri güncelle
- [ ] Tüm ternary operator'leri güncelle

---

## Adım 4: Dosya Bazında Güncelleme Planı

### 4.1. Liste Component'i (örn: SliderList.tsx)

**Güncellenecek Alanlar:**
- [ ] Card başlığı (`list.title`)
- [ ] Tablo başlıkları (`list.imageColumn`, `list.titleColumn`, vb.)
- [ ] Durum badge'leri (`list.activeStatus`, `list.inactiveStatus`)
- [ ] Butonlar (`list.editButton`, `list.deleteButton`, `list.upButton`, `list.downButton`)
- [ ] Loading/Empty state metinleri (`list.loading`, `list.noRecords`)
- [ ] Label'lar (`list.buttonLabel`, `list.linkLabel`)

**Toplam string sayısı:** ~50-60

### 4.2. Header Component'i (örn: SliderHeader.tsx)

**Güncellenecek Alanlar:**
- [ ] Card başlığı ve açıklaması (`header.title`, `header.description`)
- [ ] Input label'ları (`header.searchLabel`, `header.localeLabel`)
- [ ] Placeholder'lar (`header.searchPlaceholder`, `header.localePlaceholder`)
- [ ] Butonlar (`header.refreshButton`, `header.createButton`)
- [ ] Filter label'ları (`header.onlyActiveLabel`, `header.onlyActiveHelp`)
- [ ] Error mesajları (`header.localeEmptyError`, `header.localeEmptyHelp`)

**Toplam string sayısı:** ~15-20

### 4.3. Form Component'i (örn: SliderForm.tsx)

**Güncellenecek Alanlar:**
- [ ] Card başlığı (`form.contentTitle`)
- [ ] Input label'ları (`form.titleLabel`, `form.slugLabel`, vb.)
- [ ] Helper metinler (`form.slugHelp`, `form.activeHelp`)
- [ ] Switch label'ları (`form.activeLabel`, `form.featuredLabel`)

**Toplam string sayısı:** ~25-30

### 4.4. Form Header Component'i (örn: SliderFormHeader.tsx)

**Güncellenecek Alanlar:**
- [ ] Başlık (`formHeader.createTitle`, `formHeader.editTitle`)
- [ ] Açıklama (`formHeader.description`)
- [ ] Badge'ler (`formHeader.loading`, `formHeader.saving`)
- [ ] Butonlar (`formHeader.backButton`, `formHeader.saveButton`, `formHeader.createButton`)

**Toplam string sayısı:** ~10

### 4.5. Form Page Component'i (örn: SliderFormPage.tsx)

**Güncellenecek Alanlar:**
- [ ] Validation mesajları (`form.localeRequired`, `form.titleRequired`, `form.slugRequired`)
- [ ] Toast mesajları (`form.created`, `form.updated`, `form.saveError`)
- [ ] Başlık fallback'leri (`form.createTitle`, `form.editTitle`)
- [ ] Mode butonları (`form.formMode`, `form.jsonMode`)

**Toplam string sayısı:** ~15-20

### 4.6. Client Component'i (örn: admin-slider-client.tsx)

**Güncellenecek Alanlar:**
- [ ] Delete confirmation (`list.deleteConfirm`)
- [ ] Success toast'ları (`list.deleted`, `list.orderSaved`)
- [ ] Error toast'ları (`list.deleteError`, `list.activeUpdateError`, `list.featuredUpdateError`, `list.orderSaveError`)

**Toplam string sayısı:** ~10

### 4.7. Image Upload Component'i (örn: SliderFormImageColumn.tsx)

**Güncellenecek Alanlar:**
- [ ] Label'lar (`formImage.imageLabel`, `formImage.altLabel`)
- [ ] Placeholder'lar (`formImage.altPlaceholder`)
- [ ] Helper metinler (`formImage.imageHelp`, `formImage.altHelp`)

**Toplam string sayısı:** ~5

### 4.8. JSON Editor Component'i (örn: SliderFormJsonSection.tsx)

**Güncellenecek Alanlar:**
- [ ] Label (`formJson.label`)
- [ ] Helper text (`formJson.helperText`)

**Toplam string sayısı:** ~2

---

## Adım 5: Test ve Doğrulama

### 5.1. TypeScript Compilation

```bash
npm run build
# veya
pnpm build
```

**Checklist:**
- [ ] TypeScript hataları yok mu?
- [ ] Missing import hataları yok mu?
- [ ] Type error'ları yok mu?

### 5.2. Translation Key Kontrolü

Her kullanılan key'in admin-translations.json'da tanımlı olduğundan emin ol:

```bash
# Component'lerdeki t() çağrılarını listele
grep -r "t('admin\.[module]\." src/app/(main)/admin/(admin)/[module]/_components/
```

**Checklist:**
- [ ] Tüm kullanılan key'ler JSON'da var mı?
- [ ] Typo yok mu? (örn: `titel` → `title`)
- [ ] Key hierarchy doğru mu? (örn: `admin.slider.list.title`)

### 5.3. Runtime Test

Development server'ı çalıştır ve UI'ı test et:

```bash
npm run dev
```

**Test Senaryoları:**
- [ ] Liste sayfası açılıyor mu?
- [ ] Tüm metinler Türkçe görünüyor mu?
- [ ] Arama çalışıyor mu?
- [ ] Filtreler çalışıyor mu?
- [ ] Yeni kayıt oluşturma sayfası açılıyor mu?
- [ ] Form label'ları görünüyor mu?
- [ ] Validation mesajları görünüyor mu?
- [ ] Kaydetme işlemi sonrası toast mesajları görünüyor mu?
- [ ] Düzenleme sayfası açılıyor mu?
- [ ] Silme işlemi confirmation dialog'u görünüyor mu?
- [ ] Silme sonrası success toast görünüyor mu?

### 5.4. Dil Değişimi Testi (Gelecek için)

Eğer proje dinamik dil değişimi destekliyorsa:

**Checklist:**
- [ ] Türkçe → İngilizce değişimi çalışıyor mu?
- [ ] Türkçe → Almanca değişimi çalışıyor mu?
- [ ] Tüm metinler doğru dile çevriliyor mu?
- [ ] Placeholder'lar doğru çalışıyor mu?

---

## Adım 6: Cleanup ve Finalizasyon

### 6.1. Code Review

**Checklist:**
- [ ] Tüm hardcoded string'ler temizlendi mi?
- [ ] Console.log ifadeleri kaldırıldı mı?
- [ ] Gereksiz comment'ler silindi mi?
- [ ] Import'lar temiz mi?

### 6.2. Formatting

```bash
# Prettier ile format et
npm run format
# veya
npx prettier --write "src/app/(main)/admin/(admin)/[module]/**/*.{ts,tsx}"
```

**Checklist:**
- [ ] Tüm dosyalar formatlandı mı?
- [ ] Consistent indentation var mı?

### 6.3. Linting

```bash
npm run lint
```

**Checklist:**
- [ ] Lint hataları yok mu?
- [ ] Warning'ler makul seviyde mi?

### 6.4. Git Commit

```bash
git add src/i18n/admin-translations.json
git add src/app/(main)/admin/(admin)/[module]/_components/
git commit -m "feat(i18n): add multi-language support for [module] module

- Add translations for tr, en, de languages
- Update all 8 component files with useAdminTranslations
- Replace ~150+ hardcoded strings with translation keys
- Add parameterized translations for dynamic content

Closes #XXX"
```

---

## Checklist Özeti

### 📋 Pre-Flight

- [ ] Modül component'leri listelendi
- [ ] Hardcoded string'ler tespit edildi (~150+ adet)
- [ ] Translation key yapısı planlandı

### 🌐 Translations

- [ ] admin-translations.json dosyası okundu
- [ ] Türkçe (tr) çeviriler eklendi
- [ ] İngilizce (en) çeviriler eklendi
- [ ] Almanca (de) çeviriler eklendi
- [ ] JSON syntax kontrolü yapıldı

### 🔧 Component Updates

- [ ] SliderList.tsx güncellendi (~50 string)
- [ ] SliderHeader.tsx güncellendi (~20 string)
- [ ] SliderForm.tsx güncellendi (~25 string)
- [ ] SliderFormHeader.tsx güncellendi (~10 string)
- [ ] SliderFormPage.tsx güncellendi (~15 string)
- [ ] admin-slider-client.tsx güncellendi (~10 string)
- [ ] SliderFormImageColumn.tsx güncellendi (~5 string)
- [ ] SliderFormJsonSection.tsx güncellendi (~2 string)

### ✅ Validation

- [ ] TypeScript compilation başarılı
- [ ] Translation key'ler doğrulandı
- [ ] Runtime test geçti
- [ ] UI'da hardcoded string kalmadı

### 🚀 Finalization

- [ ] Code review yapıldı
- [ ] Formatting yapıldı
- [ ] Linting geçti
- [ ] Git commit oluşturuldu

---

## İstatistikler (Slider Modülü Örneği)

- **Toplam dosya:** 8
- **Toplam string:** ~150
- **Toplam translation key:** ~100 (her dil için)
- **Süre:** ~2-3 saat (deneyimli developer için)

---

## Gelecek İyileştirmeler

- [ ] Dinamik dil değişimi ekle (şu anda hardcoded 'tr')
- [ ] Missing translation detection tool oluştur
- [ ] Translation coverage report oluştur
- [ ] Automated testing ekle (i18n için)

---

## Kaynaklar

- Translation dosyası: `/src/i18n/admin-translations.json`
- Hook: `/src/i18n/adminUi.ts` → `useAdminTranslations`
- Örnek modül: `/src/app/(main)/admin/(admin)/slider/`
- Mevcut i18n komutu: `/commands/i18n.md`
