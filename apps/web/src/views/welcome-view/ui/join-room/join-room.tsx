import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card";
import { Field, FieldDescription } from "@/shared/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";

type JoinRoomProps = {
  onJoin: (roomCode: string) => void;
  isLoading: boolean;
  disabled: boolean;
};

export function JoinRoom({ onJoin, isLoading, disabled }: JoinRoomProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    onJoin(code);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-h2">{t("welcome.joinGame.heading")}</h2>
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
          <FieldDescription>
            {t("welcome.joinGame.codeField.description")}
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          onClick={handleSubmit}
          className="w-full"
          isLoading={isLoading}
          disabled={code.length !== 4 || disabled}
        >
          {t("welcome.joinGame.submit")}
        </Button>
      </CardFooter>
    </Card>
  );
}
