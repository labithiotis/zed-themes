import { getPlatformProxy } from 'wrangler';

Object.assign(globalThis, await getPlatformProxy());
