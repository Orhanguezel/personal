#!/usr/bin/env node
/**
 * Sunucuda derleme kilidi (2026-10-01, hepsihal ile ayni kural).
 *
 * vps-guezel sunucusu (72.61.23.36) 1 vCPU / 3.9 GB RAM ve 7 canli siteyi tasiyor.
 * Sunucuda next build / tsc dakikalarca tam CPU yer; build boyunca tum siteler
 * yavaslar (2026-09-03 CPU krizi: load 36, tum siteler dustu). Ayrica root ile
 * alinan bir build `.next`'i root'a birakmis, PM2 sureci ISR onbellegine yazamamis
 * ve sayfalar haftalarca yenilenmemisti.
 *
 * Derleme YEREL yapilir: `bash scripts/deploy-yerel.sh`.
 *
 * Sunucuda `/etc/vps-guezel-derleme-yasak` dosyasi durur; varken her build betigi
 * burada durur. Yalniz acil durumda (yerel makineye erisim yok, site kirik):
 * SUNUCUDA_DERLE=evet-acil
 */
import { existsSync } from 'node:fs';

const MARKER = '/etc/vps-guezel-derleme-yasak';

if (existsSync(MARKER) && process.env.SUNUCUDA_DERLE !== 'evet-acil') {
  process.stderr.write(
    [
      `HATA: bu sunucuda derleme yasak (${MARKER}).`,
      '1 vCPU; build boyunca tum canli siteler yavaslar.',
      'Derlemeyi yerelde yap ve yayimla: bash scripts/deploy-yerel.sh',
      'Yalniz acil durumda: SUNUCUDA_DERLE=evet-acil',
      '',
    ].join('\n'),
  );
  process.exit(1);
}
