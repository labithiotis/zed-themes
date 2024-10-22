import 'react';
import type { ThemeContent } from './themeFamily';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

export type Theme = {
  id: string;
  userId?: string;
  name: string;
  author: string;
  updatedDate: string;
  versionHash: string;
  bundled: boolean;
  themes: ThemeContent[];
};

export type ThemesMetaData = {
  id: string;
  name: string;
  author: string;
  updatedDate: number;
  versionHash: string;
  bundled: boolean;
  repoUrl?: string | null;
  repoStars?: number | null;
  userId?: string | null;
  themes: (Pick<ThemeContent, 'name' | 'appearance'> & {
    backgroundColor?: ThemeStyleContent['background'];
    backgroundAppearance?: ThemeStyleContent['background.appearance'];
  })[];
};
