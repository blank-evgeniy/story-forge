import { LoginView } from "@/views/login-view";
import { WelcomeViewConnector } from "@/views/welcome-view";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { AppLayout } from "@/app/layout";
import { useUserStore } from "@/store/user";
import { createElement } from "react";
import { RoomViewConnector } from "@/views/room-view";

const rootRoute = createRootRoute({
  component: () => createElement(AppLayout, null, createElement(Outlet, null)),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginView,
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
  component: WelcomeViewConnector,
});

export const gameRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "room/$roomCode",
  component: RoomViewConnector,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  guardedRoute.addChildren([indexRoute, gameRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
