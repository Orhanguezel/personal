import { cookies } from 'next/headers';
import { BASE_URL } from '@/integrations/apiBase';
export async function previewFor(kind: string, slug: string) {
  const token = (await cookies()).get('content_preview')?.value;
  if (!token) return null;
  const r = await fetch(`${BASE_URL}/content/preview`, {
    cache: 'no-store',
    headers: { 'x-content-preview': token },
  });
  if (!r.ok) return null;
  const preview = await r.json();
  return preview.kind === kind && preview.data.slug === slug ? preview.data : null;
}
