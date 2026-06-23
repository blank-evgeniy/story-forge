import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-line bg-surface text-field text-ink h-10 w-full min-w-0 rounded-xl border-2 px-2.5 py-1 font-medium outline-none md:h-12 md:px-3.5",
        "placeholder:text-ink-muted transition-colors placeholder:font-normal",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "focus-visible:border-brand-400 focus-visible:ring-brand-400/40 focus-visible:ring-4",
        "aria-invalid:border-danger aria-invalid:ring-danger/20 aria-invalid:ring-4",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
