#!/usr/bin/env node
/**
 * Yerelde derlenmis `.next`'in harici paket baglantilarini sunucuya gore yeniden kurar.
 *
 * Turbopack `serverExternalPackages` icin `.next/node_modules/<paket>-<hash>` adinda
 * GORELI bir symlink yazar; hedef, derlemenin yapildigi makinedeki node_modules'tur.
 * Sunucuda o yol yoksa SSR'da "Failed to load external module <paket>-<hash>" ve 500
 * (2026-10-01, gzlteknoloji.com /tr/blog). Ad (hash) chunk'lara gomulu oldugu icin
 * korunur; yalniz hedef, uygulama dizininden yukari dogru bulunan pakete cevrilir.
 *
 * Kullanim: node next-externals-bagla.mjs <next-dizini> <uygulama-dizini>
 * Cozulemeyen paket varsa cikis 1 — yayin gecisi yapilmamalidir.
 */
import { existsSync, lstatSync, readdirSync, symlinkSync, unlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const [nextDir, appDir] = process.argv.slice(2).map((p) => resolve(p));
const root = join(nextDir, 'node_modules');
if (!existsSync(root)) process.exit(0);

function findPackage(name) {
  for (let d = appDir; ; d = dirname(d)) {
    const candidate = join(d, 'node_modules', name);
    if (existsSync(join(candidate, 'package.json'))) return candidate;
    if (dirname(d) === d) return null;
  }
}

function links(dir, prefix = '') {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (lstatSync(full).isSymbolicLink()) out.push({ full, name: prefix + entry });
    else if (entry.startsWith('@')) out.push(...links(full, `${entry}/`));
  }
  return out;
}

let failed = 0;
for (const { full, name } of links(root)) {
  const pkg = name.replace(/-[0-9a-f]{16}$/, '');
  const target = findPackage(pkg);
  if (!target) {
    process.stderr.write(`HATA: ${pkg} sunucuda bulunamadi (${appDir})\n`);
    failed += 1;
    continue;
  }
  unlinkSync(full);
  symlinkSync(target, full);
  process.stdout.write(`    ${name} -> ${target}\n`);
}
process.exit(failed ? 1 : 0);
