import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunction, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import { Search } from 'lucide-react';
import { memo } from 'react';
import { FaGithub, FaStar } from 'react-icons/fa';
import themePreviewBackgroundDark from '~/assets/images/dune_dark_sm.jpeg';
import themePreviewBackgroundLight from '~/assets/images/dune_light_sm.jpeg';
import { Layout } from '~/components/Layout';
import { Badge } from '~/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import type { AppearanceContent } from '~/themeFamily';
import type { ThemesMetaData } from '../types';

export type ThemeLitst = { timestamp: number; themes: ThemesMetaData[] };

type LoaderData = {
  themes: ThemesMetaData[];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const db = drizzle(args.context.env.db, { schema });
  const url = new URL(args.request.url);
  const search = url.searchParams.get('search');
  const searchQuery = search ? `%${search}%` : undefined;

  const records = await db
    .select()
    .from(schema.themes)
    .where(
      searchQuery
        ? sql`LOWER(${schema.themes.name}) LIKE LOWER(${searchQuery}) OR LOWER(${schema.themes.author}) LIKE LOWER(${searchQuery})`
        : undefined,
    )
    .all();

  const themes: ThemesMetaData[] = records.map((record) => ({
    id: record.id,
    name: record.name,
    author: record.author,
    updatedDate: record.updatedDate.getTime(),
    versionHash: record.versionHash,
    bundled: record.bundled,
    repoUrl: record.repoUrl,
    repoStars: record.repoStars,
    userId: record.userId,
    themes:
      record.theme?.themes.map(({ name, appearance, style }) => ({
        name,
        appearance,
        backgroundColor: style.background,
        backgroundAppearance: style['background.appearance'],
      })) ?? [],
  }));

  return json({ themes, userId });
};

export default function Home() {
  const { themes } = useLoaderData<LoaderData>();

  return (
    <Layout>
      {themes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10" data-testid="no-results-message">
          <Search className="h-16 w-16 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No results found</h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">We couldn't find any themes for your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 w-full gap-8 sm:grid-cols-2 md:grid-cols-3 pb-6">
          {themes?.map((theme, index) => (
            <ThemeFamilyPreview key={`${theme.id}-${theme.name}-${index}`} theme={theme} index={index} />
          ))}
        </div>
      )}
    </Layout>
  );
}

const ThemeFamilyPreview = memo(({ theme, index }: { theme: ThemesMetaData; index: number }) => {
  return (
    <Carousel
      className="items flex flex-col gap-1"
      opts={{ active: theme.themes?.length > 1 }}
      data-testid="theme"
      data-theme-id={theme.id}
      data-theme-name={theme.name}
    >
      <div className="flex flex-col">
        <div className="flex items-center overflow-hidden">
          <h4 className="text-lg flex-1 truncate">{theme.name} asdsd</h4>
          <div>
            {theme.bundled ? (
              <Badge variant="outline" title="This theme is already included with zed, install via extensions">
                Included
              </Badge>
            ) : (
              <a
                href={`/download/themes/${theme.id}`}
                className="flex px-1 gap-1 text-sm items-center justify-center rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
                aria-label={`Download ${theme.name} theme`}
                title="Download theme to ~/.config/zed/themes"
              >
                <svg width="14px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span>Download</span>
              </a>
            )}
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <div className="flex items-center flex-1 overflow-hidden gap-1">
            <span className="overflow-hidden text-ellipsis text-nowrap text-xs opacity-80 mr-1">
              By {theme.author.replace(/<.*>?$/, '').trim()}
            </span>
            {theme.bundled && typeof theme.repoUrl === 'string' ? (
              <>
                <a
                  href={theme.repoUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="p-[6px] text-neutral-600 hover:text-black dark:hover:text-white"
                  aria-label="Github repository link"
                >
                  <FaGithub size={12} />
                </a>
                {theme.bundled && typeof theme.repoStars === 'number' && (
                  <a
                    href={theme.repoUrl}
                    rel="noreferrer"
                    target="_blank"
                    className="py-[4px] px-[3px] flex items-center text-neutral-600 hover:text-black dark:hover:text-white"
                    aria-label="Github repository link"
                  >
                    <span className="text-xs">{theme.repoStars}</span>
                    <FaStar size={10} className="ml-[1px]" />
                  </a>
                )}
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="relative cursor-pointer overflow-hidden rounded-lg hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-zed-800 dark:hover:outline-neutral-600">
        <CarouselContent>
          {theme?.themes?.map(({ name, appearance, backgroundColor, backgroundAppearance }, index2) => (
            <ThemePreview
              key={`${theme.id}-${name}-${index2}`}
              themeId={theme.id}
              themeName={name}
              themeAppearance={appearance}
              backgroundColor={backgroundColor}
              backgroundAppearance={backgroundAppearance}
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
  ({
    themeId,
    themeName,
    themeAppearance,
    backgroundColor,
    backgroundAppearance,
    index,
    index2,
  }: {
    themeId: string;
    themeName: string;
    themeAppearance: AppearanceContent;
    backgroundColor?: string;
    backgroundAppearance: string;
    index: number;
    index2: number;
  }) => {
    return (
      <CarouselItem>
        <a
          href={encodeURI(`/themes/${themeId}?name=${themeName}`)}
          className="overflow-hidden rounded-lg"
          aria-label={`Preview ${themeName} theme`}
          style={{
            backgroundColor:
              backgroundAppearance === 'opaque' ? (themeAppearance === 'dark' ? '#000' : '#fff') : undefined,
            backdropFilter: backgroundAppearance === 'blurred' ? 'blur(20px)' : 'none',
          }}
        >
          <img
            width="100%"
            height="100%"
            className="absolute z-10 overflow-hidden rounded-lg inset-0 w-full aspect-[4.24/3.05] object-cover"
            src={themeAppearance === 'dark' ? themePreviewBackgroundDark : themePreviewBackgroundLight}
            alt="Preview background"
            loading={index < 9 && index2 === 0 ? 'eager' : 'lazy'}
          />
          <div
            className="absolute z-30 overflow-hidden rounded-lg inset-0 w-full aspect-[4.24/3.05]"
            style={{ backgroundColor }}
          />
          <img
            width="100%"
            height="100%"
            className="relative z-50 overflow-hidden rounded-lg inset-0 w-full aspect-[4.24/3.05]"
            src={encodeURI(`/themes/preview.svg?id=${themeId}&name=${themeName}`)}
            alt={`${themeName} preview`}
            loading={index < 9 && index2 === 0 ? 'eager' : 'lazy'}
          />
        </a>
      </CarouselItem>
    );
  },
);
ThemePreview.displayName = 'ThemePreview';
