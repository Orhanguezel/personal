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
  const filename = FILE_BY_LOCALE[normalizedLocale];
  const filePath = path.join(process.cwd(), 'public', filename);
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=300',
    },
  });
}
