import { getAuth } from '@clerk/remix/ssr.server';
import { type ActionFunction, json, redirect } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import invariant from 'tiny-invariant';
import { NotFoundResponse } from '~/utils/helpers';
import { deleteTheme } from '~/utils/themeMutations.server';

export const action: ActionFunction = async (args) => {
  const url = new URL(args.request.url);
  const { userId } = await getAuth(args);

  if (!userId) {
    return json({ error: 'You must be logged in to save a theme.' }, { status: 401 });
  }

  const form = new URLSearchParams(await args.request.text());
  const themeId = form.get('themeId');

  invariant(themeId, 'themeId is required');

  const db = drizzle(args.context.env.db, { schema });

  try {
    const result = await deleteTheme(db, { actorId: userId, targetId: themeId });

    if (result.status === 'forbidden') {
      return json({ error: 'You do not have permission to delete this theme.' }, { status: 403 });
    }
    if (result.status === 'notFound') {
      return json({ error: 'Theme not found.' }, { status: 404 });
    }

    // Redirect to themes page if user is deleting theme their currently on
    if (url.pathname === `/themes/${themeId}`) {
      return redirect('/users/themes');
    }

    return null;
  } catch {
    return json({ error: 'Unable to delete theme' }, { status: 400 });
  }
};

export const loader = () => {
  throw NotFoundResponse;
};
export default () => null;
