import { useEffect } from 'react';
import { Layout } from '~/components/Layout';
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
    <Layout className="h-full mt-0 pt-14 flex">
      <div className="flex-1 flex min-w-[1024] overflow-hidden">
        <Side edit={true} />
        {!!themeFamily && <Preview />}
      </div>
    </Layout>
  );
}
