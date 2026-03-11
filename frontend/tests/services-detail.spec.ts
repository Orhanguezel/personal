import { test, expect } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

test('services detay sayfasi acilir', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}/services`);

  const firstCard = page.locator('.card-custom a.card_title_link').first();
  await expect(firstCard).toBeVisible({ timeout: 20000 });
  const count = await page.locator('.card-custom a.card_title_link').count();
  expect(count).toBeGreaterThan(0);

  const href = await firstCard.getAttribute('href');
  expect(href).toBeTruthy();

  await page.goto(href as string);

  await expect(page.locator('section.section-service-list')).toBeVisible();
  await expect(page.locator('.card__image')).toBeVisible();
});
