// =============================================================
// FILE: frontend/app/[locale]/blog/[slug]/page.tsx
// Blog detail page (server) — Article JSON-LD + Breadcrumb + SSR data
// =============================================================

import Layout from '@/components/layout/Layout';
import BlogDetail from '../_components/BlogDetail';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import {
  getCustomPageSeoPageByModuleSlug,
  getSeoPage,
  SEO_PAGE_KEYS,
  buildMetadata,
} from '@/seo';
import JsonLd from '@/seo/JsonLd';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { mergeSeoPage } from '@/integrations/shared';
import { getBlogListServer, getBlogDetailServer } from '@/utils/publicLists.server';
import { safeGenerateStaticSlugParams } from '@/utils/safeGenerateStaticSlugParams';
import { getSeoAll } from '@/seo/seo.server';
import { article, graph } from '@/seo/jsonld';
import type { CustomPageView } from '@/integrations/shared';
import { joinUrl, pickCover, toAbsUrl } from '@/integrations/shared';

export async function generateStaticParams() {
  return safeGenerateStaticSlugParams({
    fetchForLocale: (locale) => getBlogListServer({ locale, limit: 120 }),
  });
}

const BREADCRUMB_LABELS: Record<string, { home: string; blog: string }> = {
  de: { home: 'Startseite', blog: 'Blog' },
  en: { home: 'Home', blog: 'Blog' },
  tr: { home: 'Anasayfa', blog: 'Blog' },
};

function articleDescriptionFromPost(post: CustomPageView): string | undefined {
  const raw = String(post.excerpt ?? post.summary ?? post.meta_description ?? '').trim();
  if (!raw) return undefined;
  return raw.length > 500 ? `${raw.slice(0, 497)}...` : raw;
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const slug = (p?.slug ?? '').toString();

  const [post, seoAll] = await Promise.all([
    getBlogDetailServer({ locale, slug }),
    getSeoAll({ routeLocale: locale }),
  ]);

  const canonicalBase = seoAll.defaults.canonicalBase;
  const orgId = `${canonicalBase}/#org`;
  const founderId = `${canonicalBase}/#founder`;
  const labels = BREADCRUMB_LABELS[locale] ?? BREADCRUMB_LABELS.en;

  const articleUrl = joinUrl(canonicalBase, `/${locale}/blog/${encodeURIComponent(slug)}`);
  const { src: coverSrc } = pickCover(post as CustomPageView);
  const fallbackCover = '/assets/imgs/blog/blog-1/img-background.png';
  const absImg =
    coverSrc && coverSrc !== fallbackCover ? toAbsUrl(canonicalBase, coverSrc) : undefined;

  const articleJsonLd = post
    ? graph([
        article({
          headline: post.title || slug,
          description: articleDescriptionFromPost(post),
          url: articleUrl,
          datePublished: (post as any).created_at || undefined,
          dateModified: (post as any).updated_at || (post as any).created_at || undefined,
          author: {
            name: (post as any).author?.full_name || 'Orhan Güzel',
            url: founderId,
          },
          publisher: { '@id': orgId, name: seoAll.defaults.siteName },
          image: absImg,
        }),
      ])
    : null;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: labels.home, url: `/${locale}` },
          { name: labels.blog, url: `/${locale}/blog` },
          ...(post ? [{ name: post.title || slug, url: `/${locale}/blog/${slug}` }] : []),
        ]}
      />
      {articleJsonLd && <JsonLd data={articleJsonLd} id="article" />}
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
