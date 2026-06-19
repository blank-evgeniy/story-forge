import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/shared/lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 outline-none",
        "transition-colors after:absolute after:-inset-x-3 after:-inset-y-2",
        "focus-visible:ring-4 focus-visible:ring-brand-400/40",
        "data-checked:border-brand-400 data-checked:bg-brand-400 data-unchecked:border-transparent data-unchecked:bg-surface-2",
        "aria-invalid:border-danger aria-invalid:ring-4 aria-invalid:ring-danger/20",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "data-[size=default]:h-6 data-[size=default]:w-11",
        "data-[size=sm]:h-4 data-[size=sm]:w-7",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-surface shadow-sm ring-0",
          "transition-transform",
          "group-data-[size=default]/switch:size-5 group-data-[size=sm]/switch:size-3",
          "data-checked:translate-x-[calc(100%-2px)] data-unchecked:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
