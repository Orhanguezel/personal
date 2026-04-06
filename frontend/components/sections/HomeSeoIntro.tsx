import { homeSeoIntroHtml } from '@/content/geo-home-intro';
import { normalizeLocaleParam } from '@/i18n/localeParam';

const headings: Record<string, string> = {
  de: 'Full-Stack Delivery aus Grevenbroich',
  en: 'Full-stack delivery from Grevenbroich',
  tr: 'Grevenbroich’tan full-stack teslimat',
};

export function HomeSeoIntro({ locale }: { locale: string }) {
  const loc = normalizeLocaleParam(locale);
  const html = homeSeoIntroHtml[loc] ?? homeSeoIntroHtml.de;
  const h2 = headings[loc] ?? headings.en;

  return (
    <section
      className="section-seo-intro pt-80 pb-80 bg-3 border-top border-secondary-3"
      aria-labelledby="seo-intro-heading"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h2 id="seo-intro-heading" className="ds-4 mb-4 text-dark">
              {h2}
            </h2>
            <div className="text-300 fs-5 lh-lg" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </section>
  );
}
