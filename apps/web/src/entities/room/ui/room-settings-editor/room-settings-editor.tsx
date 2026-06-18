import { AiCommentSettings } from "./ai-comment-settings";
import { BlindModeSwitch } from "./blind-mode-switch";
import { RoundTimeSelect } from "./round-time-select";
import { TwistsSwitch } from "./twists-switch";

type RoomSettingsEditorProps = {
  disabledInputs?: boolean;
};

export function RoomSettingsEditor({
  disabledInputs = false,
}: RoomSettingsEditorProps) {
  return (
    <div className="flex flex-col gap-4">
      <RoundTimeSelect disabled={disabledInputs} />
      <BlindModeSwitch disabled={disabledInputs} />
      <TwistsSwitch disabled={disabledInputs} />
      <AiCommentSettings disabled={disabledInputs} />
    </div>
  );
}
