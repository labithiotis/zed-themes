import { effect, signal } from '@preact/signals';
import { Preview } from './preview/Preview.tsx';
import { Side } from './side/Side.tsx';

type UIThemes = 'dark' | 'light';

const userTheme = matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

export const uiTheme = signal<UIThemes>(localStorage.theme ?? userTheme);

effect(() => {
  if (uiTheme.value === 'dark') {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  } else {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  }
});

export function App() {
  return (
    <div class="flex h-full overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side />
      <Preview />
    </div>
  );
}
