import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import BookingClient from './_component/BookingClient';

const PAGE_COPY: Record<string, { title: string; description: string; home: string; current: string }> = {
  de: {
    title: 'Projektgespraech buchen',
    description: 'Buchen Sie ein kurzes technisches Erstgespraech mit Guezel Web Design.',
    home: 'Startseite',
    current: 'Termin',
  },
  en: {
    title: 'Book a project call',
    description: 'Book a short technical discovery call with Guezel Web Design.',
    home: 'Home',
    current: 'Booking',
  },
  tr: {
    title: 'Proje gorusmesi planla',
    description: 'Guezel Web Design ile kisa bir teknik on gorusme planlayin.',
    home: 'Anasayfa',
    current: 'Randevu',
  },
};

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.de;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: copy.home, url: `/${locale}` },
          { name: copy.current, url: `/${locale}/booking` },
        ]}
      />
      <BookingClient locale={locale} />
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
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.de;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: `/${locale}/booking`,
    },
  };
}
