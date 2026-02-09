// frontend/components/sections/Static1.tsx
'use client';

import { useMemo } from 'react';
import CountUp from 'react-countup';

import { useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import { normalizeUiStaticSettingValue, safeLocale } from '@/integrations/shared';

type Props = { locale?: string };

export default function Static1({ locale }: Props) {
  const loc = safeLocale(locale);

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_static',
    locale: loc,
  });

  const ui = useMemo(
    () => normalizeUiStaticSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );

  const items = ui.static1.items;

  return (
    <>
      <div className="section-static-1 position-relative overflow-hidden z-0 py-8 bg-900">
        <div className="container">
          <div className="inner">
            <div className="row align-items-center justify-content-between">
              {items.map((item, idx) => {
                const value = Number.isFinite(item.value) ? Number(item.value) : 0;
                const top = item.label_top || item.label || '';
                const bottom = item.label_bottom || '';
                const prefix = item.prefix || '';
                const suffix = item.suffix || '';

                return (
                  <div className="col-lg-auto col-md-6" key={`${item.label}-${idx}`}>
                    <div className="counter-item-cover counter-item">
                      <div className="content text-center mx-auto d-flex align-items-center">
                        <span className="ds-3 count text-primary-1 fw-medium my-0">
                          {prefix}
                          <CountUp
                            enableScrollSpy={true}
                            end={value}
                            className="odometer ds-1 text-dark fw-semibold"
                          />
                          {suffix}
                        </span>
                        <div className="text-start ms-2">
                          <p className="fs-5 mb-0 text-300">{top}</p>
                          <p className="fs-5 mb-0 fw-bold">{bottom}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
