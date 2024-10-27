import { describe, expect, it } from 'vitest';
import { merge } from '~/utils/helpers';
import { initialState, themeReducer } from './theme';
import { createThemeFamily } from './themeFamily';
import {
  borderTokens,
  colorTokens,
  editorTokens,
  elementTokens,
  ghostElementTokens,
  gitTokens,
  iconTokens,
  miscTokens,
  scrollbarTokens,
  syntaxTokens,
  terminalTokens,
  textTokens,
} from './tokens';

describe('Theme Reducer', () => {
  it('can set theme', () => {
    const newTheme = createThemeFamily({
      name: 'new theme',
      themes: [{ name: 'new theme', style: { background: 'blue' } }],
    });

    const nextState = themeReducer(initialState, {
      type: 'set',
      themeId: null,
      themeFamily: newTheme,
    });

    expect(nextState).toEqual({
      themeId: null,
      themeIndex: 0,
      themeFamily: newTheme,
    });
  });

  it('can setThemeIndex', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [
          { name: 'theme 1', style: { background: 'blue' } },
          { name: 'theme 2', style: { background: 'red' } },
        ],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setIndex',
      index: 1,
    });

    expect(nextState.themeIndex).toEqual(1);
  });

  it('can setFamilyName', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setFamilyName',
      name: 'name1',
    });

    expect(nextState.themeFamily?.name).toEqual('name1');
  });

  it('can setThemeName', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setThemeName',
      name: 'name1',
    });

    expect(nextState.themeFamily?.themes[0]?.name).toEqual('name1');
  });

  it('can setThemeAppearance', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setThemeAppearance',
      appearance: 'dark',
    });

    expect(nextState.themeFamily?.themes[0]?.appearance).toEqual('dark');
  });

  it('can setBackgroundAppearance', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setBackgroundAppearance',
      appearance: 'opaque',
    });

    expect(nextState.themeFamily?.themes[0]?.style['background.appearance']).toEqual('opaque');
  });

  for (const token of [
    ...borderTokens,
    ...elementTokens,
    ...ghostElementTokens,
    ...textTokens,
    ...iconTokens,
    ...scrollbarTokens,
    ...terminalTokens,
    ...editorTokens,
    ...colorTokens,
    ...gitTokens,
    ...miscTokens,
  ]) {
    it(`can setStyleToken ${token}`, () => {
      const state = merge(initialState, { themeIndex: 0, themeFamily: createThemeFamily({ name: 'new theme' }) });

      const nextState = themeReducer(state, {
        type: 'setStyleToken',
        token,
        color: 'red',
      });

      expect(nextState.themeFamily?.themes[0]?.style[token]).toEqual('red');
    });
  }

  for (const token of syntaxTokens) {
    it(`can setSyntaxToken ${token} if not preset`, () => {
      const state = merge(initialState, {
        themeIndex: 0,
        themeFamily: createThemeFamily({
          name: 'new theme',
          themes: [{ name: 'theme 1', style: { syntax: {} } }],
        }),
      });

      const nextState = themeReducer(state, {
        type: 'setSyntaxToken',
        token,
        content: { color: 'red' },
      });

      expect(nextState.themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'red',
        font_weight: null,
        font_style: null,
      });
    });

    it(`can setSyntaxToken ${token} color`, () => {
      const state = merge(initialState, {
        themeIndex: 0,
        themeFamily: createThemeFamily({
          name: 'new theme',
          themes: [
            {
              name: 'theme 1',
              style: { syntax: { [token]: { color: 'blue', font_weight: 500, font_style: 'italic' } } },
            },
          ],
        }),
      });

      const nextState = themeReducer(state, {
        type: 'setSyntaxToken',
        token,
        content: { color: 'red' },
      });

      expect(nextState.themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'red',
        font_weight: 500,
        font_style: 'italic',
      });
    });

    it(`can setSyntaxToken ${token} font_weight`, () => {
      const state = merge(initialState, {
        themeIndex: 0,
        themeFamily: createThemeFamily({
          name: 'new theme',
          themes: [
            {
              name: 'theme 1',
              style: { syntax: { [token]: { color: 'blue', font_weight: 500, font_style: 'italic' } } },
            },
          ],
        }),
      });

      const nextState = themeReducer(state, {
        type: 'setSyntaxToken',
        token,
        content: { font_weight: 700 },
      });

      expect(nextState.themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'blue',
        font_weight: 700,
        font_style: 'italic',
      });
    });

    it(`can setSyntaxToken ${token} font_style`, () => {
      const state = merge(initialState, {
        themeIndex: 0,
        themeFamily: createThemeFamily({
          name: 'new theme',
          themes: [
            {
              name: 'theme 1',
              style: { syntax: { [token]: { color: 'blue', font_weight: 500, font_style: 'italic' } } },
            },
          ],
        }),
      });

      const nextState = themeReducer(state, {
        type: 'setSyntaxToken',
        token,
        content: { font_style: 'normal' },
      });

      expect(nextState.themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'blue',
        font_weight: 500,
        font_style: 'normal',
      });
    });
  }

  it('can setPlayerToken background', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ background: 'blue' }] } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setPlayerToken',
      index: 0,
      token: 'background',
      color: 'red',
    });

    expect(nextState.themeFamily?.themes[0]?.style.players?.[0]?.background).toEqual('red');
  });

  it('can setPlayerToken cursor', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ cursor: 'blue' }] } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setPlayerToken',
      index: 0,
      token: 'cursor',
      color: 'red',
    });

    expect(nextState.themeFamily?.themes[0]?.style.players?.[0]?.cursor).toEqual('red');
  });

  it('can setPlayerToken selection', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ selection: 'blue' }] } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'setPlayerToken',
      index: 0,
      token: 'selection',
      color: 'red',
    });

    expect(nextState.themeFamily?.themes[0]?.style.players?.[0]?.selection).toEqual('red');
  });

  it('can add player', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [] } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'addPlayer',
    });

    expect(nextState.themeFamily?.themes[0]?.style.players?.length).toEqual(1);
  });

  it('can remove player', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [
          {
            name: 'theme 1',
            style: { players: [{ background: 'red' }, { background: 'green' }, { background: 'blue' }] },
          },
        ],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'removePlayer',
      index: 1,
    });

    expect(nextState.themeFamily?.themes[0]?.style.players).toEqual([{ background: 'red' }, { background: 'blue' }]);
  });

  it('can addTheme', () => {
    const state = merge(initialState, {
      themeIndex: 0,
      themeFamily: createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    });

    const nextState = themeReducer(state, {
      type: 'addTheme',
    });

    expect(nextState.themeFamily?.themes.length).toEqual(2);
    expect(nextState.themeFamily?.themes.at(1)?.name).toEqual('New Theme');
  });
});
