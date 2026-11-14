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
