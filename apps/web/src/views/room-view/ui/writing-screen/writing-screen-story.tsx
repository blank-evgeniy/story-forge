import { Fragment } from "react/jsx-runtime";

import { BookOpenIcon } from "lucide-react";
import type { PrevSentence } from "../../model/types";
import { PlayerMessage } from "../common/player-message";
import { TwistMessage } from "../common/twist-message";

type WritingScreenStoryProps = {
  story: PrevSentence[] | null;
};

export function WritingScreenStory({ story }: WritingScreenStoryProps) {
  if (!story) return null;

  return (
    <div className="w-full rounded-xl border border-border bg-muted/30 px-5 py-4">
      <div className="flex items-center gap-2 mb-3 text-muted-foreground">
        <BookOpenIcon className="size-4" />
        <span className="text-xs font-medium uppercase tracking-wide">
          История
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {story.map((item, index) => (
          <Fragment key={index}>
            {item.twist && <TwistMessage message={item.twist} />}
            <PlayerMessage message={item.sentence} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
