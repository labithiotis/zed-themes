import { Preview } from '~/components/preview/Preview';
import { Side } from '~/components/side/Side';
import { ThemeFamilyContent } from '../themeFamily';
import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { useEffect } from 'react';
import { useTheme } from '~/providers/theme';

type LoaderData = {
  theme?: ThemeFamilyContent;
};

export const loader = async ({ context, params }: LoaderFunctionArgs): Promise<TypedResponse<LoaderData>> => {
  const themesKv = context.env?.themes;
  const sharesKv = context.env?.shares;

  invariant(params.themeId);

  if (params.themeId === 'edit') {
    return json({ theme: undefined });
  }

  const theme = (await themesKv?.get(params.themeId)) ?? (await sharesKv?.get(params.themeId));

  return json({ theme: theme ? JSON.parse(theme) : undefined });
};

export default function ThemeById() {
  const data = useLoaderData<typeof loader>();
  const { theme, themeFamily, dispatch } = useTheme();

  useEffect(() => {
    const dataTheme = data?.theme;
    if (dataTheme && dataTheme?.name !== themeFamily?.name) {
      dispatch({ type: 'set', themeFamily: dataTheme });
    }
  }, [data, themeFamily, dispatch]);

  return (
    <div className="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side />
      {!!theme && <Preview />}
    </div>
  );
}
