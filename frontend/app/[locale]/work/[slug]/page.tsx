// ---------------------------------------------------------------------
// FILE: frontend/app/[locale]/work/[slug]/page.tsx
// FINAL — wrapper (NO fetch here)
// ---------------------------------------------------------------------
import Layout from '@/components/layout/Layout';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import WorkSingleClient from '../_component/WorkSingle.client';
import { getProjectSeoPageBySlug,getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { mergeSeoPage } from '@/integrations/shared';

export default async function WorkSinglePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <WorkSingleClient locale={safeLocale} />
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
    getSeoPage(SEO_PAGE_KEYS.workDetail, { routeLocale: locale }),
    getProjectSeoPageBySlug(slug),
  ]);

  const merged = mergeSeoPage(page, contentSeo);

  return buildMetadata({
    seo: all,
    page: merged,
    canonicalPath: `/${locale}/work/${slug}`,
    ogType: 'article',
  });
}
