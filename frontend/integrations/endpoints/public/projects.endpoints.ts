// ---------------------------------------------------------------------
// FILE: src/integrations/endpoints/projects.endpoints.ts
// FINAL — getProjectBySlugPublic supports include=images (object args)
// ---------------------------------------------------------------------
import { baseApi } from '@/integrations/baseApi';
import type {
  Project,
  ProjectImage,
  ProjectListParams,
  GetProjectBySlugArgs,
} from '@/integrations/shared';
import { toPublicProjectQuery } from '@/integrations/shared';

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    listProjectsPublic: b.query<Project[], ProjectListParams | void>({
      query: (p) => ({ url: '/projects', params: toPublicProjectQuery(p) }),
      providesTags: () => [{ type: 'Projects' as const, id: 'LIST' }],
    }),

    getProjectPublic: b.query<Project, string>({
      query: (id) => ({ url: `/projects/${id}` }),
      providesTags: (_res, _e, id) => [{ type: 'Projects' as const, id }],
    }),

    // ✅ object args + include
    getProjectBySlugPublic: b.query<Project, GetProjectBySlugArgs>({
      query: ({ slug, include }) => ({
        url: `/projects/by-slug/${encodeURIComponent(slug)}`,
        params: include ? { include } : undefined,
      }),
      providesTags: (_res, _e, arg) => [{ type: 'Projects' as const, id: `slug:${arg.slug}` }],
    }),

    listProjectImagesPublic: b.query<ProjectImage[], string>({
      query: (projectId) => ({ url: `/projects/${projectId}/images` }),
      providesTags: (_res, _e, projectId) => [
        { type: 'ProjectImages' as const, id: `p:${projectId}` },
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useListProjectsPublicQuery,
  useGetProjectPublicQuery,
  useGetProjectBySlugPublicQuery,
  useListProjectImagesPublicQuery,
} = projectsApi;
