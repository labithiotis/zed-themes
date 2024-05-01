import { ActionFunction, json } from '@remix-run/cloudflare';
import { uiThemeSession } from '~/components/uiTheme.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await uiThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const uiTheme = form.get('uiTheme');
  if (uiTheme === 'dark' || uiTheme === 'light') {
    session.setUiTheme(uiTheme);
    return json({ uiTheme }, { headers: { 'Set-Cookie': await session.commit() } });
  }
  return null;
};

export default null;
