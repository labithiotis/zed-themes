import { createHash } from 'node:crypto';
import { getAuth } from '@clerk/remix/ssr.server';
import { type ActionFunction, json } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import type { DBTheme } from 'drizzle/schema';
import * as schema from 'drizzle/schema';
import json5 from 'json5';
import { nanoid } from 'nanoid';
import invariant from 'tiny-invariant';
import type { ThemeFamilyContent } from '~/themeFamily';
import { NotFoundResponse } from '~/utils/helpers';
import { themeValidator } from '~/utils/themeValidator';

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return json({ error: 'You must be logged in to save a theme.' }, { status: 401 });
  }

  const form = new URLSearchParams(await args.request.text());
  const formId = form.get('id');
  const themeRaw = form.get('theme');
  const db = drizzle(args.context.env.db, { schema });

  invariant(themeRaw, 'theme is required');

  const themeFamilyContent: Pick<ThemeFamilyContent, 'name' | 'author' | 'themes'> = json5.parse(themeRaw);

  const existing = await db.query.themes.findFirst({
    where: (themes, { eq }) => eq(themes.name, themeFamilyContent.name),
  });

  if (existing && existing.userId !== userId) {
    return json({ error: 'A theme with that name already exists.' }, { status: 400 });
  }

  if (themeValidator(themeFamilyContent)) {
    const versionHash = createHash('md5').update(themeRaw).digest('hex');
    const id = formId || nanoid();
    const theme: DBTheme = {
      id,
      name: themeFamilyContent.name,
      author: themeFamilyContent.author,
      userId,
      updatedDate: new Date(),
      versionHash,
      bundled: false,
      repoUrl: null,
      repoStars: null,
      installCount: null,
      theme: { ...themeFamilyContent, id },
    };

    await db.insert(schema.themes).values(theme).onConflictDoUpdate({
      target: schema.themes.id,
      set: theme,
    });

    return json({ success: true, id: theme.id });
  }

  return json({ error: 'Invalid theme', errors: themeValidator.errors }, { status: 400 });
};

export const loader = () => {
  throw NotFoundResponse;
};
export default () => null;
