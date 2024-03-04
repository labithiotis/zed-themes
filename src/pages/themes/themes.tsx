import themes from './themes.json';
import PreviewSVG from './preview.svg?react';
import { navigateTo } from '~/utils/navigateTo';
import { UIThemeToggle } from '../theme/side/UIThemeToggle';

export function Themes() {
  return (
    <div class="flex h-screen w-screen bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div class="flex flex-col px-6 py-4">
        <span class="text-zed-800 dark:text-zed-600 mb-2 flex text-xl font-semibold">
          <span class="flex-1">Zed Themes</span>
          <UIThemeToggle />
        </span>
        <div class="flex flex-wrap content-start justify-center ">
          <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {themes.map((theme) => (
              <div
                class="items flex flex-col gap-2"
                style={{
                  '--style-editor-background':
                    theme.colors?.['editor.background'],
                  '--style-tab-active-background':
                    theme.colors?.['tab.active_background'],
                }}
                onClick={() => navigateTo('/theme?id=' + theme.file)}
              >
                <div class="flex flex-col overflow-hidden">
                  <h4 class="text-lg">{theme.name}</h4>
                  <p class="overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">
                    By {theme.author}
                  </p>
                </div>
                <div class="hover:outline-zed-800 flex-1 cursor-pointer rounded outline outline-2 outline-offset-4 outline-transparent transition-all dark:hover:outline-neutral-600">
                  <PreviewSVG width="100%" height="auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
