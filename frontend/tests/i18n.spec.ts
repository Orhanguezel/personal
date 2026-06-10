import { expect, test } from '@playwright/test';

const bookingTitles: Record<string, string> = {
  de: 'Projektgespraech buchen',
  en: 'Book a project call',
  tr: 'Proje gorusmesi planla',
};

for (const [locale, title] of Object.entries(bookingTitles)) {
  test(`/${locale}/booking locale wrapper dogru lang ve baslik kullanir`, async ({ page }) => {
    await page.goto(`/${locale}/booking`);

    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toContainText(title);
  });
}
