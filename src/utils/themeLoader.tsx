import { useSignal } from '@preact/signals';
import JSONCrush from 'jsoncrush';
import { useLayoutEffect } from 'preact/hooks';
import { theme, themeValidator } from '~/state/state.tsx';

export const THEME_LOADER_PARAM = 'share';

export function createShareThemeUrl() {
  const url = new URL(location.origin);
  url.pathname = 'theme';
  url.searchParams.set(
    THEME_LOADER_PARAM,
    encodeURIComponent(JSONCrush.crush(JSON.stringify(theme.value)))
  );
  return url.toString();
}

export function useShareThemeLoader() {
  const themeLoadingState = useSignal<{ loading: boolean; error?: string }>({
    loading: false,
    error: undefined,
  });
  const themeLoaderParam = new URLSearchParams(location.search).get(
    THEME_LOADER_PARAM
  );

  useLayoutEffect(() => {
    if (themeLoaderParam) {
      themeLoadingState.value = { loading: true, error: undefined };
      const loadedTheme = JSON.parse(
        JSONCrush.uncrush(decodeURIComponent(themeLoaderParam))
      );
      if (
        themeValidator({ name: 'zed', author: 'zed', themes: [loadedTheme] })
      ) {
        theme.value = loadedTheme;
        const url = new URL(location.href);
        url.searchParams.delete(THEME_LOADER_PARAM);
        history.replaceState({}, '', url.toString());
        themeLoadingState.value = { loading: false, error: undefined };
      } else {
        console.warn(themeValidator.errors);
        const message = themeValidator.errors?.map((e) => e.message).join('\n');
        themeLoadingState.value = { loading: false, error: message };
        alert(
          `File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`
        );
      }
    }
  }, [themeLoaderParam]);

  return themeLoadingState.value;
}

export function useThemeByIdLoader() {
  const url = new URL(location.href);
  const themeId = url.searchParams.get('id');
  const themeLoadingState = useSignal<{ loading: boolean; error?: string }>({
    loading: false,
    error: undefined,
  });

  useLayoutEffect(() => {
    if (themeId) {
      themeLoadingState.value = { loading: true, error: undefined };
      fetch(`/themes/${themeId}`).then(async (res) => {
        const data = await res.json();
        if (themeValidator(data)) {
          const firstTheme = data.themes.at(0);

          if (firstTheme) {
            theme.value = firstTheme;
            themeLoadingState.value = { loading: false, error: undefined };
          } else {
            themeLoadingState.value = { loading: false, error: 'No themes' };
          }
        } else {
          console.warn(themeValidator.errors);
          const message = themeValidator.errors
            ?.map((e) => e.message)
            .join('\n');
          themeLoadingState.value = { loading: false, error: message };
        }
      });
    }
  }, [themeId]);

  return themeLoadingState.value;
}
