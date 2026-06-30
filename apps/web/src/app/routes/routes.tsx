import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { z } from "zod";

import { usePlayerStore } from "@/entities/player";
import { AnimatedOutlet } from "@/shared/lib/router";
import { Spinner } from "@/shared/ui/spinner";
import { ErrorView } from "@/views/error-view";
import { NotFoundView } from "@/views/not-found-view";

import { AppLayout } from "../layout";
import { requireAuth } from "./require-auth";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => (
    <AppLayout>
      <AnimatedOutlet />
    </AppLayout>
  ),
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
    () => import("@/views/login-view"),
    "LoginViewConnector",
  ),
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: () => {
    const user = usePlayerStore.getState().player;
    if (user) {
      throw redirect({ to: "/" });
    }
  },
});

export const welcomeRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("@/views/welcome-view"),
    "WelcomeViewConnector",
  ),
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
    guardedRoute.addChildren([welcomeRoute, profileRoute]),
  ]),
  guardedBareRoute.addChildren([gameRoute]),
]);

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <AppLayout>
      <NotFoundView />
    </AppLayout>
  ),
  defaultErrorComponent: ({ reset }) => <ErrorView reset={reset} />,
  defaultPendingComponent: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
