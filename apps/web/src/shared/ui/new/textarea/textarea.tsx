import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content flex min-h-16 w-full resize-none rounded-xl border border-line bg-surface px-3 py-3 text-base text-ink outline-none",
        "transition-colors placeholder:text-ink-muted",
        "focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-400/40",
        "aria-invalid:border-danger aria-invalid:ring-4 aria-invalid:ring-danger/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
