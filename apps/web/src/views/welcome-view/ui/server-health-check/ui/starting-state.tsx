export function StartingState() {
  return (
    <div className="flex items-center gap-2 text-sm text-yellow-500">
      <span>Сервер запускается, пожалуйста, подождите...</span>
      <span className="animate-pulse">•</span>
    </div>
  );
}
