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
    userId: text('userId'),
    theme: text('theme', { mode: 'json' }).$type<ThemeFamilyContent>().notNull(),
  },
  (themes) => ({
    idIdx: uniqueIndex('idIdx').on(themes.id),
    nameIdx: index('nameIdx').on(themes.name),
    authorIdx: index('authorIdx').on(themes.author),
    updatedDateIdx: index('updatedDateIdx').on(themes.updatedDate),
    bundledIdx: index('bundledIdx').on(themes.bundled),
    userIdIdx: index('userIdIdx').on(themes.userId),
  }),
);

export type DBTheme = typeof themes.$inferSelect;
