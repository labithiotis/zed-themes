import * as Sentry from '@sentry/remix';
import { useEffect, useState } from 'react';
import { IoBug } from 'react-icons/io5';
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select';
import { useTheme } from '~/providers/theme';
import { debounce } from '~/utils/debounce';
import { type StyleTokens, type SyntaxTokens, syntaxTokens } from '../../providers/tokens';
import type { AppearanceContent, HighlightStyleContent } from '../../themeFamily';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Player } from './Player';
import { Section } from './Section';
import { SideDownloadButton } from './SideDownloadButton';
import { SideEditButton } from './SideEditButton';
import { SideSaveButton } from './SideSaveButton';
import { SideShareButton } from './SideShareButton';
import { Token } from './Token';
import { sections } from './sections';

export const btnStyles =
  'flex flex-1 items-center justify-center gap-2 p-3 text-lg font-semibold text-zed-800 hover:bg-neutral-200 hover:text-zed-900 dark:text-zed-600 dark:hover:bg-neutral-700 dark:hover:text-zed-200';

export function Side({ edit }: { edit: boolean }) {
  const [feedback, setFeedback] = useState<ReturnType<typeof Sentry.getFeedback> | undefined>(undefined);
  const { index, theme, themeFamily, dispatch } = useTheme();

  const setFamilyName = (name: string) => {
    dispatch({ type: 'setFamilyName', name });
  };
  const setThemeName = (name: string) => {
    dispatch({ type: 'setThemeName', name });
  };
  const setAppearance = (appearance: AppearanceContent) => {
    dispatch({ type: 'setThemeAppearance', appearance });
  };
  const setBackgroundAppearance = (appearance: 'opaque' | 'transparent' | 'blurred') => {
    dispatch({ type: 'setBackgroundAppearance', appearance });
  };
  const setIndex = (index: string) => {
    dispatch({ type: 'setIndex', index: Number(index) });
  };
  const setStyleToken = debounce((token: StyleTokens, color: unknown) => {
    dispatch({ type: 'setStyleToken', token, color });
  }, 25);
  const setSyntaxToken = debounce((token: SyntaxTokens, content: Partial<HighlightStyleContent>) => {
    dispatch({ type: 'setSyntaxToken', token, content });
  }, 25);
  const addTheme = () => {
    dispatch({ type: 'addTheme' });
  };

  useEffect(() => {
    if (Sentry.getFeedback) {
      setFeedback(Sentry.getFeedback());
    }
  }, []);

  return (
    <div className="flex h-full w-96 min-w-[250px] flex-col overflow-hidden border-r border-zinc-300 bg-zinc-100 dark:border-neutral-600 dark:bg-neutral-800">
      {edit ? (
        <div className="flex flex-col gap-1.5 p-2">
          <div className="flex flex-col flex-1 gap-1">
            <Label htmlFor="themeFamilyName" className="opacity-60 font-light">
              Theme family name
            </Label>
            <div className="flex gap-1.5">
              <Input
                type="text"
                id="themeFamilyName"
                value={themeFamily?.name ?? 'loading...'}
                className="truncate"
                placeholder="Theme family name"
                onChange={(e) => setFamilyName(e.currentTarget.value ?? '')}
                autoComplete="off"
                data-1p-ignore
              />
              <Select onValueChange={setIndex} value={index?.toString() ?? ''}>
                <SelectTrigger className="flex-1 overflow-hidden">
                  <span className="truncate">{theme?.name ?? 'Select theme'}</span>
                </SelectTrigger>
                <SelectContent>
                  {themeFamily?.themes.map(({ name }, i) => (
                    <SelectItem key={name} value={`${i}`}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button size="xs" onClick={addTheme} title="Add a new theme">
                Add theme
              </Button>
            </div>
          </div>

          <div className="flex w-full items-center gap-1">
            <div className="grid items-center gap-1 flex-1">
              <Label htmlFor="themeName" className="opacity-60 font-light">
                Selected theme name
              </Label>
              <Input
                id="themeName"
                value={theme?.name ?? 'loading...'}
                type="text"
                className="truncate"
                placeholder="Theme name"
                onChange={(e) => setThemeName(e.currentTarget.value ?? '')}
                autoComplete="off"
                data-1p-ignore
              />
            </div>
            <div className="grid items-center gap-1 flex-1">
              <Label htmlFor="appearance" className="opacity-60 font-light">
                Appearance
              </Label>
              <Select onValueChange={setAppearance} value={theme?.appearance ?? 'light'}>
                <SelectTrigger
                  id="appearance"
                  title="Set theme appearance is for dark or light mode"
                  className="flex-1 overflow-hidden"
                >
                  {theme?.appearance ?? 'light'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">light</SelectItem>
                  <SelectItem value="dark">dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid items-center gap-1 flex-1">
              <Label htmlFor="backgroundAppearance" className="opacity-60 font-light">
                Background
              </Label>
              <Select onValueChange={setBackgroundAppearance} value={theme?.style['background.appearance'] ?? 'opaque'}>
                <SelectTrigger
                  id="backgroundAppearance"
                  title="Set background appearance"
                  className="flex-1 overflow-hidden"
                >
                  {theme?.style['background.appearance'] ?? 'opaque'}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="opaque">opaque</SelectItem>
                  <SelectItem value="blurred">blurred</SelectItem>
                  <SelectItem value="transparent">transparent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 p-2">
          <Label className="truncate">{themeFamily?.name}</Label>
          <Select onValueChange={setIndex} value={index?.toString() ?? ''}>
            <SelectTrigger className="w-full">
              <span className="truncate">{theme?.name ?? 'Select theme'}</span>
            </SelectTrigger>
            <SelectContent>
              {themeFamily?.themes.map(({ name }, i) => (
                <SelectItem key={name} value={`${i}`}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex-1 divide-y divide-neutral-300 overflow-scroll dark:divide-neutral-700">
        {sections.map((section) =>
          section.tokens.length ? (
            <Section key={section.name} name={section.name} items={section.tokens}>
              {(token) => (
                <Token
                  key={token.token}
                  name={token.name}
                  color={theme?.style[token.token]}
                  description={token.description}
                  onChange={(color) => setStyleToken(token.token, color)}
                  onClear={() => setStyleToken(token.token, null)}
                  edit={edit}
                />
              )}
            </Section>
          ) : null,
        )}
        <Section name="Syntax" items={syntaxTokens as unknown as SyntaxTokens[]}>
          {(token) => (
            <Token
              key={token}
              name={token}
              syntax={token}
              color={theme?.style.syntax?.[token]?.color}
              description=""
              onChange={(color) => setSyntaxToken(token, { color })}
              onClear={() => setSyntaxToken(token, { color: null })}
              edit={edit}
            />
          )}
        </Section>
        <Section name="Players" items={theme?.style.players ?? new Array(8).fill({})}>
          {(player, index) => <Player key={index} player={player} index={index} edit={edit} />}
        </Section>
      </div>
      <div className="border-t-1 flex select-none flex-col items-stretch divide-y divide-neutral-300 border-t-neutral-300 shadow-2xl shadow-black/60 dark:divide-neutral-700 dark:border-t-neutral-700 dark:shadow-white/75">
        {edit ? (
          <>
            <div className="flex justify-stretch items-center p-2 gap-2">
              <SideSaveButton />
            </div>
            <div className="flex justify-stretch items-center p-2 gap-2">
              <SideShareButton edit={true} />
              <SideDownloadButton />
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-stretch items-center p-2 gap-2">
              <SideEditButton />
            </div>
            <div className="flex justify-stretch items-center p-2 gap-2">
              <SideShareButton edit={false} />
              <SideDownloadButton />
            </div>
          </>
        )}
        <div className="flex justify-center gap-2.5 bg-neutral-200 p-3 dark:bg-neutral-900">
          <a
            className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
            href="https://zed.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            zed.dev
          </a>
          <a
            className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
            href="https://github.com/labithiotis/zed-themes/discussions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suggestion?
          </a>
          <a
            className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
            href="https://www.buymeacoffee.com/labithiotis"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support ♥︎
          </a>
          <button
            type="button"
            className="flex justify-center items-center cursor-pointer text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
            onClick={async () => {
              if (feedback) {
                const form = await feedback.createForm();
                form.appendToDom();
                form.open();
              } else {
                window.open('https://github.com/labithiotis/zed-themes/issues', '_blank');
              }
            }}
          >
            Report <IoBug className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
