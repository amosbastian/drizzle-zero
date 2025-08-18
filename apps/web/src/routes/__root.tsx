import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "~/router";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootDocument,
  head: () => ({
    meta: [
      {
        charSet: "utf8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title: "Reel",
      },
    ],
  }),
});

function RootDocument() {
  return <Outlet />;
}
