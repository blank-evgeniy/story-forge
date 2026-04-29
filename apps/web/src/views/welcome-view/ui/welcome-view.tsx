import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function WelcomeView() {
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
      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Создать новую игру
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FieldSet>
              <FieldLegend>Настройки игры</FieldLegend>
              <FieldDescription>
                Вы можете изменить стандартные настройки игры или создать сразу
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel>Время раунда (сек.)</FieldLabel>
                  <ToggleGroup
                    defaultValue={"60" as unknown as readonly string[]}
                  >
                    <ToggleGroupItem value="30">30</ToggleGroupItem>
                    <ToggleGroupItem value="60">60</ToggleGroupItem>
                    <ToggleGroupItem value="90">90</ToggleGroupItem>
                  </ToggleGroup>
                </Field>

                <Field>
                  <FieldLabel>Геймплей</FieldLabel>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Blind Mode</Label>
                  </div>
                  <FieldDescription>
                    Blind Mode - режим, в котором игрокам видно только последнее
                    сообщение при написании историию.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button className="w-full">Создать</Button>
          </CardFooter>
        </Card>
      </TabsContent>
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
