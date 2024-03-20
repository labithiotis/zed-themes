import ExitIcon from '~/assets/icons/exit.svg?react';
import { btnStyles } from './Side';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { useTheme } from '~/providers/theme';

export function SideShareButton() {
  const { themeFamily } = useTheme();
  const fetcher = useFetcher<{ shareUrl: string }>({ key: 'share-theme' });

  useEffect(() => {
    if (fetcher.data) {
      navigator.clipboard.writeText(fetcher.data.shareUrl);
      alert('A shareable url has been copied to your clipboard.');
    }
  }, [fetcher.data]);

  const shareTheme = () => {
    fetcher.submit(
      { id: 'share-theme', theme: JSON.stringify(themeFamily) },
      { action: '/action/share', method: 'post' }
    );
  };

  return (
    <button className={btnStyles} onClick={shareTheme}>
      <ExitIcon width={16} height={16} />
      Share Theme
    </button>
  );
}