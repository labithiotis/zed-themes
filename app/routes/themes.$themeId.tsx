import { type LoaderFunctionArgs, type TypedResponse, json } from '@remix-run/cloudflare';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { Layout } from '~/components/Layout';
import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { useTheme } from '~/providers/theme';
import type { ThemeFamilyContent } from '../themeFamily';

type LoaderData = {
  theme?: ThemeFamilyContent;
};

export const loader = async ({ context, params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const themesKv = context.env?.zed_themes;
  const sharesKv = context.env?.zed_shares;

  invariant(params.themeId);

  const theme = (await themesKv?.get(params.themeId)) ?? (await sharesKv?.get(params.themeId));

  return json({ theme: theme ? JSON.parse(theme) : undefined });
};

export default function ThemeById() {
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
    }
  }, [data, themeFamily, dispatch, searchParams]);

  return (
    <Layout className="h-full mt-0 pt-14 flex">
      <div className="flex-1 flex min-w-[1024] overflow-hidden">
        <Side edit={false} />
        {!!theme && <Preview />}
      </div>
    </Layout>
  );
}
