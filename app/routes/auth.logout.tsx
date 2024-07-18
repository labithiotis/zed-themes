import type { LoaderFunction } from '@remix-run/node';
import { parse } from 'cookie';
import { routes } from '~/utils/constants';
import { authCookieNames, createHeadersFromTokens } from '~/utils/supertokens/cookieHelpers.server';
import SuperTokensHelpers from '~/utils/supertokens/index.server';

export const loader: LoaderFunction = async ({ request }) => {
  const cookies = parse(request.headers.get('cookie') ?? '');
  const accessToken = cookies[authCookieNames.access] ?? '';
  const antiCsrfToken = cookies[authCookieNames.csrf];
  await SuperTokensHelpers.logout({ accessToken, antiCsrfToken });

  const headers = createHeadersFromTokens({});
  headers.set('Location', routes.login);
  return new Response(null, { status: 303, statusText: 'OK', headers });
};
