import { StyleTokens, SyntaxTokens } from '../state/tokens';
import { ThemeStyleContent } from '../state/themeFamily';

const PATTERN = /[._]/g;

export const sanitizeToken = (s: string) => s.replace(PATTERN, '-');

export const cssStyleToken = (s: StyleTokens | string) => `--style-${sanitizeToken(s)}`;

export const cssVarStyleToken = (s: StyleTokens) => {
  const fallback = s.split('.').shift();
  if (fallback) {
    return `var(${cssStyleToken(s)}, var(${cssStyleToken(fallback)}))`;
  }
  return `var(${cssStyleToken(s)})`;
};

export const cssSyntaxColorToken = (s: SyntaxTokens | string) => `--style-syntax-${sanitizeToken(s)}-color`;

export const cssSyntaxStyleToken = (s: SyntaxTokens | string) => `--style-syntax-${sanitizeToken(s)}-style`;

export const cssSyntaxWeightToken = (s: SyntaxTokens | string) => `--style-syntax-${sanitizeToken(s)}-weight`;

export const cssVarSyntaxToken = (s: SyntaxTokens, fn: (s: SyntaxTokens | string) => string) => {
  const fallback = s.split('.').shift();
  if (fallback) {
    return `var(${fn(s)}, var(${fn(fallback)}))`;
  }
  return `var(${fn(s)})`;
};

export const cssVarSyntaxColorToken = (s: SyntaxTokens) => cssVarSyntaxToken(s, cssSyntaxColorToken);

export const cssVarSyntaxStyleToken = (s: SyntaxTokens) => cssVarSyntaxToken(s, cssSyntaxStyleToken);

export const cssVarSyntaxWeightToken = (s: SyntaxTokens) => cssVarSyntaxToken(s, cssSyntaxWeightToken);

export function themeStyleToCssVars(style?: ThemeStyleContent): Record<string, string | number | undefined | null> {
  const cssStyleVars: Record<string, string | number | undefined | null> = {};

  if (style) {
    for (const [key, value] of Object.entries(style)) {
      if (key === 'players' || key === 'syntax') continue;
      cssStyleVars[cssStyleToken(key)] = `${value}`;
    }

    if (style.syntax) {
      for (const [key, syntax] of Object.entries(style.syntax)) {
        cssStyleVars[cssSyntaxColorToken(key)] = syntax?.color;
        cssStyleVars[cssSyntaxStyleToken(key)] = syntax?.font_style;
        cssStyleVars[cssSyntaxWeightToken(key)] = syntax?.font_weight;
      }
    }
  }

  return cssStyleVars;
}
