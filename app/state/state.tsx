import { computed, signal, useSignalEffect } from '@preact/signals-react';
import { useEffect } from 'react';
import { ThemeContent, ThemeFamilyContent } from './themeFamily';
import validator from './validator/themeFamilyValidator.mjs';
import type { ValidateFunction } from 'ajv/dist/types';

export type ColorHex = `#${string}`;

export const themeValidator = validator as ValidateFunction<ThemeFamilyContent>;

export const theme = signal<ThemeContent | null>(null);

export const themeFamily = computed<ThemeFamilyContent>(() => ({
  name: theme.value?.name ?? 'zed',
  author: 'zed',
  themes: theme.value ? [theme.value] : [],
}));

// Handle reading and storing theme to local storage
const LS_THEME_KEY = '__theme__';
export function useThemeSync() {
  useEffect(() => {
    try {
      theme.value = JSON.parse(localStorage.getItem(LS_THEME_KEY) ?? '');
    } catch (e) {
      /* */
    }
  }, []);

  useSignalEffect(() => {
    localStorage.setItem(LS_THEME_KEY, JSON.stringify(theme.value));
  });
}
