import { createApp } from '../../dist/test-app.js';
import mysql from 'mysql2/promise';
import { writeFile } from 'node:fs/promises';
const db = await mysql.createConnection({ host: '127.0.0.1', port: 18346, user: 'root' });
const [[server]]: any = await db.query('SELECT @@datadir AS path');
if (server.path !== '/tmp/gwd-shared-mysql/') throw Error('Fixture server required');
const id = '11111111-1111-4111-8111-111111111111';
for (const schema of ['guezelwebdesign', 'gzlteknoloji_v2']) {
  await db.query(
    'INSERT IGNORE INTO `' +
      schema +
      '`.users (id,email,password_hash,full_name,is_active,email_verified) VALUES (?,?,?, ?,1,1)',
    [id, 'fixture@example.invalid', 'unusable-fixture-hash', 'Yalıtılmış test yöneticisi'],
  );
  await db.query(
    'INSERT IGNORE INTO `' + schema + '`.user_roles (id,user_id,role) VALUES (?, ?,?)',
    [id, id, 'admin'],
  );
  await db.query('INSERT IGNORE INTO `' + schema + '`.profiles (id,full_name) VALUES (?,?)', [
    id,
    'Yalıtılmış test yöneticisi',
  ]);
}
await db.end();
const app = await createApp();
await app.ready();
const token = app.jwt.sign(
  { sub: id, email: 'fixture@example.invalid', role: 'admin' },
  { expiresIn: '1h' },
);
await writeFile('/tmp/gwd-shared-browser-fixture.json', JSON.stringify({ token }), { mode: 0o600 });
await app.listen({ port: Number(process.env.FIXTURE_HTTP_PORT || 18044), host: '127.0.0.1' });
console.log('Isolated fixture API listening');
