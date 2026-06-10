'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  useListMenuItemsQuery,
  useListFooterSectionsQuery,
  useSubscribeNewsletterMutation,
} from '@/integrations/hooks';
import { useStaticSiteSetting } from '@/utils/staticSiteSettings';
import type { PublicMenuItemDto } from '@/integrations/shared';
import {
  cx,
  isActiveLink,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  withLocalePrefix,
  pickTextFromSettingValue,
  groupFooterMenuSections,
} from '@/integrations/shared';
import SiteLogo from '../SiteLogo';
import { FooterLegalLinks } from './FooterLegalLinks';

function safeYear(): number {
  return new Date().getFullYear();
}

const NEWSLETTER_COPY: Record<
  string,
  {
    title: string;
    placeholder: string;
    button: string;
    sending: string;
    success: string;
    error: string;
    invalid: string;
  }
> = {
  de: {
    title: 'Impulse fur bessere Websites',
    placeholder: 'E-Mail-Adresse',
    button: 'Abonnieren',
    sending: 'Wird gesendet...',
    success: 'Danke, deine Anmeldung ist angekommen.',
    error: 'Die Anmeldung konnte nicht gespeichert werden.',
    invalid: 'Bitte gib eine gueltige E-Mail-Adresse ein.',
  },
  en: {
    title: 'Notes for better websites',
    placeholder: 'Email address',
    button: 'Subscribe',
    sending: 'Sending...',
    success: 'Thanks, your subscription is saved.',
    error: 'The subscription could not be saved.',
    invalid: 'Please enter a valid email address.',
  },
  tr: {
    title: 'Daha iyi web siteleri icin notlar',
    placeholder: 'E-posta adresi',
    button: 'Abone ol',
    sending: 'Gonderiliyor...',
    success: 'Tesekkurler, aboneligin kaydedildi.',
    error: 'Abonelik kaydedilemedi.',
    invalid: 'Lutfen gecerli bir e-posta adresi gir.',
  },
};

export default function Footer1() {
  const pathname = usePathname() || '/';

  const localeForLinks = useMemo(() => resolveLocaleForLinks(pathname, 'de'), [pathname]);
  const localeForApi = useMemo(() => resolveLocaleForApi(pathname), [pathname]);

  const [currentHash, setCurrentHash] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return window.location.hash || '';
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(
    null,
  );
  const [subscribeNewsletter, newsletterState] = useSubscribeNewsletterMutation();

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
  const { value: brandRowValue } = useStaticSiteSetting({
    key: 'company_brand',
    locale: localeForApi ?? localeForLinks,
  });

  const brandValue = brandRowValue;
  const brandName = useMemo(
    () => pickTextFromSettingValue(brandValue, 'guezelwebdesign'),
    [brandValue],
  );

  const brandWebsite = useMemo(() => {
    const v: any = brandValue as any;
    const url = typeof v?.website === 'string' ? v.website.trim() : '';
    return url || '#';
  }, [brandValue]);

  const newsletterCopy = NEWSLETTER_COPY[localeForLinks] ?? NEWSLETTER_COPY.de;

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = newsletterEmail.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage({ kind: 'error', text: newsletterCopy.invalid });
      return;
    }

    try {
      await subscribeNewsletter({
        email,
        meta: {
          locale: localeForApi ?? localeForLinks,
          source: 'footer',
          path: pathname,
        },
      }).unwrap();
      setNewsletterEmail('');
      setNewsletterMessage({ kind: 'success', text: newsletterCopy.success });
    } catch {
      setNewsletterMessage({ kind: 'error', text: newsletterCopy.error });
    }
  };

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
                    <h3 className="text-white-keep h6 mb-3">{group.section.title}</h3>
                    <div className="d-flex flex-column gap-2">{group.items.map(renderItem)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="navigation d-none d-md-flex align-items-center justify-content-center flex-wrap gap-4 my-4">
                {menuLoading && !fallbackItems.length ? (
                  <span className="fs-5 text-white-keep">…</span>
                ) : (
                  <nav aria-label="Footer Menu" className="d-flex flex-wrap gap-4 justify-content-center">
                    {fallbackItems.map(renderItem)}
                  </nav>
                )}
              </div>
            )}
          </div>

          <div className="row justify-content-center py-4">
            <div className="col-lg-7 col-md-9">
              <form
                className="d-flex flex-column flex-sm-row gap-2 align-items-stretch"
                onSubmit={handleNewsletterSubmit}
              >
                <label htmlFor="footer-newsletter-email" className="visually-hidden">
                  {newsletterCopy.placeholder}
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="form-control border-0 rounded-2 px-4 py-3"
                  placeholder={newsletterCopy.placeholder}
                  value={newsletterEmail}
                  onChange={(event) => {
                    setNewsletterEmail(event.target.value);
                    if (newsletterMessage) setNewsletterMessage(null);
                  }}
                  disabled={newsletterState.isLoading}
                  aria-describedby="footer-newsletter-status"
                />
                <button
                  type="submit"
                  className="btn btn-gradient px-4 py-3 text-uppercase"
                  disabled={newsletterState.isLoading}
                >
                  {newsletterState.isLoading ? newsletterCopy.sending : newsletterCopy.button}
                </button>
              </form>
              <p className="text-white-keep fs-6 mt-3 mb-0">{newsletterCopy.title}</p>
              <p
                id="footer-newsletter-status"
                className={cx(
                  'fs-6 mt-2 mb-0',
                  newsletterMessage?.kind === 'success' ? 'text-primary-1' : 'text-white-keep',
                )}
                aria-live="polite"
              >
                {newsletterMessage?.text ?? ''}
              </p>
            </div>
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
                  aria-label={brandName || 'Brand Website'}
                >
                  {brandName}
                </Link>
              </span>
            </span>
          </div>

          <FooterLegalLinks locale={localeForLinks} className="text-white-keep opacity-75" />
        </div>

        {/* ✅ FIX: /assets ile başlat => locale prefix yemesin */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 z-0"
          style={{ backgroundImage: 'url(/assets/imgs/footer-1/background.webp)' }}
        />
      </div>
    </footer>
  );
}
