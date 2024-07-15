import { createCookieSessionStorage } from '@remix-run/cloudflare';
import type { ColorScheme } from '~/providers/colorScheme';

const store = createCookieSessionStorage({
  cookie: {
    secure: true,
    httpOnly: true,
    name: 'colorscheme',
    secrets: ['color-scheme-secret-key'],
    sameSite: 'lax',
    path: '/',
  },
});

export async function colorSchemeSession(request: Request) {
  const session = await store.getSession(request.headers.get('Cookie'));
  return {
    setColorScheme: (colorscheme: ColorScheme) => session.set('colorscheme', colorscheme),
    getColorScheme: () => session.get('colorscheme') as ColorScheme | undefined,
    commit: () => store.commitSession(session),
  };
}
