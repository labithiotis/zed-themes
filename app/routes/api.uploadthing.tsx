import { getAuth } from '@clerk/remix/ssr.server';
import type { ActionFunction } from '@remix-run/cloudflare';
import { type FileRouter, createRouteHandler, createUploadthing } from 'uploadthing/remix';
import { UploadThingError } from 'uploadthing/server';
import { z } from 'zod';
import { setUserPrefs } from '~/utils/userPrefs.server';

const f = createUploadthing();

const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .input(z.strictObject({ userPrefImageKey: z.enum(['imageDark', 'imageLight']) }))
    .middleware(async ({ event, input }) => {
      const user = await getAuth(event);
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.userId, userPrefImageKey: input.userPrefImageKey };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return setUserPrefs(metadata.userId, globalThis.kv, {
        [metadata.userPrefImageKey]: file.url,
      });
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

const handlers = createRouteHandler({ router: uploadRouter, config: {} });

// FIXME: Remove below when `event` is added to onUploadComplete
declare global {
  var kv: KVNamespace;
}
export const loader = handlers.loader;
export const action: ActionFunction = async (ctx) => {
  globalThis.kv = ctx.context.env.zed_data;
  return handlers.action(ctx);
};
