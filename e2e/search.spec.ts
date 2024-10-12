import { expect, test } from '@playwright/test';

test('can search for themes', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState();

  // Wait for themes to load/be visible
  expect(page.getByTestId('preview-theme').first()).toBeVisible();

  // Asset we have more than 3 themes initially displayed
  const initialCount = await page.getByTestId('preview-theme').count();
  expect(initialCount).toBeGreaterThan(3);

  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('anya');

  // Search has a debounce of 600ms so wait for addtionall 200ms to ensure search is updated
  await page.waitForTimeout(800);

  expect(page.url()).toContain('search=anya');

  const searchCount = await page.getByTestId('preview-theme').count();
  expect(searchCount).toBe(1);
});

test('search with no results displays appropriate message', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('search-input').fill('xyznonexistent');

  await expect(page.getByTestId('preview-theme')).toHaveCount(0);
  await expect(page.getByTestId('no-results-message')).toBeVisible();
});
