import Layout from '@/components/layout/Layout';
import Blog2 from '@/components/sections/Blog2';
import Contact2 from '@/components/sections/Contact2';
import Coporation2 from '@/components/sections/Coporation2';
import Education2 from '@/components/sections/Education2';
import Experience2 from '@/components/sections/Experience2';
import Home2 from '@/components/sections/Home2';
import Projects2 from '@/components/sections/Projects2';
import Service2 from '@/components/sections/Service2';
import Skills2 from '@/components/sections/Skills2';
import Static2 from '@/components/sections/Static2';
import { buildMetadata,getSeoPage, SEO_PAGE_KEYS} from '@/seo';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n';

export default async function HomePage2({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
      <Layout headerStyle={2} footerStyle={2}>
        <Home2 locale={locale} />
        <Static2 locale={locale} />
        <Coporation2 locale={locale} />
        <Service2 locale={locale} />
        <Experience2 locale={locale} />
        <Education2 locale={locale} />
        <Projects2 locale={locale} />
        <Skills2 locale={locale} />
        <Blog2 locale={locale} />
        <Contact2 />
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.home2, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/index-2`,
    ogType: 'website',
  });
}

