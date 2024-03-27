import { useNavigate } from '@remix-run/react';
import update from 'immutability-helper';
import { Dispatch, PropsWithChildren, createContext, useContext, useEffect, useReducer } from 'react';
import { HighlightStyleContent, PlayerColorContent, ThemeFamilyContent } from '../themeFamily';
import { StyleTokens, SyntaxTokens } from './tokens';

const LOCAL_STORAGE_THEME_SYNC_KEY = '__theme__';

export type ColorHex = `#${string}`;

type State = {
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
      return { themeIndex: 0, themeFamily: action.themeFamily };
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
                  [action.token]: { $merge: action.content ?? {} },
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
  themeIndex: null,
  themeFamily: null,
};

function getInitialState(): State {
  // Think about a nice way to sync theme locally and work nicely with remix ssr
  // try {
  //   const themeFamily = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_SYNC_KEY) ?? '');
  //   if (themeValidator(themeFamily)) {
  //     return { themeIndex: 0, themeFamily };
  //   } else {
  //     localStorage.removeItem(LOCAL_STORAGE_THEME_SYNC_KEY);
  //     return initialState;
  //   }
  // } catch (e) {
  //   console.warn(e);
  // }
  return initialState;
}

const ThemeCtx = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
  state: initialState,
  dispatch: () => undefined,
});

export const ThemeProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_SYNC_KEY, JSON.stringify(state.themeFamily));
  }, [state]);

  return <ThemeCtx.Provider value={{ state, dispatch }}>{props.children}</ThemeCtx.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  const navigate = useNavigate();
  const theme = activeTheme(ctx.state);
  const dispatch: typeof ctx.dispatch = (...args) => {
    // If we edit theme change the route to /edit
    if (args[0].type !== 'set') {
      navigate('/themes/edit', { replace: true, preventScrollReset: true });
    }
    return ctx.dispatch(...args);
  };

  return { theme, dispatch, themeFamily: ctx.state.themeFamily };
};

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;
