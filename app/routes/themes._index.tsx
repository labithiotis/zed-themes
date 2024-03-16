import { UiThemeToggle } from '~/components/UiThemeToggle.tsx';
import { LoaderFunction, json } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  themes: { id: string; name?: string; author?: string }[];
};

async function fetchAllThemesFromKV(ns: KVNamespace) {
  const nsList = await ns.list<{ name: string; author: string }>();
  return nsList.keys.map((key) => ({ id: key.name, name: key.metadata?.name, author: key.metadata?.author }));
}

export const loader: LoaderFunction = async ({ context }) => {
  const themes = await fetchAllThemesFromKV(context.env.themes);
  return json({ themes });
};

export default function Themes() {
  const { themes } = useLoaderData<LoaderData>();

  return (
    <div className="flex h-screen w-full content-stretch bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div className="flex w-full flex-col px-6  py-4">
        <span className="mb-2 flex text-xl font-semibold text-zed-800 dark:text-zed-600">
          <span className="flex-1">Zed Themes</span>
          <UiThemeToggle />
        </span>
        <div className="flex w-full justify-center">
          <div className="grid w-full max-w-[1600px] gap-6 sm:grid-cols-2 md:grid-cols-3">
            {themes?.map((theme) => (
              <a key={theme.id} className="items flex min-h-6 flex-col gap-2" href={'/themes/' + theme.id}>
                <div className="flex flex-col overflow-hidden">
                  <h4 className="text-lg">{theme.name}</h4>
                  <p className="overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">By {theme.author}</p>
                </div>
                <div className="flex-1 cursor-pointer rounded outline outline-2 outline-offset-4 outline-transparent transition-all hover:outline-zed-800 dark:hover:outline-neutral-600">
                  <img
                    src={`/themes/preview.svg?id=${theme.id}`}
                    width="100%"
                    height="100%"
                    alt={`${theme.name} preview`}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
