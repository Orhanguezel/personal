'use client';

// =============================================================
// FILE: components/admin/seo/quality-badge.tsx
//
// Liste satirlarinda gosterilen iki kucuk gosterge:
//
//   QualityBadge      — backend'in hesapladigi SEO/icerik kalite puani.
//                       Kaynak: shared-backend/modules/customPages/seo-quality.ts
//                       (woody'nin blog puanlayicisi). Rozetin kendisi de
//                       woody'deki QualityBadge ile ayni.
//
//   IndexabilityBadge — kaydin ARAMA MOTORUNA ACIK olup olmadigi. Bu, Google'in
//                       sayfayi gercekten indeksleyip indekslemedigi DEGILDIR
//                       (o bilgi Search Console API'si ister); burada
//                       yayindaki/URL'i olan/noindex olmayan kayitlar "acik"
//                       sayilir. Yani "indekslenebilir mi" sorusunun cevabi.
//                       Puan yuksek ama sayfa taslak ise icerik hicbir ise
//                       yaramaz — iki gostergenin yan yana durmasinin sebebi bu.
// =============================================================

import * as React from 'react';
import { EyeOff, Gauge, Globe, PenLine } from 'lucide-react';

import type { BlogSeoQualityScore } from '@/integrations/shared';

export function QualityBadge({ q }: { q?: BlogSeoQualityScore | null }) {
  if (!q) return <span className="text-xs text-muted-foreground">—</span>;
  const tone =
    q.level === 'ready'
      ? 'bg-gm-success/10 text-gm-success border-gm-success/20'
      : q.level === 'publishable'
        ? 'bg-gm-gold/10 text-gm-gold border-gm-gold/20'
        : 'bg-gm-error/10 text-gm-error border-gm-error/20';
  return (
    <span
      title={`SEO ${q.score}/100 · ${q.word_count} kelime${q.gate_passed ? '' : ' · sert kapı kaldı'}`}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold tabular-nums ${tone}`}
    >
      <Gauge className="size-3" />
      {q.score}
    </span>
  );
}

export type IndexabilityInput = {
  /** Yayin durumu: is_published / isActive / status alanlarindan biri */
  published?: boolean | null;
  /** URL uretilebiliyor mu */
  slug?: string | null;
  /** Meta robots noindex isaretli mi */
  noindex?: boolean | null;
};

type IndexState = { label: string; tone: string; Icon: typeof Globe; title: string };

export function indexabilityOf(input: IndexabilityInput): IndexState {
  if (input.noindex) {
    return {
      label: 'noindex',
      tone: 'bg-gm-error/10 text-gm-error border-gm-error/20',
      Icon: EyeOff,
      title: 'Meta robots noindex — arama motorlarına kapalı',
    };
  }
  if (!input.published) {
    return {
      label: 'Taslak',
      tone: 'bg-gm-gold/10 text-gm-gold border-gm-gold/20',
      Icon: PenLine,
      title: 'Yayında değil — indekslenmez',
    };
  }
  if (!String(input.slug ?? '').trim()) {
    return {
      label: 'URL yok',
      tone: 'bg-gm-error/10 text-gm-error border-gm-error/20',
      Icon: EyeOff,
      title: 'Slug boş — sayfanın kanonik adresi yok',
    };
  }
  return {
    label: 'İndekslenebilir',
    tone: 'bg-gm-success/10 text-gm-success border-gm-success/20',
    Icon: Globe,
    title: 'Yayında, URL var, noindex yok — sitemap üzerinden taranabilir',
  };
}

export function IndexabilityBadge(props: IndexabilityInput) {
  const { label, tone, Icon, title } = indexabilityOf(props);
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${tone}`}
    >
      <Icon className="size-3" />
      {label}
    </span>
  );
}
