// ===================================================================
// FILE: src/modules/resume/schema.ts
// FINAL — Resume entries (education/experience) + i18n
// - parent: locale-independent
// - i18n: title/subtitle/description/highlights/slug per locale
// - NO category/sub_category
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
  date,
  decimal,
} from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

import { longtext } from '@/modules/_shared';

export const resumeEntries = mysqlTable(
  'resume_entries',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),

    // education | experience
    type: varchar('type', { length: 20 }).notNull(),

    is_active: tinyint('is_active').notNull().default(1),
    display_order: int('display_order').notNull().default(0),

    // dates (UI year range shows from these)
    start_date: date('start_date').notNull(),
    end_date: date('end_date'), // nullable
    is_current: tinyint('is_current').notNull().default(0),

    // optional meta (theme-dependent)
    location: varchar('location', { length: 200 }),
    organization: varchar('organization', { length: 200 }), // company / school etc.

    // score like 4.9/5
    score_value: decimal('score_value', { precision: 3, scale: 1 }),
    score_scale: int('score_scale').notNull().default(5),

    created_at: datetime('created_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updated_at: datetime('updated_at', { fsp: 3 })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`)
      .$onUpdateFn(() => new Date()),
  },
  (t) => [
    index('resume_entries_type_idx').on(t.type),
    index('resume_entries_active_idx').on(t.is_active),
    index('resume_entries_order_idx').on(t.display_order),
    index('resume_entries_start_idx').on(t.start_date),
    index('resume_entries_end_idx').on(t.end_date),
    index('resume_entries_created_idx').on(t.created_at),
    index('resume_entries_updated_idx').on(t.updated_at),
  ],
);

export const resumeEntriesI18n = mysqlTable(
  'resume_entries_i18n',
  {
    id: char('id', { length: 36 }).primaryKey().notNull(),
    entry_id: char('entry_id', { length: 36 })
      .notNull()
      .references(() => resumeEntries.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    locale: varchar('locale', { length: 10 }).notNull(),

    title: varchar('title', { length: 300 }).notNull(),
    subtitle: varchar('subtitle', { length: 300 }).notNull(),

    description: longtext('description'), // optional
    highlights_json: longtext('highlights_json'), // optional JSON string: ["..",".."]

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
    uniqueIndex('ux_resume_i18n_parent_locale').on(t.entry_id, t.locale),
    uniqueIndex('ux_resume_i18n_locale_slug').on(t.locale, t.slug),
    index('resume_i18n_locale_idx').on(t.locale),
    index('resume_i18n_slug_idx').on(t.slug),
  ],
);

export type ResumeEntryRow = typeof resumeEntries.$inferSelect;
export type NewResumeEntryRow = typeof resumeEntries.$inferInsert;

export type ResumeEntryI18nRow = typeof resumeEntriesI18n.$inferSelect;
export type NewResumeEntryI18nRow = typeof resumeEntriesI18n.$inferInsert;
