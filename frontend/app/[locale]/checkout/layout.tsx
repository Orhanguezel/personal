// =============================================================
// FILE: frontend/app/[locale]/checkout/layout.tsx
// Checkout alt agacinin TAMAMI dinamik.
//
// NEDEN (2026-08-09):
//   Checkout sayfalari (odeme, success, cancel) sepet/siparis durumuna ve
//   `useSearchParams()`'a bagli — statik uretilecek sayfalar degiller.
//
//   Bu daha once GORUNMUYORDU: layout'taki SEO katmani locale'i cookies()/
//   headers() ile cozdugu icin TUM rotalar dolayli olarak dinamikti. O
//   bagimlilik kaldirilinca (detay sayfalarini 500'den kurtarmak icin) Next
//   checkout sayfalarini prerender etmeye calisti ve
//   "useSearchParams() should be wrapped in a suspense boundary" hatasiyla
//   BUILD'I KIRDI.
//
//   Tek tek sayfa isaretlemek yerine alt agac burada isaretleniyor; yeni
//   eklenen checkout sayfalari da otomatik kapsanir.
// =============================================================

import type { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
