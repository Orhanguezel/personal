'use client';

import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  useGetSiteSettingByKeyQuery,
  useListProjectsPublicQuery,
  useListServicesPublicQuery,
  useGetResumeQuery,
  useListCustomPagesQuery,
  useListReviewsPublicQuery,
} from '@/integrations/hooks';
import {
  normalizeUiHome3SettingValue,
  normalizeContactInfoSettingValue,
  normalizeContactSectionSettingValue,
  normalizeTestimonialsSectionSettingValue,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  contentToSummary,
  splitResume,
  yearRange,
  mapReviewToTestimonialCard,
  normalizeAssetPath,
  chunk,
  toTelHref,
  pickBlogImage,
  toMailHref,
  toSkypeHref,
} from '@/integrations/shared';

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 20,
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
};

const swiperOptions2 = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  slidesPerGroup: 1,
  centeredSlides: false,
  loop: true,
  autoplay: {
    delay: 4000,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};

export default function Home3Client() {
  const pathname = usePathname() || '/';
  const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname]);
  const localeForApi = useMemo(
    () => resolveLocaleForApi(pathname) || localeForLinks,
    [pathname, localeForLinks],
  );

  const { data: uiHome3Row } = useGetSiteSettingByKeyQuery({
    key: 'ui_home3',
    locale: localeForApi,
  } as any);
  const ui = useMemo(
    () => normalizeUiHome3SettingValue(uiHome3Row?.value),
    [uiHome3Row?.value],
  );

  const { data: contactInfoRow } = useGetSiteSettingByKeyQuery({
    key: 'contact_info',
    locale: localeForApi,
  } as any);
  const contactInfo = useMemo(
    () => normalizeContactInfoSettingValue(contactInfoRow?.value),
    [contactInfoRow?.value],
  );

  const { data: contactSectionRow } = useGetSiteSettingByKeyQuery({
    key: 'contact_section',
    locale: localeForApi,
  } as any);
  const contactSection = useMemo(
    () => normalizeContactSectionSettingValue(contactSectionRow?.value),
    [contactSectionRow?.value],
  );

  const { data: testimonialsRow } = useGetSiteSettingByKeyQuery({
    key: 'ui_testimonials',
    locale: localeForApi,
  } as any);
  const testimonialsUI = useMemo(
    () => normalizeTestimonialsSectionSettingValue(testimonialsRow?.value),
    [testimonialsRow?.value],
  );

  const {
    data: projectsData,
    isLoading: projectsLoading,
  } = useListProjectsPublicQuery({
    orderBy: 'display_order',
    orderDir: 'asc',
    view: 'card',
    limit: 6,
    locale: localeForApi,
  } as any);

  const projects = useMemo(
    () => (Array.isArray(projectsData) ? projectsData : []),
    [projectsData],
  );

  const typicalCards = useMemo(() => {
    const list = projects.slice(0, 3);
    return list.map((p, idx) => {
      const year =
        (p.complete_date || p.start_date || p.created_at || '').toString().slice(0, 4) || '—';
      const href = `/${localeForLinks}/work/${encodeURIComponent(p.slug)}`;
      const summary = p.summary || contentToSummary(p) || '';
      const imgFallback = `/assets/imgs/home-page-3/typical/img-${(idx % 3) + 1}.png`;
      const img = normalizeAssetPath(p.featured_image || imgFallback);
      const alt = p.featured_image_alt || p.title || 'project';

      return {
        id: p.id,
        year,
        href,
        title: p.title || '—',
        summary,
        img,
        alt,
      };
    });
  }, [projects, localeForLinks]);

  const { data: servicesRes, isLoading: servicesLoading } = useListServicesPublicQuery({
    locale: localeForApi,
    default_locale: localeForApi,
    limit: 4,
    offset: 0,
    order: 'display_order.asc',
  } as any);
  const services = servicesRes?.items ?? [];

  const { data: resumeData, isLoading: resumeLoading } = useGetResumeQuery({
    locale: localeForApi,
    orderBy: 'start_date',
    order: 'desc',
  } as any);

  const { education, experience } = useMemo(() => splitResume(resumeData), [resumeData]);
  const educationItems = education.slice(0, 3);
  const awardsItems = experience.slice(0, 3);

  const {
    data: blogPosts = [],
    isLoading: blogLoading,
  } = useListCustomPagesQuery({
    module_key: 'blog',
    is_published: 1,
    limit: 4,
    offset: 0,
    locale: localeForApi,
    sort: 'created_at',
    orderDir: 'desc',
  } as any);

  const blogList = useMemo(
    () => (blogPosts || []).filter((p) => p.module_key === 'blog' && p.is_published),
    [blogPosts],
  );
  const blogSlides = useMemo(() => chunk(blogList, 2), [blogList]);

  const reviewParams = useMemo(
    () => ({
      target_type: testimonialsUI.target_type,
      target_id: testimonialsUI.bucket,
      approved: 1,
      active: 1,
      limit: 8,
      orderBy: 'display_order',
      order: 'asc',
      ...(localeForApi ? { locale: localeForApi } : {}),
    }),
    [testimonialsUI.target_type, testimonialsUI.bucket, localeForApi],
  );

  const {
    data: reviews = [],
    isLoading: reviewsLoading,
  } = useListReviewsPublicQuery(reviewParams as any);

  const testimonialCards = useMemo(
    () => (reviews || []).map(mapReviewToTestimonialCard),
    [reviews],
  );

  const phone = contactInfo.phone || ui.contact.phone;
  const email = contactInfo.email || ui.contact.email;
  const skype = contactInfo.skype || ui.contact.skype;
  const address = contactInfo.address || ui.contact.address;

  const heroImage = normalizeAssetPath(ui.hero.hero_image);
  const signatureImage = normalizeAssetPath(ui.hero.signature_image);

  const cvHref = normalizeAssetPath(ui.hero.cv_href);

  const form = contactSection.form || {};

  return (
    <>
      <Layout headerStyle={3} footerStyle={3}>
        <section className="section-home-3 bg-1000 pb-130 pt-96 section-work">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-1">
                <div className="position-relative d-inline-block">
                  <img className="rounded-5" src={heroImage} alt={ui.hero.hero_image_alt} />
                  <img
                    className="position-absolute top-100 start-50 translate-middle pt-8 z-0"
                    src={signatureImage}
                    alt={ui.hero.signature_image_alt}
                  />
                </div>
                <div className="d-flex flex-column gap-2 mt-9 position-relative z-1">
                  {phone ? (
                    <Link href={toTelHref(phone)}>
                      <i className="ri-phone-fill text-primary-3 fs-7" />
                      <span className="text-300 fs-6 ms-2">{phone}</span>
                    </Link>
                  ) : null}
                  {email ? (
                    <Link href={toMailHref(email)}>
                      <i className="ri-mail-fill text-primary-3 fs-7" />
                      <span className="text-300 fs-6 ms-2">{email}</span>
                    </Link>
                  ) : null}
                  {skype ? (
                    <Link href={toSkypeHref(skype)}>
                      <i className="ri-skype-fill text-primary-3 fs-7" />
                      <span className="text-300 fs-6 ms-2">{skype}</span>
                    </Link>
                  ) : null}
                  {address ? (
                    <Link href={ui.contact.map_href || '#'} target="_blank">
                      <i className="ri-map-2-fill text-primary-3 fs-7" />
                      <span className="text-300 fs-6 ms-2">{address}</span>
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-7 pt-lg-0 pt-8">
                <div id="about" className="hero-3 pe-lg-5 border-bottom pb-7">
                  <span className="text-primary-3">{ui.hero.badge}</span>
                  <h2
                    className="text-300 my-3"
                    dangerouslySetInnerHTML={{ __html: ui.hero.title_html }}
                  />
                  <p className="mb-8">{ui.hero.description}</p>
                  <Link
                    href={cvHref || '/assets/resume.pdf'}
                    className="btn btn-secondary-3 me-2"
                    target="_blank"
                  >
                    {ui.hero.cv_label}
                    <i className="ri-download-line ms-2" />
                  </Link>
                  <Link
                    href={ui.hero.hire_href || '#contact'}
                    className="btn btn-outline-secondary-3 d-inline-flex align-items-center"
                  >
                    <span>{ui.hero.hire_label}</span>
                    <i className="ri-arrow-right-line ms-2" />
                  </Link>
                </div>

                <div className="typical pt-70">
                  <h3>{ui.typical.heading}</h3>
                  <div className="container px-0 pt-4">
                    <div className="row">
                      <div className="card-scroll">
                        <div className="cards">
                          {projectsLoading && typicalCards.length === 0 ? (
                            <div className="card-custom pt-0" data-index={0}>
                              <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3">
                                <div className="card__content px-md-4 px-3 pt-lg-0 pb-lg-8 pb-5">
                                  <p className="text-300 mb-0">Loading...</p>
                                </div>
                              </div>
                            </div>
                          ) : typicalCards.length ? (
                            typicalCards.map((c, idx) => (
                              <div className="card-custom pt-0" data-index={idx} key={c.id}>
                                <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3">
                                  <div className="card__image-container rounded-0 zoom-img position-relative">
                                    <img className="card__image" src={c.img} alt={c.alt} />
                                    <Link
                                      href={c.href}
                                      className="card-image-overlay position-absolute start-0 end-0 w-100 h-100"
                                    />
                                  </div>
                                  <div className="card__content px-md-4 px-3 pt-lg-0 pb-lg-8 pb-5">
                                    <div className="card__title mb-0 mb-lg-2">
                                      <p className="text-300 fs-5 mb-0">{c.year}</p>
                                      <Link href={c.href}>
                                        <p className="fs-3 text-dark">{c.title}</p>
                                      </Link>
                                    </div>
                                    <p className="text-300 mb-lg-auto mb-md-4 mb-3">{c.summary}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="card-custom pt-0" data-index={0}>
                              <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3">
                                <div className="card__content px-md-4 px-3 pt-lg-0 pb-lg-8 pb-5">
                                  <p className="text-300 mb-0">{ui.typical.empty}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="services" className="my-services pt-70">
                  <h3>{ui.services.heading}</h3>
                  {servicesLoading && services.length === 0 ? (
                    <div className="card-services mb-3 pt-4">
                      <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 d-flex">
                        <div className="card__content px-md-4 px-3">
                          <p className="text-300 mb-0">Loading...</p>
                        </div>
                      </div>
                    </div>
                  ) : services.length ? (
                    services.slice(0, 4).map((svc) => {
                      const href = svc.slug
                        ? `/${localeForLinks}/services/${encodeURIComponent(svc.slug)}`
                        : '#';
                      const summary =
                        svc.summary ||
                        (svc.content ? String(svc.content).replace(/<[^>]*>/g, '').trim() : '') ||
                        '—';

                      return (
                        <div className="card-services mb-3" key={svc.id}>
                          <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 d-flex">
                            <div className="d-block">
                              <div className="card__icon icon-shape icon-lg rounded-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                  <g clipPath="url(#clip0_184_1754)">
                                    <path
                                      className="fill-primary-3"
                                      d="M21.1875 7.03125V4.21875H16.8421C15.3434 4.21875 13.9009 4.61381 12.6297 5.36667C12.1617 2.33194 9.51408 0 6.32812 0H5.625V2.8125H2.8125V5.625H0V22.5938H7.15191C9.12042 22.5938 10.1521 23.9276 10.2556 24H13.7444C13.8499 23.9261 14.8715 22.5938 16.8481 22.5938H24V7.03125H21.1875ZM16.8421 5.625H19.7812V18.375H16.8421C15.3722 18.375 13.9563 18.7552 12.7031 19.48V7.00472C12.8124 6.9488 14.3378 5.625 16.8421 5.625ZM7.03125 1.45537C9.43927 1.7947 11.2969 3.85055 11.2969 6.32812V16.5239C10.2659 15.2518 8.75058 14.3825 7.03125 14.1945V1.45537ZM4.21875 4.21875H5.625V15.5625H6.32812C8.69639 15.5625 10.6826 17.2124 11.1779 19.4126C9.95433 18.7316 8.58145 18.375 7.15786 18.375H4.21875V4.21875ZM22.5938 21.1875H16.8481C15.478 21.1875 14.1843 21.6847 13.1731 22.5938H10.8269C9.81567 21.6847 8.52202 21.1875 7.15186 21.1875H1.40625V7.03125H2.8125V19.7812H7.15786C9.69675 19.7812 11.2132 21.1253 11.334 21.1875H12.666C12.7859 21.1258 14.3071 19.7812 16.8421 19.7812H21.1875V8.4375H22.5938V21.1875Z"
                                      fill="#FCC6E2"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </div>
                            <div className="card__content px-md-4 px-3">
                              <div className="card__title mb-0 mb-lg-2">
                                <Link href={href}>
                                  <p className="fs-4 text-dark">{svc.name ?? '—'}</p>
                                </Link>
                              </div>
                              <p className="text-300 mb-lg-auto mb-md-4 mb-3">{summary}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="card-services mb-3 pt-4">
                      <div className="card__inner rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 d-flex">
                        <div className="card__content px-md-4 px-3">
                          <p className="text-300 mb-0">{ui.services.empty}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div id="resume" className="education pt-70">
                  <div className="row">
                    <div className="col-6">
                      <h3>{ui.resume.education_heading}</h3>
                    </div>
                    <div className="col-6">
                      <h3 className="d-none d-md-block">{ui.resume.awards_heading}</h3>
                    </div>
                  </div>
                  <div className="row pt-4">
                    <div className="col-md-6 align-self-stretch h-100">
                      <div className="card-services rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3 h-100">
                        {resumeLoading && educationItems.length === 0 ? (
                          <p className="text-300 mb-0">Loading...</p>
                        ) : educationItems.length ? (
                          educationItems.map((edu, idx) => (
                            <div key={edu.id} className={idx > 0 ? 'mt-4' : ''}>
                              <div className="icon rounded-circle overflow-hidden d-inline-block">
                                <img
                                  src={`/assets/imgs/home-page-3/education/icon-${(idx % 3) + 1}.png`}
                                  alt="Education"
                                />
                              </div>
                              <p className="text-dark fs-5 mt-1 mb-2">{edu.title}</p>
                              <ul className="d-flex gap-4 ps-3 border-bottom pb-2 mb-4">
                                <li>
                                  <p>{yearRange(edu)}:</p>
                                </li>
                                <li>
                                  <p className="text-primary-3">
                                    {edu.organization || edu.subtitle || '—'}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          ))
                        ) : (
                          <p className="text-300 mb-0">{ui.resume.empty_education}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6 align-self-stretch mt-md-0 mt-5">
                      <h3 className="d-block d-md-none">{ui.resume.awards_heading}</h3>
                      <div className="card-award rounded-4 border border-secondary-3 bg-white p-lg-5 p-md-4 p-3 align-self-stretch h-100 overflow-hidden">
                        <div className="position-relative h-100 align-self-stretch align-items-center">
                          <ul className="list-style-1 d-flex ps-3 flex-column mb-0">
                            {resumeLoading && awardsItems.length === 0 ? (
                              <li className="position-relative z-1">
                                <p className="text-300 mb-0">Loading...</p>
                              </li>
                            ) : awardsItems.length ? (
                              awardsItems.map((exp) => (
                                <li className="position-relative z-1" key={exp.id}>
                                  <p className="fs-5 text-dark mb-2">{exp.title}</p>
                                  <ul className="list-style-2 d-flex gap-4 ps-3">
                                    <li>
                                      <p className="text-primary-3 mb-0">
                                        {exp.organization || exp.subtitle || '—'}
                                      </p>
                                    </li>
                                    <li>
                                      <p className="mb-2">{yearRange(exp)}</p>
                                    </li>
                                  </ul>
                                  <p className="mb-4">{exp.description || exp.highlights?.[0] || ''}</p>
                                </li>
                              ))
                            ) : (
                              <li className="position-relative z-1">
                                <p className="text-300 mb-0">{ui.resume.empty_awards}</p>
                              </li>
                            )}
                          </ul>
                          <div className="line-left position-absolute top-0 border-start h-md-100 z-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="blog" className="blog pt-70">
                  <h3>{ui.blog.heading}</h3>
                  <div className="position-relative pt-4">
                    {blogLoading && blogSlides.length === 0 ? (
                      <div className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3">
                        <p className="text-300 mb-0">Loading...</p>
                      </div>
                    ) : blogSlides.length ? (
                      <Swiper {...swiperOptions2} className="swiper slider-two pb-6 position-relative">
                        <div className="swiper-wrapper">
                          {blogSlides.map((pair, idx) => (
                            <SwiperSlide key={idx}>
                              {pair.map((post, i) => {
                                const href = `/${localeForLinks}/blog/${encodeURIComponent(post.slug)}`;
                                const imgFallback = `/assets/imgs/home-page-3/blog/img-${(i % 2) + 1}.png`;
                                const img = normalizeAssetPath(pickBlogImage(post, imgFallback));
                                const category = post.category || ui.blog.default_category;
                                const desc = post.excerpt || post.summary || post.content_text || '';

                                return (
                                  <div
                                    className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3 mb-3"
                                    key={post.id}
                                  >
                                    <p className="fs-18 text-primary-3">{category}</p>
                                    <div className="d-flex align-items-center gap-5">
                                      <div>
                                        <p className="fs-26 text-dark">{post.title}</p>
                                        <p className="mb-0">{desc}</p>
                                      </div>
                                      <div className="image-right">
                                        <img className="rounded-3 w-100 h-100" src={img} alt={post.title} />
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </SwiperSlide>
                          ))}
                        </div>
                      </Swiper>
                    ) : (
                      <div className="card-services rounded-4 border border-secondary-3 bg-white p-lg-4 p-md-4 p-3">
                        <p className="text-300 mb-0">{ui.blog.empty}</p>
                      </div>
                    )}
                    <div className="swiper-pagination" />
                  </div>
                </div>

                <div id="portfolio" className="testimonials pt-60 border-bottom pb-80">
                  <h3>{ui.testimonials.heading}</h3>
                  <div className="position-relative pt-4">
                    {reviewsLoading && testimonialCards.length === 0 ? (
                      <div className="testimonials-block pe-5">
                        <p className="text-300 mb-0">Loading...</p>
                      </div>
                    ) : testimonialCards.length ? (
                      <Swiper {...swiperOptions} className="swiper slider-one pb-3 position-relative">
                        <div className="swiper-wrapper">
                          {testimonialCards.map((t) => (
                            <SwiperSlide key={t.id}>
                              <div className="testimonials-block pe-5">
                                <img className="rounded-circle mb-2" src={t.avatar} alt={t.name} />
                                <p className="fs-5 text-dark">"{t.comment}"</p>
                                <div className="information ">
                                  <p className="fs-6 text-primary-3">
                                    {t.name}
                                    <span className="text-300">{t.meta}</span>
                                  </p>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </div>
                      </Swiper>
                    ) : (
                      <div className="testimonials-block pe-5">
                        <p className="text-300 mb-0">{ui.testimonials.empty}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div id="contact" className="contact pt-70">
                  <h3>{ui.contact.heading}</h3>
                  <div className="d-flex align-items-center gap-5 mt-4">
                    <div className="d-flex flex-column gap-2 position-relative z-1">
                      {phone ? (
                        <Link href={toTelHref(phone)}>
                          <i className="ri-phone-fill text-primary-3 h6 fw-medium" />
                          <span className="text-300 fs-6 ms-2">{phone}</span>
                        </Link>
                      ) : null}
                      {email ? (
                        <Link href={toMailHref(email)}>
                          <i className="ri-mail-fill text-primary-3 h6 fw-medium" />
                          <span className="text-300 fs-6 ms-2">{email}</span>
                        </Link>
                      ) : null}
                    </div>
                    <div className="d-flex flex-column gap-2 position-relative z-1">
                      {skype ? (
                        <Link href={toSkypeHref(skype)}>
                          <i className="ri-skype-fill text-primary-3 h6 fw-medium" />
                          <span className="text-300 fs-6 ms-2">{skype}</span>
                        </Link>
                      ) : null}
                      {address ? (
                        <Link href={ui.contact.map_href || '#'} target="_blank">
                          <i className="ri-map-2-fill text-primary-3 h6 fw-medium" />
                          <span className="text-300 fs-6 ms-2">{address}</span>
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="position-relative z-2 mt-4">
                    <h5 className="text-dark mb-3">{ui.contact.form_title}</h5>
                    <form action="#">
                      <div className="row g-3">
                        <div className="col-md-6 ">
                          <input
                            type="text"
                            className="form-control bg-3 border border-secondary-3 rounded-3"
                            id="name"
                            name="name"
                            placeholder={form.name_ph || 'Your name'}
                            aria-label="username"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control bg-3 border border-secondary-3 rounded-3"
                            id="phone"
                            name="phone"
                            placeholder={form.phone_ph || 'Phone'}
                            aria-label="phone"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control bg-3 border border-secondary-3 rounded-3"
                            id="email"
                            name="email"
                            placeholder={form.email_ph || 'Email'}
                            aria-label="email"
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control bg-3 border border-secondary-3 rounded-3"
                            id="subject"
                            name="subject"
                            placeholder={form.subject_ph || 'Subject'}
                            aria-label="subject"
                          />
                        </div>
                        <div className="col-12">
                          <textarea
                            className="form-control bg-3 border border-secondary-3 rounded-3"
                            id="message"
                            name="message"
                            placeholder={form.message_ph || 'Message'}
                            aria-label="With textarea"
                            defaultValue={''}
                          />
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-secondary-3 fw-medium">
                            {form.submit || 'Send Message'}
                            <i className="ri-arrow-right-up-line fw-medium" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
