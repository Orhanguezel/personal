// =============================================================
// FILE: src/seo/BreadcrumbJsonLd.tsx
// FINAL — Safe Breadcrumb JSON-LD
// =============================================================

import React from 'react';
import { absoluteUrl, compact, safeJsonLdStringify } from '@/integrations/shared';



export default function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const absolutized = items.map((it) => ({
    name: String(it.name || '').trim(),
    url: absoluteUrl(it.url),
  }));

  const data = compact({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: absolutized.map((it, i) =>
      compact({
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
        item: it.url,
      }),
    ),
  });

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(data) }}
    />
  );
}
