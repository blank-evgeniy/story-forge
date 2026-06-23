import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/shared/lib/utils";

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 outline-none",
        "transition-colors after:absolute after:-inset-x-3 after:-inset-y-2",
        "focus-visible:ring-brand-400/40 focus-visible:ring-4",
        "data-checked:border-brand-400 data-checked:bg-brand-400 data-unchecked:bg-surface-2 data-unchecked:border-transparent",
        "aria-invalid:border-danger aria-invalid:ring-danger/20 aria-invalid:ring-4",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-surface pointer-events-none block size-6 rounded-full shadow-md ring-0",
          "data-unchecked:border-line data-unchecked:border",
          "transition-transform",
          "data-checked:translate-x-6.5 data-unchecked:translate-x-0.5",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
