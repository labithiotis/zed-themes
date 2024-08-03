import { UserButton, useUser } from '@clerk/remix';
import { Link, json, useLoaderData, useRouteLoaderData } from '@remix-run/react';
import type { RootData } from '~/root';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { Button } from './ui/button';

export function Navbar() {
  const { userId } = useRouteLoaderData<RootData>('root') ?? {};

  return (
    <header className="fixed top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link to="/" rel="home" className="text-xl font-semibold text-zed-800 dark:text-zed-400">
          Zed Themes
        </Link>
        <div className="flex items-center gap-4">
          <ColorSchemeToggle />
          {userId ? (
            <div className="w-[28px] h-[28px] bg-gray-300 rounded-full">
              <UserButton />
            </div>
          ) : (
            <Link to="/auth/sign-in">
              <Button size="xs" variant="ghost">
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
