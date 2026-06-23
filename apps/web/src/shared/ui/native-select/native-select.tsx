import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
  size?: "sm" | "default";
};

function NativeSelect({
  className,
  size = "default",
  ...props
}: NativeSelectProps) {
  return (
    <div
      className={cn(
        "group/native-select relative w-fit has-[select:disabled]:opacity-50",
        className,
      )}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "border-line bg-surface text-ink text-field h-10 w-full min-w-0 appearance-none rounded-xl border-2 py-1 pr-8 pl-3.5 font-medium outline-none select-none md:h-12",
          "transition-colors",
          "focus-visible:ring-brand-400 focus-visible:ring-4",
          "aria-invalid:border-danger aria-invalid:ring-danger/20 aria-invalid:ring-4",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          "data-[size=sm]:h-9",
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-ink-muted pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

function NativeSelectOption({
  className,
  ...props
}: React.ComponentProps<"option">) {
  return (
    <option
      data-slot="native-select-option"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({
  className,
  ...props
}: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-[Canvas] text-[CanvasText]", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
