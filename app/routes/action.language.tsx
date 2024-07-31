import { type ActionFunction, json } from '@remix-run/cloudflare';
import { type Language, languages } from '~/providers/language';
import { languageSession } from '~/utils/language.server';

export const action: ActionFunction = async ({ request }) => {
  const session = await languageSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const language = form.get('language');

  if (language != null && Object.keys(languages).includes(language)) {
    session.setLanguage(language as Language);
    return json({ language }, { headers: { 'Set-Cookie': await session.commit() } });
  }

  return language;
};
