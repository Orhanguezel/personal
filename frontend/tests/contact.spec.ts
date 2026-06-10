import { expect, test } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

test('contact bolumu ve zorunlu form alanlari gorunur', async ({ page }) => {
  await page.goto(`/${DEFAULT_LOCALE}#contact`);

  const contact = page.locator('#contact');
  await expect(contact).toBeVisible({ timeout: 20000 });
  await expect(contact.locator('form')).toBeVisible();
  await expect(contact.locator('#name')).toBeVisible();
  await expect(contact.locator('#email')).toBeVisible();
  await expect(contact.locator('#message')).toBeVisible();

  expect(await contact.locator('[required]').count()).toBeGreaterThanOrEqual(3);
});
