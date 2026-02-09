// =============================================================
// FILE: frontend/components/sections/services/Service1.tsx
// FINAL — Service1 (client, single file)
// - Hover image fix + tek dosya
// - Stil/markup korunur
// =============================================================

'use client';

import Link from 'next/link';
import { useEffect, useMemo } from 'react';

import { useGetSiteSettingByKeyQuery, useListServicesPublicQuery } from '@/integrations/hooks';
import { safeParseServiceContent, normalizeUiServicesSettingValue } from '@/integrations/shared';

type CardVM = {
  key: string;
  href: string;
  numberText: string;
  title: string;
  text: string;
  img: string; // hover script için data-img
};

function pad2(n: number) {
  const s = String(n);
  return s.length >= 2 ? s : `0${s}`;
}

function stripHtml(input: unknown) {
  const raw = String(input ?? '');
  return raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * IMPORTANT:
 * - Seeder görselleri: "/assets/imgs/services-list/img-1.png"
 * - Hover data-img absolute olmalı (locale path’e takılmasın)
 */
function normalizeHoverImgUrl(raw: string | null | undefined, fallbackIdx: number) {
  // DB seed fallback (services-list)
  const fallback = `/assets/imgs/services-list/img-${(fallbackIdx % 4) + 1}.png`;

  const s0 = String(raw ?? '').trim();
  if (!s0) return fallback;

  // absolute url -> aynen
  if (/^https?:\/\//i.test(s0)) return s0;

  // "/assets/.." -> aynen, "assets/.." -> "/assets/.."
  if (s0.startsWith('/assets/')) return s0;
  if (s0.startsWith('assets/')) return `/${s0}`;

  // uploads/.. veya /uploads/.. -> absolute (varsa)
  const apiBase = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || '';
  if (s0.startsWith('/uploads/') || s0.startsWith('uploads/')) {
    if (!apiBase) return s0.startsWith('/') ? s0 : `/${s0}`;
    const path = s0.startsWith('/') ? s0 : `/${s0}`;
    return `${apiBase}${path}`;
  }

  // diğer relative pathler
  if (s0.startsWith('/')) {
    if (!apiBase) return s0;
    return `${apiBase}${s0}`;
  }

  if (!apiBase) return `/${s0.replace(/^\/+/, '')}`;
  return `${apiBase}/${s0}`;
}

export default function Service1({ locale }: { locale: string }) {
  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_services',
    locale,
  });

  const ui = useMemo(
    () => normalizeUiServicesSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );

  const { data, isLoading, isFetching, isError } = useListServicesPublicQuery({
    locale,
    default_locale: locale,
    limit: 4,
    offset: 0,
    order: 'display_order.asc',
  });

  const items = data?.items ?? [];
  const showBusy = isLoading || isFetching;

  const cards: CardVM[] = useMemo(() => {
    // Placeholder 4 kart (stil bozulmasın)
    if (showBusy && items.length === 0) {
      return Array.from({ length: 4 }).map((_, idx) => ({
        key: `svc-${idx}`,
        href: '#',
        numberText: `${pad2(idx + 1)}.`,
        title: ui.section1.loading_title,
        text: ui.section1.loading_text,
        img: normalizeHoverImgUrl(`/assets/imgs/services-list/img-${(idx % 4) + 1}.png`, idx),
      }));
    }

    // LIMIT: 4
    return items.slice(0, 4).map((svc, idx) => {
      const slug = (svc as any).slug as string | null;

      const parsed = safeParseServiceContent((svc as any).content);
      const fallbackText =
        (svc as any).summary || parsed?.tagline || stripHtml((svc as any).content) || '';

      const text = fallbackText && fallbackText.length > 0 ? fallbackText : '—';
      const href = slug ? `/${locale}/services/${encodeURIComponent(slug)}` : '#';

      // DB seed: image_url + featured_image => "/assets/imgs/services-list/img-x.png"
      // Backend resolved varsa cover_url öncelik
      const rawImg =
        (svc as any).cover_url || (svc as any).image_url || (svc as any).featured_image;

      return {
        key: `svc-${idx}`,
        href,
        numberText: `${pad2(idx + 1)}.`,
        title: ((svc as any).name as string | null) ?? ui.section1.card_fallback_title,
        text,
        img: normalizeHoverImgUrl(rawImg, idx),
      };
    });
  }, [items, locale, showBusy, ui]);

  // Hover wrapper background'larını data-img'e senkronla (data load sonrası)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const t = window.setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('.tg-img-reveal-item[data-fx="1"]');
      els.forEach((el) => {
        const imgEl = el.querySelector<HTMLElement>('.tg-img-reveal-wrapper__img');
        if (!imgEl) return;
        const dataImg = el.dataset.img || '';
        imgEl.style.backgroundImage = dataImg ? `url(${dataImg})` : '';
      });
    }, 0);

    return () => window.clearTimeout(t);
  }, [cards]);

  return (
    <>
      <section className="section-service-1 pt-120 pb-120">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7 me-auto">
              <h3 className="ds-3 mt-3 mb-3 text-primary-1">{ui.section1.heading}</h3>
              <span
                className="fs-5 fw-medium text-200"
                dangerouslySetInnerHTML={{ __html: ui.section1.intro_html }}
              />

              {isError ? (
                <div className="mt-3">
                  <span className="fs-6 text-300">{ui.section1.error}</span>
                </div>
              ) : null}
            </div>

            <div className="col-lg-auto">
              <Link
                href={`/${locale}/#contact`}
                className="btn btn-gradient mt-lg-0 mt-5 ms-lg-auto"
              >
                {ui.section1.cta_label}
                <i className="ri-arrow-right-up-line" />
              </Link>
            </div>
          </div>

          <div className="row mt-6 justify-content-between">
            {cards.map((c, idx) => {
              const isLast = idx === cards.length - 1;

              return (
                <div key={c.key} className="col-12">
                  <div
                    className={[
                      'single-service-card-1',
                      'tg-img-reveal-item',
                      'w-100',
                      'border-top',
                      'border-900',
                      'p-3',
                      isLast ? 'border-bottom' : '',
                    ].join(' ')}
                    data-fx={1}
                    data-img={c.img}
                  >
                    <div className="service-card-details d-lg-flex align-items-center">
                      <h3 className="service-card-title w-lg-50 w-100 mb-0">
                        <Link href={c.href}>
                          <span className="service-number">{c.numberText}</span>
                          {c.title}
                        </Link>
                      </h3>

                      <Link
                        href={c.href}
                        className="d-md-flex d-block ps-lg-10 align-items-center justify-content-end w-100"
                      >
                        <p className="service-card-text my-3">{c.text}</p>
                        <div className="service-card-icon icon-shape ms-auto icon-md rounded-circle border">
                          <i className="ri-arrow-right-up-line" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {!showBusy && !isError && cards.length === 0 ? (
              <div className="col-12">
                <div className="mt-3">
                  <span className="fs-6 text-300">{ui.section1.empty}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
