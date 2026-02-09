// ---------------------------------------------------------------------
// FILE: src/app/(public)/work/page.tsx
// ---------------------------------------------------------------------
import Layout from '@/components/layout/Layout';
import WorkClient from './_component/Work.client';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';

export default async function Work({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <section className="section-work pt-120 pb-150">
            {/* header + cards (client) */}
            <WorkClient locale={safeLocale} />
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
