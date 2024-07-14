import type { CSSProperties } from "react";
import type { StyleTokens, SyntaxTokens } from "../providers/tokens";
import type { ThemeStyleContent } from "../themeFamily";

const PATTERN = /[._]/g;

export const sanitizeToken = (s: string) => s.replace(PATTERN, "-");

export const cssStyleToken = (s: StyleTokens | string) => `--style-${sanitizeToken(s)}` as const;

export const cssVarStyleToken = (s: StyleTokens, c?: string) => {
  const fallback = s.split(".").shift();
  if (fallback) {
    return `var(${cssStyleToken(s)}, var(${cssStyleToken(fallback)}${c ? `,${c}` : ""}))`;
  }
  return `var(${cssStyleToken(s)}${c ? `,${c}` : ""})`;
};

export const cssSyntaxColorToken = (s: SyntaxTokens | string): `--${string}` =>
  `--style-syntax-${sanitizeToken(s)}-color` as const;

export const cssSyntaxStyleToken = (s: SyntaxTokens | string): `--${string}` =>
  `--style-syntax-${sanitizeToken(s)}-style` as const;

export const cssSyntaxWeightToken = (s: SyntaxTokens | string): `--${string}` =>
  `--style-syntax-${sanitizeToken(s)}-weight` as const;

export const cssVarSyntaxToken = (s: SyntaxTokens, fn: (s: SyntaxTokens | string) => string) => {
  const fallback = s.split(".").shift();
  if (fallback) {
    return `var(${fn(s)}, var(${fn(fallback)}))`;
  }
  return `var(${fn(s)})`;
};

export const cssVarSyntaxColorToken = (s: SyntaxTokens) => cssVarSyntaxToken(s, cssSyntaxColorToken);

export const cssVarSyntaxStyleToken = (s: SyntaxTokens) => cssVarSyntaxToken(s, cssSyntaxStyleToken);

export const cssVarSyntaxWeightToken = (s: SyntaxTokens) => cssVarSyntaxToken(s, cssSyntaxWeightToken);

export function themeStyleToCssVars(style?: ThemeStyleContent): CSSProperties {
  const cssStyleVars: CSSProperties = {};

  if (style) {
    for (const [key, value] of Object.entries(style)) {
      if (key === "players" || key === "syntax") continue;
      cssStyleVars[cssStyleToken(key)] = `${value}`;
    }

    if (style.syntax) {
      for (const [key, syntax] of Object.entries(style.syntax)) {
        if (syntax?.color) {
          cssStyleVars[cssSyntaxColorToken(key)] = syntax.color;
        }
        if (syntax?.font_style) {
          cssStyleVars[cssSyntaxStyleToken(key)] = syntax.font_style;
        }
        if (syntax?.font_weight) {
          cssStyleVars[cssSyntaxWeightToken(key)] = syntax.font_weight;
        }
      }
    }
  }

  return cssStyleVars;
}
