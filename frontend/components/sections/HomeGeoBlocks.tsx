import { homeGeoBlocks } from '@/content/geo-home-blocks';
import { normalizeLocaleParam } from '@/i18n/localeParam';
import JsonLd from '@/seo/JsonLd';
import { faqPage, graph } from '@/seo/jsonld';

export function HomeGeoBlocks({ locale }: { locale: string }) {
  const loc = normalizeLocaleParam(locale);
  const copy = homeGeoBlocks[loc] ?? homeGeoBlocks.de;

  const faqJsonLd = graph([
    faqPage(
      copy.faqs.map(({ question, answer }) => ({
        question,
        answer,
      })),
    ),
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd} id="home-geo-faq" />

      <section
        className="section-home-geo-tech pt-80 pb-80 bg-3 border-top border-secondary-3"
        aria-labelledby="home-geo-tech-heading"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 id="home-geo-tech-heading" className="ds-4 mb-3 text-dark">
                {copy.techHeading}
              </h2>
              <p className="text-300 fs-5 lh-lg mb-5">{copy.techIntro}</p>
              <div className="row g-4">
                {copy.tech.map((cat) => (
                  <div className="col-md-6 col-lg-4" key={cat.category}>
                    <h3 className="fs-5 text-dark mb-3">{cat.category}</h3>
                    <ul className="text-300 fs-6 mb-0 ps-3">
                      {cat.items.map((item) => (
                        <li key={item} className="mb-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-home-geo-why pt-80 pb-80 bg-6 border-top border-secondary-3"
        aria-labelledby="home-geo-why-heading"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 id="home-geo-why-heading" className="ds-4 mb-5 text-dark text-center">
                {copy.whyHeading}
              </h2>
              <div className="text-start">
                {copy.faqs.map((f, idx) => (
                  <details
                    key={f.question}
                    className="mb-3 card border-2 rounded-4 overflow-hidden bg-3"
                    open={idx === 0}
                  >
                    <summary className="p-3 cursor-pointer" style={{ listStylePosition: 'outside' }}>
                      <span className="fs-5 text-dark">{f.question}</span>
                    </summary>
                    <div className="px-4 pb-4">
                      <p className="text-300 mb-0 lh-lg">{f.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
