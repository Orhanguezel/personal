import { readFile } from 'node:fs/promises';
import path from 'node:path';

const FILE_BY_LOCALE: Record<string, string> = {
  tr: 'orhan-guzel-cv-tr-2026.pdf',
  en: 'orhan-guzel-cv-en-2026.pdf',
  de: 'orhan-guzel-cv-de-2026.pdf',
};

function resolveLocale(locale?: string): string {
  const normalized = String(locale || '')
    .trim()
    .toLowerCase()
    .slice(0, 2);

  return FILE_BY_LOCALE[normalized] ? normalized : 'en';
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string }> },
) {
  const { locale } = await context.params;
  const normalizedLocale = resolveLocale(locale);
  const requestedFilename = FILE_BY_LOCALE[normalizedLocale];
  let filename = requestedFilename;
  let file: Buffer;

  try {
    file = await readFile(path.join(process.cwd(), 'public', filename));
  } catch {
    filename = FILE_BY_LOCALE.en;
    try {
      file = await readFile(path.join(process.cwd(), 'public', filename));
    } catch {
      return new Response('CV file not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }
  }

  return new Response(new Uint8Array(file), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
