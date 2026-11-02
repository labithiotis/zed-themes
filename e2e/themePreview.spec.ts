import { expect, test } from '@playwright/test';
import type { ThemeContent } from '../app/themeFamily.js';
import { renderThemePreview } from '../app/utils/themePreview.js';

const parse = (page: import('@playwright/test').Page, svg: string) =>
  page.evaluate((source) => {
    const doc = new DOMParser().parseFromString(source, 'image/svg+xml');
    const all = [...doc.querySelectorAll('*')];
    return {
      parseError: doc.querySelector('parsererror')?.textContent ?? null,
      projectName: doc.getElementById('project-name')?.textContent ?? null,
      tags: [...new Set(all.map((el) => el.localName))].sort(),
      eventAttributes: all.flatMap((el) => el.getAttributeNames().filter((name) => name.startsWith('on'))),
      codeFill: doc.getElementById('code')?.getAttribute('fill') ?? null,
    };
  }, svg);

const theme = (overrides: Partial<ThemeContent> = {}): ThemeContent => ({
  name: 'Theme',
  appearance: 'dark',
  style: { 'editor.background': '#000000', text: '#FFFFFF', syntax: { keyword: { color: '#FF0000' } } },
  ...overrides,
});

test('renders a theme named with an ampersand as valid SVG', async ({ page }) => {
  const result = await parse(page, renderThemePreview(theme({ name: 'A & B' })));

  expect(result.parseError).toBeNull();
  expect(result.projectName).toBe('A & B');
});

test('keeps markup in a theme name as text', async ({ page }) => {
  const baseline = await parse(page, renderThemePreview(theme()));
  const name = `</text><script>alert(1)</script><foreignObject><img src=x onerror="alert(1)"/></foreignObject><text>`;
  const result = await parse(page, renderThemePreview(theme({ name })));

  expect(result.parseError).toBeNull();
  expect(result.projectName).toBe(name);
  expect(result.tags).toEqual(baseline.tags);
  expect(result.eventAttributes).toEqual([]);
});

test('quotes in style values cannot add SVG attributes', async ({ page }) => {
  const background = `#000" onload="alert(1)`;
  const result = await parse(
    page,
    renderThemePreview(
      theme({
        style: {
          'editor.background': background,
          text: `#fff' onclick='alert(1)`,
          syntax: { keyword: { color: `red" onmouseover="alert(1)`, font_style: 'italic' } },
        },
      }),
    ),
  );

  expect(result.parseError).toBeNull();
  expect(result.codeFill).toBe(background);
  expect(result.eventAttributes).toEqual([]);
});
