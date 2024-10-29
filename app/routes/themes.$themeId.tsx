import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunctionArgs, type TypedResponse, json } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate, useParams, useSearchParams } from '@remix-run/react';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import json5 from 'json5';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { Layout } from '~/components/Layout';
import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { LOCAL_STORAGE_THEME_SYNC_KEY, useTheme } from '~/providers/theme';
import { createThemeFamily } from '~/providers/themeFamily';
import type { UserPrefs } from '~/types';
import { themeValidator } from '~/utils/themeValidator';
import { getUserPrefs } from '~/utils/userPrefs.server';
import type { ThemeFamilyContent } from '../themeFamily';

type LoaderData = {
  theme: ThemeFamilyContent | null;
  themeId: string | null;
  editable: boolean;
  userPrefs?: UserPrefs;
};

export const loader = async (args: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const dataKv = args.context.env?.zed_data;
  const sharesKv = args.context.env?.zed_shares;
  const { themeId } = args.params;
  invariant(themeId);

  const { userId } = await getAuth(args);
  const userPrefs = await getUserPrefs(userId, dataKv);

  if (args.params.themeId === 'new' || args.params.themeId === 'edit') {
    return json({ themeId: null, theme: null, editable: true, userPrefs });
  }

  const db = drizzle(args.context.env.db, { schema });
  const records = await db
    .select({ id: schema.themes.id, userId: schema.themes.userId, theme: schema.themes.theme })
    .from(schema.themes)
    .where(sql`${schema.themes.id} = ${themeId}`);

  const record = records?.at(0);

  if (!record) {
    return json({ themeId: null, theme: null, editable: args.params.themeId === 'edit', userPrefs });
  }

  const themeData = record.theme;
  const themeShare = !themeData ? await sharesKv?.get(themeId) : undefined;
  const theme = themeData ?? (themeShare ? json5.parse(themeShare) : undefined);

  return json({ themeId: record.id, theme, editable: !!userId && record.userId === userId, userPrefs });
};

export default function ThemeById() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const data = useLoaderData<typeof loader>();
  const { theme, themeId, dispatch } = useTheme();
  const hasTheme = !!theme;

  // Load theme from loader data
  useEffect(() => {
    if (themeId && data.themeId === themeId) return;
    if (data.theme) {
      console.debug('Load theme from remote data');
      dispatch({
        type: 'set',
        themeId: data.themeId,
        themeFamily: data?.theme,
        themeName: searchParams.get('name'),
      });
    }
  }, [data, themeId, dispatch, searchParams]);

  // Load theme from localstorage
  useEffect(() => {
    if (params.themeId === 'new') {
      dispatch({ type: 'set', themeId: null, themeFamily: createThemeFamily() });
      navigate('/themes/edit');
    }

    if (!hasTheme && params.themeId === 'edit') {
      console.debug('Load theme from localstorage');
      const localTheme = json5.parse(localStorage.getItem(LOCAL_STORAGE_THEME_SYNC_KEY) ?? '{}');
      if (themeValidator(localTheme)) {
        console.debug('Localstorage theme is valid, load it');
        dispatch({ type: 'set', themeId: null, themeFamily: localTheme });
      } else {
        console.warn('Unable to load theme from local storage as its invalid theme:', themeValidator.errors);
        dispatch({ type: 'set', themeId: null, themeFamily: createThemeFamily() });
      }
    }
  }, [hasTheme, params.themeId, dispatch, navigate]);

  return (
    <Layout className="h-full flex overflow-hidden mt-14 md:mt-14">
      <div className="flex-1 flex min-w-[1024] overflow-hidden" key={params.themeId}>
        <Side edit={data.editable} />
        {!!theme && <Preview userPrefs={data.userPrefs} />}
      </div>
    </Layout>
  );
}
