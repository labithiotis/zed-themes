import { useSignal } from '@preact/signals-react';
import { HexAlphaColorPicker } from 'react-colorful';
import { ColorHex, theme } from '~/state/state.tsx';
import { FontStyleContent, HighlightStyleContent } from '~/state/themeFamily';
import { StyleTokens, SyntaxTokens } from '~/state/tokens.ts';
import { debounce } from '~/utils/debounce.ts';

const validateColor = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;

export const isValidColor = (color: unknown): color is ColorHex =>
  typeof color === 'string' ? validateColor.test(color) : false;

export const setStyleToken = debounce((token: StyleTokens, color: unknown) => {
  const isValid = isValidColor(color);
  if (theme.value && isValid) {
    theme.value = {
      ...theme.value,
      style: { ...theme.value?.style, [token]: color },
    };
  }
}, 25);

export const setSyntaxToken = debounce((token: SyntaxTokens, syntaxStyle: Partial<HighlightStyleContent>) => {
  console.log('ssss');
  if (theme.value && (syntaxStyle.color ? isValidColor(syntaxStyle.color) : true)) {
    console.debug('Setting syntax token', token, syntaxStyle);
    theme.value = {
      ...theme.value,
      style: {
        ...theme.value?.style,
        syntax: {
          ...theme.value?.style?.syntax,
          [token]: { ...theme.value?.style?.syntax?.[token], ...syntaxStyle },
        },
      },
    };
  }
}, 25);

export function Token({
  name,
  color,
  description,
  onChange,
  syntax,
}: {
  name: string;
  color?: ColorHex | string | null;
  description?: string | null;
  onChange(color: string): void;
  syntax?: SyntaxTokens;
  onSyntaxStyleChange?(fontStyle: string): void;
  onSyntaxFontChange?(fontStyle: number): void;
}) {
  const showColor = useSignal(false);

  return (
    <div className="flex flex-col px-4 py-1">
      <div
        className="flex flex-row items-center gap-2"
        title={!showColor.value && !!description ? description : undefined}
      >
        <div
          className="color-preview h-9 min-h-9 w-9 min-w-9 cursor-pointer rounded border hover:translate-y-[-1px] hover:scale-[1.05] hover:pb-[1px] active:translate-y-[0px] active:scale-100"
          style={{
            color: color ? color : 'transparent',
            borderColor: color ? `color-mix(in xyz, ${color} 70%, black)` : '#808080',
          }}
          onClick={() => (showColor.value = !showColor.value)}
        />
        <div className="flex w-full flex-col text-sm text-zinc-800 dark:text-zinc-300">
          <p
            className="hover:cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-200"
            onClick={() => (showColor.value = !showColor.value)}
          >
            {name}
          </p>
          <div className="flex items-center gap-2 pr-2">
            <div className="flex-1">
              <input
                value={color ?? ''}
                className="border-1 h-[22px] w-full cursor-pointer rounded border border-solid border-transparent bg-transparent px-1 text-zinc-600 outline-none hover:border-zinc-300 hover:bg-zinc-200 focus:border-zinc-400 focus:text-black dark:text-zinc-500 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:border-zinc-500 dark:focus:text-white"
                type="text"
                placeholder="#color"
                onChange={(e) => onChange(e.currentTarget.value?.trim())}
              />
            </div>
            {!!syntax && (
              <>
                <select
                  value={theme.value?.style.syntax[syntax]?.font_style ?? ''}
                  className="h-[22px] w-[80px] rounded-md border border-neutral-300 bg-transparent px-1 text-sm text-neutral-900 outline-none focus:border-blue-500 focus:ring-blue-500  dark:border-neutral-600 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={(e) =>
                    setSyntaxToken(syntax, {
                      font_style: (e.currentTarget?.value || null) as FontStyleContent,
                    })
                  }
                >
                  <option value=""></option>
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                  <option value="oblique">Oblique</option>
                </select>
                <select
                  value={theme.value?.style.syntax[syntax]?.font_weight ?? ''}
                  className="h-[22px] rounded-md border border-neutral-300 bg-transparent px-1 text-sm text-neutral-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  onChange={(e) =>
                    setSyntaxToken(syntax, {
                      font_weight: e.currentTarget?.value
                        ? (+e.currentTarget?.value as HighlightStyleContent['font_weight'])
                        : null,
                    })
                  }
                >
                  <option value=""></option>
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
      {showColor.value && (
        <div className="flex flex-1 flex-col py-2">
          {!!description && <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>}
          <HexAlphaColorPicker color={color ?? ''} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
