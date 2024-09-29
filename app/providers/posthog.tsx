import { useUser } from '@clerk/remix';
import * as Sentry from '@sentry/remix';
import posthog from 'posthog-js';
import { PostHog } from 'posthog-node';
import { useEffect } from 'react';

export const postHogClient = new PostHog(import.meta.env.VITE_POSTHOG_API_KEY, { host: 'https://eu.i.posthog.com' });

export const usePosthog = () => {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
      api_host: 'https://eu.i.posthog.com',
      person_profiles: 'identified_only',
      autocapture: true,
    });
  }, []);

  return null;
};

export const usePosthogIdentify = () => {
  const { user } = useUser();

  useEffect(() => {
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
