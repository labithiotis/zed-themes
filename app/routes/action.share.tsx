import { ActionFunction, json } from '@remix-run/cloudflare';
import { nanoid } from 'nanoid';
import invariant from 'tiny-invariant';

export const action: ActionFunction = async ({ context, request }) => {
  const form = new URLSearchParams(await request.text());
  const id = form.get('id');

  if (id === 'share-theme') {
    const theme = form.get('theme');
    invariant(theme, 'theme is required');

    const shareId = nanoid();
    // expires in 1 week as UNIX second timestamp
    const expiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).getTime() / 1000;
    await context.env?.shares?.put(shareId, theme, { expiration });
    const shareUrl = new URL(request.url);
    shareUrl.pathname = `/themes/${shareId}`;
    return json({ shareUrl });
  }

  return null;
};
