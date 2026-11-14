import {previewFor} from '@/utils/contentPreview.server';
import {commonAlternates,commonEnabled} from '@/seo/sharedContent.server';
// =============================================================
// FILE: frontend/app/[locale]/products/[slug]/page.tsx
// Product detail page (server)
// =============================================================

import Layout from '@/components/layout/Layout';
import ProductDetailClient from './_component/ProductDetailClient';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { BASE_URL } from '@/integrations/apiBase';
import { normalizeProduct } from '@/integrations/shared/products.types';
import { mergeSeoPage } from '@/integrations/shared';
import { getResourceLocalizedSlugsBySlug } from '@/seo/localizedSlugs.server';
import { localizePath } from '@/i18n/routes';

async function getProductBySlug(slug: string, locale: string) {
  const preview=await previewFor('products',slug);if(preview)return normalizeProduct(preview);
  const base = String(BASE_URL || '').replace(/\/+$/, '');
  const url = `${base}/products/by-slug/${encodeURIComponent(slug)}?locale=${locale}&default_locale=${locale}`;

  const res = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) return null;
  return normalizeProduct(await res.json());
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const safeLocale = normalizeLocaleParam(locale);
  const product = await getProductBySlug(slug, safeLocale);

  if (!product) {
    const missingCopyByLocale = {
      tr: {
        title: 'Ürün bulunamadı',
        description: 'İstenen SaaS ürünü mevcut değil veya yayından kaldırılmış.',
      },
      de: {
        title: 'Produkt nicht gefunden',
        description: 'Das angeforderte SaaS-Produkt ist nicht verfügbar oder wurde zurückgezogen.',
      },
      en: {
        title: 'Product not found',
        description: 'The requested SaaS product is unavailable or has been withdrawn.',
      },
    } as const;
    const missingLanguage = safeLocale === 'tr' || safeLocale === 'de' ? safeLocale : 'en';
    const missingCopy = missingCopyByLocale[missingLanguage];
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <section className="pt-120 pb-150">
          <div className="container text-center">
            <h2>{missingCopy.title}</h2>
            <p>{missingCopy.description}</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <ProductDetailClient locale={safeLocale} product={product} />
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
  const slug = p?.slug || '';

  const [product, localizedSlugs] = await Promise.all([
    getProductBySlug(slug, locale),
    getResourceLocalizedSlugsBySlug({ resource: 'products', slug, locale }),
  ]);

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.productDetail, { routeLocale: locale });
  const contentPage = product
    ? {
        title: product.seo_title || product.title || undefined,
        description: product.seo_description || product.subtitle || undefined,
      }
    : null;
  return buildMetadata({
    seo: all,
    page: mergeSeoPage(page, contentPage),
    canonicalPath: `/${locale}/products/${slug}`,
    localizedPaths: Object.fromEntries(
      Object.entries(localizedSlugs).map(([targetLocale, targetSlug]) => [
        targetLocale,
        `/${targetLocale}${localizePath(targetLocale, `/products/${targetSlug}`)}`,
      ]),
    ),
    ogType: 'website',
  });
}
