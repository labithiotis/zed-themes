import 'react';
import { ThemeContent } from './themeFamily';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export type ThemesMetaData = {
  name: string;
  author: string;
  updatedDate: string;
  versionHash: string;
  themes: Pick<ThemeContent, 'name' | 'appearance'>[];
};
