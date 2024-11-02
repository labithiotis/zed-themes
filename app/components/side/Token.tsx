import { useCallback, useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import { currentTheme, useThemeStore } from '~/providers/theme';
import { cn } from '~/utils';
import { debounce } from '~/utils/debounce';
import type { StyleTokens, SyntaxTokens } from '../../providers/tokens';
import type { FontStyleContent, HighlightStyleContent } from '../../themeFamily';
import { TokenInput } from './TokenInput';
import type { TokenInfo } from './sections';

function useColor(token?: StyleTokens, syntaxToken?: SyntaxTokens) {
  if (syntaxToken) {
    return useThemeStore((s) => currentTheme(s)?.style?.syntax?.[syntaxToken]?.color);
  }
  if (!token) return undefined;
  return useThemeStore((s) => currentTheme(s)?.style?.[token]);
}

function useSyntax(token?: SyntaxTokens) {
  if (!token) return undefined;
  return useThemeStore((s) => currentTheme(s)?.style?.syntax?.[token]);
}

export function Token({
  token,
  syntaxToken,
  onChange,
  onClear,
  edit,
}: {
  token?: TokenInfo;
  syntaxToken?: SyntaxTokens;
  onChange(color: string): void;
  onClear(): void;
  onSyntaxStyleChange?(fontStyle: string): void;
  onSyntaxFontChange?(fontStyle: number): void;
  edit?: boolean;
}) {
  const name = token?.name ?? syntaxToken ?? '';
  const description = token?.description ?? null;
  const [showColor, setShowColor] = useState(false);
  const color = useColor(token?.token, syntaxToken);
  const syntax = useSyntax(syntaxToken);
  const setSyntaxToken = useThemeStore((s) => s.setThemeSyntaxToken);

  const setSyntaxTokenHandler = useCallback(
    debounce((token: SyntaxTokens, content: Partial<HighlightStyleContent>) => {
      setSyntaxToken(token, content);
    }, 25),
    [],
  );

  return (
    <div className="flex flex-col px-4 py-1">
      <div className="flex flex-row items-center gap-2" title={!showColor && !!description ? description : undefined}>
        <button
          type="button"
          className={cn(
            'color-preview h-9 min-h-9 w-9 min-w-9 rounded border outline-none active:translate-y-[0px] active:scale-100',
            {
              'cursor-pointer hover:scale-[1.05] hover:pb-[1px] hover:translate-y-[-1px]': edit,
            },
          )}
          style={{
            color: color ? color : 'transparent',
            borderColor: color ? `color-mix(in xyz, ${color} 70%, black)` : '#808080',
          }}
          onClick={() => setShowColor(!showColor)}
          aria-label="Token color preview toggle color picker"
          disabled={!edit}
        />
        <div className="flex flex-1 flex-col text-sm text-zinc-800 dark:text-zinc-300">
          <button
            type="button"
            onClick={() => setShowColor(!showColor)}
            className={cn('text-left outline-none pl-1', {
              'cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-200': edit,
            })}
            aria-label="Token color name toggle color picker"
            disabled={!edit}
          >
            {name}
          </button>
          <div className="flex items-center gap-2">
            <TokenInput
              value={color ?? ''}
              className={cn(
                'border-1 h-[22px] flex-1 rounded border border-solid border-transparent bg-transparent px-1 text-zinc-600 outline-none focus:border-zinc-400 focus:text-black dark:text-zinc-500  dark:focus:border-zinc-500 dark:focus:text-white',
                {
                  'cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800':
                    edit,
                },
              )}
              type="text"
              placeholder="unset"
              disabled={!edit}
              onChange={(e) => onChange(e.currentTarget.value?.trim())}
              onClear={onClear}
            />
            {!!syntaxToken && (
              <>
                <select
                  name="font-style"
                  disabled={!edit}
                  className="w-16 h-[22px] rounded-md border border-neutral-300 bg-transparent text-sm text-neutral-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  value={syntax?.font_style ?? ''}
                  onChange={(e) =>
                    setSyntaxTokenHandler(syntaxToken, {
                      font_style: e.target.value === 'unset' ? null : (e.target.value as FontStyleContent),
                    })
                  }
                >
                  <option value="unset">unset</option>
                  <option value="normal">normal</option>
                  <option value="italic">italic</option>
                  <option value="oblique">oblique</option>
                </select>
                <select
                  name="font-weight"
                  disabled={!edit}
                  className="w-16 h-[22px] rounded-md border border-neutral-300 bg-transparent text-sm text-neutral-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  value={syntax?.font_weight?.toString() ?? ''}
                  onChange={(e) =>
                    setSyntaxTokenHandler(syntaxToken, {
                      font_weight:
                        e.target.value === 'unset' ? null : (+e.target.value as HighlightStyleContent['font_weight']),
                    })
                  }
                >
                  <option value="unset">unset</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                </select>
              </>
            )}
          </div>
        </div>
      </div>
      {showColor && (
        <div className="flex flex-1 flex-col py-2">
          {!!description && <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>}
          <HexAlphaColorPicker color={color ?? ''} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
