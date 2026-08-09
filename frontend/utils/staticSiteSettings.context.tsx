'use client';

// =============================================================
// FILE: utils/staticSiteSettings.context.tsx
//
// ARAYUZ METINLERI ICIN SUNUCUDA HAZIR DEGER
//
// SORUN: `useStaticSiteSetting` degerleri `useEffect` icinde `fetch` ile
// aliyordu. useEffect yalnizca TARAYICIDA calisir; sunucu render'inda deger
// `undefined` kalir ve bilesenler kodda gomulu VARSAYILAN metinlere duser.
// O varsayilanlar Guezel Web Design icin ALMANCA yazilmisti — sonucta
// gzlteknoloji.com'un Turkce sayfalarinda, tarayicilarin gordugu HTML'de
// "Digitale Ideen werden zu schnellen, klaren Web-Erlebnissen" gibi baska bir
// markanin Almanca basligi yer aliyordu. Ziyaretci hidrasyondan sonra dogru
// metni goruyordu; arama motoru ve yapay zeka tarayicilari ise gormuyordu.
//
// COZUM: ayarlarin tamami (public/ui/<locale>.json) sunucu bileseninde okunup
// bu saglayiciya prop olarak veriliyor. Hook once buradan okuyor; boylece
// deger ILK render'da, yani SSR ciktisinda hazir oluyor. Ag istegi yalnizca
// saglayici bulunamazsa (eski sayfalar) devreye giriyor.
// =============================================================

import { createContext, useContext, type ReactNode } from 'react';

export type StaticSettingsMap = Record<string, unknown>;

const StaticSiteSettingsContext = createContext<StaticSettingsMap | null>(null);

export function StaticSiteSettingsProvider({
  value,
  children,
}: {
  value: StaticSettingsMap;
  children: ReactNode;
}) {
  return (
    <StaticSiteSettingsContext.Provider value={value}>
      {children}
    </StaticSiteSettingsContext.Provider>
  );
}

export function useStaticSiteSettingsMap(): StaticSettingsMap | null {
  return useContext(StaticSiteSettingsContext);
}
