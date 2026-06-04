import { useNavigate, useSearch } from "@tanstack/react-router";

import type { PlayerColor, PlayerIcon } from "@/lib/player-customization";

import { useUserStore } from "@/store/user";

import { LoginView } from "./ui/login-view";

export function LoginViewConnector() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/app-layout/login" });

  const handleLogin = (
    username: string,
    color: PlayerColor,
    icon: PlayerIcon,
  ) => {
    login(username, color, icon);

    if (redirect) {
      window.location.href = redirect;
      try {
        const url = new URL(redirect, window.location.origin);
        if (url.origin === window.location.origin) {
          window.location.href = url.pathname + url.search + url.hash;
        } else {
          navigate({ to: "/" });
        }
      } catch {
        navigate({ to: "/" });
      }
    } else {
      navigate({ to: "/" });
    }
  };

  return <LoginView onLogin={handleLogin} />;
}
