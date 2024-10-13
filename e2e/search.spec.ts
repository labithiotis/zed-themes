import { expect, test } from '@playwright/test';

test('can search for themes', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState();

  // Wait for themes to load/be visible
  await expect(page.getByTestId('theme').first()).toBeVisible();

  // Asset we have more than 3 themes initially displayed
  const initialCount = await page.getByTestId('theme').count();
  expect(initialCount).toBeGreaterThan(3);

  // Test searching for a theme with mixed case
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('anYA');
  await page.waitForTimeout(1000); // Search has a debounce of 600ms so wait for addtionall 400ms to ensure search is actioned

  const searchCount = await page.getByTestId('theme').count();
  expect(searchCount).toBe(1);
  expect(page.url()).toContain('search=anYA');

  // Test clearing search
  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('');
  await page.waitForTimeout(1000);

  const resetCount = await page.getByTestId('theme').count();
  expect(resetCount).toBeGreaterThan(3);
  expect(page.url()).not.toContain('search=');
});

test('search with no results displays appropriate message', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState();

  await page.getByTestId('search-input').click();
  await page.getByTestId('search-input').fill('xyznonexistent');

  await expect(page.getByTestId('theme')).toHaveCount(0);
  await expect(page.getByTestId('no-results-message')).toBeVisible();
});
