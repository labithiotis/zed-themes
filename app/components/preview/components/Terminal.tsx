import { cssVarStyleToken } from "~/utils/cssVarTokens";
import { TerminalShell } from "./TerminalShell";
import { TerminalTabs } from "./TerminalTabs";

export function Terminal() {
  return (
    <div
      id="editor-terminal"
      className="flex flex-col border-t"
      style={{
        borderColor: cssVarStyleToken("border"),
      }}
    >
      <TerminalTabs />
      <TerminalShell />
    </div>
  );
}
