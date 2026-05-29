export function CheckingState() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Проверка сервера...</span>
      <span className="animate-pulse">•</span>
    </div>
  );
}
