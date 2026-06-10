import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import type { PlayerColor, PlayerIcon } from "@/entities/player";

import { usePlayerStore } from "@/entities/player";

import { ProfileEditView } from "./ui/profile-edit-view";

export function ProfileEditViewConnector() {
  const { t } = useTranslation();
  const user = usePlayerStore((s) => s.player);
  const updateProfile = usePlayerStore((s) => s.updateProfile);
  const logout = usePlayerStore((s) => s.logout);
  const navigate = useNavigate();

  if (!user) return null;

  const handleSave = (
    username: string,
    color: PlayerColor,
    icon: PlayerIcon,
  ) => {
    updateProfile(username, color, icon);
    toast.success(t("profile.toast.success"));
    navigate({ to: "/" });
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/login", search: { redirect: "/" } });
  };

  return (
    <ProfileEditView
      initialUsername={user.username}
      initialColor={user.color}
      initialIcon={user.icon}
      onSave={handleSave}
      onLogout={handleLogout}
    />
  );
}
