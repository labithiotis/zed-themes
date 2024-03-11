import { getPlatformProxy } from 'wrangler';

// Object.assign(globalThis, await getPlatformProxy());
export const platformProxy = await getPlatformProxy();
