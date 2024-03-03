import themes from './themes.json';
import PreviewSVG from './preview.svg?react';
import { navigateTo } from '~/utils/navigateTo';

export function Themes() {
  return (
    <div class="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div class="flex flex-wrap content-start justify-center p-6">
        <div class="grid  gap-6 sm:grid-cols-2 md:grid-cols-3">
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
                <p class="overflow-hidden text-ellipsis text-nowrap text-sm opacity-60">
                  By asdasd asd asd asd a {theme.author}
                </p>
              </div>
              <div class="flex-1 cursor-pointer rounded outline outline-1 outline-offset-4 outline-transparent transition-all hover:outline-white">
                <PreviewSVG width="100%" height="auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
