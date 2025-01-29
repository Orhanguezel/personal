FROM node:16

# Çalışma dizinini personal olarak ayarla
WORKDIR /personal

# package.json ve package-lock.json dosyalarını kopyala ve bağımlılıkları yükle
COPY package*.json ./
RUN npm install

# Tüm dosyaları container içine kopyala
COPY . .

# API'nin çalışacağı portu belirt
EXPOSE 3005

# API'yi başlat
CMD ["node", "server.js"]

