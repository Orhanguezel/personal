import { test, expect, afterAll } from 'bun:test';
import { createApp } from '../../dist/test-app.js';
const app = await createApp();
await app.ready();
const headers = {
  Authorization:
    'Bearer ' + app.jwt.sign({ sub: '11111111-1111-4111-8111-111111111111', role: 'admin' }),
};
afterAll(() => app.close());
test('Turkey reads the same projection with its own settings', async () => {
  let r = await app.inject({ url: '/api/v1/projects?locale=tr' });
  expect(r.statusCode).toBe(200);
  expect(r.headers['x-content-site']).toBe('gzl');
  r = await app.inject({ url: '/api/v1/site_settings/default_locale' });
  expect(JSON.stringify(r.json())).toContain('tr');
});
test('old Turkish admin writes cannot create a separate local project', async () => {
  const r = await app.inject({
    method: 'POST',
    url: '/api/v1/admin/projects',
    headers,
    payload: { locale: 'tr', title: 'Must not exist', slug: 'must-not-exist', is_published: false },
  });
  expect(r.statusCode).toBe(423);
});
test('publication commands are restricted to the common writer', async () => {
  const r = await app.inject({
    method: 'POST',
    url: '/api/v1/admin/shared-content/entries/projects/e3673f55-d45e-52f5-a6fd-ab659ab931e5/publish',
    headers,
    payload: { expected_revision: 1 },
  });
  expect(r.statusCode).toBe(423);
});
test('Turkey can update its own branding files without writing common media',async()=>{const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a+1sAAAAASUVORK5CYII=','base64');const boundary='local-brand-'+crypto.randomUUID();const filename='brand-'+crypto.randomUUID()+'.png';const body=Buffer.concat([Buffer.from('--'+boundary+'\r\nContent-Disposition: form-data; name="bucket"\r\n\r\npublic\r\n--'+boundary+'\r\nContent-Disposition: form-data; name="folder"\r\n\r\nsite-media\r\n--'+boundary+'\r\nContent-Disposition: form-data; name="file"; filename="'+filename+'"\r\nContent-Type: image/png\r\n\r\n'),png,Buffer.from('\r\n--'+boundary+'--\r\n')]);const r=await app.inject({method:'POST',url:'/api/v1/admin/storage/assets',headers:{...headers,'X-Media-Scope':'site','Content-Type':'multipart/form-data; boundary='+boundary},payload:body});expect(r.statusCode).toBe(201);expect(r.json().url).toContain('/uploads/site-media/');const {readFile}=await import('node:fs/promises');expect((await readFile('/tmp/gwd-shared-site-media-gzl/site-media/'+filename)).equals(png)).toBe(true);});
