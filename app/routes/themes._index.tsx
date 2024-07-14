import { AppLoadContext, LoaderFunction, json } from '@remix-run/cloudflare';
import { useLoaderData, useRouteError } from '@remix-run/react';
import { memo } from 'react';
import { ColorSchemeToggle } from '~/components/ColorSchemeToggle';
import { Badge } from '~/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import { ThemesMetaData } from '../types';

type Theme = { id: string } & ThemesMetaData;
type ThemeLitst = { timestamp: number; themes: Theme[] };

type LoaderData = {
  themes: Theme[];
};

const THEMES_LIST_KEY = 'themes-list';
export async function fetchAllThemesFromKV(context: AppLoadContext): Promise<ThemeLitst['themes']> {
  const list: ThemeLitst = JSON.parse((await context.env.zed_options.get(THEMES_LIST_KEY)) ?? '{}');
  if (list.timestamp && list.timestamp + 600_000 > Date.now()) {
    return list.themes;
  }

  const nsList = await context.env.zed_themes?.list<ThemesMetaData>();
  const themes: Theme[] = nsList?.keys.map((key) => ({ ...key.metadata!, id: key.name })) ?? [];
  const themeList: ThemeLitst = { timestamp: Date.now(), themes };
  await context.env.zed_options?.put(THEMES_LIST_KEY, JSON.stringify(themeList));

  return themeList.themes;
}

export const loader: LoaderFunction = async ({ context }) => {
  const themes = await fetchAllThemesFromKV(context);
  return json({ themes });
};

export default function Themes() {
  const { themes } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col h-screen w-full px-6 py-4 content-stretch bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <span className="mb-2 flex text-xl font-semibold text-zed-800 dark:text-zed-400">
        <span className="flex-1">Zed Themes</span>
        <ColorSchemeToggle />
      </span>
      <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 pb-6">
        {themes?.map((theme, index) => <ThemeFamilyPreview key={theme.id} theme={theme} index={index} />)}
      </div>
    </div>
  );
}

const ThemeFamilyPreview = memo(({ theme, index }: { theme: Theme; index: number }) => {
  return (
    <Carousel className="items flex flex-col gap-2" opts={{ active: theme.themes?.length > 1 }}>
      <div className="flex flex-col overflow-hidden">
        <div className="flex">
          <h4 className="text-lg flex-1">{theme.name}</h4>
          {theme.bundled ? (
            <Badge variant="outline" title="This theme is already included with zed">
              Bundled
            </Badge>
          ) : (
            <a
              role="button"
              href={'/download/themes/' + theme.id}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
              aria-label={`Download ${theme.name} theme`}
              title="Download theme"
            >
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <p className="flex-1 overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">By {theme.author}</p>
          <CarouselDots />
        </div>
      </div>
      <div className="relative flex flex-col isolate min-h-[20vw]">
        <CarouselContent className="w-full">
          {theme?.themes?.map(({ name }, index2) => (
            <ThemePreview
              key={`${theme.id}-${name}`}
              themeId={theme.id}
              themeName={name}
              index={index}
              index2={index2}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="z-10" />
        <CarouselNext className="z-10" />
      </div>
    </Carousel>
  );
});
ThemeFamilyPreview.displayName = 'ThemeFamilyPreview';

const ThemePreview = memo(
  ({ themeId, themeName, index, index2 }: { themeId: string; themeName: string; index: number; index2: number }) => {
    return (
      <CarouselItem>
        <a
          role="button"
          href={encodeURI(`/themes/${themeId}?name=${themeName}`)}
          className="flex-1 cursor-pointer rounded outline outline-2 outline-transparent hover:outline-zed-800 dark:hover:outline-neutral-600"
          aria-label={`Preview ${themeName} theme`}
          data-testid="preview-theme"
          data-theme-id={themeId}
          data-theme-name={themeName}
        >
          <img
            width="100%"
            height="100%"
            src={encodeURI(`/themes/preview.svg?id=${themeId}&name=${themeName}`)}
            alt={`${themeName} preview`}
            loading={index < 6 && index2 === 0 ? 'eager' : 'lazy'}
          />
        </a>
      </CarouselItem>
    );
  }
);
ThemePreview.displayName = 'ThemePreview';

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Themes Error</h1>
      <p>{error instanceof Error ? error?.message : 'Something went wrong'}</p>
      <pre>{error instanceof Error ? error?.stack : ''}</pre>
    </div>
  );
}
