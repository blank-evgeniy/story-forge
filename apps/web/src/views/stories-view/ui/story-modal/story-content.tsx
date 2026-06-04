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
    <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-auto pr-1">
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.twist && (
            <div className="my-2 flex flex-col items-center gap-2 px-4">
              <div className="flex w-full items-center gap-3">
                <Separator className="flex-1" />
                <ZapIcon className="text-primary size-3.5" />
                <Separator className="flex-1" />
              </div>
              <p className="text-foreground/80 text-center text-sm leading-relaxed font-medium italic">
                {item.twist}
              </p>
              <div className="flex w-full items-center gap-3">
                <Separator className="flex-1" />
                <ZapIcon className="text-primary size-3.5" />
                <Separator className="flex-1" />
              </div>
            </div>
          )}
          <div
            className={cn("flex w-full flex-col items-start gap-0.5", {
              "items-end": SIDES[i % 2] === "right",
            })}
          >
            <span className="text-muted-foreground px-1 text-xs">
              {item.playerName}
            </span>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl border border-amber-500/50 bg-amber-500/10 px-4 py-2.5",
                {
                  "ml-auto rounded-br-sm": SIDES[i % 2] === "right",
                  "mr-auto rounded-bl-sm": SIDES[i % 2] === "left",
                },
              )}
            >
              <p className="text-foreground/90 text-sm leading-relaxed break-words">
                {item.entry}
              </p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
