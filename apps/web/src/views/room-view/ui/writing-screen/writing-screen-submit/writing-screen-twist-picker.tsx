import { CheckIcon, ZapIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { TwistsSet } from "../../../model/types";

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
      <div className="flex items-center gap-2">
        <ZapIcon className="text-primary size-3.5" />
        <h3 className="text-muted-foreground text-sm font-medium">
          Выберите твист для этого раунда (необязательно)
        </h3>
      </div>

      <ul className="flex flex-col gap-2">
        {twists.map((twist) => (
          <li key={twist.id}>
            <TwistPickerButton
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
      type="button"
      aria-pressed={isPicked}
      className={cn(
        "flex w-full cursor-pointer items-center gap-4 rounded-lg border px-4 py-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50",
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
        <CheckIcon className="text-primary ml-auto size-4 shrink-0" />
      )}
    </button>
  );
}
