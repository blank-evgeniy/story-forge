import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { createElement } from "react";

import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/store/user";

import { AppLayout } from "../layout";

const rootRoute = createRootRoute({
  component: () => createElement(AppLayout, null, createElement(Outlet, null)),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
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
  getParentRoute: () => rootRoute,
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

const indexRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("@/views/welcome-view"),
    "WelcomeViewConnector",
  ),
});

export const gameRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "room/$roomCode",
  component: lazyRouteComponent(
    () => import("@/views/room-view"),
    "RoomViewConnector",
  ),
});

export const storiesRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "stories",
  component: lazyRouteComponent(
    () => import("@/views/stories-view"),
    "StoriesViewConnector",
  ),
  validateSearch: (search: Record<string, unknown>) => {
    const storyId = Number(search.storyId);
    return { storyId: isNaN(storyId) || !search.storyId ? undefined : storyId };
  },
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
  loginRoute,
  guardedRoute.addChildren([indexRoute, gameRoute, storiesRoute, profileRoute]),
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
