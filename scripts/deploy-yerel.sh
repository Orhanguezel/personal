#!/usr/bin/env bash
# deploy-yerel.sh — derlemeyi YEREL makinede yapar, sunucuya yalniz hazir ciktiyi gonderir.
#
# Neden (2026-10-01, hepsihal ile ayni kural): vps-guezel sunucusu 1 vCPU / 3.9 GB RAM ve
# 7 canli siteyi tasiyor. Sunucuda next build dakikalarca tam CPU yiyor, build boyunca
# tum siteler yavasliyor. CI'in deploy isi de sunucuda `rm -rf .next && bun run build`
# yapiyordu (build suresince site kapali). Sunucuda derleme artik yasak:
# /etc/vps-guezel-derleme-yasak + scripts/derleme-kilidi.mjs.
#
# Akis:
#   1. origin/main'i monorepo kokunde ayri bir worktree'ye cikarir (calisma agacindaki
#      commit'lenmemis is derlemeye girmez). node_modules monorepo'dakilerden baglanir.
#   2. Her kurulum (gwd, gzl) icin sunucunun .env dosyalarini alir; NEXT_PUBLIC_* derlemeye
#      gomulur ve marka verisi (public/ui, config/brand.generated.json) o kurulumun
#      API'sinden uretilir. Ayni cikti iki siteye GONDERILMEZ.
#   3. Yerelde derler; ciktiyi sunucuda `.next-upload-<sha>` dizinine rsync'ler.
#   4. Sunucuda yalniz gecis: .next -> .next.prev, upload -> .next, pm2 restart,
#      saglik kontrolu. Basarisizsa .next.prev'e geri doner.
#
# Kullanim:
#   bash scripts/deploy-yerel.sh                          # frontend, iki kurulum
#   APPS="frontend admin_panel backend" bash scripts/deploy-yerel.sh
#   TREES=gwd bash scripts/deploy-yerel.sh                # yalniz guezelwebdesign.com
#   BUILD_ONLY=1 bash scripts/deploy-yerel.sh             # yalniz yerel derleme
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
VPS_ROOT="$(dirname "$REPO")"
HOST="${DEPLOY_HOST:-orhan@72.61.23.36}"
BASE="${DEPLOY_BASE:-/var/www/vps-guezel}"
WT="${BUILD_WORKTREE:-$VPS_ROOT/.build-guezelwebdesign}"
APPS="${APPS:-frontend}"
TREES="${TREES:-gwd gzl}"
STAGE="$WT/.deploy-out"

tree_dir()  { case "$1" in gwd) echo guezelwebdesign ;; gzl) echo gzlteknoloji-site ;; *) echo "bilinmeyen kurulum: $1" >&2; exit 1 ;; esac; }
api_base()  { case "$1" in gwd) echo https://www.guezelwebdesign.com/api/v1 ;; gzl) echo https://gzlteknoloji.com/api/v1 ;; esac; }
pm2_name()  {
  local p; case "$1" in gwd) p=guezelwebdesign ;; gzl) p=gzlteknoloji ;; esac
  case "$2" in frontend) echo "$p-frontend" ;; admin_panel) echo "$p-admin-panel" ;; backend) echo "$p-backend" ;; esac
}
health_url() {
  case "$1:$2" in
    gwd:frontend) echo http://127.0.0.1:3044/de ;;   gzl:frontend) echo http://127.0.0.1:3120/tr ;;
    gwd:admin_panel) echo http://127.0.0.1:3045/auth/login ;; gzl:admin_panel) echo http://127.0.0.1:3121/auth/login ;;
    gwd:backend) echo http://127.0.0.1:8044/api/v1/health ;;  gzl:backend) echo http://127.0.0.1:8102/api/v1/health ;;
  esac
}

echo "==> [1/4] origin/main cekiliyor"
git -C "$REPO" fetch --quiet origin main
SHA="$(git -C "$REPO" rev-parse --short=12 origin/main)"
echo "    yayimlanacak: $SHA $(git -C "$REPO" log -1 --format=%s origin/main)"
if [ ! -e "$WT/.git" ]; then
  git -C "$REPO" worktree add --detach "$WT" origin/main >/dev/null
fi
git -C "$WT" checkout --quiet --detach --force "$SHA"
git -C "$WT" clean -fdxq -e node_modules
for app in $APPS; do
  # Bagimliliklar monorepo'daki kurulumdan gelir (yerelde test edilen surumler).
  [ -d "$REPO/$app/node_modules" ] && ln -sfn "$REPO/$app/node_modules" "$WT/$app/node_modules"
  # origin/main'in bagimliliklari yerel kurulumdan farkliysa uyar; eksik paket derlemeyi zaten dusurur.
  if ! diff -q <(node -e "const p=require('$WT/$app/package.json');console.log(JSON.stringify([p.dependencies,p.devDependencies]))") \
               <(node -e "const p=require('$REPO/$app/package.json');console.log(JSON.stringify([p.dependencies,p.devDependencies]))") >/dev/null; then
    echo "    UYARI: $app bagimliliklari yerel package.json'dan farkli; derleme duserse monorepo kokunde 'bun install'." >&2
  fi
