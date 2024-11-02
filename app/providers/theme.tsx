import update from 'immutability-helper';
import { temporal } from 'zundo';
import { type StateCreator, create } from 'zustand';
import type {
  AppearanceContent,
  HighlightStyleContent,
  PlayerColorContent,
  ThemeContent,
  ThemeFamilyContent,
} from '../themeFamily';
import type { StyleTokens, SyntaxTokens } from './tokens';

export const LOCAL_STORAGE_THEME_SYNC_KEY = '__theme__';

export type ColorHex = `#${string}`;

export type State = {
  themeId: string | null;
  themeIndex: number | null;
  themeFamily: ThemeFamilyContent | null;
};

export interface ThemeStore extends State {
  setThemeFamily: (themeId: string | null, themeFamily: ThemeFamilyContent, themeName?: string | null) => void;
  setThemeFamilyName: (name: string) => void;
  setThemeIndex: (index: number) => void;
  setThemeName: (name: string) => void;
  setThemeAppearance: (appearance: AppearanceContent) => void;
  setThemeBackgroundAppearance: (appearance: 'opaque' | 'transparent' | 'blurred') => void;
  setThemeStyleToken: (token: StyleTokens, color: unknown) => void;
  setThemeSyntaxToken: (token: SyntaxTokens, content: Partial<HighlightStyleContent>) => void;
  setThemePlayerToken: (index: number, token: keyof PlayerColorContent, color: unknown) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  addTheme: () => void;
}

export const stateCreator: StateCreator<ThemeStore> = (set) => ({
  themeId: null,
  themeIndex: null,
  themeFamily: null,

  setThemeFamily: (themeId, themeFamily, themeName) => {
    const themeIndex = themeName ? themeFamily.themes.findIndex((t) => t.name === themeName) : 0;
    set({
      themeId,
      themeIndex: themeIndex === -1 ? 0 : themeIndex,
      themeFamily,
    });
  },

  setThemeIndex: (index) => set({ themeIndex: index }),

  setThemeFamilyName: (name) =>
    set((state) => {
      if (state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          name: { $set: name },
        }),
      };
    }),

  setThemeName: (name) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: { name: { $set: name } },
          },
        }),
      };
    }),

  setThemeAppearance: (appearance) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: { appearance: { $set: appearance } },
          },
        }),
      };
    }),

  setThemeBackgroundAppearance: (appearance) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: {
              style: { 'background.appearance': { $set: appearance } },
            },
          },
        }),
      };
    }),

  setThemeStyleToken: (token, color) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};

      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: {
              style: {
                [token]: { $set: color },
              },
            },
          },
        }),
      };
    }),

  setThemeSyntaxToken: (token, content) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};

      let syntax = {};
      const currentSyntax = state.themeFamily.themes[state.themeIndex]?.style.syntax;
      const syntaxPresent = !!currentSyntax && Object.hasOwn(currentSyntax, token);

      if (syntaxPresent) {
        syntax = { [token]: { $merge: content } };
      } else {
        syntax = {
          $merge: { [token]: { color: null, font_style: null, font_weight: null, ...content } },
        };
      }

      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: { style: { syntax } },
          },
        }),
      };
    }),

  setThemePlayerToken: (index, token, color) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: {
              style: {
                players: {
                  [index]: { [token]: { $set: color } },
                },
              },
            },
          },
        }),
      };
    }),

  addPlayer: () =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: {
              style: {
                players: {
                  $push: [{ background: 'transparent' }],
                },
              },
            },
          },
        }),
      };
    }),

  removePlayer: (index) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return {};
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: {
              style: {
                players: {
                  $splice: [[index, 1]],
                },
              },
            },
          },
        }),
      };
    }),

  addTheme: () =>
    set((state) => {
      if (state.themeFamily === null || state.themeIndex === null) return {};
      return {
        themeIndex: state.themeFamily.themes.length,
        themeFamily: update(state.themeFamily, {
          themes: {
            $push: [
              {
                name: 'New Theme',
                appearance: state.themeFamily.themes[state.themeIndex]?.appearance ?? 'light',
                style: state.themeFamily.themes[state.themeIndex]?.style ?? {},
              } as ThemeContent,
            ],
          },
        }),
      };
    }),
});

export const useThemeStore = create<ThemeStore>()(temporal(stateCreator, { limit: 500 }));

// Subscribe to changes and persist to localStorage
useThemeStore.subscribe((state) => {
  if (typeof window !== 'undefined' && window.localStorage && state.themeFamily) {
    localStorage.setItem(LOCAL_STORAGE_THEME_SYNC_KEY, JSON.stringify(state.themeFamily));
  }
});

export const useTheme = () => {
  const themeIndex = useThemeStore((s) => s.themeIndex);
  const themeFamily = useThemeStore((s) => s.themeFamily);

  if (themeIndex === null || themeFamily === null) {
    return undefined;
  }

  return themeFamily.themes[themeIndex];
};

export const currentTheme = (s: State) =>
  typeof s.themeIndex === 'number' ? s.themeFamily?.themes?.[s.themeIndex] : undefined;

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;
