#!/usr/bin/env bun
import 'dotenv/config';
import { socialQueue } from '@vps/shared-backend/modules/social';

// VPS cron:
// */15 * * * * cd /var/www/guezel/backend && bun scripts/social-dispatch.mjs >> logs/social.log 2>&1

function log(message) {
  console.log(`[social-dispatch] ${new Date().toISOString()} ${message}`);
}

try {
  const result = await socialQueue.dispatchDue();
  if (result.ok) {
    log(`${result.status}${result.id ? ` id=${result.id}` : ''}${result.message ? ` ${result.message}` : ''}`);
    process.exit(0);
  }

  log(`${result.status} id=${result.id} error=${result.error}`);
  process.exit(result.status === 'failed' ? 1 : 0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  log(`fatal ${message}`);
  process.exit(1);
}
