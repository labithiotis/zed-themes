import { Toggle } from '@radix-ui/react-toggle';
import { useFetcher } from '@remix-run/react';
import { useCallback, useEffect, useRef } from 'react';
import { UiTheme, useUiTheme } from '~/providers/uiTheme';

function useSetUiTheme() {
  const fetcher = useFetcher<{ uiTheme: UiTheme }>({ key: 'ui-theme' });

  return (uiTheme: UiTheme) => {
    const el = document.documentElement.classList;
    uiTheme === 'dark' ? el.add('dark') : el.remove('dark');
    // FIX ME on load when theme is not set this is invoked but the network request is GET not POST! Invoking this fn via UI toggle works just fine
    fetcher.submit({ uiTheme }, { action: '/action/theme', method: 'POST' });
  };
}

export function UiThemeLoader() {
  const called = useRef(false);
  const uiTheme = useUiTheme();
  const setUiTheme = useSetUiTheme();

  useEffect(() => {
    if (!called.current && !uiTheme.uiTheme && typeof window === 'object') {
      const t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setUiTheme(t);
      uiTheme.setUiTheme(t);
      called.current = true;
    }
  }, [uiTheme, setUiTheme]);

  return null;
}

export function UiThemeToggle() {
  const uiTheme = useUiTheme();
  const setUiTheme = useSetUiTheme();

  const toggle = useCallback(() => {
    const nextUiTheme = uiTheme.uiTheme === 'dark' ? 'light' : 'dark';
    uiTheme.setUiTheme(nextUiTheme);
    setUiTheme(nextUiTheme);
  }, [uiTheme, setUiTheme]);

  return (
    <Toggle
      onClick={toggle}
      className="flex h-5 w-5 items-center justify-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      aria-label="Toggle theme"
    >
      {uiTheme.uiTheme === 'dark' ? (
        <svg
          data-theme="dark"
          className="h-3 w-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          data-theme="light"
          className="h-3 w-3"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      )}
    </Toggle>
  );
}
