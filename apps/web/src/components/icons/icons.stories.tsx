import type { Meta, StoryObj } from "@storybook/react-vite";

import { IconEmojiAngel } from "./icon-emoji-angel";
import { IconEmojiCrying } from "./icon-emoji-crying";
import { IconEmojiEvil } from "./icon-emoji-evil";
import { IconEmojiLaughing } from "./icon-emoji-laughing";
import { IconEmojiMedicalMask } from "./icon-emoji-medical-mask";
import { IconEmojiSmileDizzy } from "./icon-emoji-smile-dizzy";
import { IconEmojiStarFace } from "./icon-emoji-star-face";
import { IconEmojiTongueWinkRight } from "./icon-emoji-tongue-wink-right";
import { IconEmojiVomiting } from "./icon-emoji-vomiting";

const icons = [
  { name: "Angel", component: IconEmojiAngel },
  { name: "Crying", component: IconEmojiCrying },
  { name: "Evil", component: IconEmojiEvil },
  { name: "Laughing", component: IconEmojiLaughing },
  { name: "MedicalMask", component: IconEmojiMedicalMask },
  { name: "SmileDizzy", component: IconEmojiSmileDizzy },
  { name: "StarFace", component: IconEmojiStarFace },
  { name: "TongueWinkRight", component: IconEmojiTongueWinkRight },
  { name: "Vomiting", component: IconEmojiVomiting },
];

const IconGrid = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "16px",
      padding: "24px",
    }}
  >
    {icons.map(({ name, component: Icon }) => (
      <div
        key={name}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Icon />
        <span style={{ fontSize: "12px", color: "currentColor", opacity: 0.6 }}>
          {name}
        </span>
      </div>
    ))}
  </div>
);

const meta = {
  title: "Icons/Emoji",
  component: IconGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof IconGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
