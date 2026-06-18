import { redirect } from "@tanstack/react-router";

import { usePlayerStore } from "@/entities/player";

export function requireAuth(location: { href: string }) {
  const user = usePlayerStore.getState().player;
  if (!user)
    throw redirect({ to: "/login", search: { redirect: location.href } });
}
