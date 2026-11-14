const apiBase = String(process.env.API_BASE || process.env.NEXT_PUBLIC_API_URL || '')
  .trim()
  .replace(/\/+$/, '');

if (!apiBase) {
  throw new Error('[locale-audit] API_BASE or NEXT_PUBLIC_API_URL is required');
}

const locales = ['tr', 'en', 'de'];

function apiUrl(path, params) {
  const url = new URL(`${apiBase}${path}`);
  for (const [key, value] of Object.entries(params || {})) {
    url.searchParams.set(key, String(value));
  }
  return url;
}

async function getJson(path, params) {
  const url = apiUrl(path, params);
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`[locale-audit] ${response.status} ${url}`);
  }
  return response.json();
}

function rowsFrom(value, key) {
  if (key && Array.isArray(value?.[key])) return value[key];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

const resources = [
  {
    name: 'services',
    path: '/services',
    params: (locale) => ({ locale, default_locale: locale, is_active: true, limit: 100 }),
    required: ['slug', 'name', 'summary'],
  },
  {
    name: 'projects',
    path: '/projects',
    params: (locale) => ({ locale, is_published: true, limit: 100 }),
    required: ['slug', 'title', 'summary'],
  },
  {
    name: 'products',
    path: '/products',
    params: (locale) => ({ locale, default_locale: locale, is_active: true, limit: 100 }),
    required: ['slug', 'title'],
  },
  {
    name: 'blog',
    path: '/custom-pages',
    params: (locale) => ({ locale, module_key: 'blog', is_published: true, limit: 100 }),
    required: ['slug', 'title', 'summary'],
  },
  {
    name: 'pricing',
    path: '/pricing',
    params: (locale) => ({ locale, plans_limit: 50 }),
    rowsKey: 'plans',
    required: ['title', 'description', 'cta_label'],
  },
  {
    name: 'faqs',
    path: '/faqs',
    params: (locale) => ({ locale, is_active: true, limit: 100 }),
    required: ['slug', 'question', 'answer'],
  },
];

const failures = [];
const report = {};

for (const resource of resources) {
  report[resource.name] = {};
  for (const locale of locales) {
    const payload = await getJson(resource.path, resource.params(locale));
    const rows = rowsFrom(payload, resource.rowsKey);
    report[resource.name][locale] = rows.length;

    rows.forEach((row, index) => {
      for (const field of resource.required) {
        const value = String(row?.[field] ?? '').trim();
        if (!value) {
          failures.push(`${resource.name}.${locale}[${index}].${field} is empty`);
        }
      }
    });
  }

  const counts = locales.map((locale) => report[resource.name][locale]);
  if (new Set(counts).size !== 1) {
    failures.push(`${resource.name} locale counts differ: ${JSON.stringify(report[resource.name])}`);
  }
}

process.stdout.write(`[locale-audit] ${JSON.stringify(report)}\n`);

if (failures.length) {
  throw new Error(`[locale-audit] failed:\n- ${failures.join('\n- ')}`);
}

process.stdout.write('[locale-audit] public DB content is complete for tr/en/de\n');
