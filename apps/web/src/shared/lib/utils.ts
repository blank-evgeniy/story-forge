import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "small",
            "body",
            "h3",
            "h2",
            "h1",
            "display",
            "field",
          ],
        },
      ],
      rounded: [
        {
          rounded: ["sm", "md", "lg", "pill"],
        },
      ],
      shadow: [
        {
          shadow: ["card", "pop", "brand"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
