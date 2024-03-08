import { createCookieSessionStorage } from '@remix-run/node';
import { UITheme } from './UIThemeToggle.tsx';

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

export async function themeSession(request: Request) {
  const session = await store.getSession(request.headers.get('Cookie'));
  return {
    setTheme: (theme: UITheme) => session.set('theme', theme),
    getTheme: () => session.get('theme') as UITheme,
    commit: () => store.commitSession(session),
  };
}
