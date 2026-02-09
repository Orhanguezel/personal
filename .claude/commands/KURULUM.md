# Claude Code Komutları — Kurulum Rehberi

## Hızlı Kurulum

Tüm komut dosyalarını global Claude Code commands dizinine kopyala:

```bash
# Hedef klasörü oluştur
mkdir -p ~/.claude/commands

# Dosyaları kopyala
cp claude-commands/*.md ~/.claude/commands/
```

Hepsi bu kadar! Claude Code'u açtığında komutlar otomatik olarak tanınacak.

---

## Komut Listesi

| Komut | Ne Yapar |
|-------|----------|
| `/review` | Kapsamlı kod inceleme (TS strict, SOLID, DRY, güvenlik, i18n) |
| `/feature <açıklama>` | Clean architecture'a uygun yeni özellik geliştir |
| `/refactor <hedef>` | Kodu davranışını bozmadan yeniden düzenle |
| `/i18n <görev>` | DB tabanlı çoklu dil sistemi yönet |
| `/constants <görev>` | DB tabanlı sabit/konfigürasyon yönet |
| `/admin <entity>` | Admin panel CRUD sayfaları oluştur |
| `/api <endpoint>` | Clean architecture'a uygun API endpoint oluştur |
| `/component <isim>` | Reusable React/UI bileşeni oluştur |
| `/test <hedef>` | Kapsamlı test yaz (unit + integration) |
| `/migrate <açıklama>` | Veritabanı migration oluştur |
| `/commit` | Conventional Commit formatında commit at |
| `/push` | Hızlı commit + push |
| `/branch <açıklama>` | Feature branch oluştur |
| `/pr` | Pull Request oluştur (gh CLI ile) |
| `/scan` | Proje prensiplerine aykırı durumları tara |
| `/architect <görev>` | Sistem mimarisi tasarla veya analiz et |

---

## Kullanım Örnekleri

```bash
# Kod inceleme
/review

# Yeni özellik
/feature kullanıcı profil sayfası, profil fotoğrafı yükleme ile

# Hard-coded değer taraması
/scan hard-coded değerler

# Yeni dil ekleme
/i18n Almanca dil desteği ekle

# Admin sayfası
/admin products

# API endpoint
/api GET /users/:id profil bilgilerini döndürsün

# Migration
/migrate kullanıcı tercihleri tablosu ekle

# Mimari tasarım
/architect sipariş yönetim modülü tasarla
```

---

## Özelleştirme

Her `.md` dosyasını ihtiyacına göre düzenleyebilirsin.
Yeni komut eklemek için `~/.claude/commands/` altına yeni `.md` dosyası koy.
