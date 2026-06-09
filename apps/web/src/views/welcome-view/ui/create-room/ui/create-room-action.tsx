import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";

type CreateRoomActionProps = {
  onClick: () => void;
  isLoading: boolean;
};
export function CreateRoomAction({
  onClick,
  isLoading,
}: CreateRoomActionProps) {
  const { t } = useTranslation();

  return (
    <Button className="w-full" onClick={onClick} isLoading={isLoading}>
      {t("welcome.createRoom.submit")}
    </Button>
  );
}
