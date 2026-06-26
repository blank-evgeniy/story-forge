"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      richColors
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-surface)",
          "--normal-text": "var(--color-ink)",
          "--normal-border": "var(--color-line)",
          "--border-radius": "0.75rem",

          "--success-bg": "var(--color-success-50)",
          "--success-text": "var(--color-success-700)",
          "--success-border": "var(--color-success)",

          "--warning-bg": "var(--color-warning-50)",
          "--warning-text": "var(--color-warning-700)",
          "--warning-border": "var(--color-warning)",

          "--error-bg": "var(--color-danger-50)",
          "--error-text": "var(--color-danger-700)",
          "--error-border": "var(--color-danger)",

          "--info-bg": "var(--color-brand-50)",
          "--info-text": "var(--color-brand-700)",
          "--info-border": "var(--color-brand-400)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
