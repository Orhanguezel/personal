// =============================================================
// FILE: frontend/app/[locale]/blog/page.tsx
// FINAL — Blog list page (server) — locale Promise-safe + normalized
// - Passes locale to client BlogList
// =============================================================

import Layout from '@/components/layout/Layout';
import BlogList from './_components/BlogList';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';

import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { getBlogListServer } from '@/utils/publicLists.server';

const BREADCRUMB_LABELS: Record<string, { home: string; blog: string }> = {
  de: { home: 'Startseite', blog: 'Blog' },
  en: { home: 'Home', blog: 'Blog' },
  tr: { home: 'Anasayfa', blog: 'Blog' },
};

export const dynamic = 'force-dynamic';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const initialPosts = await getBlogListServer({ locale, limit: 60 });

  const labels = BREADCRUMB_LABELS[locale] ?? BREADCRUMB_LABELS.en;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `/${locale}` },
          { name: labels.blog, url: `/${locale}/blog` },
        ]}
      />
      <BlogList locale={locale} initialPosts={initialPosts} />
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
