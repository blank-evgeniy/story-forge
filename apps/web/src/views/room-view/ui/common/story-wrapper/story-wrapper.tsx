import { useAutoScroll } from "@siberiacancode/reactuse";
import { BookOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";
import { ScrollArea } from "@/shared/ui/scroll-area";

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

  const autoScrollRef = useAutoScroll<HTMLDivElement>();

  return (
    <ScrollArea
      viewportRef={autoScrollRef}
      className={cn("glass-strong h-full w-full rounded-xl border", className)}
    >
      <div className="px-5 py-4">
        <div className="text-surface-2 mb-3 flex items-center gap-2">
          <BookOpenIcon className="size-4" />
          <span className="text-small font-medium tracking-wide uppercase">
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
