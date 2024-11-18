import { beforeEach, describe, expect, it } from 'vitest';
import { create } from 'zustand';
import { type ThemeStore, stateCreator } from './theme';
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

describe('Theme Store', () => {
  let getState: () => ThemeStore;

  beforeEach(() => {
    getState = create(stateCreator).getState;
  });

  it('can set theme', () => {
    const newTheme = createThemeFamily({
      name: 'new theme',
      themes: [{ name: 'new theme', style: { background: 'blue' } }],
    });

    getState().setThemeFamily(null, newTheme);

    expect(getState()).toMatchObject({
      themeId: null,
      themeIndex: 0,
      themeFamily: newTheme,
    });
  });

  it('can setThemeIndex', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [
          { name: 'theme 1', style: { background: 'blue' } },
          { name: 'theme 2', style: { background: 'red' } },
        ],
      }),
    );

    state.setThemeIndex(1);

    expect(getState().themeIndex).toEqual(1);
  });

  it('can setFamilyName', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    state.setThemeFamilyName('name1');

    expect(getState().themeFamily?.name).toEqual('name1');
  });

  it('can setThemeName', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    state.setThemeName('name1');

    expect(getState().themeFamily?.themes[0]?.name).toEqual('name1');
  });

  it('can setThemeAppearance', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    state.setThemeAppearance('dark');

    expect(getState().themeFamily?.themes[0]?.appearance).toEqual('dark');
  });

  it('can setBackgroundAppearance', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    state.setThemeBackgroundAppearance('opaque');

    expect(getState().themeFamily?.themes[0]?.style['background.appearance']).toEqual('opaque');
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
      const state = getState();
      state.setThemeFamily(null, createThemeFamily({ name: 'new theme' }));

      state.setThemeStyleToken(token, 'red');

      expect(getState().themeFamily?.themes[0]?.style[token]).toEqual('red');
    });
  }

  for (const token of syntaxTokens) {
    it(`can setSyntaxToken ${token} if not preset`, () => {
      const state = getState();
      state.setThemeFamily(
        null,
        createThemeFamily({
          name: 'new theme',
          themes: [{ name: 'theme 1', style: { syntax: {} } }],
        }),
      );

      state.setThemeSyntaxToken(token, { color: 'red' });

      expect(getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'red',
        font_weight: null,
        font_style: null,
      });
    });

    it(`can setSyntaxToken ${token} color`, () => {
      const state = getState();
      state.setThemeFamily(
        null,
        createThemeFamily({
          name: 'new theme',
          themes: [
            {
              name: 'theme 1',
              style: { syntax: { [token]: { color: 'blue', font_weight: 500, font_style: 'italic' } } },
            },
          ],
        }),
      );

      state.setThemeSyntaxToken(token, { color: 'red' });

      expect(getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'red',
        font_weight: 500,
        font_style: 'italic',
      });
    });

    it(`can setSyntaxToken ${token} font_weight`, () => {
      const state = getState();
      state.setThemeFamily(
        null,
        createThemeFamily({
          name: 'new theme',
          themes: [
            {
              name: 'theme 1',
              style: { syntax: { [token]: { color: 'blue', font_weight: 500, font_style: 'italic' } } },
            },
          ],
        }),
      );

      state.setThemeSyntaxToken(token, { font_weight: 700 });

      expect(getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'blue',
        font_weight: 700,
        font_style: 'italic',
      });
    });

    it(`can setSyntaxToken ${token} font_style`, () => {
      const state = getState();
      state.setThemeFamily(
        null,
        createThemeFamily({
          name: 'new theme',
          themes: [
            {
              name: 'theme 1',
              style: { syntax: { [token]: { color: 'blue', font_weight: 500, font_style: 'italic' } } },
            },
          ],
        }),
      );

      state.setThemeSyntaxToken(token, { font_style: 'normal' });

      expect(getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'blue',
        font_weight: 500,
        font_style: 'normal',
      });
    });
  }

  it('can syntax token if not syntax is not defined', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { syntax: undefined } }],
      }),
    );

    state.setThemeSyntaxToken('string', { color: 'red' });

    expect(getState().themeFamily?.themes[0]?.style.syntax?.string).toEqual({
      color: 'red',
      font_weight: null,
      font_style: null,
    });
  });

  it('can setPlayerToken background', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ background: 'blue' }] } }],
      }),
    );

    state.setThemePlayerToken(0, 'background', 'red');

    expect(getState().themeFamily?.themes[0]?.style.players?.[0]?.background).toEqual('red');
  });

  it('can setPlayerToken cursor', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ cursor: 'blue' }] } }],
      }),
    );

    state.setThemePlayerToken(0, 'cursor', 'red');

    expect(getState().themeFamily?.themes[0]?.style.players?.[0]?.cursor).toEqual('red');
  });

  it('can setPlayerToken selection', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ selection: 'blue' }] } }],
      }),
    );

    state.setThemePlayerToken(0, 'selection', 'red');

    expect(getState().themeFamily?.themes[0]?.style.players?.[0]?.selection).toEqual('red');
  });

  it('can add player when no players', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: undefined } }],
      }),
    );

    state.addPlayer();

    expect(getState().themeFamily?.themes[0]?.style.players?.length).toEqual(1);
  });

  it('can add player', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [] } }],
      }),
    );

    state.addPlayer();

    expect(getState().themeFamily?.themes[0]?.style.players?.length).toEqual(1);
  });

  it('can remove player', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [
          {
            name: 'theme 1',
            style: { players: [{ background: 'red' }, { background: 'green' }, { background: 'blue' }] },
          },
        ],
      }),
    );

    state.removePlayer(1);

    expect(getState().themeFamily?.themes[0]?.style.players).toEqual([{ background: 'red' }, { background: 'blue' }]);
  });

  it('can addTheme', () => {
    const state = getState();
    state.setThemeFamily(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    state.addTheme();

    expect(getState().themeFamily?.themes.length).toEqual(2);
    expect(getState().themeFamily?.themes.at(1)?.name).toEqual('New Theme');
  });
});
