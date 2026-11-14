// This command can reach only the disposable server created for this project.
import mysql from 'mysql2/promise';
import { readFile } from 'node:fs/promises';
const c = await mysql.createConnection({
  host: '127.0.0.1',
  port: 18346,
  user: 'root',
  multipleStatements: true,
});
const [[instance]]: any = await c.query('SELECT @@datadir AS path');
if (instance.path !== '/tmp/gwd-shared-mysql/')
  throw Error('Refusing to reset a non-fixture MySQL server');
for (const schema of [
  'gzl_shared_content',
  'gzl_shared_public',
  'guezelwebdesign',
  'gzlteknoloji_v2',
])
  await c.query('DROP DATABASE IF EXISTS `' + schema + '`');
await c.query(await readFile('/tmp/gwd-shared-schema.sql', 'utf8'));
await c.end();
