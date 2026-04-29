import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function LoginView() {
  const [username, setUsername] = useState("");
  const { login } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Введите никнейм");
      return;
    }

    login(username.trim());
    navigate({ to: "/" });
  };

  return (
    <div className="flex flex-1 justify-center lg:mt-[10vh] mt-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-muted-foreground">Story</span>
            <span className="text-primary">Forge</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Совместное создание историй в реальном времени
          </p>
        </div>

        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Добро пожаловать!</CardTitle>
            <CardDescription>Введите никнейм, чтобы начать</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Field>
                <FieldLabel>Никнейм</FieldLabel>
                <Input
                  value={username}
                  onChange={handleChange}
                  placeholder="Ваше имя..."
                  autoFocus
                  autoComplete="off"
                />
              </Field>
              <Button type="submit" className="w-full">
                Вперёд!
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
