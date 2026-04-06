import { fetchFrankfurterUsdRates } from '@/utils/usdFx.server';

export const revalidate = 3600;

export async function GET() {
  const r = await fetchFrankfurterUsdRates();
  return Response.json({
    rates: { TRY: r.TRY, EUR: r.EUR },
    date: r.date ?? null,
    source: r.source,
  });
}
