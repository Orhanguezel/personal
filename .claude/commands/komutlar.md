Bunlar zaten Claude Code oturumunun içinde yazılan komutlar — terminalde ayrıca bir şey çalıştırmana gerek yok. Claude Code açıkken mesaj yazdığın yere (ekran görüntüsündeki "Queue another message..." alanına) doğrudan şunları yaz:

## Claude Code Slash Komutları

**Bağlamı sıkıştırmak için:**
```
/compact
```

**Tamamen sıfırlamak için:**
```
/clear
```

**Özel talimatla sıkıştırmak için:**
```
/compact Sadece API değişikliklerini ve migration bilgilerini koru
```

Yani bunlar `npm` veya `git` gibi terminal komutları değil — Claude Code'un kendi chat arayüzüne yazılan slash komutları. Mesaj kutusuna `/` yazınca zaten mevcut komutların listesi çıkacaktır.

---

## Özel Skill Komutları

Bu proje için hazırlanmış özel skill'ler:

### Geliştirme
- `/admin [entity]` - CRUD admin paneli oluştur
- `/api [endpoint]` - Yeni API endpoint oluştur
- `/component [name]` - Yeni UI component oluştur
- `/feature [name]` - Yeni özellik geliştir
- `/migrate [description]` - Database migration oluştur

### i18n (Çoklu Dil)
- `/i18n [işlem]` - Genel i18n altyapısını yönet
- `/i18n-convert-module [module]` - **YENİ!** Mevcut modülü dil destekli hale getir

### Kod Kalitesi
- `/scan [kriter]` - Proje prensiplerini tara
- `/review` - Kod incelemesi yap
- `/refactor [target]` - Kodu refactor et
- `/test [target]` - Test yaz

### Mimari
- `/architect [konu]` - Sistem mimarisi tasarla
- `/constants` - Proje sabitleri yönet

### Git İşlemleri
- `/commit` - Değişiklikleri incele ve commit oluştur
- `/push` - Hızlı commit ve push
- `/pr` - Pull request oluştur
- `/branch [name]` - Feature branch oluştur

### Diğer
- `/yapilacaklar` - Yapılacaklar listesi
- `/KURULUM` - Kurulum rehberi

**Kullanım:** Mesaj kutusuna `/skill-name [argümanlar]` şeklinde yaz.

**Örnek:**
```
/i18n-convert-module slider
```
Bu komut slider modülünü tamamen dil destekli hale getirir.