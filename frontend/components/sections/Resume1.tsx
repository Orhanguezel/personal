'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { useGetResumeQuery, useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import type { ResumeMerged, ResumeListParams } from '@/integrations/shared';
import { safeLocale, splitResume, yearRange, normalizeUiResumeSettingValue } from '@/integrations/shared';

import { useActiveLocales } from '@/i18n';

type Props = { locale?: string };

export function scoreText(item: ResumeMerged) {
  if (!item.score_value) return null;
  const scale = item.score_scale || 5;
  return (
    <h3 className="text-linear-1 ms-auto fw-semibold">
      {item.score_value}
      <span className="fs-4 fw-bold">/{scale}</span>
    </h3>
  );
}

export default function Resume1({ locale }: Props) {
  const loc = safeLocale(locale);

  // ✅ DB-backed defaultLocale (fallback only)
  const { defaultLocale } = useActiveLocales();

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_resume',
    locale: loc,
  });

  const ui = useMemo(
    () => normalizeUiResumeSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.resume1;

  // ✅ Query params: locale + default_locale (DB’den)
  const params: ResumeListParams = useMemo(
    () => ({
      locale: loc,
      default_locale: defaultLocale,
      limit: 50,
      orderBy: 'display_order',
      order: 'asc',
      active: true,
    }),
    [loc, defaultLocale],
  );
  const { data, isLoading, isFetching, isError, error } = useGetResumeQuery(params as any, {
    refetchOnMountOrArgChange: true,
  });

  const { education, experience } = useMemo(() => splitResume(data), [data]);

  const edu = useMemo(() => education.filter((x) => !!x?.is_active), [education]);
  const exp = useMemo(() => experience.filter((x) => !!x?.is_active), [experience]);

  const busy = isLoading || isFetching;

  return (
    <section
      id="resume"
      className="section-resume-1 position-relative pt-150 overflow-hidden"
      data-background="/assets/imgs/projects/projects-1/background.png"
    >
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-7 me-auto">
            <h3 className="ds-3 mt-3 mb-3 text-primary-1">{copy.heading}</h3>
            <span
              className="fs-5 fw-medium text-200"
              dangerouslySetInnerHTML={{ __html: copy.intro_html }}
            />
          </div>

          <div className="col-lg-auto">
            <Link href="/#contact" className="btn btn-gradient mt-lg-0 mt-5 ms-lg-auto">
              {copy.cta_label}
              <i className="ri-arrow-right-up-line" />
            </Link>
          </div>
        </div>

        <div className="row mt-6">
          {/* ---------------- EDUCATION ---------------- */}
          <div className="col-lg-6 col-12">
            <div className="resume-card p-lg-6 p-4 mb-lg-0 mb-6">
              <div className="resume-card-header d-flex align-items-end">
                <img
                  className="border-linear-1 border-3 pb-2 pe-2"
                  src="/assets/imgs/resume/resume-1/icon-1.svg"
                  alt=""
                />
                <h3 className="fw-semibold mb-0 border-bottom border-600 border-3 pb-2 w-100">
                  {copy.education_label}
                </h3>
              </div>

              <div className="resume-card-body">
                {busy && (
                  <div className="resume-card-item px-4 py-3 mt-5">
                    <p className="text-300 mb-0">{copy.loading}</p>
                  </div>
                )}

                {isError && !busy && (
                  <div className="resume-card-item px-4 py-3 mt-5">
                    <p className="text-300 mb-0">{copy.error}</p>
                    {process.env.NODE_ENV !== 'production' && (
                      <p className="text-300 mb-0" style={{ opacity: 0.7 }}>
                        {String((error as any)?.status ?? '')}{' '}
                        {String(
                          (error as any)?.data?.error?.message ??
                            (error as any)?.data?.message ??
                            '',
                        )}
                      </p>
                    )}
                  </div>
                )}

                {!busy && !isError && edu.length === 0 && (
                  <div className="resume-card-item px-4 py-3 mt-5">
                    <p className="text-300 mb-0">{copy.empty_education}</p>
                  </div>
                )}

                {!busy &&
                  !isError &&
                  edu.map((item) => (
                    <div className="resume-card-item px-4 py-3 mt-5" key={item.id}>
                      <div className="d-flex align-items-end">
                        <div>
                          <p className="fw-extra-bold text-linear-1 mb-2">{yearRange(item)}</p>
                          <h5>{item.title}</h5>
                          <p className="text-300 mb-0">{item.subtitle}</p>
                        </div>
                        {scoreText(item)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* ---------------- EXPERIENCE ---------------- */}
          <div className="col-lg-6 col-12">
            <div className="resume-card p-lg-6 p-4 h-100">
              <div className="resume-card-header d-flex align-items-end">
                <img
                  className="border-linear-1 border-3 pb-2 pe-2"
                  src="/assets/imgs/resume/resume-1/icon-2.svg"
                  alt=""
                />
                <h3 className="fw-semibold mb-0 border-bottom border-600 border-3 pb-2 w-100">
                  {copy.experience_label}
                </h3>
              </div>

              <div className="resume-card-body">
                {busy && (
                  <div className="resume-card-item px-4 py-3 mt-5">
                    <p className="text-300 mb-0">{copy.loading}</p>
                  </div>
                )}

                {isError && !busy && (
                  <div className="resume-card-item px-4 py-3 mt-5">
                    <p className="text-300 mb-0">{copy.error}</p>
                  </div>
                )}

                {!busy && !isError && exp.length === 0 && (
                  <div className="resume-card-item px-4 py-3 mt-5">
                    <p className="text-300 mb-0">{copy.empty_experience}</p>
                  </div>
                )}

                {!busy &&
                  !isError &&
                  exp.map((item) => (
                    <div className="resume-card-item px-4 py-3 mt-5" key={item.id}>
                      <p className="fw-extra-bold text-linear-1 mb-2">{yearRange(item)}</p>
                      <h5>{item.title}</h5>
                      <p className="text-300 mb-0">{item.subtitle}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-move-right position-relative pb-160 pt-lg-150">
        <div className="d-flex align-items-center gap-5 wow img-custom-anim-top position-absolute top-50 start-50 translate-middle">
          <h3 className="stroke fs-150 text-uppercase text-white">
            {copy.marquee_text}
          </h3>
        </div>
      </div>
    </section>
  );
}
