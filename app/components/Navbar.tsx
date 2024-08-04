import { SignInButton, UserButton } from '@clerk/remix';
import { dark } from '@clerk/themes';
import { Link, useLocation, useParams, useRouteLoaderData } from '@remix-run/react';
import { RxPlus } from 'react-icons/rx';
import { useColorScheme } from '~/providers/colorScheme';
import type { RootData } from '~/root';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { UploadTheme } from './NavbarUpload';
import { Button } from './ui/button';
import { ButtonMenu } from './ui/button-menu';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function Navbar() {
  const params = useParams();
  const location = useLocation();
  const { colorScheme } = useColorScheme();
  const { userId } = useRouteLoaderData<RootData>('root') ?? {};

  return (
    <header className="fixed top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link to="/" rel="home" className="text-xl font-semibold text-zed-800 dark:text-zed-400">
          Zed Themes
        </Link>
        <div className="flex items-center gap-4">
          {!params.themeId && (
            <ButtonMenu
              size="xs"
              variant="outline"
              label={
                <Link to="/themes/new" rel="new theme" className="flex gap-1 items-center">
                  <RxPlus />
                  Create
                </Link>
              }
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <UploadTheme />
              </DropdownMenuItem>
            </ButtonMenu>
          )}
          <ColorSchemeToggle />
          {userId ? (
            <div className="w-[28px] h-[28px] bg-gray-300 rounded-full">
              <UserButton appearance={{ baseTheme: colorScheme === 'dark' ? dark : undefined }} />
            </div>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl={location.pathname} signUpForceRedirectUrl={location.pathname}>
              <Button size="xs" variant="ghost">
                Sign in
              </Button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
}
