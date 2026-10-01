# GZL Gelir CRM → Website Content API v1.0

Bu sözleşme GZL Gelir CRM'nin Güzel Web Design/GZL Teknoloji ortak backend'inde çok dilli bir proje kaydı ve gerçek raster kapak görseli oluşturmasını sağlar.

## Uçlar

- `GET /api/v1/integrations/gzl-crm/capabilities`
- `POST /api/v1/integrations/gzl-crm/projects`
- Yerel varsayılan: `http://127.0.0.1:8044/api/v1/integrations/gzl-crm/projects`

Her istek `Authorization: Bearer <GZL_CRM_CONTENT_API_KEY>` taşır. Anahtar tanımlı değilse servis `503`, yanlışsa `401` döner. Anahtar için fallback yoktur.

## Create isteği

İstek `multipart/form-data` biçimindedir:

- `payload`: Aşağıdaki JSON sözleşmesi.
- `image`: Zorunlu JPEG, PNG, WebP veya AVIF dosyası. En çok 12 MiB. SVG kabul edilmez.

```json
{
  "contractVersion": "1.0",
  "operation": "create",
  "externalId": "crm:project:demo",
  "project": {
    "category": "Özel Yazılım ve ERP",
    "clientName": "Demo GmbH",
    "websiteUrl": "https://example.com",
    "demoUrl": null,
    "repositoryUrl": null,
    "services": ["CRM geliştirme", "API entegrasyonu"],
    "technologies": ["Next.js", "Fastify", "MySQL"],
    "featured": false,
    "displayOrder": 40
  },
  "translations": {
    "tr": {
      "title": "Demo CRM Platformu",
      "slug": "demo-crm-platformu",
      "summary": "Demo şirketi için geliştirilen çok dilli CRM ve operasyon platformu.",
      "content": {
        "html": "<p>Projenin kapsamı, çözümü ve ölçülebilir sonuçları.</p>",
        "description": "Ayrıntılı proje açıklaması.",
        "key_features": ["Müşteri yönetimi"],
        "technologies_used": ["Next.js", "Fastify"],
        "design_highlights": ["Responsive yönetim paneli"]
      },
      "featuredImageAlt": "Demo CRM yönetim paneli ekranı",
      "imageCaption": "Canlı operasyon paneli",
      "metaTitle": "Demo CRM Platformu ve Operasyon Yazılımı",
      "metaDescription": "Demo CRM projesinin kapsamını, teknolojilerini ve uygulama sonuçlarını inceleyin."
    },
    "en": { "...": "Aynı zorunlu alanların İngilizcesi" },
    "de": { "...": "Aynı zorunlu alanların Almancası" }
  },
  "publication": {
    "status": "published",
    "displayPermission": true,
    "imageRightsConfirmed": true
  }
}
```

`tr`, `en` ve `de` birlikte ve eksiksiz gönderilir. Locale fallback ile başka dilin metni yayınlanmaz. Slug her dil için küçük harf, rakam ve tire biçimindedir.

## Yayın ve tekrar kuralları

- Kayıt ancak `status=published`, `displayPermission=true` ve `imageRightsConfirmed=true` birlikteyse canlı yayınlanır; aksi halde taslak oluşturulur.
- Görsel hakkı onayı olmadan create reddedilir.
- `externalId` tekildir. Aynı kimlikle ikinci POST `409 external_id_already_exists` döner.
- Her dil `projects_i18n`, görsel metinleri `project_images_i18n` ve `storage_assets_i18n` tablolarına ayrı yazılır.
- Görsel MIME değeri yanında dosya imzasıyla doğrulanır ve SHA-256 isimli deterministik yerel yola kaydedilir.

Başarılı yanıt:

```json
{
  "id": "website-project-uuid",
  "externalId": "crm:project:demo",
  "published": true,
  "imageUrl": "/uploads/integrations/gzl-crm/projects/crm:project:demo/hash.webp"
}
```

## CRM komutu

```bash
GZL_WEBSITE_CONTENT_API_KEY='...' npm run website:project:create -- \
  --contract ./data/project-create.json \
  --image /absolute/path/to/cover.webp
```

Sözleşme create yetkisi verir; v1.0 update/delete yetkisi vermez.
