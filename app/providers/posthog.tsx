import { useUser } from '@clerk/remix';
import * as Sentry from '@sentry/remix';
import posthog from 'posthog-js';
import { PostHog } from 'posthog-node';
import { useEffect } from 'react';

const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;

export const postHogClient = apiKey ? new PostHog(apiKey, { host: 'https://eu.i.posthog.com' }) : null;

export const usePosthog = () => {
  useEffect(() => {
    if (!apiKey) return;
    posthog.init(apiKey, {
      api_host: 'https://eu.i.posthog.com', // https://ph.zed-themes.com is 401
      ui_host: 'https://eu.i.posthog.com',
      person_profiles: 'identified_only',
      autocapture: true,
    });
  }, []);

  return null;
};

export const usePosthogIdentify = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!apiKey) return;
    if (user) {
      posthog.identify(user.id, {
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        avatar: user.imageUrl,
      });
      Sentry.setUser({
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        username: user.username ?? undefined,
      });
    } else {
      posthog.reset();
      Sentry.setUser(null);
    }
  }, [user]);

  return null;
};
