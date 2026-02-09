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

export default function Footer2() {
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

  const brandValue = useMemo(() => pickSettingValue(brandRow), [brandRow]);
  const socialsValue = useMemo(() => pickSettingValue(socialsRow), [socialsRow]);

  const brandName = useMemo(() => pickBrandName(brandValue, 'guezelwebdesign'), [brandValue]);

  const socials = useMemo(() => {
    // DB’de x var; template twitter iconu var -> x ile mapliyoruz
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
      <div className="section-footer-2 position-relative">
        <div className="container position-relative z-1 border-top border-1 pb-2 pt-4">
          <div className="text-center">
            <Link
              className="d-flex main-logo align-items-center justify-content-center mb-3"
              href={`/${localeForLinks}`}
            >
              <SiteLogo className="me-2" alt={brandName} sizes="160px" />
              <span className="fs-4 ms-2">{brandName}</span>
            </Link>

            <div className="d-flex justify-content-center gap-3">
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

              {/* template’de yok ama DB’de varsa göstermek istersen aç */}
              {socials.instagram ? (
                <a href={socials.instagram} target="_blank" rel="noreferrer">
                  <i className="ri-instagram-fill fs-18" />
                </a>
              ) : null}
            </div>

            {groups.length ? (
              <div className="row mt-4 text-start justify-content-center">
                {groups.map((group) => (
                  <div className="col-6 col-md-3 mb-4" key={group.section.id}>
                    <h6 className="text-dark mb-3">{group.section.title}</h6>
                    <div className="d-flex flex-column gap-2">{group.items.map(renderItem)}</div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
