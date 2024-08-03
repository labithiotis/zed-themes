import { createCookieSessionStorage } from '@remix-run/cloudflare';
import type { Language } from '~/providers/language';

const store = createCookieSessionStorage({
  cookie: {
    secure: true,
    httpOnly: true,
    name: 'language',
    secrets: ['language-secret-key'],
    sameSite: 'lax',
    path: '/',
  },
});

export async function languageSession(request: Request) {
  const session = await store.getSession(request.headers.get('Cookie'));

  return {
    setLanguage: (language: Language) => session.set('language', language),
    getLanguage: () => session.get('language') as Language | undefined,
    commit: () => store.commitSession(session),
  };
}
