import { BookOpenIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StoryWrapperProps = {
  storyOwner?: string;
  children: React.ReactNode;
  gap?: "sm" | "md";
};

export function StoryWrapper({
  storyOwner,
  children,
  gap = "sm",
}: StoryWrapperProps) {
  return (
    <div className="w-full rounded-xl border border-border bg-muted/30 px-5 py-4">
      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
        <BookOpenIcon className="size-4" />
        <span className="text-xs font-medium uppercase tracking-wide">
          {storyOwner ? `История (${storyOwner})` : "История"}
        </span>
      </div>
      <div
        className={cn("flex flex-col", {
          "gap-2": gap === "sm",
          "gap-4": gap === "md",
        })}
      >
        {children}
      </div>
    </div>
  );
}
