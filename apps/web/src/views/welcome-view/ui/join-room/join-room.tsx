import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type JoinRoomProps = {
  onJoin: (roomCode: string) => void;
};

export function JoinRoom({ onJoin }: JoinRoomProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    onJoin(code);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("welcome.joinRoom.heading")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>{t("welcome.joinRoom.code.label")}</FieldLabel>
          <InputOTP maxLength={4} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>{t("welcome.joinRoom.code.hint")}</FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={code.length !== 4}
        >
          {t("welcome.joinRoom.submit")}
        </Button>
      </CardFooter>
    </Card>
  );
}
