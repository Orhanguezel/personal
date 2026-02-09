'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  useGetPricingQuery,
  useListFaqsQuery,
  useGetSiteSettingByKeyQuery,
} from '@/integrations/hooks';
import type { PricingPlan, Faq } from '@/integrations/shared';
import { safeArr, money, unitText, normalizePricingPageCopy } from '@/integrations/shared';

export type Props = { locale: string };

export default function PricingClient({ locale }: Props) {
  const { data: pageSetting } = useGetSiteSettingByKeyQuery({
    key: 'page_pricing',
    locale,
  });

  const copy = useMemo(() => normalizePricingPageCopy(pageSetting?.value), [pageSetting?.value]);

  // ---- Pricing (public) ----
  const {
    data: pricingData,
    isLoading: pricingLoading,
    isFetching: pricingFetching,
    isError: pricingError,
  } = useGetPricingQuery(
    { locale, plans_limit: 10 },
    { skip: !locale }, // ✅ guard
  );

  // ---- Faqs (public) ----
  // ✅ locale gönderiyoruz (toPublicQuery bunu querystring'e basacak)
  const {
    data: faqsData,
    isLoading: faqsLoading,
    isFetching: faqsFetching,
    isError: faqsError,
  } = useListFaqsQuery(
    { locale, limit: 50, offset: 0, active: true },
    { skip: !locale }, // ✅ guard
  );

  const plans = useMemo(() => {
    const raw = safeArr<PricingPlan>(pricingData?.plans);

    return raw
      .filter((x) => !!x && x.is_active)
      .slice()
      .sort((a, b) => {
        const fa = a.is_featured ? 1 : 0;
        const fb = b.is_featured ? 1 : 0;
        if (fb !== fa) return fb - fa;
        return (a.display_order ?? 0) - (b.display_order ?? 0);
      })
      .slice(0, 3);
  }, [pricingData]);

  const faqs = useMemo(() => {
    const raw = safeArr<Faq>(faqsData);
    return raw.filter((x) => !!x && x.is_active).slice(0, 10);
  }, [faqsData]);

  const isBusy = pricingLoading || faqsLoading || pricingFetching || faqsFetching;
  const hasError = pricingError || faqsError;

  // React accordion state
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <>
      <section className="section-pricing-1 pt-130 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-lg-auto mb-8">
              <div className="text-center">
                <Link href="#" className="btn btn-gradient d-inline-block text-uppercase">
                  {copy.badge}
                </Link>

                <h3
                  className="ds-3 mt-3 mb-4 text-dark"
                  dangerouslySetInnerHTML={{ __html: copy.title_html }}
                />

                <p
                  className="text-300 fs-5 mb-0"
                  dangerouslySetInnerHTML={{ __html: copy.intro_html }}
                />
              </div>

              {/* ---- Plans ---- */}
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 justify-content-center mt-8">
                {isBusy && (
                  <div className="col">
                    <p className="text-300 fs-5 mb-0 text-center">{copy.loading}</p>
                  </div>
                )}

                {hasError && !isBusy && (
                  <div className="col">
                    <p className="text-300 fs-5 mb-0 text-center">{copy.error}</p>
                  </div>
                )}

                {!isBusy && !hasError && plans.length === 0 && (
                  <div className="col">
                    <p className="text-300 fs-5 mb-0 text-center">{copy.empty}</p>
                  </div>
                )}

                {!isBusy &&
                  !hasError &&
                  plans.map((p) => {
                    const ctaHref = p.cta_href || '#';
                    const ctaLabel = p.cta_label || copy.cta_default_label;
                    const features = safeArr<string>(p.features);

                    return (
                      <div className="col pricing-plan-col" key={p.id}>
                        <div className="card-pricing-1 p-6 rounded-4 h-100 d-flex flex-column">
                          <span className="text-uppercase fs-7">{p.badge || p.code}</span>
                          <br />

                          <h3 className="ds-3 fw-medium text-primary-1 mb-5">
                            {money(p.price_amount, p.currency)}
                            <span className="text-300 fs-4">{unitText(p.price_unit)}</span>
                          </h3>

                          <ul className="ps-3 border-top border-600 pt-5 mb-auto">
                            {features.map((f, idx) => (
                              <li key={`${p.id}-f-${idx}`}>
                                <p className="text-300 mb-2">{f}</p>
                              </li>
                            ))}
                          </ul>

                          <Link
                            href={ctaHref}
                            className="btn btn-primary mt-5 w-100 justify-content-center"
                          >
                            {ctaLabel}
                            <i className="ri-arrow-right-up-line" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* ---- FAQ ---- */}
          <div className="row mt-8">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-300 mb-8">{copy.faq_title}</h2>

              <div className="accordion">
                {!isBusy &&
                  !hasError &&
                  faqs.map((f, idx) => {
                    const isOpen = openIdx === idx;

                    return (
                      <div className="mb-3 card border-2 rounded-4 overflow-hidden" key={f.id}>
                        <div className="card-header p-0 border-0">
                          <button
                            type="button"
                            className="w-100 p-3 d-flex align-items-center bg-transparent border-0"
                            onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                            aria-expanded={isOpen}
                          >
                            <p className="fs-5 mb-0 text-dark text-start">{f.question}</p>

                            <span className="ms-auto me-2 icon-shape d-inline-flex align-items-center">
                              <i
                                className={`${isOpen ? 'ri-subtract-line' : 'ri-add-line'} fs-4 text-primary-1`}
                              />
                            </span>
                          </button>
                        </div>

                        {isOpen && (
                          <div className="px-4 pb-4 text-start card-body">
                            <p className="text-300 mb-0">{f.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                {!isBusy && !hasError && faqs.length === 0 && (
                  <div className="mb-3 card border-2 rounded-4">
                    <div className="p-4">
                      <p className="text-300 mb-0">{copy.faq_empty}</p>
                    </div>
                  </div>
                )}

                {hasError && !isBusy && (
                  <div className="mb-3 card border-2 rounded-4">
                    <div className="p-4">
                      <p className="text-300 mb-0">{copy.faq_error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
