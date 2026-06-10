// lighthouserc.cjs
const fs = require('node:fs');
const path = require('node:path');

const baseUrl = 'http://localhost:3000';

function readI18nConfig() {
  const configPath = path.join(__dirname, 'i18n', 'config.ts');
  const source = fs.readFileSync(configPath, 'utf8');
  const localesMatch = source.match(/SUPPORTED_LOCALES\s*=\s*\[([^\]]+)\]/m);
  const defaultMatch = source.match(/DEFAULT_HREFLANG_LOCALE[^=]*=\s*['"]([^'"]+)['"]/m);

  const parsedLocales = localesMatch
    ? localesMatch[1]
        .split(',')
        .map((x) => x.replace(/['"`\s]/g, '').trim())
        .filter(Boolean)
    : [];

  return {
    locales: parsedLocales.length ? parsedLocales : ['de', 'en', 'tr'],
    defaultLocale: defaultMatch?.[1] || parsedLocales[0] || 'de',
  };
}

const { locales, defaultLocale } = readI18nConfig();

function withLocalePath(path, locale) {
  const p = `/${String(path || '').replace(/^\/+/, '')}`;
  const loc = String(locale || '').trim().toLowerCase();
  
  // Basic logic: all paths are prefixed in this project based on [locale] folder
  // unless there is a rewrite.
  // Assuming strict /[locale]/... structure for now.
  if (p === '/') return `/${loc}`;
  return `/${loc}${p}`;
}

const routes = [
  '/', // Home 1
  '/index-2', // Home 2
  '/index-3', // Home 3
  '/services',
  '/work',
  '/blog',
  '/pricing'
];

// URL list: locale x route
const urls = [];
for (const loc of locales) {
  for (const r of routes) {
    urls.push(new URL(withLocalePath(r, loc), baseUrl).toString());
  }
}

module.exports = {
  ci: {
    collect: {
      url: urls.length ? urls : [new URL(`/${defaultLocale}`, baseUrl).toString()],
      numberOfRuns: 1,
      // startServerCommand: 'bun run start', // Ensure server starts
      // startServerReadyPattern: 'Ready in', // Adjust based on Next.js 16 output "Ready in" or similar
      settings: {
        preset: 'desktop',
        chromeFlags: [
          '--no-sandbox', 
          '--disable-dev-shm-usage', 
          '--disable-gpu',
          // '--headless' // CI usually implies headless
        ],
        // Simulation settings similar to Ensotek (or custom)
        throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
        }
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.7 }], 
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci/reports'
    }
  }
};
