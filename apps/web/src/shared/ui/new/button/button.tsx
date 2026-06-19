import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/ui/spinner";

const buttonVariants = cva(
  cn(
    "group/button relative inline-flex shrink-0 items-center justify-center rounded-md border border-transparent",
    "text-sm font-extrabold whitespace-nowrap",
    "cursor-pointer transition-all duration-150 outline-none select-none focus-visible:ring-4 focus-visible:ring-brand-400/40 active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50 disabled:saturate-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        primary: "bg-brand-400 text-surface hover:bg-brand-400/90",
        secondary: "bg-deep-400 text-surface hover:bg-deep-400/90",
        outline: "border-line bg-surface text-ink hover:bg-surface-2",
        ghost: "bg-transparent text-ink hover:bg-surface-2",
        danger: "bg-danger text-surface hover:bg-danger/90",
        link: "text-brand-500 underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        sm: "h-9 gap-1 px-3 text-xs rounded-lg",
        default: "h-11 gap-1.5 px-4 rounded-xl",
        lg: "h-13 gap-2 px-5 text-lg rounded-2xl",
        "icon-sm": "size-9 rounded-lg",
        icon: "size-11 rounded-xl",
        "icon-lg": "size-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

function Button({
  className,
  variant = "primary",
  size = "default",
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={isLoading || disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {isLoading && <Spinner />}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
