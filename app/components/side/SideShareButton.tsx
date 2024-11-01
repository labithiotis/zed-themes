import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { RxShare1 } from 'react-icons/rx';
import { useThemeStore } from '~/providers/theme';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export function SideShareButton({ edit }: { edit: boolean }) {
  const { toast } = useToast();
  const themeFamily = useThemeStore((s) => s.themeFamily);
  const fetcher = useFetcher<{ shareUrl: string }>({ key: 'theme-share' });

  useEffect(() => {
    if (fetcher.data) {
      try {
        navigator?.clipboard
          .writeText(fetcher.data.shareUrl)
          .then(() => toast({ description: 'A shareable url has been copied to your clipboard.' }))
          .catch(() => toast({ description: 'Permission disallowed to copy to clipboard.', variant: 'destructive' }));
      } catch (e) {
        console.log(e);
      }
    }
  }, [fetcher.data, toast]);

  const shareTheme = () => {
    if (edit) {
      fetcher.submit({ theme: JSON.stringify(themeFamily) }, { action: '/api/theme/share', method: 'POST' });
    } else {
      navigator?.clipboard
        .writeText(document.location.href)
        .then(() => toast({ description: 'Link has been copied to your clipboard.' }))
        .catch(() => toast({ description: 'Permission is disallowed to copy to clipboard.', variant: 'destructive' }));
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={shareTheme}
      className="flex-1 flex gap-1 items-center"
      loading={fetcher.state === 'submitting'}
    >
      <RxShare1 />
      Share
    </Button>
  );
}
