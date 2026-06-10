import type { ReactNode } from 'react';
import { getUiHomeServer } from '@/utils/publicLists.server';

export default async function Head({ params }: { params: { locale: string } }): Promise<ReactNode> {
  const ui = await getUiHomeServer({ locale: params.locale });
  const hero = String(ui.home1.hero_image || '').trim();

  if (!hero) return null;

  return (
    <>
      <link rel="preload" as="image" href={hero} />
    </>
  );
}
