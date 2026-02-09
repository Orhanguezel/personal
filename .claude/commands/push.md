Tüm değişiklikleri hızlıca commit ve push et.

## Adımlar

1. `git status` ile değişiklikleri kontrol et
2. Değişiklik yoksa bilgi ver ve dur
3. `git diff --stat` ile özet göster
4. Conventional Commit formatında uygun mesaj oluştur
5. `git add -A`
6. `git commit -m "<mesaj>"`
7. `git push origin <mevcut-branch>`

## Kurallar
- `main` veya `master` branch'indeyse UYAR ve onay iste
- Push başarısız olursa (`--set-upstream` gerekiyorsa) otomatik düzelt
- Commit mesajında AI/Claude referansı OLMAMALI
- Birden fazla mantıksal değişiklik varsa ayrı commit'ler öner
