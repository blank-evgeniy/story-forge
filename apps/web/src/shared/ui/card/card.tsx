import * as React from "react";

import { cn } from "@/shared/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  variant?: "surface" | "glass" | "glass-strong";
};
function Card({
  className,
  variant = "glass",
  ...props
}: CardProps & { variant?: "surface" | "glass" | "glass-strong" }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group/card flex flex-col gap-4 overflow-hidden rounded-3xl py-4 md:gap-6 md:py-6",
        "glass text-surface shadow-card",
        {
          "bg-surface": variant === "surface",
          glass: variant === "glass",
          "glass-strong": variant === "glass-strong",
        },
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-2 px-4 md:px-6", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-body"
      className={cn("flex flex-col gap-2 px-4 md:px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-3xl px-4 md:px-6",
        "[.border-t]:border-glass-border [.border-t]:pt-4",
        className,
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter };
