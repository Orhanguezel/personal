export type ContentKind =
  | 'projects'
  | 'services'
  | 'products'
  | 'blog'
  | 'faqs'
  | 'pricing'
  | 'brands'
  | 'resume'
  | 'skill-counters'
  | 'skill-logos'
  | 'categories'
  | 'subcategories';
export type ContentDefinition = {
  kind: ContentKind;
  table: string;
  routes: string[];
  publishedField: string;
  translations?: { table: string; fk: string };
  children: { table: string; fk: string; nested?: { table: string; fk: string } }[];
  commercial?: string[];
};
export const definitions: ContentDefinition[] = [
  {
    kind: 'categories',
    table: 'categories',
    routes: ['categories'],
    publishedField: 'is_active',
    translations: { table: 'category_i18n', fk: 'category_id' },
    children: [],
  },
  {
    kind: 'subcategories',
    table: 'sub_categories',
    routes: ['sub_categories', 'sub-categories'],
    publishedField: 'is_active',
    translations: { table: 'sub_category_i18n', fk: 'sub_category_id' },
    children: [],
  },
  {
    kind: 'projects',
    table: 'projects',
    routes: ['projects'],
    publishedField: 'is_published',
    translations: { table: 'projects_i18n', fk: 'project_id' },
    children: [
      {
        table: 'project_images',
        fk: 'project_id',
        nested: { table: 'project_images_i18n', fk: 'image_id' },
      },
    ],
    commercial: ['price_onetime', 'currency', 'is_purchasable'],
  },
  {
    kind: 'services',
    table: 'services',
    routes: ['services'],
    publishedField: 'is_active',
    translations: { table: 'services_i18n', fk: 'service_id' },
    children: [
      {
        table: 'service_images',
        fk: 'service_id',
        nested: { table: 'service_images_i18n', fk: 'image_id' },
      },
    ],
    commercial: ['price_onetime', 'currency', 'is_purchasable'],
  },
  {
    kind: 'products',
    table: 'products',
    routes: ['products'],
    publishedField: 'is_active',
    translations: { table: 'product_i18n', fk: 'product_id' },
    children: [
      { table: 'product_images', fk: 'product_id' },
      { table: 'product_specs', fk: 'product_id' },
      { table: 'product_faqs', fk: 'product_id' },
      { table: 'product_options', fk: 'product_id' },
    ],
    commercial: ['price', 'sale_price', 'currency', 'stock_quantity', 'is_purchasable'],
  },
  {
    kind: 'blog',
    table: 'custom_pages',
    routes: ['custom_pages', 'custom-pages'],
    publishedField: 'is_published',
    translations: { table: 'custom_pages_i18n', fk: 'page_id' },
    children: [],
  },
  {
    kind: 'faqs',
    table: 'faqs',
    routes: ['faqs'],
    publishedField: 'is_active',
    translations: { table: 'faqs_i18n', fk: 'faq_id' },
    children: [],
  },
  {
    kind: 'pricing',
    table: 'pricing_plans',
    routes: ['pricing', 'pricing/plans'],
    publishedField: 'is_active',
    translations: { table: 'pricing_plans_i18n', fk: 'plan_id' },
    children: [],
    commercial: ['price_amount', 'price_unit', 'currency'],
  },
  {
    kind: 'brands',
    table: 'brand_logos',
    routes: ['brands', 'brand-logos'],
    publishedField: 'is_active',
    translations: { table: 'brand_logos_i18n', fk: 'logo_id' },
    children: [],
  },
  {
    kind: 'resume',
    table: 'resume_entries',
    routes: ['resume', 'resume-entries'],
    publishedField: 'is_active',
    translations: { table: 'resume_entries_i18n', fk: 'entry_id' },
    children: [],
  },
  {
    kind: 'skill-counters',
    table: 'skill_counters',
    routes: ['skill-counters'],
    publishedField: 'is_active',
    translations: { table: 'skill_counters_i18n', fk: 'counter_id' },
    children: [],
  },
  {
    kind: 'skill-logos',
    table: 'skill_logos',
    routes: ['skill-logos'],
    publishedField: 'is_active',
    translations: { table: 'skill_logos_i18n', fk: 'logo_id' },
    children: [],
  },
];
export const byKind = new Map(definitions.map((d) => [d.kind, d]));
export const supportTables = ['categories', 'category_i18n', 'sub_categories', 'sub_category_i18n'];
export const mediaTables = ['storage_assets', 'storage_assets_i18n'];
export function tablesFor(d: ContentDefinition): string[] {
  return [
    d.table,
    ...(d.translations ? [d.translations.table] : []),
    ...d.children.flatMap((c) => [c.table, ...(c.nested ? [c.nested.table] : [])]),
  ];
}
export const sharedTables = new Set([...definitions.flatMap(tablesFor), ...supportTables]);
export function definitionForPath(path: string): ContentDefinition | undefined {
  const p = path
    .replace(/^\/api(?:\/v1)?\//, '')
    .replace(/^admin\//, '')
    .split('?')[0];
  return definitions.find((d) => d.routes.some((r) => p === r || p.startsWith(r + '/')));
}
export function schemaName(v: string): string {
  if (!/^[a-z][a-z0-9_]{1,62}$/.test(v)) throw Error('Invalid shared content schema');
  return v;
}
