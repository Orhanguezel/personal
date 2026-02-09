'use client';

import React, { useMemo } from 'react';
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
  resolveLocaleForApi,
  resolveLocaleForLinks,
  withLocalePrefix,
  pickSettingValue,
  pickBrandName,
  pickSocialUrl,
  groupFooterMenuSections,
} from '@/integrations/shared';
import SiteLogo from '../SiteLogo';

export default function Footer3() {
  const pathname = usePathname() || '/';
  const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname]);
  const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

  // settings
  const { data: brandRow } = useGetSiteSettingByKeyQuery({
    key: 'company_brand',
    locale: localeForApi ?? localeForLinks,
  } as any);

  const { data: socialsRow } = useGetSiteSettingByKeyQuery({
    key: 'socials',
    locale: localeForApi ?? localeForLinks,
  } as any);

  // OPTIONAL: footer3 config (yoksa sorun değil)
  // site_settings key: footer3_settings (locale'li)
  // value: { brandLabel?: string, favicon?: string, home_path?: string }
  const { data: footer3Row } = useGetSiteSettingByKeyQuery({
    key: 'footer3_settings',
    locale: localeForApi ?? localeForLinks,
  } as any);

  const brandValue = useMemo(() => pickSettingValue(brandRow), [brandRow]);
  const socialsValue = useMemo(() => pickSettingValue(socialsRow), [socialsRow]);
  const footer3Value = useMemo(() => pickSettingValue(footer3Row), [footer3Row]);

  const brandName = useMemo(() => {
    // footer3_settings.brandLabel override; yoksa company_brand
    const o: any = footer3Value;
    const override = typeof o?.brandLabel === 'string' ? o.brandLabel.trim() : '';
    return override || pickBrandName(brandValue, 'Meisa');
  }, [footer3Value, brandValue]);

  const homeHref = useMemo(() => {
    const o: any = footer3Value;
    const p = typeof o?.home_path === 'string' ? o.home_path.trim() : '';
    if (p) return withLocalePrefix(localeForLinks, p);
    // default: /{locale}
    return `/${localeForLinks}`;
  }, [footer3Value, localeForLinks]);

  const socials = useMemo(() => {
    const facebook = pickSocialUrl(socialsValue, 'facebook');
    const x = pickSocialUrl(socialsValue, 'x') || pickSocialUrl(socialsValue, 'twitter');
    const linkedin = pickSocialUrl(socialsValue, 'linkedin');
    const github = pickSocialUrl(socialsValue, 'github');
    const instagram = pickSocialUrl(socialsValue, 'instagram');

    return { facebook, x, linkedin, github, instagram };
  }, [socialsValue]);

  // menu (footer; yoksa header fallback)
  const { data: footerMenuRes, isLoading: menuLoading } = useListMenuItemsQuery({
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
    () => groupFooterMenuSections(footerSections, footerMenuRes?.items),
    [footerSections, footerMenuRes?.items],
  );

  const { data: headerMenuRes } = useListMenuItemsQuery({
    location: 'header',
    is_active: '1',
    nested: '1',
    order: 'order_num.asc',
    ...(localeForApi ? { locale: localeForApi } : {}),
  });

  const fallbackItems = useMemo(() => {
    if (groups.length || ungrouped.length) return [];
    const arr = headerMenuRes?.items ?? [];
    return arr
      .filter((x) => x && x.is_active !== false)
      .sort((a, b) => (a.order_num ?? 0) - (b.order_num ?? 0));
  }, [groups.length, ungrouped.length, headerMenuRes?.items]);

  const flatItems = useMemo(() => {
    if (groups.length) return [];
    if (ungrouped.length) return ungrouped;
    return fallbackItems;
  }, [groups.length, ungrouped, fallbackItems]);

  const renderItem = (item: PublicMenuItemDto) => {
    const href = withLocalePrefix(localeForLinks, item.url);
    return (
      <Link key={item.id} href={href} className="fs-6">
        {item.title}
      </Link>
    );
  };

  return (
    <footer>
      <div className="section-footer-3 position-relative">
        <div className="container position-relative z-1 border-top border-secondary-3 pb-2 pt-4 px-lg-0">
          <div className="d-lg-flex justify-content-between align-items-center">
            <Link
              className="d-flex main-logo align-items-center justify-content-center ms-lg-0 ms-md-5 ms-3"
              href={homeHref}
            >
              <h1 className="fs-28 mb-0 me-2">{brandName}</h1>
              <SiteLogo className="ms-2" alt={brandName} sizes="60px" />
            </Link>

            {!groups.length ? (
              <div
                className={cx(
                  'navigation d-flex align-items-center justify-content-center flex-wrap gap-4 my-4',
                )}
              >
                {menuLoading && !flatItems.length ? (
                  <span className="fs-6">…</span>
                ) : (
                  flatItems.map(renderItem)
                )}
              </div>
            ) : null}

            <div className="navbar-social d-flex justify-content-center gap-3">
              {socials.facebook ? (
                <a href={socials.facebook} target="_blank" rel="noreferrer">
                  <i className="ri-facebook-circle-fill fs-18" />
                </a>
              ) : null}

              {socials.x ? (
                <a href={socials.x} target="_blank" rel="noreferrer">
                  <i className="ri-twitter-x-fill fs-18" />
                </a>
              ) : null}

              {socials.linkedin ? (
                <a href={socials.linkedin} target="_blank" rel="noreferrer">
                  <i className="ri-linkedin-fill fs-18" />
                </a>
              ) : null}

              {socials.github ? (
                <a href={socials.github} target="_blank" rel="noreferrer">
                  <i className="ri-github-fill fs-18" />
                </a>
              ) : null}

              {/* template’de yok ama DB’de varsa göster */}
              {socials.instagram ? (
                <a href={socials.instagram} target="_blank" rel="noreferrer">
                  <i className="ri-instagram-fill fs-18" />
                </a>
              ) : null}
            </div>
          </div>
          {groups.length ? (
            <div className="row mt-4 text-start">
              {groups.map((group) => (
                <div className="col-6 col-md-3 mb-4" key={group.section.id}>
                  <h6 className="text-dark mb-3">{group.section.title}</h6>
                  <div className="d-flex flex-column gap-2">{group.items.map(renderItem)}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
