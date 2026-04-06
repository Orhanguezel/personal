'use client';

// =============================================================
// FILE: src/app/(main)/admin/_components/common/useAdminUiCopy.ts
// FINAL — Admin UI copy hook (site_settings.ui_admin)
// =============================================================

import { useMemo } from 'react';

import { normLocaleTag } from '@/i18n/localeUtils';
import { useGetDefaultLocaleAdminQuery, useGetSiteSettingAdminByKeyQuery } from '@/integrations/hooks';
import type { AdminUiCopy } from '@/integrations/shared';
import { normalizeAdminUiCopy } from '@/integrations/shared';

type UseAdminUiCopyResult = {
  copy: AdminUiCopy;
  loading: boolean;
  fetching: boolean;
  error?: unknown;
};

export function useAdminUiCopy(): UseAdminUiCopyResult {
  const defaultLocaleQ = useGetDefaultLocaleAdminQuery();
  const locale = useMemo(
    () => normLocaleTag(defaultLocaleQ.data) || undefined,
    [defaultLocaleQ.data],
  );

  const q = useGetSiteSettingAdminByKeyQuery(
    { key: 'ui_admin', ...(locale ? { locale } : {}) },
    { skip: defaultLocaleQ.isLoading },
  );

  const copy = useMemo(() => {
    const val = (q.data as any)?.value;
    return normalizeAdminUiCopy(val);
  }, [q.data]);

  return {
    copy,
    loading: defaultLocaleQ.isLoading || q.isLoading,
    fetching: q.isFetching,
    error: q.error ?? defaultLocaleQ.error,
  };
}
