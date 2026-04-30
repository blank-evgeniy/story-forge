import { useNavigate } from "@tanstack/react-router";
import { ModeToggle } from "@/components/theme";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useState } from "react";

export function HeaderMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();
  const logout = useUserStore((store) => store.logout);
  const user = useUserStore((store) => store.user);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login", search: { redirect: window.location.pathname } });
    setOpenMenu(false);
  };

  return (
    <Popover open={openMenu} onOpenChange={setOpenMenu}>
      <PopoverTrigger render={<Button size={"icon"} variant="outline" />}>
        <MenuIcon />
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>Настройки</PopoverTitle>

          <div className="flex justify-between items-center gap-2">
            <span className="font-medium">Тема приложения</span>
            <ModeToggle />
          </div>

          {user && (
            <Button variant={"destructive"} onClick={handleLogout}>
              Выйти
            </Button>
          )}
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
