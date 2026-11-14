'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { normLocaleTag } from '@/i18n';
import { cx } from '@/integrations/shared';
import styles from './LocaleSwitcher.module.css';

const LABELS: Record<string, string> = { tr: 'TR', en: 'EN', de: 'DE' };
const SUPPORTED_LOCALES = ['tr', 'en', 'de'] as const;

export default function LocaleSwitcher({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname() || '/';
  const currentLocale = normLocaleTag(pathname.split('/')[1]) || 'de';

  const visibleLocales = useMemo(
    () => [currentLocale, ...SUPPORTED_LOCALES.filter((locale) => locale !== currentLocale)],
    [currentLocale],
  );

  return (
    <nav
      className={cx(styles.switcher, mobile ? styles.mobile : styles.desktop)}
      aria-label="Language selection"
    >
      {visibleLocales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}`}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === currentLocale ? 'page' : undefined}
          aria-label={`Switch language to ${locale.toUpperCase()}`}
          className={cx(styles.link, locale === currentLocale && styles.active)}
        >
          {LABELS[locale]}
        </Link>
      ))}
    </nav>
  );
}
