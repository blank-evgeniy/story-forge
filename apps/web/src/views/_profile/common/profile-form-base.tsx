import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
  DEFAULT_PLAYER_COLOR,
  DEFAULT_PLAYER_ICON,
  type PlayerColor,
  type PlayerIcon,
} from "@/shared/consts/player-customization";
import { testIdAttr } from "@/shared/lib/tests/test-id-attr";
import {
  getTestIdGenerator,
  type WithModuleNamespace,
} from "@/shared/lib/tests/test-id-generator";
import { Button } from "@/shared/ui/button";
import { Field, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";
import {
  PlayerAvatar,
  PlayerColorPicker,
  PlayerIconPicker,
} from "@/shared/ui/player-customization";

type ProfileFormBaseProps = {
  onSubmit: (username: string, color: PlayerColor, icon: PlayerIcon) => void;
  initialData?: {
    username?: string;
    color?: PlayerColor;
    icon?: PlayerIcon;
  };
  mode: "create" | "edit";
} & WithModuleNamespace;

export function ProfileFormBase({
  onSubmit,
  initialData,
  mode,
  namespace,
}: ProfileFormBaseProps) {
  const getTestId = getTestIdGenerator(namespace);
  const testId = getTestId();

  const { t } = useTranslation();
  const [username, setUsername] = useState(initialData?.username ?? "");
  const [color, setColor] = useState<PlayerColor>(
    initialData?.color ?? DEFAULT_PLAYER_COLOR,
  );
  const [icon, setIcon] = useState<PlayerIcon>(
    initialData?.icon ?? DEFAULT_PLAYER_ICON,
  );

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername || trimmedUsername.length < 2) {
      toast.error(t("login.error.nicknameMinLength"));
      return;
    }

    onSubmit(trimmedUsername, color, icon);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field>
        <FieldLabel>{t("login.nickname.label")}</FieldLabel>
        <Input
          {...testIdAttr(testId("input-username"))}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("login.nickname.placeholder")}
          autoFocus
          autoComplete="off"
        />
      </Field>

      <PlayerAvatar
        color={color}
        icon={icon}
        size={"xl"}
        className="mx-auto"
        namespace={namespace}
      />

      <Field>
        <FieldLabel>{t("login.color")}</FieldLabel>
        <PlayerColorPicker
          value={color}
          onChange={setColor}
          namespace={namespace}
        />
      </Field>

      <Field>
        <FieldLabel>{t("login.icon")}</FieldLabel>
        <PlayerIconPicker
          value={icon}
          color={color}
          onChange={setIcon}
          namespace={namespace}
        />
      </Field>

      <Button
        {...testIdAttr(testId("submit"))}
        type="submit"
        className="w-full"
      >
        {mode === "create" ? t("login.submit") : t("profile.save")}
      </Button>
    </form>
  );
}
