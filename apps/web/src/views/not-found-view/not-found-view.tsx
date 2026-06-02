import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function NotFoundView() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p className="text-muted-foreground/30 text-8xl font-bold">404</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Страница не найдена</h1>
        <p className="text-muted-foreground text-sm">
          Такой страницы не существует или она была удалена
        </p>
      </div>
      <Button render={<Link to="/" />}>На главную</Button>
    </div>
  );
}
