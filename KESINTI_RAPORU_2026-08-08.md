# Kesinti Raporu — www.guezelwebdesign.com · 2026-08-08

**Sure:** ~2026-07-29 → 2026-08-08 (yaklasik 10 gun, tam kesinti)
**Etki:** Sitenin **tum** sayfalari HTTP 500. Backend API (`/api/v1/*`) ve admin panel calisiyordu.
**Fark edilmeme sebebi:** PM2 sureci `online`, restart sayisi `0` gorunuyordu. Surec ayakta,
uygulama bozuktu. Hicbir saglik kontrolu HTTP seviyesinde bakmiyordu.

## Kok neden (iki katmanli)

### 1. Paylasimli workspace kokunun ezilmesi
`/var/www/vps-guezel/package.json` tum projeler icin **ortak** bun workspace kokudur
(ortak `node_modules`, ortak `bun.lock`). Bu dosyanin `workspaces` listesinden
`guezelwebdesign/{frontend,backend,admin_panel}` **dusmustu**; `gzlteknoloji` girdileri ise
uc kez tekrarlanmisti. Sebep: gzlteknoloji deploy akisinin root `package.json`'i yeniden yazmasi.

Sonuc: kokte calisan her `bun install`, guezelwebdesign frontend'inin bagimliliklarini
**kaldirdi**. `isomorphic-dompurify` paketi silindi →
`Cannot find package 'isomorphic-dompurify'` → her SSR isteginde 500.

### 2. Node surumu / undici uyumsuzlugu
1. madde duzeltilip paket geri kurulunca ikinci hata ortaya cikti:

```
TypeError: webidl.util.markAsUncloneable is not a function
```

Zincir: `isomorphic-dompurify` → `jsdom@30` → `undici@8`.
`undici@8` `engines: node >= 22.19` ister; `markAsUncloneable` Node 22.4+ ile gelen
`node:worker_threads` API'sidir. VPS sistem Node'u **20.20.2** (ustelik EOL) oldugu icin
deger `undefined` geliyordu. (bun ile calistirmak da cozmuyor — bun'da da yok.)

### 3. Artik etki: ISR onbellegi
Duzeltmelerden sonra locale sayfalari 200 dondu ama kok `/` hala **Location basligi olmayan 307**
veriyordu. Sebep: Next.js, site bozukken uretilen hatali ciktiyi
`.next/server/app/index.{html,meta,rsc}` olarak diske yazmisti (`x-nextjs-cache: HIT`).
Uygulama duzelse bile bu artik servis edilmeye devam ediyordu.

## Yapilan duzeltmeler

| # | Islem | Detay |
|---|---|---|
| 1 | Root `package.json` onarildi | `workspaces`'e guezelwebdesign/* geri eklendi, gzlteknoloji tekrarlari teke indirildi. Yedek: `package.json.bak-before-fix-20260808`, `bun.lock.bak-before-fix-20260808` |
| 2 | `bun install` (kok) | 192 paket geri kuruldu, `isomorphic-dompurify` yerine geldi |
| 3 | Node 22.23.2 yan yana kuruldu | `/home/orhan/.local/node22` — **sistem Node'una ve pm2 daemon'ina dokunulmadi**, sudo gerekmedi. Diger siteler (bun ile calisiyor) hic etkilenmedi |
| 4 | PM2 uygulamalari Node 22'ye baglandi | `npm start` yerine dogrudan `next` ikilisi + acik `interpreter` |
| 5 | Bozuk ISR artiklari kaldirildi | `.next/server/app/index.*` → `/tmp/bad-prerender-20260808/` |
| 6 | `ecosystem.config.cjs` tek kaynak yapildi | Asagiya bakiniz |

## Dogrulama

- Sitemap'teki **75 URL'in 75'i 200** dondu.
- `guezelwebdesign.com` → `www.guezelwebdesign.com/de` (2 hop, 200).
- backend `:8044/api/v1/health` 200, admin `:3045` 307 (normal login yonlendirmesi).
- Ayni VPS'teki gzltemizlik etkilenmedi (calisiyor).

## Kalici onlemler

### Tek ecosystem dosyasi
Onceden `frontend/`, `admin_panel/`, `backend/` altinda **uc ayri** `ecosystem.config.cjs` vardi
ve **ucu de yanlisti**: `cwd: /var/www/guezelwebdesign/...` (gercek yol `/var/www/vps-guezel/...`),
backend'de yanlis bun yolu. Canli surecler bu dosyalarla degil, elle `pm2 start` ile ayaga
kaldirilmisti — yani yapilandirma ile gercek arasinda tam sapma vardi.

Ucu de kaldirildi; kokte tek `ecosystem.config.cjs` var ve canli yapilandirmanin aynisi.
Ayrica **profil destegi** tasiyor (`DEPLOY_PROFILE=gwd|gzl`), boylece ayni dosya
gzlteknoloji.com TR deployment'ini da surebilir.

### Uyulmasi gereken kurallar
1. **Root `/var/www/vps-guezel/package.json`'i hicbir deploy scripti yeniden yazmaz.**
   Gerekiyorsa idempotent merge yapar (varsa ekle, mevcutlari koru, duplicate uretme).
2. Kokte `bun install` calistiran is, ayni VPS'teki diger calismalarla **koordine edilir**.
3. **"PM2'de online" saglik kaniti degildir.** Dogrulama HTTP ile yapilir (origin portu + public URL).
4. Yeni Next.js uygulamasi PM2'ye eklenirken interpreter **acikca** Node 22 verilir.
5. Kesinti sonrasi `.next/server/app/*.{html,meta,rsc}` artiklari temizlenir.

### PM2 tuzagi (not)
`pm2 startOrRestart ecosystem.config.cjs` mevcut bir uygulamanin **`script` yolunu guncellemez**
(sadece interpreter gibi bazi alanlari gunceller) — melez ve bozuk bir duruma yol acar
(bu kesinti sirasinda admin panel bu yuzden bir kez dustu, hemen geri alindi).
Tanim degistiginde: `pm2 delete <app>` + `pm2 start ecosystem.config.cjs --only <app>`.

## Acik kalan / sonraki adimlar

- **Sistem Node'u 20.x ve EOL.** Yan yana Node 22 gecici cozumdur; uygun bir bakim penceresinde
  nodesource deposu `node_22.x`'e alinip sistem geneli yukseltilmeli, sonra `NODE_BIN`
  override'i kaldirilabilir.
- **Deployed build 2026-06-11 tarihli**, kaynak ondan ~2 ay daha yeni. Yani repodaki bir dizi
  commit (orn. OSGB hizmeti) canliya hic cikmamis. Temiz bir rebuild + deploy ayrica planlanmali.
- HTTP seviyesinde otomatik saglik izleme (uptime kontrolu) yok — eklenmeli.
