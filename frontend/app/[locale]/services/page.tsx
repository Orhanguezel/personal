// =============================================================
// FILE: src/app/[locale]/services/page.tsx
// FINAL — Services list (server wrapper)
// FIX:
// - Next.js'te params Promise -> await et
// - locale'i client'a prop olarak geçir
// =============================================================

import Layout from '@/components/layout/Layout';
import ServicesClient from './_component/ServicesClient';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <ServicesClient locale={safeLocale} />
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
