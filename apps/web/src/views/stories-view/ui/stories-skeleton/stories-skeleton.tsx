import { Skeleton } from "@/shared/ui/skeleton";

export function StoriesSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full rounded-4xl" />
      ))}
    </div>
  );
}
