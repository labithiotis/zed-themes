import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { type PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export type ColorScheme = 'dark' | 'light';

const colorSchemeCtx = createContext<{
  colorScheme?: ColorScheme;
  setColorScheme(theme: ColorScheme): void;
}>({
  colorScheme: undefined,
  setColorScheme: () => console.warn('Calling setColorScheme provider beofre it is initialized!'),
});

export const ColorSchemeProvider = (props: React.PropsWithChildren<{ colorScheme?: ColorScheme }>) => {
  const peristColorScheme = usePeristColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme | undefined>(props.colorScheme);

  const colorSchemeHandler = useCallback(
    (colorScheme: ColorScheme) => {
      const el = document.documentElement.classList;
      colorScheme === 'dark' ? el.add('dark') : el.remove('dark');
      setColorScheme(colorScheme);
      peristColorScheme(colorScheme);
    },
    [peristColorScheme],
  );

  return (
    <colorSchemeCtx.Provider value={{ colorScheme, setColorScheme: colorSchemeHandler }}>
      <ColorSchemeLoader>{props.children}</ColorSchemeLoader>
    </colorSchemeCtx.Provider>
  );
};

export const useColorScheme = () => useContext(colorSchemeCtx);

function usePeristColorScheme() {
  const fetcher = useFetcher<{ colorScheme: ColorScheme }>({
    key: 'color-scheme',
  });

  return (colorScheme: ColorScheme) => {
    fetcher.submit({ colorScheme }, { action: '/action/color-scheme', method: 'post' });
  };
}

const prefersDarkMQ = '(prefers-color-scheme: dark)';
function ColorSchemeLoader({ children }: PropsWithChildren) {
  const called = useRef(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!called.current && !colorScheme.colorScheme) {
      colorScheme.setColorScheme(matchMedia(prefersDarkMQ).matches ? 'dark' : 'light');
      called.current = true;
    }
  }, [colorScheme]);

  useEffect(() => {
    const mediaQuery = matchMedia(prefersDarkMQ);
    const handleChange = () => {
      colorScheme.setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [colorScheme]);

  if (!colorScheme.colorScheme) return null;

  return <>{children}</>;
}
