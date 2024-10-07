import { expect, test } from '@playwright/test';

test('change language', async ({ page }) => {
  await page.goto('/themes/anya');

  await page.getByTestId('preview-language').click();
  await page.getByTestId('preview-language-csharp').click();
  await expect(page.getByTestId('preview-language').getByText('C#')).toBeVisible();
  await expect(page.locator('#editor-right').getByText('UserService.cs')).toBeVisible();

  await page.getByTestId('preview-language').click();
  await page.getByTestId('preview-language-tsx').click();
  await expect(page.getByTestId('preview-language').getByText('TSX')).toBeVisible();
  await expect(page.locator('#editor-right').getByText('App.tsx')).toBeVisible();

  await page.getByTestId('preview-language').click();
  await page.getByTestId('preview-language-rust').click();
  await expect(page.getByTestId('preview-language').getByText('Rust')).toBeVisible();
  await expect(page.locator('#editor-right').getByText('main.rs')).toBeVisible();

  await page.reload();
  await expect(page.getByTestId('preview-language').getByText('Rust')).toBeVisible();
  await expect(page.locator('#editor-right').getByText('main.rs')).toBeVisible();
});
