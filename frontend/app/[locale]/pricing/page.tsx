// =============================================================
// FILE: frontend/app/[locale]/pricing/page.tsx
// FINAL — Pricing route shell (server)
// - Data fetch YOK
// - Layout + PricingClient
// =============================================================

import Layout from '@/components/layout/Layout';
import PricingClient from './_component/PricingClient';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PricingPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <PricingClient locale={locale} />
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.pricing, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/pricing`,
    ogType: 'website',
  });
}
