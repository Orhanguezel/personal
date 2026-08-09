// =============================================================
// FILE: src/app/[locale]/services/[slug]/page.tsx
// Service detail (server) — ServiceJsonLd + BreadcrumbJsonLd
// =============================================================

import Layout from '@/components/layout/Layout';
import ServiceDetailClient from '../_component/ServiceDetailClient';
import RelatedProjects from './_components/RelatedProjects';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/seo/ServiceJsonLd';
import { mergeSeoPage } from '@/integrations/shared';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getServiceSeoPageBySlug, getSeoAll, getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
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

  // IKI MARKA, TEK KOD TABANI: saglayici adi sabit "Guezel Web Design" yaziliydi
  // ve gzlteknoloji.com'da YANLIS isletmeyi yapisal veriye gomuyordu.
  // Ad, deployment'in kendi SEO ayarindan okunur.
  const seoAll = await getSeoAll({ routeLocale: safeLocale });
  const providerName = seoAll.defaults.siteName;

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
          providerName={providerName}
          url={`/${safeLocale}/services/${slug}`}
        />
      )}
      <ServiceDetailClient locale={safeLocale} slug={slug} initialService={svc} />

      {/* Hizmet -> ayni kategorideki projeler. Kategori, hizmet ve projeyi
          baglayan tek alan (services.type == projects.category). */}
      <RelatedProjects
        locale={safeLocale}
        category={(svc as { type?: string | null } | null)?.type ?? null}
        currentServiceName={(svc as { name?: string } | null)?.name ?? null}
      />
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
