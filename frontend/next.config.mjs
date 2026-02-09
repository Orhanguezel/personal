/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },

      { protocol: 'https', hostname: 'cdn.gzltemizlik.com', pathname: '/**' },
      { protocol: 'https', hostname: 'gzltemizlik.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.gzltemizlik.com', pathname: '/**' },

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
