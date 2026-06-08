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

import { Spinner } from "@/shared/ui/spinner";
import { useUserStore } from "@/store/user";
import { NotFoundView } from "@/views/not-found-view";

import { AppLayout } from "../layout";
import { requireAuth } from "./require-auth";

const rootRoute = createRootRoute({
  component: () => createElement(Outlet, null),
  notFoundComponent: () => createElement(NotFoundView, null),
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => createElement(AppLayout, null, createElement(Outlet, null)),
});

const guardedRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  id: "guarded",
  beforeLoad: ({ location }) => requireAuth(location),
});

const guardedBareRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "guarded-bare",
  beforeLoad: ({ location }) => requireAuth(location),
});

const loginRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/login",
  component: lazyRouteComponent(
    () => import("@/views/_profile/login-view"),
    "LoginViewConnector",
  ),
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: () => {
    const user = useUserStore.getState().user;
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

export const welcomeRoute = createRoute({
  getParentRoute: () => guardedRoute,
  id: "welcome",
  component: lazyRouteComponent(
    () => import("@/views/welcome-view"),
    "WelcomeViewConnector",
  ),
  validateSearch: z.object({
    tab: z.enum(["create", "join"]).optional(),
  }),
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
    () => import("@/views/_profile/profile-edit-view"),
    "ProfileEditViewConnector",
  ),
});

const routeTree = rootRoute.addChildren([
  appLayoutRoute.addChildren([
    loginRoute,
    storiesRoute,
    guardedRoute.addChildren([welcomeRoute, profileRoute]),
  ]),
  guardedBareRoute.addChildren([gameRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultViewTransition: true,
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
