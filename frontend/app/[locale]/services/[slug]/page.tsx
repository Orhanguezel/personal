// =============================================================
// FILE: src/app/[locale]/services/[slug]/page.tsx
// FINAL — Service detail (server wrapper)
// FIX: params Promise -> await
// =============================================================

import Layout from '@/components/layout/Layout';
import ServiceDetailClient from '../_component/ServiceDetailClient';
import { mergeSeoPage } from '@/integrations/shared';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getServiceSeoPageBySlug, getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <ServiceDetailClient locale={locale} slug={slug} />
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const slug = String(p?.slug ?? '').trim();

  const [{ all, page }, contentSeo] = await Promise.all([
    getSeoPage(SEO_PAGE_KEYS.serviceDetail, { routeLocale: locale }),
    getServiceSeoPageBySlug(slug),
  ]);

  const merged = mergeSeoPage(page, contentSeo);

  return buildMetadata({
    seo: all,
    page: merged,
    canonicalPath: `/${locale}/services/${slug}`,
    ogType: 'article',
  });
}
