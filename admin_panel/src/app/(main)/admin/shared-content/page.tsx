'use client';
import { useState } from 'react';
import SharedContentBoundary from '@/features/shared-content/SharedContentBoundary';
import { baseApi } from '@/integrations/baseApi';
const api = baseApi.injectEndpoints({
  endpoints: (b) => ({
    sharedEntries: b.query<any[], string>({
      query: (kind) => '/admin/shared-content/entries?kind=' + kind,
    }),
    sharedOverview: b.query<any, void>({ query: () => '/admin/shared-content/overview' }),
    sharedProfiles: b.query<any[], void>({ query: () => '/admin/shared-content/site-profiles' }),
  }),
});
export default function Page() {
  const [kind, setKind] = useState('projects');
  const [id, setId] = useState('');
  const entries = api.useSharedEntriesQuery(kind);
  const q = api.useSharedOverviewQuery();
  const profiles = api.useSharedProfilesQuery();
  const names: Record<string, string> = {
    categories: 'Kategoriler',
    subcategories: 'Alt kategoriler',
    projects: 'Projeler',
    services: 'Hizmetler',
    products: 'Ürünler',
    blog: 'Blog',
    faqs: 'Sık sorulan sorular',
    pricing: 'Fiyat planları',
    brands: 'Markalar',
    resume: 'Özgeçmiş',
    'skill-counters': 'Beceri sayaçları',
    'skill-logos': 'Beceri logoları',
  };
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Ortak yayın merkezi</h1>
      <p>
        Tek içerik kaynağı, iki marka. Türkçe kaynak ile Almanca ve İngilizce çeviriler ortak
        kayıtta yönetilir. İletişim, yasal bilgiler, hesaplar ve siparişler her sitede ayrıdır.
      </p>
      {q.isLoading && <p>Yükleniyor…</p>}
      {q.error && <p role="alert">Ortak içerik kaynağına erişilemiyor. Yeniden deneyin.</p>}
      <section className="space-y-3">
        <h2 className="font-semibold">İçerik seç ve yayın durumunu yönet</h2>
        <select
          aria-label="Ortak modül"
          className="border rounded p-2"
          value={kind}
          onChange={(e) => {
            setKind(e.target.value);
            setId('');
          }}
        >
          {Object.entries(names).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          aria-label="Ortak içerik"
          className="border rounded p-2 max-w-full"
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          <option value="">İçerik seçin</option>
          {entries.data?.map((r) => (
            <option key={r.id} value={r.id}>
              {r.state==='deleted'?'Silinmiş · ':''}{r.editor_title || r.code || r.client_name || r.organization || r.id} · r{r.revision}
            </option>
          ))}
        </select>
        {id && (
          <SharedContentBoundary key={kind + id} kindOverride={kind} idOverride={id}>
            {null}
          </SharedContentBoundary>
        )}
      </section>
      <div className="overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {['Modül', 'Toplam', 'Yayında', 'Taslak', 'Kaldırılan', 'Silinen'].map((h) => (
                <th className="p-2" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {q.data?.modules.map((m: any) => (
              <tr key={m.kind}>
                {[names[m.kind] || m.kind, m.total, m.live, m.pending, m.withdrawn, m.deleted].map((v, i) => (
                  <td className="border-t p-2" key={i}>
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm">Yeni taslağı bulunan bir yayın, hem yayında hem taslak sayısına dahildir.</p>
      <p>Doğrulama bekleyen yayın işlemi: {q.data?.pending_deliveries ?? '—'}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {profiles.data?.map((p) => (
          <section className="rounded border p-4" key={p.site_id}>
            <h2 className="font-semibold">{p.profile.brand}</h2>
            <p>{p.profile.origin}</p>
            <p>Yayın dilleri: {p.profile.publicLocales.join(', ')}</p>
            <p>
              Marka ve iletişim ayarları:{' '}
              <a
                className="underline"
                href={
                  p.site_id === 'gwd'
                    ? 'https://panel.guezelwebdesign.com/admin/site-settings'
                    : 'https://panel.gzlteknoloji.com/admin/site-settings'
                }
              >
                İlgili sitenin ayarlarını aç
              </a>
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
