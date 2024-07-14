import { cssVarStyleToken } from "~/utils/cssVarTokens";
import type { StyleTokens } from "../../../providers/tokens";

const ansiColors = ["black", "blue", "cyan", "green", "magenta", "red", "white", "yellow"];

export function TerminalShell() {
  return (
    <div
      id="editor-terminal-shell"
      className="flex flex-col gap-x-2 p-1"
      style={{ backgroundColor: cssVarStyleToken("terminal.background") }}
    >
      <span className="flex gap-1 whitespace-nowrap">
        <span style={{ color: cssVarStyleToken("terminal.ansi.yellow") }}>zed ➤</span>
        <span style={{ color: cssVarStyleToken("terminal.ansi.green") }}>./colors.sh</span>
      </span>
      <div className="flex">
        {ansiColors.map((color, i) => (
          <span
            key={`row-${i.toString()}`}
            className="w-[50px] text-center"
            style={{
              color: cssVarStyleToken("terminal.ansi.white"),
              backgroundColor: cssVarStyleToken(`terminal.ansi.${color}` as StyleTokens),
            }}
          >
            {i.toString().padStart(3, "0")}
          </span>
        ))}
      </div>
      <div className="flex">
        {ansiColors.map((color, i) => (
          <span
            key={`row-${i.toString()}`}
            className="w-[50px] text-center"
            style={{
              color: cssVarStyleToken("terminal.ansi.black"),
              backgroundColor: cssVarStyleToken(`terminal.ansi.bright_${color}` as StyleTokens),
            }}
          >
            {(i + ansiColors.length).toString().padStart(3, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}
