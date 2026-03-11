import { test, expect } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

test('blog liste sayfasi acilir', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}/blog`);

  await expect(page.locator('section.section-blog-list')).toBeVisible();
});

test('blog detay sayfasi acilir', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}/blog`);

  const firstCard = page.locator('.blog-card a.blog-card__link').first();
  await expect(firstCard).toBeVisible({ timeout: 20000 });
  const count = await page.locator('.blog-card a.blog-card__link').count();
  expect(count).toBeGreaterThan(0);

  const href = await firstCard.getAttribute('href');
  expect(href).toBeTruthy();

  await page.goto(href as string);

  await expect(page.locator('section.section-details')).toBeVisible();
});
