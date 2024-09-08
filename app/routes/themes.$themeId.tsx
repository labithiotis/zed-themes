import { createClerkClient } from '@clerk/remix/api.server';
import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunctionArgs, type TypedResponse, json } from '@remix-run/cloudflare';
import { useLoaderData, useParams, useRouteError, useSearchParams } from '@remix-run/react';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { Layout } from '~/components/Layout';
import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { LOCAL_STORAGE_THEME_SYNC_KEY, useTheme } from '~/providers/theme';
import { getAuthor } from '~/utils/getAuthor';
import { themeValidator } from '~/utils/themeValidator';
import type { ThemeFamilyContent } from '../themeFamily';

type LoaderData = {
  theme: ThemeFamilyContent | null;
  themeId: string | null;
  editable: boolean;
};

export const loader = async (args: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const sharesKv = args.context.env?.zed_shares;
  const { userId } = await getAuth(args);
  const clerkClient = createClerkClient({ secretKey: args.context.env.CLERK_SECRET_KEY });

  const { themeId } = args.params;

  invariant(themeId);

  if (args.params.themeId === 'new') {
    const user = userId ? await clerkClient.users.getUser(userId) : undefined;
    const theme: ThemeFamilyContent = {
      author: getAuthor(user),
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

    return json({ themeId: null, theme, editable: true });
  }

  const db = drizzle(args.context.env.db, { schema });
  const records = await db
    .select({ id: schema.themes.id, userId: schema.themes.userId, theme: schema.themes.theme })
    .from(schema.themes)
    .where(sql`${schema.themes.id} = ${themeId}`);

  const record = records?.at(0);

  if (!record) {
    return json({ themeId: null, theme: null, editable: args.params.themeId === 'edit' });
  }

  const themeData = record.theme;
  const themeShare = !themeData ? await sharesKv?.get(themeId) : undefined;
  const theme = themeData ?? (themeShare ? JSON.parse(themeShare) : undefined);

  return json({ themeId: record.id, theme, editable: !!userId && record.userId === userId });
};

export default function ThemeById() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const data = useLoaderData<typeof loader>();
  const { theme, themeId, dispatch } = useTheme();

  useEffect(() => {
    if (themeId && themeId === data.themeId) return;

    if (data.theme) {
      dispatch({
        type: 'set',
        themeId: data.themeId,
        themeFamily: data?.theme,
        themeName: searchParams.get('name'),
      });
    } else {
      const localTheme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_SYNC_KEY) ?? '');

      if (themeValidator(localTheme)) {
        dispatch({ type: 'set', themeId: null, themeFamily: localTheme });
      } else {
        console.warn('Unable to load theme from local storage as its invalid theme:', themeValidator.errors);
      }
    }
  }, [data, dispatch, searchParams, themeId]);

  return (
    <Layout className="h-full mt-0 pt-14 flex">
      <div className="flex-1 flex min-w-[1024] overflow-hidden" key={params.themeId}>
        <Side edit={data.editable} />
        {!!theme && <Preview />}
      </div>
    </Layout>
  );
}

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
