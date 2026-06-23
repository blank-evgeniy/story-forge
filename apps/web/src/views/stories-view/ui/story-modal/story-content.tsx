import { Fragment } from "react";

import type { StoryContentItemDTO } from "@/shared/api/requests/types";

import { cn } from "@/shared/lib/utils";

const SIDES = ["left", "right"] as const;

type StoryContentProps = {
  items: StoryContentItemDTO[];
};

export function StoryContent({ items }: StoryContentProps) {
  return (
    <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-1">
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.twist && (
            <div className="my-2 flex flex-col items-center gap-2 px-4">
              <p className="text-surface/80 text-small text-center italic">
                {item.twist}
              </p>
            </div>
          )}
          <div
            className={cn("flex w-full flex-col items-start gap-0.5", {
              "items-end": SIDES[i % 2] === "right",
            })}
          >
            <span className="text-surface-muted text-caption px-1">
              {item.playerName}
            </span>
            <div
              className={cn(
                "border-brand-500/50 max-w-[85%] rounded-2xl border bg-amber-500/10 px-4 py-2.5",
                {
                  "ml-auto rounded-br-sm": SIDES[i % 2] === "right",
                  "mr-auto rounded-bl-sm": SIDES[i % 2] === "left",
                },
              )}
            >
              <p className="text-foreground/90 text-small leading-relaxed break-words">
                {item.entry}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
