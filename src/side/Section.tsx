import { ReactNode } from 'preact/compat';

export function Section<T>({
  name,
  tokens,
  children,
}: {
  name: string;
  tokens: T[];
  children: (token: T) => ReactNode;
}) {
  return (
    <details class="group open:bg-neutral-200 dark:open:bg-neutral-900">
      <summary class="flex cursor-pointer list-none items-center justify-between p-2 font-medium hover:bg-zinc-200 dark:hover:bg-neutral-700">
        <div class="flex select-none items-center gap-2">
          <span class="flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md bg-zinc-200 text-[10px] text-blue-800 shadow-md dark:bg-zinc-900 dark:text-blue-800">
            {tokens.length}
          </span>
          <span class="text-sm text-zed-800 dark:text-zinc-300">{name}</span>
        </div>
        <span class="transition group-open:rotate-180 dark:text-zinc-300">
          <svg
            fill="none"
            width="24"
            height="24"
            shape-rendering="geometricPrecision"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </span>
      </summary>
      <div class="relative ">
        <div class="absolute left-0 top-[-2px] block h-[1px] w-full shadow-black/60 drop-shadow-2xl dark:shadow-white/60" />
        {tokens.map(children)}
      </div>
    </details>
  );
}
