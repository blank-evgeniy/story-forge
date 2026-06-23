import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const toggleVariants = cva(
  cn(
    "group/toggle inline-flex cursor-pointer items-center justify-center gap-1 rounded-xl",
    "text-small font-bold whitespace-nowrap text-ink",
    "transition-colors outline-none hover:bg-surface-2",
    "focus-visible:ring-4 focus-visible:ring-brand-400/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-danger aria-invalid:ring-4 aria-invalid:ring-danger/20",
    "aria-pressed:bg-surface-2",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-line bg-transparent hover:bg-surface-2",
      },
      size: {
        default:
          "h-10 md:h-11 min-w-10 md:min-w-11 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        sm: "h-8 md:h-9 min-w-8 md:min-w-9 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-11 md:h-13 min-w-11 md:min-w-13 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
