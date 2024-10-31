import { useUser } from '@clerk/remix';
import imageResize, { type typeOptions } from 'image-resize';
import { Image } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '~/providers/theme';
import { cssVarStyleToken, themeStyleToCssVars } from '~/utils/cssVarTokens';
import type { UserPrefs } from '~/utils/userPrefs.server';
import { UploadButton } from '../UploadImage.client';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '../ui/tooltip';
import { useToast } from '../ui/use-toast';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Code } from './components/Code';
import { Dock } from './components/Dock';
import { Header } from './components/Header';
import { Status } from './components/Status';
import { Tabs } from './components/Tabs';
import { Terminal } from './components/Terminal';

import './preview.css';
import { useFetcher } from '@remix-run/react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '../ui/button';

const imageResizeConfig: typeOptions = {
  quality: 0.8,
  width: 1024,
  outputType: 'blob',
};

export function Preview({ userPrefs }: { userPrefs?: UserPrefs }) {
  const user = useUser();
  const { toast } = useToast();
  const { theme } = useTheme();
  const fetcher = useFetcher<null>({ key: 'user-prefs-clear' });
  const isDarkTheme = theme?.appearance === 'dark';
  const cssStyleVars = themeStyleToCssVars(theme?.style);
  const [background, setBackground] = useState(getBackgroundImage(isDarkTheme, userPrefs));
  const customBg = Boolean(isDarkTheme ? userPrefs?.bgPreviewImageDark?.url : userPrefs?.bgPreviewImageLight?.url);

  useEffect(() => {
    setBackground(getBackgroundImage(isDarkTheme, userPrefs));
  }, [isDarkTheme, userPrefs]);

  const clearBg = () => {
    fetcher.submit({}, { action: '/api/user-prefs/clear', method: 'POST' });
  };

  return (
    <div
      id="preview-container"
      className="flex w-screen flex-1 select-none overflow-auto p-8 relative"
      style={{ background: `center / cover no-repeat url(${background})` }}
    >
      <div
        id="editor"
        className="flex flex-1 flex-col overflow-hidden rounded-lg border"
        style={{
          color: cssVarStyleToken('text', isDarkTheme ? '#CCCCCC' : '#21201C'),
          borderColor: cssVarStyleToken('border'),
          backgroundColor:
            theme?.style['background.appearance'] === 'opaque' ? (isDarkTheme ? '#000' : '#fff') : undefined,
          backdropFilter: theme?.style['background.appearance'] === 'blurred' ? 'blur(20px)' : 'none',
          minWidth: 800,
          minHeight: 600,
          ...cssStyleVars,
        }}
      >
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{ backgroundColor: cssVarStyleToken('background') }}
        >
          <Header />
          <div
            id="editor-body"
            className="flex flex-1 overflow-hidden border-b"
            style={{ borderColor: cssVarStyleToken('border') }}
          >
            <Dock />
            <div
              id="editor-main"
              className="flex flex-1 flex-col overflow-hidden border-l"
              style={{ borderColor: cssVarStyleToken('border') }}
            >
              <Tabs />
              <Breadcrumbs />
              <Code />
              <Terminal />
            </div>
          </div>
          <Status />
        </div>
      </div>
      {user.isSignedIn &&
        (customBg ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="absolute top-2 left-2" asChild>
              <Button
                size="xs"
                variant="ghost"
                className="p-1 h-min w-min bg-white bg-opacity-10"
                onClick={clearBg}
                loading={fetcher.state === 'submitting'}
              >
                <IoMdClose />
              </Button>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent side="top">Reset custom background image</TooltipContent>
            </TooltipPortal>
          </Tooltip>
        ) : (
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="absolute top-2 left-2">
              <UploadButton
                endpoint="imageUploader"
                onBeforeUploadBegin={async (files) => {
                  // The tooltip remains shown because button becomes focused, this just blurs focus away.
                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                  // Resize images to have max width of 1024px
                  return Promise.all(
                    files.map(
                      async (file) => new File([(await imageResize(file, imageResizeConfig)) as Blob], file.name),
                    ),
                  );
                }}
                onClientUploadComplete={([res]) => {
                  setBackground(res?.url ?? background);
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: 'destructive',
                    description: `Upload failed: ${error.message}`,
                  });
                }}
                appearance={{
                  button: () => 'w-min h-min p-1 rounded-sm bg-opacity-55 bg-neutral-950 text-neutral-400',
                  allowedContent: () => 'hidden',
                  container: ({ ready }) => (!ready ? 'hidden' : ''),
                }}
                content={{
                  button: ({ ready }) => (ready ? <Image size={12} /> : null),
                }}
                input={{ imageKey: isDarkTheme ? 'bgPreviewImageDark' : 'bgPreviewImageLight' }}
              />
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent side="top">Set custom background image for {theme?.appearance ?? ''} mode</TooltipContent>
            </TooltipPortal>
          </Tooltip>
        ))}
    </div>
  );
}

const darkDefault = 'https://utfs.io/f/5PidoYyX3mAddkzncB1jmycHZv26oYRqN3rhe9KtalBAEJfL';
const lightDefault = 'https://utfs.io/f/5PidoYyX3mAdN89JTyA0mtYuekWvgOGZTfR4zE2Q8cLV5jxX';

function getBackgroundImage(isDarkTheme: boolean, userPrefs?: UserPrefs) {
  return isDarkTheme
    ? (userPrefs?.bgPreviewImageDark?.url ?? darkDefault)
    : (userPrefs?.bgPreviewImageLight?.url ?? lightDefault);
}
