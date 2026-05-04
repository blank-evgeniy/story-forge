import { Button } from "@/components/ui/button";
import type { TwistsSet } from "../../model/types";

interface WritingScreenTwistPickerProps {
  twists: TwistsSet;
  onPick: (twistId: string) => void;
  pickedTwistId: string | null;
}

export function WritingScreenTwistPicker({
  twists,
  onPick,
  pickedTwistId,
}: WritingScreenTwistPickerProps) {
  if (twists.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {twists.map((twist) => (
        <Button
          size={"sm"}
          key={twist.id}
          onClick={() => onPick(twist.id)}
          variant={twist.id === pickedTwistId ? "default" : "outline"}
        >
          {twist.content}
        </Button>
      ))}
    </div>
  );
}
