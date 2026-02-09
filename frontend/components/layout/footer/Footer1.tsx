'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  useListMenuItemsQuery,
  useGetSiteSettingByKeyQuery,
  useListFooterSectionsQuery,
} from '@/integrations/hooks';
import type { PublicMenuItemDto } from '@/integrations/shared';
import {
  cx,
  isActiveLink,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  withLocalePrefix,
  pickTextFromSettingValue,
  pickSettingValue,
  groupFooterMenuSections,
} from '@/integrations/shared';
import SiteLogo from '../SiteLogo';

function safeYear(): number {
  return new Date().getFullYear();
}

export default function Footer1() {
  const pathname = usePathname() || '/';

  const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname]);
  const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return window.location.hash || '';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onHash = () => setCurrentHash(window.location.hash || '');
    onHash();
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const { data: menuRes, isLoading: menuLoading } = useListMenuItemsQuery({
    location: 'footer',
    is_active: '1',
    nested: '1',
    order: 'order_num.asc',
    ...(localeForApi ? { locale: localeForApi } : {}),
  });

  const { data: footerSections } = useListFooterSectionsQuery({
    is_active: '1' as any,
    order: 'display_order.asc',
    ...(localeForApi ? { locale: localeForApi } : {}),
  } as any);

  const { groups, ungrouped } = useMemo(
    () => groupFooterMenuSections(footerSections, menuRes?.items),
    [footerSections, menuRes?.items],
  );

  // Footer menüsü yoksa header’ı kullan (template bozulmasın)
  const { data: headerMenuRes } = useListMenuItemsQuery(
    groups.length || ungrouped.length
      ? // items varsa bu query’i gereksiz çalıştırmayalım (RTK skip yoksa bile arg sabit kalsın)
        ({
          location: 'header',
          is_active: '1',
          nested: '1',
          order: 'order_num.asc',
          ...(localeForApi ? { locale: localeForApi } : {}),
        } as any)
      : ({
          location: 'header',
          is_active: '1',
          nested: '1',
          order: 'order_num.asc',
          ...(localeForApi ? { locale: localeForApi } : {}),
        } as any),
  );

  const fallbackItems = useMemo(() => {
    if (groups.length || ungrouped.length) return [];
    const arr = headerMenuRes?.items ?? [];
    return arr
      .filter((x) => x && x.is_active !== false)
      .sort((a, b) => (a.order_num ?? 0) - (b.order_num ?? 0));
  }, [groups.length, ungrouped.length, headerMenuRes?.items]);

  // Brand name / URL (settings)
  const { data: brandRow } = useGetSiteSettingByKeyQuery({
    key: 'company_brand',
    locale: localeForApi ?? localeForLinks,
  } as any);

  const brandValue = useMemo(() => pickSettingValue(brandRow), [brandRow]);
  const brandName = useMemo(
    () => pickTextFromSettingValue(brandValue, 'guezelwebdesign'),
    [brandValue],
  );

  const brandWebsite = useMemo(() => {
    const v: any = brandValue as any;
    const url = typeof v?.website === 'string' ? v.website.trim() : '';
    return url || '#';
  }, [brandValue]);

  const renderItem = (item: PublicMenuItemDto) => {
    const href = withLocalePrefix(localeForLinks, item.url);
    const active = isActiveLink(pathname, currentHash, href);
    return (
      <Link
        key={item.id}
        href={href}
        className={cx('fs-5 text-white-keep', active && 'text-primary-1')}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <footer>
      <div className="section-footer position-relative pt-60 pb-60 bg-secondary-1">
        <div className="container position-relative z-1">
          <div className="text-center">
            <Link
              className="d-flex main-logo align-items-center d-inline-flex"
              href={`/${localeForLinks}`}
            >
              <SiteLogo className="me-2" alt={brandName || 'logo'} sizes="160px" />
              <span className="fs-4 ms-2 text-white-keep">{brandName}</span>
            </Link>

            {groups.length ? (
              <div className="row mt-5 text-start justify-content-center">
                {groups.map((group) => (
                  <div className="col-6 col-md-3 mb-4" key={group.section.id}>
                    <h6 className="text-white-keep mb-3">{group.section.title}</h6>
                    <div className="d-flex flex-column gap-2">{group.items.map(renderItem)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="navigation d-none d-md-flex align-items-center justify-content-center flex-wrap gap-4 my-4">
                {menuLoading && !fallbackItems.length ? (
                  <span className="fs-5 text-white-keep">…</span>
                ) : (
                  <div className="d-flex flex-wrap gap-4 justify-content-center">
                    {fallbackItems.map(renderItem)}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="row text-center py-4">
            <span className="fs-6 text-white-keep">
              © {safeYear()} All Rights Reserved by{' '}
              <span>
                <Link
                  href={brandWebsite}
                  className="text-primary-1"
                  target={brandWebsite.startsWith('http') ? '_blank' : undefined}
                  rel={brandWebsite.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {brandName}
                </Link>
              </span>
            </span>
          </div>
        </div>

        {/* ✅ FIX: /assets ile başlat => locale prefix yemesin */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 z-0"
          data-background="/assets/imgs/footer-1/background.png"
        />
      </div>
    </footer>
  );
}
