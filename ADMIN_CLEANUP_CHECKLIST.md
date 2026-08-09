# Admin Panel Temizlik Checklist'i

Bu liste 2026-08-09 canlı GWD/GZL denetiminden üretilmiştir. Sıralama güvenlik ve kullanıcıya etkisine göredir.

## P0 — Güvenlik ve bozuk akışlar

- [x] Seed runner'daki tahmin edilebilir yönetici parola fallback'ini kaldır; `ADMIN_PASSWORD` yoksa fail-closed durdur.
- [ ] Canlı GWD yönetici parolasını döndür ve mevcut refresh token'ları iptal et. (Canlı veri işlemi; bakım/deploy adımı.)
- [ ] GWD'deki 6 kullanıcıyı ve rollerini incele; eski/ilgisiz hesapları kullanıcı onayıyla kapat.
- [x] Hizmet düzenlemede slug kullanan liste ile UUID bekleyen detay guard'ı arasındaki çelişkiyi kaldır.
- [x] Backend rotası olmayan Raporlar modülünü navigasyondan kaldır.
- [ ] GZL yönetici hesabını ayrı kimlik bilgisiyle doğrula; parola sıfırlamadan önce kullanıcı onayı al.

## P1 — Marka, dil ve kimlik

- [x] Giriş ekranındaki Tavvuk marka kalıntılarını TR/EN/DE metinlerinden kaldır.
- [x] `tavvuk-admin` paket adını nötr bir admin paket adına taşı.
- [x] Panel UI dilini düzenlenen içerik dilinden ayır; GWD için DE, GZL için TR varsayılanı kullan.
- [x] Sidebar ve hesap menüsündeki sabit `Admin/admin` değerlerini gerçek oturum kullanıcısına bağla.
- [x] GWD/GZL deployment profiline göre menü modüllerini ayrı ayrı göster.
- [ ] Dashboard ve liste ekranlarındaki karışık TR/DE/EN metinleri tek UI diline geçir.

## P1 — Medya ve içerik yönetimi

- [x] Relative `/uploads/...` medya URL'lerini panel domaini yerine doğru public site/media originine çöz.
- [ ] Storage liste ve detay ekranında kırık görsel fallback'i ve hata durumu göster.
- [ ] Site Settings ekranını ham key/JSON tablosundan görev odaklı formlara böl.
- [ ] `contact_info` içindeki kişisel Gmail adresini kurumsal adresle değiştir. (İçerik kararı gerekli.)
- [ ] Global/locale silme işlemlerini ayrı danger zone'a taşı ve etkisini açıkça yaz.

## P2 — Kullanılabilirlik

- [ ] Dashboard'u ham tablo sayıları yerine yeni mesaj, eksik çeviri, kırık medya ve SEO görevlerine odakla.
- [x] Kullanılmayan Chat/Support/Mail modüllerini gizle; GZL'de CV/Skills modüllerini kaldır.
- [ ] Hizmet sıralamasında kaydedilmemiş değişiklik göstergesi ekle.
- [ ] Silme eylemlerini ikincil menüye taşı; geri döndürülemez işlemlerde kayıt adını doğrulat.
- [x] Gerçek davranışı olmayan “30 gün beni hatırla” seçeneğini kaldır.
- [ ] Mobil panelde dashboard, ayarlar, editörler ve uzun tablolar için responsive QA yap.

## SEO ve public site bağlantılı işler

- [ ] GWD aktif dillerini DE/EN, GZL aktif dilini TR ile sınırla.
- [ ] `/index-2` ve `/index-3` sayfalarını sitemap'ten çıkar.
- [ ] Ana sayfadaki sıfır sayaç, sıfır skill ve boş proje/deneyim bölümlerini veriyle doldur veya gizle.
- [ ] GWD mobil yatay taşmasını gider.

## Kabul testleri

- [x] Admin `tsc --noEmit`, Biome check ve production build geçiyor.
- [x] Backend typecheck ve production build geçiyor.
- [ ] GWD canlı yönetici oturumuyla tüm görünür menü rotaları 4xx/5xx ve console error üretmeden açılıyor.
- [ ] Hizmet listesi -> Düzenle -> form yüklenir; kayıt yapmadan geri dönülebilir.
- [ ] Storage önizlemeleri doğru origin üzerinden 200 döner.
- [ ] GWD masaüstü/mobil ve GZL masaüstü/mobil smoke testleri geçer.
