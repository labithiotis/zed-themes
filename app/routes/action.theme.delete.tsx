import { getAuth } from '@clerk/remix/ssr.server';
import { type ActionFunction, json, redirect } from '@remix-run/cloudflare';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { dbThemes } from 'drizzle/schema';
import invariant from 'tiny-invariant';

export const action: ActionFunction = async (args) => {
  const url = new URL(args.request.url);
  const { userId } = await getAuth(args);

  if (!userId) {
    return json({ error: 'You must be logged in to save a theme.' }, { status: 401 });
  }

  const form = new URLSearchParams(await args.request.text());
  const themeId = form.get('themeId');

  invariant(themeId, 'themeId is required');

  const db = drizzle(args.context.env.db);

  try {
    await db.delete(dbThemes).where(sql`${dbThemes.id} = ${themeId} AND ${dbThemes.userId} = ${userId}`);

    // Redirect to themes page if user is deleteing theme their currently on
    if (url.pathname === `/themes/${themeId}`) {
      return redirect('/users/themes');
    }

    return null;
  } catch {
    return json({ error: 'Unable to delete theme' }, { status: 400 });
  }
};
