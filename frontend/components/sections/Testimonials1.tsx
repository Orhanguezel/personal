// frontend/components/sections/Testimonials1.tsx

'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetSiteSettingByKeyQuery, useListReviewsPublicQuery } from '@/integrations/hooks';
import {
  mapReviewToTestimonialCard,
  normalizeTestimonialsSectionSettingValue,
  type ReviewDto,
  type ReviewListQueryParams,
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

function renderStars(rating: number) {
  const safe = Number.isFinite(rating) ? Math.max(0, Math.min(5, Math.round(rating))) : 0;
  return Array.from({ length: 5 }).map((_, i) => (
    <i
      key={i}
      className={`ri-star-fill fs-7 ${i < safe ? 'text-primary-1' : 'text-500'}`}
    />
  ));
}

export default function Testimonials1({ locale = 'en' }: { locale?: string }) {
  const safeLocale = (locale || 'en').trim() || 'en';

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_testimonials',
    locale: safeLocale,
  });

  const ui = useMemo(
    () => normalizeTestimonialsSectionSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );

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

  const {
    data: reviews,
    isLoading,
    isFetching,
    isError,
  } = useListReviewsPublicQuery(listParams ?? skipToken);

  const busy = isLoading || isFetching;
  const items = useMemo(() => (Array.isArray(reviews) ? (reviews as ReviewDto[]) : []), [reviews]);
  const cards = useMemo(() => items.map(mapReviewToTestimonialCard), [items]);
  const showEmpty = !busy && !isError && cards.length === 0;

  return (
    <>
      <section className="section-testimonials-1 position-relative pt-120 pb-120 bg-900 overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h3 className="ds-3 mt-3 mb-3 text-primary-1">{ui.headline}</h3>
              <span className="fs-5 fw-medium text-200">
                {ui.intro_line_1}
                <br />
                {ui.intro_line_2}
              </span>
              <div className="row mt-8">
                <Swiper {...swiperOptions} className="swiper slider-2 pt-2 pb-3">
                  <div className="swiper-wrapper">
                    {busy && (
                      <SwiperSlide>
                        <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                          <h6 className="mb-0">{ui.loading}</h6>
                        </div>
                      </SwiperSlide>
                    )}

                    {!busy && isError && (
                      <SwiperSlide>
                        <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                          <h6 className="mb-0">{ui.error}</h6>
                        </div>
                      </SwiperSlide>
                    )}

                    {showEmpty && (
                      <SwiperSlide>
                        <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                          <h6 className="mb-0">{ui.empty}</h6>
                        </div>
                      </SwiperSlide>
                    )}

                    {!busy && !isError &&
                      cards.map((card) => (
                        <SwiperSlide key={card.id}>
                          <div className="bg-white card-testimonial-1 p-lg-7 p-md-5 mx-3 mx-md-0 p-4 border-2 rounded-4 position-relative">
                            <div className="mb-6 logo">
                              <img src={card.logo} alt="logo" />
                            </div>
                            <div className="d-flex mb-5">{renderStars(card.rating)}</div>
                            <h6 className="mb-7">“{card.comment}”</h6>
                            <Link href={card.href} className="d-flex align-items-center">
                              <img className="icon_65 avatar" src={card.avatar} alt={card.name} />
                              <h6 className="ms-2 mb-0">
                                {card.name}
                                <span className="fs-6 fw-regular">{card.meta}</span>
                              </h6>
                            </Link>
                            <div className="position-absolute top-0 end-0 m-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={52}
                                height={52}
                                viewBox="0 0 52 52"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_551_13914)">
                                  <path
                                    d="M0 29.7144H11.1428L3.71422 44.5715H14.8571L22.2857 29.7144V7.42871H0V29.7144Z"
                                    fill="#D1D5DB"
                                  />
                                  <path
                                    d="M29.7148 7.42871V29.7144H40.8577L33.4291 44.5715H44.5719L52.0005 29.7144V7.42871H29.7148Z"
                                    fill="#D1D5DB"
                                  />
                                </g>
                                <defs>
                                  <clipPath>
                                    <rect width={52} height={52} fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </div>
                  <div className="swiper-pagination" />
                  <div className="text-center mt-8 position-relative z-3">
                    {ui.cta_label ? (
                      <Link href={ui.cta_href || '#'} className="btn btn-gradient">
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
          <img className="position-relative z-1" src={ui.man_img} alt="man" />
          <div className="position-absolute top-50 start-50 translate-middle z-0 mt-5">
            <img className="ribbonRotate" src={ui.decorate_img} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
