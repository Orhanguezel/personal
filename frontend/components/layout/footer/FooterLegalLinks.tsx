'use client';

import Link from 'next/link';

type Locale = 'de' | 'en' | 'tr';

const LEGAL_COPY: Record<
  Locale,
  {
    impressum: string;
    privacy: string;
    privacyHref: string;
  }
> = {
  de: {
    impressum: 'Impressum',
    privacy: 'Datenschutzerklaerung',
    privacyHref: '/custompages/policy/datenschutz',
  },
  en: {
    impressum: 'Legal Notice',
    privacy: 'Privacy Policy',
    privacyHref: '/custompages/policy/privacy-policy',
  },
  tr: {
    impressum: 'Yasal Bildirim',
    privacy: 'Gizlilik Politikasi',
    privacyHref: '/custompages/policy/gizlilik-politikasi',
  },
};

function normalizeLocale(locale: string): Locale {
  return locale === 'tr' || locale === 'en' || locale === 'de' ? locale : 'de';
}

export function FooterLegalLinks({
  locale,
  className = '',
}: {
  locale: string;
  className?: string;
}) {
  const safeLocale = normalizeLocale(locale);
  const copy = LEGAL_COPY[safeLocale];

  return (
    <nav
      aria-label="Legal links"
      className={`d-flex flex-wrap align-items-center justify-content-center gap-2 fs-7 ${className}`}
    >
      <Link href={`/${safeLocale}/impressum`}>{copy.impressum}</Link>
      <span aria-hidden="true">·</span>
      <Link href={`/${safeLocale}${copy.privacyHref}`}>{copy.privacy}</Link>
    </nav>
  );
}
