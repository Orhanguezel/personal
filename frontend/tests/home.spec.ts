import { test, expect } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

test('anasayfa acilir ve hero gorunur', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}`);

  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('section.section-hero-1')).toBeVisible();
});
