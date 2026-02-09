// =============================================================
// FILE: frontend/app/[locale]/blog/_components/BlogList.tsx
// FINAL — Blog list (client) — style preserved
// - RTK: useListCustomPagesQuery({ module_key:'blog', is_published:1, locale })
// - Links: /[locale]/blog/[slug]
// =============================================================

'use client';

import Link from 'next/link';
import { useMemo } from 'react';

import { useListCustomPagesQuery, useGetSiteSettingByKeyQuery } from '@/integrations/hooks';
import type { CustomPageView } from '@/integrations/shared';
import { normalizeUiBlogSettingValue } from '@/integrations/shared';

type Props = {
  locale: string;
};

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  return iso.slice(0, 10);
};

const pickCardImage = (p: CustomPageView, fallback: string) => {
  return (
    p.featured_image_effective_url ||
    p.image_effective_url ||
    p.featured_image ||
    p.image_url ||
    p.images_effective_urls?.[0] ||
    p.images?.[0] ||
    fallback
  );
};

export default function BlogList({ locale }: Props) {
  const safeLocale = locale || 'en';

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_blog',
    locale: safeLocale,
  });

  const ui = useMemo(
    () => normalizeUiBlogSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.list;

  const {
    data: posts = [],
    isLoading,
    isError,
  } = useListCustomPagesQuery({
    module_key: 'blog',
    is_published: 1,
    limit: 60,
    offset: 0,
    locale: safeLocale,
  });

  const list = useMemo(() => {
    return (posts || []).filter((p) => p.module_key === 'blog' && p.is_published);
  }, [posts]);

  return (
    <>
      <div>
        <section className="section-blog-list pt-150">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-lg-auto mb-lg-0">
                <div className="text-center">
                  <Link href="#" className="btn btn-gradient d-inline-block text-uppercase">
                    {copy.badge}
                  </Link>
                  <h3
                    className="ds-3 mt-3 mb-4 text-300"
                    dangerouslySetInnerHTML={{ __html: copy.title_html }}
                  />
                  <p
                    className="text-300 fs-5 mb-0"
                    dangerouslySetInnerHTML={{ __html: copy.intro_html }}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-8">
              {isLoading && (
                <div className="col-12">
                  <p className="text-300 fs-6 mb-0">{copy.loading}</p>
                </div>
              )}

              {!isLoading && isError && (
                <div className="col-12">
                  <p className="text-300 fs-6 mb-0">{copy.error}</p>
                </div>
              )}

              {!isLoading &&
                !isError &&
                list.map((p, idx) => {
                  const href = `/${safeLocale}/blog/${encodeURIComponent(p.slug)}`;
                  const imgFallback = `/assets/imgs/blog/blog-1/img-${(idx % 9) + 1}.png`;
                  const img = pickCardImage(p, imgFallback);

                  const cat = p.category || copy.default_category;
                  const desc = p.excerpt || p.summary || '';

                  return (
                    <div className="col-lg-4" key={p.id}>
                      <div className="blog-card rounded-4 mb-lg-3 mb-md-5 mb-3">
                        <div className="blog-card__image position-relative">
                          <div className="zoom-img rounded-3 overflow-hidden">
                            <img className="w-100" src={img} alt={p.alt || p.title || ''} />

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
                            {formatDate(p.created_at)} • {copy.read_time}
                          </span>
                          <h5 className="blog-card__title">{p.title}</h5>
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
            {!isLoading && !isError && list.length === 0 && (
              <div className="col-12">
                <p className="text-300 fs-6 mb-0">{copy.empty}</p>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* Pagination UI (şimdilik statik — backend pagination bağlanınca dinamik yapılır) */}
        <div className="container">
          <div className="row py-120">
            <div className="d-flex justify-content-center align-items-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination gap-2">
                  <li className="page-item">
                    <Link
                      className="icon-xl fs-5 page-link pagination_item border-0 rounded-circle icon-shape fw-bold bg-600"
                      href="#"
                      aria-label="Previous"
                    >
                      <i className="ri-arrow-left-line" />
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="icon-xl fs-5 page-link pagination_item border-0 rounded-circle icon-shape fw-bold bg-600"
                      href="#"
                    >
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="icon-xl fs-5 page-link pagination_item border-0 rounded-circle icon-shape fw-bold bg-600"
                      href="#"
                    >
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="icon-xl fs-5 page-link pagination_item border-0 rounded-circle icon-shape fw-bold bg-600"
                      href="#"
                    >
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link
                      className="icon-xl fs-5 page-link pagination_item border-0 rounded-circle icon-shape fw-bold bg-600"
                      href="#"
                      aria-label="Next"
                    >
                      <i className="ri-arrow-right-line" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
