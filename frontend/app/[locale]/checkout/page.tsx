// =============================================================
// FILE: frontend/app/[locale]/checkout/page.tsx
// Guest checkout page (server wrapper)
// =============================================================

import Layout from '@/components/layout/Layout';
import CheckoutClient from './_component/CheckoutClient';
import { normalizeLocaleParam } from '@/i18n/localeParam';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <CheckoutClient locale={safeLocale} />
    </Layout>
  );
}

export const metadata = {
  title: 'Checkout - Guezel Web Design',
  robots: { index: false, follow: false },
};
