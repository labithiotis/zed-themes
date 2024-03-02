import JSONCrush from 'jsoncrush';
import { useLayoutEffect } from 'preact/hooks';
import { theme, themeValidator } from './state/state.tsx';

export const THEME_LOADER_PARAM = 'theme';

export function createShareThemeUrl() {
  const url = new URL(location.origin);
  url.pathname = 'theme';
  url.searchParams.set(
    THEME_LOADER_PARAM,
    encodeURI(JSONCrush.crush(JSON.stringify(theme.value)))
  );
  return url.toString();
}

export function useThemeLoader() {
  const themeLoaderParam = new URLSearchParams(location.search).get(
    THEME_LOADER_PARAM
  );

  useLayoutEffect(() => {
    if (themeLoaderParam) {
      const loadedTheme = JSON.parse(
        JSONCrush.uncrush(decodeURI(themeLoaderParam))
      );
      if (
        themeValidator({ name: 'zed', author: 'zed', themes: [loadedTheme] })
      ) {
        theme.value = loadedTheme;
        const url = new URL(location.href);
        url.searchParams.delete(THEME_LOADER_PARAM);
        location.href = url.toString();
      } else {
        console.warn(themeValidator.errors);
        const message = themeValidator.errors?.map((e) => e.message).join('\n');
        alert(
          `File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`
        );
      }
    }
  }, [themeLoaderParam]);
  return null;
}
