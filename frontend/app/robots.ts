import type { MetadataRoute } from 'next';
// import { getSeoAll } from '@/seo/seo.server';

export default function robots(): MetadataRoute.Robots {
  // const seo = await getSeoAll();
  // const host = seo.defaults.canonicalBase;
  const host = process.env.NEXT_PUBLIC_URL || 'https://www.guezelwebdesign.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
