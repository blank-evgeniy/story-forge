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

import { useState } from "react";

type JoinRoomProps = {
  onJoin: (roomCode: string) => void;
};

export function JoinRoom({ onJoin }: JoinRoomProps) {
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    onJoin(code);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Присоединиться к существующей игре</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Код</FieldLabel>
          <InputOTP maxLength={4} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            Попросите хоста поделиться кодом комнаты
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={code.length !== 4}
        >
          Присоединиться
        </Button>
      </CardFooter>
    </Card>
  );
}
