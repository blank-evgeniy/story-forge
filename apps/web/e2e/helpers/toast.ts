import { Locator, Page } from "@playwright/test";

type ToastType = "error" | "success" | "info" | "warning" | "loading";

/**
 * Locates sonner toasts in the DOM. Pass a `type` to narrow to a specific
 * variant (sonner sets `data-type` on each toast), or omit it to match any.
 */
export function getToast(page: Page, type?: ToastType): Locator {
  const selector = type
    ? `[data-sonner-toast][data-type='${type}']`
    : "[data-sonner-toast]";

  return page.locator(selector);
}
