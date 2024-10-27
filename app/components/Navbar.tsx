import { ClerkLoading, SignInButton, UserButton } from '@clerk/remix';
import { dark } from '@clerk/themes';
import { Link, useLocation, useNavigate, useNavigation, useParams, useRouteLoaderData } from '@remix-run/react';
import { LoaderCircle, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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

const orderOptions = new Map([
  ['relative', 'Relative'],
  ['installs', 'Installs'],
  ['recent', 'Recent'],
  ['bundled', 'Not Included'],
]);

export function Navbar() {
  const params = useParams();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const colorScheme = useColorScheme((s) => s.colorScheme);
  const language = useLanguage((s) => s.language);
  const setLanguage = useLanguage((s) => s.setLanguage);
  const { userId } = useRouteLoaderData<RootData>('root') ?? {};
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const [order, setOrder] = useState(searchParams.get('order') ?? 'relative');

  const isRoot = location.pathname === '/';

  useEffect(() => {
    setTimeout(() => {
      const searchParams = new URLSearchParams(location.search);
      if (!searchParams.get('search')) {
        console.debug('Clearing search term');
        setSearchTerm('');
      }
      if (!searchParams.get('order')) {
        console.debug('Clearing order');
        setOrder('relative');
      }
    }, 10);
  }, [location.search]);

  const copyInstallDir = () => {
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
  };

  const updateUrlParam = (key: string, value?: string) => {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    navigate({ search: searchParams.toString() });
  };

  const updateSearchQuery = useCallback(
    debounce((search?: string) => updateUrlParam('search', search), 600),
    [],
  );

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    updateSearchQuery(e.target.value);
  };

  const updateOrder = (value: string) => {
    setOrder(value);
    updateUrlParam('order', value);
  };

  return (
    <header
      className="fixed w-screen top-0 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ zIndex: 25 }}
    >
      <nav
        className={cn(
          'py-1.5 flex gap-1 justify-between',
          isRoot
            ? 'container px-2 md:px-8 h-20 md:h-14 flex-col-reverse md:flex-row items-end md:items-center'
            : 'px-3 h-14 flex-row items-center',
        )}
      >
        <div className="w-full flex items-center gap-3">
          <Link to="/" rel="home" className="text-xl font-semibold whitespace-nowrap text-zed-800 dark:text-zed-400">
            Zed Themes
          </Link>
          {isRoot && (
            <div className="flex-1 flex items-center gap-1">
              <div className="relative flex-1 md:flex-none">
                <div className="absolute left-2 h-full flex items-center text-muted-foreground">
                  {navigation.state === 'idle' ? (
                    <Search className=" w-4" size={16} />
                  ) : (
                    <LoaderCircle className="animate-spin" size={16} />
                  )}
                </div>
                <Input
                  type="search"
                  value={searchTerm}
                  placeholder="Search"
                  className="w-full rounded-lg bg-background pl-8 py-1 md:w-[200px] lg:w-[336px]"
                  onChange={updateSearch}
                  data-testid="search-input"
                />
              </div>
              <Select value={order} onValueChange={updateOrder} data-testid="order-select">
                <SelectTrigger className="border border-transparent bg-transparent hover:bg-neutral-200">
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="text-muted-foreground hidden md:inline-block">Sort by:&nbsp;</span>
                    {orderOptions.get(order)}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {[...orderOptions.entries()].map(([value, label]) => (
                    <SelectItem key={value} value={value} data-testid={`order-select-${value}`}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <SelectTrigger className="flex-1" data-testid="preview-language" aria-label="Theme preview language">
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
