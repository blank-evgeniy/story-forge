import { Spinner } from "@/components/ui/spinner";

type RoomLoadingProps = {
  title?: string;
};

export function RoomLoading({ title }: RoomLoadingProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      {title && <span className="text-lg">{title}</span>}
      <Spinner className="size-8" />
    </div>
  );
}
