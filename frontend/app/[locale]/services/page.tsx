// =============================================================
// FILE: src/app/[locale]/services/page.tsx
// FINAL — Services list (server wrapper)
// FIX:
// - Next.js'te params Promise -> await et
// - locale'i client'a prop olarak geçir
// =============================================================

import Layout from '@/components/layout/Layout';
import ServicesClient from './_component/ServicesClient';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { getServicesListServer } from '@/utils/publicLists.server';

const BREADCRUMB_LABELS: Record<string, { home: string; services: string }> = {
  de: { home: 'Startseite', services: 'Leistungen' },
  en: { home: 'Home', services: 'Services' },
  tr: { home: 'Anasayfa', services: 'Hizmetler' },
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);
  const initialItems = await getServicesListServer({ locale: safeLocale, limit: 20 });

  const labels = BREADCRUMB_LABELS[safeLocale] ?? BREADCRUMB_LABELS.en;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `/${safeLocale}` },
          { name: labels.services, url: `/${safeLocale}/services` },
        ]}
      />
      <ServicesClient locale={safeLocale} initialItems={initialItems} />
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.services, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/services`,
    ogType: 'website',
  });
}
