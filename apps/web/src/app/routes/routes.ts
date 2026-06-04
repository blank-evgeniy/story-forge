import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { createElement } from "react";
import { z } from "zod";

import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user";
import { NotFoundView } from "@/views/not-found-view";

import { AppLayout } from "../layout";

const rootRoute = createRootRoute({
  component: () => createElement(Outlet, null),
  notFoundComponent: () => createElement(NotFoundView, null),
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => createElement(AppLayout, null, createElement(Outlet, null)),
});

const loginRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/login",
  component: lazyRouteComponent(
    () => import("@/views/login-view"),
    "LoginViewConnector",
  ),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: (search.redirect as string) ?? undefined,
  }),
  beforeLoad: () => {
    const user = useUserStore.getState().user;
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

const guardedRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  id: "guarded",
  beforeLoad: ({ location }) => {
    const user = useUserStore.getState().user;
    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
});

export const indexRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("@/views/welcome-view"),
    "WelcomeViewConnector",
  ),
  validateSearch: z.object({
    tab: z.enum(["create", "join"]).optional(),
  }),
});

const guardedBareRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "guarded-bare",
  beforeLoad: ({ location }) => {
    const user = useUserStore.getState().user;
    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
});

export const gameRoute = createRoute({
  getParentRoute: () => guardedBareRoute,
  path: "room/$roomCode",
  component: lazyRouteComponent(
    () => import("@/views/room-view"),
    "RoomViewConnector",
  ),
});

export const storiesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "stories",
  component: lazyRouteComponent(
    () => import("@/views/stories-view"),
    "StoriesViewConnector",
  ),
  validateSearch: z.object({
    storyId: z.preprocess((value) => {
      const num = Number(value);

      return value == null || value === "" || Number.isNaN(num)
        ? undefined
        : num;
    }, z.number().optional()),
  }),
});

export const profileRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "profile",
  component: lazyRouteComponent(
    () => import("@/views/profile-edit-view"),
    "ProfileEditViewConnector",
  ),
});

const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    loginRoute,
    storiesRoute,
    guardedRoute.addChildren([indexRoute, profileRoute]),
  ]),
  guardedBareRoute.addChildren([gameRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: () =>
    createElement(
      "div",
      { className: "flex flex-1 items-center justify-center" },
      createElement(Spinner, { className: "size-8" }),
    ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
