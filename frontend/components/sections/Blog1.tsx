// =============================================================
// FILE: frontend/components/sections/Blog1.tsx
// FINAL — Dynamic "Recent blog" section (DB) — style preserved
// - Fetches 3 latest published posts from module_key='blog'
// - Locale-aware (tries locale -> fallback without locale)
// - Keeps existing markup/classes (blog-card, zoom-img, btn-gradient, etc.)
// =============================================================

'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { useGetSiteSettingByKeyQuery, useListCustomPagesQuery } from '@/integrations/hooks';
import type { CustomPageView } from '@/integrations/shared';
import { normalizeUiBlogSettingValue } from '@/integrations/shared';

const BLOG_MODULE_KEY = 'blog' as const;

function formatDateLabel(iso?: string | null) {
  if (!iso) return '—';
  // backend usually "YYYY-MM-DD..." => keep style similar
  return iso.slice(0, 10);
}

function pickCardImage(p: any, fallback: string) {
  return (
    p?.featured_image_effective_url ||
    p?.image_effective_url ||
    p?.featured_image ||
    p?.image_url ||
    p?.images_effective_urls?.[0] ||
    p?.images?.[0] ||
    fallback
  );
}

export default function Blog1({ locale = 'en' }: { locale?: string }) {
  const safeLocale = locale || 'en';

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_blog',
    locale: safeLocale,
  });

  const ui = useMemo(
    () => normalizeUiBlogSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );

  // 1) try localized list
  const listLocale = useListCustomPagesQuery({
    module_key: BLOG_MODULE_KEY,
    is_published: 1,
    limit: 3,
    offset: 0,
    locale: safeLocale,
    // sort/order backend destekliyorsa uncomment:
    // sort: 'order_num',
    // orderDir: 'asc',
  } as any);

  const localeLoaded = listLocale.isSuccess || listLocale.isError;
  const localeEmpty = (listLocale.data?.length ?? 0) === 0;

  // 2) fallback list without locale if localized is empty or error
  const listFallback = useListCustomPagesQuery(
    { module_key: BLOG_MODULE_KEY, is_published: 1, limit: 3, offset: 0 } as any,
    { skip: !localeLoaded || (!listLocale.isError && !localeEmpty) },
  );

  const isLoading = listLocale.isLoading || listFallback.isLoading;
  const isError =
    !listLocale.isLoading && listLocale.isError && !listFallback.isLoading && listFallback.isError;

  const posts: CustomPageView[] = useMemo(() => {
    const arr = (listLocale.data?.length ? listLocale.data : listFallback.data) || [];
    // guarantee max 3
    return (arr as any[]).slice(0, 3) as CustomPageView[];
  }, [listLocale.data, listFallback.data]);

  const blogListHref = `/${safeLocale}/blog`;

  return (
    <>
      <section className="section-blog-1 position-relative pt-120 pb-120">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7 me-auto">
              <h3 className="ds-3 mt-3 mb-3 text-primary-1">{ui.blog1.heading}</h3>
              <span className="fs-5 fw-medium text-200">{ui.blog1.intro}</span>
            </div>
            <div className="col-lg-auto">
              <Link href={blogListHref} className="btn btn-gradient mt-lg-0 mt-5 ms-lg-auto">
                {ui.blog1.cta_label}
                <i className="ri-arrow-right-up-line" />
              </Link>
            </div>
          </div>

          <div className="row mt-8">
            {isLoading && (
              <div className="col-12">
                <p className="text-300 fs-6 mb-0">{ui.blog1.loading}</p>
              </div>
            )}

            {!isLoading && isError && (
              <div className="col-12">
                <p className="text-300 fs-6 mb-0">{ui.blog1.error}</p>
              </div>
            )}

            {!isLoading && !isError && posts.length === 0 && (
              <div className="col-12">
                <p className="text-300 fs-6 mb-0">{ui.blog1.empty}</p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              posts.map((p, idx) => {
                const slug = (p as any)?.slug || (p as any)?.id;
                const href = `/${safeLocale}/blog/${encodeURIComponent(slug)}`;

                const imgFallback = `/assets/imgs/blog/blog-1/img-${(idx % 3) + 1}.png`;
                const img = pickCardImage(p as any, imgFallback);
                const cat = (p as any)?.category || ui.blog1.category_fallback;

                const title = (p as any)?.title || '';
                const desc = (p as any)?.excerpt || (p as any)?.summary || '';
                const dateIso = (p as any)?.created_at;
                const dateLabel = formatDateLabel(dateIso);

                return (
                  <div className="col-lg-4" key={(p as any)?.id || href}>
                    <div className="blog-card rounded-4 mb-lg-3 mb-md-5 mb-3">
                      <div className="blog-card__image position-relative">
                        <div className="zoom-img rounded-3 overflow-hidden">
                          <img className="w-100" src={img} alt={(p as any)?.alt || title || ''} />

                          <Link
                            className="position-absolute bottom-0 start-0 m-3 text-white-keep btn btn-gradient fw-medium rounded-3 px-3 py-2"
                            href={href}
                          >
                            {cat}
                          </Link>

                          <Link
                            href={href}
                            className="blog-card__link position-absolute top-50 start-50 translate-middle icon-md icon-shape bg-linear-1 rounded-circle"
                          >
                            <i className="ri-arrow-right-up-line text-dark" />
                          </Link>
                        </div>
                      </div>

                      <div className="blog-card__content position-relative text-center mt-4">
                        <span className="blog-card__date fs-7">
                          {dateLabel} • {ui.blog1.read_time}
                        </span>
                        <h5 className="blog-card__title">{title}</h5>
                        <p className="blog-card__description fs-6">{desc}</p>
                        <Link
                          href={href}
                          className="link-overlay position-absolute top-0 start-0 w-100 h-100"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
