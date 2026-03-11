// =============================================================
// FILE: frontend/app/[locale]/page.tsx
// FINAL — Home page under locale route
// - locale paramını alır ve sections'a prop geçer
// =============================================================

import Layout from '@/components/layout/Layout';
import Home1 from '@/components/sections/Home1';
import HomeSections from './HomeSections.client';
import { getUiHomeServer, getServicesListServer } from '@/utils/publicLists.server';
import { buildMetadata, getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n';

export const dynamic = 'force-dynamic';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [uiHome, services] = await Promise.all([
    getUiHomeServer({ locale }),
    getServicesListServer({ locale, limit: 4 }),
  ]);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Home1 locale={locale} initialUi={uiHome} />
      <HomeSections locale={locale} initialServices={services} />
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
