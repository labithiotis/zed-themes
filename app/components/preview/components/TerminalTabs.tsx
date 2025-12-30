import TerminalIcon from '~/assets/icons/terminal.svg?react';
import XIcon from '~/assets/icons/x.svg?react';
import { cssVarStyleToken } from '~/utils/cssVarTokens';
import { GhostButton } from './GhostButton';

export function TerminalTabs() {
  return (
    <div
      id="editor-terminal-tabs"
      className="flex"
      data-token="style.tab_bar.background"
      style={{ backgroundColor: cssVarStyleToken('tab_bar.background') }}
    >
      <div
        className="flex items-center gap-2 pl-4 pr-2"
        data-token="style.tab.active_background"
        style={{ backgroundColor: cssVarStyleToken('tab.active_background') }}
      >
        <span data-token="style.text">
          <TerminalIcon style={{ color: cssVarStyleToken('text') }} />
        </span>
        <span data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
          zed -- zsh
        </span>
        <GhostButton hidden={true}>
          <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
        </GhostButton>
      </div>
      <div
        className="flex items-center gap-2 border-b border-l pl-4 pr-2"
        data-token="style.tab.inactive_background"
        style={{
          borderColor: cssVarStyleToken('border'),
          backgroundColor: cssVarStyleToken('tab.inactive_background'),
        }}
      >
        <span data-token="style.text">
          <TerminalIcon style={{ color: cssVarStyleToken('text') }} />
        </span>
        <span data-token="style.text.muted" style={{ color: cssVarStyleToken('text.muted') }}>
          zed -- zsh
        </span>
        <GhostButton hidden={true}>
          <XIcon width={12} height={12} style={{ color: cssVarStyleToken('text.muted') }} />
        </GhostButton>
      </div>
      <div
        className="flex-1 border-b border-l"
        data-token="style.border"
        style={{ borderColor: cssVarStyleToken('border') }}
      />
    </div>
  );
}