done

echo "==> [2/4] yerel derleme"
LOGDIR="$WT/.deploy-logs"; mkdir -p "$LOGDIR" "$STAGE"
for app in $APPS; do
  if [ "$app" = backend ]; then
    # Backend kurulumdan bagimsiz: bir kez derlenir, iki kuruluma da gider.
    (cd "$WT/backend" && rm -rf dist && bun run build > "$LOGDIR/backend.log" 2>&1) \
      || { tail -40 "$LOGDIR/backend.log"; echo "HATA: backend derlemesi" >&2; exit 1; }
    rm -rf "$STAGE/backend"; mkdir -p "$STAGE/backend"; mv "$WT/backend/dist" "$STAGE/backend/dist"
    echo "    backend derlendi"; continue
  fi
  for t in $TREES; do
    td="$(tree_dir "$t")"
    scp -q "$HOST:$BASE/$td/$app/.env" "$WT/$app/.env"
    scp -q "$HOST:$BASE/$td/$app/.env.production.local" "$WT/$app/.env.production.local" 2>/dev/null || rm -f "$WT/$app/.env.production.local"
    rm -rf "$WT/$app/.next"
    if [ "$app" = frontend ]; then
      cmd=(env API_BASE="$(api_base "$t")" bun run build:deploy)
    else
      cmd=(bun run build)
    fi
    if ! (cd "$WT/$app" && "${cmd[@]}" > "$LOGDIR/$t-$app.log" 2>&1); then
      tail -60 "$LOGDIR/$t-$app.log"; echo "HATA: $t $app derlemesi" >&2; exit 1
    fi
    out="$STAGE/$t/$app"; rm -rf "$out"; mkdir -p "$out"
    mv "$WT/$app/.next" "$out/.next"
    rm -rf "$out/.next/cache"
    # public/ui/*.json ve config/brand.generated.json kuruluma ozeldir (marka kurali).
    cp -a "$WT/$app/public" "$out/public"
    git -C "$WT" checkout --quiet -- "$app/public" "$app/config" 2>/dev/null || true
    rm -f "$WT/$app/.env" "$WT/$app/.env.production.local"
    echo "    $t $app derlendi"
  done
done

if [ -n "${BUILD_ONLY:-}" ]; then echo "OK yalniz derleme: $STAGE"; exit 0; fi

echo "==> [3/4] sunucuya gonderiliyor"
RS=(rsync -a --compress --delete)
for t in $TREES; do
  td="$(tree_dir "$t")"
  for app in $APPS; do
    dir="$BASE/$td/$app"
    if [ "$app" = backend ]; then
      "${RS[@]}" "$STAGE/backend/dist/" "$HOST:$dir/.dist-upload-$SHA/"
    else
      "${RS[@]}" "$STAGE/$t/$app/.next/" "$HOST:$dir/.next-upload-$SHA/"
      # public --delete OLMADAN: sunucuda yuklenmis dosyalar (uploads) durur.
      rsync -a --compress "$STAGE/$t/$app/public/" "$HOST:$dir/public/"
      rsync -a "$WT/$app/package.json" "$WT/$app"/next.config.* "$HOST:$dir/"
    fi
  done
done

echo "==> [4/4] yayin gecisi (derlemesiz)"
for t in $TREES; do
  td="$(tree_dir "$t")"
  for app in $APPS; do
    dir="$BASE/$td/$app"; name="$(pm2_name "$t" "$app")"; url="$(health_url "$t" "$app")"
    if [ "$app" = backend ]; then cur=dist; up=".dist-upload-$SHA"; else cur=.next; up=".next-upload-$SHA"; fi
    ssh "$HOST" "set -e; cd $dir
      sudo -n rm -rf $cur.prev $cur.failed
      [ -e $cur ] && mv $cur $cur.prev
      mv $up $cur
      pm2 restart $name --update-env >/dev/null
      for i in \$(seq 1 60); do
        c=\$(curl -s -o /dev/null -w '%{http_code}' $url || true)
        [ \"\$c\" = 200 ] && echo \"    $name OK (\${i}s)\" && exit 0
        sleep 1
      done
      echo \"HATA: $name saglik kontrolu gecmedi (\$c) — geri aliniyor\" >&2
      mv $cur $cur.failed; mv $cur.prev $cur
      pm2 restart $name --update-env >/dev/null
      exit 1"
  done
done
ssh "$HOST" "pm2 save >/dev/null"
rm -rf "$STAGE"
echo "OK yayinlandi: $SHA"
