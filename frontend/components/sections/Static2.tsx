'use client';

import { useMemo } from 'react';
import CountUp from 'react-countup';

import { useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import { normalizeUiStaticSettingValue, safeLocale } from '@/integrations/shared';

type Props = { locale?: string };

export default function Static2({ locale }: Props) {
  const loc = safeLocale(locale);

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_static',
    locale: loc,
  });

  const ui = useMemo(
    () => normalizeUiStaticSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );

  const items = ui.static2.items;

  return (
    <>
      <div className="section-static-1 z-0">
        <div className="container position-relative z-1">
          <div className="bg-3 py-60 border border-1 rounded-3 position-relative overflow-hidden">
            <div className="inner">
              <div className="row align-items-center justify-content-lg-around justify-content-center">
                {items.map((item, idx) => {
                  const value = Number.isFinite(item.value) ? Number(item.value) : 0;
                  const label =
                    item.label ||
                    [item.label_top, item.label_bottom].filter(Boolean).join(' ') ||
                    '';
                  const icon = item.icon || 'ri-shape-line';
                  const prefix = item.prefix || '';
                  const suffix = item.suffix || '';

                  return (
                    <div className="col-lg-auto col-md-6 text-center text-lg-start" key={`${label}-${idx}`}>
                      <div className="counter-item-cover counter-item">
                        <div className="content mx-auto">
                          <i className={`${icon} text-primary-2`} />
                          <h2 className="text-300 my-0 fs-50">
                            {prefix && <span className="fs-50 text-300 mb-0">{prefix}</span>}
                            <CountUp
                              className="odometer text-dark fw-medium"
                              enableScrollSpy={true}
                              end={value}
                            />
                            {suffix && <span className="fs-50 text-300 mb-0">{suffix}</span>}
                          </h2>
                          <p className="fs-6 mb-0 text-dark">{label}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              className="background position-absolute top-0 start-0 w-100 h-100 filter-invert"
              data-background={ui.static2.background_image}
            />
          </div>
        </div>
      </div>
    </>
  );
}
