import type { PropsWithChildren } from 'react';
import { cn } from '~/utils';
import { Navbar } from './Navbar';

export function Layout({ children, className = 'container pt-6' }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className="flex flex-col h-full w-full content-stretch bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <Navbar />
      <main className={cn('mt-14', className)}>{children}</main>
    </div>
  );
}
