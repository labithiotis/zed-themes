import update from 'immutability-helper';
import { type Dispatch, type PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
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

type State = {
  themeId: string | null;
  themeIndex: number | null;
  themeFamily: ThemeFamilyContent | null;
};

type Set = {
  type: 'set';
  themeId: string | null;
  themeFamily: ThemeFamilyContent;
  themeName?: string | null;
};

type SetIndex = {
  type: 'setIndex';
  index: number;
};

type SetFamilyName = {
  type: 'setFamilyName';
  name: string;
};

type SetThemeName = {
  type: 'setThemeName';
  name: string;
};

type SetThemeAppearance = {
  type: 'setThemeAppearance';
  appearance: AppearanceContent;
};

type SetBackgroundAppearance = {
  type: 'setBackgroundAppearance';
  appearance: 'opaque' | 'transparent' | 'blurred';
};

type SetStyleToken = {
  type: 'setStyleToken';
  token: StyleTokens;
  color: unknown;
};

type SetSyntaxToken = {
  type: 'setSyntaxToken';
  token: SyntaxTokens;
  content: Partial<HighlightStyleContent>;
};

type SetPlayerToken = {
  type: 'setPlayerToken';
  index: number;
  token: keyof PlayerColorContent;
  color: unknown;
};

type AddTheme = {
  type: 'addTheme';
};

type Actions =
  | Set
  | SetIndex
  | SetFamilyName
  | SetThemeName
  | SetThemeAppearance
  | SetBackgroundAppearance
  | SetStyleToken
  | SetSyntaxToken
  | SetPlayerToken
  | AddTheme;

function activeTheme(state: State) {
  if (state.themeIndex === null || state.themeFamily === null) return undefined;
  return state.themeFamily.themes[state.themeIndex];
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'set': {
      const themeIndex = action.themeName ? action.themeFamily.themes.findIndex((t) => t.name === action.themeName) : 0;
      return update(state, {
        $set: {
          themeId: action.themeId,
          themeIndex: themeIndex === -1 ? 0 : themeIndex,
          themeFamily: action.themeFamily,
        },
      });
    }
    case 'setIndex': {
      return update(state, {
        themeIndex: { $set: action.index },
      });
    }
    case 'setFamilyName': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          name: { $set: action.name },
        },
      });
    }
    case 'setThemeName': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: { name: { $set: action.name } },
          },
        },
      });
    }
    case 'setThemeAppearance': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: { appearance: { $set: action.appearance } },
          },
        },
      });
    }
    case 'setBackgroundAppearance': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: { 'background.appearance': { $set: action.appearance } },
            },
          },
        },
      });
    }
    case 'setStyleToken': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: {
                [action.token]: { $set: action.color },
              },
            },
          },
        },
      });
    }
    case 'setSyntaxToken': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      let syntax = {};
      const syntaxPresent = state.themeFamily.themes[state.themeIndex]?.style.syntax[action.token];
      if (syntaxPresent) {
        syntax = { [action.token]: { $merge: action.content } };
      } else {
        syntax = {
          $merge: { [action.token]: { color: null, font_style: null, font_weight: null, ...action.content } },
        };
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: { style: { syntax } },
          },
        },
      });
    }
    case 'setPlayerToken': {
      if (state.themeIndex == null || state.themeFamily === null) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: {
                players: {
                  [action.index]: { [action.token]: { $set: action.color } },
                },
              },
            },
          },
        },
      });
    }
    case 'addTheme': {
      if (state.themeFamily === null || state.themeIndex === null) {
        return state;
      }

      return update(state, {
        themeIndex: {
          $set: state.themeFamily.themes.length,
        },
        themeFamily: {
          themes: {
            $push: [
              {
                name: 'New Theme',
                appearance: state.themeFamily.themes[state.themeIndex]?.appearance ?? 'light',
                style: state.themeFamily.themes[state.themeIndex]?.style ?? {},
              } as ThemeContent,
            ],
          },
        },
      });
    }
    default: {
      return state;
    }
  }
};

const initialState: State = {
  themeId: null,
  themeIndex: null,
  themeFamily: null,
};

const ThemeCtx = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
  state: initialState,
  dispatch: () => undefined,
});

export const ThemeProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_SYNC_KEY, JSON.stringify(state.themeFamily));
  }, [state]);

  return <ThemeCtx.Provider value={{ state, dispatch }}>{props.children}</ThemeCtx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  const theme = activeTheme(ctx.state);

  return {
    theme,
    themeId: ctx.state.themeId,
    index: ctx.state.themeIndex,
    themeFamily: ctx.state.themeFamily,
    dispatch: ctx.dispatch,
  };
};

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;
