import { expect, type Page, test } from '@playwright/test';

const DEFAULT_LOCALE = 'de';

async function mockBookingApis(page: Page) {
  await page.route('**/api/v1/resources**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 'resource-1',
          type: 'consulting',
          title: 'Projektberatung',
          label: 'Projektberatung',
          capacity: 1,
          external_ref_id: null,
        },
      ]),
    });
  });

  await page.route('**/api/v1/services**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'x-total-count': '0' },
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/v1/bookings', async (route) => {
    await route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, id: 'booking-1' }),
    });
  });
}

test('booking sayfasi formu gosterir ve mock submit basarili olur', async ({ page }) => {
  await mockBookingApis(page);

  await page.goto(`/${DEFAULT_LOCALE}/booking`);

  await expect(page.locator('section.section-booking')).toBeVisible();
  await expect(page.locator('h1')).toContainText('Projektgespraech buchen');
  await expect(page.locator('#booking-resource')).toHaveValue('resource-1');

  await page.locator('#booking-name').fill('Test User');
  await page.locator('#booking-email').fill('test@example.com');
  await page.locator('#booking-phone').fill('+491234567890');
  await page.locator('#booking-message').fill('Bitte um einen kurzen Projekttermin.');
  await page.getByRole('button', { name: /anfrage senden/i }).click();

  await expect(page.getByText('Danke, deine Anfrage ist eingegangen.')).toBeVisible();
});
