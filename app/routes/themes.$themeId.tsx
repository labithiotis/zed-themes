import { env } from 'node:process';
import { createClerkClient } from '@clerk/remix/api.server';
import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunctionArgs, type TypedResponse, json } from '@remix-run/cloudflare';
import { useLoaderData, useParams, useSearchParams } from '@remix-run/react';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { dbThemes } from 'drizzle/schema';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { Layout } from '~/components/Layout';
import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { LOCAL_STORAGE_THEME_SYNC_KEY, useTheme } from '~/providers/theme';
import { themeValidator } from '~/utils/themeValidator';
import type { ThemeFamilyContent } from '../themeFamily';

const EDITABLE = ['edit', 'new'];

type LoaderData = {
  theme?: ThemeFamilyContent;
};

const clerkClient = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });

export const loader = async (args: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const sharesKv = args.context.env?.zed_shares;
  const { userId } = await getAuth(args);

  const { themeId } = args.params;

  invariant(themeId);

  if (args.params.themeId === 'new') {
    const user = userId ? await clerkClient.users.getUser(userId) : undefined;
    const theme: ThemeFamilyContent = {
      author: user?.fullName ?? 'Anonymous',
      name: 'default',
      themes: [
        {
          name: 'default',
          appearance: 'light',
          style: {
            background: '#7e7e7e',
            syntax: {},
            players: [],
          },
        },
      ],
    };

    return json({ theme });
  }

  const db = drizzle(args.context.env.db);
  const themeFamily = await db.select({ theme: dbThemes.theme }).from(dbThemes).where(sql`${dbThemes.id} = ${themeId}`);

  const theme = themeFamily?.at(0)?.theme;
  const themeShare = !theme ? await sharesKv?.get(themeId) : undefined;

  return json({ theme: theme ?? (themeShare ? JSON.parse(themeShare) : undefined) });
};

export default function ThemeById() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const data = useLoaderData<typeof loader>();
  const { theme, themeFamily, dispatch } = useTheme();

  useEffect(() => {
    const dataTheme = data?.theme;
    if (dataTheme && dataTheme?.name !== themeFamily?.name) {
      dispatch({
        type: 'set',
        themeFamily: dataTheme,
        themeName: searchParams.get('name'),
      });
    } else if (!theme) {
      const localTheme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_SYNC_KEY) ?? '');

      if (themeValidator(localTheme)) {
        dispatch({ type: 'set', themeFamily: localTheme });
      } else {
        console.warn('Unable to load theme from local storage as its invalid theme');
      }
    }
  }, [data, themeFamily, dispatch, searchParams, theme]);

  return (
    <Layout className="h-full mt-0 pt-14 flex">
      <div className="flex-1 flex min-w-[1024] overflow-hidden">
        <Side edit={!!params.themeId && EDITABLE.includes(params.themeId)} />
        {!!theme && <Preview />}
      </div>
    </Layout>
  );
}
