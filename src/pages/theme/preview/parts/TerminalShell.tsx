import { StyleTokens } from '~/state/tokens.ts';
import { cssVarStyleToken } from '~/utils/cssVarTokens.ts';

const ansiColors = [
  'black',
  'blue',
  'cyan',
  'green',
  'magenta',
  'red',
  'white',
  'yellow',
];

export function TerminalShell() {
  return (
    <div
      id="editor-terminal-shell"
      class="flex flex-col gap-x-2 p-1"
      style={{ backgroundColor: cssVarStyleToken('terminal.background') }}
    >
      <span class="flex gap-1 whitespace-nowrap">
        <span style={{ color: cssVarStyleToken('terminal.ansi.yellow') }}>
          zed ➤
        </span>
        <span style={{ color: cssVarStyleToken('terminal.ansi.green') }}>
          ./colors.sh
        </span>
      </span>
      <div class="flex">
        {ansiColors.map((color, i) => (
          <span
            class="w-[50px] text-center"
            style={{
              color: cssVarStyleToken(`terminal.ansi.white`),
              backgroundColor: cssVarStyleToken(
                `terminal.ansi.${color}` as StyleTokens
              ),
            }}
          >
            {i.toString().padStart(3, '0')}
          </span>
        ))}
      </div>
      <div class="flex">
        {ansiColors.map((color, i) => (
          <span
            class="w-[50px] text-center"
            style={{
              color: cssVarStyleToken(`terminal.ansi.black`),
              backgroundColor: cssVarStyleToken(
                `terminal.ansi.bright_${color}` as StyleTokens
              ),
            }}
          >
            {(i + ansiColors.length).toString().padStart(3, '0')}
          </span>
        ))}
      </div>
    </div>
  );
}
