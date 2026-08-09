'use client';

import * as React from 'react';
import type { AuthMeNormalized } from '@/integrations/shared';

const AdminSessionContext = React.createContext<AuthMeNormalized | null>(null);

export function AdminSessionProvider({ me, children }: { me: AuthMeNormalized; children: React.ReactNode }) {
  return <AdminSessionContext.Provider value={me}>{children}</AdminSessionContext.Provider>;
}

export function useAdminSession(): AuthMeNormalized {
  const me = React.useContext(AdminSessionContext);
  if (!me) throw new Error('useAdminSession must be used inside AdminSessionProvider');
  return me;
}
