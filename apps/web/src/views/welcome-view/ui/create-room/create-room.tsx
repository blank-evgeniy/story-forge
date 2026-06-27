import { PlayIcon } from "lucide-react";
import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";

type CreateRoomProps = {
  onCreate: () => void;
  isLoading: boolean;
  serverStatusSlot?: ReactNode;
};

export function CreateRoom({
  onCreate,
  isLoading,
  serverStatusSlot,
}: CreateRoomProps) {
  const { t } = useTranslation();

  return (
    <Card variant="glass-strong">
      <CardHeader>
        <h2 className="text-h2">{t("welcome.newGame.heading")}</h2>
      </CardHeader>
      <CardContent>
        {serverStatusSlot}
        <Button
          className="gap-4 uppercase"
          onClick={onCreate}
          isLoading={isLoading}
        >
          <PlayIcon className="size-5 stroke-3" />
          {t("welcome.newGame.submit")}
        </Button>
      </CardContent>
    </Card>
  );
}
