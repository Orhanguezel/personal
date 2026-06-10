// =============================================================
// FILE: src/app/[locale]/services/[slug]/page.tsx
// Service detail (server) — ServiceJsonLd + BreadcrumbJsonLd
// =============================================================

import Layout from '@/components/layout/Layout';
import ServiceDetailClient from '../_component/ServiceDetailClient';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/seo/ServiceJsonLd';
import { mergeSeoPage } from '@/integrations/shared';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getServiceSeoPageBySlug, getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { getServicesListServer, getServiceDetailServer } from '@/utils/publicLists.server';
import { safeGenerateStaticSlugParams } from '@/utils/safeGenerateStaticSlugParams';

export async function generateStaticParams() {
  return safeGenerateStaticSlugParams({
    fetchForLocale: (locale) => getServicesListServer({ locale, limit: 100 }),
  });
}

const BREADCRUMB_LABELS: Record<string, { home: string; services: string }> = {
  de: { home: 'Startseite', services: 'Leistungen' },
  en: { home: 'Home', services: 'Services' },
  tr: { home: 'Anasayfa', services: 'Hizmetler' },
};

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  const svc = await getServiceDetailServer({ locale: safeLocale, slug });
  const labels = BREADCRUMB_LABELS[safeLocale] ?? BREADCRUMB_LABELS.en;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `/${safeLocale}` },
          { name: labels.services, url: `/${safeLocale}/services` },
          ...(svc
            ? [{ name: (svc as any).name || slug, url: `/${safeLocale}/services/${slug}` }]
            : []),
        ]}
      />
      {svc && (
        <ServiceJsonLd
          name={(svc as any).name || slug}
          description={(svc as any).summary || undefined}
          serviceType={(svc as any).name || undefined}
          providerName="Guezel Web Design"
          areaServed={['Germany', 'Europe']}
          url={`/${safeLocale}/services/${slug}`}
        />
      )}
      <ServiceDetailClient locale={safeLocale} slug={slug} />
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
