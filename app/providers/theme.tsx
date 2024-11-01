import update from 'immutability-helper';
import { create } from 'zustand';
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

interface ThemeStore extends State {
  set: (themeId: string | null, themeFamily: ThemeFamilyContent, themeName?: string | null) => void;
  setIndex: (index: number) => void;
  setFamilyName: (name: string) => void;
  setThemeName: (name: string) => void;
  setThemeAppearance: (appearance: AppearanceContent) => void;
  setBackgroundAppearance: (appearance: 'opaque' | 'transparent' | 'blurred') => void;
  setStyleToken: (token: StyleTokens, color: unknown) => void;
  setSyntaxToken: (token: SyntaxTokens, content: Partial<HighlightStyleContent>) => void;
  setPlayerToken: (index: number, token: keyof PlayerColorContent, color: unknown) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  addTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  themeId: null,
  themeIndex: null,
  themeFamily: null,

  set: (themeId, themeFamily, themeName) => {
    const themeIndex = themeName ? themeFamily.themes.findIndex((t) => t.name === themeName) : 0;
    set({
      themeId,
      themeIndex: themeIndex === -1 ? 0 : themeIndex,
      themeFamily,
    });
  },

  setIndex: (index) => set({ themeIndex: index }),

  setFamilyName: (name) =>
    set((state) => {
      if (state.themeFamily === null) return state;
      return {
        themeFamily: update(state.themeFamily, {
          name: { $set: name },
        }),
      };
    }),

  setThemeName: (name) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return state;
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
      if (state.themeIndex == null || state.themeFamily === null) return state;
      return {
        themeFamily: update(state.themeFamily, {
          themes: {
            [state.themeIndex]: { appearance: { $set: appearance } },
          },
        }),
      };
    }),

  setBackgroundAppearance: (appearance) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return state;
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

  setStyleToken: (token, color) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return state;
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

  setSyntaxToken: (token, content) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return state;

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

  setPlayerToken: (index, token, color) =>
    set((state) => {
      if (state.themeIndex == null || state.themeFamily === null) return state;
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
      if (state.themeIndex == null || state.themeFamily === null) return state;
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
      if (state.themeIndex == null || state.themeFamily === null) return state;
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
      if (state.themeFamily === null || state.themeIndex === null) return state;
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
}));

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

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;
