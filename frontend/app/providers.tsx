// =============================================================
// FILE: frontend/app/providers.tsx
// FINAL — Redux Provider for App Router (RTK + RTK Query)
// - Uses singleton store from src/store/index.ts
// =============================================================

'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
