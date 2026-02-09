Sistem mimarisini tasarla veya mevcut mimariyi analiz et: $ARGUMENTS

## Mimari Prensipler (Bu Projede Zorunlu)

### 1. Clean Architecture Katmanları

```
┌─────────────────────────────────────────────┐
│                 UI / API                     │  ← Framework'e bağımlı
│         (React, Next.js, Express)            │
├─────────────────────────────────────────────┤
│              Application                     │  ← Use case'ler, DTO'lar
│          (Services, Commands)                │
├─────────────────────────────────────────────┤
│                Domain                        │  ← Entity, Value Object
│      (İş mantığı, Repository interface)      │  ← Framework BAĞIMSIZ
├─────────────────────────────────────────────┤
│             Infrastructure                   │  ← DB, Cache, External API
│     (Repository impl, ORM, Adapters)         │
└─────────────────────────────────────────────┘
```

**Bağımlılık yönü: SADECE yukarıdan aşağıya** (UI → App → Domain ← Infra)

### 2. Klasör Yapısı

```
src/
├── domain/                    # Saf iş mantığı
│   ├── entities/              # Entity tanımları
│   ├── value-objects/         # Value Object'ler
│   ├── repositories/          # Repository interface'leri
│   ├── services/              # Domain service'leri
│   └── errors/                # Domain hataları
│
├── application/               # Use case'ler
│   ├── services/              # Application service'leri
│   ├── dto/                   # Input/Output DTO'ları
│   ├── validators/            # Zod şemaları
│   └── mappers/               # Entity ↔ DTO dönüşümleri
│
├── infrastructure/            # Teknik implementasyon
│   ├── database/              # ORM, migration'lar
│   │   ├── repositories/      # Repository implementasyonları
│   │   ├── migrations/
│   │   └── seeds/
│   ├── cache/                 # Redis/memory cache
│   ├── external/              # 3rd party API client'ları
│   └── config/                # Çevre yapılandırması
│
├── presentation/              # UI katmanı
│   ├── components/            # React bileşenleri
│   │   ├── common/            # Paylaşılan bileşenler
│   │   └── features/          # Özellik bazlı bileşenler
│   ├── hooks/                 # Custom hook'lar
│   ├── pages/                 # Sayfa bileşenleri
│   └── layouts/               # Layout bileşenleri
│
├── shared/                    # Katmanlar arası paylaşılan
│   ├── types/                 # Ortak tipler, branded types
│   ├── utils/                 # Saf utility fonksiyonları
│   └── constants/             # Enum'lar (DB'deki sabitlerden farklı)
│
└── admin/                     # Admin panel
    ├── components/
    ├── pages/
    └── hooks/
```

### 3. DB-Driven Konfigürasyon Mimarisi

```
                    ┌─────────────┐
                    │  Admin Panel │
                    └──────┬──────┘
                           │ CRUD
                    ┌──────▼──────┐
                    │  Database   │
                    │             │
                    │ languages   │ ← Dil yönetimi
                    │ translations│ ← Çeviri metinleri
                    │ app_constants│ ← Tüm sabitler
                    │ themes      │ ← Tema ayarları
                    └──────┬──────┘
                           │ Cache Layer
                    ┌──────▼──────┐
                    │ Redis/Mem   │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Backend API   SSR/SSG    Frontend
         (runtime)    (build)    (client)
```

### 4. Reusability Kuralları
- **DRY**: Aynı kodu 2. kez yazıyorsan, extract et
- **Generic türler**: `Repository<T>`, `CrudService<T, CreateDto, UpdateDto>`
- **Base sınıflar**: `BaseEntity`, `BaseRepository`, `BaseService`
- **Shared bileşenler**: DataTable, FormField, Modal, Pagination, FileUploader
- **Custom hook'lar**: useDebounce, usePagination, useTranslation, useConstants

## Görevler

Eğer yeni modül tasarımı isteniyorsa:
1. Yukarıdaki yapıya uygun klasör ve dosya planı çıkar
2. Entity ve DTO tanımlarını yaz
3. Repository interface'ini tanımla
4. Service katmanını tasarla
5. API endpoint'lerini planla
6. Gerekli migration'ları listele
7. Admin panel ihtiyaçlarını belirle

Eğer mevcut mimari analizi isteniyorsa:
1. Klasör yapısını tara
2. Katman ihlallerini tespit et
3. Bağımlılık grafiğini çıkar
4. İyileştirme önerileri sun
