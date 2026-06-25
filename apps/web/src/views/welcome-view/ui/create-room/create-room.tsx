import { t } from "i18next";
import { PlayIcon } from "lucide-react";
import { type ReactNode } from "react";

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
  return (
    <Card variant="glass-strong">
      <CardHeader>
        <h2 className="text-h2">{t("welcome.createRoom.heading")}</h2>
      </CardHeader>
      <CardContent>
        {serverStatusSlot}
        <Button
          className="gap-4 uppercase"
          onClick={onCreate}
          isLoading={isLoading}
        >
          <PlayIcon className="size-5 stroke-3" />
          {t("welcome.createRoom.submit")}
        </Button>
      </CardContent>
    </Card>
  );
}
