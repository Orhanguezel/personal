// ===================================================================
// FILE: src/modules/skill/router.ts
// FINAL — Skill router (public + admin)
// ===================================================================

import type { FastifyInstance } from 'fastify';
import { getSkillsPublic } from './controller';

export async function registerSkill(app: FastifyInstance) {
  // Public
  app.get('/skills', getSkillsPublic);
}
