import Layout from '@/components/layout/Layout';
import SuccessClient from './_component/SuccessClient';
import { normalizeLocaleParam } from '@/i18n/localeParam';

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <SuccessClient locale={safeLocale} />
    </Layout>
  );
}

export const metadata = {
  title: 'Bestellung erfolgreich - Guezel Web Design',
  robots: { index: false, follow: false },
};
