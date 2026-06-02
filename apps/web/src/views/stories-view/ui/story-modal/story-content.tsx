import { ZapIcon } from "lucide-react";
import { Fragment } from "react";

import type { StoryContentItemDTO } from "@/api/requests/types";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SIDES = ["left", "right"] as const;

type StoryContentProps = {
  items: StoryContentItemDTO[];
};

export function StoryContent({ items }: StoryContentProps) {
  return (
    <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-1">
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.twist && (
            <div className="flex flex-col items-center gap-2 px-4 my-2">
              <div className="flex w-full items-center gap-3">
                <Separator className="flex-1" />
                <ZapIcon className="size-3.5 text-primary" />
                <Separator className="flex-1" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground/80 text-center italic">
                {item.twist}
              </p>
              <div className="flex w-full items-center gap-3">
                <Separator className="flex-1" />
                <ZapIcon className="size-3.5 text-primary" />
                <Separator className="flex-1" />
              </div>
            </div>
          )}
          <div
            className={cn("flex flex-col items-start gap-0.5 w-full", {
              "items-end": SIDES[i % 2] === "right",
            })}
          >
            <span className="text-xs text-muted-foreground px-1">
              {item.playerName}
            </span>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl border px-4 py-2.5 border-amber-500/50 bg-amber-500/10",
                {
                  "ml-auto rounded-br-sm": SIDES[i % 2] === "right",
                  "mr-auto rounded-bl-sm": SIDES[i % 2] === "left",
                },
              )}
            >
              <p className="text-sm leading-relaxed text-foreground/90 break-words">
                {item.entry}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
