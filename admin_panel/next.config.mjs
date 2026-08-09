import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  // outputFileTracingRoot BİLEREK YOK.
  // Bu satır (workspaceRoot = üst dizin) Next 16'nın Turbopack derleyicisinde
  // proje kökü çıkarımını bozuyor ve build "We couldn't find the Next.js
  // package (next/package.json) from the project directory" ile kırılıyordu
  // (paket monorepo köküne hoist edildiğinde). `output: 'standalone'`
  // kullanılmadığı için dosya izleme kökünü elle vermeye gerek de yok.
  // Şablon projedeki panelde de bu satır yok ve orada Turbopack sorunsuz.

  // ✅ Image optimization config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8045',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ kaldırıyoruz: /admin/dashboard -> /admin/dashboard/default
  async redirects() {
    return [
      // İstersen eski linkleri yakalamak için tersine redirect bırakabilirsin:
      // { source: '/admin/dashboard/default', destination: '/admin/dashboard', permanent: false },
    ];
  },

  async rewrites() {
    const origin =
      process.env.PANEL_API_URL || process.env.NEXT_PUBLIC_PANEL_API_URL || 'http://localhost:8045';

    const base = String(origin).replace(/\/+$/, '');

    return [
      {
        source: '/api/:path*',
        destination: `${base}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
