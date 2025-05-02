import type { useUser } from '@clerk/remix';

type User = ReturnType<typeof useUser>['user'];

export function getAuthor(user: User): string {
  const username = user?.username;
  const fullname = user?.fullName || `${user?.firstName} ${user?.lastName}`.trim();
  return username || fullname || 'Zed themes user';
}
