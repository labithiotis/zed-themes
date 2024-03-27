import { ActionFunction, json } from '@remix-run/cloudflare';
import { uiThemeSession } from '~/components/uiTheme.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await uiThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (theme === 'dark' || theme === 'light') {
    session.setUiTheme(theme);
    return json({ uiTheme: theme }, { headers: { 'Set-Cookie': await session.commit() } });
  }
};
