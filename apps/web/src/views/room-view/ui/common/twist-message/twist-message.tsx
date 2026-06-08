import { ZapIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";

type TwistMessageProps = {
  message: string;
  className?: string;
};

export function TwistMessage({ message, className }: TwistMessageProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 px-4", className)}>
      <div className="flex w-full items-center gap-3">
        <Separator className="flex-1" />
        <ZapIcon className="text-primary size-3.5" />
        <Separator className="flex-1" />
      </div>

      <p className="text-foreground/80 text-center text-sm leading-relaxed font-medium italic">
        {message}
      </p>

      <div className="flex w-full items-center gap-3">
        <Separator className="flex-1" />
        <ZapIcon className="text-primary size-3.5" />
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
