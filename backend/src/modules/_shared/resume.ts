
import { resumeEntries } from '@/modules/resume/schema';
import { z } from 'zod';

export type ResumeMerged = {
  id: string;
  type: 'education' | 'experience';
  is_active: boolean;
  display_order: number;

  start_date: string; // YYYY-MM-DD
  end_date: string | null;
  is_current: boolean;

  location: string | null;
  organization: string | null;

  score_value: string | null; // decimal comes as string in mysql
  score_scale: number;

  // i18n merged
  locale: string;
  title: string;
  subtitle: string;
  description: string | null;
  highlights: string[]; // parsed from highlights_json
  slug: string;

  created_at?: string;
  updated_at?: string;
};

export function parseHighlights(v: unknown): string[] {
  if (!v) return [];
  const s = String(v).trim();
  if (!s) return [];
  try {
    const x = JSON.parse(s);
    if (Array.isArray(x)) return x.map((t) => String(t));
  } catch {}
  // fallback: split
  return s
    .split(/[;\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

export const RESUME_TYPE = z.enum(['education', 'experience']);
export type ResumeType = z.infer<typeof RESUME_TYPE>;

// ---------- helpers
export const ISO_DATE = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'invalid_date')
  .transform((s) => s);

// "highlights" FE’den string[] gelirse DB’ye JSON string yazacağız.
// Admin body: highlights?: string[] | string
export const HIGHLIGHTS_INPUT = z
  .union([z.array(z.string().trim().min(1)).max(50), z.string().trim().min(2)])
  .optional()
  .transform((v) => {
    if (!v) return undefined;
    if (Array.isArray(v)) return JSON.stringify(v);
    // string ise: JSON string bekliyoruz ama "a,b" gibi gelirse de toparlayalım
    const s = String(v).trim();
    if (!s) return undefined;
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return JSON.stringify(parsed.map((x) => String(x)));
    } catch {
      // csv fallback
      const arr = s
        .split(/[;,]+/)
        .map((x) => x.trim())
        .filter(Boolean);
      return JSON.stringify(arr);
    }
    return s;
  });
