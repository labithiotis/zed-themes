import { useSignal } from '@preact/signals';
import { HexAlphaColorPicker } from 'react-colorful';
import { theme } from '~/state/state.tsx';
import { PlayerColorContent } from '~/state/themeFamily';
import { debounce } from '~/utils/debounce.ts';
import { isValidColor } from './Token.tsx';
import { playerTokens } from '~/state/tokens.ts';

const setPlayerToken = debounce(
  (playerIndex: number, token: keyof PlayerColorContent, color: unknown) => {
    const isValid = isValidColor(color);
    if (theme.value && isValid) {
      const players = theme.value.style.players.map((p, index) =>
        index === playerIndex ? { ...p, [token]: color } : p
      );
      theme.value = {
        ...theme.value,
        style: { ...theme.value?.style, players },
      };
    }
  },
  25
);

export function Player({
  index,
  player,
}: {
  index: number;
  player: PlayerColorContent;
}) {
  const showColor = useSignal(false);

  return (
    <div class="flex flex-col px-3 py-1">
      <p class="text-zinc-600 dark:text-zinc-200">Player {index + 1}</p>
      {playerTokens.map((token) => (
        <div class="flex flex-col px-2 py-1">
          <div class="flex flex-row items-center gap-2">
            <div
              class="color-preview h-9 min-h-9 w-9 min-w-9 cursor-pointer rounded border hover:translate-y-[-1px] hover:scale-[1.05] hover:pb-[1px] active:translate-y-[0px] active:scale-100"
              style={{
                color: player[token] ? player[token] : 'transparent',
                borderColor: player[token]
                  ? `color-mix(in xyz, ${player[token]} 70%, black)`
                  : '#808080',
              }}
              onClick={() => (showColor.value = !showColor.value)}
            />
            <div class="flex w-full flex-col text-sm text-zinc-800 dark:text-zinc-300">
              <p
                class="hover:cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-200"
                onClick={() => (showColor.value = !showColor.value)}
              >
                {token}
              </p>
              <div class="flex items-center gap-2 pr-2">
                <div class="flex-1">
                  <input
                    value={player[token] ?? ''}
                    class="border-1 h-[22px] w-full cursor-pointer rounded border border-solid border-transparent bg-transparent px-1 text-zinc-600 outline-none hover:border-zinc-300 hover:bg-zinc-200 focus:border-zinc-400 focus:text-black dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:border-zinc-500 dark:focus:text-white"
                    type="text"
                    placeholder="#color"
                    onChange={(e) =>
                      setPlayerToken(
                        index,
                        token,
                        e.currentTarget.value?.trim()
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {showColor.value && (
            <div class="flex flex-1 flex-col py-2">
              <HexAlphaColorPicker
                color={player[token] ?? ''}
                onChange={(color) => setPlayerToken(index, token, color)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
