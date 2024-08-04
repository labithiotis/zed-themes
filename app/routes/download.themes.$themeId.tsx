import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { dbThemes } from 'drizzle/schema';
import invariant from 'tiny-invariant';

export const loader = async (args: LoaderFunctionArgs) => {
  invariant(args.params.themeId);

  const db = drizzle(args.context.env.db);
  const res = await db
    .select({ theme: dbThemes.theme })
    .from(dbThemes)
    .where(sql`${dbThemes.id} = ${args.params.themeId}`);

  const theme = res?.at(0)?.theme;

  if (!theme) {
    throw new Response(null, { status: 404, statusText: 'Not Found' });
  }

  return new Response(JSON.stringify(theme, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${args.params.themeId}.json"`,
    },
  });
};
