import { expect, test } from '@playwright/test';

test('can search for themes', async ({ page }) => {
  await page.goto('/');

  expect(await page.getByTestId('preview-theme').count()).toBeGreaterThan(1);

  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('anya');

  expect(await page.getByTestId('preview-theme').count()).toBe(1);
});
