import TerminalIcon from '~/assets/icons/terminal.svg?react';
import XIcon from '~/assets/icons/x.svg?react';
import { cssVarStyleToken } from '~/utils/cssVarTokens.ts';
import { GhostButton } from './GhostButton.tsx';

export function TerminalTabs() {
  return (
    <div id="editor-terminal-tabs" className="flex" style={{ backgroundColor: cssVarStyleToken('tab_bar.background') }}>
      <div
        className="flex items-center gap-2 pl-4 pr-2"
        style={{ backgroundColor: cssVarStyleToken('tab.active_background') }}
      >
        <TerminalIcon style={{ color: cssVarStyleToken('text') }} />
        <span style={{ color: cssVarStyleToken('text') }}>zed -- zsh</span>
        <GhostButton hidden={true}>
          <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
        </GhostButton>
      </div>
      <div
        className="flex items-center gap-2 border-b border-l pl-4 pr-2"
        style={{
          borderColor: cssVarStyleToken('border'),
          backgroundColor: cssVarStyleToken('tab.inactive_background'),
        }}
      >
        <TerminalIcon style={{ color: cssVarStyleToken('text') }} />
        <span style={{ color: cssVarStyleToken('text.muted') }}>zed -- zsh</span>
        <GhostButton hidden={true}>
          <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
        </GhostButton>
      </div>
      <div className="flex-1 border-b border-l" style={{ borderColor: cssVarStyleToken('border') }} />
    </div>
  );
}
