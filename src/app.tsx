import { Preview } from './preview/Preview.tsx';
import { Side } from './side/Side.tsx';
import { useThemeLoader } from './themeLoader.tsx';

export function App() {
  useThemeLoader();

  return (
    <div class="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side />
      <Preview />
    </div>
  );
}
