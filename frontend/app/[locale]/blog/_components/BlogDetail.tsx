// =============================================================
// FILE: frontend/app/[locale]/blog/_components/BlogDetail.tsx
// FINAL — CLEAN + helpers-driven
// - Fix: DO NOT show {"html": ...} residue (handled in helpers)
// - Keep HTML tags + existing styling (old site look)
// - Detail: try locale -> 404 fallback without locale
// =============================================================

'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import {
  useLazyGetCustomPageByModuleSlugQuery,
  useGetSiteSettingByKeyQuery,
  useListCustomPagesQuery,
} from '@/integrations/hooks';
import type { CustomPageView } from '@/integrations/shared';
import { normalizeUiBlogSettingValue } from '@/integrations/shared';

import {
  BLOG_MODULE_KEY,
  formatIsoDate,
  pickCover,
  pickCardImage,
  isNotFoundError,
  extractHtmlFromPost,
  sanitizeBlogHtml,
} from '@/integrations/shared';

type Props = {
  locale: string;
  slug: string;
};

export default function BlogDetail({ locale, slug }: Props) {
  const safeLocale = locale || 'en';
  const safeSlug = (slug || '').toString();

  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_blog',
    locale: safeLocale,
  });

  const ui = useMemo(
    () => normalizeUiBlogSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.detail;

  const [triggerDetail] = useLazyGetCustomPageByModuleSlugQuery();
  const [post, setPost] = useState<CustomPageView | null>(null);

  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError404, setDetailError404] = useState(false);
  const [detailErrorOther, setDetailErrorOther] = useState(false);

  useEffect(() => {
    let alive = true;

    async function run() {
      if (!safeSlug) return;

      setDetailLoading(true);
      setDetailError404(false);
      setDetailErrorOther(false);
      setPost(null);

      try {
        const res = await triggerDetail(
          { module_key: BLOG_MODULE_KEY, slug: safeSlug, locale: safeLocale } as any,
          true,
        ).unwrap();

        if (!alive) return;
        setPost(res);
        setDetailLoading(false);
        return;
      } catch (e) {
        if (!alive) return;

        // locale 404 -> fallback without locale
        if (isNotFoundError(e)) {
          try {
            const res2 = await triggerDetail(
              { module_key: BLOG_MODULE_KEY, slug: safeSlug } as any,
              true,
            ).unwrap();

            if (!alive) return;
            setPost(res2);
            setDetailLoading(false);
            return;
          } catch (e2) {
            if (!alive) return;
            setPost(null);
            setDetailLoading(false);
            setDetailError404(isNotFoundError(e2));
            setDetailErrorOther(!isNotFoundError(e2));
            return;
          }
        }

        setPost(null);
        setDetailLoading(false);
        setDetailError404(false);
        setDetailErrorOther(true);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [safeSlug, safeLocale, triggerDetail]);

  // Related list
  const listLocale = useListCustomPagesQuery({
    module_key: BLOG_MODULE_KEY,
    is_published: 1,
    limit: 50,
    offset: 0,
    locale: safeLocale,
  } as any);

  const localeLoaded = listLocale.isSuccess || listLocale.isError;
  const localeEmpty = (listLocale.data?.length ?? 0) === 0;

  const listFallback = useListCustomPagesQuery(
    { module_key: BLOG_MODULE_KEY, is_published: 1, limit: 50, offset: 0 } as any,
    { skip: !localeLoaded || (!listLocale.isError && !localeEmpty) },
  );

  const allPosts = (listLocale.data?.length ? listLocale.data : listFallback.data) || [];
  const isLoadingList = listLocale.isLoading || listFallback.isLoading;

  const related = useMemo(() => {
    const list = (allPosts || []).filter(
      (p) => p.module_key === BLOG_MODULE_KEY && !!p.is_published,
    );
    const filtered = post ? list.filter((x) => x.slug !== post.slug) : list;
    return filtered.slice(0, 3);
  }, [allPosts, post]);

  // UI fields
  const title = post?.title || '';
  const category = post?.category || copy.category_fallback;
  const summary = post?.excerpt || post?.summary || '';

  const rawHtml = useMemo(() => extractHtmlFromPost(post), [post]);
  const html = useMemo(() => sanitizeBlogHtml(rawHtml), [rawHtml]);

  const authorName = (post as any)?.author?.full_name || '—';
  const dateStr = formatIsoDate((post as any)?.created_at);

  const { src: coverSrc, alt: coverAlt } = pickCover(post as any);
  const blogListHref = `/${safeLocale}/blog`;

  const showNotFound = !detailLoading && !post && detailError404;
  const showError = !detailLoading && !post && !detailError404 && detailErrorOther;

  return (
    <div>
      <section className="section-details pt-130 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-lg-auto mb-8">
              <div className="text-center">
                <Link
                  href={blogListHref}
                  className="btn btn-gradient d-inline-block text-uppercase"
                >
                  {category}
                </Link>

                {detailLoading && (
                  <>
                    <h3 className="ds-3 mt-3 mb-4 text-dark">{copy.loading_title}</h3>
                    <p className="text-300 fs-5 mb-0">{copy.loading_text}</p>
                  </>
                )}

                {showNotFound && (
                  <>
                    <h3 className="ds-3 mt-3 mb-4 text-dark">{copy.not_found_title}</h3>
                    <p className="text-300 fs-5 mb-0">
                      {copy.not_found_text_prefix} {safeSlug}
                    </p>
                  </>
                )}

                {showError && (
                  <>
                    <h3 className="ds-3 mt-3 mb-4 text-dark">{copy.error_title}</h3>
                    <p className="text-300 fs-5 mb-0">{copy.error_text}</p>
                  </>
                )}

                {!detailLoading && !showNotFound && !showError && (
                  <>
                    <h3 className="ds-3 mt-3 mb-4 text-dark">{title}</h3>
                    <p className="text-300 fs-5 mb-0">{summary}</p>
                  </>
                )}
              </div>
            </div>

            <img src={coverSrc} alt={coverAlt} loading="lazy" />

            <div className="col-lg-10 mx-lg-auto mt-8">
              <div className="row">
                <div className="col-lg-9">
                  {!detailLoading && !showNotFound && !showError && (
                    <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />
                  )}
                </div>

                <div className="col-lg-3 col-md-6 col-8">
                  <div className="border-linear-3 rounded-4 p-lg-6 p-md-4 p-3 mt-lg-0 mt-4">
                    <div className="d-flex align-items-center mb-3">
                      <i className="ri-time-line fs-6" />
                      <span className="ms-2 fs-6">{copy.read_time_label}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="ri-calendar-schedule-line fs-6" />
                      <span className="ms-2 fs-6">{dateStr}</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="ri-user-line fs-6" />
                      <span className="ms-2 fs-6">
                        {copy.by_label}{' '}
                        <Link className="fw-bold" href="#">
                          {authorName}
                        </Link>
                      </span>
                    </div>
                  </div>

                  <div className="border-linear-3 rounded-4 p-lg-6 p-md-4 p-3 mt-4">
                    <span className="text-uppercase fs-7">{copy.share_label}</span> <br />
                    <div className="d-flex gap-3 pt-3">
                      <Link href="#" className="text-decoration-none">
                        <i className="ri-facebook-circle-fill fs-18" />
                      </Link>
                      <Link href="#" className="text-decoration-none">
                        <i className="ri-twitter-x-fill fs-18" />
                      </Link>
                      <Link href="#" className="text-decoration-none">
                        <i className="ri-instagram-fill fs-5" />
                      </Link>
                      <Link href="#" className="text-decoration-none">
                        <i className="ri-pinterest-fill fs-5" />
                      </Link>
                      <Link href="#" className="text-decoration-none">
                        <i className="ri-google-fill fs-5" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /SIDEBAR */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-blog-list">
        <div className="container border-top pt-80 pb-80">
          <div className="row">
            <div className="d-md-flex align-items-center">
              <h1 className="text-300">{copy.related_title}</h1>
              <Link href={blogListHref} className="btn btn-gradient ms-auto">
                {copy.view_more_label}
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>

          <div className="row mt-8">
            {(isLoadingList ? [] : related).map((p, idx) => {
              const href = `/${safeLocale}/blog/${encodeURIComponent(p.slug)}`;
              const imgFallback = `/assets/imgs/blog/blog-1/img-${(idx % 3) + 1}.png`;
              const img = pickCardImage(p as any, imgFallback);
              const desc = p.excerpt || p.summary || '';
              const cat = p.category || copy.category_fallback;

              return (
                <div className="col-lg-4" key={p.id}>
                  <div className="blog-card rounded-4 mb-lg-3 mb-md-5 mb-3">
                    <div className="blog-card__image position-relative">
                      <div className="zoom-img rounded-3 overflow-hidden">
                        <img
                          className="w-100"
                          src={img}
                          alt={(p as any).alt || p.title || ''}
                          loading="lazy"
                        />
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
                        {formatIsoDate((p as any).created_at)} • {copy.read_time}
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

            {!isLoadingList && related.length === 0 && (
              <div className="col-12">
                <p className="text-300 fs-6 mb-0">{copy.related_empty}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
