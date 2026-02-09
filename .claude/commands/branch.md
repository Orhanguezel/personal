Yeni bir feature branch oluştur: $ARGUMENTS

## Adımlar

1. Mevcut branch'i kontrol et ve durumu doğrula
2. Commit edilmemiş değişiklik varsa uyar
3. `main` / `master` / `develop` branch'ine geç ve pull et
4. Branch adını oluştur:

## Branch İsimlendirme

Format: `<tip>/<kısa-açıklama>`

Tipler:
- `feature/` — Yeni özellik
- `fix/` — Hata düzeltme
- `refactor/` — Kod yeniden düzenleme
- `hotfix/` — Acil üretim düzeltmesi

Örnekler:
- `feature/user-authentication`
- `fix/login-blank-screen`
- `refactor/extract-api-utils`

## Kurallar
- Küçük harf, kelimeler tire ile ayrılır
- Türkçe karakter KULLANMA
- 50 karakteri aşmamalı
- Açıklama argümanından uygun isim türet

## Çalıştır
```bash
git checkout main && git pull
git checkout -b <branch-adı>
```
