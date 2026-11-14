import { beforeAll, afterAll, test, expect } from 'bun:test';
import { createApp } from '../../dist/test-app.js';
import mysql from 'mysql2/promise';
let app: any,
  headers: any,
  c: any,
  id: string,
  revision = 1;
const key = 'fixture-create-' + crypto.randomUUID();
const slug = 'isolated-shared-' + key.slice(-12);
const request = async (method: string, url: string, body?: any, extra: any = {}) => {
  const r = await app.inject({
    method,
    url: '/api/v1' + url,
    headers: { ...headers, ...extra },
    ...(body !== undefined ? { payload: body } : {}),
  });
  if (r.statusCode >= 400) console.log('response', method, url, r.statusCode, r.body);
  return r;
};
beforeAll(async () => {
  app = await createApp();
  await app.ready();
  headers = {
    Authorization:
      'Bearer ' + app.jwt.sign({ sub: '11111111-1111-4111-8111-111111111111', role: 'admin' }),
    'Accept-Language': 'tr',
  };
  c = await mysql.createConnection({
    host: '127.0.0.1',
    port: 18346,
    user: 'root',
    database: 'gzl_shared_content',
  });
});
afterAll(async () => {
  await c?.end();
  await app?.close();
});
test('public content comes from the common published projection; auth and local settings stay local', async () => {
  const r = await request('GET', '/projects?limit=200&locale=tr');
  expect(r.statusCode).toBe(200);
  expect(r.headers['x-content-source']).toBe('shared');
  expect(r.json().some((p: any) => p.id === '38000000-0000-4000-8000-000000000004')).toBe(true);
  const s = await request('GET', '/site_settings/default_locale');
  expect(s.statusCode).toBe(200);
  expect(JSON.stringify(s.json())).toContain('de');
});
test('create is idempotent and draft never leaks publicly', async () => {
  const payload = {
    locale: 'tr',
    title: 'Isolated shared fixture',
    slug,
    content: '<p>Fixture content for shared publication tests.</p>',
    is_published: false,
  };
  let r = await request('POST', '/admin/projects', payload, { 'Idempotency-Key': key });
  expect(r.statusCode).toBe(201);
  id = r.json().id;
  expect(id).toBeTruthy();
  revision = r.json()._content_revision;
  const again = await request('POST', '/admin/projects', payload, { 'Idempotency-Key': key });
  expect(again.statusCode).toBe(201);
  expect(again.json().id).toBe(id);
  const conflict = await request(
    'POST',
    '/admin/projects',
    { ...payload, title: 'different' },
    { 'Idempotency-Key': key },
  );
  expect(conflict.statusCode).toBe(409);
  r = await request('GET', '/projects/' + id);
  expect(r.statusCode).toBe(404);
});
test('a stale revision fails, missing translations block publishing, valid translations can be approved', async () => {
  let r = await request(
    'PATCH',
    '/admin/projects/' + id,
    { title: 'stale' },
    { 'If-Match': '999' },
  );
  expect(r.statusCode).toBe(409);
  r = await request('POST', '/admin/shared-content/entries/projects/' + id + '/publish', {
    expected_revision: revision,
  });
  expect(r.statusCode).toBe(422);
  for (const locale of ['de', 'en']) {
    r = await request(
      'PATCH',
      '/admin/projects/' + id,
      {
        locale,
        title: 'Isolated fixture ' + locale,
        slug: slug + '-' + locale,
        content: '<p>Fixture translation ' + locale + '</p>',
      },
      { 'If-Match': String(revision) },
    );
    expect(r.statusCode).toBe(200);
    revision = r.json()._content_revision;
  }
  for (const locale of ['tr', 'de', 'en']) {
    r = await request('POST', '/admin/shared-content/entries/projects/' + id + '/approve', {
      expected_revision: revision,
      locale,
    });
    expect(r.statusCode).toBe(200);
  }
  r = await request('POST', '/admin/shared-content/entries/projects/' + id + '/publish', {
    expected_revision: revision,
  });
  expect(r.statusCode).toBe(200);
});
test('published content is immutable while a new draft is edited', async () => {
  let r = await request('GET', '/projects/' + id, undefined, { 'Accept-Language': 'tr' });
  expect(r.statusCode).toBe(200);
  expect(r.json().title).toBe('Isolated shared fixture');
  const published = Number(r.headers['x-content-revision']);
  r = await request(
    'PATCH',
    '/admin/projects/' + id,
    { locale: 'tr', title: 'Unpublished draft change' },
    { 'If-Match': String(revision) },
  );
  expect(r.statusCode).toBe(200);
  revision = r.json()._content_revision;
  r = await request('GET', '/projects/' + id, undefined, { 'Accept-Language': 'tr' });
  expect(r.json().title).toBe('Isolated shared fixture');
  expect(Number(r.headers['x-content-revision'])).toBe(published);
  r = await request('GET', '/admin/shared-content/entries/projects/' + id);
  expect(r.json().translations.find((x: any) => x.locale === 'de').status).toBe('review_required');
});
test('global withdrawal removes detail and gallery without deleting local references', async () => {
  let r = await request('POST', '/admin/shared-content/entries/projects/' + id + '/withdraw', {
    expected_revision: revision,
  });
  expect(r.statusCode).toBe(200);
  r = await request('GET', '/projects/' + id);
  expect(r.statusCode).toBe(404);
  r = await request('GET', '/projects/' + id + '/images');
  expect(r.statusCode).toBe(404);
  const [[row]] = await c.query('SELECT COUNT(*) AS n FROM projects WHERE id=?', [id]);
  expect(Number(row.n)).toBe(1);
});
test('every public editorial module and mixed legal/blog view is readable', async () => {
  for (const url of [
    '/services?locale=tr',
    '/products?locale=tr',
    '/custom-pages?locale=tr',
    '/custom-pages?module_key=blog&locale=tr',
    '/faqs?locale=tr',
    '/pricing?locale=tr&plans_limit=50',
    '/brands?locale=tr',
    '/resume?locale=tr',
    '/skills?locale=tr',
    '/admin/shared-content/overview',
  ]) {
    const r = await request('GET', url);
    expect(r.statusCode, url).toBe(200);
  }
});
test('country prices match the original offer, and a missing offer never falls back to Germany', async () => {
  const [offers] = await c.query(
    "SELECT entity_id,offer FROM content_offers WHERE site_id='gwd' AND kind='pricing' LIMIT 1",
  );
  const source =
    typeof offers[0].offer === 'string' ? JSON.parse(offers[0].offer) : offers[0].offer;
  const r = await request('GET', '/pricing?locale=tr&plans_limit=50');
  const plans = r.json().plans;
  expect(String(plans.find((p: any) => p.id === offers[0].entity_id).price_amount)).toBe(
    String(source.price_amount),
  );
  const foreign = plans.find((p: any) => !p.country_offer_available);
  expect(foreign).toBeTruthy();
  expect(foreign.price_amount).toBeNull();
});
test('a concurrent stale save loses no successful change', async () => {
  let r = await request('GET', '/admin/shared-content/entries/projects/' + id);
  const rev = r.json().revision;
  const responses = await Promise.all(
    ['First concurrent change', 'Second concurrent change'].map((title) =>
      request(
        'PATCH',
        '/admin/projects/' + id,
        { locale: 'tr', title },
        { 'If-Match': String(rev) },
      ),
    ),
  );
  expect(responses.map((r) => r.statusCode).sort()).toEqual([200, 409]);
  const winner = responses.find((r) => r.statusCode === 200).json();
  const [[actual]] = await c.query(
    "SELECT title FROM projects_i18n WHERE project_id=? AND locale='tr'",
    [id],
  );
  expect(actual.title).toBe(winner.title);
});
test('draft preview is private, scoped to the requested brand and expires', async () => {
  const r = await request('POST', '/admin/shared-content/entries/projects/' + id + '/preview', {
    site: 'gwd',
    locale: 'tr',
  });
  expect(r.statusCode).toBe(400);
  const made = await request('POST', '/admin/shared-content/entries/projects/' + id + '/preview', {
    site: 'gwd',
    locale: 'de',
  });
  expect(made.statusCode).toBe(200);
  const preview = await request('GET', '/content/preview', undefined, {
    'x-content-preview': made.json().token,
  });
  expect(preview.statusCode).toBe(200);
  expect(preview.headers['cache-control']).toContain('no-store');
  expect(preview.json().data._preview).toBe(true);
  const foreign = await request(
    'POST',
    '/admin/shared-content/entries/projects/' + id + '/preview',
    { site: 'gzl', locale: 'tr' },
  );
  const denied = await request('GET', '/content/preview', undefined, {
    'x-content-preview': foreign.json().token,
  });
  expect(denied.statusCode).toBe(401);
  await c.query('UPDATE content_preview_sessions SET expires_at=DATE_SUB(NOW(),INTERVAL 1 SECOND)');
  const expired = await request('GET', '/content/preview', undefined, {
    'x-content-preview': made.json().token,
  });
  expect(expired.statusCode).toBe(401);
});
test('historical media references prevent physical deletion', async () => {
  const [[asset]] = await c.query(
    'SELECT id FROM storage_assets WHERE id IN (SELECT featured_image_asset_id FROM projects WHERE featured_image_asset_id IS NOT NULL) LIMIT 1',
  );
  if (!asset) throw Error('Fixture must include referenced media');
  const r = await request('DELETE', '/admin/storage/assets/' + asset.id);
  expect(r.statusCode).toBe(409);
});
test('CRM import publishes one shared identity and retries cannot duplicate it', async () => {
  const external = 'fixture-' + crypto.randomUUID();
  const text =
    'This is a complete isolated fixture description used only for integration verification.';
  const translations = Object.fromEntries(
    ['tr', 'de', 'en'].map((locale) => [
      locale,
      {
        title: 'CRM isolated fixture ' + locale,
        slug: external + '-' + locale,
        summary: text,
        content: { html: '<p>' + text + '</p>' },
        featuredImageAlt: 'Isolated CRM image',
        metaTitle: 'CRM isolated fixture meta title',
        metaDescription: text,
      },
    ]),
  );
  const payload = {
    contractVersion: '1.0',
    operation: 'create',
    externalId: external,
    project: { category: 'fixture', services: [], technologies: [] },
    translations,
    publication: { status: 'published', displayPermission: true, imageRightsConfirmed: true },
  };
  const boundary = 'fixture-boundary-' + crypto.randomUUID();
  const image = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a+1sAAAAASUVORK5CYII=',
    'base64',
  );
  const multipart = Buffer.concat([
    Buffer.from(
      '--' +
        boundary +
        '\r\nContent-Disposition: form-data; name="payload"\r\n\r\n' +
        JSON.stringify(payload) +
        '\r\n--' +
        boundary +
        '\r\nContent-Disposition: form-data; name="image"; filename="fixture.png"\r\nContent-Type: image/png\r\n\r\n',
    ),
    image,
    Buffer.from('\r\n--' + boundary + '--\r\n'),
  ]);
  const inject = () =>
    app.inject({
      method: 'POST',
      url: '/api/v1/integrations/gzl-crm/projects',
      headers: {
        Authorization: 'Bearer isolated-crm-key',
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
      },
      payload: multipart,
    });
  const first = await inject();
  if (first.statusCode !== 201) console.log('CRM fixture error', first.body);
  expect(first.statusCode).toBe(201);
  const imported = first.json().id;
  const again = await inject();
  expect(again.statusCode).toBe(409);
  expect(again.json().error.projectId).toBe(imported);
  const [[count]] = await c.query(
    'SELECT COUNT(*) AS n FROM gzl_crm_content_imports WHERE source_external_id=?',
    [external],
  );
  expect(Number(count.n)).toBe(1);
  const pub = await request('GET', '/projects/' + imported);
  expect(pub.statusCode).toBe(200);
  const [[social]] = await c.query('SELECT COUNT(*) AS n FROM guezelwebdesign.social_posts');
  expect(Number(social.n)).toBe(0);
});
test('Tanitio reads published common revisions and excludes the draft fixture', async () => {
  for (const path of ['articles', 'products', 'projects']) {
    const r = await app.inject({
      url: '/api/v1/integrations/tanitio/' + path + '?locale=tr',
      headers: { Authorization: 'Bearer isolated-tanitio-key' },
    });
    if (r.statusCode !== 200) console.log('Tanitio fixture error', path, r.body);
    expect(r.statusCode).toBe(200);
    for (const item of r.json().items) {
      expect(item.source_revision).toBeGreaterThan(0);
      expect(item.id).not.toBe(id);
    }
  }
});
test('repeating a gallery creation replays the original result even after its parent revision changes', async () => {
  const current = await request('GET', '/admin/shared-content/entries/projects/' + id);
  const rev = current.json().revision;
  const [[asset]] = await c.query('SELECT id,url FROM storage_assets LIMIT 1');
  const payload = { locale: 'tr', asset_id: asset.id, image_url: asset.url, is_active: true };
  const key = crypto.randomUUID();
  const extra = { 'If-Match': String(rev), 'Idempotency-Key': key };
  const first = await request('POST', '/admin/projects/' + id + '/images', payload, extra);
  expect(first.statusCode).toBe(201);
  const again = await request('POST', '/admin/projects/' + id + '/images', payload, extra);
  expect(again.statusCode).toBe(201);
  expect(again.json().id).toBe(first.json().id);
  expect(again.json()._content_revision).toBe(first.json()._content_revision);
  const [[count]] = await c.query('SELECT COUNT(*) AS n FROM project_images WHERE project_id=?', [
    id,
  ]);
  expect(Number(count.n)).toBe(1);
});
test('uploads with the same filename use immutable content hashes', async () => {
  const png = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a+1sAAAAASUVORK5CYII=',
    'base64',
  );
  const upload = async (bytes: Buffer) => {
    const boundary = 'upload-fixture-' + crypto.randomUUID();
    const body = Buffer.concat([
      Buffer.from(
        '--' +
          boundary +
          '\r\nContent-Disposition: form-data; name="bucket"\r\n\r\npublic\r\n--' +
          boundary +
          '\r\nContent-Disposition: form-data; name="file"; filename="same-name.png"\r\nContent-Type: image/png\r\n\r\n',
      ),
      bytes,
      Buffer.from('\r\n--' + boundary + '--\r\n'),
    ]);
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/admin/storage/assets',
      headers: { ...headers, 'Content-Type': 'multipart/form-data; boundary=' + boundary },
      payload: body,
    });
    if (![200, 201].includes(response.statusCode))
      console.log('Upload fixture error', response.body);
    return response;
  };
  const first = await upload(png);
  expect([200, 201]).toContain(first.statusCode);
  const second = await upload(Buffer.concat([png, Buffer.from('fixture')]));
  expect([200, 201]).toContain(second.statusCode);
  expect(second.json().path).not.toBe(first.json().path);
  const { readFile } = await import('node:fs/promises');
  expect((await readFile('/tmp/gwd-shared-media/' + first.json().path)).equals(png)).toBe(true);
});
test('editorial changes preserve the historical order snapshot and amount', async () => {
  const orderId = crypto.randomUUID(),
    itemId = crypto.randomUUID();
  const [[project]] = await c.query('SELECT id FROM guezelwebdesign.projects LIMIT 1');
  await c.query(
    "INSERT INTO guezelwebdesign.orders (id,order_number,customer_email,customer_name,total_amount,currency) VALUES (?,?,'fixture@example.invalid','Isolated fixture','123.45','EUR')",
    [orderId, 'ISOLATED-' + orderId],
  );
  await c.query(
    "INSERT INTO guezelwebdesign.order_items (id,order_id,project_id,title,price,currency,item_type) VALUES (?,?,?,'Historical snapshot','123.45','EUR','project')",
    [itemId, orderId, project.id],
  );
  const meta = await request('GET', '/admin/shared-content/entries/projects/' + project.id);
  const update = await request(
    'PATCH',
    '/admin/projects/' + project.id,
    { locale: 'tr', title: 'New editorial title, unchanged historical order' },
    { 'If-Match': String(meta.json().revision) },
  );
  expect(update.statusCode).toBe(200);
  const [[item]] = await c.query(
    'SELECT title,price,currency FROM guezelwebdesign.order_items WHERE id=?',
    [itemId],
  );
  const [[order]] = await c.query(
    'SELECT total_amount,currency FROM guezelwebdesign.orders WHERE id=?',
    [orderId],
  );
  expect(item).toEqual({ title: 'Historical snapshot', price: '123.45', currency: 'EUR' });
  expect(order).toEqual({ total_amount: '123.45', currency: 'EUR' });
});
test('country offers reject stale writes independently of editorial revisions', async () => {
  const m = await request('GET', '/admin/shared-content/entries/projects/' + id);
  const body = {
    expected_revision: m.json().revision,
    expected_offer_revision: 0,
    offer: { price_onetime: '123.45', currency: 'EUR', is_purchasable: false },
  };
  let r = await request(
    'PUT',
    '/admin/shared-content/entries/projects/' + id + '/offers/gwd',
    body,
  );
  expect(r.statusCode).toBe(200);
  expect(Number(r.json().offers.find((o: any) => o.site_id === 'gwd').revision)).toBe(1);
  r = await request('PUT', '/admin/shared-content/entries/projects/' + id + '/offers/gwd', {
    ...body,
    offer: { ...body.offer, price_onetime: '999.00' },
  });
  expect(r.statusCode).toBe(409);
  const [[actual]] = await c.query(
    "SELECT offer FROM content_offers WHERE site_id='gwd' AND kind='projects' AND entity_id=?",
    [id],
  );
  const offer = typeof actual.offer === 'string' ? JSON.parse(actual.offer) : actual.offer;
  expect(offer.price_onetime).toBe('123.45');
});
test('an explicit content language overrides the panel interface language', async () => {
  const path = '/admin/projects/e3673f55-d45e-52f5-a6fd-ab659ab931e5';
  const tr = await request('GET', path + '?locale=tr', undefined, { 'Accept-Language': 'de' });
  expect(tr.statusCode).toBe(200);
  expect(tr.json().title).toContain('Bitkili Akvaryum');
  const en = await request('GET', path + '?locale=en', undefined, { 'Accept-Language': 'tr' });
  expect(en.json().title).toContain('Corporate Site');
  const identify = await request(
    'GET',
    '/admin/shared-content/identify?kind=projects&key=clan-aquascaping-bitkili-akvaryum-tasarim-sitesi',
  );
  expect(identify.json().id).toBe('e3673f55-d45e-52f5-a6fd-ab659ab931e5');
});
test('legacy SQL imports cannot write separate editorial copies', async () => {
  for (const [path, body] of [
    ['/admin/db/import-sql', { sql: 'UPDATE projects SET is_published=1' }],
    ['/admin/db/import-module', { module: 'products', sql: 'UPDATE products SET is_active=1' }],
  ]) {
    const r = await request('POST', String(path), body);
    expect(r.statusCode).toBe(423);
  }
});

test("every editorial index handles source collations and deleted entries", async () => {
 for(const kind of ["projects","services","products","blog","faqs","pricing","brands","resume","skill-counters","skill-logos","categories","subcategories"]){
 const r=await request("GET","/admin/shared-content/entries?kind="+kind);expect(r.statusCode).toBe(200);expect(Array.isArray(r.json())).toBe(true);
 }
});
