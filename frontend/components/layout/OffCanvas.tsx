'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useStaticSiteSetting } from '@/utils/staticSiteSettings';
import {
  cx,
  isRemoteUrl,
  parseJsonObject,
  pickStr,
  resolveLocaleForApi,
  resolveLocaleForLinks,
  safeText,
} from '@/integrations/shared';
import SiteLogo from './SiteLogo';
import { useSiteMedia } from './siteAssets';

type OffCanvasProps = {
  isOffCanvas: boolean;
  handleOffCanvas: () => void;
};

export default function OffCanvas({ isOffCanvas, handleOffCanvas }: OffCanvasProps) {
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

  const { value: contactSettingValue } = useStaticSiteSetting({
    key: 'contact_info',
    locale: localeForApi,
  });

  const { value: socialsSettingValue } = useStaticSiteSetting({
    key: 'socials',
    locale: localeForApi,
  });

  // İsteğe bağlı: panel metinleri için ayrı key (yoksa fallback)
  const { value: panelSettingValue } = useStaticSiteSetting({
    key: 'offcanvas_panel',
    locale: localeForApi,
  });

  const contact = useMemo(() => parseJsonObject(contactSettingValue), [contactSettingValue]);
  const socials = useMemo(() => parseJsonObject(socialsSettingValue), [socialsSettingValue]);
  const panel = useMemo(() => parseJsonObject(panelSettingValue), [panelSettingValue]);

  const headline = useMemo(
    () => safeText(pickStr(panel, ['headline', 'title'], ''), 'Get in touch'),
    [panel],
  );

  const intro = useMemo(
    () =>
      safeText(
        pickStr(panel, ['intro', 'description', 'text'], ''),
        "I'm always excited to take on new projects and collaborate with innovative minds.",
      ),
    [panel],
  );

  const phone = useMemo(() => {
    const raw = pickStr(contact, ['phone', 'phoneNumber', 'whatsappNumber'], '');
    return safeText(raw);
  }, [contact]);

  const email = useMemo(() => {
    const raw = pickStr(contact, ['email'], '');
    return safeText(raw, 'orhanguzell@gmail.com');
  }, [contact]);

  const skype = useMemo(() => safeText(pickStr(contact, ['skype'], '')), [contact]);

  const address = useMemo(() => safeText(pickStr(contact, ['address'], ''), 'Grevenbroich, Germany'), [contact]);

  const socialLinks = useMemo(() => {
    const entries: Array<{ key: string; url: string; icon: string; label: string }> = [
      {
        key: 'facebook',
        url: pickStr(socials, ['facebook'], ''),
        icon: 'ri-facebook-circle-fill',
        label: 'Facebook',
      },
      {
        key: 'x',
        url: pickStr(socials, ['x', 'twitter'], ''),
        icon: 'ri-twitter-x-fill',
        label: 'X',
      },
      {
        key: 'linkedin',
        url: pickStr(socials, ['linkedin'], ''),
        icon: 'ri-linkedin-fill',
        label: 'LinkedIn',
      },
      {
        key: 'github',
        url: pickStr(socials, ['github'], ''),
        icon: 'ri-github-fill',
        label: 'GitHub',
      },
      {
        key: 'instagram',
        url: pickStr(socials, ['instagram'], ''),
        icon: 'ri-instagram-fill',
        label: 'Instagram',
      },
    ];

    return entries
      .map((x) => ({ ...x, url: safeText(x.url) }))
      .filter(
        (x) =>
          !!x.url &&
          (isRemoteUrl(x.url) || x.url.startsWith('mailto:') || x.url.startsWith('tel:')),
      );
  }, [socials]);

  return (
    <>
      {/* offCanvas-menu */}
      <div
        id="offCanvas__info"
        className={cx('offCanvas__info', isOffCanvas && 'active')}
        aria-hidden={!isOffCanvas}
      >
        <div className="offCanvas__close-icon menu-close" onClick={handleOffCanvas}>
          <button aria-label="Close menu">
            <i className="ri-close-line" />
          </button>
        </div>

        <div className="offCanvas__logo mb-5">
          <Link
            className="d-flex main-logo align-items-center d-inline-flex mb-3"
            href={`/${localeForLinks}`}
            onClick={handleOffCanvas}
          >
            <SiteLogo className="me-2" alt={brandLabel} sizes="36px" />
            <span className="fs-4 ms-2 text-white-keep">{brandLabel}</span>
          </Link>
          <p className="h3 mb-0">{headline}</p>
        </div>

        <div className="offCanvas__side-info mb-30">
          <div className="contact-list mb-30">
            <p className="fs-6 fw-medium text-200 mb-5">{intro}</p>

            {phone ? (
              <div className="mb-3">
                <span className="text-400 fs-5">Phone Number</span>
                <p className="mb-0">{phone}</p>
              </div>
            ) : null}

            <div className="mb-3">
              <span className="text-400 fs-5">Email</span>
              <p className="mb-0">{email}</p>
            </div>

            {skype ? (
              <div className="mb-3">
                <span className="text-400 fs-5">Skype</span>
                <p className="mb-0">{skype}</p>
              </div>
            ) : null}

            {address ? (
              <div className="mb-3">
                <span className="text-400 fs-5">Address</span>
                <p className="mb-0">{address}</p>
              </div>
            ) : null}
          </div>

          <div className="contact-list">
            <p className="text-400 fs-5 mb-2">Social</p>

            <div className="d-md-flex d-none gap-3">
              {socialLinks.map((s) => (
                <Link
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <i className={cx(s.icon, 'fs-18')} />
                </Link>
              ))}
            </div>

            {/* mobilde de görünmesi istersen d-none'ı kaldırırsın */}
          </div>
        </div>
      </div>

      <div className={cx('offCanvas__overly', isOffCanvas && 'active')} onClick={handleOffCanvas} />
    </>
  );
}
