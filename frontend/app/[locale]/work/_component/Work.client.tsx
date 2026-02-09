// ---------------------------------------------------------------------
// FILE: frontend/app/[locale]/work/_component/Work.client.tsx
// FIX — href now includes locale prefix via pathname
// ---------------------------------------------------------------------
'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { useGetSiteSettingByKeyQuery, useListProjectsPublicQuery } from '@/integrations/hooks';
import { normalizeStringArray, contentToSummary, normalizeUiProjectSettingValue } from '@/integrations/shared';

export default function WorkClient({ locale }: { locale: string }) {
  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_project',
    locale,
  });

  const ui = useMemo(() => normalizeUiProjectSettingValue(uiSetting?.value), [uiSetting?.value]);
  const copy = ui.work;

  const { data, isLoading, isFetching } = useListProjectsPublicQuery({
    orderBy: 'display_order',
    orderDir: 'asc',
    view: 'card',
    limit: 200,
    locale,
  });

  const items = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-lg-auto">
            <div className="text-center">
              <a href="#" className="btn btn-gradient d-inline-block text-uppercase">
                {copy.badge}
              </a>
              <h3
                className="ds-3 mt-3 mb-4 text-dark"
                dangerouslySetInnerHTML={{ __html: copy.title_html }}
              />
              <p
                className="text-300 fs-5"
                dangerouslySetInnerHTML={{ __html: copy.intro_html }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="card-scroll mt-8">
            <div className="cards">
              {isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="card-custom" data-index={i}>
                      <div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
                        <div className="card__image-container zoom-img position-relative">
                          <div
                            className="card__image"
                            style={{ width: '100%', height: 260, background: 'rgba(0,0,0,0.05)' }}
                          />
                        </div>
                        <div className="card__content px-md-4 px-3">
                          <div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
                            <div className="card_title_link">
                              <p className="text-primary-1 mb-0 mb-md-2">...</p>
                              <h3 className="fw-semibold">{copy.loading_title}</h3>
                            </div>
                          </div>
                          <p className="text-300 mb-lg-auto mb-md-4 mb-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {items.map((p, idx) => {
                    const href = `/${locale}/work/${p.slug}`; // ✅ LOCALE PREFIX
                    const summary = contentToSummary(p);
                    const toolsArr = normalizeStringArray(p.techs);

                    const img = p.featured_image ?? '/assets/imgs/work/img-1.png';
                    const alt = p.featured_image_alt ?? p.title ?? '';

                    return (
                      <div key={p.id} className="card-custom" data-index={idx}>
                        <div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
                          <div className="card__image-container zoom-img position-relative">
                            <img className="card__image" src={img} alt={alt} />
                            <Link
                              href={href}
                              className="card-image-overlay position-absolute start-0 end-0 w-100 h-100"
                            />
                          </div>

                          <div className="card__content px-md-4 px-3">
                            <div className="card__title d-md-flex align-items-center mb-0 mb-lg-2">
                              <Link href={href} className="card_title_link">
                                <p className="text-primary-1 mb-0 mb-md-2">{p.category ?? ''}</p>
                                <h3 className="fw-semibold">{p.title ?? ''}</h3>
                              </Link>

                              <Link
                                href={href}
                                className="card-icon d-none d-md-inline-flex border text-dark border-dark icon-shape ms-auto icon-md rounded-circle"
                              >
                                <i className="ri-arrow-right-up-line" />
                              </Link>
                            </div>

                            {summary ? (
                              <p className="text-300 mb-lg-auto mb-md-4 mb-3">{summary}</p>
                            ) : (
                              <p className="text-300 mb-lg-auto mb-md-4 mb-3" />
                            )}

                            <div className="d-md-flex content">
                              <p className="mb-0 fs-7 text-dark text-uppercase w-40">
                                {copy.label_client}
                              </p>
                              <p className="mb-0 card__description text-300 fs-6 mb-0">
                                {p.client_name ?? ''}
                              </p>
                            </div>

                            <div className="d-md-flex content">
                              <p className="mb-0 fs-7 text-dark text-uppercase w-40">
                                {copy.label_completion_time}
                              </p>
                              <p className="mb-0 card__description text-300 fs-6 mb-0">
                                {p.completion_time_label ?? ''}
                              </p>
                            </div>

                            <div className="d-md-flex content">
                              <p className="mb-0 fs-7 text-dark text-uppercase w-40">
                                {copy.label_tools}
                              </p>
                              <p className="mb-0 card__description text-300 fs-6 mb-0">
                                {toolsArr.join(', ')}
                              </p>
                            </div>

                            {isFetching ? (
                              <div className="mt-2">
                                <span className="text-300 fs-7">{copy.updating}</span>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}

              {!isLoading && items.length === 0 ? (
                <div className="card-custom" data-index={0}>
                  <div className="card__inner bg-6 p-lg-6 p-md-4 p-3">
                    <div className="card__content px-md-4 px-3">
                      <h3 className="fw-semibold">{copy.empty_title}</h3>
                      <p className="text-300 mb-0">{copy.empty_text}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
