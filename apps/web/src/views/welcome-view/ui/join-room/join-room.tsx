import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Field, FieldDescription } from "@/shared/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";

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
        <h2 className="text-h2">{t("welcome.joinRoom.heading")}</h2>
      </CardHeader>
      <CardContent>
        <Field>
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
          variant={"secondary"}
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
