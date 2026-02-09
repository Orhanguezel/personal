// =============================================================
// FILE: frontend/app/[locale]/blog/page.tsx
// FINAL — Blog list page (server) — locale Promise-safe + normalized
// - Passes locale to client BlogList
// =============================================================

import Layout from '@/components/layout/Layout';
import BlogList from './_components/BlogList';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';

import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BlogList locale={locale} />
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.blog, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/blog`,
    ogType: 'website',
  });
}
