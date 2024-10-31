import { getAuth } from '@clerk/remix/ssr.server';
import type { ActionFunction } from '@remix-run/cloudflare';
import { NotFoundResponse } from '~/utils/helpers';
import { getUserPrefs, userPrefsKey } from '~/utils/userPrefs.server';
import { utApi } from './api.upload-image';

export const action: ActionFunction = async (args) => {
  const zedData = args.context.env.zed_data;
  const user = await getAuth(args);
  if (!user || !user.userId) throw new Response('Unauthorized', { status: 401 });

  const prefs = await getUserPrefs(user.userId, zedData);
  prefs?.bgPreviewImageDark?.key && (await utApi.deleteFiles(prefs?.bgPreviewImageDark?.key));
  prefs?.bgPreviewImageLight?.key && (await utApi.deleteFiles(prefs?.bgPreviewImageLight?.key));

  await zedData.delete(userPrefsKey(user.userId));

  return null;
};

export const loader = () => {
  throw NotFoundResponse;
};
export default () => null;
