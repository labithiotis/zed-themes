import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import type { ThemeFamilyContent } from '~/themeFamily';

export const themes = sqliteTable(
  'themes',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    author: text('author').notNull(),
    updatedDate: integer('updatedDate', { mode: 'timestamp' }).notNull(),
    versionHash: text('versionHash').notNull(),
    bundled: integer('bundled', { mode: 'boolean' }).notNull(),
    repoUrl: text('repoUrl'),
    repoStars: integer('repoStars'),
    userId: text('userId'),
    theme: text('theme', { mode: 'json' }).$type<ThemeFamilyContent & { id: string }>().notNull(),
    installCount: integer('installCount').default(0),
  },
  (themes) => ({
    idIdx: uniqueIndex('idIdx').on(themes.id),
    nameIdx: index('nameIdx').on(themes.name),
    authorIdx: index('authorIdx').on(themes.author),
    updatedDateIdx: index('updatedDateIdx').on(themes.updatedDate),
    bundledIdx: index('bundledIdx').on(themes.bundled),
    userIdIdx: index('userIdIdx').on(themes.userId),
    installCountIdx: index('installCountIdx').on(themes.installCount),
  }),
);

export type DBTheme = typeof themes.$inferSelect;

export const syncStats = sqliteTable('sync_stats', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  syncedAt: integer('syncedAt').notNull(),
  themesCount: integer('themesCount').notNull(),
  extensionsCount: integer('extensionsCount').notNull(),
  durationMs: integer('durationMs'),
  status: text('status', { enum: ['success', 'failed'] }).notNull(),
  errorMessage: text('errorMessage'),
});

export type DBSyncStats = typeof syncStats.$inferSelect;
