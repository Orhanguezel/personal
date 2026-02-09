// ===================================================================
// FILE: frontend/components/sections/Skills1.tsx
// FINAL — Skills1 (client) — DB-driven via RTK (skill counters)
// - Uses GET /skills (public) and renders ONLY counters (Skills1 layout)
// - Keeps existing styling/classes intact
// - NO default_locale logic (per request)
// ===================================================================

'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import CountUp from 'react-countup';

import { useGetSiteSettingByKeyQuery, useGetSkillsQuery } from '@/integrations/hooks';
import type { SkillCounterMerged, SkillListParams } from '@/integrations/shared';
import { safeLocale, splitSkillsCounters, normalizeUiSkillsSettingValue } from '@/integrations/shared';

type Props = { locale?: string };

export default function Skills1({ locale }: Props) {
  const loc = safeLocale(locale);

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_skills',
    locale: loc,
  });

  const ui = useMemo(
    () => normalizeUiSkillsSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.skills1;

  const params: SkillListParams = useMemo(
    () => ({
      locale: loc,
      active: true,
      limit: 200,
      offset: 0,
    }),
    [loc],
  );

  // ✅ ONLY block when locale missing
  const skip = !loc;

  const { data, isLoading, isFetching, isError, error } = useGetSkillsQuery(params as any, {
    skip,
  });

  const busy = isLoading || isFetching;

  const counters: SkillCounterMerged[] = useMemo(() => {
    const arr = splitSkillsCounters(data);
    return arr
      .filter((x) => !!x?.is_active)
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [data]);

  return (
    <>
      <section className="section-skills-1 position-relative section-padding bg-900">
        <div className="container">
          <div className="row">
            <div className="text-center mb-7">
              <h3 className="ds-3 mt-3 mb-3 text-primary-1">{copy.heading}</h3>
              <span
                className="fs-5 fw-medium text-200"
                dangerouslySetInnerHTML={{ __html: copy.intro_html }}
              />
            </div>

            <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center gap-3 mb-7 px-6">
              {/* Loading */}
              {busy && (
                <div className="skills">
                  <div className="skills-ratio text-center">
                    <p className="text-400 fw-medium text-uppercase mb-0">{copy.loading}</p>
                  </div>
                </div>
              )}

              {/* Error */}
              {isError && !busy && (
                <div className="skills">
                  <div className="skills-ratio text-center">
                    <p className="text-400 fw-medium text-uppercase mb-0">{copy.error}</p>
                    {process.env.NODE_ENV !== 'production' && (
                      <p className="text-400 fw-medium mb-0" style={{ opacity: 0.7 }}>
                        {String((error as any)?.status ?? '')}{' '}
                        {String(
                          (error as any)?.data?.error?.message ??
                            (error as any)?.data?.message ??
                            '',
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Empty */}
              {!busy && !isError && counters.length === 0 && (
                <div className="skills">
                  <div className="skills-ratio text-center">
                    <p className="text-400 fw-medium text-uppercase mb-0">{copy.empty}</p>
                  </div>
                </div>
              )}

              {/* Data */}
              {!busy &&
                !isError &&
                counters.map((item) => (
                  <div className="skills" key={item.id}>
                    <div className="skills-icon mb-5">
                      <img src={item.image_url || ''} alt={item.title || ''} />
                    </div>
                    <div className="skills-ratio text-center">
                      <h3 className="count fw-semibold my-0">
                        <CountUp
                          className="odometer fw-semibold"
                          enableScrollSpy={true}
                          end={Number.isFinite(item.percent as any) ? Number(item.percent) : 0}
                        />
                        %
                      </h3>
                      <p className="text-400 fw-medium text-uppercase">{item.title}</p>
                    </div>
                  </div>
                ))}
            </div>

            <div className="text-center">
              <p className="fs-5 text-200 mb-0">
                {copy.extra_intro}{' '}
              </p>
              <div className="d-flex justify-content-center gap-1">
                {copy.extra_items.map((item, idx) => (
                  <Link href="#" className="fs-5 fw-bold" key={`${item}-${idx}`}>
                    {item}
                    {idx < copy.extra_items.length - 1 ? ',' : ''}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
