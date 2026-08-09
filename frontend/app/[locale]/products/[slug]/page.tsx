// =============================================================
// FILE: frontend/app/[locale]/products/[slug]/page.tsx
// Product detail page (server)
// =============================================================

import Layout from '@/components/layout/Layout';
import ProductDetailClient from './_component/ProductDetailClient';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { siteDefaultLocale } from '@/i18n/config';
import { getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { BASE_URL } from '@/integrations/apiBase';
import { normalizeProduct } from '@/integrations/shared/products.types';

async function getProductBySlug(slug: string, locale: string) {
  const base = String(BASE_URL || '').replace(/\/+$/, '');
  const url = `${base}/products/by-slug/${encodeURIComponent(slug)}?locale=${locale}&default_locale=${siteDefaultLocale()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
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
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <section className="pt-120 pb-150">
          <div className="container text-center">
            <h2>Ürün bulunamadı</h2>
            <p>İstenen SaaS ürünü mevcut değil veya yayından kaldırılmış.</p>
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

  const product = await getProductBySlug(slug, locale);

  if (product?.seo_title || product?.title) {
    return {
      title: product.seo_title || product.title,
      description: product.seo_description || product.subtitle || '',
    };
  }

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.productDetail, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/products/${slug}`,
    ogType: 'website',
  });
}
