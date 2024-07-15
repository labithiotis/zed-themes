import { expect, test } from '@playwright/test';

test('redirects to themes', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/themes/);
  await expect(page).toHaveTitle(/Zed themes/);
  expect(new URL(page.url()).pathname).toEqual('/themes');
});

test.use({ colorScheme: 'light' });
test('toggles dark mode', async ({ page }) => {
  await page.goto('/themes');

  await expect(page.locator('html')).not.toHaveAttribute('class', 'dark');
  await page.locator('[aria-label="Toggle theme"]').click();
  await expect(page.locator('html')).toHaveAttribute('class', 'dark');
});

// test('can download a theme', async ({ page }) => {
//   await page.goto('/themes');
//   const downloadPromise = page.waitForEvent('download');

//   const firstTheme = page.getByTestId('preview-theme').first();
//   const themeName = await firstTheme.getAttribute('data-theme-name');

//   await page.getByLabel(`Download ${themeName} theme`).click();
//   const download = await downloadPromise;
//   expect(download.suggestedFilename()).toBe(`${themeName}.json`.toLowerCase());
// });

test('navigtes to preview theme', async ({ page }) => {
  await page.goto('/themes');

  const firstTheme = page.getByTestId('preview-theme').first();
  const themeId = await firstTheme.getAttribute('data-theme-id');
  const themeName = await firstTheme.getAttribute('data-theme-name');

  await page.getByLabel(`Preview ${themeName} theme`).click();

  expect(new URL(page.url()).pathname).toEqual(`/themes/${themeId}`);
});
