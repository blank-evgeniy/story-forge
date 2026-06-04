import { CircleAlertIcon } from "lucide-react";

type RoomErrorProps = {
  title: string;
};

export function RoomError({ title }: RoomErrorProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      <span className="text-lg">{title}</span>
      <CircleAlertIcon className="text-destructive size-8" />
    </div>
  );
}
