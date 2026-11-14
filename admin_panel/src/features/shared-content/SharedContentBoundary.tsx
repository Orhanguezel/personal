'use client';
import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { baseApi } from '@/integrations/baseApi';
const api = baseApi.injectEndpoints({
  endpoints: (b) => ({
    sharedRead: b.query<any, string>({ query: (url) => ({ url }) }),
    sharedCommand: b.mutation<any, { url: string; body: any; method?: string }>({
      query: ({ url, body, method }) => ({ url, body, method: method || 'POST' }),
    }),
  }),
});
const kinds: Record<string, string> = {
  categories: 'categories',
  subcategories: 'subcategories',
  projects: 'projects',
  services: 'services',
  products: 'products',
  custompage: 'blog',
  blog: 'blog',
  skills: 'skill-counters',
  faqs: 'faqs',
  pricing: 'pricing',
  brands: 'brands',
  resume: 'resume',
  'skill-counters': 'skill-counters',
  'skill-logos': 'skill-logos',
};
export default function SharedContentBoundary({
  children,
  kindOverride,
  idOverride,
}: {
  children: ReactNode;
  kindOverride?: string;
  idOverride?: string;
}) {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean);
  const kind = kindOverride || kinds[segments[1]];
  const key = idOverride || segments[2];
  const status = api.useSharedReadQuery('/admin/shared-content/status');
  const detail = api.useSharedReadQuery(
    `/admin/${kind === 'blog' ? 'custom_pages' : kind === 'pricing' ? 'pricing/plans' : kind === 'resume' ? 'resume-entries' : kind}/${key && !/^[a-f0-9-]{36}$/.test(key) ? 'by-slug/' : ''}${encodeURIComponent(key || '')}`,
    { skip: !!idOverride || kind !== 'blog' || !key || key === 'new' || !status.data?.enabled },
  );
  const identify = api.useSharedReadQuery(
    '/admin/shared-content/identify?' + new URLSearchParams({ kind: kind || '', key: key || '' }),
    { skip: !!idOverride || !kind || !key || key === 'new' || !status.data?.enabled },
  );
  const id = idOverride || identify.data?.id || detail.data?.id;
  const root = id ? `/admin/shared-content/entries/${kind}/${id}` : '';
  const meta = api.useSharedReadQuery(root, {
    skip: !root,
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });
  const history = api.useSharedReadQuery(root + '/revisions', { skip: !root });
  const [command, { isLoading }] = api.useSharedCommandMutation();
  const [message, setMessage] = useState('');
  const [offer, setOffer] = useState('');
  const [country, setCountry] = useState('gwd');
  useEffect(() => {
    setMessage('');
  }, [path]);
  if (
    !kind ||
    !status.data?.enabled ||
    (kind === 'blog' && detail.data && detail.data.module_key !== 'blog')
  )
    return <>{children}</>;
  const writer = status.data.writer;
  const m = meta.data;
  async function act(action: string, body: any = {}, method = 'POST') {
    try {
      await command({
        url: root + '/' + action,
        body: { expected_revision: m.revision, ...body },
        method,
      }).unwrap();
      setMessage('İşlem tamamlandı. Yayın doğrulama durumunu kontrol edin.');
      await meta.refetch();
      await history.refetch();
    } catch (e: any) {
      const reason = e?.data?.error?.message || e?.data?.message || 'İşlem tamamlanamadı';
      setMessage(
        (
          {
            offer_revision_conflict:
              'Fiyat başka bir sekmede değişti. Yenileyip tekrar kontrol edin.',
            revision_conflict: 'Kayıt başka bir sekmede değişti. Sayfayı yenileyin.',
            translation_approval_required:
              'Yayınlamak için Türkçe, Almanca ve İngilizce çevirileri tamamlayıp onaylayın.',
          } as any
        )[reason] || reason,
      );
    }
  }
  return (
    <>
      <section className="mb-5 rounded-lg border p-4 space-y-3" aria-label="Ortak içerik yönetimi">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <strong>Ortak içerik · Almanya ve Türkiye</strong>
          <a className="underline" href="/admin/shared-content">
            Yayın merkezi
          </a>
        </div>
        <p className="text-sm">
          Kaydetme taslak oluşturur. “İki sitede yayınla” onaylı sürümü iki markada yayınlar.
          Yayından kaldırma iki siteye uygulanır.
        </p>
        {!writer && (
          <p role="status">
            Bu panel ortak içerikte salt okunur.{' '}
            <a className="underline" href={status.data.editor_origin + path}>
              Türkçe ortak yönetim panelini aç
            </a>
          </p>
        )}
        {m && (
          <>
            <p>
              Taslak revizyonu: {m.revision} · Yayındaki revizyon: {m.published_revision ?? 'Yok'} ·{' '}
              {m.live ? 'Yayında' : 'Yayında değil'}
            </p>
            <div className="flex flex-wrap gap-2">
              {['tr', 'de', 'en'].map((locale) => (
                <button
                  key={locale}
                  type="button"
                  disabled={!writer || isLoading}
                  className="rounded border px-3 py-2 disabled:opacity-50"
                  onClick={() => act('approve', { locale })}
                >
                  {locale.toUpperCase()}:{' '}
                  {m.translations.find((t: any) => t.locale === locale)?.status === 'approved'
                    ? 'Onaylı'
                    : 'İnceleme gerekli'}{' '}
                  · Onayla
                </button>
              ))}
              <button
                type="button"
                disabled={!writer || isLoading}
                className="rounded border bg-primary text-primary-foreground px-3 py-2"
                onClick={() => act('publish')}
              >
                Kaydedilmiş sürümü iki sitede yayınla
              </button>
              <button
                type="button"
                disabled={!writer || isLoading || !m.live}
                className="rounded border px-3 py-2"
                onClick={() => act('withdraw')}
              >
                İki siteden kaldır
              </button>
            </div>
            <p className="text-sm">
              {m.delivery
                .map(
                  (d: any) =>
                    `${d.site_id === 'gwd' ? 'Almanya' : 'Türkiye'}: ${d.state === 'verified' ? 'Doğrulandı' : 'Doğrulama bekliyor'} (r${d.revision})`,
                )
                .join(' · ') || 'Henüz yayın teslim kaydı yok.'}
            </p>
            {['projects', 'services', 'products', 'blog'].includes(kind) && (
              <div className="flex flex-wrap gap-3">
                {[
                  { site: 'gwd', locale: 'de', label: 'Almanya önizlemesi' },
                  { site: 'gwd', locale: 'en', label: 'İngilizce önizleme' },
                  { site: 'gzl', locale: 'tr', label: 'Türkiye önizlemesi' },
                ].map((target) => (
                  <button
                    type="button"
                    className="underline"
                    disabled={isLoading || !writer}
                    key={target.locale}
                    onClick={async () => {
                      try {
                        const response = await command({
                          url: root + '/preview',
                          body: target,
                        }).unwrap();
                        const form = document.createElement('form');
                        form.method = 'POST';
                        form.action = response.action;
                        form.target = '_blank';
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = 'token';
                        input.value = response.token;
                        form.append(input);
                        document.body.append(form);
                        form.submit();
                        form.remove();
                      } catch {
                        setMessage('Önizleme açılamadı. Çeviriyi kontrol edin.');
                      }
                    }}
                  >
                    {target.label}
                  </button>
                ))}
              </div>
            )}
            <details>
              <summary>Sürüm geçmişi</summary>
              <ul>
                {history.data?.map((r: any) => (
                  <li key={r.revision} className="flex gap-3 py-2">
                    r{r.revision} · {r.created_at}
                    <button
                      type="button"
                      disabled={!writer || isLoading || r.is_deleted===true || r.is_deleted===1}
                      className="underline"
                      onClick={() => act('restore', { target_revision: r.revision })}
                    >
                      {r.is_deleted?'Silme kaydı':'Taslak olarak geri yükle'}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
            {['projects', 'services', 'products', 'pricing'].includes(kind) && (
              <details>
                <summary>Ülkeye özel fiyatlar</summary>
                <p className="text-sm">
                  Tutarlar ülkeye aittir. Para birimi dönüşümü yapılmaz. Kaydetmeden önce alanları
                  ve tutarları kontrol edin.
                </p>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setOffer(
                      JSON.stringify(
                        m.offers.find((o: any) => o.site_id === e.target.value)?.offer || {},
                        null,
                        2,
                      ),
                    );
                  }}
                >
                  <option value="gwd">Almanya</option>
                  <option value="gzl">Türkiye</option>
                </select>
                <textarea
                  aria-label="Ülke fiyat alanları"
                  className="block w-full border p-2 font-mono"
                  rows={7}
                  value={
                    offer ||
                    JSON.stringify(
                      m.offers.find((o: any) => o.site_id === country)?.offer || {},
                      null,
                      2,
                    )
                  }
                  onChange={(e) => setOffer(e.target.value)}
                />
                <button
                  type="button"
                  disabled={!writer || isLoading}
                  onClick={() => {
                    try {
                      void act(
                        'offers/' + country,
                        {
                          expected_offer_revision: Number(
                            m.offers.find((o: any) => o.site_id === country)?.revision || 0,
                          ),
                          offer: JSON.parse(
                            offer ||
                              JSON.stringify(
                                m.offers.find((o: any) => o.site_id === country)?.offer || {},
                              ),
                          ),
                        },
                        'PUT',
                      );
                    } catch {
                      setMessage('Geçerli JSON girin.');
                    }
                  }}
                >
                  Ülke fiyatını kaydet
                </button>
              </details>
            )}
          </>
        )}
        {message && (
          <p role="status" className="text-sm">
            {message}
          </p>
        )}
      </section>
      <fieldset disabled={!writer} className="min-w-0">
        {children}
      </fieldset>
    </>
  );
}
