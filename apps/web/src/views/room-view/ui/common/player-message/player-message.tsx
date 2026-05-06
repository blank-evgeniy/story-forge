import { cn } from "@/lib/utils";

type PlayerMessageProps = {
  message: string;
  side?: "left" | "right";
  color?:
    | "amber"
    | "blue"
    | "green"
    | "red"
    | "lime"
    | "sky"
    | "indigo"
    | "violet"
    | "purple"
    | "pink";
};

export function PlayerMessage({
  message,
  side = "left",
  color = "amber",
}: PlayerMessageProps) {
  return (
    <div
      className={cn("max-w-[85%] rounded-2xl border px-4 py-2.5 min-w-0", {
        "ml-auto rounded-br-sm": side === "right",
        "mr-auto rounded-bl-sm": side === "left",
        "border-amber-500/50 bg-amber-500/10": color === "amber",
        "border-blue-500/50 bg-blue-500/10": color === "blue",
        "border-green-500/50 bg-green-500/10": color === "green",
        "border-red-500/50 bg-red-500/10": color === "red",
        "border-lime-500/50 bg-lime-500/10": color === "lime",
        "border-sky-500/50 bg-sky-500/10": color === "sky",
        "border-indigo-500/50 bg-indigo-500/10": color === "indigo",
        "border-violet-500/50 bg-violet-500/10": color === "violet",
        "border-purple-500/50 bg-purple-500/10": color === "purple",
        "border-pink-500/50 bg-pink-500/10": color === "pink",
      })}
    >
      <p className="text-sm leading-relaxed text-foreground/90 wrap-break-word">
        {message}
      </p>
    </div>
  );
}
