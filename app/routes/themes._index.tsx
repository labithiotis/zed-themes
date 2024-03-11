import { UiThemeToggle } from '~/components/UiThemeToggle.tsx';
import { LoaderFunction } from '@remix-run/server-runtime';
import { useLoaderData } from '@remix-run/react';

type LoaderData = {
  themes: { id: string; name?: string; author?: string }[];
};

async function fetchAllThemesFromKV(ns: KVNamespace) {
  const nsList = await ns.list<{ name: string; author: string }>();
  return nsList.keys.map((key) => ({ id: key.name, name: key.metadata?.name, author: key.metadata?.author }));
}

export const loader: LoaderFunction = async ({ context }): Promise<LoaderData> => {
  const themes = await fetchAllThemesFromKV(context.env.themes);
  return { themes };
};

export default function Themes() {
  const { themes } = useLoaderData<LoaderData>();

  console.log({ themes });
  return (
    <div className="flex h-screen w-screen bg-stone-300 dark:bg-stone-900 dark:text-zinc-200">
      <div className="flex flex-col px-6 py-4">
        <span className="text-zed-800 dark:text-zed-600 mb-2 flex text-xl font-semibold">
          <span className="flex-1">Zed Themes</span>
          <UiThemeToggle />
        </span>
        <div className="flex flex-wrap content-start justify-center ">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {themes?.map((theme) => (
              <a
                key={theme.id}
                className="items flex flex-col gap-2"
                href={'/themes/' + theme.id}
              >
                <div className="flex flex-col overflow-hidden">
                  <h4 className="text-lg">{theme.name}</h4>
                  <p className="overflow-hidden text-ellipsis text-nowrap text-xs opacity-60">By {theme.author}</p>
                </div>
                <div className="hover:outline-zed-800 flex-1 cursor-pointer rounded outline outline-2 outline-offset-4 outline-transparent transition-all dark:hover:outline-neutral-600">
                  <img src={`/themes/preview.svg?id=${theme.id}`} width="100%" height="100%" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
