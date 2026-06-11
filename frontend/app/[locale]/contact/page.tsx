import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import Contact1 from '@/components/sections/Contact1';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';

export const dynamic = 'force-dynamic';

const titles: Record<string, string> = {
  de: 'Kontakt',
  en: 'Contact',
  tr: 'İletişim',
};

const descriptions: Record<string, string> = {
  de: 'Nehmen Sie Kontakt auf — beschreiben Sie Ihr Projekt und erhalten Sie eine realistische technische Einschätzung.',
  en: 'Get in touch — describe your project and get a realistic technical assessment.',
  tr: 'İletişime geçin — projenizi anlatın, gerçekçi bir teknik değerlendirme alın.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'de' ? 'Startseite' : locale === 'tr' ? 'Anasayfa' : 'Home', url: `/${locale}` },
          { name: titles[locale] ?? titles.en, url: `/${locale}/contact` },
        ]}
      />
      <Contact1 />
    </Layout>
  );
}
