import { Fragment } from "react/jsx-runtime";

import type { PrevEntry } from "../../../../model/types";

import { PlayerMessage } from "../../../common/player-message";
import { StoryWrapper } from "../../../common/story-wrapper";
import { TwistMessage } from "../../../common/twist-message";

type WritingScreenStoryProps = {
  story: PrevEntry[] | null;
  className?: string;
};

export function WritingScreenStory({
  story,
  className,
}: WritingScreenStoryProps) {
  if (!story) return null;

  return (
    <StoryWrapper gap="md" className={className}>
      {story.map((item, index) => (
        <Fragment key={index}>
          {item.twist && <TwistMessage message={item.twist} />}
          <PlayerMessage
            message={item.entry}
            side={index % 2 === 0 ? "left" : "right"}
          />
        </Fragment>
      ))}
    </StoryWrapper>
  );
}
