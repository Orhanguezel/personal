// =============================================================
// FILE: frontend/app/[locale]/products/page.tsx
// Products list page (server) — site packages for sale
// =============================================================

import Layout from '@/components/layout/Layout';
import ProductsClient from './_component/ProductsClient';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { getProductsListServer } from '@/utils/publicLists.server';

export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);
  const initialItems = await getProductsListServer({ locale: safeLocale, limit: 50 });

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <ProductsClient locale={safeLocale} initialItems={initialItems} />
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.products, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/products`,
    ogType: 'website',
  });
}
