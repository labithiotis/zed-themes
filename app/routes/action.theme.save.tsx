import { createHash } from 'node:crypto';
import { getAuth } from '@clerk/remix/ssr.server';
import { type ActionFunction, json, redirect } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { type DBTheme, dbThemes } from 'drizzle/schema';
import { nanoid } from 'nanoid';
import invariant from 'tiny-invariant';
import type { Theme, ThemesMetaData } from '~/types';
import { themeValidator } from '~/utils/themeValidator';

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return json({ error: 'You must be logged in to save a theme.' }, { status: 401 });
  }

  const form = new URLSearchParams(await args.request.text());
  const themeRaw = form.get('theme');

  invariant(themeRaw, 'theme is required');

  const themeData: Pick<Theme, 'name' | 'author' | 'themes'> = JSON.parse(themeRaw);

  if (themeValidator(themeData)) {
    const versionHash = createHash('md5').update(themeRaw).digest('hex');
    const theme: DBTheme = {
      id: nanoid(),
      name: themeData.name,
      author: themeData.author,
      userId,
      updatedDate: new Date(),
      versionHash,
      bundled: false,
      theme: themeData,
    };

    const db = drizzle(args.context.env.db);
    await db.insert(dbThemes).values(theme);

    return redirect(`/themes/${theme.id}`);
  }

  return json({ error: 'Invalid theme', errors: themeValidator.errors }, { status: 400 });
};
