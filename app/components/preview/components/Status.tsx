import AIIcon from '~/assets/icons/ai.svg?react';
import BellIcon from '~/assets/icons/bell.svg?react';
import ConversationsIcon from '~/assets/icons/conversations.svg?react';
import CopilotIcon from '~/assets/icons/copilot.svg?react';
import ErrorIcon from '~/assets/icons/error.svg?react';
import MailIcon from '~/assets/icons/mail_open.svg?react';
import ProjectIcon from '~/assets/icons/project.svg?react';
import TerminalIcon from '~/assets/icons/terminal.svg?react';
import UserIcon from '~/assets/icons/user_group_16.svg?react';
import WarningIcon from '~/assets/icons/warning.svg?react';
import { cssVarStyleToken } from '~/utils/cssVarTokens';

export function Status() {
  return (
    <div
      id="editor-status"
      className="flex items-center justify-between px-1"
      data-token="style.status_bar.background"
      style={{ backgroundColor: cssVarStyleToken('status_bar.background') }}
    >
      <div className="flex items-center">
        <span className="p-1" data-token="style.text">
          <UserIcon style={{ color: cssVarStyleToken('text') }} width={14} />
        </span>
        <span className="flex items-center gap-1 p-1">
          <span data-token="style.error">
            <ErrorIcon style={{ color: cssVarStyleToken('error') }} width={14} />
          </span>
          <span className="text-xs" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
            2
          </span>
        </span>
        <span className="flex items-center gap-1 p-1">
          <span data-token="style.warning">
            <WarningIcon style={{ color: cssVarStyleToken('warning') }} width={14} />
          </span>
          <span className="text-xs" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
            2
          </span>
        </span>
      </div>
      <div className="flex items-center">
        <span className="p-1 text-xs" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
          23:5
        </span>
        <span className="p-1 text-xs" data-token="style.text" style={{ color: cssVarStyleToken('text') }}>
          TSX
        </span>
        <span className="p-1" data-token="style.text">
          <CopilotIcon style={{ color: cssVarStyleToken('text') }} width={14} />
        </span>
        <span className="p-1" data-token="style.text">
          <MailIcon style={{ color: cssVarStyleToken('text') }} width={14} />
        </span>
        <span className="p-1" data-token="style.text.accent">
          <TerminalIcon style={{ color: cssVarStyleToken('text.accent') }} width={14} />
        </span>
        <span className="p-1" data-token="style.text.accent">
          <ProjectIcon style={{ color: cssVarStyleToken('text.accent') }} width={14} />
        </span>
        <span className="p-1" data-token="style.text">
          <AIIcon style={{ color: cssVarStyleToken('text') }} width={14} />
        </span>
        <span className="p-1" data-token="style.text">
          <ConversationsIcon style={{ color: cssVarStyleToken('text') }} width={14} />
        </span>
        <span className="p-1" data-token="style.text">
          <BellIcon style={{ color: cssVarStyleToken('text') }} width={14} />
        </span>
      </div>
    </div>
  );
}
