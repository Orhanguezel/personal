// =============================================================
// FILE: frontend/app/[locale]/page.tsx
// FINAL — Home page under locale route
// - locale paramını alır ve sections'a prop geçer
// =============================================================

import Layout from '@/components/layout/Layout';
import Blog1 from '@/components/sections/Blog1';
import Brands1 from '@/components/sections/Brands1';
import Contact1 from '@/components/sections/Contact1';
import Home1 from '@/components/sections/Home1';
import Projects1 from '@/components/sections/Projects1';
import Service1 from '@/components/sections/Service1';
import Skills1 from '@/components/sections/Skills1';
import Static1 from '@/components/sections/Static1';
import Resume1 from '@/components/sections/Resume1';
import Testimonials1 from '@/components/sections/Testimonials1';
import { buildMetadata, getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Home1 locale={locale} />
      <Static1 locale={locale} />
      <Service1 locale={locale} />
      <Projects1 locale={locale} />
      <Resume1 locale={locale} />
      <Skills1 locale={locale} />
      <Brands1 locale={locale} />
      <Testimonials1 locale={locale} />
      <Blog1 locale={locale} />
      <Contact1 />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.home, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}`,
    ogType: 'website',
  });
}
