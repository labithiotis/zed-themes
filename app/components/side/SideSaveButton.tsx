import { useUser } from '@clerk/remix';
import { useFetcher, useNavigate, useParams, useRouteLoaderData } from '@remix-run/react';
import type { ErrorObject } from 'ajv';
import { useEffect } from 'react';
import { RxUpload } from 'react-icons/rx';
import { useTheme } from '~/providers/theme';
import type { RootData } from '~/root';
import { getAuthor } from '~/utils/getAuthor';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useToast } from '../ui/use-toast';

export function SideSaveButton() {
  const { user } = useUser();
  const { toast } = useToast();
  const { themeId } = useParams();
  const navigate = useNavigate();
  const { userId } = useRouteLoaderData<RootData>('root') ?? {};
  const { themeFamily } = useTheme();
  const fetcher = useFetcher<{ success: boolean; id: string; error?: string; errors?: ErrorObject[] }>({
    key: themeId,
  });

  useEffect(() => {
    if (fetcher.data?.success) {
      toast({
        variant: 'success',
        description: '🎉 Theme has been published.',
      });
    }
    if (fetcher.data?.error) {
      toast({
        variant: 'destructive',
        description: (
          <div className="flex flex-col gap-1">
            <strong>{fetcher.data.error ?? 'An error occurred'}</strong>
            {fetcher.data.errors?.map((error, index) => (
              <div key={index}>
                <strong>{error.instancePath}</strong>
                <i> {error.message} </i>
                <strong>{Object.values(error.params).join(', ')}</strong>
              </div>
            ))}
          </div>
        ),
      });
    }
    if (fetcher.data?.id && (themeId === 'new' || themeId === 'edit')) {
      navigate(`/themes/${fetcher.data.id}`);
    }
  }, [fetcher.data, toast, themeId, navigate]);

  const publishTheme = () => {
    const id = !themeId || themeId === 'new' || themeId === 'edit' ? '' : themeId;
    fetcher.submit(
      { id, theme: JSON.stringify({ ...themeFamily, author: getAuthor(user) }) },
      { action: '/api/theme/save', method: 'POST' },
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
      <TooltipTrigger asChild>
        <Button size="sm" variant="secondary" disabled={true} className="flex-1 flex gap-1 items-center">
          <RxUpload />
          <span>Publish</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Sign in to publish</TooltipContent>
    </Tooltip>
  );
}
