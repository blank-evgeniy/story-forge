import type { ComponentType } from "react";

import type { IconProps } from "@/components/icons/types";

import { IconEmojiAngel } from "@/components/icons/icon-emoji-angel";
import { IconEmojiCrying } from "@/components/icons/icon-emoji-crying";
import { IconEmojiEvil } from "@/components/icons/icon-emoji-evil";
import { IconEmojiLaughing } from "@/components/icons/icon-emoji-laughing";
import { IconEmojiMedicalMask } from "@/components/icons/icon-emoji-medical-mask";
import { IconEmojiMonocle } from "@/components/icons/icon-emoji-monocle";
import { IconEmojiSmileDizzy } from "@/components/icons/icon-emoji-smile-dizzy";
import { IconEmojiStarFace } from "@/components/icons/icon-emoji-star-face";
import { IconEmojiTongueWinkRight } from "@/components/icons/icon-emoji-tongue-wink-right";
import { IconEmojiVomiting } from "@/components/icons/icon-emoji-vomiting";

export const PLAYER_ICONS = [
  "angel",
  "crying",
  "evil",
  "laughing",
  "medical-mask",
  "smile-dizzy",
  "star-face",
  "tongue-wink-right",
  "vomiting",
  "monocle",
] as const;

export type PlayerIcon = (typeof PLAYER_ICONS)[number];

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
