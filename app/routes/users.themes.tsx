import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunction, json } from '@remix-run/cloudflare';
import { Link, useFetcher, useLoaderData, useRouteError } from '@remix-run/react';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import { useState } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { Layout } from '~/components/Layout';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import type { ThemesMetaData } from '../types';

type LoaderData = {
  themes: ThemesMetaData[];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  const db = drizzle(args.context.env.db, { schema });

  const records = await db.select().from(schema.themes).where(sql`${schema.themes.userId} = ${userId}`).all();
  const themes: ThemesMetaData[] = records.map((record) => ({
    id: record.id,
    name: record.name,
    author: record.author,
    updatedDate: record.updatedDate.getTime(),
    versionHash: record.versionHash,
    bundled: record.bundled,
    userId: record.userId,
    themes: record.theme?.themes.map(({ name, appearance }) => ({ name, appearance })) ?? [],
  }));

  return json({ themes });
};

export default function UserThemes() {
  const { themes } = useLoaderData<LoaderData>();

  if (themes.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center mt-20 ">
          <AiOutlineFileAdd size={40} />
          <h2 className="text-lg font-semibold">You have no themes yet</h2>
          <p className="mb-4">Get started by creating a new theme.</p>
          <Button size="sm">
            <Link to="/themes/new" rel="Create theme">
              Create theme
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Table>
        <TableHeader>
          <tr>
            <TableHead>Theme family name</TableHead>
            <TableHead>Themes</TableHead>
            <TableHead>Date updated</TableHead>
            <TableHead />
          </tr>
        </TableHeader>
        <TableBody>
          {themes.map((theme) => (
            <TableRow key={theme.id}>
              <TableCell className="font-medium truncate">{theme.name}</TableCell>
              <TableCell>{theme.themes?.length ?? 0}</TableCell>
              <TableCell>{new Date(theme.updatedDate).toISOString().split('.').at(0)}</TableCell>
              <TableCell className="flex-1 flex justify-end gap-2">
                <DeleteAction theme={theme} />
                <Button size="xs" asChild>
                  <Link to={`/themes/${theme.id}`}>Edit theme</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  );
}

function DeleteAction({ theme }: { theme: Pick<ThemesMetaData, 'id' | 'name'> }) {
  const [name, setName] = useState('');
  const fetcher = useFetcher<{ id: string }>({ key: 'theme-delete' });
  const canDelete = theme.name === name;

  const deleteTheme = () => {
    if (canDelete) {
      fetcher.submit({ themeId: theme.id }, { action: '/action/theme/delete', method: 'POST' });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs" variant="destructive">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>The theme will be deleted and cannot be recovered.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <p>
            Please enter "<strong>{theme.name}</strong>" to confirm.
          </p>
          <Input
            id="name-confirmation"
            placeholder="Enter theme name to delete"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button
            type="button"
            variant="destructive"
            disabled={!canDelete}
            loading={fetcher.state === 'submitting'}
            onClick={deleteTheme}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
