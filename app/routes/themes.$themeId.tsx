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

type LoaderData = {
  theme?: ThemeFamilyContent;
  editable: boolean;
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

    return json({ theme, editable: true });
  }

  const db = drizzle(args.context.env.db);
  const records = await db
    .select({ userId: dbThemes.userId, theme: dbThemes.theme })
    .from(dbThemes)
    .where(sql`${dbThemes.id} = ${themeId}`);

  const record = records?.at(0);

  if (!record) {
    return json({ theme: undefined, editable: false });
  }

  const themeData = record.theme;
  const themeShare = !themeData ? await sharesKv?.get(themeId) : undefined;
  const theme = themeData ?? (themeShare ? JSON.parse(themeShare) : undefined);

  return json({ theme, editable: record.userId === userId || args.params.themeId === 'edit' });
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
        <Side edit={data.editable || params.themeId === 'edit'} />
        {!!theme && <Preview />}
      </div>
    </Layout>
  );
}
