// =============================================================
// FILE: frontend/app/[locale]/blog/[slug]/page.tsx
// FINAL — Blog detail page (server) — params Promise-safe + normalized
// =============================================================

import Layout from '@/components/layout/Layout';
import BlogDetail from '../_components/BlogDetail';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import {
  getCustomPageSeoPageByModuleSlug,
  getSeoPage,
  SEO_PAGE_KEYS,
  buildMetadata
} from '@/seo';
import { mergeSeoPage } from '@/integrations/shared';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const slug = (p?.slug ?? '').toString();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BlogDetail locale={locale} slug={slug} />
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
    getSeoPage(SEO_PAGE_KEYS.blogDetail, { routeLocale: locale }),
    getCustomPageSeoPageByModuleSlug('blog', slug),
  ]);

  const merged = mergeSeoPage(page, contentSeo);

  return buildMetadata({
    seo: all,
    page: merged,
    canonicalPath: `/${locale}/blog/${slug}`,
    ogType: 'article',
  });
}
