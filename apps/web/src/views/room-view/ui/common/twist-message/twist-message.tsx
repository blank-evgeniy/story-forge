import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";

type TwistMessageProps = {
  message: string;
  className?: string;
};

export function TwistMessage({ message, className }: TwistMessageProps) {
  return (
    <div className={cn("col flex items-center gap-2 px-4", className)}>
      <Separator className={"flex-1"} />
      <p className="text-surface-2 text-small flex-2 text-center leading-relaxed font-medium italic">
        {message}
      </p>
      <Separator className={"flex-1"} />
    </div>
  );
}
