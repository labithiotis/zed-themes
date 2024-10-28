import { Image } from 'lucide-react';
import { useTheme } from '~/providers/theme';
import { cssVarStyleToken, themeStyleToCssVars } from '~/utils/cssVarTokens';
import duneDark from '../../assets/images/dune_dark.jpeg';
import duneLight from '../../assets/images/dune_light.jpeg';
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

export function Preview() {
  const { theme } = useTheme();
  const background = theme?.appearance === 'dark' ? duneDark : duneLight;
  const cssStyleVars = themeStyleToCssVars(theme?.style);

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
          color: cssVarStyleToken('text', theme?.appearance === 'dark' ? '#CCCCCC' : '#21201C'),
          borderColor: cssVarStyleToken('border'),
          backgroundColor:
            theme?.style['background.appearance'] === 'opaque'
              ? theme?.appearance === 'dark'
                ? '#000'
                : '#fff'
              : undefined,
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
      <Tooltip>
        <TooltipTrigger className="absolute top-2 left-2">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log('Files: ', res);
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
          />
        </TooltipTrigger>
        <TooltipContent side="right">
          Upload alternative background image for {theme?.appearance ?? ''} background
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
