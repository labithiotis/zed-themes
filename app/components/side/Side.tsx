import { UiThemeToggle } from '~/components/UiThemeToggle';
import { Select, SelectContent, SelectItem, SelectTrigger } from '~/components/ui/select';
import { useTheme } from '~/providers/theme';
import { debounce } from '~/utils/debounce';
import { StyleTokens, SyntaxTokens, syntaxTokens } from '../../providers/tokens';
import { AppearanceContent, HighlightStyleContent } from '../../themeFamily';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Player } from './Player';
import { Section } from './Section';
import { SideDownloadButton } from './SideDownloadButton';
import { SideEditButton } from './SideEditButton';
import { SideShareButton } from './SideShareButton';
import { SideUploadButton } from './SideUploadButton';
import { Token } from './Token';
import { sections } from './sections';

export const btnStyles =
  'flex flex-1 items-center justify-center gap-2 p-3 text-lg font-semibold text-zed-800 hover:bg-neutral-200 hover:text-zed-900 dark:text-zed-600 dark:hover:bg-neutral-700 dark:hover:text-zed-200';

export function Side({ edit }: { edit: boolean }) {
  const { index, theme, themeFamily, dispatch } = useTheme();
  const setName = (name: string) => {
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

  return (
    <>
      <div className="flex h-full w-96 min-w-[250px] flex-col overflow-hidden border-r border-zinc-300 bg-zinc-100 dark:border-neutral-600 dark:bg-neutral-800">
        <div className="flex items-center pb-2 pl-6 pr-2 pt-4 text-zed-900">
          <a
            className="flex-1 cursor-pointer select-none text-xl font-semibold text-zed-800 hover:text-zed-500 dark:text-zed-400 hover:dark:text-zed-400"
            href={'/themes'}
          >
            Zed Themes
          </a>
          <UiThemeToggle />
        </div>

        <div className="flex gap-2 px-2 mb-1">
          <Select onValueChange={setIndex} value={index?.toString() ?? undefined}>
            <SelectTrigger className="flex-1">
              <span className="whitespace-nowrap overflow-hidden text-ellipsis">{theme?.name ?? 'Select theme'}</span>
            </SelectTrigger>
            <SelectContent>
              {themeFamily?.themes.map(({ name }, i) => (
                <SelectItem key={i} value={`${i}`}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {edit && (
            <Button size="xs" onClick={addTheme} title="Add a new theme">
              Add new theme
            </Button>
          )}
        </div>

        {edit && (
          <div className="flex gap-2 px-2 mb-1">
            <Input
              value={theme?.name ?? 'loading...'}
              type="text"
              className="border-1 cursor-pointer rounded border border-solid border-transparent bg-transparent px-1 text-zed-800 outline-none hover:border-zinc-300 hover:bg-zinc-200 focus:border-zinc-400 focus:text-black dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:focus:border-zinc-500 dark:focus:text-white"
              placeholder="Theme name"
              onChange={(e) => setName(e.currentTarget.value ?? '')}
            />
            <Select onValueChange={setAppearance} value={theme?.appearance ?? 'light'}>
              <SelectTrigger title="Set theme appearance is for dark or light mode">
                {theme?.appearance ?? 'light'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">light</SelectItem>
                <SelectItem value="dark">dark</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setBackgroundAppearance} value={theme?.style['background.appearance'] ?? 'opaque'}>
              <SelectTrigger title="Set background appearance">
                {theme?.style['background.appearance'] ?? 'opaque'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opaque">opaque</SelectItem>
                <SelectItem value="blurred">blurred</SelectItem>
                <SelectItem value="transparent">transparent</SelectItem>
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
                    edit={edit}
                  />
                )}
              </Section>
            ) : null
          )}
          <Section name="Syntax" items={syntaxTokens as unknown as SyntaxTokens[]}>
            {(token) => (
              <Token
                key={token}
                name={token}
                syntax={token}
                color={theme?.style.syntax[token]?.color}
                description=""
                onChange={(color) => setSyntaxToken(token, { color })}
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
              <SideUploadButton />
              <div className="flex">
                <SideShareButton edit={true} />
                <SideDownloadButton />
              </div>
            </>
          ) : (
            <>
              <SideEditButton />
              <div className="flex">
                <SideShareButton edit={false} />
                <SideDownloadButton />
              </div>
            </>
          )}
          <div className="flex justify-center gap-2 bg-neutral-200 p-3 dark:bg-neutral-900">
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
              suggestion?
            </a>
            <a
              className="text-zed-800 hover:text-zed-500 dark:text-zed-600 dark:hover:text-zed-200"
              href="https://www.buymeacoffee.com/labithiotis"
              target="_blank"
              rel="noopener noreferrer"
            >
              support ♥︎
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
