// ===================================================================
// FILE: frontend/components/sections/Brands1.tsx
// FINAL — Brands1 (client) — DB-driven via RTK (brand logos marquee)
// - Uses GET /brands (public) and renders logos (Brands1 layout)
// - UI copy via site_settings.ui_brands
// ===================================================================

'use client';

import { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

import { useGetSiteSettingByKeyQuery, useGetBrandsQuery } from '@/integrations/hooks';
import type { BrandListParams, BrandLogoMerged } from '@/integrations/shared';
import {
  normalizeUiBrandsSettingValue,
  safeLocale,
  splitBrandLogosAll,
  splitBrandLogosLeft,
  splitBrandLogosRight,
} from '@/integrations/shared';

type Props = { locale?: string };

export default function Brands1({ locale }: Props) {
  const loc = safeLocale(locale);

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_brands',
    locale: loc,
  });

  const ui = useMemo(() => normalizeUiBrandsSettingValue(uiSetting?.value), [uiSetting?.value]);

  const params: BrandListParams = useMemo(() => {
    const track = ui.track === 'left' ? 'left' : ui.track === 'right' ? 'right' : undefined;
    return {
      locale: loc,
      active: true,
      limit: 200,
      offset: 0,
      ...(track ? { track } : {}),
    };
  }, [loc, ui.track]);

  const skip = !loc;

  const { data, isLoading, isFetching, isError, error } = useGetBrandsQuery(params as any, {
    skip,
  });

  const busy = isLoading || isFetching;

  const logos: BrandLogoMerged[] = useMemo(() => {
    const items =
      ui.track === 'all'
        ? splitBrandLogosAll(data)
        : ui.track === 'left'
          ? splitBrandLogosLeft(data)
          : splitBrandLogosRight(data);

    return items
      .filter((x) => !!x?.is_active && !!x?.image_url)
      .slice()
      .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  }, [data, ui.track]);

  const showEmpty = !busy && !isError && logos.length === 0;

  return (
    <>
      <section className="section-brands-1 section-padding">
        <div className="container">
          <div className="text-center">
            <h2>{ui.heading}</h2>
            <p className="text-300" dangerouslySetInnerHTML={{ __html: ui.intro_html }} />
          </div>
        </div>
        <div className="container-fluid">
          {/* Carausel Scroll */}
          <Marquee
            className="carouselTicker carouselTicker-right mt-5 position-relative z-1"
            direction="right"
          >
            <ul className="carouselTicker__list">
              {busy && (
                <li className="carouselTicker__item">
                  <span>{ui.loading}</span>
                </li>
              )}

              {!busy && isError && (
                <li className="carouselTicker__item">
                  <span>{ui.error}</span>
                  {process.env.NODE_ENV !== 'production' && (
                    <span style={{ opacity: 0.7, marginLeft: 8 }}>
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

              {showEmpty && (
                <li className="carouselTicker__item">
                  <span>{ui.empty}</span>
                </li>
              )}

              {!busy && !isError &&
                logos.map((item) => (
                  <li className="carouselTicker__item" key={item.id}>
                    <img src={item.image_url || ''} alt={item.label || 'brand'} />
                  </li>
                ))}
            </ul>
          </Marquee>
        </div>
      </section>
    </>
  );
}
