import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import i18n from "@/shared/lib/i18n/i18n-setup";

beforeAll(async () => {
  await i18n.changeLanguage("en");
});

afterEach(() => {
  cleanup();
});

vi.mock("@/shared/ui/scroll-area", () => ({
  ScrollArea: ({
    children,
    className,
  }: {
    children?: unknown;
    className?: string;
  }) => <div className={className}>{children as never}</div>,
  ScrollBar: () => null,
}));
