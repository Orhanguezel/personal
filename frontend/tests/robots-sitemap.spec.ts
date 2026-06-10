import { test, expect } from '@playwright/test';

test('robots.txt ve sitemap.xml erisilebilir', async ({ request, baseURL }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();

  const body = await sitemap.text();
  expect(body.length).toBeGreaterThan(0);

  // En az bir absolute URL olmali
  expect(body).toMatch(/<loc>https?:\/\//i);
});
