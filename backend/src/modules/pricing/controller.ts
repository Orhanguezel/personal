// =============================================================
// FILE: src/modules/pricing/controller.ts
// FINAL — Public pricing controller (plans only)
// =============================================================

import type { FastifyReply, FastifyRequest } from 'fastify';
import { pricingRepo } from './repository';
import { PublicPricingQuerySchema } from './validation';

export async function getPricingPublic(req: FastifyRequest, reply: FastifyReply) {
  const q = PublicPricingQuerySchema.safeParse((req as any).query ?? {});
  if (!q.success) {
    return reply.status(400).send({ message: 'Invalid query', issues: q.error.issues });
  }

  const { locale, plans_limit } = q.data;

  const data = await pricingRepo.getPublic(locale, plans_limit ?? 10);
  return reply.send(data);
}
