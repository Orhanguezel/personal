import Layout from '@/components/layout/Layout';
import HomeLanding from '@/components/sections/HomeLanding';
import {
  getUiHomeServer,
  getServicesListServer,
  getProjectsListServer,
  getProductsListServer,
} from '@/utils/publicLists.server';
import { buildMetadata, getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n';

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [uiHome, services, products, projects] = await Promise.all([
    getUiHomeServer({ locale }),
    getServicesListServer({ locale, limit: 4 }),
    getProductsListServer({ locale, limit: 20 }),
    getProjectsListServer({ locale, limit: 3 }),
  ]);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <HomeLanding
        locale={locale}
        ui={uiHome}
        services={services}
        products={products}
        projects={projects}
      />
    </Layout>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.home, { routeLocale: locale });
  return buildMetadata({ seo: all, page, canonicalPath: `/${locale}`, ogType: 'website' });
}
