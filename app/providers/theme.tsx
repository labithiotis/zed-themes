import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
import { HighlightStyleContent, PlayerColorContent, ThemeFamilyContent } from '~/state/themeFamily';
import { StyleTokens, SyntaxTokens } from '~/state/tokens';
import update from 'immutability-helper';

const LOCAL_STORAGE_THEME_SYNC_KEY = '__theme__';

export type ColorHex = `#${string}`;

type State = {
  loading: boolean;
  themeIndex: number | null;
  themeFamily: ThemeFamilyContent | null;
};

type SetTheme = {
  type: 'set';
  themeFamily: ThemeFamilyContent;
};

type SetThemeName = {
  type: 'setThemeName';
  name: string;
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

type Actions = SetTheme | SetThemeName | SetStyleToken | SetSyntaxToken | SetPlayerToken;

function activeTheme(state: State) {
  if (state.themeIndex === null || state.themeFamily === null) return undefined;
  return state.themeFamily.themes[state.themeIndex];
}

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'set': {
      return { loading: false, themeIndex: 0, themeFamily: action.themeFamily };
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
    case 'setStyleToken': {
      if (state.themeIndex == null || state.themeFamily === null || !isValidColor(action.color)) {
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
      if (
        state.themeIndex == null ||
        state.themeFamily === null ||
        (action.content.color && !isValidColor(action.content.color))
      ) {
        return state;
      }

      return update(state, {
        themeFamily: {
          themes: {
            [state.themeIndex]: {
              style: {
                syntax: {
                  [action.token]: { $merge: action.content },
                },
              },
            },
          },
        },
      });
    }
    case 'setPlayerToken': {
      if (state.themeIndex == null || state.themeFamily === null || !isValidColor(action.color)) {
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
    default: {
      return state;
    }
  }
};

const initialState: State = {
  loading: true,
  themeIndex: null,
  themeFamily: null,
};

const ThemeCtx = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
  state: initialState,
  dispatch: () => undefined,
});

export const ThemeProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO Fix loading/sync edited theme in localStorage as it clashing with loading from server
  // useEffect(() => {
  //   try {
  //     const theme = localStorage.getItem(LOCAL_STORAGE_THEME_SYNC_KEY);
  //     if (theme) {
  //       dispatch({ type: 'set', themeFamily: JSON.parse(theme) });
  //     }
  //   } catch (e) {
  //     /* */
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_THEME_SYNC_KEY, JSON.stringify(state.themeFamily));
  // }, [state]);

  return <ThemeCtx.Provider value={{ state, dispatch }}>{props.children}</ThemeCtx.Provider>;
};

export const useTheme = () => {
  const { state, dispatch } = useContext(ThemeCtx);
  const theme = activeTheme(state);
  return { theme, dispatch, themeFamily: state.themeFamily, loading: state.loading };
};

export const useThemeDispatch = () => {
  const { dispatch } = useContext(ThemeCtx);
  return dispatch;
};

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;
