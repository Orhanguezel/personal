import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = dirname(fileURLToPath(import.meta.url));
// node_modules/next monorepo kökünde (vps-guezel): frontend -> guezelwebdesign -> vps-guezel
const workspaceRoot = resolve(appDir, '../..');

// Dile gore URL haritasi — TEK KAYNAK: i18n/route-slugs.json
// (i18n/routes.ts ayni dosyayi okur; next.config bir .ts dosyasini import
// edemedigi icin harita JSON olarak tutuluyor.)
const ROUTE_SLUGS = JSON.parse(
  readFileSync(resolve(appDir, 'i18n/route-slugs.json'), 'utf8'),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingRoot: workspaceRoot,
  turbopack: { root: workspaceRoot },
  // jsdom (isomorphic-dompurify) webpack ile bundle edilmesin — asset'leri (default-stylesheet.css) node_modules'tan çözülsün (sitemap SSG fix)
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],

  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const security = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Content-Security-Policy-Report-Only',
        value:
          "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; img-src 'self' data: blob: https:; font-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; connect-src 'self' https: wss:; frame-src 'self' https:; form-action 'self'",
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=()',
      },
    ];

    if (isProd) {
      security.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      });
    }

    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/assets/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/:path*',
        headers: security,
      },
    ];
  },

  // `/uploads/*` dosyalarini backend servis eder (nginx'te ayri location).
  // Next.js resim optimizer'i GORELI yollari KENDI sunucusundan cekmeye
  // calisir; orada /uploads bulunmadigi icin istek locale yonlendirmesine
  // dusuyor ve optimizer 400 donuyordu -> sitedeki urun/blog/fiyat gorselleri
  // kiriliyordu (2026-08-09, gzlteknoloji.com). Bu rewrite ile Next kendi
  // uzerinden backend'e proxy'ler; optimizer artik gorseli bulabiliyor.
  // ── DILE GORE URL ─────────────────────────────────────────────────────────
  // Yerellestirilmis adres -> gercek (Ingilizce) rota. Tablo: i18n/routes.ts
  // Not: rewrite ADRESI DEGISTIRMEZ; ziyaretci /tr/hizmetler gorur.
  async rewrites() {
    const localized = [];
    for (const [route, byLocale] of Object.entries(ROUTE_SLUGS)) {
      for (const [locale, slug] of Object.entries(byLocale)) {
        if (slug === route) continue; // ayni ise rewrite gereksiz
        localized.push(
          { source: `/${locale}/${slug}`, destination: `/${locale}/${route}` },
          { source: `/${locale}/${slug}/:path*`, destination: `/${locale}/${route}/:path*` },
        );
      }
    }

    const origin = (
      process.env.UPLOADS_PROXY_ORIGIN ||
      process.env.NEXT_PUBLIC_MEDIA_URL ||
      ''
    ).replace(/\/+$/, '');
    const uploads = origin
      ? [{ source: '/uploads/:path*', destination: `${origin}/uploads/:path*` }]
      : [];
    return [...localized, ...uploads];
  },

  // Ingilizce yol -> yerellestirilmis yol (kalici). Ayni icerik iki farkli
  // adresten servis edilmesin diye; kanonik adres yerellestirilmis olan.
  async redirects() {
    const out = [];

    // BIRLESTIRILEN PROJE KAYITLARI
    // Portfolyo iki kaynaktan birlestiginde ayni is birden fazla kayit olmustu
    // (bkz. backend/scripts/gzl-taxonomy.mjs -> PROJECT_MERGES). Yinelenenler
    // silindi; eski adresler olu kalmasin diye kalan kayda 308 ile gonderiliyor.
    const MERGED_PROJECTS = {
      geoserra: 'geoserra-yapay-zeka-aramalari-icin-geo-seo-platformu',
      'konig-massage': 'konig-energetik-randevulu-masaj-wellness-sitesi',
      'konigs-massage-multi-tenant-randevu-platformu-metahub':
        'konig-energetik-randevulu-masaj-wellness-sitesi',
      'wiribu-de-lighthouse-100-100-geo-optimizasyonu':
        'wiribu-de-lighthouse-100-100-geo-seo-optimizasyonu',
    };
    for (const [locale, byRoute] of Object.entries(
      Object.fromEntries(
        Object.keys(ROUTE_SLUGS.work ?? {}).map((l) => [l, ROUTE_SLUGS.work[l]]),
      ),
    )) {
      for (const [from, to] of Object.entries(MERGED_PROJECTS)) {
        out.push({
          source: `/${locale}/${byRoute}/${from}`,
          destination: `/${locale}/${byRoute}/${to}`,
          permanent: true,
        });
        // Yerellestirme oncesi (Ingilizce) adres de yakalanir.
        out.push({
          source: `/${locale}/work/${from}`,
          destination: `/${locale}/${byRoute}/${to}`,
          permanent: true,
        });
      }
    }

    for (const [route, byLocale] of Object.entries(ROUTE_SLUGS)) {
      for (const [locale, slug] of Object.entries(byLocale)) {
        if (slug === route) continue;
        out.push(
          { source: `/${locale}/${route}`, destination: `/${locale}/${slug}`, permanent: true },
          {
            source: `/${locale}/${route}/:path*`,
            destination: `/${locale}/${slug}/:path*`,
            permanent: true,
          },
        );
      }
    }
    return out;
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },

      { protocol: 'https', hostname: 'guezelwebdesign.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.guezelwebdesign.com', pathname: '/**' },

      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dbozv7wqd/**' },

      // DEV (eğer backend veya media localhost'tan geliyorsa)
      { protocol: 'http', hostname: 'localhost', pathname: '/**' },
      { protocol: 'http', hostname: '127.0.0.1', pathname: '/**' },
    ],
  },

};

export default nextConfig;
