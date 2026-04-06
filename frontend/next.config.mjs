/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    const security = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
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
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
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

  // Webpack config for wowjs UMD module support
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure wowjs is not treated as external
      const ext = config.externals;

      if (Array.isArray(ext)) {
        config.externals = ext.filter((external) => {
          if (typeof external !== 'function') return true;
          return !external.toString().includes('wowjs');
        });
      }
    }

    return config;
  },

  // Note: webpack config present => Next will use webpack (not Turbopack) for builds
};

export default nextConfig;
