import { CheckIcon } from "lucide-react";
import type { TwistsSet } from "../../../model/types";
import { cn } from "@/lib/utils";

interface WritingScreenTwistPickerProps {
  twists: TwistsSet;
  onPick: (twistId: string | null) => void;
  pickedTwistId: string | null;
  isSubmitted?: boolean;
}

export function WritingScreenTwistPicker({
  twists,
  onPick,
  pickedTwistId,
  isSubmitted,
}: WritingScreenTwistPickerProps) {
  const handlePick = (twistId: string) => {
    if (isSubmitted) return;
    onPick(pickedTwistId === twistId ? null : twistId);
  };

  if (twists.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium">
        Выберите твист для этого раунда (необязательно)
      </h3>

      <ul className="flex flex-col gap-2">
        {twists.map((twist) => (
          <li>
            <TwistPickerButton
              key={twist.id}
              isPicked={pickedTwistId === twist.id}
              onClick={() => handlePick(twist.id)}
              disabled={isSubmitted}
            >
              {twist.content}
            </TwistPickerButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

type TwistPickerButtonProps = {
  isPicked: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

function TwistPickerButton({
  isPicked,
  onClick,
  className,
  disabled,
  children,
}: TwistPickerButtonProps) {
  return (
    <button
      className={cn(
        "w-full rounded-lg border px-4 py-2 flex gap-4 items-center disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        isPicked
          ? "border-primary bg-primary/10"
          : "border-muted hover:bg-muted/50",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {isPicked && (
        <CheckIcon className="size-4 text-primary ml-auto shrink-0" />
      )}
    </button>
  );
}
