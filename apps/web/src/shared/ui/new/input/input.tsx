import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-xl border border-line bg-surface px-3 py-1 text-base text-ink outline-none",
        "transition-colors placeholder:text-ink-muted",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-bold",
        "focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-400/40",
        "aria-invalid:border-danger aria-invalid:ring-4 aria-invalid:ring-danger/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
