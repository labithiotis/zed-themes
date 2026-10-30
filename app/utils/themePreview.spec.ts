import { describe, expect, it } from 'vitest';
import type { ThemeContent } from '../themeFamily.js';
import { escapeXml, renderThemePreview } from './themePreview.js';

const theme = (overrides: Partial<ThemeContent> = {}): ThemeContent => ({
  name: 'Theme',
  appearance: 'dark',
  style: { 'editor.background': '#000000', text: '#FFFFFF', syntax: { keyword: { color: '#FF0000' } } },
  ...overrides,
});

describe('escapeXml', () => {
  it('escapes markup and quote characters', () => {
    expect(escapeXml(`<a href="x">'&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&apos;&amp;&apos;&lt;/a&gt;');
  });

  it('drops characters XML cannot represent', () => {
    expect(escapeXml('a\u0000b\u001Fc\uD800d')).toBe('abcd');
  });
});

describe('renderThemePreview', () => {
  it('escapes the theme name', () => {
    const svg = renderThemePreview(theme({ name: 'A & B </text><script>alert(1)</script>' }));
    expect(svg).toContain('A &amp; B &lt;/text&gt;&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(svg).not.toContain('<script');
  });

  it('escapes style and syntax colours', () => {
    const svg = renderThemePreview(
      theme({
        style: {
          'editor.background': '#000" onload="alert(1)',
          syntax: { keyword: { color: "red' onclick='x" } },
        },
      }),
    );
    expect(svg).toContain('fill="#000&quot; onload=&quot;alert(1)"');
    expect(svg).toContain('fill="red&apos; onclick=&apos;x"');
    expect(svg).not.toMatch(/\son(load|click)="/);
  });

  it('omits attributes for absent values', () => {
    const svg = renderThemePreview(theme({ style: {} }));
    expect(svg).not.toMatch(/="(undefined|null)?"/);
  });
});
