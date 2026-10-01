# AGENTS.md - guezelwebdesign

## SUNUCUDA DERLEME YASAK (2026-10-01, Orhan, zorunlu)

Sunucu `orhan@72.61.23.36` (1 vCPU, 7 canli site). `~/.ssh/config`'teki
`guezelwebdesign` takma adi ESKI bir IP'yi gosterir ve o makine artik bize ait
DEGIL — o adla baglanma.

- Yayin yalniz yerelden: `bash scripts/deploy-yerel.sh` (yerelde derler, ciktiyi
  gonderir, sunucuda yalniz `.next` takasi + `pm2 restart` + saglik kontrolu).
- Sunucuda yasak: `bun run build`, `build:deploy`, `next build`, `tsc`, `bun test`,
  Playwright/Chromium, lighthouse, `sudo` ile build. `/etc/vps-guezel-derleme-yasak`
  varken build betikleri durur (`scripts/derleme-kilidi.mjs`); kilidi asma, isaret
  dosyasini silme. Tek istisna Orhan'in acik acil durum onayi: `SUNUCUDA_DERLE=evet-acil`.
- Push deploy degildir; GitHub Actions yalniz kalite kapisi calistirir.
- Deploy'dan once `df -h /` bak; sunucuda `.next-*`, `*.bak`, kopya dizin biriktirme.
- Ayrinti: `CLAUDE.md` > "SUNUCUDA DERLEME YASAK".
