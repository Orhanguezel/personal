// ===================================================================
// FILE: src/modules/brand/schema.ts
// FINAL — Brand logos + i18n (storage FK)
// ===================================================================

import {
  mysqlTable,
  char,
  varchar,
  tinyint,
  int,
  datetime,
  index,
  uniqueIndex,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

import { storageAssets } from '@/modules/storage/schema';

export const brandLogos = mysqlTable(
  'brand_logos',
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
    index('brand_logos_track_idx').on(t.track),
    index('brand_logos_active_idx').on(t.is_active),
    index('brand_logos_order_idx').on(t.display_order),
    index('brand_logos_created_idx').on(t.created_at),
    index('brand_logos_updated_idx').on(t.updated_at),
    index('brand_logos_asset_idx').on(t.image_asset_id),
  ],
);

export const brandLogosI18n = mysqlTable(
  'brand_logos_i18n',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),
    logo_id: char('logo_id', { length: 36 })
      .notNull()
      .references(() => brandLogos.id, { onDelete: 'cascade', onUpdate: 'cascade' }),

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
    uniqueIndex('ux_brand_logo_i18n_parent_locale').on(t.logo_id, t.locale),
    index('brand_logo_i18n_locale_idx').on(t.locale),
  ],
);

export type BrandLogoRow = typeof brandLogos.$inferSelect;
export type NewBrandLogoRow = typeof brandLogos.$inferInsert;

export type BrandLogoI18nRow = typeof brandLogosI18n.$inferSelect;
export type NewBrandLogoI18nRow = typeof brandLogosI18n.$inferInsert;
