

### temiz build

cd ~/Documents/zelio/frontend

# Next build cache
rm -rf .next

# Turbopack kullanıyorsan
rm -rf .turbo

# Node/Bun modülleri ve lock
rm -rf node_modules
rm -f bun.lockb

# TS cache (varsa)
rm -f tsconfig.tsbuildinfo
rm -f .tsbuildinfo

# (opsiyonel) coverage / dist
rm -rf dist out coverage

# Bun cache temizliği
bun pm cache rm

# Temiz kurulum
bun install

# Build
bun run build
