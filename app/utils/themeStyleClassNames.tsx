import 'react';
import { ThemeStyleContent } from '../state/themeFamily';
import { sanitizeToken } from './cssVarTokens';

export function themeStyleClassNames(style: ThemeStyleContent) {
  const styleClasses = Object.keys(style)
    .filter((s) => s !== 'players' && s !== 'syntax')
    .map((s) => {
      const key = sanitizeToken(s);
      return `.style-${key}-color { color: var(--style-${key}); }\n.style-${key}-background { background-color: var(--style-${key}); }\n.style-${key}-fill { fill: var(--style-${key}); }`;
    })
    .join('\n');

  const syntaxClasses = Object.keys(style.syntax ?? {})
    .map((s) => {
      const key = sanitizeToken(s);
      return `.style-syntax-${key} { fill: var(--style-syntax-${key}-color); font-style: var(--style-syntax-${key}-style); font-weight: var(--style-syntax-${key}-weight); }`;
    })
    .join('\n');

  return (
    <style>
      {/*{styleClasses}*/}
      {/*{syntaxClasses}*/}
    </style>
  );
}
