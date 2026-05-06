import { Fragment } from "react/jsx-runtime";

import type { PrevSentence } from "../../../model/types";
import { PlayerMessage } from "../../common/player-message";
import { TwistMessage } from "../../common/twist-message";
import { StoryWrapper } from "../../common/story-wrapper";

type WritingScreenStoryProps = {
  story: PrevSentence[] | null;
};

export function WritingScreenStory({ story }: WritingScreenStoryProps) {
  if (!story) return null;

  return (
    <StoryWrapper gap="md">
      {story.map((item, index) => (
        <Fragment key={index}>
          {item.twist && <TwistMessage message={item.twist} />}
          <PlayerMessage
            message={item.sentence}
            side={index % 2 === 0 ? "left" : "right"}
          />
        </Fragment>
      ))}
    </StoryWrapper>
  );
}
