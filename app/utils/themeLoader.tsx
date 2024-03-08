import { useSignal } from '@preact/signals-react';
import { generatePath, useParams } from '@remix-run/react';
import JSONCrush from 'jsoncrush';
import { useEffect } from 'react';
import { theme, themeValidator } from '../state/state.tsx';

export const THEME_ID_PARAM = 'id';
export const THEME_SHARE_PARAM = 'share';

export function createShareThemeUrl() {
  return generatePath('/theme', {
    [THEME_SHARE_PARAM]: encodeURIComponent(JSONCrush.crush(JSON.stringify(theme.value))),
  });
}

export function useShareThemeLoader() {
  const themeLoadingState = useSignal<{ loading: boolean; error?: string }>({
    loading: false,
    error: undefined,
  });
  const themeLoaderParam = new URLSearchParams().get(THEME_SHARE_PARAM);

  useEffect(() => {
    if (themeLoaderParam) {
      themeLoadingState.value = { loading: true, error: undefined };
      const loadedTheme = JSON.parse(JSONCrush.uncrush(decodeURIComponent(themeLoaderParam)));
      if (themeValidator({ name: 'zed', author: 'zed', themes: [loadedTheme] })) {
        theme.value = loadedTheme;
        themeLoadingState.value = { loading: false, error: undefined };
      } else {
        console.warn(themeValidator.errors);
        const message = themeValidator.errors?.map((e) => e.message).join('\n');
        themeLoadingState.value = { loading: false, error: message };
        alert(`File does not match Zed's theme schema!\n\nWe got the following errors:\n${message}`);
      }
    }
  }, [themeLoaderParam]);

  return themeLoadingState.value;
}

export function useThemeByIdLoader() {
  const params = useParams();
  const themeId = params[THEME_ID_PARAM];
  const themeLoadingState = useSignal<{ loading: boolean; error?: string }>({
    loading: false,
    error: undefined,
  });

  useEffect(() => {
    // // if (themeId) {
    // //   themeLoadingState.value = { loading: true, error: undefined };
    // //   fetch(`/themes/${themeId}`).then(async (res) => {
    // //     const data = await res.json();
    // //     if (themeValidator(data)) {
    // //       const firstTheme = data.themes.at(0);
    // //
    // //       if (firstTheme) {
    // //         theme.value = firstTheme;
    // //         const url = new URL(href);
    // //         url.searchParams.delete('id');
    // //         history.replaceState({}, '', url.toString());
    // //         themeLoadingState.value = { loading: false, error: undefined };
    // //       } else {
    // //         themeLoadingState.value = { loading: false, error: 'No themes' };
    // //       }
    // //     } else {
    // //       console.warn(themeValidator.errors);
    // //       const message = themeValidator.errors?.map((e) => e.message).join('\n');
    // //       themeLoadingState.value = { loading: false, error: message };
    // //     }
    // //   });
    // }
  }, [themeId]);

  return themeLoadingState.value;
}
