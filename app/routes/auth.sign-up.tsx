import { SignUp } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { dark } from '@clerk/themes';
import { type LoaderFunction, redirect } from '@remix-run/cloudflare';
import { useColorScheme } from '~/providers/colorScheme';

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (userId) {
    return redirect('/');
  }
  return null;
};

export default function Signup() {
  const { colorScheme } = useColorScheme();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignUp appearance={{ baseTheme: colorScheme === 'dark' ? dark : undefined }} />
    </div>
  );
}
