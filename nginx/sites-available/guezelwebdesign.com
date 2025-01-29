server {
    listen 443 ssl http2;
    server_name guezelwebdesign.com www.guezelwebdesign.com;

    ssl_certificate /etc/letsencrypt/live/guezelwebdesign.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/guezelwebdesign.com/privkey.pem;

    root /var/www/guezelwebdesign;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade $http_authorization;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/guezelwebdesign;
    }
}

server {
    listen 80;
    server_name guezelwebdesign.com www.guezelwebdesign.com;

    return 301 https://$host$request_uri;
}
