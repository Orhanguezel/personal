// =============================================================
// FILE: components/sections/HomeSeoIntro.tsx
// Ana sayfa SEO/GEO tanitim bolumu — icerik VERITABANINDAN gelir.
//
// NEDEN (2026-08-08): Baslik ve metin daha once bu dosyaya ve
// content/geo-home-intro.ts'e GOMULUYDU ve Guezel Web Design'a aitti
// ("Grevenbroich'tan full-stack teslimat", "Orhan Guzel ... Grevenbroich
// merkezli"). Ayni kod tabani artik gzlteknoloji.com'u da sundugu icin bu
// metin TR sitede yanlis markayi anlatiyordu.
//
// Artik `ui_home_seo_intro` site_settings anahtarindan okunur:
//   { "heading": "...", "html": "<p>...</p>" }
// Anahtar yoksa bolum HIC RENDER EDILMEZ — eksik icerik, baska bir markanin
// metnini gostermekten iyidir.
// =============================================================

import { normalizeLocaleParam } from '@/i18n/localeParam';
import { getSiteSettingServer } from '@/i18n/settingsApi.server';
import { sanitizeHtml } from '@/integrations/shared';

type SeoIntro = { heading?: string; html?: string };

function pick(value: unknown): SeoIntro | null {
  if (!value) return null;
  if (typeof value === 'string') {
    try {
      return pick(JSON.parse(value));
    } catch {
      return { html: value };
    }
  }
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;
    const heading = typeof v.heading === 'string' ? v.heading : undefined;
    const html = typeof v.html === 'string' ? v.html : undefined;
    return heading || html ? { heading, html } : null;
  }
  return null;
}

export async function HomeSeoIntro({ locale }: { locale: string }) {
  const loc = normalizeLocaleParam(locale);
  const intro = pick(await getSiteSettingServer('ui_home_seo_intro', loc));

  if (!intro?.html) return null;

  return (
    <section
      className="section-seo-intro pt-80 pb-80 bg-3 border-top border-secondary-3"
      aria-labelledby="seo-intro-heading"
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {intro.heading ? (
              <h2 id="seo-intro-heading" className="ds-4 mb-4 text-dark">
                {intro.heading}
              </h2>
            ) : null}
            <div
              className="text-300 fs-5 lh-lg"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(intro.html) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
