import type { ReactNode } from "react";

export function Section<T>({
  name,
  items,
  children,
}: {
  name: string;
  items: T[];
  children: (item: T, i: number) => ReactNode;
}) {
  return (
    <details className="group open:bg-neutral-200 dark:open:bg-neutral-900">
      <summary className="flex cursor-pointer list-none items-center justify-between p-2 font-medium hover:bg-zinc-200 dark:hover:bg-neutral-700">
        <div className="flex select-none items-center gap-2">
          <span className="flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-md bg-zinc-200 text-[10px] text-blue-800 shadow-md dark:bg-zinc-700 dark:text-neutral-300">
            {items.length}
          </span>
          <span className="text-sm text-zed-800 dark:text-zinc-300">{name}</span>
        </div>
        <span className="transition group-open:rotate-180 dark:text-zinc-300">
          <svg
            fill="none"
            width="24"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <title>&gt;</title>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </summary>
      <div className="relative pb-2">
        <div className="absolute left-0 top-[-2px] block h-[1px] w-full shadow-black/60 drop-shadow-2xl dark:shadow-white/60" />
        {items.map(children)}
      </div>
    </details>
  );
}
