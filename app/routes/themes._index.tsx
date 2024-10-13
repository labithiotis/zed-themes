import { type LoaderFunction, redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async () => {
  return redirect('/');
};

export default function Themes() {
  return null;
}
