import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';
import JsonLd from '@/seo/JsonLd';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import { faqByLocale } from '@/content/faq-data';
import { buildMetadata, getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';

export const dynamic = 'force-dynamic';

const titles: Record<string, string> = {
  de: 'FAQ — Häufige Fragen',
  en: 'FAQ — Common questions',
  tr: 'SSS — Sık sorulan sorular',
};

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);
  const items = faqByLocale[locale] ?? faqByLocale.en;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'de' ? 'Startseite' : locale === 'tr' ? 'Anasayfa' : 'Home', url: `/${locale}` },
          { name: 'FAQ', url: `/${locale}/faq` },
        ]}
      />
      <JsonLd data={faqJsonLd} id="faq-page" />
      <section className="section-faq pt-120 pb-150">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <h1 className="ds-3 mb-2 text-dark">{titles[locale] ?? titles.en}</h1>
              <p className="text-300 fs-5 mb-5">
                {locale === 'de'
                  ? 'Antworten zu Preisen, Laufzeiten, Tech-Stack und Wartung.'
                  : locale === 'tr'
                    ? 'Fiyat, süre, teknoloji ve bakım hakkında kısa yanıtlar.'
                    : 'Short answers on pricing, timelines, tech stack, and maintenance.'}
              </p>
              <div className="d-flex flex-column gap-3">
                {items.map((item, i) => (
                  <details
                    key={i}
                    className="border border-secondary-3 rounded-4 p-4 bg-white shadow-sm"
                    {...(i === 0 ? { open: true } : {})}
                  >
                    <summary className="fs-5 fw-semibold text-dark" style={{ cursor: 'pointer' }}>
                      {item.question}
                    </summary>
                    <p className="text-300 fs-6 lh-lg mt-3 mb-0">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.faq, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/faq`,
    ogType: 'website',
  });
}
