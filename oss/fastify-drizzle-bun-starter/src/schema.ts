import { boolean, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const healthChecks = mysqlTable('health_checks', {
  id: varchar('id', { length: 36 }).primaryKey(),
  label: varchar('label', { length: 120 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { fsp: 3 }).notNull().defaultNow(),
});
