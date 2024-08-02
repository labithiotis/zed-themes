import { SignIn } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { type LoaderFunction, redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (userId) {
    return redirect('/');
  }
  return null;
};

export default function Login() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
