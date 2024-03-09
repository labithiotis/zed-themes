import { useFetcher } from '@remix-run/react';
import { UiTheme } from './UiThemeToggle';

export function useSetUiTheme() {
  const fetcher = useFetcher<{ theme: UiTheme }>({ key: 'theme' });

  return (theme: UiTheme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      fetcher.submit({ theme: 'dark' }, { action: '/action/theme', method: 'post' });
    } else {
      document.documentElement.classList.remove('dark');
      fetcher.submit({ theme: 'light' }, { action: '/action/theme', method: 'post' });
    }
  };
}
