import { z } from 'zod';

export const GZL_CRM_CONTENT_LOCALES = ['tr', 'en', 'de'] as const;

const slugSchema = z
  .string()
  .min(1)
  .max(255)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug_invalid');

const translationSchema = z.object({
  title: z.string().trim().min(2).max(255),
  slug: slugSchema,
  summary: z.string().trim().min(20).max(4000),
  content: z.object({
    html: z.string().trim().min(40),
    description: z.string().trim().min(20).max(8000).optional(),
    key_features: z.array(z.string().trim().min(2).max(500)).max(30).default([]),
    technologies_used: z.array(z.string().trim().min(1).max(100)).max(100).default([]),
    design_highlights: z.array(z.string().trim().min(2).max(500)).max(30).default([]),
  }),
  featuredImageAlt: z.string().trim().min(3).max(255),
  imageCaption: z.string().trim().max(1000).optional(),
  metaTitle: z.string().trim().min(10).max(255),
  metaDescription: z.string().trim().min(30).max(500),
});

export const gzlCrmProjectCreateSchema = z.object({
  contractVersion: z.literal('1.0'),
  operation: z.literal('create'),
  // externalId dosya yoluna girer (uploads/integrations/gzl-crm/projects/<id>/): `..` ve
  // nokta ile baslayan deger yukari dizine yazmaya izin verirdi.
  externalId: z.string().trim().min(2).max(128).regex(/^[a-zA-Z0-9][a-zA-Z0-9._:-]*$/)
    .refine((v) => !v.includes('..'), 'external_id_invalid'),
  project: z.object({
    category: z.string().trim().min(2).max(100),
    clientName: z.string().trim().min(2).max(255).nullable().optional(),
    websiteUrl: z.string().url().max(500).nullable().optional(),
    demoUrl: z.string().url().max(500).nullable().optional(),
    repositoryUrl: z.string().url().max(500).nullable().optional(),
    services: z.array(z.string().trim().min(1).max(100)).max(50).default([]),
    technologies: z.array(z.string().trim().min(1).max(100)).max(100).default([]),
    featured: z.boolean().default(false),
    displayOrder: z.number().int().min(0).max(100000).default(0),
  }),
  translations: z.object({
    tr: translationSchema,
    en: translationSchema,
    de: translationSchema,
  }),
  publication: z.object({
    status: z.enum(['draft', 'published']).default('draft'),
    displayPermission: z.boolean(),
    imageRightsConfirmed: z.boolean(),
  }),
});

export type GzlCrmProjectCreate = z.infer<typeof gzlCrmProjectCreateSchema>;

export const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
] as const;

export type AcceptedImageMimeType = (typeof ACCEPTED_IMAGE_MIME_TYPES)[number];

export const MAX_PROJECT_IMAGE_BYTES = 12 * 1024 * 1024;

export function imageExtension(mimeType: AcceptedImageMimeType): string {
  if (mimeType === 'image/jpeg') return 'jpg';
  if (mimeType === 'image/png') return 'png';
  if (mimeType === 'image/webp') return 'webp';
  return 'avif';
}

export function hasValidImageSignature(bytes: Buffer, mimeType: AcceptedImageMimeType): boolean {
  if (mimeType === 'image/jpeg') {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mimeType === 'image/png') {
    return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  }
  if (mimeType === 'image/webp') {
    return bytes.length >= 12 && bytes.subarray(0, 4).toString('ascii') === 'RIFF' && bytes.subarray(8, 12).toString('ascii') === 'WEBP';
  }
  return bytes.length >= 12 && bytes.subarray(4, 12).toString('ascii').startsWith('ftypavi');
}
