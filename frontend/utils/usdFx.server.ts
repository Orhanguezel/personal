/**
 * USD → TRY / EUR kurları (API key gerektirmez).
 * - Birincil: exchangerate.host (TRY + EUR)
 * - Yedek: Frankfurter (çoğunlukla EUR; TRY yoksa yalnızca EUR ile devam + sabit TRY)
 * Sunucu: Next fetch revalidate 1 saat.
 */

export type UsdFxRates = {
  TRY: number;
  EUR: number;
  date?: string;
  source: 'live' | 'fallback';
};

const FALLBACK: UsdFxRates = {
  TRY: 36.5,
  EUR: 0.92,
  source: 'fallback',
};

async function fetchFromExchangerateHost(): Promise<UsdFxRates | null> {
  const res = await fetch(
    'https://api.exchangerate.host/latest?base=USD&symbols=TRY,EUR',
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    success?: boolean;
    date?: string;
    rates?: { TRY?: number; EUR?: number };
  };
  if (data.success === false || !data.rates) return null;
  const t = data.rates.TRY;
  const e = data.rates.EUR;
  if (typeof t !== 'number' || typeof e !== 'number' || t <= 0 || e <= 0) return null;
  return { TRY: t, EUR: e, date: data.date, source: 'live' };
}

async function fetchFromFrankfurter(): Promise<Pick<UsdFxRates, 'EUR' | 'date'> | null> {
  const res = await fetch(
    'https://api.frankfurter.app/latest?from=USD&to=EUR',
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return null;
  const data = (await res.json()) as { rates?: { EUR?: number }; date?: string };
  const e = data.rates?.EUR;
  if (typeof e !== 'number' || e <= 0) return null;
  return { EUR: e, date: data.date };
}

export async function fetchFrankfurterUsdRates(): Promise<UsdFxRates> {
  try {
    const primary = await fetchFromExchangerateHost();
    if (primary) return primary;
  } catch {
    /* fall through */
  }

  try {
    const ff = await fetchFromFrankfurter();
    if (ff) {
      return {
        TRY: FALLBACK.TRY,
        EUR: ff.EUR,
        date: ff.date,
        source: 'live',
      };
    }
  } catch {
    /* fall through */
  }

  return { ...FALLBACK };
}
