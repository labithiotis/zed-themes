import { themeStyleClassNames } from '../../utils/themeStyleClassNames.tsx';
import themes from './themes.json';
import PreviewSVG from './preview.svg?react';
import { UIThemeToggle } from '../theme/side/UIThemeToggle';
import { ThemeStyleContent } from '~/state/themeFamily';
import { themeStyleToCssVars } from '~/utils/cssVarTokens';

export function Themes() {
  return (
    <div class="flex h-screen w-screen bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div class="flex flex-col px-6 py-4">
        <span class="mb-2 flex text-xl font-semibold text-zed-800 dark:text-zed-600">
          <span class="flex-1">Zed Themes</span>
          <UIThemeToggle />
        </span>
        <div class="flex flex-wrap content-start justify-center ">
          <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {themes.map((theme) => (
              <a
                class="items flex flex-col gap-2"
                style={themeStyleToCssVars(theme.style as ThemeStyleContent)}
                href={'/theme?id=' + theme.file}
                alt={theme.name}
              >
                {themeStyleClassNames(theme.style as ThemeStyleContent)}
                <div class="flex flex-col overflow-hidden">
                  <h4 class="text-lg">{theme.name}</h4>
                  <p class="overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">
                    By {theme.author}
                  </p>
                </div>
                <div class="flex-1 cursor-pointer rounded outline outline-2 outline-offset-4 outline-transparent transition-all hover:outline-zed-800 dark:hover:outline-neutral-600">
                  <PreviewSVG width="100%" height="auto" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
