// =============================================================
// FILE: src/app/layout.tsx
// FINAL — RootLayout (fix hydration mismatch)
// - ThemeBootScript runs before interactive via next/script
// - suppressHydrationWarning on html + body to tolerate extension-added attrs
// - Avoid server/client className drift on <html>
// =============================================================

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { cookies, headers } from 'next/headers';

import { Toaster } from '@/components/ui/sonner';
import { getPanelBrand } from '@/config/app-config';
import { fontVars } from '@/lib/fonts/registry';
import { PREFERENCE_DEFAULTS } from '@/lib/preferences/preferences-config';

import StoreProvider from '@/stores/Provider';
import { PreferencesStoreProvider } from '@/stores/preferences/preferences-provider';

import './globals.css';

// Marka koda gomulu DEGIL: deployment'in kendi ayarindan okunur.
// Bkz. src/config/app-config.ts — onceden burada baska bir musterinin adi vardi.
export async function generateMetadata(): Promise<Metadata> {
  const brand = await getPanelBrand();
  return { title: brand.title, description: brand.description };
}

function ThemeBootInlineScript() {
  const {
    theme_mode,
    theme_preset,
    content_layout,
    navbar_style,
    sidebar_variant,
    sidebar_collapsible,
    font,
  } = PREFERENCE_DEFAULTS;

  /**
   * Not:
   * - Extension’lar <body> üzerinde attribute ekleyebilir (cz-shortcut-listen gibi).
   * - Bu script, theme class’ı React hydration’dan önce oturtur.
   */
  const code = `
(function () {
  try {
    var d = document.documentElement;

    // defaults (server ile aynı snapshot)
    d.dataset.themePreset = ${JSON.stringify(theme_preset)};
    d.dataset.contentLayout = ${JSON.stringify(content_layout)};
    d.dataset.navbarStyle = ${JSON.stringify(navbar_style)};
    d.dataset.sidebarVariant = ${JSON.stringify(sidebar_variant)};
    d.dataset.sidebarCollapsible = ${JSON.stringify(sidebar_collapsible)};
    d.dataset.font = ${JSON.stringify(font)};

    // localStorage overrides (if exists)
    var lsMode = localStorage.getItem('theme_mode');
    var mode = (lsMode === 'dark' || lsMode === 'light') ? lsMode : ${JSON.stringify(theme_mode)};
    if (mode === 'dark') d.classList.add('dark');
    else d.classList.remove('dark');

  } catch (e) {}
})();
`;

  return (
    <Script id="theme-boot" strategy="beforeInteractive">
      {code}
    </Script>
  );
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { theme_preset, content_layout, navbar_style, sidebar_variant, sidebar_collapsible, font } =
    PREFERENCE_DEFAULTS;
  const host = String((await headers()).get('host') || '').toLowerCase();
  const savedLocale = String((await cookies()).get('admin_locale')?.value || '').toLowerCase();
  const adminLocale = ['tr', 'en', 'de'].includes(savedLocale)
    ? savedLocale
    : host.includes('gzlteknoloji')
      ? 'tr'
      : 'de';

  return (
    <html
      lang={adminLocale}
      // html/body hydration mismatch’lerini tolere et (extension + theme class)
      suppressHydrationWarning
      data-theme-preset={theme_preset}
      data-content-layout={content_layout}
      data-navbar-style={navbar_style}
      data-sidebar-variant={sidebar_variant}
      data-sidebar-collapsible={sidebar_collapsible}
      data-font={font}
    >
      <body className={`${fontVars} min-h-screen antialiased`} suppressHydrationWarning>
        <ThemeBootInlineScript />

        {/* Redux store gerekiyorsa kalsın */}
        <StoreProvider>
          {/* Preferences Zustand */}
          <PreferencesStoreProvider init={{ adminLocale }}>
            {children}
            <Toaster />
          </PreferencesStoreProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
