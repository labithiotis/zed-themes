import { getAuth } from '@clerk/remix/ssr.server';
import type { LoaderFunction } from '@remix-run/cloudflare';
import type { ActionFunction } from '@remix-run/cloudflare';
import { type FileRouter, createRouteHandler, createUploadthing } from 'uploadthing/remix';
import { UTApi, UploadThingError } from 'uploadthing/server';
import { z } from 'zod';
import { getUserPrefs, setUserPrefs } from '~/utils/userPrefs.server';

const f = createUploadthing();
const utApi = new UTApi({ logLevel: 'Error' });

const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', minFileCount: 1, maxFileCount: 1 } })
    .input(z.strictObject({ imageKey: z.enum(['bgPreviewImageDark', 'bgPreviewImageLight']) }))
    .middleware(async ({ event, input }) => {
      const user = await getAuth(event);
      if (!user) throw new UploadThingError('Unauthorized');
      return { userId: user.userId, imageKey: input.imageKey };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const prefs = await getUserPrefs(metadata.userId, globalThis.kv);
      const previousImage = prefs?.[metadata.imageKey];
      previousImage && (await utApi.deleteFiles([previousImage.key]));
      return setUserPrefs(metadata.userId, globalThis.kv, { [metadata.imageKey]: file });
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

const handler = createRouteHandler({ router: uploadRouter, config: { logLevel: 'Error' } });

// FIXME: Remove below when `event` is added to onUploadComplete and token works from ctx.env
declare global {
  var kv: KVNamespace;
}
export const loader = handler.loader;
export const action: ActionFunction = async (args) => {
  globalThis.kv = args.context.env.zed_data;
  return handler.action(args);
};
