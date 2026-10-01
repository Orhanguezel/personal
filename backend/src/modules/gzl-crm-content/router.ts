import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { MultipartFile } from '@fastify/multipart';
import { env } from '@/core/env';
import { pickUploadsRoot } from '@/app.helpers';
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  MAX_PROJECT_IMAGE_BYTES,
  GZL_CRM_CONTENT_LOCALES,
  gzlCrmProjectCreateSchema,
  hasValidImageSignature,
  imageExtension,
  type AcceptedImageMimeType,
  type GzlCrmProjectCreate,
} from './contract';

type PromiseConnection = {
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  release(): void;
  query<T = unknown[]>(sql: string, params?: unknown[]): Promise<[T, unknown]>;
};

type PromisePool = {
  getConnection(): Promise<PromiseConnection>;
};

type ImportRow = { project_id: string };

function authorized(request: FastifyRequest): boolean {
  const expected = env.GZL_CRM_CONTENT_API_KEY;
  if (!expected) return false;
  const supplied = String(request.headers.authorization ?? '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(supplied);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function authFailure(reply: FastifyReply) {
  if (!env.GZL_CRM_CONTENT_API_KEY) {
    return reply.code(503).send({ error: { code: 'integration_not_configured' } });
  }
  return reply.code(401).send({ error: { code: 'invalid_api_key' } });
}

async function readMultipart(request: FastifyRequest): Promise<{ payload: GzlCrmProjectCreate; image: MultipartFile; bytes: Buffer }> {
  if (!request.isMultipart()) throw new Error('multipart_required');
  let payloadRaw = '';
  let image: MultipartFile | undefined;
  let bytes: Buffer | undefined;

  for await (const part of request.parts({ limits: { files: 1, fields: 1, fileSize: MAX_PROJECT_IMAGE_BYTES } })) {
    if (part.type === 'file') {
      if (part.fieldname !== 'image') throw new Error('unexpected_file_field');
      image = part;
      bytes = await part.toBuffer();
    } else if (part.fieldname === 'payload') {
      payloadRaw = String(part.value ?? '');
    }
  }

  if (!payloadRaw) throw new Error('payload_required');
  if (!image || !bytes?.length) throw new Error('image_required');

  let decoded: unknown;
  try {
    decoded = JSON.parse(payloadRaw);
  } catch {
    throw new Error('payload_json_invalid');
  }
  const parsed = gzlCrmProjectCreateSchema.safeParse(decoded);
  if (!parsed.success) {
    const error = new Error('payload_invalid') as Error & { issues?: unknown };
    error.issues = parsed.error.issues;
    throw error;
  }
  return { payload: parsed.data, image, bytes };
}

function normalizedMime(input: string): AcceptedImageMimeType | null {
  return ACCEPTED_IMAGE_MIME_TYPES.includes(input as AcceptedImageMimeType)
    ? (input as AcceptedImageMimeType)
    : null;
}

async function insertProject(
  connection: PromiseConnection,
  payload: GzlCrmProjectCreate,
  image: { assetId: string; imageId: string; publicUrl: string; relativePath: string; mimeType: AcceptedImageMimeType; bytes: number; sha256: string },
) {
  const projectId = randomUUID();
  const isPublished = payload.publication.status === 'published'
    && payload.publication.displayPermission
    && payload.publication.imageRightsConfirmed;
  const now = new Date();

  await connection.query(
    `INSERT INTO projects
      (id,is_published,is_featured,display_order,currency,is_purchasable,featured_image,featured_image_asset_id,
       demo_url,repo_url,category,client_name,services,website_url,techs,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [projectId, isPublished ? 1 : 0, payload.project.featured ? 1 : 0, payload.project.displayOrder, 'EUR', 0,
      image.publicUrl, image.assetId, payload.project.demoUrl ?? null, payload.project.repositoryUrl ?? null,
      payload.project.category, payload.project.clientName ?? null, JSON.stringify(payload.project.services),
      payload.project.websiteUrl ?? null, JSON.stringify(payload.project.technologies), now, now],
  );

  await connection.query(
    `INSERT INTO storage_assets
      (id,user_id,name,bucket,path,folder,mime,size,url,hash,provider,provider_resource_type,provider_format,metadata,created_at,updated_at)
     VALUES (?,NULL,?,'public',?,'integrations/gzl-crm/projects',?,?,?,?,'local','image',?,CAST(? AS JSON),?,?)`,
    [image.assetId, path.basename(image.relativePath), image.relativePath, image.mimeType, image.bytes,
      image.publicUrl, image.sha256, imageExtension(image.mimeType), JSON.stringify({ source: 'gzl-gelir-crm', externalId: payload.externalId }), now, now],
  );

  await connection.query(
    `INSERT INTO project_images (id,project_id,asset_id,image_url,display_order,is_active,created_at,updated_at)
     VALUES (?,?,?,?,0,1,?,?)`,
    [image.imageId, projectId, image.assetId, image.publicUrl, now, now],
  );

  for (const locale of GZL_CRM_CONTENT_LOCALES) {
    const translation = payload.translations[locale];
    await connection.query(
      `INSERT INTO projects_i18n
        (id,project_id,locale,title,slug,summary,content,featured_image_alt,meta_title,meta_description,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [randomUUID(), projectId, locale, translation.title, translation.slug, translation.summary,
        JSON.stringify(translation.content), translation.featuredImageAlt, translation.metaTitle, translation.metaDescription, now, now],
    );
    await connection.query(
      `INSERT INTO project_images_i18n (id,image_id,locale,alt,caption,created_at,updated_at)
       VALUES (?,?,?,?,?,?,?)`,
      [randomUUID(), image.imageId, locale, translation.featuredImageAlt, translation.imageCaption ?? null, now, now],
    );
    await connection.query(
      `INSERT INTO storage_assets_i18n (id,asset_id,locale,title,alt,caption,description,created_at,updated_at)
       VALUES (?,?,?,?,?,?,NULL,?,?)`,
      [randomUUID(), image.assetId, locale, translation.title, translation.featuredImageAlt, translation.imageCaption ?? null, now, now],
    );
  }

  const payloadHash = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  await connection.query(
    `INSERT INTO gzl_crm_content_imports
      (id,source_external_id,project_id,contract_version,payload_hash,image_sha256,created_at,updated_at)
     VALUES (?,?,?,?,?,?,?,?)`,
    [randomUUID(), payload.externalId, projectId, payload.contractVersion, payloadHash, image.sha256, now, now],
  );
  return { projectId, published: isPublished };
}

export async function registerGzlCrmContentIntegration(app: FastifyInstance) {
  app.get('/capabilities', async (request, reply) => {
    if (!authorized(request)) return authFailure(reply);
    return {
      contractVersion: '1.0',
      resources: { projects: { create: true, update: false, delete: false } },
      locales: GZL_CRM_CONTENT_LOCALES,
      image: { required: true, mimeTypes: ACCEPTED_IMAGE_MIME_TYPES, maxBytes: MAX_PROJECT_IMAGE_BYTES, svg: false },
    };
  });

  app.post('/projects', {
    schema: {
      tags: ['integrations'],
      summary: 'GZL Gelir CRM üzerinden çok dilli proje ve raster görsel oluşturur',
      consumes: ['multipart/form-data'],
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            externalId: { type: 'string' },
            published: { type: 'boolean' },
            imageUrl: { type: 'string' },
          },
        },
      },
    },
    config: { rateLimit: { max: 30, timeWindow: '1 minute' } },
  }, async (request, reply) => {
    if (!authorized(request)) return authFailure(reply);

    try {
      const { payload, image, bytes } = await readMultipart(request);
      const mimeType = normalizedMime(image.mimetype);
      if (!mimeType || !hasValidImageSignature(bytes, mimeType)) {
        return reply.code(400).send({ error: { code: 'image_invalid_or_unsupported' } });
      }
      if (payload.publication.imageRightsConfirmed !== true) {
        return reply.code(400).send({ error: { code: 'image_rights_confirmation_required' } });
      }

      const pool = app.mysql as unknown as PromisePool;
      const connection = await pool.getConnection();
      let storedPath: string | null = null;
      try {
        const [existing] = await connection.query<ImportRow[]>(
          'SELECT project_id FROM gzl_crm_content_imports WHERE source_external_id = ? LIMIT 1',
          [payload.externalId],
        );
        if (existing.length) {
          return reply.code(409).send({ error: { code: 'external_id_already_exists', projectId: existing[0].project_id } });
        }

        const sha256 = createHash('sha256').update(bytes).digest('hex');
        const relativePath = `integrations/gzl-crm/projects/${payload.externalId}/${sha256}.${imageExtension(mimeType)}`;
        storedPath = path.join(pickUploadsRoot(), ...relativePath.split('/'));
        await mkdir(path.dirname(storedPath), { recursive: true });
        await writeFile(storedPath, bytes, { flag: 'wx', mode: 0o644 }).catch(async (error: NodeJS.ErrnoException) => {
          if (error.code !== 'EEXIST') throw error;
        });
        const publicUrl = `/uploads/${relativePath}`;

        await connection.beginTransaction();
        const result = await insertProject(connection, payload, {
          assetId: randomUUID(),
          imageId: randomUUID(),
          publicUrl,
          relativePath,
          mimeType,
          bytes: bytes.length,
          sha256,
        });
        await connection.commit();
        return reply.code(201).send({ id: result.projectId, externalId: payload.externalId, published: result.published, imageUrl: publicUrl });
      } catch (error) {
        await connection.rollback().catch(() => undefined);
        if (storedPath) await rm(storedPath, { force: true }).catch(() => undefined);
        throw error;
      } finally {
        connection.release();
      }
    } catch (error) {
      const e = error as Error & { issues?: unknown; code?: string };
      if (e.code === 'ER_DUP_ENTRY') {
        return reply.code(409).send({ error: { code: 'slug_or_external_id_already_exists' } });
      }
      const clientErrors = new Set([
        'multipart_required', 'unexpected_file_field', 'payload_required', 'image_required',
        'payload_json_invalid', 'payload_invalid',
      ]);
      if (clientErrors.has(e.message)) {
        return reply.code(400).send({ error: { code: e.message, issues: e.issues } });
      }
      request.log.error({ err: error }, 'gzl_crm_project_create_failed');
      return reply.code(500).send({ error: { code: 'project_create_failed' } });
    }
  });
}
