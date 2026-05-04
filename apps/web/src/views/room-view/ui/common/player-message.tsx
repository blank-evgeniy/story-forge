export function PlayerMessage({ message }: { message: string }) {
  return (
    <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5">
      <p className="text-sm leading-relaxed text-foreground/90">{message}</p>
    </div>
  );
}
