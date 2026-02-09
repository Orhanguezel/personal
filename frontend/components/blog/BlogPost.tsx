// =============================================================
// FILE: frontend/components/blog/BlogPost.tsx
// FINAL — Dynamic BlogPost (DB) + client pagination
// - Removes blog.json
// - Uses RTK Query custom_pages list (module_key=blog)
// - Keeps existing card components + Pagination UI
// - Route: /[locale]/blog/[slug]
// =============================================================

'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useGetSiteSettingByKeyQuery, useListCustomPagesQuery } from '@/integrations/hooks';
import type { CustomPageView } from '@/integrations/shared';
import { normalizeUiBlogSettingValue } from '@/integrations/shared';

import BlogCard1 from './BlogCard1';
import BlogCard2 from './BlogCard2';
import BlogCard3 from './BlogCard3';
import Pagination from './Pagination';

type BlogPostProps = {
  style?: number;
  showItem?: number;
  showPagination?: boolean;
  locale?: string; // ✅ pass from page/layout (ex: useLocale())
};

const BLOG_MODULE_KEY = 'blog';

export default function BlogPost({
  style,
  showItem = 6,
  showPagination = true,
  locale = 'en',
}: BlogPostProps) {
  const { data: uiSetting } = useGetSiteSettingByKeyQuery({
    key: 'ui_blog',
    locale,
  });

  const ui = useMemo(
    () => normalizeUiBlogSettingValue(uiSetting?.value),
    [uiSetting?.value],
  );
  const copy = ui.post;

  const limit = Math.max(1, Number(showItem || 6));
  const [currentPage, setCurrentPage] = useState<number>(1);

  // pagination group size (UI)
  const paginationItem = 4;

  // ✅ fetch 1 extra to know "hasMore"
  const offset = (currentPage - 1) * limit;

  const list = useListCustomPagesQuery({
    module_key: BLOG_MODULE_KEY,
    is_published: 1,
    limit: limit + 1,
    offset,
    locale,
    // sort/order backend destekliyorsa:
    // sort: 'order_num',
    // orderDir: 'asc',
  } as any);

  // Normalize items + hasMore
  const items: CustomPageView[] = useMemo(() => {
    const arr = (list.data ?? []) as any[];
    // list endpoint FE normalize yapıyorsa zaten CustomPageView olur.
    // değilse bile card’lar minimal alanları kullanacak.
    return arr.slice(0, limit) as CustomPageView[];
  }, [list.data, limit]);

  const hasMore = useMemo(() => {
    const arr = (list.data ?? []) as any[];
    return arr.length > limit;
  }, [list.data, limit]);

  // ✅ We cannot know total pages without totalCount from backend.
  // So we keep a "page window" model:
  // - can go prev if currentPage>1
  // - can go next if hasMore
  // - showPaginationGroup renders a rolling group
  const pages = useMemo(() => {
    // minimum known page count is currentPage, plus 1 if hasMore
    return currentPage + (hasMore ? 1 : 0);
  }, [currentPage, hasMore]);

  const pagination = useMemo(() => {
    // produce pages array [1..pages] but cap to a reasonable number
    // (UI only; pages is dynamic anyway)
    const n = Math.max(1, pages);
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [pages]);

  const getPaginationGroup = useMemo(() => {
    const start = Math.floor((currentPage - 1) / paginationItem) * paginationItem;
    const end = start + paginationItem;
    return pagination.slice(start, end);
  }, [pagination, currentPage]);

  // If limit changes (showItem prop), reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  const next = () => {
    if (list.isFetching) return;
    if (!hasMore) return;
    setCurrentPage((p) => p + 1);
  };

  const prev = () => {
    if (list.isFetching) return;
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleActive = (page: number) => {
    if (list.isFetching) return;

    // allow clicking current or previous pages
    if (page < 1) return;
    // allow clicking next page only if hasMore OR page <= currentPage
    if (page > currentPage && !hasMore) return;

    setCurrentPage(page);
  };

  // Render
  if (list.isLoading) {
    return <h3>{copy.loading}</h3>;
  }

  if (list.isError) {
    return <h3>{copy.error}</h3>;
  }

  return (
    <>
      {items.length === 0 && <h3>{copy.empty}</h3>}

      {items.map((item) => (
        <React.Fragment key={(item as any).id || (item as any).slug}>
          {(!style || style === 1) && <BlogCard1 item={item} locale={locale} />}
          {style === 2 && <BlogCard2 item={item} locale={locale} />}
          {style === 3 && <BlogCard3 item={item} locale={locale} />}
        </React.Fragment>
      ))}

      {showPagination && (
        <Pagination
          getPaginationGroup={getPaginationGroup}
          currentPage={currentPage}
          pages={pages}
          next={next}
          prev={prev}
          handleActive={handleActive}
          // ✅ extra flags so arrows behave correctly
          canPrev={currentPage > 1}
          canNext={hasMore}
        />
      )}
    </>
  );
}
