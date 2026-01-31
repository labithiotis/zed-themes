import { useLocation } from '@remix-run/react';
import type { PropsWithChildren } from 'react';
import { cn } from '~/utils';
import { AnnouncementBanner } from './AnnouncementBanner';
import { Navbar } from './Navbar';

export function Layout({ children, className = 'container pt-6' }: PropsWithChildren<{ className?: string }>) {
  const location = useLocation();
  const isRoot = location.pathname === '/';
  const showBanner = !isRoot;

  return (
    <div className="flex flex-col h-full w-full content-stretch bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      {showBanner && <AnnouncementBanner />}
      <Navbar />
      <main
        className={cn(
          'isolate',
          showBanner ? 'mt-[calc(2.5rem+5rem)] md:mt-[calc(2.5rem+3.5rem)]' : 'mt-20 md:mt-14',
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
