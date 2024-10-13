import { ClerkLoading, SignInButton, UserButton } from '@clerk/remix';
import { dark } from '@clerk/themes';
import { Link, useLocation, useNavigate, useParams, useRouteLoaderData } from '@remix-run/react';
import { Search } from 'lucide-react';
import { useCallback, useState } from 'react';
import { RxPerson } from 'react-icons/rx';
import { useColorScheme } from '~/providers/colorScheme';
import { languages, useLanguage } from '~/providers/language';
import type { RootData } from '~/root';
import { cn } from '~/utils';
import { debounce } from '~/utils/debounce';
import { ColorSchemeToggle } from './ColorSchemeToggle';
import { UploadTheme } from './NavbarUpload';
import { Button } from './ui/button';
import { ButtonMenu } from './ui/button-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { useToast } from './ui/use-toast';

export function Navbar() {
  const params = useParams();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const colorScheme = useColorScheme((s) => s.colorScheme);
  const language = useLanguage((s) => s.language);
  const setLanguage = useLanguage((s) => s.setLanguage);
  const { userId } = useRouteLoaderData<RootData>('root') ?? {};
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');

  const isRoot = location.pathname === '/';

  const copyInstallDir = useCallback(() => {
    navigator?.clipboard?.writeText('~/.config/zed/themes').then(() =>
      toast({
        variant: 'success',
        description: (
          <p>
            <strong>~/.config/zed/themes</strong> is copied to your clipboard
          </p>
        ),
      }),
    );
  }, [toast]);

  const updateSearchQuery = useCallback(
    debounce((search?: string) => {
      if (search) {
        searchParams.set('search', search);
        navigate({ search: searchParams.toString() });
      } else {
        searchParams.delete('search');
        navigate({ search: searchParams.toString() });
      }
    }, 600),
    [],
  );

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    updateSearchQuery(e.target.value);
  };

  return (
    <header
      className="fixed w-screen  top-0 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ zIndex: 100 }}
    >
      <nav
        className={cn(
          'py-1.5 flex gap-1 justify-between',
          isRoot
            ? 'container px-8 h-20 md:h-14 flex-col-reverse md:flex-row items-end md:items-center'
            : 'px-3 h-14 flex-row items-center',
        )}
      >
        <div className="flex w-full items-center gap-3">
          <Link to="/" rel="home" className="text-xl font-semibold whitespace-nowrap text-zed-800 dark:text-zed-400">
            Zed Themes
          </Link>
          {isRoot && (
            <div className="relative flex-1">
              <Search className="absolute left-2 h-full w-4 text-muted-foreground" />
              <Input
                type="search"
                value={searchTerm}
                placeholder="Search"
                className="w-full rounded-lg bg-background pl-8 py-1 md:w-[200px] lg:w-[336px]"
                onChange={updateSearch}
                data-testid="search-input"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="xs" variant="ghost" className="hidden items-center gap-1 md:flex">
                How to install themes?
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Installing themes</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-1.5">
                <p>
                  Themes that are marked as "included" are ones that are already added to Zed's' extensions repo, you
                  can install those by searching for theme name in the extensions panel within Zed.
                </p>
                <p>
                  Community themes, which are ones hosted here can be downloaded and installed by placing the theme in
                  the following directory on your system:
                  <br />
                  <Button onClick={copyInstallDir} variant="ghost" size="sm" className="-ml-1">
                    <code>~/.config/zed/themes</code>
                  </Button>
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <ColorSchemeToggle />
          {params.themeId && (
            <Select onValueChange={setLanguage} value={language}>
              <SelectTrigger className="flex-1" data-testid="preview-language">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{languages[language ?? 'tsx']}</span>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([l, label]) => (
                  <SelectItem key={l} value={l} data-testid={`preview-language-${l}`}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {!params.themeId && (
            <ButtonMenu
              size="xs"
              variant="outline"
              label={
                <Link to="/themes/new" rel="Create theme">
                  Create
                </Link>
              }
            >
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <UploadTheme />
              </DropdownMenuItem>
            </ButtonMenu>
          )}
          {userId ? (
            <div className="w-[28px] h-[28px] bg-gray-300 rounded-full">
              <UserButton appearance={{ baseTheme: colorScheme === 'dark' ? dark : undefined }}>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My themes"
                    labelIcon={<RxPerson />}
                    onClick={() => navigate('/users/themes')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <>
              <ClerkLoading>
                <Button size="xs" variant="ghost" disabled={true}>
                  Sign in
                </Button>
              </ClerkLoading>
              <SignInButton
                mode="modal"
                forceRedirectUrl={location.pathname}
                signUpForceRedirectUrl={location.pathname}
              >
                <Button size="xs" variant="ghost">
                  Sign in
                </Button>
              </SignInButton>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
