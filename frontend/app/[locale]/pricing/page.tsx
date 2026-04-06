// =============================================================
// FILE: frontend/app/[locale]/pricing/page.tsx
// Pricing — server data for plans/FAQs/copy (SSR + client fallback)
// =============================================================

import Layout from '@/components/layout/Layout';
import PricingClient from './_component/PricingClient';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import {
  getPricingPageCopyServer,
  getPricingPublicServer,
  getFaqsListServer,
} from '@/utils/publicLists.server';
import { fetchFrankfurterUsdRates } from '@/utils/usdFx.server';

const BREADCRUMB_LABELS: Record<string, { home: string; pricing: string }> = {
  de: { home: 'Startseite', pricing: 'Preise' },
  en: { home: 'Home', pricing: 'Pricing' },
  tr: { home: 'Anasayfa', pricing: 'Fiyatlar' },
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function PricingPage({
  params,
}: { params: Promise<{ locale: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const labels = BREADCRUMB_LABELS[locale] ?? BREADCRUMB_LABELS.en;

  const [initialCopy, initialPricing, initialFaqs, initialFxRates] = await Promise.all([
    getPricingPageCopyServer(locale),
    getPricingPublicServer({ locale, plans_limit: 10 }),
    getFaqsListServer({ locale, limit: 50, offset: 0 }),
    fetchFrankfurterUsdRates(),
  ]);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `/${locale}` },
          { name: labels.pricing, url: `/${locale}/pricing` },
        ]}
      />
      <PricingClient
        locale={locale}
        initialCopy={initialCopy}
        initialPricing={initialPricing}
        initialFaqs={initialFaqs}
        initialFxRates={initialFxRates}
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.pricing, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/pricing`,
    ogType: 'website',
  });
}
