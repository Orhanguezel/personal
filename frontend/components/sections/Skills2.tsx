// ===================================================================
// FILE: frontend/components/sections/Skills2.tsx
// FINAL — Skills2 (client) — DB-driven via RTK (skill logos marquee)
// - Uses GET /skills (public) and renders ONLY logos (Skills2 layout)
// - Keeps existing styling/classes intact
// - NO default_locale logic (per request)
// ===================================================================

'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

import { useGetSiteSettingByKeyQuery, useGetSkillsQuery } from '@/integrations/hooks';
import type { SkillLogoMerged, SkillListParams } from '@/integrations/shared';
import {
  safeLocale,
  splitSkillsLogosLeft,
  splitSkillsLogosRight,
  normalizeUiSkillsSettingValue,
} from '@/integrations/shared';

type Props = { locale?: string };

export default function Skills2({ locale }: Props) {
  const loc = safeLocale(locale);

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_skills',
    locale: loc,
  });

  const ui = useMemo(
    () => normalizeUiSkillsSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.skills2;

  const params: SkillListParams = useMemo(
    () => ({
      locale: loc,
      active: true,
      limit: 200,
      offset: 0,
    }),
    [loc],
  );

  const skip = !loc;

  const { data, isLoading, isFetching, isError, error } = useGetSkillsQuery(params as any, {
    skip,
  });

  const busy = isLoading || isFetching;

  const logosRight: SkillLogoMerged[] = useMemo(() => {
    const arr = splitSkillsLogosRight(data);
    return arr
      .filter((x) => !!x?.is_active)
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [data]);

  const logosLeft: SkillLogoMerged[] = useMemo(() => {
    const arr = splitSkillsLogosLeft(data);
    return arr
      .filter((x) => !!x?.is_active)
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [data]);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[Skills2]', {
      loc,
      skip,
      params,
      rightCount: logosRight.length,
      leftCount: logosLeft.length,
      data,
      error,
    });
  }

  return (
    <>
      <section id="skills" className="section-skills-2 pt-5">
        <div className="container">
          <div className="rounded-3 bg-3 border border-1 position-relative overflow-hidden">
            <div className="position-relative z-1 py-60">
              <div className="position-relative z-1">
                <div className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <svg
                      className="text-primary-2 me-2"
                      xmlns="http://www.w3.org/2000/svg"
                      width={5}
                      height={6}
                      viewBox="0 0 5 6"
                      fill="none"
                    >
                      <circle cx="2.5" cy={3} r="2.5" fill="#A8FF53" />
                    </svg>
                    <span className="text-linear-4 d-flex align-items-center">{copy.badge}</span>
                  </div>
                  <h3>{copy.heading}</h3>
                </div>

                <div className="container mt-8">
                  <div className="row">
                    {/* LEFT SIDE: marquee */}
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-10 col-md-9 mx-auto overflow-hidden">
                          {/* Carausel Scroll (RIGHT TRACK) */}
                          <Marquee
                            className="carouselTicker carouselTicker-right position-relative z-1"
                            direction="right"
                          >
                            <ul className="carouselTicker__list m-0">
                              {busy && (
                                <li className="carouselTicker__item mt-6">
                                  <span className="tool-tip">{copy.loading}</span>
                                </li>
                              )}

                              {isError && !busy && (
                                <li className="carouselTicker__item mt-6">
                                  <span className="tool-tip">{copy.error}</span>
                                  {process.env.NODE_ENV !== 'production' && (
                                    <span className="tool-tip" style={{ opacity: 0.7 }}>
                                      {String((error as any)?.status ?? '')}{' '}
                                      {String(
                                        (error as any)?.data?.error?.message ??
                                          (error as any)?.data?.message ??
                                          '',
                                      )}
                                    </span>
                                  )}
                                </li>
                              )}

                              {!busy &&
                                !isError &&
                                logosRight.map((item) => (
                                  <li className="carouselTicker__item mt-6" key={item.id}>
                                    <Link
                                      href="#"
                                      className="brand-logo icon_80 icon-shape rounded-3"
                                    >
                                      <img src={item.image_url || ''} alt={item.label || 'brand'} />
                                    </Link>
                                    <span className="tool-tip">{item.label}</span>
                                  </li>
                                ))}
                            </ul>
                          </Marquee>
                        </div>

                        <div className="col-lg-8 col-md-7 col-10 mx-auto overflow-hidden">
                          {/* Carausel Scroll (LEFT TRACK) */}
                          <Marquee className="carouselTicker carouselTicker-left position-relative z-1">
                            <ul className="carouselTicker__list m-0 ">
                              {busy && (
                                <li className="carouselTicker__item mt-6">
                                  <span className="tool-tip">{copy.loading}</span>
                                </li>
                              )}

                              {isError && !busy && (
                                <li className="carouselTicker__item mt-6">
                                  <span className="tool-tip">{copy.error}</span>
                                </li>
                              )}

                              {!busy &&
                                !isError &&
                                logosLeft.map((item) => (
                                  <li className="carouselTicker__item mt-6" key={item.id}>
                                    <Link
                                      href="#"
                                      className="brand-logo icon_80 icon-shape rounded-3"
                                    >
                                      <img src={item.image_url || ''} alt={item.label || 'brand'} />
                                    </Link>
                                    <span className="tool-tip">{item.label}</span>
                                  </li>
                                ))}
                            </ul>
                          </Marquee>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE: static list (same as template) */}
                    <div className="col-lg-6 border-start-md mt-lg-0 mt-5">
                      <div className="row">
                        <div className="col-md-10 mx-auto">
                          <div className="h-100 position-relative">
                            <ul className="ps-3 d-flex flex-column justify-content-between h-100 position-relative">
                              {copy.list_items.map((item, idx) => (
                                <li className="mb-3" key={`${item.label}-${idx}`}>
                                  <div className="d-flex flex-column flex-md-row gap-2">
                                    <p className="text-dark text-nowrap mb-0">{item.label}</p>
                                    <span className="text-300">{item.value}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorations (unchanged) */}
            <div className="position-absolute d-none d-md-block decorate">
              <div className="rotateme">
                <div className="circle-1-1" />
                <div className="circle-1-2 position-absolute top-50 start-50 translate-middle">
                  <svg
                    className="mb-5 position-absolute bottom-0 start-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={9}
                    viewBox="0 0 9 9"
                    fill="none"
                  >
                    <circle cx="4.5" cy="4.5" r="4.5" fill="#636366" />
                  </svg>
                </div>
                <div className="circle-1-3 position-absolute top-50 start-50 translate-middle ">
                  <svg
                    className="mb-3 position-absolute bottom-0 end-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={9}
                    height={9}
                    viewBox="0 0 9 9"
                    fill="none"
                  >
                    <circle cx="4.5" cy="4.5" r="4.5" fill="#636366" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
