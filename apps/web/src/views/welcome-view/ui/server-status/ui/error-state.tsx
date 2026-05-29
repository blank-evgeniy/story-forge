import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  onRetry?: () => void;
};

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-destructive">
      <span>Произошла ошибка во время проверки состояния сервера</span>
      <Button onClick={onRetry} size={"xs"}>
        Проверить снова
      </Button>
    </div>
  );
}
