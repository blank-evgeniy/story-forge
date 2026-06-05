import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

vi.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children, className }: { children?: unknown; className?: string }) => (
    <div className={className}>{children as never}</div>
  ),
  ScrollBar: () => null,
}));
