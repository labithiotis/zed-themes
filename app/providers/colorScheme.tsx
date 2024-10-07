import { useFetcher } from '@remix-run/react';
import type React from 'react';
import { type PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { create } from 'zustand';

export type ColorScheme = 'dark' | 'light';

type ColorSchemeState = {
  colorScheme?: ColorScheme;
  setColorScheme(theme: ColorScheme): void;
};

export const useColorScheme = create<ColorSchemeState>((set) => ({
  colorScheme: undefined,
  setColorScheme: (colorScheme) => set({ colorScheme }),
}));

export const ColorSchemeProvider = (props: React.PropsWithChildren<{ colorScheme?: ColorScheme }>) => {
  const peristColorScheme = usePeristColorScheme();
  const colorScheme = useColorScheme((s) => s.colorScheme);
  const setColorScheme = useColorScheme((s) => s.setColorScheme);

  useEffect(() => {
    if (props.colorScheme) {
      setColorScheme(props.colorScheme);
    }
  }, [props.colorScheme, setColorScheme]);

  useEffect(() => {
    if (colorScheme) {
      const el = document.documentElement.classList;
      colorScheme === 'dark' ? el.add('dark') : el.remove('dark');
      peristColorScheme(colorScheme);
    }
  }, [colorScheme, peristColorScheme]);

  return <ColorSchemeLoader>{props.children}</ColorSchemeLoader>;
};

function usePeristColorScheme() {
  const fetcher = useFetcher<{ colorScheme: ColorScheme }>({
    key: 'color-scheme',
  });

  return useCallback(
    (colorScheme: ColorScheme) => {
      fetcher.submit({ colorScheme }, { action: '/action/color-scheme', method: 'post' });
    },
    [fetcher.submit],
  );
}

const prefersDarkMQ = '(prefers-color-scheme: dark)';
function ColorSchemeLoader({ children }: PropsWithChildren) {
  const loaded = useRef(false);
  const colorScheme = useColorScheme((s) => s.colorScheme);
  const setColorScheme = useColorScheme((s) => s.setColorScheme);

  useEffect(() => {
    if (!loaded.current && !colorScheme) {
      setColorScheme(matchMedia(prefersDarkMQ).matches ? 'dark' : 'light');
      loaded.current = true;
    }
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    const mediaQuery = matchMedia(prefersDarkMQ);
    const handleChange = () => {
      setColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setColorScheme]);

  if (!colorScheme) return null;

  return <>{children}</>;
}
