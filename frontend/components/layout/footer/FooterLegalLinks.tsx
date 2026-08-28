'use client';

import Link from 'next/link';

import { FooterLegalIdentity } from './FooterLegalIdentity';
import { SITE_MEDIA_FALLBACKS, type LegalLink } from '@/components/layout/siteAssets';

type Locale = 'de' | 'en' | 'tr';

// Yedek — yalnizca uretilmis liste bos oldugunda kullanilir (temiz checkout /
// API'ye ulasilamadan alinan build). Kanonik kaynak: deployment'in KENDI
// yayinlanmis yasal sayfalari, `bun run ui:generate` ile
// `config/brand.generated.json` icine yazilir.
//
// NEDEN: slug'lar burada sabitti ve guezelwebdesign'in `policy` modulune
// aitti; gzlteknoloji.com'da footer'daki "Gizlilik Politikasi" bagi 404
// veriyordu (o kurulumda modul `legal`, slug `privacy-policy`).
const FALLBACK_COPY: Record<Locale, { impressum: string }> = {
  de: { impressum: 'Impressum' },
  en: { impressum: 'Legal Notice' },
  tr: { impressum: 'Yasal Bildirim' },
};

function normalizeLocale(locale: string): Locale {
  return locale === 'tr' || locale === 'en' || locale === 'de' ? locale : 'de';
}

function resolveLinks(locale: Locale): LegalLink[] {
  const generated = SITE_MEDIA_FALLBACKS.legalLinks?.[locale];
  if (Array.isArray(generated) && generated.length) return generated;
  return [{ title: FALLBACK_COPY[locale].impressum, href: `/${locale}/impressum` }];
}

export function FooterLegalLinks({
  locale,
  className = '',
}: {
  locale: string;
  className?: string;
}) {
  const safeLocale = normalizeLocale(locale);
  const links = resolveLinks(safeLocale);

  return (
    <div className={`text-center ${className}`}>
      <FooterLegalIdentity locale={safeLocale} />

      <nav
        aria-label="Legal links"
        className="d-flex flex-wrap align-items-center justify-content-center gap-2 fs-7"
      >
        {links.map((link, index) => (
          <span key={link.href} className="d-inline-flex align-items-center gap-2">
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            <Link href={link.href}>{link.title}</Link>
          </span>
        ))}
      </nav>
    </div>
  );
}
