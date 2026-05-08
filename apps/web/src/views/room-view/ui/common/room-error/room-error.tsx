import { CircleAlertIcon } from "lucide-react";

type RoomErrorProps = {
  title: string;
};

export function RoomError({ title }: RoomErrorProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      <span className="text-lg">{title}</span>
      <CircleAlertIcon className="size-8 text-destructive" />
    </div>
  );
}
