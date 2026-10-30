import { createHash } from 'node:crypto';
import type { ErrorObject } from 'ajv';
import { and, eq, isNull, ne, or } from 'drizzle-orm';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from 'drizzle/schema';
import { nanoid } from 'nanoid';
import type { ThemeFamilyContent } from '~/themeFamily';
import { themeValidator } from '~/utils/themeValidator';

type DB = DrizzleD1Database<typeof schema>;

export type PublishFamily = Pick<ThemeFamilyContent, 'name' | 'author' | 'themes'>;

export type PublishResult =
  | { status: 'saved'; id: string }
  | { status: 'invalid'; errors: ErrorObject[] }
  | { status: 'nameConflict' }
  | { status: 'forbidden' }
  | { status: 'notFound' };

export type DeleteResult = { status: 'deleted' } | { status: 'forbidden' } | { status: 'notFound' };

// A theme may only be mutated by the user who owns it; bundled themes are never user-owned.
function ownedBy(actorId: string, targetId: string) {
  return and(eq(schema.themes.id, targetId), eq(schema.themes.userId, actorId), eq(schema.themes.bundled, false));
}

async function missingOrForbidden(db: DB, targetId: string): Promise<{ status: 'forbidden' | 'notFound' }> {
  const existing = await db.query.themes.findFirst({ columns: { id: true }, where: eq(schema.themes.id, targetId) });
  return { status: existing ? 'forbidden' : 'notFound' };
}

export async function publishTheme(
  db: DB,
  { actorId, targetId, family }: { actorId: string; targetId?: string; family: PublishFamily },
): Promise<PublishResult> {
  if (!themeValidator(family)) {
    return { status: 'invalid', errors: themeValidator.errors ?? [] };
  }

  const nameTaken = await db.query.themes.findFirst({
    columns: { id: true },
    where: and(
      eq(schema.themes.name, family.name),
      or(isNull(schema.themes.userId), ne(schema.themes.userId, actorId), eq(schema.themes.bundled, true)),
    ),
  });

  if (nameTaken) {
    return { status: 'nameConflict' };
  }

  const content = {
    name: family.name,
    author: family.author,
    updatedDate: new Date(),
    versionHash: createHash('md5').update(JSON.stringify(family)).digest('hex'),
  };

  if (targetId) {
    const updated = await db
      .update(schema.themes)
      .set({ ...content, theme: { ...family, id: targetId } })
      .where(ownedBy(actorId, targetId))
      .returning({ id: schema.themes.id });

    return updated.length ? { status: 'saved', id: targetId } : missingOrForbidden(db, targetId);
  }

  const id = nanoid();
  await db.insert(schema.themes).values({
    ...content,
    id,
    userId: actorId,
    bundled: false,
    repoUrl: null,
    repoStars: null,
    installCount: 0,
    theme: { ...family, id },
  });

  return { status: 'saved', id };
}

export async function deleteTheme(
  db: DB,
  { actorId, targetId }: { actorId: string; targetId: string },
): Promise<DeleteResult> {
  const deleted = await db.delete(schema.themes).where(ownedBy(actorId, targetId)).returning({ id: schema.themes.id });

  return deleted.length ? { status: 'deleted' } : missingOrForbidden(db, targetId);
}
