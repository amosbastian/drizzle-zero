import type { Schema } from "@acme/zero";
import type { Mutators } from "@acme/zero/client";
import type { Zero } from "@rocicorp/zero";
import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { routeTree } from "./routeTree.gen";

export interface RouterContext {
  zero: Zero<Schema, Mutators>;
}

export const createRouter = () => {
  const router = createTanstackRouter({
    context: {
      zero: undefined as unknown as Zero<Schema, Mutators>,
    } satisfies RouterContext,
    defaultPreload: "viewport",
    defaultPreloadGcTime: 0,
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
  });

  // @ts-ignore
  return routerWithQueryClient(router, queryClient);
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
