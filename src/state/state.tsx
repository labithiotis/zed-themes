import { computed, effect, signal } from '@preact/signals';
import Ajv from 'ajv';
import defaultTheme from './defaultTheme.json';
import { ThemeContent, ThemeFamilyContent } from './themeFamily';
import themeFamilySchema from './themeFamily.json';

export type ColorHex = `#${string}`;

export const themeValidator = new Ajv().compile<ThemeFamilyContent>(
  themeFamilySchema
);

export const theme = signal<ThemeContent | null>(
  (defaultTheme.themes as unknown as ThemeContent[])[0]
);

export const themeFamily = computed<ThemeFamilyContent>(() => ({
  name: theme.value?.name ?? 'zed',
  author: 'zed',
  themes: theme.value ? [theme.value] : [],
}));

// Handle reading and storing theme to local storage
const LS_THEME_KEY = '__theme__';

try {
  theme.value = JSON.parse(localStorage.getItem(LS_THEME_KEY) ?? '');
} catch (e) {}

effect(() => {
  localStorage.setItem(LS_THEME_KEY, JSON.stringify(theme.value));
});
