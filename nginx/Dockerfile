# 1️⃣ Nginx’in resmi Docker image’ini kullan
FROM nginx:latest

# 2️⃣ Varsayılan Nginx yapılandırmasını değiştir
COPY nginx.conf /etc/nginx/nginx.conf

# 3️⃣ Mevcut virtual host yapılandırmalarını ve SSL sertifikalarını bağlamaya gerek kalmadan volume olarak kullanacağız.

# 4️⃣ Nginx portunu aç
EXPOSE 80 443

# 5️⃣ Nginx’i başlat
CMD ["nginx", "-g", "daemon off;"]
