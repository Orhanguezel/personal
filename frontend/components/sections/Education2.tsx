'use client';

import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { useGetResumeQuery, useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import type { ResumeListParams } from '@/integrations/shared';
import { safeLocale, splitResume, yearRange, normalizeUiResumeSettingValue } from '@/integrations/shared';
import { useActiveLocales } from '@/i18n';

type Props = { locale?: string };

export default function Education2({ locale }: Props) {
  const loc = safeLocale(locale);

  const { defaultLocale, isLoading: localesLoading } = useActiveLocales();

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_resume',
    locale: loc,
  });

  const ui = useMemo(
    () => normalizeUiResumeSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.education2;

  const params: ResumeListParams = useMemo(
    () => ({
      locale: loc,
      limit: 50,
      orderBy: 'display_order',
      order: 'asc',
      active: true,
      type: 'education',
    }),
    [loc, defaultLocale],
  );

  const arg = !loc || localesLoading || !defaultLocale ? skipToken : (params as any);

  const { data, isLoading, isFetching, isError } = useGetResumeQuery(arg, {
    refetchOnMountOrArgChange: true,
  });

  const busy = localesLoading || isLoading || isFetching;

  // backend grouped döndürse de, type=education olduğunda array döndürmesi olası.
  // splitResume bunu tolere eder ama biz sadece education alacağız.
  const { education } = useMemo(() => splitResume(data), [data]);

  const edu = useMemo(() => (education || []).filter((x) => !!x?.is_active), [education]);

  return (
    <>
      <section id="resume" className="section-education">
        <div className="container">
          <div className="row">
            {/* ---------------- LEFT: EDUCATION (DB) ---------------- */}
            <div className="col-lg-6 pt-3">
              <div className="rounded-3 border border-1 position-relative h-100 overflow-hidden">
                <div className="box-linear-animation p-md-6 p-3 ">
                  <div className="d-flex align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={28}
                      viewBox="0 0 24 28"
                      fill="none"
                    >
                      <path
                        className="fill-primary-2"
                        d="M0 22.667V4.66699C0 2.45786 1.79087 0.666992 4 0.666992H22.6667C23.4031 0.666992 24 1.26395 24 2.00033V26.0003C24 26.7367 23.4031 27.3337 22.6667 27.3337H4.66667C2.08933 27.3337 0 25.2443 0 22.667ZM21.3333 24.667V20.667H4.66667C3.56209 20.667 2.66667 21.5625 2.66667 22.667C2.66667 23.7715 3.56209 24.667 4.66667 24.667H21.3333ZM9.33333 3.33366H4C3.26363 3.33366 2.66667 3.93062 2.66667 4.66699V18.4494C3.27284 18.1614 3.95093 18.0003 4.66667 18.0003H21.3333V3.33366H18.6667V14.0003L14 11.3337L9.33333 14.0003V3.33366Z"
                        fill="#62A92B"
                      />
                    </svg>
                    <h2 className="mb-0 ms-2">{copy.heading}</h2>
                  </div>

                  <div className="d-flex flex-column h-100 position-relative mt-5">
                    <ul className="ps-3">
                      {busy && (
                        <li className="position-relative z-1 mb-3">
                          <div className="d-flex gap-2">
                            <p className="text-300 text-nowrap fw-regular mb-0">—</p>
                            <div>
                              <span className="text-primary-2">{copy.loading_label}</span>
                              <p className="text-dark mb-0">{copy.loading_text}</p>
                            </div>
                          </div>
                        </li>
                      )}

                      {isError && !busy && (
                        <li className="position-relative z-1 mb-3">
                          <div className="d-flex gap-2">
                            <p className="text-300 text-nowrap fw-regular mb-0">—</p>
                            <div>
                              <span className="text-primary-2">{copy.error_label}</span>
                              <p className="text-dark mb-0">{copy.error_text}</p>
                            </div>
                          </div>
                        </li>
                      )}

                      {!busy && !isError && edu.length === 0 && (
                        <li className="position-relative z-1 mb-3">
                          <div className="d-flex gap-2">
                            <p className="text-300 text-nowrap fw-regular mb-0">—</p>
                            <div>
                              <span className="text-primary-2">{copy.empty_label}</span>
                              <p className="text-dark mb-0">{copy.empty_text}</p>
                            </div>
                          </div>
                        </li>
                      )}

                      {!busy &&
                        !isError &&
                        edu.map((item) => (
                          <li className="position-relative z-1 mb-3" key={item.id}>
                            <div className="d-flex gap-2">
                              <p className="text-300 text-nowrap fw-regular mb-0">
                                {yearRange(item)}:
                              </p>
                              <div>
                                <span className="text-primary-2">
                                  {item.organization || item.subtitle || ''}
                                </span>
                                <p className="text-dark">{item.title}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>

                    <div className="line-left position-absolute top-0 border-start z-0" />
                  </div>

                  <div className="bg-overlay position-absolute bottom-0 start-0 z-1" />
                </div>
              </div>
            </div>

            {/* ---------------- RIGHT: RESEARCHED (unchanged static) ---------------- */}
            <div className="col-lg-6 pt-3">
              <div className="bg-3 rounded-3 border border-1 p-md-6 p-3 position-relative h-100 overflow-hidden">
                <div className="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      className="fill-primary-2"
                      d="M20 4H28V10.6667H25.3333V6.66667H20V4ZM12 4V6.66667H6.66667V10.6667H4V4H12ZM20 28V25.3333H25.3333V21.3333H28V28H20ZM12 28H4V21.3333H6.66667V25.3333H12V28ZM4 14.6667H28V17.3333H4V14.6667Z"
                      fill="#A8FF53"
                    />
                  </svg>
                  <h2 className="mb-0 ms-2">{copy.research_heading}</h2>
                </div>

                <div className="d-flex flex-column h-100 position-relative mt-5">
                  <ul className="ps-3">
                    {copy.research_items.map((item, idx) => (
                      <li className="position-relative z-1 mb-3" key={`${item.year}-${idx}`}>
                        <div className="d-flex gap-2">
                          <p className="text-300 text-nowrap fw-regular mb-0">{item.year}</p>
                          <div>
                            <span className="text-primary-2">{item.title}</span>
                            <p className="text-dark">{item.description}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="line-left position-absolute top-0 border-start z-0" />
                </div>

                <div className="bg-overlay position-absolute bottom-0 start-0 z-1" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
