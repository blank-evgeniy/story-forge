import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-line bg-surface text-small text-ink flex field-sizing-content min-h-16 w-full resize-none rounded-xl border-2 px-3.5 py-3 font-bold outline-none",
        "placeholder:text-ink-muted transition-colors placeholder:font-normal",
        "focus-visible:border-brand-400 focus-visible:ring-brand-400/40 focus-visible:ring-4",
        "aria-invalid:border-danger aria-invalid:ring-danger/20 aria-invalid:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
