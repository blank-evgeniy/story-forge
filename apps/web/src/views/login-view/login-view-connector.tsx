import { useNavigate, useSearch } from "@tanstack/react-router";

import { useUserStore } from "@/store/user";

import { LoginView } from "./ui/login-view";

export function LoginViewConnector() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });

  const handleLogin = (username: string) => {
    login(username);

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
