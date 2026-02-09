Pull Request oluştur.

## Adımlar

1. Mevcut branch'teki commit'leri analiz et (`git log main..HEAD`)
2. Değişen dosyaları listele (`git diff main --stat`)
3. PR başlığı oluştur (Conventional Commit formatı)
4. PR açıklaması oluştur

## PR Şablonu

```markdown
## Ne Değişti?
[Değişikliklerin kısa özeti]

## Neden?
[Bu değişikliğin motivasyonu]

## Nasıl Test Edilir?
1. [Adım 1]
2. [Adım 2]
3. [Beklenen sonuç]

## Kontrol Listesi
- [ ] TypeScript hatasız derleniyor (`tsc --noEmit`)
- [ ] Lint geçiyor
- [ ] Testler geçiyor
- [ ] Hard-coded değer yok
- [ ] Yeni çeviri anahtarları eklendi (gerekiyorsa)
- [ ] Migration var (gerekiyorsa)
- [ ] Dokümantasyon güncellendi (gerekiyorsa)

## Ekran Görüntüsü
[UI değişikliği varsa]
```

## Çalıştır

```bash
# Önce push et
git push origin <branch>

# GitHub CLI ile PR oluştur
gh pr create --title "<başlık>" --body "<açıklama>"
```

Eğer `gh` CLI yüklü değilse, PR içeriğini konsola yazdır ve linki ver.
