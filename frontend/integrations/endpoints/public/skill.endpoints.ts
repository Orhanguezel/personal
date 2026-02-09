// ===================================================================
// FILE: frontend/src/integrations/endpoints/skill.endpoints.ts
// FINAL — Public skills endpoints
// - base: /skills
// - unwrap tolerant
// - NO default_locale param
// ===================================================================

import { baseApi } from '@/integrations/baseApi';
import type { SkillsGroupedResponse, SkillListParams } from '@/integrations/shared/skill';
import { unwrap, toPublicSkillQuery } from '@/integrations/shared/skill';

const BASE = '/skills';

export const skillPublicApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    // GET /skills?locale=xx => grouped response
    getSkills: b.query<SkillsGroupedResponse, SkillListParams | void>({
      query: (p) => ({ url: BASE, params: toPublicSkillQuery(p) }),
      transformResponse: (raw: any) => unwrap<SkillsGroupedResponse>(raw),
      providesTags: () => [{ type: 'Skill' as const, id: 'PUBLIC' }],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSkillsQuery } = skillPublicApi;
