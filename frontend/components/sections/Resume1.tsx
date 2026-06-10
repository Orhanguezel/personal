'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { useGetResumeQuery } from '@/integrations/hooks';
import type { ResumeGroupedResponse, ResumeMerged, ResumeListParams } from '@/integrations/shared';
import { safeLocale, splitResume, yearRange, normalizeUiResumeSettingValue, sanitizeHtml } from '@/integrations/shared';
import { useStaticSiteSetting } from '@/utils/staticSiteSettings';

import { useActiveLocales } from '@/i18n';

type Props = { locale?: string; initialData?: ResumeGroupedResponse | null };

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

export default function Resume1({ locale, initialData }: Props) {
  const loc = safeLocale(locale);

  // ✅ DB-backed defaultLocale (fallback only)
  const { defaultLocale } = useActiveLocales();

  const { data: uiSetting } = useStaticSiteSetting({
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
  const useRemoteData = initialData === undefined || initialData === null;
  const { data, isLoading, isFetching, isError } = useGetResumeQuery(params as any, {
    skip: !useRemoteData,
    refetchOnMountOrArgChange: true,
  });

  const resumeRaw = useRemoteData ? data : initialData;
  const { experience } = useMemo(() => splitResume(resumeRaw), [resumeRaw]);
  const exp = useMemo(() => experience.filter((x) => !!x?.is_active), [experience]);

  const busy = useRemoteData && (isLoading || isFetching);

  return (
    <section
      id="resume"
      className="section-resume-1 position-relative pt-150 overflow-hidden"
      style={{ backgroundImage: 'url(/assets/imgs/projects/projects-1/background.webp)' }}
    >
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-7 me-auto">
            <h2 className="ds-3 mt-3 mb-3 text-primary-1">{copy.heading}</h2>
            <span
              className="fs-5 fw-medium text-200"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(copy.intro_html) }}
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
          {/* ---------------- EXPERIENCE ---------------- */}
          <div className="col-12">
            <div className="resume-card p-lg-6 p-4 h-100">
              <div className="resume-card-header d-flex align-items-end">
                <img
                  className="border-linear-1 border-3 pb-2 pe-2"
                  src="/assets/imgs/resume/resume-1/icon-2.svg"
                  alt=""
                  width={45}
                  height={45}
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
                      <h4>{item.title}</h4>
                      <p className="text-300 mb-0">{item.subtitle}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-move-right position-relative pb-160 pt-lg-150">
        <div className="d-flex align-items-center gap-5 img-custom-anim-top position-absolute top-50 start-50 translate-middle">
          <h3 className="stroke fs-150 text-uppercase text-white">
            {copy.marquee_text}
          </h3>
        </div>
      </div>
    </section>
  );
}
