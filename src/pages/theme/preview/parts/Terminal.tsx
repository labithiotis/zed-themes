import { cssVarStyleToken } from '~/utils/cssVarTokens.ts';
import { TerminalShell } from './TerminalShell.tsx';
import { TerminalTabs } from './TerminalTabs.tsx';

export function Terminal() {
  return (
    <div
      id="editor-terminal"
      class="flex flex-col border-t"
      style={{
        borderColor: cssVarStyleToken('border'),
      }}
    >
      <TerminalTabs />
      <TerminalShell />
    </div>
  );
}
