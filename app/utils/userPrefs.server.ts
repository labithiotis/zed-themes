import type { UploadedFileData } from 'uploadthing/types';
import { merge } from './helpers';

export type UserPrefs = {
  bgPreviewImageDark?: UploadedFileData;
  bgPreviewImageLight?: UploadedFileData;
};

export const userPrefsKey = (userId: string) => `user_prefs_${userId}`;

export async function setUserPrefs(userId: string | null, dataKv: KVNamespace, data: Partial<UserPrefs>) {
  if (!userId) return undefined;
  const userPrefs = merge(await getUserPrefs(userId, dataKv), data);

  await dataKv.put(userPrefsKey(userId), JSON.stringify(userPrefs));

  return userPrefs;
}

export async function getUserPrefs(userId: string | null, dataKv: KVNamespace): Promise<UserPrefs | undefined> {
  if (!userId) return undefined;
  const data = await dataKv.get(userPrefsKey(userId));
  return data ? JSON.parse(data) : undefined;
}
