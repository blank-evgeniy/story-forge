import type { ComponentType } from "react";

import type { IconProps } from "@/shared/icons/types";

import { IconEmojiAngel } from "@/shared/icons/icon-emoji-angel";
import { IconEmojiCrying } from "@/shared/icons/icon-emoji-crying";
import { IconEmojiEvil } from "@/shared/icons/icon-emoji-evil";
import { IconEmojiLaughing } from "@/shared/icons/icon-emoji-laughing";
import { IconEmojiMedicalMask } from "@/shared/icons/icon-emoji-medical-mask";
import { IconEmojiMonocle } from "@/shared/icons/icon-emoji-monocle";
import { IconEmojiSmileDizzy } from "@/shared/icons/icon-emoji-smile-dizzy";
import { IconEmojiStarFace } from "@/shared/icons/icon-emoji-star-face";
import { IconEmojiTongueWinkRight } from "@/shared/icons/icon-emoji-tongue-wink-right";
import { IconEmojiVomiting } from "@/shared/icons/icon-emoji-vomiting";

import type { PlayerColor, PlayerIcon } from "./types";

export const playerIconComponents: Record<
  PlayerIcon,
  ComponentType<IconProps>
> = {
  angel: IconEmojiAngel,
  crying: IconEmojiCrying,
  evil: IconEmojiEvil,
  laughing: IconEmojiLaughing,
  "medical-mask": IconEmojiMedicalMask,
  "smile-dizzy": IconEmojiSmileDizzy,
  "star-face": IconEmojiStarFace,
  "tongue-wink-right": IconEmojiTongueWinkRight,
  vomiting: IconEmojiVomiting,
  monocle: IconEmojiMonocle,
};

export const DEFAULT_PLAYER_ICON: PlayerIcon = "angel";

export const playerColorClasses: Record<PlayerColor, string> = {
  amber: "border-amber-500/70 bg-amber-500/30",
  orange: "border-orange-500/70 bg-orange-500/30",
  yellow: "border-yellow-500/70 bg-yellow-500/30",
  blue: "border-blue-500/70 bg-blue-500/30",
  green: "border-green-500/70 bg-green-500/30",
  emerald: "border-emerald-500/70 bg-emerald-500/30",
  teal: "border-teal-500/70 bg-teal-500/30",
  cyan: "border-cyan-500/70 bg-cyan-500/30",
  red: "border-red-500/70 bg-red-500/30",
  lime: "border-lime-500/70 bg-lime-500/30",
  sky: "border-sky-500/70 bg-sky-500/30",
  indigo: "border-indigo-500/70 bg-indigo-500/30",
  violet: "border-violet-500/70 bg-violet-500/30",
  purple: "border-purple-500/70 bg-purple-500/30",
  fuchsia: "border-fuchsia-500/70 bg-fuchsia-500/30",
  pink: "border-pink-500/70 bg-pink-500/30",
  rose: "border-rose-500/70 bg-rose-500/30",
  zinc: "border-zinc-500/70 bg-zinc-500/30",
};

export const DEFAULT_PLAYER_COLOR: PlayerColor = "amber";

export const playerAvatarColorClasses: Record<PlayerColor, string> = {
  amber: "bg-amber-500/30 text-amber-600 dark:text-amber-300",
  orange: "bg-orange-500/30 text-orange-600 dark:text-orange-300",
  yellow: "bg-yellow-500/30 text-yellow-600 dark:text-yellow-300",
  blue: "bg-blue-500/30 text-blue-600 dark:text-blue-300",
  green: "bg-green-500/30 text-green-600 dark:text-green-300",
  emerald: "bg-emerald-500/30 text-emerald-600 dark:text-emerald-300",
  teal: "bg-teal-500/30 text-teal-600 dark:text-teal-300",
  cyan: "bg-cyan-500/30 text-cyan-600 dark:text-cyan-300",
  red: "bg-red-500/30 text-red-600 dark:text-red-300",
  lime: "bg-lime-500/30 text-lime-600 dark:text-lime-300",
  sky: "bg-sky-500/30 text-sky-600 dark:text-sky-300",
  indigo: "bg-indigo-500/30 text-indigo-600 dark:text-indigo-300",
  violet: "bg-violet-500/30 text-violet-600 dark:text-violet-300",
  purple: "bg-purple-500/30 text-purple-600 dark:text-purple-300",
  fuchsia: "bg-fuchsia-500/30 text-fuchsia-600 dark:text-fuchsia-300",
  pink: "bg-pink-500/30 text-pink-600 dark:text-pink-300",
  rose: "bg-rose-500/30 text-rose-600 dark:text-rose-300",
  zinc: "bg-zinc-500/30 text-zinc-600 dark:text-zinc-300",
};

export const playerColorSwatchClasses: Record<PlayerColor, string> = {
  amber: "bg-amber-400",
  orange: "bg-orange-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
  emerald: "bg-emerald-400",
  teal: "bg-teal-400",
  cyan: "bg-cyan-400",
  red: "bg-red-400",
  lime: "bg-lime-400",
  sky: "bg-sky-400",
  indigo: "bg-indigo-400",
  violet: "bg-violet-400",
  purple: "bg-purple-400",
  fuchsia: "bg-fuchsia-400",
  pink: "bg-pink-400",
  rose: "bg-rose-400",
  zinc: "bg-zinc-400",
};
