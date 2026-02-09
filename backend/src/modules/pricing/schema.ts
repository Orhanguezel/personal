// =============================================================
// FILE: src/modules/pricing/schema.ts
// FINAL — Pricing schema (parent + i18n) — Drizzle (MySQL/MariaDB)
// - pricing_plans + pricing_plans_i18n
// =============================================================

import {
  mysqlTable,
  varchar,
  char,
  int,
  tinyint,
  datetime,
  decimal,
  uniqueIndex,
  index,
  longtext,
} from 'drizzle-orm/mysql-core';

export const pricingPlans = mysqlTable(
  'pricing_plans',
  {
    id: char('id', { length: 36 }).notNull(),

    // stable identifier (e.g. "basic", "business")
    code: varchar('code', { length: 64 }).notNull(),

    // e.g. 49.00
    price_amount: decimal('price_amount', { precision: 10, scale: 2 }).notNull().default('0.00'),
    // e.g. "hour"
    price_unit: varchar('price_unit', { length: 32 }).notNull().default('hour'),
    // e.g. "USD"
    currency: varchar('currency', { length: 10 }).notNull().default('USD'),

    is_active: tinyint('is_active').notNull().default(1),
    is_featured: tinyint('is_featured').notNull().default(0),
    display_order: int('display_order').notNull().default(0),

    // Optional CTA link can be non-localized too (can override via i18n)
    cta_href: varchar('cta_href', { length: 500 }),

    created_at: datetime('created_at', { fsp: 3 }).notNull(),
    updated_at: datetime('updated_at', { fsp: 3 }).notNull(),
  },
  (t) => ({
    ux_code: uniqueIndex('ux_pricing_plans_code').on(t.code),
    idx_active_order: index('idx_pricing_plans_active_order').on(t.is_active, t.display_order),
    idx_featured_order: index('idx_pricing_plans_featured_order').on(t.is_featured, t.display_order),
  }),
);

export const pricingPlansI18n = mysqlTable(
  'pricing_plans_i18n',
  {
    id: char('id', { length: 36 }).notNull(),
    plan_id: char('plan_id', { length: 36 }).notNull(),
    locale: varchar('locale', { length: 10 }).notNull(),

    // FE badges: "basic", "business"
    badge: varchar('badge', { length: 64 }).notNull(),

    // card title (optional, FE şu an badge gösteriyor ama hazır dursun)
    title: varchar('title', { length: 255 }),
    // short description (optional)
    description: varchar('description', { length: 1000 }),

    // IMPORTANT: JSON-string array ["feature1","feature2",...]
    features: longtext('features').notNull().default('[]'),

    // local CTA label (e.g. "Order Now")
    cta_label: varchar('cta_label', { length: 100 }),

    // optional override per-locale
    cta_href: varchar('cta_href', { length: 500 }),

    created_at: datetime('created_at', { fsp: 3 }).notNull(),
    updated_at: datetime('updated_at', { fsp: 3 }).notNull(),
  },
  (t) => ({
    ux_plan_locale: uniqueIndex('ux_pricing_plans_i18n_plan_locale').on(t.plan_id, t.locale),
    idx_locale_badge: index('idx_pricing_plans_i18n_locale_badge').on(t.locale, t.badge),
    idx_plan: index('idx_pricing_plans_i18n_plan').on(t.plan_id),
  }),
);
