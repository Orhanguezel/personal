import { AsyncLocalStorage } from 'node:async_hooks';
import mysql, { type PoolConnection } from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { enabled, contentConfig, workspaceSchema, publishedSchema, site } from './config';
import { sharedTables, mediaTables, definitions, type ContentDefinition } from './definitions';
export type ContentContext = {
  admin: boolean;
  kind?: ContentDefinition;
  connection?: PoolConnection;
  skip?: boolean;
  localCustom?: boolean;
  mixedCustom?: boolean;
  media?: boolean;
  transaction?: boolean;
  before?: any;
  requestId?: string;
  idempotencyKey?: string;
  replay?: boolean;
};
export const context = new AsyncLocalStorage<ContentContext>();
let legacy: mysql.Pool | undefined, content: mysql.Pool | undefined;
export function getLegacyPool() {
  return (legacy ??= mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    connectionLimit: 5,
    timezone: 'Z',
    dateStrings: true,
  }));
}
export function getContentPool() {
  return (content ??= mysql.createPool(contentConfig));
}
export function rewriteSQL(
  sql: string,
  ctx: ContentContext | undefined,
): { sql: string; shared: boolean } {
  if (!enabled || ctx?.skip || !ctx) return { sql, shared: false };
  if (!ctx.admin && /^\s*(INSERT|UPDATE|DELETE|REPLACE)/i.test(sql)) return { sql, shared: false };
  if (
    /`(?:orders|order_items|payments|subscriptions|users|profiles|refresh_tokens|user_roles|product_stock|product_reviews|social_posts)`/i.test(
      sql,
    )
  )
    return { sql, shared: false };
  const schema = ctx.admin ? workspaceSchema : publishedSchema;
  let changed = false;
  const map = (table: string) => {
    if ((table === 'custom_pages' || table === 'custom_pages_i18n') && ctx.localCustom) return null;
    if ((table === 'custom_pages' || table === 'custom_pages_i18n') && ctx.mixedCustom) {
      changed = true;
      return (
        '`' +
        String(process.env.DB_NAME) +
        '`.`content_' +
        (ctx.admin ? 'work' : 'public') +
        '_' +
        table +
        '`'
      );
    }
    if (!sharedTables.has(table) && !(mediaTables.includes(table) && (ctx.kind || ctx.media)))
      return null;
    changed = true;
    const definition = definitions.find((d) => d.table === table);
    const target =
      !ctx.admin && definition
        ? (definition.commercial?.length ? site + '_' : 'live_') + table
        : table;
    return '`' + schema + '`.`' + target + '`';
  };
  let out = sql.replace(/`([a-z][a-z0-9_]*)`/g, (full, table, offset) => {
    // Do not rewrite explicitly qualified identifiers; metadata/publisher SQL has its own boundary.
    if (sql.slice(Math.max(0, offset - 2), offset).includes('.')) return full;
    const before = sql.slice(0, offset),
      after = sql.slice(offset + full.length);
    if (!/^\s*\./.test(after) && !/(?:FROM|JOIN|INTO|UPDATE|TABLE)\s*$/i.test(before)) return full;
    return map(table) || full;
  });
  out = out.replace(
    /\b(FROM|JOIN|INTO|UPDATE|TABLE|DELETE\s+FROM)\s+([a-z][a-z0-9_]*)(?=\s|\(|$)/gi,
    (full, verb, table) => {
      const target = map(table.toLowerCase());
      return target ? verb + ' ' + target : full;
    },
  );
  return { sql: out, shared: changed };
}
function routed(input: any, values?: any) {
  const ctx = context.getStore();
  const text = typeof input === 'string' ? input : input?.sql || '';
  const r = rewriteSQL(text, ctx);
  const client = r.shared ? ctx?.connection || getContentPool() : getLegacyPool();
  const statement = typeof input === 'string' ? r.sql : { ...input, sql: r.sql };
  return { client, statement, values };
}
export const routedPool: any = new Proxy(
  {},
  {
    get(_target, key) {
      if (key === 'query' || key === 'execute')
        return async (input: any, values?: any) => {
          const r = routed(input, values);
          return (r.client as any)[key](r.statement, r.values);
        };
      if (key === 'getConnection')
        return () => {
          const ctx = context.getStore();
          return ctx && !ctx.skip && ctx.kind
            ? ctx.connection
              ? Promise.resolve(ctx.connection)
              : getContentPool().getConnection()
            : getLegacyPool().getConnection();
        };
      if (key === 'end')
        return async () => {
          await legacy?.end();
          await content?.end();
          legacy = undefined;
          content = undefined;
        };
      if (key === 'promise') return () => routedPool;
      const value = (getLegacyPool() as any)[key];
      return typeof value === 'function' ? value.bind(getLegacyPool()) : value;
    },
  },
);
export function getPool(): mysql.Pool {
  return routedPool;
}
export const db = drizzle(routedPool);
export async function closeContentPools() {
  await routedPool.end();
}
