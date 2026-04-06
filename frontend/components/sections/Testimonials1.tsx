// frontend/components/sections/Testimonials1.tsx

'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TestimonialCardView } from '@/components/testimonials/TestimonialCardView';
import { useListReviewsPublicQuery } from '@/integrations/hooks';
import { useStaticSiteSetting } from '@/utils/staticSiteSettings';
import { withLocalePath } from '@/utils/localeHref';
import {
  mapReviewToTestimonialCard,
  normalizeTestimonialsSectionSettingValue,
  type ReviewDto,
  type ReviewListQueryParams,
  type TestimonialsSection,
} from '@/integrations/shared';

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  slidesPerGroup: 1,
  centeredSlides: false,
  loop: true,
  autoplay: {
    delay: 4000,
  },
  breakpoints: {
    1200: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 1,
    },
    0: {
      slidesPerView: 1,
    },
  },
  pagination: {
    el: '.swiper-pagination',
  },
};

type Props = {
  locale?: string;
  /** Server `ui_testimonials` — avoids empty first paint when set. */
  initialUi?: TestimonialsSection;
  /** `null` = API error on server → RTK fallback. */
  initialReviews?: ReviewDto[] | null;
};

export default function Testimonials1({ locale = 'en', initialUi, initialReviews }: Props) {
  const safeLocale = (locale || 'en').trim() || 'en';

  const { value: uiSettingValue } = useStaticSiteSetting({
    key: 'ui_testimonials',
    locale: safeLocale,
  });

  const uiFromHook = useMemo(
    () => normalizeTestimonialsSectionSettingValue(uiSettingValue),
    [uiSettingValue],
  );

  const ui = initialUi ?? uiFromHook;

  const listParams: ReviewListQueryParams | undefined = ui.target_type && ui.bucket
    ? {
        target_type: ui.target_type,
        target_id: ui.bucket,
        locale: safeLocale,
        orderBy: 'display_order',
        order: 'asc',
        limit: 20,
        offset: 0,
      }
    : undefined;

  const useRemoteReviews = initialReviews === undefined || initialReviews === null;

  const {
    data: reviewsRemote,
    isLoading,
    isFetching,
    isError,
  } = useListReviewsPublicQuery(listParams ?? skipToken, {
    skip: !useRemoteReviews || !listParams,
  });

  const items = useMemo((): ReviewDto[] => {
    if (!useRemoteReviews) return Array.isArray(initialReviews) ? initialReviews : [];
    return Array.isArray(reviewsRemote) ? (reviewsRemote as ReviewDto[]) : [];
  }, [useRemoteReviews, initialReviews, reviewsRemote]);

  const busy = useRemoteReviews && (isLoading || isFetching);
  const cards = useMemo(() => items.map(mapReviewToTestimonialCard), [items]);
  const showEmpty = !busy && !isError && cards.length === 0;

  const ctaHref = withLocalePath(safeLocale, ui.cta_href);

  return (
    <>
      <section className="section-testimonials-1 position-relative pt-120 pb-120 bg-900 overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2 className="ds-3 mt-3 mb-3 text-primary-1">{ui.headline}</h2>
              <span className="fs-5 fw-medium text-200">
                {ui.intro_line_1}
                <br />
                {ui.intro_line_2}
              </span>
              <div className="row mt-8">
                <Swiper
                  {...swiperOptions}
                  loop={!busy && !isError && cards.length > 2}
                  className="swiper slider-2 pt-2 pb-3"
                >
                  <div className="swiper-wrapper">
                    {busy && (
                      <SwiperSlide>
                        <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                          <p className="mb-0 h6">{ui.loading}</p>
                        </div>
                      </SwiperSlide>
                    )}

                    {!busy && isError && (
                      <SwiperSlide>
                        <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                          <p className="mb-0 h6">{ui.error}</p>
                        </div>
                      </SwiperSlide>
                    )}

                    {showEmpty && (
                      <SwiperSlide>
                        <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                          <p className="mb-0 h6">{ui.empty}</p>
                        </div>
                      </SwiperSlide>
                    )}

                    {!busy &&
                      !isError &&
                      cards.map((card) => (
                        <SwiperSlide key={card.id}>
                          <div className="mx-3 mx-md-0">
                            <TestimonialCardView card={card} locale={safeLocale} />
                          </div>
                        </SwiperSlide>
                      ))}
                  </div>
                  <div className="swiper-pagination" />
                  <div className="text-center mt-8 position-relative z-3">
                    {ui.cta_label ? (
                      <Link href={ctaHref} className="btn btn-gradient">
                        {ui.cta_label}
                        <i className="ri-arrow-right-up-line" />
                      </Link>
                    ) : null}
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-1 position-absolute bottom-0 start-50 z-1 ms-10 ps-10 d-none d-md-block">
          <img
            className="position-relative z-1"
            src={ui.man_img}
            alt="Testimonials illustration"
            width={400}
            height={500}
            loading="lazy"
          />
          <div className="position-absolute top-50 start-50 translate-middle z-0 mt-5">
            <img
              className="ribbonRotate"
              src={ui.decorate_img}
              alt=""
              width={220}
              height={209}
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
