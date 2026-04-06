#!/bin/bash
# Take screenshots of all live project homepages
OUT="/home/orhan/Documents/Projeler/guezelwebdesign/frontend/public/assets/imgs/work/projects"
mkdir -p "$OUT"

SITES=(
  "quickecommerce|https://sportoonline.com"
  "ensotek|https://www.ensotek.de"
  "karbonkompozit|https://karbonkompozit.com.tr"
  "vistainsaat|https://www.vistainsaat.com"
  "konigsmassage|https://energetische-massage-bonn.de"
  "kamanilan|https://www.kamanilan.com"
  "gzltemizlik|https://gzltemizlik.com"
  "paketjet|https://paketjet.com"
  "kuhlturm|https://kuhlturm.com"
  "bereketfide|https://bereketfide.com"
  "vistaseed|https://vistaseed.com.tr"
  "misset|https://menu.guezelwebdesign.com"
)

for entry in "${SITES[@]}"; do
  IFS='|' read -r slug url <<< "$entry"
  echo ">>> $slug ($url)"
  npx playwright screenshot \
    --viewport-size "1280,800" \
    --wait-for-timeout 3000 \
    --ignore-https-errors \
    "$url" "$OUT/$slug.png" 2>&1 || echo "FAIL: $slug"
done

echo "Done. Screenshots in: $OUT"
ls -la "$OUT"
