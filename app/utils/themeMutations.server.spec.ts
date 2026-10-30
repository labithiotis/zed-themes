import { eq } from 'drizzle-orm';
import { type DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import { migrate } from 'drizzle-orm/d1/migrator';
import * as schema from 'drizzle/schema';
import type { DBTheme } from 'drizzle/schema';
import { Miniflare } from 'miniflare';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { createThemeFamily } from '~/providers/themeFamily';
import { deleteTheme, publishTheme } from './themeMutations.server';

const OWNER = 'user_owner';
const ATTACKER = 'user_attacker';

let mf: Miniflare;
let db: DrizzleD1Database<typeof schema>;

const family = (name: string) =>
  createThemeFamily({
    name,
    author: 'Someone',
    themes: [{ name, appearance: 'dark', style: { background: '#000000' } }],
  });

function seed(row: Partial<DBTheme> & Pick<DBTheme, 'id' | 'name'>) {
  return db.insert(schema.themes).values({
    author: 'Someone',
    updatedDate: new Date(0),
    versionHash: 'seed',
    bundled: false,
    userId: OWNER,
    installCount: 42,
    theme: { ...family(row.name), id: row.id },
    ...row,
  });
}

const getTheme = (id: string) => db.query.themes.findFirst({ where: eq(schema.themes.id, id) });

beforeAll(async () => {
  mf = new Miniflare({ modules: true, script: 'export default {}', d1Databases: { db: 'test-db' } });
  db = drizzle(await mf.getD1Database('db'), { schema });
  await migrate(db, { migrationsFolder: 'drizzle' });
});

afterAll(() => mf.dispose());

beforeEach(async () => {
  await db.delete(schema.themes);
});

describe('publishTheme', () => {
  it('creates a theme with a server-generated id owned by the actor', async () => {
    const result = await publishTheme(db, { actorId: OWNER, family: family('Fresh') });

    expect(result.status).toBe('saved');
    const id = result.status === 'saved' ? result.id : '';
    const row = await getTheme(id);
    expect(row).toMatchObject({ id, name: 'Fresh', userId: OWNER, bundled: false });
    expect(row?.theme.id).toBe(id);
  });

  it("updates the actor's own theme, keeping its id, owner and stats", async () => {
    await seed({ id: 'mine', name: 'Old name' });

    const result = await publishTheme(db, { actorId: OWNER, targetId: 'mine', family: family('New name') });

    expect(result).toEqual({ status: 'saved', id: 'mine' });
    expect(await getTheme('mine')).toMatchObject({ id: 'mine', name: 'New name', userId: OWNER, installCount: 42 });
  });

  it("refuses to overwrite another user's theme when given its id and an unused name", async () => {
    await seed({ id: 'victim', name: 'Victim theme' });
    const before = await getTheme('victim');

    const result = await publishTheme(db, { actorId: ATTACKER, targetId: 'victim', family: family('Unused name') });

    expect(result).toEqual({ status: 'forbidden' });
    expect(await getTheme('victim')).toEqual(before);
  });

  it('cannot take ownership of a bundled theme', async () => {
    await seed({ id: 'bundled', name: 'One Dark', bundled: true, userId: null });
    const before = await getTheme('bundled');

    const result = await publishTheme(db, { actorId: ATTACKER, targetId: 'bundled', family: family('Unused name') });

    expect(result).toEqual({ status: 'forbidden' });
    expect(await getTheme('bundled')).toEqual(before);
  });

  it('returns notFound for an unknown target id without creating it', async () => {
    const result = await publishTheme(db, { actorId: OWNER, targetId: 'missing', family: family('Whatever') });

    expect(result).toEqual({ status: 'notFound' });
    expect(await getTheme('missing')).toBeUndefined();
  });

  it('rejects a name used by another user or a bundled theme', async () => {
    await seed({ id: 'theirs', name: 'Taken' });
    await seed({ id: 'bundled', name: 'One Dark', bundled: true, userId: null });

    expect(await publishTheme(db, { actorId: ATTACKER, family: family('Taken') })).toEqual({ status: 'nameConflict' });
    expect(await publishTheme(db, { actorId: ATTACKER, family: family('One Dark') })).toEqual({
      status: 'nameConflict',
    });
  });

  it('rejects invalid content', async () => {
    const result = await publishTheme(db, { actorId: OWNER, family: { name: 'Bad' } as never });

    expect(result.status).toBe('invalid');
  });
});

describe('deleteTheme', () => {
  it("deletes the actor's own theme", async () => {
    await seed({ id: 'mine', name: 'Mine' });

    expect(await deleteTheme(db, { actorId: OWNER, targetId: 'mine' })).toEqual({ status: 'deleted' });
    expect(await getTheme('mine')).toBeUndefined();
  });

  it("refuses to delete another user's theme", async () => {
    await seed({ id: 'victim', name: 'Victim theme' });

    expect(await deleteTheme(db, { actorId: ATTACKER, targetId: 'victim' })).toEqual({ status: 'forbidden' });
    expect(await getTheme('victim')).toBeDefined();
  });

  it('refuses to delete a bundled theme', async () => {
    await seed({ id: 'bundled', name: 'One Dark', bundled: true, userId: null });

    expect(await deleteTheme(db, { actorId: ATTACKER, targetId: 'bundled' })).toEqual({ status: 'forbidden' });
    expect(await getTheme('bundled')).toBeDefined();
  });

  it('returns notFound for an unknown id', async () => {
    expect(await deleteTheme(db, { actorId: OWNER, targetId: 'missing' })).toEqual({ status: 'notFound' });
  });
});
