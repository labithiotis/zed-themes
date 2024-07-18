import type { CookieSerializeOptions } from 'cookie';
import { serialize } from 'cookie';
import type { SessionContainerInterface } from 'supertokens-node/lib/build/recipe/session/types.d.ts';
import { routes } from '../constants.js';

export type CookieSettings = Omit<CookieSerializeOptions, 'encode'>;
export type Tokens = Pick<
  ReturnType<SessionContainerInterface['getAllSessionTokensDangerously']>,
  'accessToken' | 'refreshToken' | 'antiCsrfToken'
>;

export const authCookieNames = {
  access: 'sAccessToken',
  refresh: 'sRefreshToken',
  csrf: 'sAntiCsrf',
};

const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

const commonCookieSettings: CookieSettings = {
  httpOnly: true,
  secure: process.env.SUPERTOKENS_WEBSITE_DOMAIN?.startsWith('https') ?? false,
  sameSite: 'strict',
  priority: 'high',
};

export function createCookieSettings(type: keyof typeof authCookieNames = 'access'): CookieSettings {
  const nextYear = new Date(new Date().getTime() + oneYearInMilliseconds);

  return {
    expires: nextYear,
    path: type === 'refresh' ? routes.refreshSession : '/',
    ...commonCookieSettings,
  };
}

export const deleteCookieSettings: CookieSettings = {
  expires: new Date(0),
  path: '/',
};

export const deleteRefreshSettings: CookieSettings = {
  ...deleteCookieSettings,
  path: routes.refreshSession,
};

export function createHeadersFromTokens(tokens: Partial<Tokens>): Headers {
  const headers = new Headers();
  const headerName = 'Set-Cookie';
  const { accessToken, refreshToken, antiCsrfToken } = tokens;

  if (!accessToken) headers.append(headerName, serialize(authCookieNames.access, '', deleteCookieSettings));
  else headers.append(headerName, serialize(authCookieNames.access, accessToken, createCookieSettings()));

  if (!refreshToken) headers.append(headerName, serialize(authCookieNames.refresh, '', deleteRefreshSettings));
  else headers.append(headerName, serialize(authCookieNames.refresh, refreshToken, createCookieSettings('refresh')));

  if (!antiCsrfToken) headers.append(headerName, serialize(authCookieNames.csrf, '', deleteCookieSettings));
  else headers.append(headerName, serialize(authCookieNames.csrf, antiCsrfToken, createCookieSettings()));

  return headers;
}
