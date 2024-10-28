import { getAuth } from '@clerk/remix/ssr.server';

import { type FileRouter, createRouteHandler, createUploadthing } from 'uploadthing/remix';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ event }) => {
      // This code runs on your server before upload
      const user = await getAuth(event);
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError('Unauthorized');
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);

      console.log('file url', file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;

export const { action, loader } = createRouteHandler({
  router: uploadRouter,
  // config: {
  //   token: process.env.VITE_UPLOADTHING_TOKEN,
  // },
});
