import 'react';

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
};
