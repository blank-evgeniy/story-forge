import { useAutoScroll } from "@siberiacancode/reactuse";
import { BookOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib/utils";

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
    <div
      ref={autoScrollRef}
      className={cn(
        "glass-strong h-full w-full scrollbar-none overflow-y-auto scroll-smooth rounded-xl border",
        className,
      )}
    >
      <div className="flex min-h-full flex-col px-5 py-4">
        <div className="text-surface-2 mb-3 flex items-center gap-2">
          <BookOpenIcon className="size-4" />
          <span className="text-small font-medium tracking-wide uppercase">
            {storyOwner
              ? `${t("common.story")} (${storyOwner})`
              : t("common.story")}
          </span>
        </div>
        <div
          className={cn("flex flex-1 flex-col", {
            "gap-3": gap === "sm",
            "gap-4": gap === "md",
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
