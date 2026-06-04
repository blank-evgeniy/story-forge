import { redirect } from "@tanstack/react-router";

import { useUserStore } from "@/store/user";

export function requireAuth(location: { href: string }) {
  const user = useUserStore.getState().user;
  if (!user)
    throw redirect({ to: "/login", search: { redirect: location.href } });
}
