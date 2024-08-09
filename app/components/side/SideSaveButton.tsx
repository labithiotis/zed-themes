import { useUser } from '@clerk/remix';
import { useFetcher, useLocation, useNavigate, useRouteLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { RxShare1, RxUpload } from 'react-icons/rx';
import { useTheme } from '~/providers/theme';
import type { RootData } from '~/root';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useToast } from '../ui/use-toast';

export function SidePublishButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const { userId } = useRouteLoaderData<RootData>('root') ?? {};
  const { themeFamily } = useTheme();
  const fetcher = useFetcher<{ id: string }>({ key: 'publish-theme' });

  useEffect(() => {
    if (fetcher.data?.id) {
      toast({
        variant: 'success',
        description: '🎉 Theme has been published.',
      });
    }
  }, [fetcher.data, toast]);

  const publishTheme = () => {
    console.log('publishTheme');
    fetcher.submit(
      { theme: JSON.stringify({ author: user?.fullName, ...themeFamily }) },
      { action: '/action/save', method: 'POST' },
    );
  };

  if (userId) {
    return (
      <Button
        size="sm"
        className="flex-1 flex gap-1 items-center"
        onClick={publishTheme}
        loading={fetcher.state === 'submitting'}
      >
        <RxUpload />
        <span>Publish</span>
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button size="sm" variant="secondary" disabled={true} className="flex-1 flex gap-1 items-center">
          <RxUpload />
          <span>Publish</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Sign in to publish</TooltipContent>
    </Tooltip>
  );
}
