import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import {
  getTestIdGenerator,
  type WithModuleNamespace,
} from "@/shared/lib/tests/test-id-generator";
import { cn } from "@/shared/lib/utils";

import { type ThemeName, THEMES } from "../../model/types";

const themeSwatchClasses: Record<ThemeName, string> = {
  orange: "bg-gradient-to-br from-[#ff6a2e] to-[#7a1762]",
  violet: "bg-gradient-to-br from-[#b454ff] to-[#0d2266]",
};

type ThemeSwitcherProps = {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
} & WithModuleNamespace;

export function ThemeSwitcher({
  value,
  onChange,
  namespace,
}: ThemeSwitcherProps) {
  const testId = getTestIdGenerator(namespace)("theme-switcher");
  return (
    <div className="flex flex-wrap gap-2" {...testIdAttr(testId())}>
      {THEMES.map((theme) => (
        <button
          key={theme}
          type="button"
          onClick={() => onChange(theme)}
          className={cn(
            "h-7 w-7 cursor-pointer rounded-full transition-all",
            themeSwatchClasses[theme],
            value === theme
              ? "ring-surface scale-110 ring-2"
              : "opacity-60 hover:opacity-90",
          )}
          aria-label={theme}
          {...testIdAttr(testId("button", theme))}
        />
      ))}
    </div>
  );
}
