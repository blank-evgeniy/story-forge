import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

type WelcomeViewProps = {
  createRoomSlot: React.ReactNode;
  joinRoomSlot: React.ReactNode;
};

export function WelcomeView({ createRoomSlot }: WelcomeViewProps) {
  return (
    <Tabs
      defaultValue="account"
      className="w-full flex flex-col my-auto lg:mt-[10vh] mt-12"
      orientation="horizontal"
    >
      <TabsList className={"w-full"}>
        <TabsTrigger value="create">Новая игра</TabsTrigger>
        <TabsTrigger value="join">Присоединиться</TabsTrigger>
      </TabsList>
      <TabsContent value="create">{createRoomSlot}</TabsContent>
      <TabsContent value="join">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Присоединиться к существующей игре
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldLabel>Код</FieldLabel>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">Присоединиться</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
