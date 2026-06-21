import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  cn(
    "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5",
    "text-small font-bold whitespace-nowrap",
    "transition-all outline-none focus-visible:ring-4 focus-visible:ring-brand-400/40",
    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
  ),
  {
    variants: {
      variant: {
        default: "bg-brand-400 text-surface [a]:hover:bg-brand-400/90",
        secondary: "bg-deep-400 text-surface [a]:hover:bg-deep-400/90",
        destructive: "bg-danger-50 text-danger-700 [a]:hover:bg-danger-50/80",
        white: "border-line bg-surface text-ink [a]:hover:bg-surface-2",
        outline: "border-line bg-transparent text-ink [a]:hover:bg-surface-2",
        ghost: "text-ink-muted [a]:hover:bg-surface-2",
        link: "text-brand-500 underline-offset-4 [a]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
