import { LoginView } from "@/views/login-view";
import { WelcomeView } from "@/views/welcome-view";
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

const rootRoute = createRootRoute({
  component: () => createElement(AppLayout, null, createElement(Outlet, null)),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginView,
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
  beforeLoad: () => {
    const user = useUserStore.getState().user;
    if (!user) {
      throw redirect({ to: "/login" });
    }
  },
});

const indexRoute = createRoute({
  getParentRoute: () => guardedRoute,
  path: "/",
  component: WelcomeView,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  guardedRoute.addChildren([indexRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
