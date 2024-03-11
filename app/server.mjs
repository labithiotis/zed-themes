import { createRequestHandler } from '@remix-run/server-runtime';
import * as remixBuild from '../build/server/index.js';

// wrangler will bundle this file "app/server.mjs" with prebuilt remix build "build/server/index.js"

const remixHandler = createRequestHandler(remixBuild, process.env.NODE_ENV);

export default {
  fetch(request, env, _ctx) {
    // TODO: should be isolated per request? (e.g. via AsyncLocalStorage)
    Object.assign(_ctx, { env });
    return remixHandler(request, _ctx);
  },
};
