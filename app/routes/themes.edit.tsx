import { useEffect } from 'react';
import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { LOCAL_STORAGE_THEME_SYNC_KEY, useTheme } from '~/providers/theme';
import { themeValidator } from '~/utils/themeValidator';

export default function ThemeEditor() {
  const { themeFamily, dispatch } = useTheme();

  useEffect(() => {
    if (themeFamily) return;

    const theme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_SYNC_KEY) ?? '');

    if (themeValidator(theme)) {
      dispatch({ type: 'set', themeFamily: theme });
    } else {
      console.warn('Unable to load theme from local storage as its invalid theme');
    }
  }, [themeFamily, dispatch]);

  return (
    <div className="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side edit={true} />
      {!!themeFamily && <Preview />}
    </div>
  );
}
