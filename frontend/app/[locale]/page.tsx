// =============================================================
// FILE: frontend/app/[locale]/page.tsx
// FINAL — Home page under locale route
// - locale paramını alır ve sections'a prop geçer
// =============================================================

import Layout from '@/components/layout/Layout';
import Home1 from '@/components/sections/Home1';
import { HomeGeoBlocks } from '@/components/sections/HomeGeoBlocks';
import { HomeSeoIntro } from '@/components/sections/HomeSeoIntro';
import HomeSections from './HomeSections.client';
import {
  getUiHomeServer,
  getServicesListServer,
  getTestimonialsUiServer,
  getReviewsListServer,
} from '@/utils/publicLists.server';
import { buildMetadata, getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n';

export const dynamic = 'force-dynamic';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [uiHome, services, testimonialUi] = await Promise.all([
    getUiHomeServer({ locale }),
    getServicesListServer({ locale, limit: 4 }),
    getTestimonialsUiServer(locale),
  ]);

  const testimonialReviews = await getReviewsListServer({
    locale,
    target_type: testimonialUi.target_type,
    target_id: testimonialUi.bucket,
    limit: 20,
    offset: 0,
  });

  return (
    <Layout headerStyle={1} footerStyle={1}>
      {/* Preload hero LCP background image — avoids late CSS discovery */}
      <link rel="preload" href="/assets/imgs/hero/hero-1/background.png" as="image" fetchPriority="high" />
      <Home1 locale={locale} initialUi={uiHome} />
      <HomeSeoIntro locale={locale} />
      <HomeGeoBlocks locale={locale} />
      <HomeSections
        locale={locale}
        initialServices={services}
        testimonialUi={testimonialUi}
        testimonialReviews={testimonialReviews}
      />
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
