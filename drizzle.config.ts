import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'drizzle-kit';

function getLocalD1DB() {
  try {
    const basePath = path.resolve('.wrangler');
    const dbFile = fs.readdirSync(basePath, { encoding: 'utf-8', recursive: true }).find((f) => f.endsWith('.sqlite'));
    if (!dbFile) {
      throw new Error(`.sqlite file not found in ${basePath}`);
    }
    return path.resolve(basePath, dbFile);
  } catch (err) {
    console.log(`Error ${err instanceof Error ? err.message : err}`);
  }
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './drizzle/schema.ts',
  out: './drizzle',
  ...(import.meta.env.CF_D1_API_KEY
    ? {
        driver: 'd1-http',
        dbCredentials: {
          accountId: '7bc5bf0e3b7386107e27d74c22b449c0',
          databaseId: '28315368-145a-4500-a29a-5e5e3afb344b',
          token: import.meta.env.CF_D1_API_KEY,
        },
      }
    : { dbCredentials: { url: getLocalD1DB() } }),
});
