import { getAuth } from '@clerk/remix/ssr.server';
import { type ActionFunction, json } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import json5 from 'json5';
import invariant from 'tiny-invariant';
import { NotFoundResponse } from '~/utils/helpers';
import { type PublishFamily, publishTheme } from '~/utils/themeMutations.server';

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    return json({ error: 'You must be logged in to save a theme.' }, { status: 401 });
  }

  const form = new URLSearchParams(await args.request.text());
  const themeRaw = form.get('theme');
  const db = drizzle(args.context.env.db, { schema });

  invariant(themeRaw, 'theme is required');

  const family: PublishFamily = json5.parse(themeRaw);
  const result = await publishTheme(db, { actorId: userId, targetId: form.get('id') || undefined, family });

  switch (result.status) {
    case 'saved':
      return json({ success: true, id: result.id });
    case 'invalid':
      return json({ error: 'Invalid theme', errors: result.errors }, { status: 400 });
    case 'nameConflict':
      return json({ error: 'A theme with that name already exists.' }, { status: 400 });
    case 'forbidden':
      return json({ error: 'You do not have permission to edit this theme.' }, { status: 403 });
    case 'notFound':
      return json({ error: 'Theme not found.' }, { status: 404 });
  }
};

export const loader = () => {
  throw NotFoundResponse;
};
export default () => null;
