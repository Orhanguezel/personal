import Layout from '@/components/layout/Layout';
import { TestimonialCardView } from '@/components/testimonials/TestimonialCardView';
import BreadcrumbJsonLd from '@/seo/BreadcrumbJsonLd';
import JsonLd from '@/seo/JsonLd';
import { testimonialsReviewGraph } from '@/seo/jsonld';
import { buildMetadata, getSeoPage, SEO_PAGE_KEYS } from '@/seo';
import { getSeoAll } from '@/seo/seo.server';
import { normalizeLocaleParam, unwrapRouteParams } from '@/i18n/localeParam';
import { mapReviewToTestimonialCard } from '@/integrations/shared';
import {
  getReviewsListServer,
  getTestimonialsUiServer,
} from '@/utils/publicLists.server';

const INTRO: Record<string, string> = {
  de: 'Ausgewählte Rückmeldungen zu Zusammenarbeit, Qualität der Lieferung und Kommunikation.',
  en: 'Selected feedback on collaboration, delivery quality, and communication.',
  tr: 'İş birliği, teslim kalitesi ve iletişim hakkında seçilmiş geri bildirimler.',
};

const TITLES: Record<string, string> = {
  de: 'Kundenstimmen',
  en: 'Client reviews',
  tr: 'Müşteri yorumları',
};

const HOME_LABEL: Record<string, string> = {
  de: 'Startseite',
  en: 'Home',
  tr: 'Anasayfa',
};

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const p = await unwrapRouteParams(params);
  const locale = normalizeLocaleParam(p?.locale);

  const ui = await getTestimonialsUiServer(locale);

  const [reviewsRaw, seoAll] = await Promise.all([
    getReviewsListServer({
      locale,
      target_type: ui.target_type,
      target_id: ui.bucket,
      limit: 100,
      offset: 0,
    }),
    getSeoAll({ routeLocale: locale }),
  ]);

  const reviews = reviewsRaw ?? [];
  const canonicalBase = seoAll.defaults.canonicalBase;
  const professionalServiceId = `${canonicalBase}/#professional-service`;

  const jsonLd = testimonialsReviewGraph({
    professionalServiceId,
    siteName: seoAll.defaults.siteName,
    canonicalBase,
    reviews: reviews.map((r) => ({
      authorName: r.name,
      reviewBody: String(r.comment ?? '').trim() || '—',
      ratingValue: Math.min(5, Math.max(1, Math.round(Number(r.rating)))),
      datePublished: typeof r.created_at === 'string' ? r.created_at.slice(0, 10) : undefined,
    })),
  });

  const cards = reviews.map(mapReviewToTestimonialCard);
  const homeLabel = HOME_LABEL[locale] ?? HOME_LABEL.en;
  const title = TITLES[locale] ?? TITLES.en;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <BreadcrumbJsonLd
        items={[
          { name: homeLabel, url: `/${locale}` },
          { name: title, url: `/${locale}/testimonials` },
        ]}
      />
      {jsonLd ? <JsonLd data={jsonLd} id="testimonials-reviews" /> : null}

      <section className="section-testimonials-page pt-120 pb-150">
        <div className="container">
          <h1 className="ds-3 mb-3 text-dark">{title}</h1>
          <p className="text-300 fs-5 mb-8 col-lg-9 px-0">
            {INTRO[locale] ?? INTRO.en}
          </p>

          {cards.length === 0 ? (
            <p className="text-300 fs-5 mb-0">{ui.empty}</p>
          ) : (
            <div className="row g-4">
              {cards.map((card) => (
                <div className="col-md-6 col-lg-4" key={card.id}>
                  <TestimonialCardView card={card} locale={locale} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
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

  const { all, page } = await getSeoPage(SEO_PAGE_KEYS.testimonials, { routeLocale: locale });
  return buildMetadata({
    seo: all,
    page,
    canonicalPath: `/${locale}/testimonials`,
    ogType: 'website',
  });
}
