Git değişikliklerini incele ve commit oluştur.

## Adımlar

1. `git status` ve `git diff` ile değişiklikleri incele
2. Değişiklikleri mantıksal gruplara ayır (gerekirse birden fazla commit)
3. Her grup için Conventional Commit formatında mesaj oluştur

## Conventional Commit Formatı

```
<tip>(<kapsam>): <açıklama>

[opsiyonel gövde]

[opsiyonel footer]
```

### Tipler
- `feat`: Yeni özellik
- `fix`: Hata düzeltme
- `refactor`: Kod yeniden düzenleme (davranış değişmez)
- `docs`: Dokümantasyon
- `test`: Test ekleme/düzeltme
- `chore`: Build, CI, bağımlılık güncelleme
- `style`: Kod formatı (whitespace, semicolon vb.)
- `perf`: Performans iyileştirme
- `ci`: CI/CD değişiklikleri

### Kapsam Örnekleri
- `feat(auth)`: Kimlik doğrulama ile ilgili
- `fix(i18n)`: Çeviri ile ilgili
- `refactor(api)`: API katmanı

### Kurallar
- Açıklama küçük harfle başlar, nokta ile bitmez
- Açıklama 72 karakteri aşmaz
- Gövdede **ne** değiştiği ve **neden** değiştiği yazılır
- Breaking change varsa: `BREAKING CHANGE:` footer ekle
- İlgili issue varsa: `Closes #123` footer ekle
- Commit mesajında AI/Claude referansı OLMAMALI

## Çalıştır

```bash
git add -A
git commit -m "<oluşturulan mesaj>"
```

Birden fazla mantıksal değişiklik varsa ayrı commit'ler halinde stage'le ve commit et.
