'use client';

// =============================================================
// FILE: src/app/(main)/admin/_components/common/useAdminUiCopy.ts
// FINAL — Admin UI copy hook (site_settings.ui_admin)
// =============================================================

import { useMemo } from 'react';

import { normLocaleTag } from '@/i18n/localeUtils';
import { usePreferencesStore } from '@/stores/preferences/preferences-provider';
import { useGetSiteSettingAdminByKeyQuery } from '@/integrations/hooks';
import type { AdminUiCopy } from '@/integrations/shared';
import { normalizeAdminUiCopy } from '@/integrations/shared';

type UseAdminUiCopyResult = {
  copy: AdminUiCopy;
  loading: boolean;
  fetching: boolean;
  error?: unknown;
};

export function useAdminUiCopy(): UseAdminUiCopyResult {
  const adminLocale = usePreferencesStore((s) => s.adminLocale);
  const locale = normLocaleTag(adminLocale) || 'tr';

  const q = useGetSiteSettingAdminByKeyQuery(
    { key: 'ui_admin', locale },
  );

  const copy = useMemo(() => {
    const val = (q.data as any)?.value;
    return normalizeAdminUiCopy(val);
  }, [q.data]);

  return {
    copy,
    loading: q.isLoading,
    fetching: q.isFetching,
    error: q.error,
  };
}
