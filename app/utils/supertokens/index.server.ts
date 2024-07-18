import { type LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { parse } from 'cookie';
import SuperTokens from 'supertokens-node';
import EmailPassword from 'supertokens-node/recipe/emailpassword/index.js';
import Session from 'supertokens-node/recipe/session/index.js';
import { routes } from '~/utils/constants';
import type { Tokens } from '~/utils/supertokens/cookieHelpers.server';
import { authCookieNames } from '~/utils/supertokens/cookieHelpers.server';

SuperTokens.init({
  framework: 'express',
  supertokens: {
    connectionURI: 'https://st-dev-f1309a10-439f-11ef-bd38-b7d635a2dd3c.aws.supertokens.io',
    apiKey: 'nxbHLjjor3Vb1k163R0KsgMkC0',
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'Zed',
    apiDomain: 'http://localhost:3000',
    websiteDomain: 'https://zed-themes.com',
    apiBasePath: '/api/auth',
    websiteBasePath: '/auth',
  },
  recipeList: [
    EmailPassword.init(), // Initializes signin / signup features
    Session.init(), // Initializes session features
  ],
});

type AuthDetails = { tokens: Tokens };

type SignInResult =
  | ({ status: 'WRONG_CREDENTIALS_ERROR' } & {
      [K in keyof AuthDetails]?: undefined;
    })
  | ({ status: 'OK' } & AuthDetails);

type SignUpResult =
  | ({ status: 'EMAIL_ALREADY_EXISTS_ERROR' } & {
      [K in keyof AuthDetails]?: undefined;
    })
  | ({ status: 'OK' } & AuthDetails);

type TokensForLogout = Pick<Tokens, 'accessToken' | 'antiCsrfToken'>;
type TokensForRefresh = { refreshToken: string; antiCsrfToken?: string };
type ResetPasswordStatus = Awaited<ReturnType<(typeof EmailPassword)['resetPasswordUsingToken']>>['status'];
const recipeId = 'emailpassword';
const tenantId = 'public'; // Default tenantId for `SuperTokens`

const SuperTokensHelpers = {
  async signin(email: string, password: string): Promise<SignInResult> {
    const signinResult = await EmailPassword.signIn(tenantId, email, password);
    if (signinResult.status === 'WRONG_CREDENTIALS_ERROR') return { status: signinResult.status };

    const { status, user } = signinResult;
    const recipeUserId = SuperTokens.convertToRecipeUserId(user.id);
    const session = await Session.createNewSessionWithoutRequestResponse(tenantId, recipeUserId);
    return { status, tokens: session.getAllSessionTokensDangerously() };
  },

  async signup(email: string, password: string): Promise<SignUpResult> {
    const signupResult = await EmailPassword.signUp(tenantId, email, password);
    if (signupResult.status === 'EMAIL_ALREADY_EXISTS_ERROR') return { status: signupResult.status };

    const { status, user } = signupResult;
    const recipeUserId = SuperTokens.convertToRecipeUserId(user.id);
    const session = await Session.createNewSessionWithoutRequestResponse(tenantId, recipeUserId);
    return { status, tokens: session.getAllSessionTokensDangerously() };
  },

  async emailExists(email: string): Promise<boolean> {
    return SuperTokens.listUsersByAccountInfo(tenantId, { email }).then((users) => Boolean(users.length));
  },

  async logout({ accessToken, antiCsrfToken }: TokensForLogout): Promise<void> {
    const session = await Session.getSessionWithoutRequestResponse(accessToken, antiCsrfToken);
    return session.revokeSession();
  },

  async refreshToken({ refreshToken, antiCsrfToken }: TokensForRefresh): Promise<Partial<Tokens>> {
    try {
      const session = await Session.refreshSessionWithoutRequestResponse(refreshToken, undefined, antiCsrfToken);
      return session.getAllSessionTokensDangerously();
    } catch (error) {
      if (!Session.Error.isErrorFromSuperTokens(error)) throw error;
      if (error.payload.sessionHandle) Session.revokeSession(error.payload.sessionHandle);
      return {};
    }
  },

  // NOTE: Fails silently for unknown emails intentionally
  async sendPasswordResetEmail(email: string): Promise<void> {
    // NOTE: Assumes that an email is associated with only 1 user/account
    const [user] = await SuperTokens.listUsersByAccountInfo(tenantId, {
      email,
    });
    if (!user) return console.log(`Password reset email not sent to unrecognized address: ${email}`);

    const tokenResult = await EmailPassword.createResetPasswordToken(tenantId, user.id, email);
    if (tokenResult.status === 'UNKNOWN_USER_ID_ERROR') {
      return console.log(`Password reset email not sent, unknown user id: ${user.id}`);
    }

    const passwordResetPath = routes.resetPassword;
    const passwordResetLink = `${process.env.DOMAIN}${passwordResetPath}?token=${tokenResult.token}&rid=${recipeId}`;
    return EmailPassword.sendEmail({
      type: 'PASSWORD_RESET',
      tenantId,
      user: {
        id: user.id,
        recipeUserId: SuperTokens.convertToRecipeUserId(user.id),
        email,
      },
      passwordResetLink,
    });
  },

  async resetPassword(token: string, newPassword: string): Promise<ResetPasswordStatus> {
    const { status } = await EmailPassword.resetPasswordUsingToken(tenantId, token, newPassword);
    return status;
  },
};

type Args = Pick<LoaderFunctionArgs, 'request' | 'response'>;
export const getUserId = async ({ request, response }: Args): Promise<string | undefined> => {
  try {
    const cookies = parse(request.headers.get('cookie') ?? '');
    const accessToken = cookies[authCookieNames.access] ?? '';
    const antiCsrfToken = cookies[authCookieNames.csrf];
    const session = await Session.getSessionWithoutRequestResponse(accessToken, antiCsrfToken);

    return session.getUserId();
  } catch (error) {
    if (!Session.Error.isErrorFromSuperTokens(error)) {
      throw error;
    }

    // URL Details
    const url = new URL(request.url);

    const refreshSession = error.type === Session.Error.TRY_REFRESH_TOKEN;

    const basePath = refreshSession ? routes.refreshSession : routes.login;
    const returnUrl = encodeURI(`${url.pathname}${url.search}`);
    const redirectUrl = `${basePath}?returnUrl=${returnUrl}`;

    // Delete the user's tokens if they don't need to attempt a token refresh.
    if (refreshSession) {
      redirect(redirectUrl, { status: 307 });
    } else {
      // TODO Clear the user's cookies
      // response?.setHeader('Set-Cookie', [
      //   serialize(authCookieNames.access, '', deleteCookieSettings),
      //   serialize(authCookieNames.refresh, '', deleteRefreshSettings),
      //   serialize(authCookieNames.csrf, '', deleteCookieSettings),
      // ]);
    }
  }
};

export const isAuthenticated = async (args: Args): Promise<boolean> => {
  return Boolean(await getUserId(args));
};

export default SuperTokensHelpers;
