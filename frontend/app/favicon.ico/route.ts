// /favicon.ico — <link rel="icon"> okumayan istemciler (WhatsApp/Telegram
// link onizlemesi, bazi tarayicilar, botlar) bu yolu dogrudan ister.
//
// NEDEN route: burada create-next-app'in varsayilan `app/favicon.ico` dosyasi
// duruyordu; WhatsApp'ta og:image yuklenemeyince onizlemede Next.js logosu
// cikiyordu. Statik bir .ico koymak da marka kuralini bozar (gzlteknoloji.com
// ayni agactan yayinlaniyor). Ikon kurulumun kendi `site_favicon` ayarindan
// gelir: `bun run ui:generate` -> config/brand.generated.json.
import brandGenerated from '@/config/brand.generated.json';

export const dynamic = 'force-static';

export function GET() {
  const favicon = String((brandGenerated as { favicon?: string }).favicon ?? '').trim();
  if (!favicon) return new Response(null, { status: 404 });
  // Goreli Location: statik uretimde istek host'u bilinmez (localhost olurdu).
  return new Response(null, {
    status: 308,
    headers: { Location: favicon, 'Cache-Control': 'public, max-age=86400' },
  });
}
