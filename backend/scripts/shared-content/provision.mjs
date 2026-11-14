// Run on the production host with root's MySQL socket. Credentials never reach stdout.
import mysql from 'mysql2/promise';
import { randomBytes } from 'node:crypto';
import { readFile, writeFile, chmod } from 'node:fs/promises';
const apply = process.argv.includes('--apply');
if (!apply) throw Error('Provision requires --apply after the migration and backup are verified');
const c = await mysql.createConnection({
  socketPath: process.env.MIGRATION_DB_SOCKET || '/var/run/mysqld/mysqld.sock',
  user: 'root',
});
const set = (text, key, value) =>
  text.match(new RegExp('^' + key + '=.*$', 'm'))
    ? text.replace(new RegExp('^' + key + '=.*$', 'm'), key + '=' + value)
    : text + '\n' + key + '=' + value;
for (const [site, directory] of [
  ['gwd', 'guezelwebdesign'],
  ['gzl', 'gzlteknoloji-site'],
]) {
  const file = '/var/www/vps-guezel/' + directory + '/backend/.env';
  let text = await readFile(file, 'utf8');
  const username = 'editorial_' + site;
  let password = text.match(/^CONTENT_DB_PASSWORD=(.*)$/m)?.[1];
  if (!password) password = randomBytes(32).toString('hex');
  await c.query("CREATE USER IF NOT EXISTS ?@'localhost' IDENTIFIED BY ?", [username, password]);
  await c.query("ALTER USER ?@'localhost' IDENTIFIED BY ?", [username, password]);
  for (const schema of ['gzl_shared_content', 'gzl_shared_public'])
    await c.query(
      'GRANT ' +
        (site === 'gwd' ? 'SELECT,INSERT,UPDATE,DELETE' : 'SELECT') +
        ' ON `' +
        schema +
        "`.* TO ?@'localhost'",
      [username],
    );
  for (const schema of ['guezelwebdesign', 'gzlteknoloji_v2'])
    for (const mode of ['work', 'public'])
      for (const table of ['custom_pages', 'custom_pages_i18n'])
        await c.query(
          'GRANT SELECT ON `' + schema + '`.`content_' + mode + '_' + table + "` TO ?@'localhost'",
          [username],
        );
  const values = {
    CONTENT_SHARED_ENABLED: '1',
    CONTENT_SITE_ID: site,
    CONTENT_WRITER: site === 'gwd' ? '1' : '0',
    CONTENT_DB_HOST: '127.0.0.1',
    CONTENT_DB_PORT: '3306',
    CONTENT_DB_USER: username,
    CONTENT_DB_PASSWORD: password,
    CONTENT_WORKSPACE_DB: 'gzl_shared_content',
    CONTENT_PUBLISHED_DB: 'gzl_shared_public',
    CONTENT_MEDIA_ROOT: '/var/www/vps-guezel/shared-editorial/uploads',
  };
  for (const [key, value] of Object.entries(values)) text = set(text, key, value);
  await writeFile(file, text.endsWith('\n') ? text : text + '\n');
  await chmod(file, 0o600);
  console.log(JSON.stringify({ site, writer: site === 'gwd', configured: true }));
}
await c.end();
