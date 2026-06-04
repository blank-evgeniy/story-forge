export function CheckingState() {
  return (
    <div className="text-muted-foreground flex items-center gap-2 text-sm">
      <span>Проверка сервера...</span>
      <span className="animate-pulse">•</span>
    </div>
  );
}
