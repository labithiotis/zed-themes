import { UserProfile } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunction, redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect('/auth/sign-in');
  }
  return null;
};

export default function Profile() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-20">
      <UserProfile path="/profile" />
    </div>
  );
}
