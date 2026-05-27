import { ZapIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type TwistMessageProps = {
  message: string;
  className?: string;
};

export function TwistMessage({ message, className }: TwistMessageProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 px-4", className)}>
      <div className="flex w-full items-center gap-3">
        <Separator className="flex-1" />
        <ZapIcon className="size-3.5 text-primary" />
        <Separator className="flex-1" />
      </div>

      <p className="text-sm font-medium leading-relaxed text-foreground/80 text-center italic">
        {message}
      </p>

      <div className="flex w-full items-center gap-3">
        <Separator className="flex-1" />
        <ZapIcon className="size-3.5 text-primary" />
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
