// =============================================================
// FILE: frontend/app/[locale]/layout.tsx
// FINAL — Locale segment wrapper (NO html/body to avoid nesting)
// - Next 16 params Promise-safe
// - Keeps AppProviders
// - Dynamic favicon + basic metadata from DB
// =============================================================

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { AppProviders } from '@/app/providers';
import { unwrapRouteParams, normalizeLocaleParam } from '@/i18n/localeParam';
import { getSeoAll } from '@/seo';
import { buildIconsFromSeo } from '@/integrations/shared';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  return <AppProviders>{children}</AppProviders>;
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
