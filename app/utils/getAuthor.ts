type User = {
  fullName?: string | null;
  primaryEmailAddress?: {
    emailAddress: string;
  } | null;
};

export function getAuthor(user?: User | null): string {
  if (user?.fullName) return user.fullName;
  if (user?.primaryEmailAddress?.emailAddress) return user.primaryEmailAddress.emailAddress;
  return 'Anonymous';
}
