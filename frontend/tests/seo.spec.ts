import { test, expect } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

test('home sayfasinda canonical ve og:title var', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}`);

  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
});
