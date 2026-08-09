// =============================================================
// FILE: frontend/app/[locale]/checkout/page.tsx
// Guest checkout page (server wrapper)
// =============================================================

import Layout from '@/components/layout/Layout';
import CheckoutClient from './_component/CheckoutClient';
import { normalizeLocaleParam } from '@/i18n/localeParam';

// Checkout DOGASI GEREGI dinamik: sepet/siparis durumu istege bagli ve
// CheckoutClient useSearchParams() kullaniyor.
// Onceden tum rotalar dolayli olarak dinamikti (layout SEO katmani
// cookies()/headers() cagiriyordu), bu yuzden sayfa hic statik uretilmiyordu.
// O bagimlilik kaldirilinca Next burayi prerender etmeye calisti ve
// "useSearchParams() should be wrapped in a suspense boundary" ile BUILD'I
// KIRDI. Sayfayi acikca dinamik isaretliyoruz.
export const dynamic = 'force-dynamic';

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
