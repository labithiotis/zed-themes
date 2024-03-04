import { theme } from '~/state/state';
import './preview.css';
import { Breadcrumbs } from './parts/Breadcrumbs.tsx';
import { Code } from './parts/Code.tsx';
import { Dock } from './parts/Dock.tsx';
import { Header } from './parts/Header.tsx';
import { Status } from './parts/Status.tsx';
import { Tabs } from './parts/Tabs.tsx';
import { Terminal } from './parts/Terminal.tsx';
import { cssVarStyleToken, themeStyleToCssVars } from '~/utils/cssVarTokens.ts';

export function Preview() {
  const cssStyleVars = themeStyleToCssVars(theme.value?.style);

  return (
    <div
      id="preview-container"
      class="flex w-screen flex-1 select-none overflow-auto p-8"
      style={cssStyleVars}
    >
      <div
        id="editor"
        className="flex flex-1 flex-col overflow-hidden rounded-lg border"
        style={{
          borderColor: cssVarStyleToken('border'),
          backgroundColor: cssVarStyleToken('background'),
          minWidth: 800,
          maxWidth: 1000,
          minHeight: 600,
          maxHeight: 800,
        }}
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
  );
}
