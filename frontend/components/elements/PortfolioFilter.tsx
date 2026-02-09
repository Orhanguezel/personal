// ---------------------------------------------------------------------
// FILE: frontend/components/elements/PortfolioFilter.tsx
// FINAL — Dynamic Portfolio Filter (Isotope) + RTK Projects
// - API: useListProjectsPublicQuery (published)
// - Dynamic category buttons (from data) + "All Projects"
// - Locale-aware href: /{locale}/work/{slug}
// - Stable Isotope init AFTER items render, and re-layout on images load
// - Category -> css class slugify (safe), supports multiple words, /, &, etc.
// - SSR-safe: Isotope loaded dynamically on client-side only
// ---------------------------------------------------------------------

'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useListProjectsPublicQuery } from '@/integrations/hooks';
import type { Project } from '@/integrations/shared';
import { localeFromPathname, slugifyClass } from '@/integrations/shared';

// Dynamic import type for Isotope
type IsotopeType = any;

export default function PortfolioFilter() {
  const isotope = useRef<IsotopeType | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [filterKey, setFilterKey] = useState<string>('*');
  const [isotopeReady, setIsotopeReady] = useState(false);
  const [IsotopeConstructor, setIsotopeConstructor] = useState<any>(null);

  // data
  const { data, isLoading, isFetching } = useListProjectsPublicQuery({
    orderBy: 'display_order',
    orderDir: 'asc',
    view: 'card',
    limit: 200,
  });

  const items = useMemo(() => (Array.isArray(data) ? (data as Project[]) : []), [data]);

  // locale (App Router): window.location.pathname safe client-side
  const locale = useMemo(() => {
    if (typeof window === 'undefined') return 'de';
    return localeFromPathname(window.location.pathname);
  }, []);

  // dynamic categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of items) {
      if (p?.category && String(p.category).trim()) set.add(String(p.category).trim());
    }
    return Array.from(set);
  }, [items]);

  const handleFilterKeyChange = useCallback(
    (key: string) => () => {
      setFilterKey(key);
    },
    [],
  );

  const activeBtn = (value: string) =>
    value === filterKey
      ? 'active btn btn-md btn-filter mb-2 me-2 text-uppercase'
      : 'btn btn-md btn-filter mb-2 me-2 text-uppercase';

  // --- Load Isotope dynamically (client-side only) ---
  useEffect(() => {
    if (typeof window === 'undefined') return;

    import('isotope-layout').then((module) => {
      setIsotopeConstructor(() => module.default);
    });
  }, []);

  // --- Isotope init (only when items exist in DOM and Isotope loaded) ---
  useEffect(() => {
    if (!IsotopeConstructor) return;

    // destroy previous instance if data changes hard
    if (isotope.current) {
      isotope.current.destroy();
      isotope.current = null;
      setIsotopeReady(false);
    }

    if (!gridRef.current) return;
    if (!items.length) return;

    // next tick: ensure DOM painted
    const t = window.setTimeout(() => {
      isotope.current = new IsotopeConstructor(gridRef.current as any, {
        itemSelector: '.filter-item',
        percentPosition: true,
        masonry: { columnWidth: '.filter-item' },
      });

      setIsotopeReady(true);

      // image load relayout (no extra dependency)
      const imgs = Array.from(gridRef.current!.querySelectorAll('img'));
      let left = imgs.length;

      if (!left) {
        isotope.current?.layout();
        return;
      }

      const onDone = () => {
        left -= 1;
        if (left <= 0) isotope.current?.layout();
      };

      imgs.forEach((img) => {
        const el = img as HTMLImageElement;
        if (el.complete) return onDone();
        el.addEventListener('load', onDone, { once: true });
        el.addEventListener('error', onDone, { once: true });
      });
    }, 0);

    return () => window.clearTimeout(t);
  }, [items, IsotopeConstructor]);

  // --- Apply filter ---
  useEffect(() => {
    if (!isotope.current || !isotopeReady) return;
    isotope.current.arrange({ filter: filterKey === '*' ? '*' : `.${filterKey}` });
  }, [filterKey, isotopeReady]);

  // if you want: auto-reset filter if current filter has no items
  useEffect(() => {
    if (filterKey === '*') return;
    const has = items.some((p) => slugifyClass(p.category) === filterKey);
    if (!has) setFilterKey('*');
  }, [items, filterKey]);

  return (
    <div className="container">
      <div className="text-start">
        <div className="button-group filter-button-group filter-menu-active">
          <button className={activeBtn('*')} onClick={handleFilterKeyChange('*')}>
            All Projects
          </button>

          {categories.map((cat) => {
            const k = slugifyClass(cat);
            return (
              <button key={k} className={activeBtn(k)} onClick={handleFilterKeyChange(k)}>
                {cat}
              </button>
            );
          })}
        </div>

        {isFetching ? (
          <div className="mt-2">
            <span className="text-300 fs-7">Updating...</span>
          </div>
        ) : null}
      </div>

      <div ref={gridRef} className="row masonry-active justify-content-between mt-6">
        <div className="grid-sizer" />

        {isLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="filter-item col-lg-6 col-12">
                <div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
                  <div
                    className="rounded-3 w-100"
                    style={{ height: 260, background: 'rgba(0,0,0,0.06)' }}
                  />
                  <div className="d-flex align-items-center mt-4">
                    <div className="project-card-content">
                      <h3 className="fw-semibold">Loading...</h3>
                      <p className="mb-0">...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : items.length ? (
          items.map((p) => {
            const catClass = slugifyClass(p.category);
            const href = `/${locale}/work/${p.slug}`;
            const img = p.featured_image ?? '/assets/imgs/work/img-1.png';
            const alt = p.featured_image_alt ?? p.title ?? '';

            // Optional: if you want multi-tag filter (services -> extra classes)
            // const svcClasses = parseStringArray(p.services).map(slugifyClass).join(' ');
            // const classes = `${catClass} ${svcClasses}`.trim();
            const classes = catClass;

            return (
              <div key={p.id} className={`filter-item col-lg-6 col-12 ${classes}`}>
                <div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
                  <Link href={href}>
                    <img className="rounded-3 w-100 zoom-img" src={img} alt={alt} />
                  </Link>

                  <div className="d-flex align-items-center mt-4">
                    <Link href={href} className="project-card-content">
                      <h3 className="fw-semibold">{p.title}</h3>
                      <p className="mb-0">{p.client_name ?? ''}</p>
                    </Link>

                    <Link
                      href={href}
                      className="project-card-icon icon-shape ms-auto icon-md rounded-circle"
                    >
                      <i className="ri-arrow-right-up-line" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="project-item rounded-4 overflow-hidden position-relative p-md-4 p-3 bg-white">
              <h3 className="fw-semibold mb-2">No projects found</h3>
              <p className="mb-0">Please add projects from admin panel.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
