import { StyleTokens, SyntaxTokens } from '../state/tokens';

export const cssStyleToken = (s: StyleTokens | string) =>
  `--st-${s.replace(/\./g, '-')}`;

export const cssVarStyleToken = (s: StyleTokens) => {
  const fallback = s.split('.').shift();
  if (fallback) {
    return `var(${cssStyleToken(s)}, var(${cssStyleToken(fallback)}))`;
  }
  return `var(${cssStyleToken(s)})`;
};

export const cssSyntaxColorToken = (s: SyntaxTokens | string) =>
  `--snc-${s.replace(/\./g, '-')}`;

export const cssSyntaxStyleToken = (s: SyntaxTokens | string) =>
  `--sns-${s.replace(/\./g, '-')}`;

export const cssSyntaxWeightToken = (s: SyntaxTokens | string) =>
  `--snw-${s.replace(/\./g, '-')}`;

export const cssVarSyntaxToken = (
  s: SyntaxTokens,
  fn: (s: SyntaxTokens | string) => string
) => {
  const fallback = s.split('.').shift();
  if (fallback) {
    return `var(${fn(s)}, var(${fn(fallback)}))`;
  }
  return `var(${fn(s)})`;
};

export const cssVarSyntaxColorToken = (s: SyntaxTokens) =>
  cssVarSyntaxToken(s, cssSyntaxColorToken);

export const cssVarSyntaxStyleToken = (s: SyntaxTokens) =>
  cssVarSyntaxToken(s, cssSyntaxStyleToken);

export const cssVarSyntaxWeightToken = (s: SyntaxTokens) =>
  cssVarSyntaxToken(s, cssSyntaxWeightToken);
