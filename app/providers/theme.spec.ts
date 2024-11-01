import { describe, expect, it } from 'vitest';
import { useThemeStore } from './theme';
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
  it('can set theme', () => {
    const newTheme = createThemeFamily({
      name: 'new theme',
      themes: [{ name: 'new theme', style: { background: 'blue' } }],
    });

    const store = useThemeStore.getState();
    store.set(null, newTheme);

    expect(useThemeStore.getState()).toMatchObject({
      themeId: null,
      themeIndex: 0,
      themeFamily: newTheme,
    });
  });

  it('can setThemeIndex', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [
          { name: 'theme 1', style: { background: 'blue' } },
          { name: 'theme 2', style: { background: 'red' } },
        ],
      }),
    );

    store.setIndex(1);

    expect(useThemeStore.getState().themeIndex).toEqual(1);
  });

  it('can setFamilyName', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    store.setFamilyName('name1');

    expect(useThemeStore.getState().themeFamily?.name).toEqual('name1');
  });

  it('can setThemeName', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    store.setThemeName('name1');

    expect(useThemeStore.getState().themeFamily?.themes[0]?.name).toEqual('name1');
  });

  it('can setThemeAppearance', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    store.setThemeAppearance('dark');

    expect(useThemeStore.getState().themeFamily?.themes[0]?.appearance).toEqual('dark');
  });

  it('can setBackgroundAppearance', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    store.setBackgroundAppearance('opaque');

    expect(useThemeStore.getState().themeFamily?.themes[0]?.style['background.appearance']).toEqual('opaque');
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
      const store = useThemeStore.getState();
      store.set(null, createThemeFamily({ name: 'new theme' }));

      store.setStyleToken(token, 'red');

      expect(useThemeStore.getState().themeFamily?.themes[0]?.style[token]).toEqual('red');
    });
  }

  for (const token of syntaxTokens) {
    it(`can setSyntaxToken ${token} if not preset`, () => {
      const store = useThemeStore.getState();
      store.set(
        null,
        createThemeFamily({
          name: 'new theme',
          themes: [{ name: 'theme 1', style: { syntax: {} } }],
        }),
      );

      store.setSyntaxToken(token, { color: 'red' });

      expect(useThemeStore.getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'red',
        font_weight: null,
        font_style: null,
      });
    });

    it(`can setSyntaxToken ${token} color`, () => {
      const store = useThemeStore.getState();
      store.set(
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

      store.setSyntaxToken(token, { color: 'red' });

      expect(useThemeStore.getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'red',
        font_weight: 500,
        font_style: 'italic',
      });
    });

    it(`can setSyntaxToken ${token} font_weight`, () => {
      const store = useThemeStore.getState();
      store.set(
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

      store.setSyntaxToken(token, { font_weight: 700 });

      expect(useThemeStore.getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'blue',
        font_weight: 700,
        font_style: 'italic',
      });
    });

    it(`can setSyntaxToken ${token} font_style`, () => {
      const store = useThemeStore.getState();
      store.set(
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

      store.setSyntaxToken(token, { font_style: 'normal' });

      expect(useThemeStore.getState().themeFamily?.themes[0]?.style.syntax?.[token]).toEqual({
        color: 'blue',
        font_weight: 500,
        font_style: 'normal',
      });
    });
  }

  it('can setPlayerToken background', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ background: 'blue' }] } }],
      }),
    );

    store.setPlayerToken(0, 'background', 'red');

    expect(useThemeStore.getState().themeFamily?.themes[0]?.style.players?.[0]?.background).toEqual('red');
  });

  it('can setPlayerToken cursor', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ cursor: 'blue' }] } }],
      }),
    );

    store.setPlayerToken(0, 'cursor', 'red');

    expect(useThemeStore.getState().themeFamily?.themes[0]?.style.players?.[0]?.cursor).toEqual('red');
  });

  it('can setPlayerToken selection', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [{ selection: 'blue' }] } }],
      }),
    );

    store.setPlayerToken(0, 'selection', 'red');

    expect(useThemeStore.getState().themeFamily?.themes[0]?.style.players?.[0]?.selection).toEqual('red');
  });

  it('can add player', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { players: [] } }],
      }),
    );

    store.addPlayer();

    expect(useThemeStore.getState().themeFamily?.themes[0]?.style.players?.length).toEqual(1);
  });

  it('can remove player', () => {
    const store = useThemeStore.getState();
    store.set(
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

    store.removePlayer(1);

    expect(useThemeStore.getState().themeFamily?.themes[0]?.style.players).toEqual([
      { background: 'red' },
      { background: 'blue' },
    ]);
  });

  it('can addTheme', () => {
    const store = useThemeStore.getState();
    store.set(
      null,
      createThemeFamily({
        name: 'new theme',
        themes: [{ name: 'theme 1', style: { background: 'blue' } }],
      }),
    );

    store.addTheme();

    expect(useThemeStore.getState().themeFamily?.themes.length).toEqual(2);
    expect(useThemeStore.getState().themeFamily?.themes.at(1)?.name).toEqual('New Theme');
  });
});
