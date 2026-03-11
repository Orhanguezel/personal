import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { normalizeLocaleParam } from '@/i18n/localeParam';

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = normalizeLocaleParam(locale);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <section className="pt-120 pb-150">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="mb-4">
                <span className="text-warning" style={{ fontSize: '4rem' }}>&#9888;</span>
              </div>
              <h2 className="fw-bold mb-3">Zahlung abgebrochen</h2>
              <p className="text-muted fs-5 mb-4">
                Der Zahlungsvorgang wurde abgebrochen. Es wurde kein Geld abgebucht.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link href={`/${safeLocale}/products`} className="btn btn-primary">
                  Zurueck zu den Paketen
                </Link>
                <Link href={`/${safeLocale}`} className="btn btn-outline-secondary">
                  Zur Startseite
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const metadata = {
  title: 'Zahlung abgebrochen - Guezel Web Design',
  robots: { index: false, follow: false },
};
