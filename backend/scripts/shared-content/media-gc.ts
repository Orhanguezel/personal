/** Reviewed cleanup for failed uploads; immutable revisions and registered assets always win. */
import mysql from 'mysql2/promise';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { workspaceSchema } from '../../src/modules/shared-content/config';
const apply = process.argv.includes('--apply');
if (apply && process.env.CONTENT_GC_FROZEN !== '1')
  throw Error('Apply requires the editorial write freeze and CONTENT_GC_FROZEN=1');
const root =
  process.env.MIGRATION_MEDIA_ROOT ||
  process.env.CONTENT_MEDIA_ROOT ||
  '/var/www/vps-guezel/shared-editorial/uploads';
const directory = path.join(root, 'content');
const c = await mysql.createConnection({
  host: process.env.MIGRATION_DB_HOST || '127.0.0.1',
  port: Number(process.env.MIGRATION_DB_PORT || 18346),
  user: process.env.MIGRATION_DB_USER || 'root',
  password: process.env.MIGRATION_DB_PASSWORD || '',
  ...(process.env.MIGRATION_DB_SOCKET ? { socketPath: process.env.MIGRATION_DB_SOCKET } : {}),
  database: workspaceSchema,
});
const [[lock]]: any = await c.query("SELECT GET_LOCK('shared_editorial_media',30) AS locked");
if (Number(lock.locked) !== 1) throw Error('Media writes are still active');
const removed = [];
for (const item of await readdir(directory, { withFileTypes: true }).catch(() => [])) {
  if (!item.isFile() || !/^[a-f0-9]{64}\.[a-z0-9]{2,5}$/.test(item.name)) continue;
  const relative = 'content/' + item.name;
  const file = path.join(directory, item.name);
  if (Date.now() - (await stat(file)).mtimeMs < 7 * 86400000) continue;
  const [[asset]]: any = await c.query(
    'SELECT COUNT(*) AS n FROM storage_assets WHERE path=? OR provider_public_id=? OR LOCATE(?,url)>0',
    [relative, relative, relative],
  );
  if (Number(asset.n)) continue;
  const [[revision]]: any = await c.query(
    'SELECT COUNT(*) AS n FROM content_revisions WHERE LOCATE(?,CAST(payload AS CHAR))>0',
    [relative],
  );
  if (Number(revision.n)) continue;
  if (apply) await unlink(file);
  removed.push(relative);
}
await c.query("SELECT RELEASE_LOCK('shared_editorial_media')");
await c.end();
console.log(JSON.stringify({ apply, candidates: removed.length, files: removed }));
