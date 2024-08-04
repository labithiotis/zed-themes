import { getAuth } from '@clerk/remix/ssr.server';
import { type AppLoadContext, type LoaderFunction, json } from '@remix-run/cloudflare';
import { useLoaderData, useRouteError } from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { dbThemes } from 'drizzle/schema';
import { memo } from 'react';
import { Layout } from '~/components/Layout';
import { Badge } from '~/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';
import type { ThemesMetaData } from '../types';

export type ThemeLitst = { timestamp: number; themes: ThemesMetaData[] };

type LoaderData = {
  themes: ThemesMetaData[];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const db = drizzle(args.context.env.db);

  const records = await db.select().from(dbThemes).all();
  const themes: ThemesMetaData[] = records.map((record) => ({
    id: record.id,
    name: record.name,
    author: record.author,
    updatedDate: record.updatedDate.getTime(),
    versionHash: record.versionHash,
    bundled: record.bundled,
    userId: record.userId,
    themes: record.theme?.themes.map(({ name, appearance }) => ({ name, appearance })) ?? [],
  }));

  return json({ themes, userId });
};

export default function Themes() {
  const { themes } = useLoaderData<LoaderData>();

  return (
    <Layout>
      <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 pb-6">
        {themes?.map((theme, index) => (
          <ThemeFamilyPreview key={theme.id} theme={theme} index={index} />
        ))}
      </div>
    </Layout>
  );
}

const ThemeFamilyPreview = memo(({ theme, index }: { theme: ThemesMetaData; index: number }) => {
  return (
    <Carousel className="items flex flex-col gap-2" opts={{ active: theme.themes?.length > 1 }}>
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center whitespace-nowrap">
          <h4 className="text-lg flex-1 truncate">{theme.name}</h4>
          {theme.bundled ? (
            <Badge variant="outline" title="This theme is already included with zed">
              Included
            </Badge>
          ) : (
            <a
              role="button"
              href={`/download/themes/${theme.id}`}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
              aria-label={`Download ${theme.name} theme`}
              title="Download theme"
            >
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Download</title>
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
  },
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
