'use client';
import { type ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { baseApi } from '@/integrations/baseApi';
const api = baseApi.injectEndpoints({
  endpoints: (b) => ({
    mediaScopeStatus: b.query<any, void>({ query: () => '/admin/shared-content/status' }),
  }),
});
export default function MediaScopeBoundary({ children }: { children: ReactNode }) {
  const path = usePathname(),
    search = useSearchParams();
  const active = path === '/admin/storage';
  const status = api.useMediaScopeStatusQuery(undefined, { skip: !active });
  if (!active || !status.data?.enabled) return <>{children}</>;
  const site = search.get('media_scope') === 'site';
  const readOnly = !site && !status.data.writer;
  return (
    <>
      <section className="mb-5 space-y-2 rounded border p-4">
        <strong>{site ? 'Bu sitenin dosyaları' : 'Ortak editoryal dosyalar'}</strong>
        <p className="text-sm">
          Logo, favicon ve ülkeye ait dosyalar bu sitede kalır. Ortak içerikte kullanılan görseller
          iki sitede aynı dosyadan sunulur.
        </p>
        <nav className="flex flex-wrap gap-4">
          <a className="underline" href="/admin/storage">
            Ortak editoryal dosyalar
          </a>
          <a className="underline" href="/admin/storage?media_scope=site">
            Bu sitenin dosyaları
          </a>
        </nav>
        {readOnly && (
          <p>
            Ortak görseller burada salt okunurdur.{' '}
            <a className="underline" href="https://panel.guezelwebdesign.com/admin/storage">
              Ortak dosya yönetimini aç
            </a>
          </p>
        )}
      </section>
      <fieldset className="min-w-0" disabled={readOnly}>
        {children}
      </fieldset>
    </>
  );
}
