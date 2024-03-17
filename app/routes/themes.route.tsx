import { Outlet, useRouteError } from '@remix-run/react';

export default function Themes() {
  console.log('aaa');
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Themes Error</h1>
      <p>{error instanceof Error ? error?.message : 'Something went wrong'}</p>
      <pre>{error instanceof Error ? error?.stack : ''}</pre>
    </div>
  );
}
