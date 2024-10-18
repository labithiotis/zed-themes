#!/usr/bin/env zx

import { $ } from 'zx';
import dbSeedThemes from './dbSeedThemes.json';

$.verbose = false;

for (const theme of dbSeedThemes) {
  try {
    console.log(`Adding ${theme.name} theme...`);
    const sql = `
      INSERT INTO themes (id, name, author, updatedDate, versionHash, bundled, repoUrl, repoStars, userId, theme)
      VALUES ("${theme.id}", "${theme.name}", "${theme.author}", ${theme.updatedDate}, "${theme.versionHash}", ${theme.bundled}, '${theme.repoUrl}', ${theme.repoStars}, null, '${JSON.stringify(theme.theme)}')
      ON CONFLICT (id) DO UPDATE
      SET name = EXCLUDED.name,
          author = EXCLUDED.author,
          updatedDate = EXCLUDED.updatedDate,
          versionHash = EXCLUDED.versionHash,
          bundled = EXCLUDED.bundled,
          repoUrl = EXCLUDED.repoUrl,
          repoStars = EXCLUDED.repoStars,
          userId = EXCLUDED.userId,
          theme = EXCLUDED.theme;
    `;

    await $`pnpm wrangler d1 execute zed_themes --command=${sql} --local`;
  } catch (e) {
    // ignore
    console.error(e);
  }
}
