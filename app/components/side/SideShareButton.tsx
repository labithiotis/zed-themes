import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { RxShare1 } from 'react-icons/rx';
import { useTheme } from '~/providers/theme';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export function SideShareButton({ edit }: { edit: boolean }) {
  const { toast } = useToast();
  const { themeFamily } = useTheme();
  const fetcher = useFetcher<{ shareUrl: string }>({ key: 'theme-share' });

  useEffect(() => {
    if (fetcher.data) {
      navigator?.clipboard
        .writeText(fetcher.data.shareUrl)
        .then(() => toast({ description: 'A shareable url has been copied to your clipboard.' }));
    }
  }, [fetcher.data, toast]);

  const shareTheme = () => {
    if (edit) {
      fetcher.submit({ theme: JSON.stringify(themeFamily) }, { action: '/action/theme/share', method: 'POST' });
    } else {
      navigator?.clipboard
        .writeText(document.location.href)
        .then(() => toast({ description: 'Link has been copied to your clipboard.' }));
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
