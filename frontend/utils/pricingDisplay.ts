/**
 * Pricing sayfası: DB’deki tutarlar USD; locale’e göre TRY veya EUR gösterimi.
 */

import type { PricingPlan } from '@/integrations/shared';

export type DisplayFiat = 'TRY' | 'EUR';

/** tr → TRY, de / en → EUR */
export function displayFiatForLocale(locale: string): DisplayFiat {
  const base = String(locale || 'en')
    .trim()
    .toLowerCase()
    .split('-')[0];
  if (base === 'tr') return 'TRY';
  return 'EUR';
}

export function parseUsdAmount(amount?: string | null): number {
  const n = parseFloat(String(amount ?? '0').replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

export function convertUsdToFiat(
  usdAmount: number,
  target: DisplayFiat,
  rates: { TRY: number; EUR: number },
): number {
  const rate = target === 'TRY' ? rates.TRY : rates.EUR;
  const v = usdAmount * rate;
  return Math.round(v * 100) / 100;
}

/** Intl ile para birimi (TL sembolü tr-TR’de ₺) */
export function formatFiatAmount(
  amount: number,
  locale: string,
  currency: DisplayFiat,
): string {
  const base = String(locale || 'en')
    .trim()
    .toLowerCase()
    .split('-')[0];
  const numbering =
    currency === 'TRY'
      ? 'tr-TR'
      : base === 'de'
        ? 'de-DE'
        : 'en-US';

  return new Intl.NumberFormat(numbering, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Plan USD ise dönüştür; aksi halde eski davranış (backend ne döndürdüyse) */
export function displayPriceForPlan(
  plan: PricingPlan,
  locale: string,
  rates: { TRY: number; EUR: number },
): { text: string; convertedFromUsd: boolean } {
  const cur = String(plan.currency || 'USD').toUpperCase();
  if (cur !== 'USD') {
    const amount = parseUsdAmount(plan.price_amount);
    if (cur === 'TRY' || cur === 'EUR') {
      return {
        text: formatFiatAmount(amount, locale, cur),
        convertedFromUsd: false,
      };
    }
    return { text: `${cur} ${amount}`, convertedFromUsd: false };
  }

  const target = displayFiatForLocale(locale);
  const usd = parseUsdAmount(plan.price_amount);
  const fiat = convertUsdToFiat(usd, target, rates);
  return {
    text: formatFiatAmount(fiat, locale, target),
    convertedFromUsd: true,
  };
}

export function unitLabelForLocale(unit: string | undefined, locale: string): string {
  const u = (unit || 'hour').toLowerCase();
  const base = String(locale || 'en')
    .trim()
    .toLowerCase()
    .split('-')[0];
  if (u === 'hour' || u === 'hr') {
    if (base === 'tr') return '/saat';
    if (base === 'de') return '/Std.';
    return '/hr';
  }
  if (u === 'day') return base === 'tr' ? '/gün' : base === 'de' ? '/Tag' : '/day';
  if (u === 'month') return base === 'tr' ? '/ay' : base === 'de' ? '/Monat' : '/mo';
  if (u === 'once') return base === 'tr' ? ' tek seferlik' : base === 'de' ? ' einmalig' : ' one-time';
  if (u === 'setup' || u === 'setup_monthly') {
    return base === 'tr' ? 'kurulum' : base === 'de' ? 'Einrichtung' : 'setup';
  }
  return `/${u}`;
}

export function fxDisclaimer(locale: string): string {
  const base = String(locale || 'en')
    .trim()
    .toLowerCase()
    .split('-')[0];
  if (base === 'tr') {
    return 'TL fiyatlar doğrudan, USD fiyatlar ise güncel döviz kuruyla gösterilir.';
  }
  if (base === 'de') {
    return 'TRY prices are shown directly; USD prices are converted using current exchange rates.';
  }
  return 'TRY prices are shown directly; USD prices use current exchange rates.';
}
