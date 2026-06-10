import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const OUTPUT_DIR = path.resolve(
  '/home/orhan/Documents/Projeler/guezelwebdesign/frontend/public/assets/imgs/work/projects'
);

const SITES = [
  { slug: 'quickecommerce', url: 'https://sportoonline.com' },
  { slug: 'ensotek', url: 'https://www.ensotek.de' },
  { slug: 'karbonkompozit', url: 'https://karbonkompozit.com.tr' },
  { slug: 'vistainsaat', url: 'https://www.vistainsaat.com' },
  { slug: 'konigsmassage', url: 'https://energetische-massage-bonn.de' },
  { slug: 'kamanilan', url: 'https://www.kamanilan.com' },
  { slug: 'gzltemizlik', url: 'https://gzltemizlik.com' },
  { slug: 'paketjet', url: 'https://paketjet.com' },
  { slug: 'kuhlturm', url: 'https://kuhlturm.com' },
  { slug: 'bereketfide', url: 'https://bereketfide.com' },
  { slug: 'vistaseed', url: 'https://vistaseed.com.tr' },
  { slug: 'misset', url: 'https://menu.guezelwebdesign.com' },
];

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'tr-TR',
  });

  for (const site of SITES) {
    const filePath = path.join(OUTPUT_DIR, `${site.slug}.png`);
    try {
      const page = await context.newPage();
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: filePath, fullPage: false });
      await page.close();
      console.log(`OK: ${site.slug} -> ${filePath}`);
    } catch (err) {
      console.error(`FAIL: ${site.slug} (${site.url}) -> ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done.');
}

main();
