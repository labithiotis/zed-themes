import { ActionFunction, json } from '@remix-run/node';
import { themeSession } from '~/components/uiTheme.server.ts';

export const action: ActionFunction = async ({ request }) => {
  const session = await themeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (theme === 'dark' || theme === 'light') {
    session.setTheme(theme);
    return json({ success: true }, { headers: { 'Set-Cookie': await session.commit() } });
  }
};
