import { enabled, isWriter, workspaceSchema } from './config';
import { getContentPool } from './routing';
import { byKind, type ContentKind } from './definitions';
import { verify } from './routes';
let running = false;
export async function deliverPending() {
  if (running || !enabled || !isWriter) return;
  running = true;
  try {
    const [rows]: any = await getContentPool().query(
      'SELECT o.* FROM `' +
        workspaceSchema +
        '`.content_outbox o WHERE delivered_at IS NULL ORDER BY id LIMIT 10',
    );
    for (const row of rows) {
      const d = byKind.get(row.kind as ContentKind);
      if (!d) continue;
      const [[latest]]: any = await getContentPool().query(
        'SELECT revision,published_revision,state FROM `' +
          workspaceSchema +
          '`.content_entries WHERE kind=? AND entity_id=?',
        [row.kind, row.entity_id],
      );
      const state = ['withdrawn', 'deleted'].includes(latest.state) ? 'withdraw' : 'publish';
      const revision =
        state === 'withdraw' ? Number(latest.revision) : Number(latest.published_revision);
      const results = await verify(d, row.entity_id, revision, state);
      const good = results.every((r) => r.state === 'verified');
      await getContentPool().query(
        'UPDATE `' +
          workspaceSchema +
          '`.content_outbox SET attempts=attempts+1,last_error=?,delivered_at=? WHERE id=?',
        [good ? null : 'origin_verification_pending', good ? new Date() : null, row.id],
      );
    }
  } catch {
  } finally {
    running = false;
  }
}
export function startContentWorker() {
  if (!enabled || !isWriter || process.env.CONTENT_WORKER_ENABLED === '0') return () => {};
  const timer = setInterval(() => void deliverPending(), 15000);
  timer.unref();
  void deliverPending();
  return () => clearInterval(timer);
}
