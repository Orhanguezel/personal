// =============================================================
// FILE: frontend/app/layout.tsx
// FINAL — Global assets (CSS) + fonts + fallback metadata
// - Root MUST return <html><body> for stability in Next 16
// - Locale-specific <html lang> will be managed in /[locale] segment via metadata/lang sync
// - Fallback favicon provided here, will be overridden by locale-specific metadata
// =============================================================

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Urbanist, Playfair_Display, DM_Mono } from 'next/font/google';
import '@/public/assets/css/vendors/bootstrap.min.css';
import '@/public/assets/css/vendors/swiper-bundle.min.css';
import '@/public/assets/css/vendors/carouselTicker.css';
import '@/public/assets/css/vendors/magnific-popup.css';
import '@/public/assets/fonts/remixicon/remixicon.css';
import '@/public/assets/css/main.css';

const urbanist = Urbanist({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--urbanist',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--playpair',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--dmMono',
  display: 'swap',
});

const fontVars = `${urbanist.variable} ${playfairDisplay.variable} ${dmMono.variable}`;

// Fallback metadata (will be overridden by locale/page-specific metadata)
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/assets/imgs/favicon.png', sizes: '32x32' },
      { url: '/assets/imgs/favicon.png', sizes: '16x16' },
    ],
    apple: [{ url: '/assets/imgs/apple-touch-icon.png' }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={fontVars} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
