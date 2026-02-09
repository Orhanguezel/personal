// =============================================================
// FILE: src/app/[locale]/services/[slug]/ServiceDetailClient.tsx
// FINAL — Service detail (client)
// - RTK: useGetServiceBySlugPublicQuery + useListServiceImagesPublicQuery
// - next-intl YOK: locale props ile gelir
// - content: JSON-string (tagline/highlights/html) OR raw html
// - markup/class'lar temayla uyumlu (stil bozulmaz)
// =============================================================

'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import {
  useGetServiceBySlugPublicQuery,
  useListServiceImagesPublicQuery,
  useGetSiteSettingByKeyQuery,
} from '@/integrations/hooks';

import {
  safeParseServiceContent,
  pickCardImageUrl,
  normalizeServiceImage,
  normalizeUiServicesSettingValue,
} from '@/integrations/shared';

function stripHtmlToText(input: string) {
  return input
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function ServiceDetailClient({ locale, slug }: { locale: string; slug: string }) {
  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_services',
    locale,
  });

  const ui = useMemo(
    () => normalizeUiServicesSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );

  const {
    data: svc,
    isLoading: isSvcLoading,
    isFetching: isSvcFetching,
    isError: isSvcError,
  } = useGetServiceBySlugPublicQuery({
    slug,
    locale,
    default_locale: locale,
  });

  const serviceId = svc?.id;

  const {
    data: imagesRaw,
    isLoading: isImgsLoading,
    isFetching: isImgsFetching,
  } = useListServiceImagesPublicQuery(
    serviceId
      ? { serviceId, locale, default_locale: locale }
      : // RTK query skip pattern: undefined param ile çalışıyorsa bu yeter.
        (undefined as any),
    {
      // bazı projelerde "skipToken" kullanılır; sende barrel nasıl ise
      // bu options yoksa kaldırabilirsin
      skip: !serviceId,
    } as any,
  );

  const showBusy = isSvcLoading || isSvcFetching;
  const showImgsBusy = isImgsLoading || isImgsFetching;

  const parsed = useMemo(() => {
    const raw = svc?.content ?? '';
    return safeParseServiceContent(raw);
  }, [svc?.content]);

  const title = svc?.name ?? ui.detail.title_fallback;
  const tagline = parsed?.tagline ?? svc?.summary ?? ui.detail.tagline_fallback;
  const coverUrl = useMemo(() => {
    if (!svc) return '/assets/imgs/services-list/img-1.png';
    return pickCardImageUrl(svc as any, 0);
  }, [svc]);

  const highlights = useMemo(() => {
    const arr = parsed?.highlights;
    return Array.isArray(arr) ? arr : [];
  }, [parsed]);

  const htmlFromJson = parsed?.html;
  const rawContent = (svc?.content ?? '').toString();
  const isProbablyHtml = /<\/?[a-z][\s\S]*>/i.test(rawContent);
  const fallbackText =
    svc?.summary || (rawContent ? stripHtmlToText(rawContent).slice(0, 600) : '') || '';

  const gallery = useMemo(() => {
    const rows = Array.isArray(imagesRaw) ? imagesRaw : [];
    // normalizeServiceImage zaten var demiştin; burada direkt kullanabilirsin
    // (imagesRaw zaten normalize geliyorsa bu map’i kaldır)
    return rows.map((r: any) => normalizeServiceImage(r));
  }, [imagesRaw]);

  return (
    <div>
      {/* Header / breadcrumb */}
      <section className="section-service-list pt-120 pb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto">
              <div className="text-center">
                <Link
                  href={`/${locale}/services`}
                  className="btn btn-gradient d-inline-block text-uppercase"
                >
                  {ui.detail.back_label}
                </Link>

                <h3 className="ds-3 mt-3 mb-4 text-dark">{title}</h3>

                <p className="text-300 fs-5 mb-0">{tagline}</p>

                {isSvcError ? (
                  <p className="text-300 fs-6 mt-3 mb-0">{ui.detail.error}</p>
                ) : showBusy ? (
                  <p className="text-300 fs-6 mt-3 mb-0">{ui.detail.loading}</p>
                ) : null}
              </div>

              {/* Main card (same card look) */}
              <div className="card-scroll mt-8">
                <div className="cards">
                  <div className="card-custom" data-index={0}>
                    <div className="card__inner bg-6 px-md-5 py-md-6 px-3 py-4">
                      <div className="card__title d-flex align-items-center mb-md-4 mb-3">
                        <div className="card_title_link">
                          <h3 className="fw-semibold mb-2">{title}</h3>
                          <p className="mb-0">{tagline}</p>
                        </div>

                        <Link
                          href={`/${locale}/services`}
                          className="card-icon border text-dark border-dark icon-shape ms-auto icon-md rounded-circle"
                        >
                          <i className="ri-arrow-left-line" />
                        </Link>
                      </div>

                      <div className="card__image-container zoom-img position-relative">
                        <img className="card__image" src={coverUrl} alt={svc?.image_alt ?? ''} />
                        <Link
                          href="#details"
                          className="card-image-overlay position-absolute start-0 end-0 w-100 h-100"
                        />
                      </div>

                      {/* Highlights */}
                      <div id="details" className="card__content mt-lg-5 mt-md-4 mt-3 pb-4">
                        {highlights.length > 0 ? (
                          highlights.map((h, i) => (
                            <div key={i} className="d-md-flex content">
                              <p className="fs-7 text-dark text-uppercase w-md-40 pe-8 mb-2 d-inline-block">
                                {h?.title ?? ui.detail.highlight_label}
                              </p>
                              <p className="card__description text-300 fs-6 mb-0">
                                {h?.description ?? ''}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="d-md-flex content">
                            <p className="fs-7 text-dark text-uppercase w-md-40 pe-8 mb-2 d-inline-block">
                              {ui.detail.details_label}
                            </p>
                            <p className="card__description text-300 fs-6 mb-0">
                              {fallbackText || '—'}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* HTML (opsiyonel) */}
                      {svc && (htmlFromJson || isProbablyHtml) ? (
                        <div className="mt-4">
                          <div className="d-md-flex content">
                            <p className="fs-7 text-dark text-uppercase w-md-40 pe-8 mb-2 d-inline-block">
                              {ui.detail.description_label}
                            </p>
                            <div className="card__description text-300 fs-6 mb-0">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: (htmlFromJson || rawContent) as string,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* Gallery (opsiyonel) */}
                      <div className="mt-5">
                        <div className="d-flex align-items-center justify-content-between">
                          <h5 className="mb-0 text-dark">{ui.detail.gallery_label}</h5>
                          {showImgsBusy ? (
                            <span className="text-300 fs-6">{ui.detail.gallery_loading}</span>
                          ) : null}
                        </div>

                        {gallery.length > 0 ? (
                          <div className="row mt-3">
                            {gallery
                              .filter((g) => g.is_active)
                              .sort((a, b) => a.display_order - b.display_order)
                              .slice(0, 12)
                              .map((g) => {
                                const img =
                                  g.image_url ||
                                  // storage url mapping’in varsa burada kullan
                                  '/assets/imgs/services-list/img-2.png';

                                return (
                                  <div key={g.id} className="col-md-6 col-lg-4 mb-3">
                                    <div className="card__image-container zoom-img position-relative">
                                      <img className="card__image" src={img} alt={g.alt ?? ''} />
                                      <span className="card-image-overlay position-absolute start-0 end-0 w-100 h-100" />
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : (
                          !showImgsBusy && (
                            <p className="text-300 fs-6 mt-3 mb-0">
                              {ui.detail.gallery_empty}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {!showBusy && !isSvcError && !svc ? (
                    <p className="text-300 fs-6 mt-4 mb-0">{ui.detail.not_found}</p>
                  ) : null}
                </div>
              </div>

              {/* İstersen burada SEO alanları / tags debug için min text eklenir */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
