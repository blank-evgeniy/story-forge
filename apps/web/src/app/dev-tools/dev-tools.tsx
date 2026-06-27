import { WrenchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Field, FieldLabel } from "@/shared/ui/field";
import { NativeSelect, NativeSelectOption } from "@/shared/ui/native-select";

export function DevTools() {
  const { i18n } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger
        className="bg-surface text-ink border-line fixed bottom-4 left-4 z-50 flex size-11 items-center justify-center rounded-full border-2 shadow-pop"
        aria-label="Dev tools"
      >
        <WrenchIcon className="size-5" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dev tools</DialogTitle>
        </DialogHeader>

        <Field>
          <FieldLabel htmlFor="dev-tools-language">Language</FieldLabel>
          <NativeSelect
            id="dev-tools-language"
            value={i18n.resolvedLanguage}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
          >
            <NativeSelectOption value="en">English</NativeSelectOption>
            <NativeSelectOption value="ru">Русский</NativeSelectOption>
          </NativeSelect>
        </Field>
      </DialogContent>
    </Dialog>
  );
}
