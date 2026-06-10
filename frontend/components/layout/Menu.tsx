'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useListMenuItemsQuery } from '@/integrations/hooks';
import type { PublicMenuItemDto } from '@/integrations/shared';
import { cx } from '@/integrations/shared';

import {
  isActiveLink,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  withLocalePrefix,
} from '@/integrations/shared';

function MenuNode({
  item,
  locale,
  pathname,
  currentHash,
}: {
  item: PublicMenuItemDto;
  locale: string;
  pathname: string;
  currentHash: string;
}) {
  const href = useMemo(() => withLocalePrefix(locale, item.url), [locale, item.url]);
  const active = useMemo(
    () => isActiveLink(pathname, currentHash, href),
    [pathname, currentHash, href],
  );

  const children = item.children?.length ? item.children : null;

  return (
    <li className="nav-item">
      <Link href={href} className={cx('nav-link', active && 'active')}>
        {item.title}
      </Link>

      {children ? (
        <ul className="dropdown-menu">
          {children.map((ch) => (
            <MenuNode
              key={ch.id}
              item={ch}
              locale={locale}
              pathname={pathname}
              currentHash={currentHash}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function Menu() {
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

  if (isLoading && !items.length) {
    return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <span className="nav-link">…</span>
        </li>
      </ul>
    );
  }

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {items.map((item) => (
        <MenuNode
          key={item.id}
          item={item}
          locale={localeForLinks}
          pathname={pathname}
          currentHash={currentHash}
        />
      ))}
    </ul>
  );
}
