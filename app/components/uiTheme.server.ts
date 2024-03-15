import { createCookieSessionStorage } from '@remix-run/cloudflare';
import { UiTheme } from './UiThemeToggle.tsx';

const store = createCookieSessionStorage({
  cookie: {
    secure: true,
    httpOnly: true,
    name: 'ui-theme',
    secrets: ['ui-theme-secret-key'],
    sameSite: 'lax',
    path: '/',
  },
});

export async function uiThemeSession(request: Request) {
  const session = await store.getSession(request.headers.get('Cookie'));
  return {
    setUiTheme: (theme: UiTheme) => session.set('theme', theme),
    getUiTheme: () => session.get('theme') as UiTheme | undefined,
    commit: () => store.commitSession(session),
  };
}
