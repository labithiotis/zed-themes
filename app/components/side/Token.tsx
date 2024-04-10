import { useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import { ColorHex, useTheme } from '~/providers/theme';
import { cn } from '~/utils';
import { debounce } from '~/utils/debounce';
import { SyntaxTokens } from '../../providers/tokens';
import { FontStyleContent, HighlightStyleContent } from '../../themeFamily';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

export function Token({
  name,
  color,
  description,
  onChange,
  syntax,
  edit,
}: {
  name: string;
  color?: ColorHex | string | null;
  description?: string | null;
  onChange(color: string): void;
  syntax?: SyntaxTokens;
  onSyntaxStyleChange?(fontStyle: string): void;
  onSyntaxFontChange?(fontStyle: number): void;
  edit?: boolean;
}) {
  const [showColor, setShowColor] = useState(false);
  const { theme, dispatch } = useTheme();

  const setSyntaxToken = debounce((token: SyntaxTokens, content: Partial<HighlightStyleContent>) => {
    dispatch({ type: 'setSyntaxToken', token, content });
  }, 25);

  return (
    <div className="flex flex-col px-4 py-1">
      <div className="flex flex-row items-center gap-2" title={!showColor && !!description ? description : undefined}>
        <button
          className={cn(
            'color-preview h-9 min-h-9 w-9 min-w-9 rounded border outline-none active:translate-y-[0px] active:scale-100',
            {
              'cursor-pointer hover:scale-[1.05] hover:pb-[1px] hover:translate-y-[-1px]': edit,
            }
          )}
          style={{
            color: color ? color : 'transparent',
            borderColor: color ? `color-mix(in xyz, ${color} 70%, black)` : '#808080',
          }}
          onClick={() => setShowColor(!showColor)}
          aria-label="Token color preivew toggle color picker"
          disabled={!edit}
        />
        <div className="flex flex-1 flex-col text-sm text-zinc-800 dark:text-zinc-300">
          <button
            onClick={() => setShowColor(!showColor)}
            className={cn('text-left outline-none', {
              'cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-200': edit,
            })}
            aria-label="Token color name toggle color picker"
            disabled={!edit}
          >
            {name}
          </button>
          <div className="flex items-center gap-2">
            <input
              value={color ?? ''}
              className={cn(
                'border-1 h-[22px] flex-1 rounded border border-solid border-transparent bg-transparent px-1 text-zinc-600 outline-none focus:border-zinc-400 focus:text-black dark:text-zinc-500  dark:focus:border-zinc-500 dark:focus:text-white',
                {
                  'cursor-pointer hover:border-zinc-300 hover:bg-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800':
                    edit,
                }
              )}
              type="text"
              placeholder="unset"
              onChange={(e) => onChange(e.currentTarget.value?.trim())}
              disabled={!edit}
            />
            {!!syntax && (
              <>
                <Select
                  value={theme?.style.syntax[syntax]?.font_style ?? ''}
                  onValueChange={(value) =>
                    setSyntaxToken(syntax, {
                      font_style: value === 'unset' ? null : (value as FontStyleContent),
                    })
                  }
                >
                  <SelectTrigger disabled={!edit} className="w-16 pl-1 pr-0 py-0" id="aa">
                    {theme?.style.syntax[syntax]?.font_style ?? <span className="opacity-50">style</span>}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unset" className="opacity-50">
                      unset
                    </SelectItem>
                    <SelectItem value="normal">normal</SelectItem>
                    <SelectItem value="italic">italic</SelectItem>
                    <SelectItem value="oblique">oblique</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={theme?.style.syntax[syntax]?.font_weight?.toString() ?? ''}
                  onValueChange={(value) =>
                    setSyntaxToken(syntax, {
                      font_weight: value === 'unset' ? null : (+value as HighlightStyleContent['font_weight']),
                    })
                  }
                >
                  <SelectTrigger disabled={!edit} className="w-16 pl-1 pr-0 py-0">
                    {theme?.style.syntax[syntax]?.font_weight?.toString() ?? <span className="opacity-50">weight</span>}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unset" className="opacity-50">
                      unset
                    </SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                    <SelectItem value="400">400</SelectItem>
                    <SelectItem value="500">500</SelectItem>
                    <SelectItem value="600">600</SelectItem>
                    <SelectItem value="700">700</SelectItem>
                    <SelectItem value="800">800</SelectItem>
                    <SelectItem value="900">900</SelectItem>
                  </SelectContent>
                </Select>
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
