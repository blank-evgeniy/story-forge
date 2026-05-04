export function TwistMessage({ message }: { message: string }) {
  return (
    <p className="text-sm font-medium leading-relaxed text-primary/90 text-center">
      {message}
    </p>
  );
}
