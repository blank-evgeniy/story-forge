import { useUserStore } from "@/store/user";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { LoginView } from "./ui/login-view";

export function LoginViewConnector() {
  const { login } = useUserStore();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: "/login" });

  const handleLogin = (username: string) => {
    login(username);

    if (redirect) {
      window.location.href = redirect;
    } else {
      navigate({ to: "/" });
    }
  };

  return <LoginView onLogin={handleLogin} />;
}
