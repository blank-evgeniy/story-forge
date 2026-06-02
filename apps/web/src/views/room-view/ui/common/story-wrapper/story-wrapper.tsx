import { BookOpenIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea className="border-border bg-muted/30 h-full w-full overflow-y-auto rounded-xl border">
      <div className="px-5 py-4">
        <div className="text-muted-foreground mb-3 flex items-center gap-2">
          <BookOpenIcon className="size-4" />
          <span className="text-xs font-medium tracking-wide uppercase">
            {storyOwner ? `История (${storyOwner})` : "История"}
          </span>
        </div>
        <div
          className={cn("flex flex-col", {
            "gap-3": gap === "sm",
            "gap-4": gap === "md",
          })}
        >
          {children}
        </div>{" "}
      </div>
    </ScrollArea>
  );
}
