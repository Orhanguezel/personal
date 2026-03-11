// =============================================================
// FILE: frontend/app/[locale]/layout.tsx
// FINAL — Locale segment wrapper (NOW ROOT LAYOUT for this segment)
// - Defines <html><body> with correct lang attribute
// - Includes global styles and fonts
// =============================================================

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Urbanist, Playfair_Display, DM_Mono } from 'next/font/google';
import { AppProviders } from '@/app/providers';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { getSeoAll } from '@/seo';
import JsonLd from '@/seo/JsonLd';
import { GlobalScripts } from '@/seo/scripts';
import { getSiteJsonLdGraph } from '@/seo/seo.server';
import { buildIconsFromSeo } from '@/integrations/shared';

// Global Styles
import '@/public/assets/css/vendors/bootstrap.min.css';
import '@/public/assets/css/vendors/swiper-bundle.min.css';
import '@/public/assets/css/vendors/carouselTicker.css';
import '@/public/assets/css/vendors/magnific-popup.css';
import '@/public/assets/fonts/remixicon/remixicon.css';
import '@/public/assets/css/main.css';

const urbanist = Urbanist({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--urbanist',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--playpair',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--dmMono',
  display: 'swap',
});

const fontVars = `${urbanist.variable} ${playfairDisplay.variable} ${dmMono.variable}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const siteJsonLd = await getSiteJsonLdGraph();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={fontVars} suppressHydrationWarning>
        <JsonLd data={siteJsonLd} id="site" />
        <GlobalScripts />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const seo = await getSeoAll({ routeLocale: locale });
  const icons = buildIconsFromSeo(seo.icons);

  return {
    ...(icons ? { icons } : {}),
  };
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'tr' },
  ];
}
