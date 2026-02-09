'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { useListMenuItemsQuery } from '@/integrations/hooks';
import type { PublicMenuItemDto } from '@/integrations/shared';
import {
  cx,
  isActiveLink,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  withLocalePrefix,
} from '@/integrations/shared';
import SiteLogo from './SiteLogo';
import { useSiteMedia } from './siteAssets';

type MobileMenuProps = {
  isMobileMenu: boolean;
  handleMobileMenu: () => void;
};

function MobileMenuNode({
  item,
  locale,
  pathname,
  currentHash,
  onNavigate,
}: {
  item: PublicMenuItemDto;
  locale: string;
  pathname: string;
  currentHash: string;
  onNavigate: () => void;
}) {
  const href = useMemo(() => withLocalePrefix(locale, item.url), [locale, item.url]);
  const active = useMemo(
    () => isActiveLink(pathname, currentHash, href),
    [pathname, currentHash, href],
  );

  const children = item.children?.length ? item.children : null;

  // template uyumu: "nav-item" + "nav-link" sınıfları
  return (
    <li className="nav-item">
      <Link className={cx('nav-link', active && 'active')} href={href} onClick={onNavigate}>
        {item.title}
      </Link>

      {children ? (
        <ul className="dropdown-menu">
          {children.map((ch) => (
            <MobileMenuNode
              key={ch.id}
              item={ch}
              locale={locale}
              pathname={pathname}
              currentHash={currentHash}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: MobileMenuProps) {
  const pathname = usePathname() || '/';

  const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname]);
  const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

  const { brandName: mediaBrandName, brandShort } = useSiteMedia({
    locale: localeForApi ?? localeForLinks,
  });
  const brandLabel = useMemo(
    () => brandShort || mediaBrandName || 'Guezel Web Design',
    [brandShort, mediaBrandName],
  );

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

  const { data, isLoading } = useListMenuItemsQuery({
    location: 'header',
    is_active: '1',
    nested: '1',
    order: 'order_num.asc',
    ...(localeForApi ? { locale: localeForApi } : {}),
  });

  const items = useMemo(() => {
    const arr = data?.items ?? [];
    return arr
      .filter((x) => x && x.is_active !== false)
      .sort((a, b) => (a.order_num ?? 0) - (b.order_num ?? 0));
  }, [data?.items]);

  const onNavigate = useMemo(() => {
    // Mobile menüde linke tıklanınca menüyü kapat
    return () => handleMobileMenu();
  }, [handleMobileMenu]);

  return (
    <div
      className={cx(
        'mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2',
        isMobileMenu && 'sidebar-visible',
      )}
    >
      <div className="mobile-header-wrapper-inner">
        <div className="mobile-header-logo">
          <Link
            className="d-flex main-logo align-items-center d-inline-flex"
            href={`/${localeForLinks}`}
            onClick={onNavigate}
          >
            <SiteLogo className="me-2" alt={brandLabel} sizes="120px" />
            <span className="fs-4 ms-2 text-dark">{brandLabel}</span>
          </Link>

          <div
            className={cx(
              'burger-icon burger-icon-white border rounded-3',
              isMobileMenu && 'burger-close',
            )}
            onClick={handleMobileMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleMobileMenu();
            }}
            aria-label="Toggle mobile menu"
          >
            <span className="burger-icon-top" />
            <span className="burger-icon-mid" />
            <span className="burger-icon-bottom" />
          </div>
        </div>

        <div className="mobile-header-content-area">
          <PerfectScrollbar className="perfect-scroll">
            <div className="mobile-menu-wrap mobile-header-border">
              <nav>
                <ul className="mobile-menu font-heading ps-0">
                  {isLoading && !items.length ? (
                    <li className="nav-item">
                      <span className="nav-link">…</span>
                    </li>
                  ) : (
                    items.map((item) => (
                      <MobileMenuNode
                        key={item.id}
                        item={item}
                        locale={localeForLinks}
                        pathname={pathname}
                        currentHash={currentHash}
                        onNavigate={onNavigate}
                      />
                    ))
                  )}
                </ul>
              </nav>
            </div>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}
