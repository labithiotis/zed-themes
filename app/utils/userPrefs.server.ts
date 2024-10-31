import type { UploadedFileData } from 'uploadthing/types';
import { merge } from './helpers';

export type UserPrefs = {
  bgPreviewImageDark?: UploadedFileData;
  bgPreviewImageLight?: UploadedFileData;
};

export async function setUserPrefs(userId: string | null, dataKv: KVNamespace, data: Partial<UserPrefs>) {
  const userPrefs = merge(await getUserPrefs(userId, dataKv), data);

  await dataKv.put(`user_prefs_${userId}`, JSON.stringify(userPrefs));

  return userPrefs;
}

export async function getUserPrefs(userId: string | null, dataKv: KVNamespace): Promise<UserPrefs | undefined> {
  const data = await dataKv.get(`user_prefs_${userId}`);
  return data ? JSON.parse(data) : undefined;
}
