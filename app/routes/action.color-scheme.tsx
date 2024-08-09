import { type ActionFunction, json } from '@remix-run/cloudflare';
import { colorSchemeSession } from '~/utils/colorScheme.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await colorSchemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const colorScheme = form.get('colorScheme');

  if (colorScheme === 'dark' || colorScheme === 'light') {
    session.setColorScheme(colorScheme);
    return json({ colorScheme }, { headers: { 'Set-Cookie': await session.commit() } });
  }

  return colorScheme;
};
