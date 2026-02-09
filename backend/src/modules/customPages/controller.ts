// =============================================================
// FILE: src/modules/customPages/controller.ts
// FINAL — query parse safe + locale resolution unchanged
// - category/subcategory kaldırıldı
// =============================================================

import type { RouteHandler } from 'fastify';
import {
  listCustomPages,
  getCustomPageMergedById,
  getCustomPageMergedBySlug,
  getCustomPageMergedByModuleSlug,
} from './repository';

import {
  customPageBySlugParamsSchema,
  customPageBySlugQuerySchema,
  customPageByModuleSlugParamsSchema,
  customPageByModuleSlugQuerySchema,
} from './validation';
import { resolveLocales } from '@/modules/_shared';
import type { CustomPageListQuery } from '@/modules/_shared';


export const listPages: RouteHandler<{ Querystring: CustomPageListQuery }> = async (req, reply) => {
  const q = (req.query ?? {}) as CustomPageListQuery;

  const limitNum = q.limit != null && q.limit !== '' ? Number(q.limit) : undefined;
  const offsetNum = q.offset != null && q.offset !== '' ? Number(q.offset) : undefined;

  const { locale, def } = await resolveLocales(req, {
    locale: q.locale,
    default_locale: q.default_locale,
  });

  const { items, total } = await listCustomPages({
    orderParam: typeof q.order === 'string' ? q.order : undefined,
    sort: q.sort,
    order: q.orderDir,
    limit: Number.isFinite(limitNum as number) ? (limitNum as number) : undefined,
    offset: Number.isFinite(offsetNum as number) ? (offsetNum as number) : undefined,
    is_published: q.is_published,
    q: q.q,
    slug: q.slug,
    module_key: q.module_key,
    locale,
    defaultLocale: def,
  });

  reply.header('x-total-count', String(total ?? 0));
  return reply.send(items);
};

export const getPage: RouteHandler<{
  Params: { id: string };
  Querystring?: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { locale, def } = await resolveLocales(req, req.query as any);

  const row = await getCustomPageMergedById(locale, def, req.params.id);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });

  return reply.send(row);
};

export const getPageBySlug: RouteHandler<{
  Params: { slug: string };
  Querystring?: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { slug } = customPageBySlugParamsSchema.parse(req.params ?? {});
  const parsedQ = customPageBySlugQuerySchema.safeParse(req.query ?? {});
  const q = parsedQ.success ? parsedQ.data : {};

  const { locale, def } = await resolveLocales(req, {
    locale: q.locale,
    default_locale: q.default_locale,
  });

  const row = await getCustomPageMergedBySlug(locale, def, slug);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });

  return reply.send(row);
  };



export const getPageByModuleSlug: RouteHandler<{
  Params: { module_key: string; slug: string };
  Querystring?: { locale?: string; default_locale?: string };
}> = async (req, reply) => {
  const { module_key, slug } = customPageByModuleSlugParamsSchema.parse(req.params ?? {});
  const parsedQ = customPageByModuleSlugQuerySchema.safeParse(req.query ?? {});
  const q = parsedQ.success ? parsedQ.data : {};

  const { locale, def } = await resolveLocales(req, {
    locale: q.locale,
    default_locale: q.default_locale,
  });

  const row = await getCustomPageMergedByModuleSlug(locale, def, module_key, slug);
  if (!row) return reply.code(404).send({ error: { message: 'not_found' } });

  return reply.send(row);
};
