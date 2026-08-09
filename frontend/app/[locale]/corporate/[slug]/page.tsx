import { CustomContentPage } from '@/components/content/CustomContentPage';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { getCustomPageSeoPageByModuleSlug, getSeoPage, SEO_PAGE_KEYS, buildMetadata } from '@/seo';
import { mergeSeoPage } from '@/integrations/shared';
import { localizePath } from '@/i18n/routes';

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const p = await unwrapRouteParams(params);
  return <CustomContentPage moduleKey="corporate" locale={normalizeLocaleParam(p.locale)} slug={String(p.slug)} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p.locale);
  const slug = String(p.slug);
  const [{ all, page }, contentSeo] = await Promise.all([
    getSeoPage(SEO_PAGE_KEYS.customPageDetail, { routeLocale: locale }),
    getCustomPageSeoPageByModuleSlug('corporate', slug, locale),
  ]);
  return buildMetadata({ seo: all, page: mergeSeoPage(page, contentSeo), canonicalPath: `/${locale}${localizePath(locale, `/corporate/${slug}`)}`, ogType: 'website' });
}
