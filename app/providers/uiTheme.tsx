import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type UiTheme = 'dark' | 'light';

const uiThemeCtx = createContext<{ uiTheme?: UiTheme; setUiTheme(theme: UiTheme): void }>({
  uiTheme: undefined,
  setUiTheme: () => undefined,
});

export const UiThemeProvider = (props: PropsWithChildren<{ uiTheme?: UiTheme }>) => {
  const [uiTheme, setUiTheme] = useState<UiTheme | undefined>(props.uiTheme);

  useEffect(() => {
    if (uiTheme) {
      document.documentElement.className = uiTheme;
    }
  }, [uiTheme]);

  return <uiThemeCtx.Provider value={{ uiTheme, setUiTheme }}>{props.children}</uiThemeCtx.Provider>;
};

export const useUiTheme = () => useContext(uiThemeCtx);
