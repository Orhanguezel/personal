'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { useGetPricingQuery, useListFaqsQuery } from '@/integrations/hooks';
import type { Faq, PricingPageCopy, PricingPlan, PricingPublicResponse } from '@/integrations/shared';
import { safeArr } from '@/integrations/shared';
import type { UsdFxRates } from '@/utils/usdFx.server';
import {
  displayPriceForPlan,
  fxDisclaimer,
  unitLabelForLocale,
} from '@/utils/pricingDisplay';

export type Props = {
  locale: string;
  /** From server (`public/ui` + fallbacks). */
  initialCopy: PricingPageCopy;
  /** `null` = server fetch failed → RTK fallback. */
  initialPricing: PricingPublicResponse | null;
  /** `null` = server fetch failed → RTK fallback. */
  initialFaqs: Faq[] | null;
  /** USD→TRY/EUR kurları (Frankfurter veya yedek). */
  initialFxRates: UsdFxRates;
};

export default function PricingClient({
  locale,
  initialCopy,
  initialPricing,
  initialFaqs,
  initialFxRates,
}: Props) {
  const copy = initialCopy;

  const [fxRates, setFxRates] = useState<{
    TRY: number;
    EUR: number;
    source: UsdFxRates['source'];
  }>({
    TRY: initialFxRates.TRY,
    EUR: initialFxRates.EUR,
    source: initialFxRates.source,
  });

  useEffect(() => {
    if (initialFxRates.source === 'live') return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/fx', { cache: 'no-store' });
        if (!res.ok || cancelled) return;
        const j = (await res.json()) as {
          rates?: { TRY?: number; EUR?: number };
          source?: string;
        };
        const t = j.rates?.TRY;
        const e = j.rates?.EUR;
        if (typeof t === 'number' && typeof e === 'number' && t > 0 && e > 0) {
          setFxRates({
            TRY: t,
            EUR: e,
            source: j.source === 'live' ? 'live' : 'fallback',
          });
        }
      } catch {
        /* keep SSR fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialFxRates.source]);

  const usePricingFallback = initialPricing === null;
  const useFaqsFallback = initialFaqs === null;

  const {
    data: pricingRemote,
    isLoading: pricingLoading,
    isFetching: pricingFetching,
    isError: pricingError,
  } = useGetPricingQuery({ locale, plans_limit: 10 }, { skip: !usePricingFallback || !locale });

  const faqParams = {
    locale,
    limit: 50,
    offset: 0,
    is_active: true,
  };

  const {
    data: faqsRemote,
    isLoading: faqsLoading,
    isFetching: faqsFetching,
    isError: faqsError,
  } = useListFaqsQuery(faqParams, { skip: !useFaqsFallback || !locale });

  const pricingData = usePricingFallback ? pricingRemote : initialPricing;
  const faqsRaw = useFaqsFallback ? faqsRemote : initialFaqs;

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
    const raw = safeArr<Faq>(faqsRaw);
    return raw.filter((x) => !!x && x.is_active).slice(0, 10);
  }, [faqsRaw]);

  const isBusy =
    (usePricingFallback && (pricingLoading || pricingFetching)) ||
    (useFaqsFallback && (faqsLoading || faqsFetching));

  const hasError =
    (usePricingFallback && pricingError) || (useFaqsFallback && faqsError);

  const contactHref = `/${locale}/#contact`;

  return (
    <>
      <section className="section-pricing-1 pt-130 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-lg-auto mb-8">
              <div className="text-center">
                <Link href={contactHref} className="btn btn-gradient d-inline-block text-uppercase">
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
                <p className="text-300 fs-7 mt-3 mb-0 opacity-75">{fxDisclaimer(locale)}</p>
              </div>

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
                    const ctaHref = p.cta_href || contactHref;
                    const ctaLabel = p.cta_label || copy.cta_default_label;
                    const features = safeArr<string>(p.features);
                    const { text: priceText } = displayPriceForPlan(p, locale, fxRates);

                    return (
                      <div className="col pricing-plan-col" key={p.id}>
                        <div className="card-pricing-1 p-6 rounded-4 h-100 d-flex flex-column">
                          <span className="text-uppercase fs-7">{p.badge || p.code}</span>
                          <br />

                          <h3 className="ds-3 fw-medium text-primary-1 mb-5">
                            {priceText}
                            <span className="text-300 fs-4">
                              {unitLabelForLocale(p.price_unit, locale)}
                            </span>
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

          <div className="row mt-8">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-300 mb-8">{copy.faq_title}</h2>

              <div className="accordion text-start">
                {!isBusy &&
                  !hasError &&
                  faqs.map((f, idx) => (
                    <details
                      key={f.id}
                      className="mb-3 card border-2 rounded-4 overflow-hidden"
                      open={idx === 0}
                    >
                      <summary
                        className="p-3 cursor-pointer"
                        style={{ listStylePosition: 'outside' }}
                      >
                        <span className="fs-5 text-dark">{f.question}</span>
                      </summary>
                      <div className="px-4 pb-4 card-body">
                        <p className="text-300 mb-0">{f.answer}</p>
                      </div>
                    </details>
                  ))}

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
