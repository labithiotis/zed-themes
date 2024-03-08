import { UIThemeToggle } from '../../components/UIThemeToggle.tsx';
import { ThemeStyleContent } from '~/state/themeFamily';
import { themeStyleToCssVars } from '~/utils/cssVarTokens';
import { themeStyleClassNames } from '~/utils/themeStyleClassNames.tsx';
import PreviewSVG from './preview.svg?react';
import themes from './themes.json';

export default function Themes() {
  return (
    <div className="flex h-screen w-screen bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div className="flex flex-col px-6 py-4">
        <span className="mb-2 flex text-xl font-semibold text-zed-800 dark:text-zed-600">
          <span className="flex-1">Zed Themes 1</span>
          <UIThemeToggle />
        </span>
        <div className="flex flex-wrap content-start justify-center ">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {themes.map((theme) => (
              <a
                key={theme.id}
                className="items flex flex-col gap-2"
                style={themeStyleToCssVars(theme.style as ThemeStyleContent)}
                href={'/theme?id=' + theme.file}
              >
                {themeStyleClassNames(theme.style as ThemeStyleContent)}
                <div className="flex flex-col overflow-hidden">
                  <h4 className="text-lg">{theme.name}</h4>
                  <p className="overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">By {theme.author}</p>
                </div>
                <div className="max-w-[200px] flex-1 cursor-pointer rounded outline outline-2 outline-offset-4 outline-transparent transition-all hover:outline-zed-800 dark:hover:outline-neutral-600">
                  <PreviewSVG width="100%" height="100%" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
