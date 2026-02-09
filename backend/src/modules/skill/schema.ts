// ===================================================================
// FILE: src/modules/skill/schema.ts
// FINAL — Skills (counters + logos) + i18n + storage relation
// - Uses storageAssets FK for images
// ===================================================================

import {
  mysqlTable,
  char,
  varchar,
  tinyint,
  datetime,
  index,
  uniqueIndex,
  int,
  smallint,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

import { storageAssets } from '@/modules/storage/schema';
import { longtext } from '@/modules/_shared';

export const skillCounters = mysqlTable(
  'skill_counters',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),

    percent: smallint('percent').notNull().default(0), // 0..100

    image_url: varchar('image_url', { length: 500 }),
    image_asset_id: char('image_asset_id', { length: 36 }).references(() => storageAssets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),

    is_active: tinyint('is_active').notNull().default(1),
    display_order: int('display_order').notNull().default(0),

    created_at: datetime('created_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime('updated_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    index('skill_counters_active_idx').on(t.is_active),
    index('skill_counters_order_idx').on(t.display_order),
    index('skill_counters_created_idx').on(t.created_at),
    index('skill_counters_updated_idx').on(t.updated_at),
    index('skill_counters_asset_idx').on(t.image_asset_id),
  ],
);

export const skillCountersI18n = mysqlTable(
  'skill_counters_i18n',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),
    counter_id: char('counter_id', { length: 36 })
      .notNull()
      .references(() => skillCounters.id, { onDelete: 'cascade', onUpdate: 'cascade' }),

    locale: varchar('locale', { length: 10 }).notNull(),

    title: varchar('title', { length: 300 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),

    created_at: datetime('created_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime('updated_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    uniqueIndex('ux_skill_counter_i18n_parent_locale').on(t.counter_id, t.locale),
    uniqueIndex('ux_skill_counter_i18n_locale_slug').on(t.locale, t.slug),
    index('skill_counter_i18n_locale_idx').on(t.locale),
    index('skill_counter_i18n_slug_idx').on(t.slug),
  ],
);

export const skillLogos = mysqlTable(
  'skill_logos',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),

    // right | left
    track: varchar('track', { length: 16 }).notNull().default('right'),

    image_url: varchar('image_url', { length: 500 }),
    image_asset_id: char('image_asset_id', { length: 36 }).references(() => storageAssets.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),

    is_active: tinyint('is_active').notNull().default(1),
    display_order: int('display_order').notNull().default(0),

    created_at: datetime('created_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime('updated_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    index('skill_logos_track_idx').on(t.track),
    index('skill_logos_active_idx').on(t.is_active),
    index('skill_logos_order_idx').on(t.display_order),
    index('skill_logos_created_idx').on(t.created_at),
    index('skill_logos_updated_idx').on(t.updated_at),
    index('skill_logos_asset_idx').on(t.image_asset_id),
  ],
);

export const skillLogosI18n = mysqlTable(
  'skill_logos_i18n',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),
    logo_id: char('logo_id', { length: 36 })
      .notNull()
      .references(() => skillLogos.id, { onDelete: 'cascade', onUpdate: 'cascade' }),

    locale: varchar('locale', { length: 10 }).notNull(),

    label: varchar('label', { length: 300 }).notNull(),

    created_at: datetime('created_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime('updated_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    uniqueIndex('ux_skill_logo_i18n_parent_locale').on(t.logo_id, t.locale),
    index('skill_logo_i18n_locale_idx').on(t.locale),
  ],
);

export type SkillCounterRow = typeof skillCounters.$inferSelect;
export type NewSkillCounterRow = typeof skillCounters.$inferInsert;

export type SkillCounterI18nRow = typeof skillCountersI18n.$inferSelect;
export type NewSkillCounterI18nRow = typeof skillCountersI18n.$inferInsert;

export type SkillLogoRow = typeof skillLogos.$inferSelect;
export type NewSkillLogoRow = typeof skillLogos.$inferInsert;

export type SkillLogoI18nRow = typeof skillLogosI18n.$inferSelect;
export type NewSkillLogoI18nRow = typeof skillLogosI18n.$inferInsert;
