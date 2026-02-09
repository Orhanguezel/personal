// =============================================================
// FILE: frontend/app/[locale]/custompages/[module_key]/[slug]/page.tsx
// FINAL — Generic Custom Page (module_key + slug)
// - Uses CustomPages module (public)
// - Server fetch + normalize
// =============================================================

import { notFound } from 'next/navigation';

import Layout from '@/components/layout/Layout';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { BASE_URL } from '@/integrations/apiBase';
import type { CustomPageView } from '@/integrations/shared';
import {
  normalizeCustomPage,
  extractHtmlFromPost,
  sanitizeBlogHtml,
} from '@/integrations/shared';
import { buildMetadata } from '@/seo/metadata';
import { getCustomPageSeoPageByModuleSlug } from '@/seo/customPages.server';
import { getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { mergeSeoPage } from '@/integrations/shared';

async function fetchCustomPage(
  moduleKey: string,
  slug: string,
  locale?: string | null,
): Promise<CustomPageView | null> {
  const mk = String(moduleKey ?? '').trim();
  const sl = String(slug ?? '').trim();
  if (!mk || !sl) return null;

  const url = new URL(
    `${BASE_URL}/custom_pages/by-module/${encodeURIComponent(mk)}/${encodeURIComponent(sl)}`,
  );
  if (locale) url.searchParams.set('locale', locale);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`CustomPage fetch failed: ${res.status}`);

  const json = await res.json();
  return normalizeCustomPage(json);
}

export default async function CustomPageDetail({
  params,
}: {
  params: Promise<{ locale: string; module_key: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const moduleKey = String(p?.module_key ?? '').trim();
  const slug = String(p?.slug ?? '').trim();

  let page = await fetchCustomPage(moduleKey, slug, locale);

  // locale 404 fallback (try without locale)
  if (!page) {
    page = await fetchCustomPage(moduleKey, slug, null);
  }

  if (!page) return notFound();

  const title = page.title || '';
  const summary = page.excerpt || page.summary || '';
  const html = sanitizeBlogHtml(extractHtmlFromPost(page));

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <section className="section-details pt-130 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-lg-auto">
              <div className="text-center mb-6">
                <h1 className="ds-3 mt-3 mb-3 text-dark">{title}</h1>
                {summary && <p className="text-300 fs-5 mb-0">{summary}</p>}
              </div>

              <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; module_key: string; slug: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const moduleKey = String(p?.module_key ?? '').trim();
  const slug = String(p?.slug ?? '').trim();

  const [{ all, page }, contentSeo] = await Promise.all([
    getSeoPage(SEO_PAGE_KEYS.customPageDetail, { routeLocale: locale }),
    getCustomPageSeoPageByModuleSlug(moduleKey, slug),
  ]);

  const merged = mergeSeoPage(page, contentSeo);

  return buildMetadata({
    seo: all,
    page: merged,
    canonicalPath: `/${locale}/custompages/${moduleKey}/${slug}`,
    ogType: 'article',
  });
}
