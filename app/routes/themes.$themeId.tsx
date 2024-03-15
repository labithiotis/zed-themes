import { Preview } from '~/components/preview/Preview.tsx';
import { Side } from '~/components/side/Side';
import { ThemeFamilyContent } from '~/state/themeFamily';
import { LoaderFunction, json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';
import { theme } from '~/state/state';
import invariant from 'tiny-invariant';
import { useSignalEffect } from '@preact/signals-react';

type LoaderData = {
  theme?: ThemeFamilyContent;
};

export const loader: LoaderFunction = async ({ context, params }) => {
  const themesKv = context.env?.themes;
  const sharesKv = context.env?.shares;

  invariant(params.themeId);

  if (params.themeId === 'edit') {
    return json({ theme: undefined });
  }

  const theme = (await themesKv?.get(params.themeId)) ?? (await sharesKv?.get(params.themeId));

  return json({ theme: theme ? JSON.parse(theme) : undefined });
};

export default function Theme() {
  const data = useLoaderData<LoaderData>();
  // const navigate = useNavigate();

  theme.value = data?.theme?.themes?.at(0) ?? null;

  useSignalEffect(() => {
    // todo when theme is edited change url
    // console.log(theme.value);
    // navigate('/themes/edit', { replace: true, preventScrollReset: true });
  });

  return (
    <div className="flex h-full min-w-[1024] overflow-hidden bg-stone-300 dark:bg-stone-900">
      <Side />
      {theme.value !== null && <Preview />}
    </div>
  );
}
