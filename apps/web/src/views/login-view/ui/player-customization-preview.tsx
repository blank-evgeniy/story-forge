import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  type PlayerColor,
  type PlayerIcon,
  playerIconComponents,
} from "@/lib/player-customization";

type PlayerCustomizationPreviewProps = {
  color: PlayerColor;
  icon: PlayerIcon;
};

export function PlayerCustomizationPreview({
  color,
  icon,
}: PlayerCustomizationPreviewProps) {
  const Icon = playerIconComponents[icon];

  return (
    <Avatar size={"xl"} className="mx-auto">
      <AvatarFallback color={color}>
        <Icon />
      </AvatarFallback>
    </Avatar>
  );
}
