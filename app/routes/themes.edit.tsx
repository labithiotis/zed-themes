import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';

export default function ThemeEditor() {
  return (
    <div className="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side edit={true} />
      <Preview />
    </div>
  );
}
