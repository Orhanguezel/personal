// =============================================================
// FILE: frontend/app/[locale]/impressum/page.tsx
// Impressum — dynamic from custom_pages API (module_key='policy', slug='impressum')
// Clean URL: /de/impressum (instead of /de/custompages/policy/impressum)
// =============================================================

import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
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

const MODULE_KEY = 'policy';
const SLUG_BY_LOCALE: Record<string, string> = {
  de: 'impressum',
  en: 'impressum',
  tr: 'impressum',
};

const BREADCRUMB_LABELS: Record<string, string> = {
  de: 'Startseite',
  en: 'Home',
  tr: 'Anasayfa',
};

const FALLBACK_TITLES: Record<string, string> = {
  de: 'Impressum',
  en: 'Legal Notice',
  tr: 'Yasal Bildirim',
};

async function fetchImpressumPage(
  locale: string,
): Promise<CustomPageView | null> {
  const slug = SLUG_BY_LOCALE[locale] ?? 'impressum';

  const url = new URL(
    `${BASE_URL}/custom_pages/by-module/${encodeURIComponent(MODULE_KEY)}/${encodeURIComponent(slug)}`,
  );
  url.searchParams.set('locale', locale);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return normalizeCustomPage(json);
  } catch {
    return null;
  }
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const page = await fetchImpressumPage(locale);

  const title = page?.title || FALLBACK_TITLES[locale] || 'Impressum';
  const html = page ? sanitizeBlogHtml(extractHtmlFromPost(page)) : '';
  const homeLabel = BREADCRUMB_LABELS[locale] ?? 'Home';

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel, url: `/${locale}` },
          { name: 'Impressum', url: `/${locale}/impressum` },
        ]}
      />
      <section className="section-impressum pt-120 pb-150">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h1 className="ds-3 mb-4 text-dark">{title}</h1>
              {html ? (
                <div
                  className="text-300 fs-5 lh-lg blog-prose"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <p className="text-300 fs-5">
                  {locale === 'de'
                    ? 'Impressum wird geladen...'
                    : locale === 'tr'
                      ? 'Yasal bildirim yukleniyor...'
                      : 'Legal notice loading...'}
                </p>
              )}
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
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const slug = SLUG_BY_LOCALE[locale] ?? 'impressum';

  try {
    const [{ all, page }, contentSeo] = await Promise.all([
      getSeoPage(SEO_PAGE_KEYS.customPageDetail, { routeLocale: locale }),
      getCustomPageSeoPageByModuleSlug(MODULE_KEY, slug),
    ]);

    const merged = mergeSeoPage(page, contentSeo);

    return buildMetadata({
      seo: all,
      page: merged,
      canonicalPath: `/${locale}/impressum`,
      ogType: 'website',
    });
  } catch {
    return {
      title: `${FALLBACK_TITLES[locale] || 'Impressum'} — Guezel Web Design`,
    };
  }
}
