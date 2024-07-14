import { redirect, useRouteError } from "@remix-run/react";

export function loader() {
  return redirect("/themes");
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div>
      <h1>Whoops</h1>
      <p>{error instanceof Error ? error?.message : "Something went wrong"}</p>
      <pre>{error instanceof Error ? error?.stack : ""}</pre>
    </div>
  );
}
