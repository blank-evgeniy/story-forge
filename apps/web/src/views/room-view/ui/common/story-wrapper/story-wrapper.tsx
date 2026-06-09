import { BookOpenIcon } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";
import { ScrollArea, useStickToBottom } from "@/shared/ui/scroll-area";

type StoryWrapperProps = {
  storyOwner?: string;
  children: React.ReactNode;
  gap?: "sm" | "md";
  className?: string;
};

export function StoryWrapper({
  storyOwner,
  children,
  gap = "sm",
  className,
}: StoryWrapperProps) {
  const { t } = useTranslation();

  const viewportRef = useRef<HTMLDivElement>(null);
  useStickToBottom(viewportRef);

  return (
    <ScrollArea
      viewportRef={viewportRef}
      className={cn(
        "border-border bg-muted/30 h-full w-full rounded-xl border",
        className,
      )}
    >
      <div className="px-5 py-4">
        <div className="text-muted-foreground mb-3 flex items-center gap-2">
          <BookOpenIcon className="size-4" />
          <span className="text-xs font-medium tracking-wide uppercase">
            {storyOwner
              ? `${t("common.story")} (${storyOwner})`
              : t("common.story")}
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
