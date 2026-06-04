import type React from "react";

import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";

export const RoomLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto flex h-dvh min-h-0 w-full max-w-3xl flex-col gap-6 overflow-hidden px-4 py-4 lg:gap-10 lg:py-10">
    <header className="relative flex items-center justify-center">
      <Button
        render={<Link to={"/"} />}
        size={"sm"}
        variant={"outline"}
        className={"header-delayed-appear absolute left-0"}

      >
        <ChevronLeftIcon /> <span className="hidden sm:block">Назад</span>
      </Button>

      <AppLogo />

      <span />
    </header>
    <main className="flex min-h-0 flex-1 flex-col" style={{ viewTransitionName: "page-content" }}>{children}</main>
  </div>
);
