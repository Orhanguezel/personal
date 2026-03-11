import { test, expect } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

test('services sayfasi kartlari gorunur', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}/services`);

  await expect(page.locator('section.section-service-list')).toBeVisible();
  await expect(page.locator('.card-custom').first()).toBeVisible();
});
