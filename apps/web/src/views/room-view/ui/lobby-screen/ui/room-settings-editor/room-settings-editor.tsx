import type { RoomSettings } from "../../../../model/types";

import { AiCommentSettings } from "./ai-comment-settings";
import { BlindModeSwitch } from "./blind-mode-switch";
import { RoundTimeSelect } from "./round-time-select";
import { TwistsSwitch } from "./twists-switch";

type RoomSettingsEditorProps = {
  value: RoomSettings;
  onChange: (value: RoomSettings) => void;
  disabledInputs?: boolean;
};

export function RoomSettingsEditor({
  value,
  onChange,
  disabledInputs = false,
}: RoomSettingsEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <RoundTimeSelect
        value={value.roundTime}
        onChange={(roundTime) => onChange({ ...value, roundTime })}
        disabled={disabledInputs}
      />
      <BlindModeSwitch
        value={value.blindMode}
        onChange={(blindMode) => onChange({ ...value, blindMode })}
        disabled={disabledInputs}
      />
      <TwistsSwitch
        value={value.enableTwists}
        onChange={(enableTwists) => onChange({ ...value, enableTwists })}
        disabled={disabledInputs}
      />
      <AiCommentSettings
        value={value.aiMood}
        onChange={(aiMood) => onChange({ ...value, aiMood })}
        disabled={disabledInputs}
      />
    </div>
  );
}
