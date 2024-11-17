import { useLoaderData } from "@remix-run/react";
import useXataClient from "~/server-hooks/useXataClient";

export function headers({
  loaderHeaders,
  parentHeaders,
}: {
  loaderHeaders: Headers;
  parentHeaders: Headers;
}) {
  console.log(
    "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
  );
  return {
    // This is an example of how to set caching headers for a route
    // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
    "Cache-Control": "public, max-age=60, s-maxage=60",
  };
}

export const loader = async () => {
  const projects = await useXataClient().db.Projects.getPaginated();
  return { projects };
};

export default function Index() {
  const { projects } = useLoaderData<typeof loader>();

  return (
    <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {projects.records.map((proj) => (
          <li>{proj.name}</li>
        ))}
      </ul>
    </main>
  );
}
