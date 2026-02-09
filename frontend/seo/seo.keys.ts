// =============================================================
// FILE: src/seo/seo.keys.ts
// FINAL — SiteSettings SEO/Analytics key registry (single source)
// - Primary source: site_settings keys below
// - Fallbacks (if missing): see seo/utils.ts (seo_defaults, seo_app_icons, seo_social_same_as)
// =============================================================

export const SEO_KEYS = {
  // locale
  defaultLocale: 'default_locale',

  // analytics
  gaId: 'analytics_ga_id',
  gtmId: 'analytics_gtm_id',
  metaPixelId: 'analytics_meta_pixel_id',

  // seo core
  defaults: 'seo_defaults',
  appIcons: 'seo_app_icons',
  sameAs: 'seo_social_same_as',
  ampClientIdApi: 'seo_amp_google_client_id_api',
  localBusiness: 'seo_local_business',

  // pages prefix
  pagesPrefix: 'seo_pages_',

    // pages (listing + detail templates)
    page: {
    home: 'seo_pages_home',
    home2: 'seo_pages_home_2',
    home3: 'seo_pages_home_3',

    services: 'seo_pages_services', // listing
    contact: 'seo_pages_contact',
    about: 'seo_pages_about',
    faq: 'seo_pages_faq',
    team: 'seo_pages_team',

    blog: 'seo_pages_blog',
    blogDetail: 'seo_pages_blog_detail',

    pricing: 'seo_pages_pricing',
    work: 'seo_pages_work',
    workDetail: 'seo_pages_work_detail',
    serviceDetail: 'seo_pages_service_detail',
    customPageDetail: 'seo_pages_custompage_detail',

    news: 'seo_pages_news',
    newsDetail: 'seo_pages_news_detail',

    // legacy keys you already use elsewhere
    properties: 'seo_pages_properties',
    propertyDetail: 'seo_pages_property_detail',
  },
} as const;

export const SEO_PAGE_KEYS: Record<keyof typeof SEO_KEYS.page, string> = Object.entries(
  SEO_KEYS.page,
).reduce((acc, [k, v]) => {
  acc[k as keyof typeof SEO_KEYS.page] = v.replace(SEO_KEYS.pagesPrefix, '');
  return acc;
}, {} as Record<keyof typeof SEO_KEYS.page, string>);

export const SEO_KEY_LIST_ALL: string[] = Array.from(
  new Set([
  // locale
  SEO_KEYS.defaultLocale,

  // analytics
  SEO_KEYS.gaId,
  SEO_KEYS.gtmId,
  SEO_KEYS.metaPixelId,

  // seo core
  SEO_KEYS.defaults,
  SEO_KEYS.appIcons,
  SEO_KEYS.sameAs,
  SEO_KEYS.ampClientIdApi,
  SEO_KEYS.localBusiness,

  // pages
  SEO_KEYS.page.home,

  SEO_KEYS.page.services,
  SEO_KEYS.page.contact,
  SEO_KEYS.page.about,
  SEO_KEYS.page.faq,
  SEO_KEYS.page.team,

  SEO_KEYS.page.blog,
  SEO_KEYS.page.blogDetail,

  SEO_KEYS.page.news,
  SEO_KEYS.page.newsDetail,

  SEO_KEYS.page.properties,
  SEO_KEYS.page.propertyDetail,
    ...Object.values(SEO_KEYS.page),
  ]),
);
