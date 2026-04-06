// ---------------------------------------------------------------------
// FILE: src/app/(public)/work/page.tsx
// ---------------------------------------------------------------------
import Layout from '@/components/layout/Layout';
import WorkClient from './_component/Work.client';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { getProjectsListServer } from '@/utils/publicLists.server';

const BREADCRUMB_LABELS: Record<string, { home: string; work: string }> = {
  de: { home: 'Startseite', work: 'Projekte' },
  en: { home: 'Home', work: 'Work' },
  tr: { home: 'Anasayfa', work: 'Projeler' },
};

export const dynamic = 'force-dynamic';

export default async function Work({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);
  const initialItems = await getProjectsListServer({ locale: safeLocale, limit: 200 });

  const labels = BREADCRUMB_LABELS[safeLocale] ?? BREADCRUMB_LABELS.en;

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <BreadcrumbJsonLd
          items={[
            { name: labels.home, url: `/${safeLocale}` },
            { name: labels.work, url: `/${safeLocale}/work` },
          ]}
        />
        <div>
          <section className="section-work pt-120 pb-150">
            {/* header + cards (client) */}
            <WorkClient locale={safeLocale} initialItems={initialItems} />
          </section>

          {/* Static 1 + Contact aynı kalsın (istersen sonra dinamikleştiririz) */}
          {/* ... senin mevcut static bölümler burada aynen duracak ... */}
        </div>
      </Layout>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.work, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/work`,
    ogType: 'website',
  });
}
