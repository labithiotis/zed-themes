import { useUser } from '@clerk/remix';
import { Image } from 'lucide-react';
import { useTheme } from '~/providers/theme';
import { cssVarStyleToken, themeStyleToCssVars } from '~/utils/cssVarTokens';
import { UploadButton } from '../UploadImage';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Code } from './components/Code';
import { Dock } from './components/Dock';
import { Header } from './components/Header';
import { Status } from './components/Status';
import { Tabs } from './components/Tabs';
import { Terminal } from './components/Terminal';

import './preview.css';
import { useEffect, useState } from 'react';
import type { UserPrefs } from '~/types';

const darkDefault = 'https://utfs.io/f/5PidoYyX3mAdMpWHRLXuMKE8rQq9POyied7htCAxTB1N0pkG';
const lightDefault = 'https://utfs.io/f/5PidoYyX3mAdApxhJE7jS2yVaTKZWG5FQsxd4gHtmfYCnr3w';

export function Preview({ userPrefs }: { userPrefs?: UserPrefs }) {
  const user = useUser();
  const { theme } = useTheme();
  const isDarkTheme = theme?.appearance === 'dark';
  const cssStyleVars = themeStyleToCssVars(theme?.style);
  const [background, setBackground] = useState(
    isDarkTheme ? (userPrefs?.image_dark ?? darkDefault) : (userPrefs?.image_light ?? lightDefault),
  );

  useEffect(() => {
    setBackground(isDarkTheme ? (userPrefs?.image_dark ?? darkDefault) : (userPrefs?.image_light ?? lightDefault));
  }, [isDarkTheme, userPrefs]);

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
      {user.isSignedIn && (
        <Tooltip delayDuration={0}>
          <TooltipTrigger className="absolute top-2 left-2">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={([res]) => {
                setBackground(res?.url ?? background);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
              appearance={{
                button: () => 'w-min h-min p-1 rounded-sm bg-opacity-55 bg-neutral-950 text-neutral-400',
                allowedContent: () => 'hidden',
                container: ({ ready }) => (!ready ? 'hidden' : ''),
              }}
              content={{
                button: ({ ready }) => (ready ? <Image size={12} /> : null),
              }}
              input={{ userPrefImageKey: isDarkTheme ? 'image_dark' : 'image_light' }}
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            Upload alternative background image for {theme?.appearance ?? ''} background
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
