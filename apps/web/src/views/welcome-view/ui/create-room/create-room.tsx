import { type ReactNode, useState } from "react";

import type { AiMood, RoomSettings } from "@/entities/room";

import { AiCommentSettings } from "./ui/ai-comment-settings";
import { BlindModeSwitch } from "./ui/blind-mode-switch";
import { CreateRoomAction } from "./ui/create-room-action";
import { CreateRoomLayout } from "./ui/create-room-layout";
import { RoundTimeToggle } from "./ui/round-time-toggle";
import { TwistsSwitch } from "./ui/twists-switch";

type CreateRoomProps = {
  onCreate: (data: RoomSettings) => void;
  isLoading: boolean;
  serverStatusSlot?: ReactNode;
};

export function CreateRoom({
  onCreate,
  isLoading,
  serverStatusSlot,
}: CreateRoomProps) {
  const [roundTime, setRoundTime] = useState<number>(60);
  const [enableBlind, setEnableBlind] = useState(true);
  const [enableTwists, setEnableTwists] = useState(true);
  const [enableAiComment, setEnableAiComment] = useState(true);
  const [aiMood, setAiMood] = useState<AiMood>("critic");

  const handleRoundTimeChange = (value: string[]) => {
    if (value.length === 0) return;
    setRoundTime(Number(value[0]));
  };

  const handleSubmit = () => {
    onCreate({
      blindMode: enableBlind,
      roundTime,
      enableTwists,
      enableAiComment,
      aiMood,
    });
  };

  return (
    <CreateRoomLayout>
      <CreateRoomLayout.Content>
        <RoundTimeToggle
          value={roundTime.toString()}
          onValueChange={handleRoundTimeChange}
          disabled={isLoading}
        />

        <CreateRoomLayout.GameplaySection>
          <BlindModeSwitch
            checked={enableBlind}
            onCheckedChange={setEnableBlind}
            disabled={isLoading}
          />
          <TwistsSwitch
            checked={enableTwists}
            onCheckedChange={setEnableTwists}
            disabled={isLoading}
          />
        </CreateRoomLayout.GameplaySection>

        <AiCommentSettings
          enable={enableAiComment}
          onChangeEnable={setEnableAiComment}
          selectedMood={aiMood}
          onSelectedMood={setAiMood}
        />
      </CreateRoomLayout.Content>

      <CreateRoomLayout.Footer>
        {serverStatusSlot}
        <CreateRoomAction onClick={handleSubmit} isLoading={isLoading} />
      </CreateRoomLayout.Footer>
    </CreateRoomLayout>
  );
}
