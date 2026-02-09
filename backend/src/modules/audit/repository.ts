// =============================================================
// FILE: src/modules/audit/repository.ts
// Ensotek – Audit Repository (Drizzle queries)
//   - listAuditRequestLogs
//   - listAuditAuthEvents
// =============================================================

import { db } from '@/db/client';
import { and, asc, desc, eq, like, or, sql, type SQL, gte, lte } from 'drizzle-orm';

import {
  auditRequestLogs,
  auditAuthEvents,
  type AuditRequestLogRow,
  type AuditAuthEventRow,
} from './schema';

import type { AuditRequestLogsListQuery, AuditAuthEventsListQuery } from './validation';
import { isTruthyBoolLike } from './shared';

function parseDateTime3(s: string) {
  return sql`CAST(${s} AS DATETIME(3))`;
}

/* -------------------------------------------------------------
 * LIST – Request logs
 * ------------------------------------------------------------- */
export async function listAuditRequestLogs(
  q: AuditRequestLogsListQuery,
): Promise<{ items: AuditRequestLogRow[]; total: number }> {
  const conds: (SQL | undefined)[] = [];

  if (q.q && q.q.trim()) {
    const s = `%${q.q.trim()}%`;
    conds.push(or(like(auditRequestLogs.path, s), like(auditRequestLogs.url, s)));
  }

  if (q.method && q.method.trim()) {
    conds.push(eq(auditRequestLogs.method, q.method.trim().toUpperCase()));
  }

  if (typeof q.status_code === 'number') {
    conds.push(eq(auditRequestLogs.status_code, q.status_code));
  }

  if (q.user_id) conds.push(eq(auditRequestLogs.user_id, q.user_id));
  if (q.ip) conds.push(eq(auditRequestLogs.ip, q.ip));

  if (typeof q.only_admin !== 'undefined' && isTruthyBoolLike(q.only_admin)) {
    conds.push(eq(auditRequestLogs.is_admin, 1));
  }

  if (q.created_from && q.created_from.trim()) {
    conds.push(gte(auditRequestLogs.created_at, parseDateTime3(q.created_from.trim())));
  }
  if (q.created_to && q.created_to.trim()) {
    conds.push(lte(auditRequestLogs.created_at, parseDateTime3(q.created_to.trim())));
  }

  const whereCond =
    conds.length > 0 ? (and(...(conds.filter(Boolean) as SQL[])) as SQL) : undefined;

  const take = q.limit ?? 50;
  const skip = q.offset ?? 0;

  const sort = q.sort ?? 'created_at';
  const dir = q.orderDir ?? 'desc';

  const orderExpr: SQL =
    sort === 'response_time_ms'
      ? dir === 'asc'
        ? asc(auditRequestLogs.response_time_ms)
        : desc(auditRequestLogs.response_time_ms)
      : sort === 'status_code'
      ? dir === 'asc'
        ? asc(auditRequestLogs.status_code)
        : desc(auditRequestLogs.status_code)
      : dir === 'asc'
      ? asc(auditRequestLogs.created_at)
      : desc(auditRequestLogs.created_at);

  const baseQuery = db.select().from(auditRequestLogs);
  const rowsQuery = whereCond ? baseQuery.where(whereCond as SQL) : baseQuery;

  const items = await rowsQuery
    .orderBy(orderExpr, desc(auditRequestLogs.id))
    .limit(take)
    .offset(skip);

  const countBase = db.select({ c: sql<number>`COUNT(*)` }).from(auditRequestLogs);
  const countQuery = whereCond ? countBase.where(whereCond as SQL) : countBase;

  const cnt = await countQuery;
  const total = Number(cnt[0]?.c ?? 0);

  return { items: items as AuditRequestLogRow[], total };
}

/* -------------------------------------------------------------
 * LIST – Auth events
 * ------------------------------------------------------------- */
export async function listAuditAuthEvents(
  q: AuditAuthEventsListQuery,
): Promise<{ items: AuditAuthEventRow[]; total: number }> {
  const conds: (SQL | undefined)[] = [];

  if (q.event) conds.push(eq(auditAuthEvents.event, q.event));
  if (q.user_id) conds.push(eq(auditAuthEvents.user_id, q.user_id));
  if (q.email) conds.push(eq(auditAuthEvents.email, q.email));
  if (q.ip) conds.push(eq(auditAuthEvents.ip, q.ip));

  if (q.created_from && q.created_from.trim()) {
    conds.push(gte(auditAuthEvents.created_at, parseDateTime3(q.created_from.trim())));
  }
  if (q.created_to && q.created_to.trim()) {
    conds.push(lte(auditAuthEvents.created_at, parseDateTime3(q.created_to.trim())));
  }

  const whereCond =
    conds.length > 0 ? (and(...(conds.filter(Boolean) as SQL[])) as SQL) : undefined;

  const take = q.limit ?? 50;
  const skip = q.offset ?? 0;

  const dir = q.orderDir ?? 'desc';
  const orderExpr: SQL =
    dir === 'asc' ? asc(auditAuthEvents.created_at) : desc(auditAuthEvents.created_at);

  const baseQuery = db.select().from(auditAuthEvents);
  const rowsQuery = whereCond ? baseQuery.where(whereCond as SQL) : baseQuery;

  const items = await rowsQuery
    .orderBy(orderExpr, desc(auditAuthEvents.id))
    .limit(take)
    .offset(skip);

  const countBase = db.select({ c: sql<number>`COUNT(*)` }).from(auditAuthEvents);
  const countQuery = whereCond ? countBase.where(whereCond as SQL) : countBase;

  const cnt = await countQuery;
  const total = Number(cnt[0]?.c ?? 0);

  return { items: items as AuditAuthEventRow[], total };
}
