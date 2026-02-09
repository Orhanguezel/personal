// =============================================================
// FILE: src/app/[locale]/services/_component/ServicesClient.tsx
// FINAL — Services page (client)
// FIX:
// - locale props ile gelir (page.tsx -> ServicesClient)
// - RTK query'e locale + default_locale gönder (i18n coalesce için şart)
// - localeFromPathname / next-intl yok
// - markup & class'lar korunur (stil değişmez)
// =============================================================

'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { useGetSiteSettingByKeyQuery, useListServicesPublicQuery } from '@/integrations/hooks';
import {
  safeParseServiceContent,
  pickCardImageUrl,
  normalizeUiServicesSettingValue,
} from '@/integrations/shared';

export default function ServicesClient({ locale }: { locale: string }) {
  const { data: pageSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_services',
    locale,
  });

  const ui = useMemo(
    () => normalizeUiServicesSettingValue(pageSetting?.value),
    [pageSetting?.value],
  );

  const { data, isLoading, isFetching, isError } = useListServicesPublicQuery({
    locale,
    default_locale: locale,
    limit: 100,
    offset: 0,
    order: 'display_order.asc',
  });

  const items = data?.items ?? [];

  const cards = useMemo(() => {
    return items.map((svc, idx) => {
      const parsed = safeParseServiceContent((svc as any).content);
      const tagline = parsed?.tagline ?? (svc as any).summary ?? ui.page.tagline_fallback;
      const highlights =
        Array.isArray(parsed?.highlights) && parsed.highlights.length > 0
          ? parsed.highlights.slice(0, 3)
          : [];

      return {
        id: svc.id,
        slug: (svc as any).slug,
        name: (svc as any).name ?? ui.page.card_fallback_title,
        tagline,
        highlights,
        img: pickCardImageUrl(svc as any, idx),
      };
    });
  }, [items, ui]);

  const showBusy = isLoading || isFetching;

  return (
    <div>
      <section className="section-service-list pt-120 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto">
              <div className="text-center">
                <Link href="#" className="btn btn-gradient d-inline-block text-uppercase">
                  {ui.page.badge}
                </Link>
                <h3
                  className="ds-3 mt-3 mb-4 text-dark"
                  dangerouslySetInnerHTML={{ __html: ui.page.title_html }}
                />
                <p
                  className="text-300 fs-5"
                  dangerouslySetInnerHTML={{ __html: ui.page.intro_html }}
                />

                {isError ? (
                  <p className="text-300 fs-6 mt-3 mb-0">{ui.page.error}</p>
                ) : showBusy ? (
                  <p className="text-300 fs-6 mt-3 mb-0">{ui.page.loading}</p>
                ) : null}
              </div>

              <div className="card-scroll mt-8">
                <div className="cards">
                  {cards.map((c, idx) => {
                    const href = c.slug ? `/${locale}/services/${encodeURIComponent(c.slug)}` : '#';

                    return (
                      <div key={c.id} className="card-custom" data-index={idx}>
                        <div className="card__inner bg-6 px-md-5 py-md-6 px-3 py-4">
                          <div className="card__title d-flex align-items-center mb-md-4 mb-3">
                            <Link href={href} className="card_title_link">
                              <h3 className="fw-semibold mb-2">{c.name}</h3>
                              <p className="mb-0">{c.tagline}</p>
                            </Link>
                            <Link
                              href={href}
                              className="card-icon border text-dark border-dark icon-shape ms-auto icon-md rounded-circle"
                            >
                              <i className="ri-arrow-right-up-line" />
                            </Link>
                          </div>

                          <div className="card__image-container zoom-img position-relative">
                            <img className="card__image" src={c.img} alt="" />
                            <Link
                              href={href}
                              className="card-image-overlay position-absolute start-0 end-0 w-100 h-100"
                            />
                          </div>

                          <div className="card__content mt-lg-5 mt-md-4 mt-3 pb-4">
                            {c.highlights.length > 0 ? (
                              c.highlights.map((h, i) => (
                                <div key={i} className="d-md-flex content">
                                  <p className="fs-7 text-dark text-uppercase w-md-40 pe-8 mb-2 d-inline-block">
                                    {h.title ?? ui.page.highlight_label}
                                  </p>
                                  <p className="card__description text-300 fs-6 mb-0">
                                    {h.description ?? ''}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className="d-md-flex content">
                                <p className="fs-7 text-dark text-uppercase w-md-40 pe-8 mb-2 d-inline-block">
                                  {ui.page.details_label}
                                </p>
                                <p className="card__description text-300 fs-6 mb-0">
                                  {(() => {
                                    const raw = (
                                      (items[idx] as any)?.summary ||
                                      (items[idx] as any)?.content ||
                                      ''
                                    ).toString();
                                    const txt = raw.replace(/<[^>]*>/g, '').trim();
                                    return txt || '—';
                                  })()}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {!showBusy && !isError && cards.length === 0 ? (
                    <p className="text-300 fs-6 mt-4 mb-0">{ui.page.empty}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Static + Contact bölümleri aynı kalsın (senin mevcut koddaki gibi) */}
    </div>
  );
}
