import { Spinner } from "@/shared/ui/spinner";

type RoomLoadingProps = {
  title?: string;
};

export function RoomLoading({ title }: RoomLoadingProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2">
      {title && <span className="text-lg">{title}</span>}
      <Spinner className="size-8" />
    </div>
  );
}
